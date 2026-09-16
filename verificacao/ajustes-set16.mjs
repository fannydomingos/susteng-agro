/**
 * Verificação dos três ajustes de 16/09:
 *   1. benefícios na seção "Nossos produtos"
 *   2. marcadores numéricos com explicação
 *   3. ícones na seção "Como funciona"
 *
 * Mede o que está de fato desenhado na tela: tamanho real de cada SVG,
 * contraste do traço contra o fundo, se o trilho da esteira acende sozinho
 * ao longo do tempo e se nada disso estourou a largura em nenhum aparelho.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3210";
const OUT = "verificacao/ajustes";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

let falhas = 0;
const ok = (nome, passou, detalhe) => {
  if (!passou) falhas++;
  console.log(`${passou ? "PASSOU" : "FALHOU"} · ${nome}`);
  console.log(`   ${detalhe}`);
};

/** luminância relativa, fórmula da WCAG */
const lum = ([r, g, b]) => {
  const f = (c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contraste = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
const rgb = (s) => s.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number);

const rolarAte = async (page, sel) => {
  await page.evaluate((s) => {
    const el = document.querySelector(s);
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
  }, sel);
};

/* ---------- 1. BENEFÍCIOS E MARCADORES EM "NOSSOS PRODUTOS" ---------- */
for (const w of [320, 390, 768, 1024, 1440]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 860 },
    isMobile: w < 768,
    hasTouch: w < 768,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await rolarAte(page, "#produtos");
  await page.waitForTimeout(900);

  const d = await page.evaluate(() => {
    const secao = document.querySelector("#produtos");
    const beneficios = [...secao.querySelectorAll("ul > li")].filter((li) =>
      li.querySelector("svg"),
    );
    // a régua também é um div dentro do dl, então filtra pelos que têm dd
    const marcadores = [...secao.querySelectorAll("dl > div")].filter((d) =>
      d.querySelector("dd"),
    );
    const svgs = beneficios.map((li) => {
      const r = li.querySelector("svg").getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    return {
      qtdBeneficios: beneficios.length,
      svgs,
      // cada marcador precisa de valor, rótulo E explicação
      marcadores: marcadores.map((m) => {
        const spans = [...m.querySelectorAll("dd > span")];
        return spans.map((s) => s.textContent.trim().slice(0, 44));
      }),
      corIcone: beneficios[0]
        ? getComputedStyle(beneficios[0].querySelector("svg")).color
        : null,
      fundo: getComputedStyle(document.body).backgroundColor,
      overflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      // menor fonte usada nos blocos novos
      menorFonte: Math.min(
        ...[...secao.querySelectorAll("dl span, ul li h3, ul li p")].map((e) =>
          parseFloat(getComputedStyle(e).fontSize),
        ),
      ),
    };
  });

  const svgsOk = d.svgs.length === 4 && d.svgs.every((s) => s.w >= 16 && s.h >= 16);
  const marcOk =
    d.marcadores.length === 3 && d.marcadores.every((linhas) => linhas.length === 3);

  ok(
    `${w}px · quatro benefícios com ícone desenhado e três marcadores com explicação`,
    d.qtdBeneficios === 4 && svgsOk && marcOk && d.overflow === 0 && erros.length === 0,
    `benefícios ${d.qtdBeneficios} · svgs ${JSON.stringify(d.svgs)} · marcadores ${JSON.stringify(
      d.marcadores,
    )} · overflow ${d.overflow}px · menor fonte ${d.menorFonte}px · erros ${erros.length}`,
  );

  if (w === 1440) {
    const c = contraste(rgb(d.corIcone), rgb(d.fundo));
    ok(
      "o traço do ícone tem contraste suficiente contra o fundo da seção",
      c >= 3,
      `${d.corIcone} sobre ${d.fundo} · ${c.toFixed(2)}:1`,
    );
  }

  await page.screenshot({ path: `${OUT}/produtos-${w}.png` });
  await ctx.close();
}

/* ---------- 2. ÍCONES E TRILHO EM "COMO FUNCIONA" ---------- */
for (const w of [390, 1440]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: 900 },
    isMobile: w < 768,
    hasTouch: w < 768,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on("console", (m) => m.type() === "error" && erros.push(m.text()));
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(3000);
  await rolarAte(page, "#como-funciona");
  await page.waitForTimeout(1200);

  const d = await page.evaluate(() => {
    const etapas = [...document.querySelectorAll("[data-testid=esteira] > li")];
    const beneficios = [
      ...document.querySelectorAll("#como-funciona ul > li"),
    ];
    return {
      qtdEtapas: etapas.length,
      // todo ícone de etapa precisa estar desenhado, não com 0 de altura
      svgsEtapa: etapas.map((li) => {
        const r = li.querySelector("svg").getBoundingClientRect();
        return Math.round(r.width) + "x" + Math.round(r.height);
      }),
      svgsBeneficio: beneficios.map((li) => {
        const s = li.querySelector("svg");
        if (!s) return "sem";
        const r = s.getBoundingClientRect();
        return Math.round(r.width) + "x" + Math.round(r.height);
      }),
      // o número "01 02 03" saiu do lugar do ícone?
      aindaTemNumero: beneficios.some((li) =>
        /^0\d$/.test(li.querySelector("span")?.textContent?.trim() ?? ""),
      ),
      overflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  /*
    O trilho aceso precisa crescer sozinho. Não dá para procurar "182, 255,
    137" na cor computada: o Tailwind v4 devolve `oklab(...)`, não `rgb(...)`.
    Então a medição conta, a cada amostra, quantos trechos estão com cor
    DIFERENTE da do último trecho, que nunca acende enquanto a esteira não
    chega ao fim. Se esse número varia ao longo do tempo, o trilho está
    avançando de verdade.
  */
  const serie = [];
  for (let i = 0; i < 9; i++) {
    serie.push(
      await page.evaluate(() => {
        const segmentos = [
          ...document.querySelectorAll("[data-testid=esteira] > li > span[aria-hidden]"),
        ].map((s) => getComputedStyle(s).backgroundColor);
        if (!segmentos.length) return -1;
        const apagado = segmentos[segmentos.length - 1];
        return segmentos.filter((c) => c !== apagado).length;
      }),
    );
    await page.waitForTimeout(1000);
  }
  const variou = new Set(serie).size >= 3 && Math.max(...serie) >= 2;

  ok(
    `${w}px · seis etapas com ícone desenhado, benefícios sem numeral e trilho que acende sozinho`,
    d.qtdEtapas === 6 &&
      d.svgsEtapa.every((s) => s === "18x18") &&
      d.svgsBeneficio.length === 5 &&
      d.svgsBeneficio.every((s) => s === "24x24") &&
      !d.aindaTemNumero &&
      d.overflow === 0 &&
      erros.length === 0 &&
      (w < 1024 || variou),
    `etapas ${d.qtdEtapas} · svg etapas ${d.svgsEtapa.join(" ")} · svg benefícios ${d.svgsBeneficio.join(
      " ",
    )} · numeral remanescente ${d.aindaTemNumero} · trechos acesos ao longo do tempo ${serie.join(
      ",",
    )} · overflow ${d.overflow}px · erros ${erros.length}`,
  );

  await page.screenshot({ path: `${OUT}/como-funciona-${w}.png`, fullPage: false });
  await ctx.close();
}

await browser.close();
console.log(falhas === 0 ? "\nTUDO PASSOU" : `\n${falhas} FALHA(S)`);
process.exit(falhas === 0 ? 0 : 1);
