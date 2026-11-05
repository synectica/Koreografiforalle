// Etter `vite build`: rendrer React-siden til HTML for hvert språk (/, /en/, /ua/) og setter den inn i dist,
// med riktig <title>, description, canonical, hreflang og JSON-LD – slik at Google ser alt uten å kjøre JavaScript.
// Hvis noe feiler, hoppes dette over (siden fungerer som før, bare uten forhåndsrendret HTML).
import { build } from "vite";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const ssrDir = path.join(root, "dist-ssr");

try {
  await build({
    logLevel: "error",
    build: { ssr: "src/entry-server.tsx", outDir: "dist-ssr", emptyOutDir: true },
  });
  const files = fs.readdirSync(ssrDir).filter((f) => /^entry-server\.(m?js)$/.test(f));
  const mod = await import(pathToFileURL(path.join(ssrDir, files[0])).href);
  const template = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
  if (!template.includes('<div id="root"></div>')) throw new Error("fant ikke #root i dist/index.html");
  if (!template.includes("<!--SEO-START-->")) throw new Error("fant ikke SEO-markør i index.html");

  for (const lang of ["no", "en", "ua"]) {
    const html = mod.render(lang);
    let page = template
      .replace(/<!--SEO-START-->[\s\S]*?<!--SEO-END-->/, mod.headHtml(lang))
      .replace(/<html lang="[^"]*"/, `<html lang="${mod.SEO[lang].htmlLang}"`)
      .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`);
    const out = lang === "no" ? path.join(root, "dist", "index.html") : path.join(root, "dist", mod.LANG_PATH[lang], "index.html");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, page);
    console.log(`[prerender] OK ${lang}: ${html.length} tegn -> ${path.relative(root, out)}`);
  }
} catch (e) {
  console.warn("[prerender] hoppet over:", e && e.message ? e.message : e);
} finally {
  fs.rmSync(ssrDir, { recursive: true, force: true });
}
