// Спільні SEO-дані для трьох мов: використовуються і в браузері (SeoHead), і під час збірки (scripts/prerender.mjs).
export type SeoLang = "no" | "en" | "ua";
export const SITE = "https://www.koreografiforalle.no";
export const LANG_PATH: Record<SeoLang, string> = { no: "/", en: "/en/", ua: "/ua/" };
export const HREFLANG: Record<SeoLang, string> = { no: "nb", en: "en", ua: "uk" };
const MAPS_URL = "https://www.google.no/maps/place/M%C3%B8llaren+Frivilligsentral/@60.3830593,5.3239127,17z/";

export const SEO: Record<SeoLang, { title: string; description: string; ogLocale: string; htmlLang: string; inLanguage: string; imgAlt: string }> = {
  no: {
    title: "Dansetimer i Bergen – Koreografi for alle | Gratis prøvetime",
    description: "Koreografitimer i Bergen med Galyna Gerasymenko: teknikk ved barren, adagio og gulvarbeid for nybegynnere og viderekomne. Book gratis prøvetime.",
    ogLocale: "nb_NO", htmlLang: "nb", inLanguage: "nb-NO", imgAlt: "Koreografi for alle – dansetimer i Bergen",
  },
  en: {
    title: "Dance classes in Bergen – Koreografi for alle | Free trial class",
    description: "Choreography classes in Bergen with Galyna Gerasymenko: barre technique, adagio and floor work for beginners and advanced dancers. Book a free trial class.",
    ogLocale: "en_GB", htmlLang: "en", inLanguage: "en", imgAlt: "Koreografi for alle – dance classes in Bergen",
  },
  ua: {
    title: "Заняття з хореографії в Бергені – Koreografi for alle | Безкоштовне пробне заняття",
    description: "Заняття з хореографії в Бергені з Галиною Герасименко: техніка біля станка, адажіо та партерна робота для початківців і досвідчених. Запишіться на безкоштовне пробне заняття.",
    ogLocale: "uk_UA", htmlLang: "uk", inLanguage: "uk", imgAlt: "Koreografi for alle – заняття з хореографії в Бергені",
  },
};

export function buildJsonLd(lang: SeoLang) {
  const m = SEO[lang];
  const url = SITE + LANG_PATH[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "Koreografi for alle", inLanguage: ["nb-NO", "en", "uk"] },
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: m.title, description: m.description, inLanguage: m.inLanguage,
        isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#studio` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}/og.jpg`, width: 1200, height: 630 },
      },
      {
        "@type": ["SportsActivityLocation", "LocalBusiness"],
        "@id": `${SITE}/#studio`,
        name: "Koreografi for alle",
        description: SEO.no.description,
        url: `${SITE}/`,
        image: [`${SITE}/og.jpg`, `${SITE}/galyna.webp`],
        logo: "https://cdn.jsdelivr.net/gh/synectica/assets/kfaforkfa.png",
        address: { "@type": "PostalAddress", streetAddress: "Wolffs gate 12", postalCode: "5006", addressLocality: "Bergen", addressRegion: "Vestland", addressCountry: "NO" },
        location: { "@type": "Place", name: "Møllaren Frivilligsentral" },
        geo: { "@type": "GeoCoordinates", latitude: 60.3828628, longitude: 5.3232897 },
        hasMap: MAPS_URL,
        areaServed: { "@type": "City", name: "Bergen" },
        knowsLanguage: ["nb", "en", "uk"],
        priceRange: "kr 150–200",
        currenciesAccepted: "NOK",
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
      { "@type": "Person", "@id": `${SITE}/#galyna`, name: "Galyna Gerasymenko", jobTitle: "Koreograf og instruktør", image: `${SITE}/galyna.webp`, worksFor: { "@id": `${SITE}/#studio` } },
    ],
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Рядок з усіма мовно-залежними тегами <head> (для статичного HTML)
export function headHtml(lang: SeoLang): string {
  const m = SEO[lang];
  const url = SITE + LANG_PATH[lang];
  const alt = (Object.keys(LANG_PATH) as SeoLang[]).map((l) => `    <link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${LANG_PATH[l]}" />`).join("\n");
  const others = (Object.keys(LANG_PATH) as SeoLang[]).filter((l) => l !== lang).map((l) => `    <meta property="og:locale:alternate" content="${SEO[l].ogLocale}" />`).join("\n");
  return `<title>${esc(m.title)}</title>
    <meta name="description" content="${esc(m.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
${alt}
    <link rel="alternate" hreflang="x-default" href="${SITE}/" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${m.ogLocale}" />
${others}
    <meta property="og:site_name" content="Koreografi for alle" />
    <meta property="og:title" content="${esc(m.title)}" />
    <meta property="og:description" content="${esc(m.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE}/og.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(m.imgAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(m.title)}" />
    <meta name="twitter:description" content="${esc(m.description)}" />
    <meta name="twitter:image" content="${SITE}/og.jpg" />
    <script type="application/ld+json" id="ld-json">${JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c")}</script>`;
}
