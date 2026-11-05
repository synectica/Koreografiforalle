// Brukes bare under bygging (scripts/prerender.mjs): rendrer siden til statisk HTML for Google, per språk.
import { renderToString } from "react-dom/server";
import App from "./app/App.tsx";
import { headHtml, SEO, LANG_PATH, SITE } from "./app/seo";
import type { Lang } from "./app/components/i18n";

export function render(lang: Lang = "no"): string {
  return renderToString(<App initialLang={lang} />);
}
export { headHtml, SEO, LANG_PATH, SITE };
