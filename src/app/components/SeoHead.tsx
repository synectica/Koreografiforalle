"use client";
import { useEffect } from "react";

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

export function SeoHead() {
  useEffect(() => {
    const SITE = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? CANONICAL_SITE).replace(/\/$/, "");

    document.documentElement.lang = "nb";
    document.title = TITLE;

    setMeta("name", "description", DESCRIPTION);
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

    setMeta("property", "og:type", "website");
    setMeta("property", "og:locale", "nb_NO");
    setMeta("property", "og:site_name", "Koreografi for alle");
    setMeta("property", "og:title", TITLE);
    setMeta("property", "og:description", DESCRIPTION);
    setMeta("property", "og:url", `${SITE}/`);
    setMeta("property", "og:image", `${SITE}/og.jpg`);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", "Koreografi for alle – dansetimer i Bergen");
    setMeta("name", "twitter:image", `${SITE}/og.jpg`);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", TITLE);
    setMeta("name", "twitter:description", DESCRIPTION);

    setLink("canonical", `${SITE}/`);

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
    addLink("f1", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Bebas+Neue&display=swap" });
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

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Koreografi for alle", inLanguage: "nb-NO" },
        {
          "@type": ["SportsActivityLocation", "LocalBusiness"],
          "@id": `${SITE}/#studio`,
          name: "Koreografi for alle",
          description: DESCRIPTION,
          url: SITE,
          image: `${SITE}/og.jpg`,
          logo: "https://cdn.jsdelivr.net/gh/synectica/assets/kfaforkfa.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Thormøhlens gate 39",
            postalCode: "5006",
            addressLocality: "Bergen",
            addressCountry: "NO",
          },
          geo: { "@type": "GeoCoordinates", latitude: 60.3830593, longitude: 5.3239127 },
          hasMap: MAPS_URL,
          areaServed: "Bergen",
          priceRange: "kr 150–200",
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "15:00", closes: "16:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "15:30", closes: "17:00" },
          ],
          employee: { "@id": `${SITE}/#galyna` },
          makesOffer: [
            { "@type": "Offer", name: "Gratis prøvetime", price: "0", priceCurrency: "NOK", itemOffered: { "@type": "Service", name: "Gratis prøvetime i koreografi" } },
            { "@type": "Offer", name: "Koreografitime 60 minutter (tirsdager)", price: "150", priceCurrency: "NOK", itemOffered: { "@type": "Service", name: "Koreografitime 60 minutter" } },
            { "@type": "Offer", name: "Koreografitime 90 minutter (fredager)", price: "200", priceCurrency: "NOK", itemOffered: { "@type": "Service", name: "Koreografitime 90 minutter" } },
          ],
        },
        {
          "@type": "Person",
          "@id": `${SITE}/#galyna`,
          name: "Galyna Gerasymenko",
          jobTitle: "Koreograf og instruktør",
          worksFor: { "@id": `${SITE}/#studio` },
        },
      ],
    };

    let script = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
