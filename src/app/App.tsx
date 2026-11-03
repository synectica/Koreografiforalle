"use client";
import React, { useState, useEffect } from "react";
import { type Lang, tr } from "./components/i18n"; // три мови: no / en / ua

// Імпорти твоїх компонентів
import { Hero } from "./components/Hero";
import { BioSection } from "./components/BioSection";
import { PricingSection } from "./components/PricingSection";
import { BookingSection } from "./components/BookingSection";
import { ContactForm } from "./components/ContactForm";
import { MapSection } from "./components/MapSection";
import { StudioInfo } from "./components/StudioInfo"; // адреса-інфо: що взяти, як знайти, Facebook
import { GallerySection } from "./components/GallerySection"; // фото залу (замість плакатів)
import { SeoHead } from "./components/SeoHead"; // [SEO] title, meta, JSON-LD
import { Analytics } from "./components/Analytics"; // [GOOGLE ADS] gtag + згода на cookie
import { Download, Share, PlusSquare, X } from "lucide-react";
import { trackEvent } from "./components/track";

// Британський прапор у справжніх пропорціях 2:1 (без розтягування).
// Хвиля на весь екран: показується ЛИШЕ ЛІВА ПОЛОВИНА прапора (квадрат 30×30), масштаб однаковий по обох осях (cover),
// тож на телефоні й на ПК пропорції смуг однакові; центр прапора (вертикальна смуга хреста) притиснуто до правого краю.
const ukSvg = (viewBox: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>`;
const svgUrl = (svg: string) => `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
const UK_HALF_BG = `${svgUrl(ukSvg("0 0 30 30"))} right center / cover no-repeat, #012169`;   // ліва половина прапора
const UK_ICON_BG = `${svgUrl(ukSvg("0 0 60 30"))} center / cover no-repeat, #012169`;          // весь прапор, без спотворення

// ===== Установка як застосунок («Betaling for kurs – for faste kunder») =====
function InstallApp({ lang = "no" }: { lang?: string }) {
  const [ICON_SRC, setIconSrc] = useState("");
  useEffect(() => { const l = document.querySelector<HTMLLinkElement>('link[rel="icon"]'); if (l) setIconSrc(l.href); }, []);
  const [evt, setEvt] = useState<any>(null);
  const [standalone, setStandalone] = useState(true); // true на старті, щоб картка не блимала
  const [ios, setIos] = useState(false);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setStandalone(!!isStandalone);
    setIos(/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e); };
    const onInstalled = () => { setStandalone(true); setEvt(null); trackEvent("select_content", { content_type: "pwa", item_id: "installed" }); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => { window.removeEventListener("beforeinstallprompt", onPrompt); window.removeEventListener("appinstalled", onInstalled); };
  }, []);

  if (standalone) return null; // вже встановлено — картка не потрібна

  const install = async () => {
    trackEvent("select_content", { content_type: "pwa", item_id: "install_click" });
    if (evt) { evt.prompt(); try { await evt.userChoice; } catch {} setEvt(null); }
    else setHelp(true); // iOS або браузер без кнопки встановлення — показуємо інструкцію
  };

  return (
    <section aria-label={tr(lang, "Installer som app", "Install as an app", "Встановити як застосунок")} className="relative z-10 w-full max-w-xl mx-auto">
      <div className="bg-white/10 backdrop-blur-2xl rounded-[28px] border border-white/20 shadow-2xl p-4 md:p-6 flex items-center gap-4">
        <img src={ICON_SRC} alt="" width={56} height={56} className="w-14 h-14 rounded-2xl shrink-0 shadow-lg" />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-white font-bold text-sm md:text-base leading-tight">
            {tr(lang, "Betaling for kurs – for faste kunder", "Payment for the course – for regular clients", "Оплата за курс – для постійних клієнтів")}
          </p>
          <p className="text-white/60 text-[11px] md:text-xs mt-1 leading-snug">
            {tr(lang, "Legg til på hjem-skjermen – ett trykk til betaling.", "Add to your home screen – one tap to pay.", "Додайте на головний екран – оплата в один дотик.")}
          </p>
        </div>
        <button type="button" onClick={install}
          className="shrink-0 h-11 px-4 rounded-full bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
          <Download className="w-4 h-4" />
          {tr(lang, "Installer", "Install", "Встановити")}
        </button>
      </div>

      {help && (
        <div role="dialog" className="mt-3 bg-[#111]/95 border border-white/15 rounded-3xl p-5 text-white/85 text-sm leading-relaxed relative">
          <button type="button" onClick={() => setHelp(false)} aria-label={tr(lang, "Lukk", "Close", "Закрити")} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><X className="w-4 h-4" /></button>
          {ios ? (
            <p className="pr-8">
              {tr(lang, "I Safari: trykk", "In Safari: tap", "У Safari: натисніть")} <Share className="inline w-4 h-4 -mt-1" /> {tr(lang, "(Del), velg", "(Share), then choose", "(Поділитися), потім оберіть")} <PlusSquare className="inline w-4 h-4 -mt-1" /> <b>{tr(lang, "«Legg til på Hjem-skjerm»", "“Add to Home Screen”", "«На екран Додому»")}</b>.
            </p>
          ) : (
            <p className="pr-8">
              {tr(lang, "Åpne nettleser-menyen (⋮) og velg «Installer app» / «Legg til på startskjermen».", "Open the browser menu (⋮) and choose “Install app” / “Add to Home screen”.", "Відкрийте меню браузера (⋮) і виберіть «Встановити застосунок» / «Додати на головний екран».")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

// Картинка у сучасному форматі WebP; якщо .webp-файлу ще немає в репозиторії assets — автоматично береться старий PNG/JPG.
function WebpImg({ base, fallbackExt, alt, className }: { base: string; fallbackExt: string; alt: string; className?: string }) {
  const [src, setSrc] = useState(`${base}.webp`);
  return <img src={src} alt={alt} className={className} loading="lazy" decoding="async" onError={() => { const old = `${base}.${fallbackExt}`; if (src !== old) setSrc(old); }} />;
}

// порядок перемикання: NO → EN → UA → NO
const NEXT: Record<Lang, Lang> = { no: "en", en: "ua", ua: "no" };

// Мінімалістичні прапори: плоскі, повноколірні, без обводки й тіней (SVG, розтягуються на весь значок)
function FlagFace({ l }: { l: Lang }) {
  const svg = { className: "block w-full h-full", preserveAspectRatio: "none" as const, "aria-hidden": true };
  if (l === "ua") return (
    <svg viewBox="0 0 3 2" {...svg}><rect width="3" height="1" fill="#0057B7" /><rect y="1" width="3" height="1" fill="#FFD500" /></svg>
  );
  if (l === "en") return (
    <svg viewBox="0 0 60 30" {...svg}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2.4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
  return (
    <svg viewBox="0 0 22 16" {...svg}>
      <rect width="22" height="16" fill="#BA0C2F" />
      <path d="M8,0 V16 M0,8 H22" stroke="#fff" strokeWidth="4" />
      <path d="M8,0 V16 M0,8 H22" stroke="#00205B" strokeWidth="2" />
    </svg>
  );
}

const FLAG_BG: Record<Lang, string> = { no: "#BA0C2F", en: "#012169", ua: "#0057B7" }; // суцільна підложка — прапор ніколи не просвічує

// ОДИН прапорець: по натисканню перегортається на наступну мову (NO → EN → UA → NO), хвиля розходиться від нього
function FlagSwitch({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<Lang | "">("");
  const [origin, setOrigin] = useState({ x: 0, y: 30 });
  // двосторонній значок: на видимому боці — поточна мова, на прихованому — наступна; кожне перемикання крутить на 180°
  const [faces, setFaces] = useState<[Lang, Lang]>([lang, NEXT[lang]]);
  const [rot, setRot] = useState(0);

  const handleSwitch = (el: HTMLElement) => {
    if (isAnimating) return;
    const nextLang = NEXT[lang];
    const r = el.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    const hidden = (rot / 180) % 2 === 0 ? 1 : 0;
    setFaces((f) => { const n: [Lang, Lang] = [f[0], f[1]]; n[hidden] = nextLang; return n; });
    setRot((x) => x + 180);
    setActiveOverlay(nextLang);
    setIsAnimating(true);
    setTimeout(() => setLang(nextLang), 170);
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setActiveOverlay(""), 300);
    }, 400);
  };

  const getOverlayBackground = () => {
    if (activeOverlay === "ua") return "linear-gradient(to bottom, #0057B7 50%, #FFD500 50%)";
    if (activeOverlay === "en") return UK_HALF_BG;
    if (activeOverlay === "no") return `linear-gradient(to bottom, transparent calc(50% - 4vh), #00205B calc(50% - 4vh), #00205B calc(50% + 4vh), transparent calc(50% + 4vh)), linear-gradient(to right, transparent calc(35% - 4vh), #00205B calc(35% - 4vh), #00205B calc(35% + 4vh), transparent calc(35% + 4vh)), linear-gradient(to bottom, transparent calc(50% - 8vh), white calc(50% - 8vh), white calc(50% + 8vh), transparent calc(50% + 8vh)), linear-gradient(to right, transparent calc(35% - 8vh), white calc(35% - 8vh), white calc(35% + 8vh), transparent calc(35% + 8vh)), #BA0C2F`;
    return "transparent";
  };

  const at = `${origin.x}px ${origin.y}px`;

  return (
    <>
      <div className="fixed inset-0 z-[12000] pointer-events-none"
        style={{
          opacity: isAnimating ? 1 : 0,
          clipPath: isAnimating ? `circle(150% at ${at})` : `circle(0% at ${at})`,
          transition: isAnimating ? 'clip-path 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.05s' : 'clip-path 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s 0.05s',
          background: getOverlayBackground(),
        }}
      />
      <button
        type="button"
        onClick={(e) => handleSwitch(e.currentTarget)}
        aria-label="Language: NO / EN / UA"
        className="fixed z-[13000] p-2 cursor-pointer active:scale-90 transition-transform !opacity-100"
        style={{ opacity: 1, top: "calc(var(--flag-safe) + var(--bar-row-h, 30px) / 2 - 18px)", right: "6px" }} // по вертикалі — по центру червоної смужки, на одній лінії з логотипом
      >
        <span className="block w-[28px] h-[20px] relative [perspective:600px]">
          <span className="block w-full h-full relative [transform-style:preserve-3d]" style={{ transform: `rotateY(${rot}deg)`, transition: "transform 0.25s ease" }}>
            <span className="absolute inset-0 [backface-visibility:hidden] rounded-[3px] overflow-hidden" style={{ opacity: 1, background: FLAG_BG[faces[0]] }}><FlagFace l={faces[0]} /></span>
            <span className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[3px] overflow-hidden" style={{ opacity: 1, background: FLAG_BG[faces[1]] }}><FlagFace l={faces[1]} /></span>
          </span>
        </span>
      </button>
    </>
  );
}

export default function App() {
  // основна мова — норвезька (реклама й Google ведуть норвезьку аудиторію); прапор вгорі перемикає NO → EN → UA
  const [lang, setLang] = useState<Lang>("no");
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/vik_gerasymenko/");

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setInstagramUrl("instagram://user?username=vik_gerasymenko");

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone === true ||
                        window.location.search.includes('standalone=1');

    if (isStandalone) {
      setTimeout(() => {
        const el = document.getElementById('pricing-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 2000);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ua" ? "uk" : lang === "en" ? "en" : "nb";
  }, [lang]);

  // [SEO] <link rel="manifest">, apple-touch-icon, <link rel="icon"> та всі <meta> раніше стояли всередині <main> —
  // пошуковики їх там не зчитують. Тепер їх ставить SeoHead (у <head>), manifest лежить у public/manifest.webmanifest.

  return (
    <main className="min-h-[100dvh] bg-[#0a0a0a] selection:bg-[#22c55e]/30 scroll-smooth flex flex-col overflow-x-hidden">

      <SeoHead />
      <Analytics lang={lang} />

      <style>{`
        /* Єдиний шрифт сайту: IBM Plex Mono (є латиниця + кирилиця, тож укр/норв/англ виглядають однаково) */
        /* центр острова (айфон) / отвору камери (Android): ≈55% від safe-area; запасне значення 48px — для прев'ю */
        :root { --island-c: calc(max(env(safe-area-inset-top, 0px), 48px) * 0.55); --flag-safe: max(2px, calc(var(--island-c) - var(--bar-row-h, 30px) / 2)); }
        @media (min-width: 768px) { :root { --flag-safe: 28px; } }
        main, main *, input, textarea, button { font-family: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace !important; }
        .footer-logo { height: 52px; width: auto; object-fit: contain; border-radius: 4px; transition: transform 0.3s ease; }
        .footer-logo:hover { transform: translateY(-2px) scale(1.02); }
        @media (max-width: 768px) { .footer-logo { height: 40px; } }
        /* ЛОГОТИП (тільки він): повернуто оригінальний шрифт Bebas Neue */
        .logo-font, .logo-font * { font-family: 'Bebas Neue', sans-serif !important; }
        section[id] { scroll-margin-top: calc(max(env(safe-area-inset-top, 0px), 48px) + 64px); }
        @media (min-width: 768px) { section[id] { scroll-margin-top: 1rem; } }
        img, video { max-width: 100%; }
        .font-bebas { font-family: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace; }
      `}</style>

      <FlagSwitch lang={lang} setLang={setLang} />

      <div className="relative z-10 flex-grow">
        <Hero lang={lang} />
        {/* усі блоки після Hero — над фіксованим фоном Hero (z-index:1), інакше на телефонах частина блоків може не відмальовуватись */}
        <div className="relative z-20">
        <BioSection lang={lang} />

        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20 pb-6 px-4 md:px-10">
          <div id="pricing-anchor">
            <PricingSection lang={lang} />
          </div>
          <InstallApp lang={lang} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <BookingSection lang={lang} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <ContactForm lang={lang} />
          {/* «що взяти» і «як знайти» — поруч з картою; галерея — останній блок перед футером */}
          <StudioInfo lang={lang} />
          <MapSection lang={lang} />
          <GallerySection lang={lang} />
        </div>
        </div>
      </div>

      <footer className="w-full py-5 text-center relative z-20 bg-white/5 backdrop-blur-md border-t border-white/10"
              style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2.5">
          {/* ЛОГОТИПИ (повернуто) */}
          <div className="flex flex-row items-center justify-center gap-5 md:gap-8 mb-1">
            <WebpImg base="https://cdn.jsdelivr.net/gh/synectica/assets/kfaforkfa" fallbackExt="png" alt="Koreografi for alle – logo" className="footer-logo" />
            <WebpImg base="https://cdn.jsdelivr.net/gh/synectica/assets/frivilliglogoforkfacopy" fallbackExt="jpg" alt="Møllaren Frivilligsentral – logo" className="footer-logo" />
          </div>
          <p className="font-bebas text-white uppercase tracking-[0.1em] md:tracking-[0.15em] opacity-50 text-[8px] sm:text-[11px] md:text-[16px] leading-none whitespace-nowrap">
            Koreografi for alle {tr(lang, "med", "with", "з")} Galyna Gerasymenko — © {new Date().getFullYear()}
          </p>
          <p className="font-bebas text-white/30 uppercase tracking-[0.1em] text-[9px] md:text-[12px] leading-none">
            {tr(lang, "Design og utvikling av", "Designed & Developed by", "Дизайн і розробка:")} <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Viktor Herasymenko</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
