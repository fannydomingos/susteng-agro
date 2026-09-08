import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3210";
const OUT = "./verificacao/evidencias";
fs.mkdirSync(OUT, { recursive: true });

const larguras = [320, 390, 768, 1024, 1440, 1920];
const rotas = [
  { path: "/", nome: "home" },
  { path: "/quem-somos", nome: "quem-somos" },
  { path: "/produtos", nome: "produtos" },
  { path: "/artigos", nome: "artigos" },
  { path: "/galeria", nome: "galeria" },
];

const relatorio = [];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

async function medir(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const excedem = [];
    const limite = de.clientWidth;

    /**
     * Um elemento só "vaza" de verdade se nenhum ancestral o recortar.
     * Fitas de logo e manchas de luz passam de propósito do lado de fora
     * de um contêiner com overflow hidden, então não contam.
     */
    const recortado = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX;
        if (o === "hidden" || o === "clip" || o === "auto" || o === "scroll") return true;
      }
      return false;
    };
    /** elementos escondidos para leitores de tela ficam colapsados em 1x1 */
    const invisivel = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return true;
      if (cs.clipPath === "inset(50%)" || cs.clip === "rect(0px, 0px, 0px, 0px)") return true;
      const r = el.getBoundingClientRect();
      return r.width <= 1 && r.height <= 1;
    };

    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > limite + 1.5 || r.left < -1.5) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed" && cs.opacity === "0") continue;
        if (recortado(el)) continue;
        excedem.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || "").toString().slice(0, 70),
          left: Math.round(r.left),
          right: Math.round(r.right),
        });
      }
    }

    // texto abaixo de 10px e alvos de toque pequenos
    const textoPequeno = [];
    const alvosPequenos = [];
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      const temTexto = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length > 0,
      );
      if (temTexto && parseFloat(cs.fontSize) < 10) {
        textoPequeno.push({ tag: el.tagName.toLowerCase(), size: cs.fontSize, txt: el.textContent.trim().slice(0, 40) });
      }
      if (["A", "BUTTON", "INPUT", "TEXTAREA", "SUMMARY"].includes(el.tagName)) {
        if (invisivel(el)) continue;
        const r = el.getBoundingClientRect();
        // 0,5px de folga porque a medida vem fracionada
        if (r.height < 39.5 || r.width < 39.5) {
          alvosPequenos.push({
            tag: el.tagName.toLowerCase(),
            w: Math.round(r.width),
            h: Math.round(r.height),
            txt: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 40),
          });
        }
      }
    }
    return {
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      overflowPx: de.scrollWidth - de.clientWidth,
      excedem: excedem.slice(0, 8),
      textoPequeno: textoPequeno.slice(0, 8),
      alvosPequenos: alvosPequenos.slice(0, 8),
    };
  });
}

for (const rota of rotas) {
  for (const w of larguras) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: w < 500 ? 780 : 900 },
      deviceScaleFactor: 1,
      isMobile: w < 768,
      hasTouch: w < 768,
    });
    const page = await ctx.newPage();
    const erros = [];
    page.on("console", (m) => {
      if (m.type() === "error") erros.push(m.text().slice(0, 200));
    });
    page.on("pageerror", (e) => erros.push("pageerror: " + String(e).slice(0, 200)));

    await page.goto(BASE + rota.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600); // passa o preloader

    // rola a página inteira para acionar animações e carregar imagens
    await page.evaluate(async () => {
      const passo = window.innerHeight * 0.6;
      for (let y = 0; y < document.body.scrollHeight; y += passo) {
        if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 70));
      }
    });
    await page.waitForTimeout(900);
    const medidaFundo = await medir(page);
    await page.evaluate(() => {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    });
    // o trilho de produtos usa mola: sem esta espera a captura sai com os
    // painéis no meio do caminho, o que parece defeito de layout e não é
    await page.waitForTimeout(1800);

    // travessão e meia-risca no texto que o visitante lê
    const travessoes = await page.evaluate(() => {
      const achados = [];
      const it = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let no;
      while ((no = it.nextNode())) {
        const t = no.textContent || "";
        if (t.includes("\u2014") || t.includes("\u2013")) {
          achados.push(t.trim().slice(0, 90));
        }
      }
      return achados.slice(0, 6);
    });

    const medida = await medir(page);
    const arquivo = `${OUT}/${rota.nome}-${w}.png`;
    await page.screenshot({ path: arquivo, fullPage: false });

    relatorio.push({
      rota: rota.path,
      largura: w,
      overflowTopo: medida.overflowPx,
      overflowAposRolar: medidaFundo.overflowPx,
      excedem: medida.excedem.length ? medida.excedem : medidaFundo.excedem,
      textoPequeno: medida.textoPequeno,
      alvosPequenos: medida.alvosPequenos,
      travessoes,
      errosConsole: erros,
      screenshot: arquivo,
    });

    await ctx.close();
  }
}

await browser.close();
fs.writeFileSync("./verificacao/relatorio-medidas.json", JSON.stringify(relatorio, null, 2));

console.log("| rota | largura | overflow topo | overflow após rolar | erros console | txt<10px | alvos<40px | travessões |");
console.log("|---|---|---|---|---|---|---|---|");
for (const r of relatorio) {
  console.log(
    `| ${r.rota} | ${r.largura} | ${r.overflowTopo}px | ${r.overflowAposRolar}px | ${r.errosConsole.length} | ${r.textoPequeno.length} | ${r.alvosPequenos.length} | ${r.travessoes.length} |`,
  );
}
console.log("\n--- detalhes ---");
for (const r of relatorio) {
  if (r.errosConsole.length) console.log(r.rota, r.largura, "ERROS:", r.errosConsole);
  if (r.excedem.length) console.log(r.rota, r.largura, "EXCEDEM:", JSON.stringify(r.excedem));
  if (r.alvosPequenos.length) console.log(r.rota, r.largura, "ALVOS:", JSON.stringify(r.alvosPequenos));
  if (r.textoPequeno.length) console.log(r.rota, r.largura, "TEXTO:", JSON.stringify(r.textoPequeno));
  if (r.travessoes.length) console.log(r.rota, r.largura, "TRAVESSÕES:", JSON.stringify(r.travessoes));
}
