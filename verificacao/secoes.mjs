import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const OUT = "./verificacao/evidencias";
const secoes = ["quem-somos", "problema", "produtos", "como-funciona", "aplicacoes", "rastreabilidade", "ficha-tecnica", "impacto", "parceiros", "equipe", "noticias", "faq", "contato"];
for (const w of [390, 1440]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 780 : 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3210/", { waitUntil: "networkidle" });
  await p.waitForTimeout(1200);
  for (const s of secoes) {
    await p.evaluate((id) => document.querySelector("#" + id)?.scrollIntoView({ block: "start" }), s);
    await p.waitForTimeout(500);
    await p.screenshot({ path: `${OUT}/sec-${w}-${s}.png` });
  }
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/sec-${w}-rodape.png` });
  await ctx.close();
}
await b.close();
console.log("ok");
