import { chromium } from "playwright";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const OUT = "./verificacao/evidencias";
const rotas = [
  ["home", "/"],
  ["quem-somos", "/quem-somos"],
  ["produtos", "/produtos"],
  ["artigos", "/artigos"],
  ["galeria", "/galeria"],
];
for (const [nome, url] of rotas) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3210" + url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1000);
  await p.screenshot({ path: `${OUT}/v2-${nome}-topo.png` });
  // percorre a página
  const alturas = await p.evaluate(() => document.body.scrollHeight);
  let n = 0;
  for (let y = 900; y < alturas && n < 9; y += 900, n++) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${OUT}/v2-${nome}-${n}.png` });
  }
  await ctx.close();
}
await b.close();
console.log("ok");
