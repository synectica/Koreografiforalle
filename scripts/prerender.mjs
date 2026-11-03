// Etter `vite build`: rendrer React-siden til HTML og setter den inn i dist/index.html,
// slik at Google ser hele teksten uten å kjøre JavaScript.
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
  const html = mod.render();
  const file = path.join(root, "dist", "index.html");
  const page = fs.readFileSync(file, "utf8");
  if (!page.includes('<div id="root"></div>')) throw new Error("fant ikke #root i dist/index.html");
  fs.writeFileSync(file, page.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
  console.log(`[prerender] OK: ${html.length} tegn HTML satt inn i dist/index.html`);
} catch (e) {
  console.warn("[prerender] hoppet over:", e && e.message ? e.message : e);
} finally {
  fs.rmSync(ssrDir, { recursive: true, force: true });
}
