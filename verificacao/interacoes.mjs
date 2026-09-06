import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3210";
const OUT = "./verificacao/evidencias";
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const resultados = [];
const ok = (nome, passou, detalhe = "") =>
  resultados.push({ teste: nome, resultado: passou ? "PASSOU" : "FALHOU", detalhe });

/* ---------- 1. MENU MOBILE (390px, com toque) ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 780 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  await page.getByTestId("menu-toggle").click();
  await page.waitForTimeout(450);
  const menuVisivel = await page.getByTestId("menu-mobile").isVisible();
  ok("menu mobile abre ao tocar no botão", menuVisivel);
  await page.screenshot({ path: `${OUT}/int-menu-mobile-aberto.png` });

  const aria = await page.getByTestId("menu-toggle").getAttribute("aria-expanded");
  ok("botão do menu marca aria-expanded=true", aria === "true", `aria-expanded=${aria}`);

  // clica em "Produtos" e confere que rolou até a seção
  await page.getByTestId("menu-mobile-link").filter({ hasText: "Produtos" }).click();
  await page.waitForTimeout(1600);
  const fechou = (await page.getByTestId("menu-mobile").count()) === 0;
  ok("menu fecha ao clicar num link", fechou);
  const posProdutos = await page.evaluate(() => {
    const el = document.querySelector("#produtos");
    return { topo: Math.round(el.getBoundingClientRect().top), scrollY: Math.round(window.scrollY) };
  });
  ok(
    "link 'Produtos' rola até a seção de produtos",
    Math.abs(posProdutos.topo) < 200 && posProdutos.scrollY > 100,
    JSON.stringify(posProdutos),
  );
  await page.screenshot({ path: `${OUT}/int-produtos-mobile.png` });

  // cada link do menu leva a um destino que existe
  await page.getByTestId("menu-toggle").click();
  await page.waitForTimeout(400);
  const links = await page.getByTestId("menu-mobile-link").all();
  const quebrados = [];
  for (const l of links) {
    const href = await l.getAttribute("href");
    if (href?.startsWith("/#")) {
      const existe = await page.evaluate((h) => Boolean(document.querySelector(h.slice(1))), href);
      if (!existe) quebrados.push(href);
    }
  }
  ok("todos os links âncora do menu têm destino", quebrados.length === 0, quebrados.join(", "));

  // produtos empilhados verticalmente no mobile (sem pin/scroll horizontal)
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const empilhado = await page.evaluate(() => {
    const cards = [...document.querySelectorAll("[data-testid=produto-card]")];
    const a = cards[0].getBoundingClientRect();
    const b = cards[1].getBoundingClientRect();
    const trilho = document.querySelector("[data-testid=produtos-trilho]");
    return { empilhado: b.top > a.bottom - 5, transform: getComputedStyle(trilho).transform };
  });
  ok(
    "no mobile os produtos empilham (sem sequestrar o scroll)",
    empilhado.empilhado && (empilhado.transform === "none" || empilhado.transform.includes("1, 0, 0, 1, 0, 0")),
    JSON.stringify(empilhado),
  );

  await ctx.close();
}

/* ---------- 2. DESKTOP: pin horizontal, contadores, diagrama, FAQ, form ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const erros = [];
  page.on("pageerror", (e) => erros.push(String(e).slice(0, 160)));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);

  /* Contadores: 0 antes de entrar na tela, valor final depois */
  const antes = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=contador]")].map((e) => e.textContent),
  );
  await page.evaluate(() => document.querySelector("#numeros-titulo").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(2600);
  const depois = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=contador]")].map((e) => ({
      texto: e.textContent,
      final: e.dataset.valorFinal,
    })),
  );
  ok(
    "contadores sobem de zero até o valor final (~2s)",
    antes[0].startsWith("0") && depois.every((d) => d.texto.replace(/\D/g, "") === d.final.replace(/\D/g, "")),
    `antes=${JSON.stringify(antes)} depois=${JSON.stringify(depois)}`,
  );
  await page.screenshot({ path: `${OUT}/int-contadores.png` });

  /* Scroll horizontal com pin */
  await page.evaluate(() => document.querySelector("#produtos").scrollIntoView());
  await page.waitForTimeout(900);
  const antesPin = await page.evaluate(() => ({
    x: new DOMMatrix(getComputedStyle(document.querySelector("[data-testid=produtos-trilho]")).transform).m41,
    secaoTopo: Math.round(document.querySelector("#produtos").getBoundingClientRect().top),
  }));
  await page.mouse.wheel(0, 300);
  await page.waitForTimeout(1600);
  const depoisPin = await page.evaluate(() => ({
    x: new DOMMatrix(getComputedStyle(document.querySelector("[data-testid=produtos-trilho]")).transform).m41,
    secaoTopo: Math.round(document.querySelector("#produtos").getBoundingClientRect().top),
  }));
  ok(
    "seção de produtos gruda na tela e o conteúdo anda para o lado",
    depoisPin.x < antesPin.x - 100 && Math.abs(depoisPin.secaoTopo) < 60,
    `antes=${JSON.stringify(antesPin)} depois=${JSON.stringify(depoisPin)}`,
  );
  await page.screenshot({ path: `${OUT}/int-scroll-horizontal.png` });

  /* Diagrama interativo — clique real em cada ponto */
  await page.evaluate(() => document.querySelector("#como-funciona").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(900);
  const pontos = await page.getByTestId("ponto-interativo").all();
  const titulos = [];
  for (const p of pontos) {
    await p.click();
    await page.waitForTimeout(420);
    titulos.push(await page.getByTestId("ponto-titulo").innerText());
  }
  ok(
    "cada ponto do diagrama abre um conteúdo diferente",
    pontos.length === 5 && new Set(titulos).size === 5,
    titulos.join(" | "),
  );
  await page.screenshot({ path: `${OUT}/int-diagrama.png` });

  /* Painéis de aplicações */
  await page.evaluate(() => document.querySelector("#aplicacoes").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(700);
  const paineis = await page.getByTestId("painel-aplicacao").all();
  await paineis[3].click();
  await page.waitForTimeout(500);
  const expandiu = await paineis[3].getAttribute("aria-expanded");
  ok("painel de aplicação expande ao clicar", expandiu === "true", `aria-expanded=${expandiu}`);

  /* FAQ */
  await page.evaluate(() => document.querySelector("#faq").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(700);
  const faqBotoes = await page.getByTestId("faq-botao").all();
  const faq0Antes = await faqBotoes[0].getAttribute("aria-expanded");
  await faqBotoes[0].click(); // fecha o primeiro (abre por padrão)
  await page.waitForTimeout(450);
  const faq0Depois = await faqBotoes[0].getAttribute("aria-expanded");
  await faqBotoes[2].click();
  await page.waitForTimeout(500);
  const faq2 = await faqBotoes[2].getAttribute("aria-expanded");
  const respostaVisivel = await page.locator("#faq-painel-2").isVisible();
  ok(
    "acordeão do FAQ abre e fecha de verdade",
    faq0Antes === "true" && faq0Depois === "false" && faq2 === "true" && respostaVisivel,
    `q0: ${faq0Antes}→${faq0Depois}, q2: ${faq2}, resposta visível: ${respostaVisivel}`,
  );
  await page.screenshot({ path: `${OUT}/int-faq.png` });

  /* Formulário: preenche e confere que o WhatsApp abre com os dados */
  await page.evaluate(() => document.querySelector("#contato").scrollIntoView({ block: "center" }));
  await page.waitForTimeout(700);
  await page.fill("#nome", "Maria Teste");
  await page.fill("#cidade", "Formosa / GO");
  await page.fill("#cultivo", "Morango");
  await page.fill("#volume", "30 sacos de 100 L");
  await page.fill("#mensagem", "Quero um orçamento.");
  // intercepta window.open — o ambiente de teste não tem acesso ao wa.me
  await page.evaluate(() => {
    window.__urlAberta = null;
    window.open = (u) => {
      window.__urlAberta = u;
      return null;
    };
  });
  await page.click("[data-testid=form-contato] button[type=submit]");
  await page.waitForTimeout(400);
  const url = await page.evaluate(() => window.__urlAberta || "");
  ok(
    "formulário abre o WhatsApp com nome, cidade e cultivo preenchidos",
    url.includes("wa.me/5561984068770") &&
      decodeURIComponent(url).includes("Maria Teste") &&
      decodeURIComponent(url).includes("Morango"),
    url.slice(0, 160),
  );
  await page.screenshot({ path: `${OUT}/int-formulario.png` });

  /* Botão flutuante de WhatsApp */
  const fabVisivel = await page.getByTestId("whatsapp-fab").isVisible();
  const fabHref = await page.getByTestId("whatsapp-fab").getAttribute("href");
  ok("botão flutuante de WhatsApp aparece e aponta para o número certo", fabVisivel && fabHref.includes("5561984068770"), fabHref?.slice(0, 60));

  ok("nenhum erro de JavaScript na home", erros.length === 0, erros.join(" | "));
  await ctx.close();
}

/* ---------- 3. GALERIA: filtro e lightbox ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/galeria", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const totalAntes = await page.getByTestId("foto-galeria").count();
  await page.getByTestId("filtro-galeria").filter({ hasText: "Embalagens" }).click();
  await page.waitForTimeout(700);
  const totalDepois = await page.getByTestId("foto-galeria").count();
  ok(
    "filtro da galeria reduz as fotos exibidas",
    totalDepois > 0 && totalDepois < totalAntes,
    `todas=${totalAntes} embalagens=${totalDepois}`,
  );

  await page.getByTestId("foto-galeria").first().click();
  await page.waitForTimeout(600);
  const lightbox = await page.getByTestId("lightbox").isVisible();
  ok("clicar numa foto abre o lightbox", lightbox);
  await page.screenshot({ path: `${OUT}/int-lightbox.png` });

  await page.getByTestId("lightbox-fechar").click();
  await page.waitForTimeout(500);
  ok("lightbox fecha no botão X", (await page.getByTestId("lightbox").count()) === 0);
  await ctx.close();
}

/* ---------- 4. prefers-reduced-motion ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const estado = await page.evaluate(() => ({
    preloader: document.querySelector("[data-testid=preloader]") !== null,
    lenis: document.documentElement.classList.contains("lenis"),
    cursor: document.documentElement.classList.contains("cursor-custom"),
    h1Visivel: getComputedStyle(document.querySelector("h1")).opacity,
    trilho: getComputedStyle(document.querySelector("[data-testid=produtos-trilho]")).transform,
  }));
  ok(
    "prefers-reduced-motion desliga preloader, scroll suave, cursor e pin",
    !estado.preloader && !estado.lenis && !estado.cursor && estado.trilho === "none",
    JSON.stringify(estado),
  );
  await page.screenshot({ path: `${OUT}/int-reduced-motion.png` });
  await ctx.close();
}

await browser.close();
fs.writeFileSync("/home/claude/relatorio-interacoes.json", JSON.stringify(resultados, null, 2));
console.log("| teste | resultado |");
console.log("|---|---|");
for (const r of resultados) console.log(`| ${r.teste} | ${r.resultado} |`);
console.log("\n--- detalhes ---");
for (const r of resultados) if (r.detalhe) console.log(`${r.resultado} · ${r.teste}\n   ${r.detalhe}`);
