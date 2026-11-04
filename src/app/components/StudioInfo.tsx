"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Footprints, Shirt, ShowerHead, Waves, Facebook, MapPin, X } from "lucide-react";
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
    findTitle: "Slik finner du oss",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    routeTitle: "Velg hvor du kommer fra",
    mapCaps: { florida: "Kart: gangvei fra Florida (ca. 9 min)", moehlenpris: "Kart: gangvei fra Møhlenpris (ca. 6 min)" },
    tabs: ["Fra Florida", "Fra Møhlenpris"],
    routeCaps: {
      florida: ["Gangveien opp mot Vitalitetsenteret", "Krysset og gangveien opp til inngangen"],
      moehlenpris: ["Hjørnet ved Vitalitetsenteret"],
    },
    insideTitle: "Inne i bygget",
    steps: ["Inngang A – Vitalitetsenteret", "Gå gjennom gangen", "Døren til salen", "Salen"],
    zoomHint: "Trykk på et bilde for å forstørre",
    close: "Lukk",
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
    findTitle: "How to find us",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    routeTitle: "Choose where you are coming from",
    mapCaps: { florida: "Map: walking route from Florida (approx. 9 min)", moehlenpris: "Map: walking route from Møhlenpris (approx. 6 min)" },
    tabs: ["From Florida", "From Møhlenpris"],
    routeCaps: {
      florida: ["The footpath up towards Vitalitetsenteret", "The crossing and the footpath up to the entrance"],
      moehlenpris: ["The corner by Vitalitetsenteret"],
    },
    insideTitle: "Inside the building",
    steps: ["Entrance A – Vitalitetsenteret", "Walk through the corridor", "The door to the hall", "The hall"],
    zoomHint: "Tap a photo to enlarge it",
    close: "Close",
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
    findTitle: "Як нас знайти",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Берген",
    routeTitle: "Оберіть, звідки ви йдете",
    mapCaps: { florida: "Мапа: пішки від Florida (близько 9 хв)", moehlenpris: "Мапа: пішки від Møhlenpris (близько 6 хв)" },
    tabs: ["Від Florida", "Від Møhlenpris"],
    routeCaps: {
      florida: ["Пішохідна доріжка вгору до Vitalitetsenteret", "Перехрестя та доріжка вгору до входу"],
      moehlenpris: ["Ріг біля Vitalitetsenteret"],
    },
    insideTitle: "Всередині будівлі",
    steps: ["Вхід A – Vitalitetsenteret", "Пройдіть коридором", "Двері до залу", "Зал"],
    zoomHint: "Натисніть на фото, щоб збільшити",
    close: "Закрити",
    fbTitle: "Приєднуйтесь до групи у Facebook",
    fbD: "Стежте за новинами та ставте запитання.",
    fbBtn: "Відкрити групу у Facebook",
  },
} as const;


const IMG = (n: string) => `/find/${n}.webp`;
// Які фото до якого маршруту — міняється тут (назви файлів у public/find/)
const ROUTES = {
  florida: ["approach-street", "approach-moehlenpris"],
  moehlenpris: ["approach-corner"],
} as const;
const MAPS = { florida: "map-florida", moehlenpris: "map-moehlenpris" } as const;
const INSIDE = ["entrance", "hall-corridor", "door", "hall"] as const;

function Photo({ file, caption, num, onOpen }: { file: string; caption: string; num?: number; onOpen: (src: string, cap: string) => void }) {
  return (
    <figure className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onOpen(IMG(file), caption)}
        className="relative w-full rounded-[18px] md:rounded-[24px] overflow-hidden bg-black/40 border border-white/15 cursor-zoom-in active:scale-[0.99] transition"
        aria-label={caption}
      >
        <img src={IMG(file)} alt={`${caption} – Møllaren Frivilligsentral, Bergen`} width={1400} height={788} loading="lazy" decoding="async" className="w-full h-auto block" />
        {num !== undefined && (
          <span className="absolute top-2 left-2 md:top-3 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/70 text-white font-bold flex items-center justify-center text-sm md:text-lg border border-white/30">{num}</span>
        )}
      </button>
      <figcaption className="text-center text-white font-bold uppercase tracking-wider md:tracking-widest text-[10px] md:text-xs pt-2 md:pt-3 leading-tight">{caption}</figcaption>
    </figure>
  );
}

function Viewer({ src, cap, close, label }: { src: string; cap: string; close: () => void; label: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [close]);
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={cap} onClick={close} className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-3 md:p-8">
      <button type="button" onClick={close} aria-label={label} className="absolute top-3 right-3 md:top-6 md:right-6 h-11 px-4 rounded-full bg-white/15 border border-white/25 text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
        <X className="w-4 h-4" /> {label}
      </button>
      <img src={src} alt={cap} className="max-w-full max-h-[80dvh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
      <p className="text-white/90 text-sm md:text-base font-bold text-center mt-4 max-w-xl">{cap}</p>
    </div>,
    document.body
  );
}

export function StudioInfo({ lang }: { lang: string }) {
  const l: L = lang === "ua" ? "ua" : lang === "en" ? "en" : "no";
  const t = T[l];
  const [route, setRoute] = useState<"florida" | "moehlenpris">("florida");
  const [viewer, setViewer] = useState<{ src: string; cap: string } | null>(null);
  const open = (src: string, cap: string) => setViewer({ src, cap });

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
            ].map(({ Icon, title, text }) => (
              <div key={title} className="bg-white/10 backdrop-blur-2xl rounded-[28px] md:rounded-[40px] border border-white/20 shadow-2xl p-4 md:p-8 flex flex-col items-center text-center">
                <Icon className="w-7 h-7 md:w-10 md:h-10 text-[#22c55e] mb-2 md:mb-4" />
                <h3 className="text-sm md:text-2xl font-bold text-white uppercase tracking-tight mb-1 md:mb-2">{title}</h3>
                <p className="text-xs md:text-lg text-white/80">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SLIK FINNER DU OSS — один цільний скляний блок, фото всередині (без окремих рамок і без обрізання) */}
        <div className="w-full bg-white/10 backdrop-blur-2xl rounded-[28px] md:rounded-[40px] border border-white/20 shadow-2xl p-4 md:p-8 flex flex-col items-center [transform:translateZ(0)] [isolation:isolate]">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight text-center drop-shadow-lg">{t.findTitle}</h2>
          <p className="text-xs md:text-xl text-white/80 text-center mb-4 md:mb-8 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0" /> <span>{t.findSub}</span>
          </p>
          {/* МАРШРУТ: вибір, звідки йти (Florida / Møhlenpris) */}
          <h3 className="text-white/90 font-bold uppercase tracking-widest text-[11px] md:text-sm text-center mb-3">{t.routeTitle}</h3>
          <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6" role="group" aria-label={t.routeTitle}>
            {(["florida", "moehlenpris"] as const).map((k, i) => (
              <button
                key={k}
                type="button"
                aria-pressed={route === k}
                onClick={() => { setRoute(k); trackEvent("select_content", { content_type: "route", item_id: k }); }} // [GOOGLE ADS]
                className={`h-11 md:h-12 px-5 md:px-8 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs border transition ${route === k ? "bg-white text-black border-white" : "bg-white/10 text-white border-white/25"}`}
              >
                {t.tabs[i]}
              </button>
            ))}
          </div>
          <div className="w-full max-w-3xl mx-auto mb-3 md:mb-5">
            <Photo key={MAPS[route]} file={MAPS[route]} caption={t.mapCaps[route]} onOpen={open} />
          </div>
          <div className={`w-full grid gap-3 md:gap-5 mb-6 md:mb-10 ${ROUTES[route].length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-xl mx-auto"}`}>
            {ROUTES[route].map((f, i) => (
              <Photo key={f} file={f} caption={t.routeCaps[route][i]} onOpen={open} />
            ))}
          </div>

          {/* ВСЕРЕДИНІ: вхід → коридор → двері → зал */}
          <h3 className="text-white/90 font-bold uppercase tracking-widest text-[11px] md:text-sm text-center mb-3">{t.insideTitle}</h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
            {INSIDE.map((f, i) => (
              <Photo key={f} file={f} caption={t.steps[i]} num={i + 1} onOpen={open} />
            ))}
          </div>
          <p className="text-white/50 text-[10px] md:text-xs text-center mt-4">{t.zoomHint}</p>
        </div>
        {viewer && <Viewer src={viewer.src} cap={viewer.cap} close={() => setViewer(null)} label={t.close} />}

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
