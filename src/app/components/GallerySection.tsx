"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події

// ЯК ЗАМІНИТИ НА РЕАЛЬНІ ФОТО:
// додай файли у public/ (напр. /studio-1.jpg) і впиши шлях у `src`.
// Фото має бути горизонтальне 16:9 — на телефоні воно саме обріжеться під вертикальну картку,
// на комп'ютері показується повністю (16:9). Перелистування — курсором (перетягнути) або пальцем.
// Натискання на фото відкриває його на весь екран (хрестик, стрілки, Esc, свайп).
// Зараз у `src` — GIF із плавним переливанням градієнтів (public/studio-1..4.gif), поверх нього великий номер.
// Коли будуть фото — заміни шлях і постав SHOW_NUMBERS = false.
const SHOW_NUMBERS = true;
const slides = [
  { id: 1, src: "/studio-1.gif", alt: "Dansestudio i Bergen – salen sett fra inngangen" },
  { id: 2, src: "/studio-2.gif", alt: "Dansestudio i Bergen – speilvegg og gulv" },
  { id: 3, src: "/studio-3.gif", alt: "Dansestudio i Bergen – lokalet under en time" },
  { id: 4, src: "/studio-4.gif", alt: "Dansestudio i Bergen – garderobe og oppholdsrom" },
];

const TXT = {
  no: { title: "Dansestudio i Bergen", sub: "Slik ser salen ut innvendig", open: "Åpne bilde", prev: "Forrige bilde", next: "Neste bilde", close: "Lukk", label: "Bilder av dansestudioet i Bergen" },
  en: { title: "Dance studio in Bergen", sub: "This is what the hall looks like inside", open: "Open photo", prev: "Previous photo", next: "Next photo", close: "Close", label: "Photos of the dance studio in Bergen" },
  ua: { title: "Танцювальна студія в Бергені", sub: "Ось як виглядає зал всередині", open: "Відкрити фото", prev: "Попереднє фото", next: "Наступне фото", close: "Закрити", label: "Фото танцювальної студії в Бергені" },
} as const;

function Slide({ s }: { s: (typeof slides)[number] }) {
  const [failed, setFailed] = useState(false); // якщо файлу немає — чорний слайд
  return (
    <div role="img" aria-label={s.alt} className="relative w-full h-full bg-black flex items-center justify-center">
      {s.src && !failed && (
        <img src={s.src} alt="" draggable={false} loading="lazy" decoding="async" onError={() => setFailed(true)} className="absolute inset-0 w-full h-full object-cover" />
      )}
      {SHOW_NUMBERS && (
        <span className="relative font-bebas text-white font-bold leading-none select-none text-[9rem] md:text-[14rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">{s.id}</span>
      )}
    </div>
  );
}

export function GallerySection({ lang = "no" }: { lang?: string }) {
  const t = TXT[lang === "ua" ? "ua" : lang === "en" ? "en" : "no"];
  const [index, setIndex] = useState(0);   // комп'ютер
  const [mi, setMi] = useState(0);         // телефон
  const [drag, setDrag] = useState(0);     // зсув під час перетягування (px)
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const moved = useRef(0);                  // наскільки зсунули курсор (щоб відрізнити клік від перетягування)
  const [viewer, setViewer] = useState<number | null>(null); // індекс фото на весь екран
  const openViewer = (i: number) => { setViewer(i); trackEvent("select_content", { content_type: "gallery_open", item_id: `studio_${i + 1}` }); }; // [GOOGLE ADS]

  // Esc / стрілки / блокування прокрутки сторінки, поки фото відкрите
  useEffect(() => {
    if (viewer === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      if (e.key === "ArrowRight") setViewer((v) => (v === null ? v : (v + 1) % slides.length));
      if (e.key === "ArrowLeft") setViewer((v) => (v === null ? v : (v - 1 + slides.length) % slides.length));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [viewer]);

  const wrap = (n: number) => (n + slides.length) % slides.length;

  const go = (next: number) => {
    const i = wrap(next);
    setIndex(i);
    trackEvent("select_content", { content_type: "gallery", item_id: `studio_${i + 1}` }); // [GOOGLE ADS]
  };

  // перетягування курсором / пальцем на комп'ютері
  const onDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    moved.current = 0;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    moved.current = Math.max(moved.current, Math.abs(e.clientX - startX.current));
    setDrag(e.clientX - startX.current);
  };
  const onUp = () => {
    if (startX.current === null) return;
    const w = frame.current?.clientWidth ?? 600;
    if (moved.current < 6) openViewer(index);              // простий клік — на весь екран
    else if (Math.abs(drag) > w * 0.12) go(index + (drag < 0 ? 1 : -1));
    startX.current = null;
    setDrag(0);
    setDragging(false);
  };

  const arrow = "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 active:scale-90 transition";

  return (
    <section id="studio" className="relative w-full bg-transparent flex flex-col items-center py-0 px-4 overflow-visible">
      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center">

        <div className="text-center mb-8">
          {/* [SEO] заголовок з ключовою фразою */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {t.title}
          </h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="w-full p-3 md:p-6 bg-white/10 backdrop-blur-2xl rounded-[40px] md:rounded-[50px] border border-white/20 shadow-2xl overflow-hidden [transform:translateZ(0)] [isolation:isolate]">

          {/* ТЕЛЕФОН: вертикальні картки (обрізані з 16:9), гортаються пальцем */}
          <div
            className="md:hidden flex overflow-x-auto snap-x snap-mandatory rounded-[28px]"
            style={{ scrollbarWidth: "none" }}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.label}
            onScroll={(e) => setMi(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          >
            {slides.map((s) => (
              <div key={s.id} onClick={() => openViewer(s.id - 1)} role="button" tabIndex={0} aria-label={`${t.open} ${s.id}`} onKeyDown={(e) => { if (e.key === "Enter") openViewer(s.id - 1); }} className="snap-center shrink-0 w-full aspect-[3/4] rounded-[28px] overflow-hidden bg-black select-none cursor-zoom-in">
                <Slide s={s} />
              </div>
            ))}
          </div>

          {/* КРАПКИ (телефон) */}
          <div className="flex md:hidden justify-center gap-3 mt-4 mb-1">
            {slides.map((s, i) => (
              <span key={s.id} aria-hidden="true" className={`h-2.5 rounded-full transition-all ${i === mi ? "w-8 bg-white" : "w-2.5 bg-white/30"}`} />
            ))}
          </div>

          {/* КОМП'ЮТЕР: горизонтальна карусель 16:9, перетягується курсором */}
          <div
            ref={frame}
            className={`hidden md:block relative w-full aspect-video rounded-[28px] overflow-hidden bg-black select-none touch-pan-y ${dragging ? "cursor-grabbing" : "cursor-zoom-in"}`}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.label}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div
              className={`flex h-full ${dragging ? "" : "transition-transform duration-500 ease-out"}`}
              style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
            >
              {slides.map((s, i) => (
                <div key={s.id} className="w-full h-full shrink-0 pointer-events-none" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}`}>
                  <Slide s={s} />
                </div>
              ))}
            </div>
            <button onPointerDown={(e) => e.stopPropagation()} onClick={() => go(index - 1)} aria-label={t.prev} className={`${arrow} left-4`}><ChevronLeft className="w-6 h-6" /></button>
            <button onPointerDown={(e) => e.stopPropagation()} onClick={() => go(index + 1)} aria-label={t.next} className={`${arrow} right-4`}><ChevronRight className="w-6 h-6" /></button>
          </div>

          {/* КРАПКИ (комп'ютер) */}
          <div className="hidden md:flex justify-center gap-3 mt-6 mb-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                aria-label={`${i + 1} / ${slides.length}`}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2.5 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {viewer !== null && typeof document !== "undefined" && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.label}
          className="fixed inset-0 z-[20000] bg-black/95 flex flex-col items-center justify-center"
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          onClick={() => setViewer(null)}
        >
          <div
            className="relative aspect-[3/4] md:aspect-video rounded-[24px] overflow-hidden bg-black shadow-2xl"
            style={{ width: "min(92vw, calc(72dvh * 0.75))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Slide s={slides[viewer]} />
          </div>
          <style>{`@media (min-width: 768px) { [aria-label="${t.label}"][role="dialog"] > div:first-child { width: min(92vw, calc(78dvh * 1.7778)) !important; } }`}</style>

          <div className="mt-5 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setViewer((viewer - 1 + slides.length) % slides.length)} aria-label={t.prev} className="w-12 h-12 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center active:scale-90 transition"><ChevronLeft className="w-6 h-6" /></button>
            <button type="button" onClick={() => setViewer(null)} aria-label={t.close} className="h-12 px-6 rounded-full bg-white text-black font-black uppercase text-xs tracking-widest flex items-center gap-2 active:scale-95 transition"><X className="w-4 h-4" />{t.close}</button>
            <button type="button" onClick={() => setViewer((viewer + 1) % slides.length)} aria-label={t.next} className="w-12 h-12 rounded-full bg-white/15 border border-white/25 text-white flex items-center justify-center active:scale-90 transition"><ChevronRight className="w-6 h-6" /></button>
          </div>
          <p className="mt-3 text-white/60 text-xs tracking-widest">{viewer + 1} / {slides.length}</p>
        </div>,
        document.body
      )}
    </section>
  );
}
