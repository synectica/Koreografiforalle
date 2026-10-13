"use client";
import React from "react";
import { Footprints, Waves, Facebook, MapPin } from "lucide-react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події

// TODO: встав посилання на Facebook-групу. Поки порожнє — кнопка не показується.
const FACEBOOK_GROUP_URL = "";

type L = "no" | "en" | "ua";

const T = {
  no: {
    needTitle: "Hva du trenger",
    socksT: "Sokker",
    socksD: "Vi danser i sokker – helst med anti-skli.",
    towelT: "Håndkle",
    towelD: "Ta med et håndkle å legge på matten.",
    findTitle: "Slik finner du oss",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    steps: ["Wolffs gate 12", "Inngangen", "Døren til salen"],
    stepAlt: "Bilde kommer",
    fbTitle: "Bli med i Facebook-gruppen",
    fbD: "Følg med på nyheter og still spørsmål.",
    fbBtn: "Åpne Facebook-gruppen",
  },
  en: {
    needTitle: "What to bring",
    socksT: "Socks",
    socksD: "We dance in socks – ideally with non-slip soles.",
    towelT: "Towel",
    towelD: "Bring a towel to lay on the mat.",
    findTitle: "How to find us",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Bergen",
    steps: ["Wolffs gate 12", "The entrance", "The door to the hall"],
    stepAlt: "Photo coming soon",
    fbTitle: "Join the Facebook group",
    fbD: "Follow the news and ask questions.",
    fbBtn: "Open the Facebook group",
  },
  ua: {
    needTitle: "Що взяти з собою",
    socksT: "Шкарпетки",
    socksD: "Ми танцюємо в шкарпетках – найкраще з антиковзним покриттям.",
    towelT: "Рушник",
    towelD: "Візьміть рушник, щоб стелити на килимок.",
    findTitle: "Як нас знайти",
    findSub: "Møllaren Frivilligsentral, Wolffs gate 12, Берген",
    steps: ["Wolffs gate 12", "Вхід", "Двері до залу"],
    stepAlt: "Фото скоро",
    fbTitle: "Приєднуйтесь до групи у Facebook",
    fbD: "Стежте за новинами та ставте запитання.",
    fbBtn: "Відкрити групу у Facebook",
  },
} as const;

export function StudioInfo({ lang }: { lang: string }) {
  const l: L = lang === "ua" ? "ua" : lang === "en" ? "en" : "no";
  const t = T[l];

  return (
    <section id="info" className="relative z-10 w-full flex flex-col items-center py-0 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12">

        {/* HVA DU TRENGER */}
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-5 md:mb-8 tracking-tight text-center drop-shadow-lg">{t.needTitle}</h2>
          <div className="w-full grid grid-cols-2 gap-3 md:gap-4">
            {[
              { Icon: Footprints, title: t.socksT, text: t.socksD },
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
          {/* TODO: заміни чорні плейсхолдери на фото (src) і додай короткий опис дверей */}
          <div className="w-full grid grid-cols-3 gap-2 md:gap-4">
            {t.steps.map((label, i) => (
              <figure key={i} className="flex flex-col items-center">
                <div
                  role="img"
                  aria-label={`${label} – ${t.stepAlt}`}
                  className="w-full aspect-[3/4] md:aspect-video rounded-[16px] md:rounded-[22px] bg-black flex items-center justify-center overflow-hidden"
                >
                  <span className="font-bebas text-white text-4xl md:text-8xl leading-none select-none">{i + 1}</span>
                </div>
                <figcaption className="text-center text-white font-bold uppercase tracking-wider md:tracking-widest text-[9px] md:text-xs pt-2 md:pt-4 leading-tight">{label}</figcaption>
              </figure>
            ))}
          </div>
        </div>

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
