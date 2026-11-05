"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Accessibility, Baby, Footprints, Shirt, ShowerHead, Waves, Facebook, MapPin, X, Maximize2, ChevronLeft, ChevronRight, Navigation } from "lucide-react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події

// TODO: встав посилання на Facebook-групу. Поки порожнє — кнопка не показується.
const FACEBOOK_GROUP_URL = "";

type L = "no" | "en" | "ua";

const T = {
  no: {
    needTitle: "Hva du trenger",
    clothT: "Treningsklær",
    clothD: "Tøy som er behagelig og strekker seg.",
    socksT: "Sokker",
    socksD: "Glatte sokker som likevel kontrollerer parketten.",
    changeT: "Garderobe og dusj",
    changeD: "Det finnes garderobe og dusj.",
    towelT: "Håndkle",
    towelD: "Ett til dusjen og ett til matten.",
    accessT: "Tilgjengelig for alle",
    accessD: "Senteret og timene har inkluderende tilgang og tilrettelagt infrastruktur.",
    kidsT: "Ta med barnet",
    kidsD: "Timene passer også deg med små barn: barnevognen kan stå i selve treningssalen, så du er nær barnet ditt hele timen.",
    findTitle: "Slik finner du oss",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    routeTitle: "Velg hvor du kommer fra",
    mapCaps: { florida: "Fra Florida – hel linje: langs veien, stiplet: gjennom parken", moehlenpris: "Fra Møhlenpris" },
    tabs: ["Fra Florida", "Fra Møhlenpris"],
    routeCaps: {
      florida: ["Ved krysset: fortsett opp", "Gå opp gangveien"],
      moehlenpris: ["Gå mot Vitalitetsenteret"],
    },
    insideTitle: "Inne i bygget",
    steps: ["Inngang A", "Gå gjennom gangen", "Døren til salen", "Salen"],
    dirs: "Fra Florida: gå langs veien (ca. 580 m, 7 min) eller gjennom parken (ca. 680 m, 8 min) til Wolffs gate. Fra Møhlenpris: ca. 440 m, 5 min til fots. Gå inn gjennom Inngang A ved Vitalitetssenteret, videre gjennom gangen til døren til salen.",
    viaRoad: "Langs veien",
    viaPark: "Gjennom parken",
    fromMoe: "Fra Møhlenpris",
    mapsBtn: "Åpne ruten i Google Maps",
    expand: "Forstørr kartet",
    mapHint: "Trykk på kartet for å forstørre og zoome",
    stepsTitle: "Slik går du",
    st1: "Følg ruten på kartet til Vitalitetssenteret (rund betongbygning med skilt).",
    st2: "Inngang A er under taket: gå inn og videre gjennom gangen.",
    st3: "Døren til salen er på høyre side. Velkommen!",
    m: "m",
    min: "min",
    zoomHint: "Trykk på et bilde for å forstørre",
    close: "Lukk",
    prev: "Forrige",
    next: "Neste",
    fbTitle: "Bli med i Facebook-gruppen",
    fbD: "Følg med på nyheter og still spørsmål.",
    fbBtn: "Åpne Facebook-gruppen",
  },
  en: {
    needTitle: "What to bring",
    clothT: "Workout clothes",
    clothD: "Comfortable, stretchy clothing.",
    socksT: "Socks",
    socksD: "Slippery socks that still give you control on the parquet floor.",
    changeT: "Changing room and shower",
    changeD: "A changing room and a shower are available.",
    towelT: "Towels",
    towelD: "One for the shower and one for your mat.",
    accessT: "Accessible to everyone",
    accessD: "The centre and the classes offer inclusive access and accessible infrastructure.",
    kidsT: "Bring your little one",
    kidsD: "Classes are also for clients with small children: the stroller can stay in the training hall itself, so you are next to your child throughout the class.",
    findTitle: "How to find us",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    routeTitle: "Choose where you are coming from",
    mapCaps: { florida: "From Florida – solid: along the road, dashed: through the park", moehlenpris: "From Møhlenpris" },
    tabs: ["From Florida", "From Møhlenpris"],
    routeCaps: {
      florida: ["At the crossing: keep going up", "Walk up the footpath"],
      moehlenpris: ["Walk towards Vitalitetsenteret"],
    },
    insideTitle: "Inside the building",
    steps: ["Entrance A", "Walk through the corridor", "The door to the hall", "The hall"],
    dirs: "From Florida: walk along the road (about 580 m, 7 min) or through the park (about 680 m, 8 min) to Wolffs gate. From Møhlenpris: about 440 m, 5 min on foot. Enter through Entrance A at Vitalitetssenteret, then go through the corridor to the door of the hall.",
    viaRoad: "Along the road",
    viaPark: "Through the park",
    fromMoe: "From Møhlenpris",
    mapsBtn: "Open the route in Google Maps",
    expand: "Enlarge the map",
    mapHint: "Tap the map to enlarge and zoom",
    stepsTitle: "How to get in",
    st1: "Follow the route on the map to Vitalitetssenteret (a round concrete building with a sign).",
    st2: "Entrance A is under the canopy: go in and on through the corridor.",
    st3: "The door to the hall is on the right. Welcome!",
    m: "m",
    min: "min",
    zoomHint: "Tap a photo to enlarge it",
    close: "Close",
    prev: "Previous",
    next: "Next",
    fbTitle: "Join the Facebook group",
    fbD: "Follow the news and ask questions.",
    fbBtn: "Open the Facebook group",
  },
  ua: {
    needTitle: "Що взяти з собою",
    clothT: "Тренувальний одяг",
    clothD: "Зручний одяг, що тягнеться.",
    socksT: "Шкарпетки",
    socksD: "Слизькі шкарпетки, які все одно контролюють поверхню паркету.",
    changeT: "Переодягальня та душ",
    changeD: "Є переодягальня і душ.",
    towelT: "Рушники",
    towelD: "Один для душу та один для килимка.",
    accessT: "Доступно для всіх",
    accessD: "Центр і заняття мають інклюзивний доступ та відповідну інфраструктуру.",
    kidsT: "З маленькими дітьми",
    kidsD: "Заняття проводяться і для клієнтів з маленькими дітьми: коляску можна поставити в самому залі, тож ви поруч із дитиною протягом усього тренування.",
    findTitle: "Як нас знайти",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Берген",
    routeTitle: "Оберіть, звідки ви йдете",
    mapCaps: { florida: "Від Florida – суцільна: дорогою, пунктир: через парк", moehlenpris: "Від Møhlenpris" },
    tabs: ["Від Florida", "Від Møhlenpris"],
    routeCaps: {
      florida: ["На перехресті: далі вгору", "Ідіть угору доріжкою"],
      moehlenpris: ["Йдіть до Vitalitetsenteret"],
    },
    insideTitle: "Всередині будівлі",
    steps: ["Вхід A", "Пройдіть коридором", "Двері до залу", "Зал"],
    dirs: "Від Florida: дорогою (близько 580 м, 7 хв) або через парк (близько 680 м, 8 хв) до Wolffs gate. Від Møhlenpris: близько 440 м, 5 хв пішки. Заходьте через вхід A біля Vitalitetssenteret, далі коридором до дверей у зал.",
    viaRoad: "Дорогою",
    viaPark: "Через парк",
    fromMoe: "Від Møhlenpris",
    mapsBtn: "Відкрити маршрут у Google Maps",
    expand: "Збільшити карту",
    mapHint: "Натисніть на карту, щоб збільшити й масштабувати",
    stepsTitle: "Як зайти",
    st1: "Йдіть за маршрутом на карті до Vitalitetssenteret (кругла бетонна будівля з вивіскою).",
    st2: "Вхід A під навісом: заходьте й далі коридором.",
    st3: "Двері до залу праворуч. Ласкаво просимо!",
    m: "м",
    min: "хв",
    zoomHint: "Натисніть на фото, щоб збільшити",
    close: "Закрити",
    prev: "Назад",
    next: "Далі",
    fbTitle: "Приєднуйтесь до групи у Facebook",
    fbD: "Стежте за новинами та ставте запитання.",
    fbBtn: "Відкрити групу у Facebook",
  },
} as const;


const IMG = (n: string) => `/find/${n}.webp`;
// Які фото до якого маршруту — міняється тут (назви файлів у public/find/)
const ROUTES = {
  florida: ["approach-moehlenpris", "approach-street"],
  moehlenpris: ["approach-corner"],
} as const;
const MAPS = { florida: "map-florida", moehlenpris: "map-moehlenpris" } as const;
const INSIDE = ["entrance", "door", "hall"] as const; // слайдшоу: не всі фото
const INSIDE_CAP = [0, 2, 3] as const; // індекси підписів у t.steps
const DEST = "60.3828628,5.3232897"; // Wolffs gate 12
const ORIGIN = { florida: "60.3815531,5.3331166", moehlenpris: "60.385779,5.3208356" } as const;
const mapsUrl = (r: "florida" | "moehlenpris") => `https://www.google.com/maps/dir/?api=1&origin=${ORIGIN[r]}&destination=${DEST}&travelmode=walking`;
const ALL_IMGS = [...Object.values(MAPS), ...ROUTES.florida, ...ROUTES.moehlenpris, ...INSIDE];

// Повноекранна карта: можна гортати пальцем і збільшувати (щоб на телефоні було видно, звідки й куди)
function MapViewer({ src, cap, close, label }: { src: string; cap: string; close: () => void; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const el = box.current;
    if (el) { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2; el.scrollTop = (el.scrollHeight - el.clientHeight) / 2; }
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [close]);
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={cap} className="fixed inset-0 z-[100] bg-black/95 flex flex-col">
      <div className="flex items-center justify-between gap-3 p-3 text-white">
        <p className="text-xs md:text-sm font-bold uppercase tracking-wider">{cap}</p>
        <button type="button" onClick={close} aria-label={label} className="h-11 px-4 rounded-full bg-white/15 border border-white/25 flex items-center gap-2 text-xs font-bold uppercase tracking-widest shrink-0">
          <X className="w-4 h-4" /> {label}
        </button>
      </div>
      <div ref={box} className="flex-1 overflow-auto" style={{ touchAction: "pan-x pan-y pinch-zoom", WebkitOverflowScrolling: "touch" }}>
        <img src={src} alt={cap} draggable={false} className="max-w-none w-[260vw] md:w-full md:max-w-5xl md:mx-auto block" />
      </div>
    </div>,
    document.body
  );
}

function Chip({ dashed, label, meta }: { dashed?: boolean; label: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 bg-black/25 border border-white/15 rounded-full px-4 py-2">
      <svg width="40" height="8" viewBox="0 0 40 8" aria-hidden="true" className="shrink-0">
        <line x1="3" y1="4" x2="37" y2="4" stroke="#d81f26" strokeWidth="5" strokeLinecap="round" strokeDasharray={dashed ? "7 7" : undefined} />
      </svg>
      <span className="text-white font-bold uppercase tracking-wider text-[11px] md:text-sm">{label}</span>
      <span className="text-white/80 text-[11px] md:text-sm ml-auto whitespace-nowrap">{meta}</span>
    </div>
  );
}

// Слайдшоу всередині блоку: свайп, великі кнопки під фото, без відкривання окремого вікна
function Slideshow({ slides, prev, next }: { slides: { f: string; cap: string }[]; prev: string; next: string }) {
  const [i, setI] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const n = slides.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const sl = slides[i];
  return (
    <div className="w-full max-w-3xl mx-auto" tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}>
      <div
        className="relative w-full rounded-[18px] md:rounded-[24px] overflow-hidden bg-black/40 border border-white/15 select-none"
        style={{ touchAction: "pan-y" }}
        onTouchStart={(e) => { start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={(e) => {
          const s = start.current; start.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x, dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
        }}
      >
        <img src={IMG(sl.f)} alt={`${sl.cap} – Møllaren Frivilligsentral, Bergen`} width={1400} height={788} decoding="async" draggable={false} className="w-full h-auto block aspect-video object-cover" />
        <span className="absolute top-2 left-2 md:top-3 md:left-3 min-w-8 h-8 px-3 rounded-full bg-black/70 text-white font-bold flex items-center justify-center text-xs md:text-sm border border-white/30">{i + 1}/{n}</span>
      </div>
      <div className="grid grid-cols-[56px_1fr_56px] items-center gap-2 pt-3">
        <button type="button" onClick={() => go(-1)} aria-label={prev} className="h-14 rounded-2xl bg-white/15 border border-white/25 text-white flex items-center justify-center active:scale-95 transition"><ChevronLeft className="w-7 h-7" /></button>
        <div className="text-center">
          <p className="text-white font-bold uppercase tracking-wider text-[11px] md:text-sm leading-tight">{sl.cap}</p>
          <div className="flex justify-center gap-2 pt-2">
            {slides.map((s2, k) => (
              <button key={s2.f} type="button" onClick={() => setI(k)} aria-label={`${k + 1}`} className="p-1.5"><span className={`block h-2.5 rounded-full transition-all ${k === i ? "w-6 bg-white" : "w-2.5 bg-white/35"}`} /></button>
            ))}
          </div>
        </div>
        <button type="button" onClick={() => go(1)} aria-label={next} className="h-14 rounded-2xl bg-white/15 border border-white/25 text-white flex items-center justify-center active:scale-95 transition"><ChevronRight className="w-7 h-7" /></button>
      </div>
    </div>
  );
}

export function StudioInfo({ lang }: { lang: string }) {
  const l: L = lang === "ua" ? "ua" : lang === "en" ? "en" : "no";
  const t = T[l];
  const [route, setRoute] = useState<"florida" | "moehlenpris">("florida");
  const [map, setMap] = useState<{ src: string; cap: string } | null>(null);
  const holder = useRef<HTMLDivElement>(null);

  // Підвантажуємо всі фото й карти заздалегідь (коли блок наближається до екрана) — перемикання стає миттєвим
  useEffect(() => {
    const el = holder.current;
    if (!el || typeof window === "undefined") return;
    const load = () => ALL_IMGS.forEach((n) => { const im = new Image(); im.decoding = "async"; im.src = IMG(n); });
    if (!("IntersectionObserver" in window)) { load(); return; }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: "800px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const slides = [
    ...ROUTES[route].map((f, i) => ({ f, cap: t.routeCaps[route][i] })),
    ...INSIDE.map((f, i) => ({ f, cap: t.steps[INSIDE_CAP[i]] })),
  ];

  return (
    <section id="info" className="relative z-10 w-full flex flex-col items-center py-0 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">

        {/* HVA DU TRENGER */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-5 md:mb-8 tracking-tight text-center drop-shadow-lg">{t.needTitle}</h2>
          <div className="w-full grid grid-cols-2 gap-3 md:gap-4">
            {[
              { Icon: Shirt, title: t.clothT, text: t.clothD },
              { Icon: Footprints, title: t.socksT, text: t.socksD },
              { Icon: ShowerHead, title: t.changeT, text: t.changeD },
              { Icon: Waves, title: t.towelT, text: t.towelD },
              { Icon: Accessibility, title: t.accessT, text: t.accessD },
              { Icon: Baby, title: t.kidsT, text: t.kidsD },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="bg-white/10 backdrop-blur-2xl rounded-[28px] md:rounded-[40px] border border-white/20 shadow-2xl p-4 md:p-8 flex flex-col items-center text-center">
                <Icon className="w-7 h-7 md:w-10 md:h-10 text-[#22c55e] mb-2 md:mb-4" />
                <h3 className="text-sm md:text-2xl font-bold text-white uppercase tracking-tight mb-1 md:mb-2">{title}</h3>
                <p className="text-xs md:text-lg text-white/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLIK FINNER DU OSS: вибір → карта → кнопка Google Maps → кроки → слайдшоу */}
        <div ref={holder} className="w-full bg-white/10 backdrop-blur-md rounded-[28px] md:rounded-[40px] border border-white/20 shadow-2xl p-4 md:p-8 flex flex-col items-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight text-center drop-shadow-lg">{t.findTitle}</h2>
          <p className="text-xs md:text-xl text-white/80 text-center mb-4 md:mb-8 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span>{t.findSub}</span>
          </p>

          <h3 className="text-white/90 font-bold uppercase tracking-widest text-[11px] md:text-sm text-center mb-3">{t.routeTitle}</h3>
          <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-xl mb-4 md:mb-6" role="group" aria-label={t.routeTitle}>
            {(["florida", "moehlenpris"] as const).map((k, i) => (
              <button
                key={k}
                type="button"
                aria-pressed={route === k}
                onClick={() => { setRoute(k); trackEvent("select_content", { content_type: "route", item_id: k }); }} // [GOOGLE ADS]
                className={`h-12 md:h-14 rounded-full font-bold uppercase tracking-widest text-[11px] md:text-xs border transition ${route === k ? "bg-white text-black border-white" : "bg-white/10 text-white border-white/25"}`}
              >
                {t.tabs[i]}
              </button>
            ))}
          </div>

          {/* КАРТА (обидві в DOM, перемикання без завантаження) */}
          <div className="w-full max-w-3xl mx-auto">
            {(["florida", "moehlenpris"] as const).map((k) => (
              <button
                key={k}
                type="button"
                hidden={route !== k}
                onClick={() => setMap({ src: IMG(MAPS[k]), cap: t.mapCaps[k] })}
                className="relative w-full rounded-[18px] md:rounded-[24px] overflow-hidden bg-black/40 border border-white/15 cursor-zoom-in active:scale-[0.99] transition"
                aria-label={`${t.expand}: ${t.mapCaps[k]}`}
              >
                <img src={IMG(MAPS[k])} alt={`${t.mapCaps[k]} – Møllaren Frivilligsentral, Wolffs gate 12, Bergen`} width={1240} height={930} loading={k === "florida" ? "eager" : "lazy"} decoding="async" className="w-full h-auto block" />
                <span className="absolute bottom-2 right-2 md:bottom-3 md:right-3 h-10 px-3 rounded-full bg-black/75 text-white flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider border border-white/30">
                  <Maximize2 className="w-4 h-4" /> {t.expand}
                </span>
              </button>
            ))}
            <p className="text-white/60 text-[10px] md:text-xs text-center mt-2">{t.mapHint}</p>
          </div>

          {/* ЛЕГЕНДА: тип лінії, метри й час (текстом, не на картинці) */}
          <div className="w-full max-w-3xl mx-auto grid gap-2 mt-3">
            {route === "florida" ? (
              <>
                <Chip label={t.viaRoad} meta={`580 ${t.m} · 7 ${t.min}`} />
                <Chip dashed label={t.viaPark} meta={`680 ${t.m} · 8 ${t.min}`} />
              </>
            ) : (
              <Chip label={t.fromMoe} meta={`440 ${t.m} · 5 ${t.min}`} />
            )}
          </div>

          <a
            href={mapsUrl(route)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("click_directions", { location: `route_${route}` })} // [GOOGLE ADS]
            className="mt-4 h-14 w-full max-w-3xl rounded-full bg-white text-black font-black uppercase text-[11px] md:text-xs tracking-[2px] flex items-center justify-center gap-3 active:scale-95 transition"
          >
            <Navigation className="w-5 h-5" /> {t.mapsBtn}
          </a>

          {/* КРОКИ */}
          <h3 className="text-white/90 font-bold uppercase tracking-widest text-[11px] md:text-sm text-center mt-8 mb-3">{t.stepsTitle}</h3>
          <ol className="w-full max-w-3xl grid gap-2 mb-6">
            {[t.st1, t.st2, t.st3].map((x, i) => (
              <li key={i} className="flex items-start gap-3 bg-black/20 border border-white/10 rounded-2xl p-3 md:p-4">
                <span className="w-7 h-7 rounded-full bg-[#d81f26] text-white font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>
                <span className="text-white/90 text-xs md:text-base leading-snug">{x}</span>
              </li>
            ))}
          </ol>

          <Slideshow key={route} slides={slides} prev={t.prev} next={t.next} />
        </div>
        {map && <MapViewer src={map.src} cap={map.cap} close={() => setMap(null)} label={t.close} />}

        {/* FACEBOOK */}
        {FACEBOOK_GROUP_URL && (
          <div className="w-full max-w-xl bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 shadow-2xl p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-white mb-2">{t.fbTitle}</h3>
            <p className="text-lg text-white/80 mb-6">{t.fbD}</p>
            <a
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("select_content", { content_type: "link", item_id: "facebook_group" })} // [GOOGLE ADS]
              className="h-14 w-full rounded-full bg-white text-[#1877F2] font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition"
            >
              <Facebook className="w-5 h-5" />
              {t.fbBtn}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
