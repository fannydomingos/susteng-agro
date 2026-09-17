/**
 * Verificação do número de WhatsApp.
 *
 * Confere que TODO botão, link e formulário de WhatsApp do site aponta para o
 * número principal. As duas exceções legítimas são conferidas uma a uma, não
 * ignoradas: os números pessoais dos dois diretores, que aparecem nomeados, e
 * a assinatura de quem desenvolveu, no rodapé.
 */
import { chromium } from "playwright";

const BASE = "http://localhost:3210";
const PRINCIPAL = "5561999654060";
const ANTIGO = "5561984068770";
/** números que podem aparecer sem ser o principal, e por quê */
const PERMITIDOS = {
  "5561984068770": "número pessoal do Cristyano Martins, nomeado",
  "5561999654060": "número principal (e também o pessoal do Fabiano)",
  "5561992770280": "assinatura de quem desenvolveu, no rodapé",
};

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});

let falhas = 0;
const ok = (nome, passou, detalhe) => {
  if (!passou) falhas++;
  console.log(`${passou ? "PASSOU" : "FALHOU"} · ${nome}`);
  console.log(`   ${detalhe}`);
};

/* ---------- 1. TODO LINK DE WHATSAPP DE TODAS AS ROTAS ---------- */
const rotas = ["/", "/quem-somos", "/produtos", "/artigos", "/galeria"];
const inesperados = [];
const resumo = [];

for (const rota of rotas) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + rota, { waitUntil: "load" });
  await page.waitForTimeout(2600);

  const links = await page.evaluate(() => {
    return [...document.querySelectorAll('a[href*="wa.me"]')].map((a) => ({
      numero: (a.href.match(/wa\.me\/\+?(\d+)/) || [])[1] ?? "?",
      texto: (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 46),
      rotulo: a.getAttribute("aria-label") ?? "",
    }));
  });

  for (const l of links) {
    if (!PERMITIDOS[l.numero]) inesperados.push({ rota, ...l });
  }
  resumo.push(`${rota} → ${links.length} link(s)`);

  /* o principal precisa de fato aparecer nesta rota */
  const temPrincipal = links.some((l) => l.numero === PRINCIPAL);
  ok(
    `${rota} · os links de WhatsApp da página`,
    temPrincipal && links.every((l) => PERMITIDOS[l.numero]),
    links.map((l) => `${l.numero} (${l.texto || l.rotulo || "sem texto"})`).join(" | "),
  );

  await ctx.close();
}

ok(
  "nenhum número fora da lista conhecida em nenhuma rota",
  inesperados.length === 0,
  inesperados.length ? JSON.stringify(inesperados) : resumo.join(" · "),
);

/* ---------- 2. BOTÃO FLUTUANTE E BOTÃO DO CABEÇALHO ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(2800);

  const fab = await page.getAttribute("[data-testid=whatsapp-fab]", "href");
  const cabecalho = await page.evaluate(() => {
    const a = [...document.querySelectorAll("header a[href*='wa.me']")][0];
    return a ? a.href : null;
  });

  ok(
    "botão flutuante e botão do cabeçalho apontam para o número principal",
    fab?.includes(PRINCIPAL) && cabecalho?.includes(PRINCIPAL),
    `flutuante ${fab} · cabeçalho ${cabecalho}`,
  );
  await ctx.close();
}

/* ---------- 3. O FORMULÁRIO DE CONTATO ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(2800);

  /* troca window.open por um espião, para ler o endereço sem abrir nada */
  await page.evaluate(() => {
    window.__abriu = null;
    window.open = (url) => {
      window.__abriu = url;
      return null;
    };
  });

  await page.evaluate(() => {
    const el = document.querySelector("#contato");
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : window.scrollTo(0, y);
  });
  await page.waitForTimeout(900);

  await page.fill("#nome", "Teste de verificação");
  await page.fill("#cidade", "Brasília, DF");
  await page.fill("#cultivo", "Morango");
  await page.fill("#volume", "20 sacos de 100 L por mês");
  /* preenche também a mensagem: se ela for obrigatória, a validação do
     próprio navegador barra o envio antes de chegar ao window.open */
  await page.fill("[data-testid=form-contato] textarea", "Mensagem de verificação.");
  await page.click("[data-testid=form-contato] button[type=submit]");
  await page.waitForTimeout(900);

  /* se algum campo barrou o envio, o navegador diz qual */
  const invalido = await page.evaluate(() => {
    const f = document.querySelector("[data-testid=form-contato]");
    return [...f.querySelectorAll("input, textarea")]
      .filter((c) => !c.checkValidity())
      .map((c) => c.name);
  });
  if (invalido.length) console.log(`   (campos barrados pela validação: ${invalido.join(", ")})`);

  const aberto = await page.evaluate(() => window.__abriu);
  const aviso = await page.evaluate(
    () => document.querySelector("#contato")?.innerText.match(/\(\d\d\)\s?\d{4,5}-\d{4}/g) ?? [],
  );

  ok(
    "o formulário abre o WhatsApp no número principal, com a mensagem preenchida",
    Boolean(aberto) &&
      aberto.includes(PRINCIPAL) &&
      !aberto.includes(ANTIGO) &&
      decodeURIComponent(aberto).includes("Teste de verificação"),
    `${aberto ?? "não abriu"}`,
  );

  ok(
    "o aviso abaixo do formulário mostra o número principal escrito",
    aviso.includes("(61) 99965-4060"),
    `números escritos na seção de contato: ${aviso.join(", ")}`,
  );

  await ctx.close();
}

await browser.close();
console.log(falhas === 0 ? "\nTUDO PASSOU" : `\n${falhas} FALHA(S)`);
process.exit(falhas === 0 ? 0 : 1);
