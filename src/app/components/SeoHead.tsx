"use client";
import { useEffect } from "react";
import { SEO, SITE as SEO_SITE, LANG_PATH, HREFLANG, buildJsonLd, type SeoLang } from "../seo";

// Ставить title, meta, canonical, Open Graph, manifest і JSON-LD під час виконання —
// працює в Figma Make / Vite без доступу до index.html.
// Якщо можеш редагувати index.html, статичні теги там ще краще (Google бачить їх без JS).

const TITLE = "Dansetimer i Bergen – Koreografi for alle | Gratis prøvetime";
const DESCRIPTION =
  "Koreografitimer i Bergen med Galyna Gerasymenko: teknikk ved barren, adagio og gulvarbeid for nybegynnere og viderekomne. Book gratis prøvetime.";
// Основний домен. Використовується, якщо VITE_SITE_URL не задано — щоб canonical ніколи не вказував на vercel.app
const CANONICAL_SITE = "https://www.koreografiforalle.no";
const MAPS_URL = "https://www.google.no/maps/place/M%C3%B8llaren+Frivilligsentral/@60.3830593,5.3239127,17z/";
// Іконки малюються в браузері (canvas) — окремі файли PNG не потрібні.
function makeIcon(size: number, safe: number): string {
  try {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d")!;
    g.fillStyle = "#EA4335";
    g.fillRect(0, 0, size, size);
    g.fillStyle = "#fff";
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.font = `bold ${Math.round(size * safe * 0.62)}px Arial, Helvetica, sans-serif`;
    g.fillText("K", size / 2, size * 0.5);
    g.font = `bold ${Math.round(size * safe * 0.15)}px Arial, Helvetica, sans-serif`;
    g.fillText("BETALING", size / 2, size * 0.5 + size * safe * 0.2);
    return c.toDataURL("image/png");
  } catch {
    return "";
  }
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, extra: Record<string, string> = {}) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
  Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
}

export function SeoHead({ lang = "no" }: { lang?: SeoLang }) {
  // 1) мовно-залежні теги: title, description, canonical, hreflang, og, JSON-LD
  useEffect(() => {
    const m = SEO[lang];
    const url = SEO_SITE + LANG_PATH[lang];
    document.documentElement.lang = m.htmlLang;
    document.title = m.title;
    setMeta("name", "description", m.description);
    setMeta("property", "og:locale", m.ogLocale);
    setMeta("property", "og:title", m.title);
    setMeta("property", "og:description", m.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image:alt", m.imgAlt);
    setMeta("name", "twitter:title", m.title);
    setMeta("name", "twitter:description", m.description);
    setLink("canonical", url);
    (Object.keys(LANG_PATH) as SeoLang[]).forEach((l) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${HREFLANG[l]}"]`);
      if (!el) { el = document.createElement("link"); el.rel = "alternate"; el.setAttribute("hreflang", HREFLANG[l]); document.head.appendChild(el); }
      el.href = SEO_SITE + LANG_PATH[l];
    });
    let script = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (!script) { script = document.createElement("script"); script.id = "ld-json"; script.type = "application/ld+json"; document.head.appendChild(script); }
    script.textContent = JSON.stringify(buildJsonLd(lang));
  }, [lang]);

  // 2) одноразові теги: PWA, шрифти, іконки
  useEffect(() => {
    const SITE = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? CANONICAL_SITE).replace(/\/$/, "");

    setMeta("name", "robots", "index, follow, max-image-preview:large");
    setMeta("name", "author", "Galyna Gerasymenko");
    setMeta("name", "theme-color", "#EA4335");

    // Перенесено з <main> в App.tsx без змін (PWA "BETALING")
    setMeta("name", "mobile-web-app-capable", "yes");
    setMeta("name", "apple-mobile-web-app-capable", "yes");
    setMeta("name", "apple-mobile-web-app-status-bar-style", "black-translucent");
    setMeta("name", "apple-mobile-web-app-title", "KFA Betaling");
    setMeta("name", "application-name", "KFA Betaling");
    // viewport-fit=cover: щоб safe-area (брови iPhone) працювали в Safari і в встановленому застосунку
    const vp = document.head.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (vp && !vp.content.includes("viewport-fit")) vp.content += ", viewport-fit=cover";


    // Шрифти: preconnect + <link> замість @import у CSS (швидше відображення тексту, краще LCP)
    const addLink = (key: string, attrs: Record<string, string>) => {
      if (document.head.querySelector(`link[data-seo="${key}"]`)) return;
      const l = document.createElement("link");
      Object.entries(attrs).forEach(([k, v]) => l.setAttribute(k, v));
      l.setAttribute("data-seo", key);
      document.head.appendChild(l);
    };
    addLink("pc1", { rel: "preconnect", href: "https://fonts.googleapis.com" });
    addLink("pc2", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" });
    addLink("f1", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Bebas+Neue&family=Oswald:wght@500;700&display=swap" });
    addLink("pc3", { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossorigin: "" });

    // Застосунок «Betaling for kurs – for faste kunder»: manifest і іконки створюються тут, у коді (файли в public не потрібні)
    const i192 = makeIcon(192, 0.9), i512 = makeIcon(512, 0.9), iMask = makeIcon(512, 0.66), iApple = makeIcon(180, 0.9);
    if (i192) {
      const manifest = {
        name: "Koreografi for alle – Betaling for kurs (faste kunder)",
        short_name: "KFA Betaling",
        description: "Betaling for kurs – for faste kunder / Payment for the course – for regular clients / Оплата за курс – для постійних клієнтів",
        id: `${window.location.origin}/?standalone=1`,
        start_url: `${window.location.origin}/?standalone=1`,
        scope: `${window.location.origin}/`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#0a0a0a",
        theme_color: "#EA4335",
        icons: [
          { src: i192, sizes: "192x192", type: "image/png", purpose: "any" },
          { src: i512, sizes: "512x512", type: "image/png", purpose: "any" },
          { src: iMask, sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      };
      const url = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" }));
      setLink("manifest", url);
      setLink("apple-touch-icon", iApple);
      setLink("icon", i192, { type: "image/png" });
    }

  }, []);

  return null;
}
