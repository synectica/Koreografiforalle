"use client";
import React from "react";
import { Play } from "lucide-react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події

// ПРИКЛАДИ ЗАНЯТЬ (відео). Поки відео немає — показуються плавні градієнтні плейсхолдери «Video kommer snart».
// ЯК ДОДАТИ ВІДЕО: поклади файл у public/ (напр. /public/video/time-1.mp4, без звуку, до 5–10 МБ, 720p),
// за бажанням постер (public/video/time-1.jpg), і впиши шляхи в `src` та `poster` нижче.
// Кілька відео — просто додай рядки в масив VIDEOS. Підписи (title) — три мови.
type V = { id: number; src: string; poster: string; grad: [string, string, string]; title: { no: string; en: string; ua: string } };
const VIDEOS: V[] = [
  { id: 1, src: "", poster: "", grad: ["#ff7a59", "#ff3d71", "#7b4dff"], title: { no: "Teknikk ved barren", en: "Barre technique", ua: "Техніка біля станка" } },
  { id: 2, src: "", poster: "", grad: ["#22c55e", "#00bfff", "#0047ab"], title: { no: "Adagio på midten", en: "Adagio in the centre", ua: "Адажіо на середині" } },
  { id: 3, src: "", poster: "", grad: ["#fbbc05", "#f97316", "#ea4335"], title: { no: "Gulvarbeid", en: "Floor work", ua: "Робота на підлозі" } },
];

const TXT = {
  no: { title: "Eksempler på timer", sub: "Se hvordan en koreografitime ser ut", soon: "Video kommer snart", label: "Videoeksempler fra timene i Bergen" },
  en: { title: "Class examples", sub: "See what a choreography class looks like", soon: "Video coming soon", label: "Video examples from the classes in Bergen" },
  ua: { title: "Приклади занять", sub: "Подивіться, як проходить заняття з хореографії", soon: "Відео скоро з'явиться", label: "Відеоприклади занять у Бергені" },
} as const;

function Card({ v, l, soon }: { v: V; l: "no" | "en" | "ua"; soon: string }) {
  const [c1, c2, c3] = v.grad;
  return (
    <figure className="flex flex-col items-center">
      <div className="relative w-full aspect-video rounded-[18px] md:rounded-[24px] overflow-hidden bg-black border border-white/15">
        {v.src ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={v.poster || undefined}
            className="w-full h-full object-cover"
            onPlay={() => trackEvent("select_content", { content_type: "video", item_id: `class_video_${v.id}` })} // [GOOGLE ADS]
          >
            <source src={v.src} type="video/mp4" />
          </video>
        ) : (
          <div
            role="img"
            aria-label={`${v.title[l]} – ${soon}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(120deg, ${c1}, ${c2}, ${c3}, ${c1})`, backgroundSize: "300% 300%", animation: "kfaGrad 8s ease-in-out infinite" }}
          >
            <span className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/40 border border-white/40 flex items-center justify-center">
              <Play className="w-6 h-6 md:w-9 md:h-9 text-white ml-1" fill="currentColor" />
            </span>
            <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs drop-shadow">{soon}</span>
          </div>
        )}
      </div>
      <figcaption className="text-center text-white font-bold uppercase tracking-wider md:tracking-widest text-[10px] md:text-xs pt-2 md:pt-3 leading-tight">{v.title[l]}</figcaption>
    </figure>
  );
}

export function GallerySection({ lang = "no" }: { lang?: string }) {
  const l: "no" | "en" | "ua" = lang === "ua" ? "ua" : lang === "en" ? "en" : "no";
  const t = TXT[l];
  return (
    <section id="studio" className="relative w-full bg-transparent flex flex-col items-center py-0 px-4 overflow-visible">
      <style>{`@keyframes kfaGrad { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center">
        <div className="text-center mb-8">
          {/* [SEO] заголовок з ключовою фразою */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">{t.title}</h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">{t.sub}</p>
        </div>
        <div
          role="region"
          aria-label={t.label}
          className="w-full p-3 md:p-6 bg-white/10 backdrop-blur-2xl rounded-[28px] md:rounded-[50px] border border-white/20 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 [transform:translateZ(0)] [isolation:isolate]"
        >
          {VIDEOS.map((v) => (
            <Card key={v.id} v={v} l={l} soon={t.soon} />
          ))}
        </div>
      </div>
    </section>
  );
}
