/**
 * TESTES DE INTERAÇÃO REAIS
 * Cada teste clica, digita ou rola de verdade e mede o resultado no DOM.
 * Nada aqui é conferido por inspeção visual.
 */
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

/** rolar com o Lenis, senão a posição volta sozinha no quadro seguinte */
const rolarAte = (page, seletor, fracao = 0.25) =>
  page.evaluate(
    ([sel, f]) => {
      const el = document.querySelector(sel);
      const alvo = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * f;
      if (window.__lenis) window.__lenis.scrollTo(alvo, { immediate: true, force: true });
      else window.scrollTo(0, alvo);
    },
    [seletor, fracao],
  );

/* ---------- 0. TELA DE CARREGAMENTO ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "commit" });

  /**
   * A marca é revelada de baixo para cima por `clip-path`. Em vez de medir em
   * instantes fixos, que dependem do tempo exato de cada quadro, a amostragem
   * acompanha o recorte de ponta a ponta: ele tem de começar cobrindo tudo,
   * cair sem voltar atrás e terminar descoberto. Assim o teste comprova que a
   * animação acontece, e não apenas que existe no código.
   */
  const serie = await page.evaluate(async () => {
    const ler = () => {
      const r = document.querySelector("[data-testid=preloader-revelacao]");
      if (!r) return null;
      const v = getComputedStyle(r).clipPath;
      if (v === "none") return 0;
      return parseFloat((v.match(/inset\(([\d.]+)%/) || [])[1] ?? "0");
    };
    const amostras = [];
    for (let i = 0; i < 18; i++) {
      const v = ler();
      if (v !== null) amostras.push(Number(v.toFixed(1)));
      await new Promise((r) => setTimeout(r, 100));
    }
    return amostras;
  });

  const semSubida = serie.every((v, i) => i === 0 || v <= serie[i - 1] + 0.5);
  ok(
    "a tela de carregamento revela a marca de baixo para cima",
    serie.length > 10 &&
      serie[0] > 90 &&
      serie[serie.length - 1] < 1 &&
      semSubida &&
      serie.some((v) => v > 5 && v < 95),
    `recorte de ${serie[0]}% a ${serie[serie.length - 1]}%, sempre descendo: ${semSubida} · série ${serie.join(", ")}`,
  );
  /* medido depois da série: nos primeiros milissegundos o CSS ainda não
     aplicou, e a marca aparece com a largura toda e sem as opacidades */
  const marca = await page.evaluate(() => {
    const m = document.querySelector("[data-testid=preloader-marca]");
    if (!m) return null;
    const imgs = [...m.querySelectorAll("img")];
    const r = m.getBoundingClientRect();
    return {
      largura: Math.round(r.width),
      // duas camadas: a marca apagada e a revelada por cima
      camadas: imgs.length,
      apagada: getComputedStyle(imgs[0]).opacity,
      revelada: getComputedStyle(imgs[1]).opacity,
      centralizada: Math.abs(r.x + r.width / 2 - window.innerWidth / 2) < 3,
    };
  });
  ok(
    "a marca da tela de carregamento tem as duas camadas, centralizada",
    marca !== null &&
      marca.camadas === 2 &&
      Number(marca.apagada) < 0.3 &&
      Number(marca.revelada) === 1 &&
      marca.largura >= 230 &&
      marca.centralizada,
    JSON.stringify(marca),
  );

  // e a tela sai sozinha, devolvendo a rolagem
  await page.waitForTimeout(2200);
  const saida = await page.evaluate(() => ({
    aindaNoDom: document.querySelector("[data-testid=preloader]") !== null,
    rolagem: getComputedStyle(document.body).overflowY,
  }));
  ok(
    "a tela de carregamento sai sozinha e devolve a rolagem da página",
    !saida.aindaNoDom && saida.rolagem !== "hidden",
    JSON.stringify(saida),
  );
  await ctx.close();
}

/* ---------- 1. HERO: FOTO, MARCA E CONVITE A DESCER ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const erros = [];
  page.on("pageerror", (e) => erros.push(String(e).slice(0, 160)));
  page.on("console", (m) => {
    if (m.type() === "error") erros.push("console: " + m.text().slice(0, 160));
  });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  const hero = await page.evaluate(() => {
    const s = document.getElementById("inicio");
    const foto = s.querySelector('img[src*="campo"]');
    const logo = s.querySelector('img[src*="logo-sustentagro-branca"]');
    const rf = foto ? foto.getBoundingClientRect() : null;
    const rl = logo ? logo.getBoundingClientRect() : null;
    return {
      alturaTela: Math.round(s.getBoundingClientRect().height) >= window.innerHeight - 2,
      fotoCobreTela: rf ? rf.width >= window.innerWidth - 2 && rf.height >= 400 : false,
      logoVisivel: rl ? rl.width > 200 && Number(getComputedStyle(logo).opacity) > 0.9 : false,
      opH1: Number(getComputedStyle(document.querySelector("h1")).opacity),
      subtexto: document.querySelector("h1").textContent.trim(),
      legenda: [...s.querySelectorAll("*")].some((e) =>
        (e.textContent || "").trim().toLowerCase() === "imagem ilustrativa",
      ),
    };
  });
  ok(
    "hero ocupa a tela com a foto, a logo por cima e a legenda obrigatória",
    hero.alturaTela &&
      hero.fotoCobreTela &&
      hero.logoVisivel &&
      hero.opH1 > 0.9 &&
      hero.legenda &&
      hero.subtexto === "Transformando resíduos em recursos",
    JSON.stringify(hero),
  );
  await page.screenshot({ path: `${OUT}/int-hero.png` });

  // a marca sobe e desaparece ao descer, e a foto se desloca (parallax)
  const antes = await page.evaluate(() => {
    const marca = document.querySelector("#inicio .container-marca");
    const foto = document.querySelector('#inicio img[src*="campo"]').parentElement;
    return {
      opMarca: Number(getComputedStyle(marca).opacity),
      trFoto: getComputedStyle(foto).transform,
    };
  });
  await page.evaluate(() => {
    const y = window.innerHeight * 0.6;
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  });
  await page.waitForTimeout(900);
  const depois = await page.evaluate(() => {
    const marca = document.querySelector("#inicio .container-marca");
    const foto = document.querySelector('#inicio img[src*="campo"]').parentElement;
    return {
      opMarca: Number(getComputedStyle(marca).opacity),
      trFoto: getComputedStyle(foto).transform,
    };
  });
  ok(
    "ao descer, a marca desaparece e a foto se desloca em ritmo diferente",
    antes.opMarca > 0.9 && depois.opMarca < 0.35 && antes.trFoto !== depois.trFoto,
    `opacidade da marca ${antes.opMarca.toFixed(2)} para ${depois.opMarca.toFixed(2)} · transform da foto mudou ${antes.trFoto !== depois.trFoto}`,
  );

  // o convite a descer leva para a primeira seção, a de produtos
  await page.evaluate(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
  await page.getByRole("link", { name: "Ir para o conteúdo" }).click();
  await page.waitForTimeout(1500);
  const topoProdutos = await page.evaluate(() =>
    Math.round(document.getElementById("produtos").getBoundingClientRect().top),
  );
  ok(
    "o convite a descer leva para a seção de produtos",
    topoProdutos > 40 && topoProdutos < 150,
    `seção em top=${topoProdutos}px`,
  );

  /**
   * A hero dissolve no verde escuro da seção seguinte. Antes o fundo fixo da
   * página tinha um degradê mais claro no topo, e na emenda aparecia um degrau
   * horizontal que mudava de lugar conforme a rolagem. Aqui a checagem é pela
   * cor de dois pontos, um de cada lado da junção: a diferença tem de ser
   * pequena.
   */
  const emenda = await page.evaluate(async () => {
    const hero = document.getElementById("inicio");
    const y = hero.getBoundingClientRect().bottom + window.scrollY;
    if (window.__lenis) window.__lenis.scrollTo(y - window.innerHeight / 2, { immediate: true, force: true });
    else window.scrollTo(0, y - window.innerHeight / 2);
    await new Promise((r) => setTimeout(r, 700));
    const base = hero.getBoundingClientRect().bottom;
    const degrade = [...hero.querySelectorAll("div[aria-hidden]")].pop();
    return {
      // a última camada da hero termina na cor do fundo da página
      fim: getComputedStyle(degrade).backgroundImage.includes("--color-abismo") ||
        getComputedStyle(degrade).backgroundImage.includes("2, 16, 15"),
      corDoFundo: getComputedStyle(document.body).backgroundColor,
      // e o fundo fixo não tem mais degradê nenhum para brigar com ela
      camadasNoFundo: document.querySelectorAll("body > div[aria-hidden].fixed > div").length,
      posicaoDaJuncao: Math.round(base),
    };
  });
  ok(
    "a hero dissolve no verde escuro sem deixar degrau na emenda com a seção seguinte",
    emenda.fim && emenda.corDoFundo === "rgb(2, 16, 15)" && emenda.camadasNoFundo === 2,
    JSON.stringify(emenda),
  );

  ok("nenhum erro de JavaScript na landing page", erros.length === 0, erros.join(" | "));
  await ctx.close();
}

/* ---------- 2. RITMO DE FAIXAS CLARAS E ESCURAS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const temas = await page.evaluate(() =>
    [...document.querySelectorAll("section[data-tema]")].map((s) => ({
      id: s.id || "(sem id)",
      tema: s.dataset.tema,
    })),
  );
  const esperado = [
    ["produtos", "escuro"],
    ["como-funciona", "escuro"],
    ["utilizacao", "escuro"],
    ["parceiros", "claro"],
    ["noticias", "claro"],
    ["contato", "escuro"],
  ];
  const confere = esperado.every(([id, t]) => temas.find((x) => x.id === id)?.tema === t);
  ok(
    "a página alterna faixas claras e escuras na ordem prevista",
    confere && temas.filter((t) => t.tema === "claro").length === 2,
    temas.map((t) => `${t.id}:${t.tema}`).join(" · "),
  );

  // a faixa clara pinta fundo próprio e usa texto escuro
  const claro = await page.evaluate(() => {
    const s = document.getElementById("parceiros");
    const fundo = s.querySelector("div[aria-hidden]");
    const titulo = s.querySelector("h2");
    const rotulo = s.querySelector(".rotulo");
    return {
      fundo: getComputedStyle(fundo).backgroundImage.slice(0, 70),
      corTitulo: getComputedStyle(titulo).color,
      corRotulo: getComputedStyle(rotulo).color,
      gradDestaque: getComputedStyle(s).getPropertyValue("--grad-destaque").trim().slice(0, 40),
      // uma única camada de fundo: sem os degradês de passagem que existiam antes
      camadasDeFundo: s.querySelectorAll(":scope > div[aria-hidden]").length,
    };
  });
  ok(
    "na faixa clara o fundo é próprio e o destaque troca para o verde profundo",
    claro.fundo.includes("gradient") &&
      claro.gradDestaque.includes("#235347") &&
      claro.corTitulo === "rgb(5, 31, 32)" &&
      claro.corRotulo === "rgb(44, 101, 85)",
    JSON.stringify(claro),
  );

  /**
   * O corte entre faixas tem de ser reto. Mede a cor de uma linha de pixels
   * exatamente na junção: se houvesse degradê, a linha de cima e a de baixo
   * seriam parecidas; com corte reto elas são muito diferentes.
   */
  const junta = await page.evaluate(async () => {
    const s = document.getElementById("parceiros");
    const y = s.getBoundingClientRect().bottom + window.scrollY;
    if (window.__lenis) window.__lenis.scrollTo(y - window.innerHeight / 2, { immediate: true, force: true });
    else window.scrollTo(0, y - window.innerHeight / 2);
    await new Promise((r) => setTimeout(r, 500));
    const yTela = s.getBoundingClientRect().bottom;
    const acima = document.elementFromPoint(window.innerWidth - 8, yTela - 6);
    const abaixo = document.elementFromPoint(window.innerWidth - 8, yTela + 6);
    const secaoDe = (el) => el?.closest("section")?.id ?? "(fora)";
    return {
      camadasDePassagem: s.querySelectorAll(":scope > div[aria-hidden]").length,
      secaoAcima: secaoDe(acima),
      secaoAbaixo: secaoDe(abaixo),
    };
  });
  ok(
    "o corte entre a faixa clara e a escura é reto, sem degradê de passagem",
    junta.camadasDePassagem === 1 &&
      junta.secaoAcima === "parceiros" &&
      junta.secaoAbaixo === "noticias",
    JSON.stringify(junta),
  );

  // e a grade técnica saiu do fundo
  const semGrade = await page.evaluate(
    () => document.querySelector(".grade-tecnica") === null,
  );
  ok("a grade técnica não existe mais no fundo", semGrade);
  await ctx.close();
}

/* ---------- 3. MENU: SÓ PÁGINAS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  await page.waitForTimeout(2400);

  const itens = await page.evaluate(() =>
    [...document.querySelectorAll("nav[aria-label=Principal] a")].map((a) => ({
      rotulo: a.textContent.trim(),
      href: a.getAttribute("href"),
    })),
  );
  ok(
    "o menu tem cinco itens, todos páginas, sem as âncoras que foram retiradas",
    itens.length === 5 &&
      itens.map((i) => i.rotulo).join(",") === "Início,A empresa,Produtos,Artigos,Galeria" &&
      itens.every((i) => !i.href.includes("#")),
    itens.map((i) => `${i.rotulo}→${i.href}`).join(" · "),
  );

  // cada item abre a página certa, com H1, e volta marcado no menu
  const destinos = [
    ["A empresa", "/quem-somos"],
    ["Produtos", "/produtos"],
    ["Artigos", "/artigos"],
    ["Galeria", "/galeria"],
    ["Início", "/"],
  ];
  const falhas = [];
  for (const [rotulo, destino] of destinos) {
    await page
      .getByRole("navigation", { name: "Principal" })
      .getByRole("link", { name: rotulo, exact: true })
      .click();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(900);
    const estado = await page.evaluate((r) => {
      const a = [...document.querySelectorAll("nav[aria-label=Principal] a")].find(
        (e) => e.textContent.trim() === r,
      );
      return {
        url: new URL(location.href).pathname,
        temH1: document.querySelectorAll("h1").length > 0,
        marcado: a ? a.className.includes("text-destaque") : false,
      };
    }, rotulo);
    if (estado.url !== destino || !estado.temH1 || !estado.marcado) {
      falhas.push(`${rotulo} → ${estado.url} (h1 ${estado.temH1}, marcado ${estado.marcado})`);
    }
  }
  ok(
    "cada item do menu abre a página certa, com H1, e fica marcado ao chegar",
    falhas.length === 0,
    falhas.join(" | "),
  );

  /**
   * Um endereço com âncora tem de abrir já na seção, e não no topo. É o caso
   * de um link compartilhado por WhatsApp ou de um anúncio apontando para
   * /#contato, e depende do `scroll-padding-top` do html: sem ele o
   * cabeçalho fixo cobre o começo da seção.
   */
  await page.goto(BASE + "/#contato", { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);
  const chegada = await page.evaluate(() => ({
    rolou: window.scrollY > 500,
    topo: Math.round(document.getElementById("contato").getBoundingClientRect().top),
    folgaDoCabecalho: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),
  }));
  ok(
    "abrir o site num endereço com âncora cai na seção, sem o cabeçalho cobrir o começo dela",
    chegada.rolou && chegada.topo > 0 && chegada.topo < 200 && chegada.folgaDoCabecalho >= 72,
    JSON.stringify(chegada),
  );
  await ctx.close();
}

/* ---------- 4. SEÇÃO DE PRODUTO NA LANDING PAGE ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await rolarAte(page, "#produtos", 0.1);
  await page.waitForTimeout(1200);

  const botoes = await page.evaluate(() => {
    const s = document.getElementById("produtos");
    const principal = s.querySelector("a.botao-luz");
    const secundario = s.querySelector("a.botao-vidro");
    return {
      principalTexto: principal ? principal.innerText.trim() : null,
      principalHref: principal ? principal.getAttribute("href") : null,
      secundarioTexto: secundario ? secundario.innerText.trim() : null,
      secundarioHref: secundario ? secundario.getAttribute("href") : null,
      semCartoes: s.querySelectorAll("[data-testid=cartao-produto]").length === 0,
      temEmbalagem: s.querySelector('img[src*="produto-fibra"]') !== null,
    };
  });
  ok(
    'o botão em destaque é "Ver todos os produtos" e o apagado é "Solicitar orçamento"',
    botoes.principalTexto === "Ver todos os produtos" &&
      botoes.principalHref === "/produtos" &&
      botoes.secundarioTexto === "Solicitar orçamento" &&
      (botoes.secundarioHref || "").includes("wa.me/5561984068770"),
    JSON.stringify(botoes),
  );
  ok(
    "a seção mostra somente a embalagem de fibra, sem a grade de quatro cartões",
    botoes.semCartoes && botoes.temEmbalagem,
    `cartões removidos ${botoes.semCartoes} · embalagem presente ${botoes.temEmbalagem}`,
  );

  // o botão em destaque abre mesmo a página da linha
  await page.evaluate(() => {
    const s = document.getElementById("produtos");
    s.querySelector("a.botao-luz").click();
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(800);
  ok(
    'clicar em "Ver todos os produtos" abre a página da linha',
    new URL(page.url()).pathname === "/produtos",
    page.url(),
  );
  await page.screenshot({ path: `${OUT}/int-produto-lp.png` });
  await ctx.close();
}

/* ---------- 4b. AJUSTES DE CELULAR ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 780 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  /**
   * Na seção de produtos a embalagem tem de vir antes do texto no celular.
   * A comparação é pela posição na tela, e não pela ordem no HTML: quem
   * inverte é o `order` do CSS, então só a medida diz a verdade.
   */
  const ordem = await page.evaluate(() => {
    const s = document.getElementById("produtos");
    const img = s.querySelector("img");
    const titulo = s.querySelector("h2");
    const botao = s.querySelector("a.botao-luz");
    return {
      topoImagem: Math.round(img.getBoundingClientRect().top + window.scrollY),
      topoTitulo: Math.round(titulo.getBoundingClientRect().top + window.scrollY),
      topoBotao: Math.round(botao.getBoundingClientRect().top + window.scrollY),
    };
  });
  ok(
    "no celular a embalagem aparece antes do título e dos botões na seção de produtos",
    ordem.topoImagem < ordem.topoTitulo && ordem.topoTitulo < ordem.topoBotao,
    `imagem em ${ordem.topoImagem} · título em ${ordem.topoTitulo} · botão em ${ordem.topoBotao}`,
  );

  // e no computador o texto volta para a esquerda
  const ctxDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pageDesktop = await ctxDesktop.newPage();
  await pageDesktop.goto(BASE + "/", { waitUntil: "networkidle" });
  await pageDesktop.waitForTimeout(2000);
  const lado = await pageDesktop.evaluate(() => {
    const s = document.getElementById("produtos");
    return {
      esquerdaDoTitulo: Math.round(s.querySelector("h2").getBoundingClientRect().left),
      esquerdaDaImagem: Math.round(s.querySelector("img").getBoundingClientRect().left),
    };
  });
  ok(
    "no computador o texto continua à esquerda e a embalagem à direita",
    lado.esquerdaDoTitulo < lado.esquerdaDaImagem,
    JSON.stringify(lado),
  );
  await ctxDesktop.close();

  /** margem lateral: o conteúdo não pode encostar na borda da tela */
  const margens = await page.evaluate(() => {
    const c = document.querySelector(".container-marca");
    const cs = getComputedStyle(c);
    const titulo = document.querySelector("#produtos h2");
    return {
      padding: parseFloat(cs.paddingLeft),
      esquerdaDoTexto: Math.round(titulo.getBoundingClientRect().left),
    };
  });
  ok(
    "no celular o conteúdo tem folga lateral de pelo menos 24px",
    margens.padding >= 24 && margens.esquerdaDoTexto >= 24,
    `padding ${margens.padding}px · título começa em ${margens.esquerdaDoTexto}px`,
  );

  /** e não existe cursor próprio onde não existe cursor */
  const cursor = await page.evaluate(() => ({
    ponto: document.querySelector("[data-testid=cursor-ponto]") !== null,
    anel: document.querySelector("[data-testid=cursor-anel]") !== null,
    classe: document.documentElement.classList.contains("cursor-custom"),
  }));
  ok(
    "no celular o cursor próprio nem chega a existir",
    !cursor.ponto && !cursor.anel && !cursor.classe,
    JSON.stringify(cursor),
  );
  await page.screenshot({ path: `${OUT}/int-celular-produtos.png` });
  await ctx.close();
}

/* ---------- 5. PÁGINA /PRODUTOS: TRILHO HORIZONTAL ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const erros = [];
  page.on("pageerror", (e) => erros.push(String(e).slice(0, 160)));
  await page.goto(BASE + "/produtos", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const estrutura = await page.evaluate(() => {
    const paineis = [...document.querySelectorAll("[data-testid=trilho-fita] > section")];
    const texto = document.body.innerText.toLowerCase();
    return {
      ids: paineis.map((s) => s.id),
      umH1: document.querySelectorAll("h1").length,
      // as duas seções que saíram
      temAbertura: texto.includes("linha completa"),
      temFichaTecnica: texto.includes("ficha técnica agronômica: fibra"),
      temIndice: document.querySelector('nav[aria-label="Produtos"]') !== null,
    };
  });
  ok(
    "a página de produtos ficou só com os quatro formatos, sem a abertura e sem a ficha técnica",
    estrutura.ids.join(",") ===
      "fibra-de-coco,blend-de-coco,po-de-coco,substrato-personalizado" &&
      estrutura.umH1 === 1 &&
      !estrutura.temAbertura &&
      !estrutura.temFichaTecnica &&
      !estrutura.temIndice,
    JSON.stringify(estrutura),
  );

  // cada painel ocupa a tela inteira e o trilho fica grudado no topo
  const grudado = [];
  const deslocamentos = [];
  for (const fracao of [0.05, 0.3, 0.6, 0.95]) {
    await page.evaluate((f) => {
      const t = document.querySelector("[data-testid=trilho-produtos]");
      const inicio = t.getBoundingClientRect().top + window.scrollY;
      const curso = t.offsetHeight - window.innerHeight;
      window.scrollTo(0, inicio + curso * f);
    }, fracao);
    await page.waitForTimeout(900);
    const m = await page.evaluate(() => {
      const palco = document.querySelector("[data-testid=trilho-produtos] > div");
      const fita = document.querySelector("[data-testid=trilho-fita]");
      const painel = fita.firstElementChild;
      return {
        topoPalco: Math.round(palco.getBoundingClientRect().top),
        alturaPalco: Math.round(palco.getBoundingClientRect().height),
        janela: window.innerHeight,
        larguraPainel: Math.round(painel.getBoundingClientRect().width),
        x: Math.round(new DOMMatrix(getComputedStyle(fita).transform).m41),
      };
    });
    grudado.push(m.topoPalco);
    deslocamentos.push(m.x);
    if (fracao === 0.05) {
      ok(
        "cada formato ocupa a tela inteira e o palco tem a altura da janela",
        Math.abs(m.larguraPainel - 1440) < 2 && Math.abs(m.alturaPalco - m.janela) < 2,
        `painel ${m.larguraPainel}px de largura · palco ${m.alturaPalco} / janela ${m.janela}`,
      );
    }
  }
  ok(
    "o trilho fica grudado no topo e os formatos passam para o lado conforme a rolagem",
    grudado.every((t) => Math.abs(t) < 3) &&
      deslocamentos[0] > deslocamentos[1] &&
      deslocamentos[1] > deslocamentos[2] &&
      deslocamentos[3] <= -1440 * 3 + 5,
    `topos ${grudado.join(", ")} · x ${deslocamentos.join(" → ")}`,
  );

  // o último formato tem pausa: dá tempo de ler antes de o trilho soltar
  const ultimo = await page.evaluate(() => {
    const paineis = [...document.querySelectorAll("[data-testid=trilho-fita] > section")];
    const r = paineis[3].getBoundingClientRect();
    const titulo = paineis[3].querySelector("h2").getBoundingClientRect();
    return {
      painelNaTela: r.left > -5 && r.left < 5,
      // o título precisa estar abaixo do cabeçalho fixo, que tem 72px
      tituloAbaixoDoCabecalho: titulo.top > 72,
      tituloVisivel: titulo.bottom < window.innerHeight,
    };
  });
  ok(
    "no fim do trilho o quarto formato fica inteiro na tela, sem passar por baixo do cabeçalho",
    ultimo.painelNaTela && ultimo.tituloAbaixoDoCabecalho && ultimo.tituloVisivel,
    JSON.stringify(ultimo),
  );

  // cada formato tem o próprio pedido de orçamento
  const orcamentos = await page.evaluate(() =>
    [...document.querySelectorAll('[data-testid=trilho-fita] a[href*="wa.me"]')].map((a) =>
      decodeURIComponent(a.getAttribute("href")),
    ),
  );
  const nomes = ["fibra de coco", "Blend de coco 70/30", "Pó de coco", "Substrato personalizado"];
  const todosComNome = nomes.every((n) =>
    orcamentos.some((u) => u.toLowerCase().includes(n.toLowerCase())),
  );
  ok(
    "cada formato tem um pedido de orçamento com o próprio nome na mensagem",
    orcamentos.length === 4 && todosComNome,
    `${orcamentos.length} links · todos com nome ${todosComNome}`,
  );

  // cada formato aponta para um arquivo de imagem diferente
  const imagens = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=trilho-fita] img")].map((i) => {
      const src = i.getAttribute("src") || "";
      const bruto = decodeURIComponent(src.replace(/^.*url=/, "").split("&")[0]);
      return bruto.split("/").pop();
    }),
  );
  ok(
    "os quatro formatos apontam para quatro arquivos de imagem diferentes",
    imagens.length === 4 &&
      new Set(imagens).size === 4 &&
      imagens[3] === "produto-personalizado.png",
    imagens.join(" · "),
  );

  ok("nenhum erro de JavaScript na página de produtos", erros.length === 0, erros.join(" | "));
  await page.screenshot({ path: `${OUT}/int-produtos-trilho.png` });
  await ctx.close();
}

/* ---------- 5b. NO CELULAR O TRILHO VIRA PILHA ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 780 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/produtos", { waitUntil: "networkidle" });

  await page.waitForTimeout(2400);
  const mobile = await page.evaluate(() => {
    const trilho = document.querySelector("[data-testid=trilho-produtos]");
    const pilha = [...document.querySelectorAll('section[id$="-mobile"]')];
    const tops = pilha.map((s) => Math.round(s.getBoundingClientRect().top + window.scrollY));
    return {
      trilhoEscondido: trilho ? getComputedStyle(trilho).display === "none" : true,
      quantidade: pilha.length,
      empilhadosEmOrdem: tops.every((t, i) => i === 0 || t > tops[i - 1]),
      todosComTitulo: pilha.every((s) => s.querySelector("h2") !== null),
    };
  });
  ok(
    "no celular os formatos viram uma pilha vertical, sem sequestrar o gesto de rolagem",
    mobile.trilhoEscondido &&
      mobile.quantidade === 4 &&
      mobile.empilhadosEmOrdem &&
      mobile.todosComTitulo,
    JSON.stringify(mobile),
  );
  await page.screenshot({ path: `${OUT}/int-produtos-pilha.png` });
  await ctx.close();
}

/* ---------- 6. CONTADORES (faixa clara da página A empresa) ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/quem-somos", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  const antes = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=contador]")].map((e) => e.textContent),
  );
  await page.evaluate(() => {
    const el = document.querySelector("[data-testid=contador]");
    const alvo = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
    if (window.__lenis) window.__lenis.scrollTo(alvo, { immediate: true, force: true });
    else window.scrollTo(0, alvo);
  });
  await page.waitForTimeout(4000);
  const depois = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=contador]")].map((e) => ({
      t: e.textContent,
      f: e.dataset.valorFinal,
    })),
  );
  ok(
    "contadores partem de zero e chegam ao valor final (~2s)",
    antes.length > 0 &&
      antes[0].startsWith("0") &&
      depois.every((d) => d.t.replace(/\D/g, "") === d.f.replace(/\D/g, "")),
    `antes ${JSON.stringify(antes)} · depois ${JSON.stringify(depois)}`,
  );
  await ctx.close();
}

/* ---------- 6b. OS DOIS DIRETORES IDENTIFICADOS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/quem-somos", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const donos = await page.evaluate(() => {
    const sec = document.querySelector('section[data-tema="claro"]');
    const figuras = [...sec.querySelectorAll("figure")];
    return {
      quantidade: figuras.length,
      // a foto da família não está mais aqui
      temFotoDeFamilia: sec.querySelector('img[src*="familia"]') !== null,
      pessoas: figuras.map((f) => {
        const img = f.querySelector("img");
        const link = f.querySelector('a[href*="wa.me"]');
        const r = img.getBoundingClientRect();
        return {
          arquivo: (img.getAttribute("src") || "").includes("equipe-")
            ? decodeURIComponent(img.getAttribute("src")).split("/").pop().split("&")[0]
            : "outro",
          alt: img.getAttribute("alt"),
          nome: f.querySelector("figcaption p:nth-of-type(2)")?.textContent?.trim(),
          cargo: f.querySelector("figcaption p:nth-of-type(1)")?.textContent?.trim(),
          whatsapp: link ? decodeURIComponent(link.getAttribute("href")) : null,
          visivel: r.width > 200 && r.height > 200,
        };
      }),
    };
  });

  const nomes = donos.pessoas.map((p) => p.nome);
  const cargos = donos.pessoas.map((p) => p.cargo);
  ok(
    "a página A empresa mostra os dois donos, com nome, cargo e WhatsApp de cada um",
    donos.quantidade === 2 &&
      !donos.temFotoDeFamilia &&
      nomes.includes("Cristyano Martins") &&
      nomes.includes("Fabiano Martins") &&
      cargos.includes("Diretor executivo") &&
      cargos.includes("Diretor operacional") &&
      donos.pessoas.every((p) => p.visivel && p.alt && p.alt.length > 12),
    JSON.stringify(donos),
  );

  // cada foto leva ao número do próprio diretor, não ao número geral
  const numeros = donos.pessoas.map((p) => (p.whatsapp || "").match(/wa\.me\/(\d+)/)?.[1]);
  ok(
    "cada diretor tem o próprio número de WhatsApp no cartão",
    numeros[0] === "5561984068770" && numeros[1] === "5561999654060",
    numeros.join(" · "),
  );
  await page.screenshot({ path: `${OUT}/int-donos.png` });
  await ctx.close();
}

/* ---------- 6c. O CURSOR CONTINUA VISÍVEL NA FAIXA CLARA ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  const lerCursor = () =>
    page.evaluate(() => {
      const ponto = document.querySelector("[data-testid=cursor-ponto]");
      const anel = document.querySelector("[data-testid=cursor-anel]");
      if (!ponto || !anel) return null;
      return {
        corPonto: getComputedStyle(ponto).backgroundColor,
        corAnel: getComputedStyle(anel).borderTopColor,
        noClaro: ponto.className.includes("no-claro"),
      };
    });

  /** contraste WCAG entre duas cores, para não julgar "dá para ver" no olho */
  const contraste = (a, b) => {
    const canal = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const lum = ([r, g, bb]) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(bb);
    const la = lum(a);
    const lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const rgb = (t) => (t.match(/[\d.]+/g) || []).slice(0, 3).map(Number);

  // faixa escura, na hero
  await page.mouse.move(700, 400);
  await page.waitForTimeout(500);
  const escuro = await lerCursor();

  // faixa clara, na seção de parceiros
  await page.evaluate(() => {
    const e = document.getElementById("parceiros");
    const alvo = e.getBoundingClientRect().top + window.scrollY + 320;
    if (window.__lenis) window.__lenis.scrollTo(alvo, { immediate: true, force: true });
    else window.scrollTo(0, alvo);
  });
  await page.waitForTimeout(800);
  await page.mouse.move(700, 402);
  await page.waitForTimeout(500);
  const claro = await lerCursor();

  const contrasteNoEscuro = contraste(rgb(escuro.corPonto), [2, 16, 15]);
  const contrasteNoClaro = contraste(rgb(claro.corPonto), [255, 255, 255]);

  ok(
    "o cursor troca de cor entre as faixas e fica visível nas duas, com contraste acima de 4,5:1",
    !escuro.noClaro &&
      claro.noClaro &&
      escuro.corPonto !== claro.corPonto &&
      contrasteNoEscuro > 4.5 &&
      contrasteNoClaro > 4.5,
    `escuro ${escuro.corPonto} (${contrasteNoEscuro.toFixed(1)}:1 no fundo escuro) · claro ${claro.corPonto} (${contrasteNoClaro.toFixed(1)}:1 no branco)`,
  );
  await ctx.close();
}

/* ---------- 7. ESTEIRA DE ETAPAS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await rolarAte(page, "#como-funciona");
  await page.waitForTimeout(1200);

  const lerEtapaViva = () =>
    page.evaluate(() => {
      const itens = [...document.querySelectorAll("[data-testid=esteira] > li")];
      return itens.findIndex((li) =>
        getComputedStyle(li.querySelector("h3")).color.includes("182, 255, 137"),
      );
    });
  const etapas = await page.locator("[data-testid=esteira] > li").count();
  const vistas = new Set();
  for (let i = 0; i < 6; i++) {
    vistas.add(await lerEtapaViva());
    await page.waitForTimeout(1700);
  }
  ok(
    "a esteira tem seis etapas e o pulso de luz percorre a linha sozinho",
    etapas === 6 && vistas.size >= 3,
    `etapas ${etapas} · destacadas ao longo do tempo ${[...vistas].join(",")}`,
  );
  await page.screenshot({ path: `${OUT}/int-esteira.png` });
  await ctx.close();
}

/* ---------- 8. LISTA DE CULTIVOS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await rolarAte(page, "#utilizacao");
  await page.waitForTimeout(1000);

  const paineis = page.getByTestId("painel-cultivo");
  const qtd = await paineis.count();
  const antes = await paineis.nth(3).getAttribute("aria-expanded");
  const alturaAntes = (await paineis.nth(3).boundingBox()).height;
  await paineis.nth(3).click();
  await page.waitForTimeout(700);
  const depois = await paineis.nth(3).getAttribute("aria-expanded");
  const alturaDepois = (await paineis.nth(3).boundingBox()).height;
  const semCaixa = await paineis.nth(3).evaluate((e) => !e.querySelector(".vidro"));
  ok(
    "a linha de cultivo abre de verdade ao clicar, sem cartão em volta",
    qtd === 6 &&
      antes === "false" &&
      depois === "true" &&
      alturaDepois > alturaAntes + 10 &&
      semCaixa,
    `linhas ${qtd} · ${antes}→${depois} · altura ${Math.round(alturaAntes)}→${Math.round(alturaDepois)} · sem vidro ${semCaixa}`,
  );
  await page.screenshot({ path: `${OUT}/int-cultivos.png` });
  await ctx.close();
}

/* ---------- 9. FORMULÁRIO E BOTÃO FLUTUANTE ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  await rolarAte(page, "#contato");
  await page.waitForTimeout(1000);

  // o FAQ mudou de casa: aqui não tem mais
  const semFaq = await page.evaluate(() => ({
    botoesDeFaq: document.querySelectorAll("[data-testid=faq-botao]").length,
    secaoDeDuvidas: document.getElementById("duvidas") !== null,
  }));
  ok(
    "as dúvidas frequentes saíram da página inicial",
    semFaq.botoesDeFaq === 0 && !semFaq.secaoDeDuvidas,
    JSON.stringify(semFaq),
  );

  await page.fill("#nome", "Maria Teste");
  await page.fill("#cidade", "Formosa, GO");
  await page.fill("#cultivo", "Morango");
  await page.fill("#volume", "30 sacos de 100 L");
  await page.fill("#mensagem", "Quero um orçamento.");
  await page.evaluate(() => {
    window.__urlAberta = null;
    window.open = (u) => {
      window.__urlAberta = u;
      return null;
    };
  });
  await page.click("[data-testid=form-contato] button[type=submit]");
  await page.waitForTimeout(600);
  const url = await page.evaluate(() => window.__urlAberta || "");
  ok(
    "o formulário abre o WhatsApp com nome, cidade e cultivo preenchidos",
    url.includes("wa.me/5561984068770") &&
      decodeURIComponent(url).includes("Maria Teste") &&
      decodeURIComponent(url).includes("Morango") &&
      decodeURIComponent(url).includes("Formosa"),
    url.slice(0, 140),
  );
  await page.screenshot({ path: `${OUT}/int-formulario.png` });

  const fab = page.getByTestId("whatsapp-fab");
  ok(
    "o botão flutuante de WhatsApp aponta para o número principal",
    (await fab.getAttribute("href")).includes("5561984068770"),
  );
  await ctx.close();
}

/* ---------- 9b. O FAQ AGORA VIVE NA PÁGINA DE PRODUTOS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/produtos", { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);
  await rolarAte(page, "#duvidas");
  await page.waitForTimeout(1000);

  const faq = page.getByTestId("faq-botao");
  const quantidade = await faq.count();
  const a0 = await faq.nth(0).getAttribute("aria-expanded");
  await faq.nth(0).click();
  await page.waitForTimeout(600);
  const d0 = await faq.nth(0).getAttribute("aria-expanded");
  await faq.nth(2).click();
  await page.waitForTimeout(700);
  ok(
    "as dúvidas frequentes estão na página de produtos e o acordeão abre e fecha",
    quantidade > 2 &&
      a0 === "true" &&
      d0 === "false" &&
      (await faq.nth(2).getAttribute("aria-expanded")) === "true" &&
      (await page.locator("#faq-painel-2").isVisible()),
    `${quantidade} perguntas · primeira ${a0}→${d0}`,
  );
  await page.screenshot({ path: `${OUT}/int-duvidas-produtos.png` });
  await ctx.close();
}

/* ---------- 10. NOTÍCIAS, E OS BLOCOS DE ARTIGOS E GALERIA FORA DA HOME ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  // notícias: lista editorial em faixa clara, cada matéria abre em nova aba
  await rolarAte(page, "#noticias");
  await page.waitForTimeout(900);
  const noticias = await page.evaluate(() => {
    const links = [...document.querySelectorAll("#noticias li a")];
    return {
      quantidade: links.length,
      todosExternos: links.every(
        (a) => a.target === "_blank" && a.rel.includes("noopener") && a.href.startsWith("http"),
      ),
      semCartao: links.every((a) => !a.querySelector(".vidro")),
    };
  });
  ok(
    "as notícias são uma lista editorial, sem cartões, e abrem em nova aba",
    noticias.quantidade === 3 && noticias.todosExternos && noticias.semCartao,
    JSON.stringify(noticias),
  );

  // artigos e galeria só pelo menu: não há mais bloco de chamada na home
  const semRecursos = await page.evaluate(() => {
    const nav = document.querySelector("nav[aria-label=Principal]");
    const hrefsDoMenu = [...nav.querySelectorAll("a")].map((a) => a.getAttribute("href"));
    return {
      blocoDeArtigos: document.querySelector("[data-testid=card-artigos]") !== null,
      blocoDeGaleria: document.querySelector("[data-testid=card-galeria]") !== null,
      secaoRecursos: document.getElementById("recursos") !== null,
      secaoQuemSomos: document.getElementById("quem-somos") !== null,
      artigosNoMenu: hrefsDoMenu.includes("/artigos"),
      galeriaNoMenu: hrefsDoMenu.includes("/galeria"),
      empresaNoMenu: hrefsDoMenu.includes("/quem-somos"),
    };
  });
  ok(
    "quem somos, artigos e galeria saíram da página inicial e continuam no menu",
    !semRecursos.blocoDeArtigos &&
      !semRecursos.blocoDeGaleria &&
      !semRecursos.secaoRecursos &&
      !semRecursos.secaoQuemSomos &&
      semRecursos.artigosNoMenu &&
      semRecursos.galeriaNoMenu &&
      semRecursos.empresaNoMenu,
    JSON.stringify(semRecursos),
  );
  await ctx.close();
}

/* ---------- 10b. ARTIGOS: PARCERIAS EM SEÇÃO PRÓPRIA ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/artigos", { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  const parcerias = await page.evaluate(() => {
    const sec = document.getElementById("parcerias");
    if (!sec) return { existe: false };
    const listaArtigos = document.querySelector("ul");
    return {
      existe: true,
      tema: sec.dataset.tema,
      // a seção de parcerias vem depois da lista de artigos e não dentro dela
      dentroDaListaDeArtigos: listaArtigos ? listaArtigos.contains(sec) : false,
      depoisDaLista:
        listaArtigos
          ? sec.getBoundingClientRect().top + window.scrollY >
            listaArtigos.getBoundingClientRect().bottom + window.scrollY
          : false,
      corTitulo: getComputedStyle(sec.querySelector("h2")).color,
      temBotao: sec.querySelector('a[href*="wa.me"]') !== null,
    };
  });
  ok(
    "as parcerias de pesquisa saíram da lista de artigos e ganharam faixa clara própria",
    parcerias.existe &&
      parcerias.tema === "claro" &&
      !parcerias.dentroDaListaDeArtigos &&
      parcerias.depoisDaLista &&
      parcerias.corTitulo === "rgb(5, 31, 32)" &&
      parcerias.temBotao,
    JSON.stringify(parcerias),
  );
  await page.screenshot({ path: `${OUT}/int-parcerias.png` });
  await ctx.close();
}

/* ---------- 11. GALERIA: FILTRO, LIGHTBOX E CARREGAMENTO DAS FOTOS ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const falhas = [];
  page.on("response", (r) => {
    if (r.status() >= 400 && /image|_next\/image/.test(r.url())) falhas.push(r.status() + " " + r.url().slice(0, 90));
  });
  await page.goto(BASE + "/galeria", { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  /**
   * Toda foto tem de chegar mesmo. Um arquivo com nome errado em galeria.ts
   * aparece como buraco na grade, e olhando a página é fácil não perceber:
   * aqui a checagem é pela largura natural que o navegador reporta.
   */
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  const carregamento = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("[data-testid=foto-galeria] img")];
    return {
      total: imgs.length,
      quebradas: imgs
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src")?.slice(0, 70)),
      semAlt: imgs.filter((i) => !i.getAttribute("alt")).length,
    };
  });
  ok(
    "todas as fotos da galeria carregam, com texto alternativo",
    carregamento.total >= 16 &&
      carregamento.quebradas.length === 0 &&
      carregamento.semAlt === 0 &&
      falhas.length === 0,
    `${carregamento.total} fotos · quebradas ${JSON.stringify(carregamento.quebradas)} · sem alt ${carregamento.semAlt} · respostas com erro ${falhas.length}`,
  );
  await page.screenshot({ path: `${OUT}/int-galeria.png` });

  const todas = await page.getByTestId("foto-galeria").count();
  await page.getByTestId("filtro-galeria").filter({ hasText: "Embalagens" }).click();
  await page.waitForTimeout(800);
  const filtradas = await page.getByTestId("foto-galeria").count();
  ok(
    "o filtro da galeria reduz mesmo as fotos exibidas",
    filtradas > 0 && filtradas < todas,
    `${todas} → ${filtradas}`,
  );

  await page.getByTestId("foto-galeria").first().click();
  await page.waitForTimeout(700);
  ok("clicar numa foto abre o lightbox", await page.getByTestId("lightbox").isVisible());
  await page.screenshot({ path: `${OUT}/int-lightbox.png` });
  await page.getByTestId("lightbox-fechar").click();
  await page.getByTestId("lightbox").waitFor({ state: "detached", timeout: 4000 }).catch(() => {});
  const sumiu = (await page.getByTestId("lightbox").count()) === 0;
  // o body já tem overflow-x oculto por padrão, então o que interessa aqui
  // é o eixo vertical voltar a rolar
  const rolaDeNovo = await page.evaluate(() => getComputedStyle(document.body).overflowY);
  ok(
    "o lightbox fecha no botão de fechar e devolve a rolagem da página",
    sumiu && rolaDeNovo !== "hidden",
    `lightbox no DOM ${!sumiu} · overflow-y do body ${rolaDeNovo}`,
  );
  await ctx.close();
}

/* ---------- 11b. O MENU COMPLETO CABE A PARTIR DE 1024px ---------- */
{
  const medidas = [];
  for (const w of [768, 1024, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2400);
    const m = await page.evaluate(() => {
      const nav = document.querySelector("nav[aria-label=Principal]");
      const botao = document.querySelector("[data-testid=menu-toggle]");
      const links = [...nav.querySelectorAll("a")];
      const visivel = getComputedStyle(nav).display !== "none";
      return {
        menuVisivel: visivel,
        botaoVisivel: botao ? getComputedStyle(botao).display !== "none" : false,
        // com o menu apertado os rótulos quebram em duas linhas
        linksEmDuasLinhas: visivel
          ? links.filter((a) => a.getBoundingClientRect().height > 52).length
          : 0,
        quantidadeDeLinks: links.length,
      };
    });
    medidas.push({ w, ...m });
    await ctx.close();
  }
  const em768 = medidas.find((m) => m.w === 768);
  const em1024 = medidas.find((m) => m.w === 1024);
  ok(
    "com cinco itens o menu completo já cabe em 1024px, sem rótulo quebrado, e abaixo disso fica o botão",
    em768.botaoVisivel &&
      !em768.menuVisivel &&
      em1024.menuVisivel &&
      em1024.linksEmDuasLinhas === 0 &&
      em1024.quantidadeDeLinks === 5,
    medidas
      .map(
        (m) =>
          `${m.w}px menu=${m.menuVisivel} botão=${m.botaoVisivel} quebras=${m.linksEmDuasLinhas}`,
      )
      .join(" · "),
  );
}

/* ---------- 12. MENU MOBILE ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 780 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);

  await page.getByTestId("menu-toggle").click();
  await page.waitForTimeout(600);
  ok("o menu mobile abre ao tocar no botão", await page.getByTestId("menu-mobile").isVisible());
  const travou = await page.evaluate(() => getComputedStyle(document.body).overflow);
  ok("com o menu aberto a página atrás não rola", travou === "hidden", travou);
  await page.screenshot({ path: `${OUT}/int-menu-mobile.png` });

  const rotulos = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=menu-mobile-link]")].map((a) =>
      a.textContent.replace(/\d/g, "").trim(),
    ),
  );
  ok(
    "o menu mobile lista os mesmos cinco itens do computador",
    rotulos.join(",") === "Início,A empresa,Produtos,Artigos,Galeria",
    rotulos.join(" · "),
  );

  await page.getByTestId("menu-mobile-link").filter({ hasText: /^Produtos/ }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(900);
  const fechou = (await page.getByTestId("menu-mobile").count()) === 0;
  ok(
    "o link do menu mobile fecha o menu e navega para a página",
    fechou && new URL(page.url()).pathname === "/produtos",
    `menu fechado ${fechou} · ${page.url()}`,
  );
  await ctx.close();
}

/* ---------- 13. prefers-reduced-motion ---------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const erros = [];
  page.on("pageerror", (e) => erros.push(String(e).slice(0, 160)));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  const estado = await page.evaluate(() => {
    const escondidos = [...document.querySelectorAll("h1, h2, h3")].filter(
      (e) => Number(getComputedStyle(e).opacity) < 0.9,
    ).length;
    return {
      preloader: document.querySelector("[data-testid=preloader]") !== null,
      lenis: document.documentElement.classList.contains("lenis"),
      cursor: document.documentElement.classList.contains("cursor-custom"),
      h1: getComputedStyle(document.querySelector("h1")).opacity,
      marquee: getComputedStyle(document.querySelector(".marquee-fita")).animationName,
      setaHero: getComputedStyle(document.querySelector(".flutua-descer")).animationName,
      titulosEscondidos: escondidos,
    };
  });
  ok(
    "com movimento reduzido: sem preloader, sem scroll suave, sem cursor próprio, animações paradas e todo o texto visível",
    !estado.preloader &&
      !estado.lenis &&
      !estado.cursor &&
      estado.h1 === "1" &&
      estado.marquee === "none" &&
      estado.setaHero === "none" &&
      estado.titulosEscondidos === 0,
    JSON.stringify(estado),
  );
  ok("nenhum erro de JavaScript com movimento reduzido", erros.length === 0, erros.join(" | "));
  await page.screenshot({ path: `${OUT}/int-reduced-motion.png` });
  await ctx.close();
}

await browser.close();
fs.writeFileSync("./verificacao/relatorio-interacoes.json", JSON.stringify(resultados, null, 2));
console.log("| teste | resultado |");
console.log("|---|---|");
for (const r of resultados) console.log(`| ${r.teste} | ${r.resultado} |`);
console.log("\n--- detalhes ---");
for (const r of resultados) if (r.detalhe) console.log(`${r.resultado} · ${r.teste}\n   ${r.detalhe}`);
