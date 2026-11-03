"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події конверсій
import { tr } from "./i18n";

const VIDEO_SOURCES = [
  "/KFA.mp4",
  "https://raw.githubusercontent.com/synectica/assets/main/KFA.mp4",
  "https://cdn.jsdelivr.net/gh/synectica/assets/KFA.mp4",
];

export function Hero({ lang = "no" }: { lang?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcIdx, setSrcIdx] = useState(0);
  // Сайт починається з червоного кольору (true)
  const [isRedOverlayVisible, setIsRedOverlayVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const addrRef = useRef<HTMLDivElement>(null);
  const pinTextRef = useRef<HTMLParagraphElement>(null);
  const [fit, setFit] = useState(1); // стиснення довгої назви (напр. «ІНСТРУКТОРКА» з запасним шрифтом), щоб вона не заходила на острів
  const [vw, setVw] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 390);
  const [notchHalf, setNotchHalf] = useState(74); // півширина «острова/брови» + запас, px
  const isPhone = vw < 768;
  const zoneWPre = Math.max(60, vw / 2 - notchHalf - 12);
  // зона зліва від острова, де стоїть логотип/назва: від 12px до (центр − півширина острова)
  const zoneW = Math.max(60, vw / 2 - notchHalf - 12);
  const zoneC = 12 + zoneW / 2;

  useEffect(() => {
    const onR = () => {
      setVw(window.innerWidth);
      // safe-area зверху: ≈59 і більше — Dynamic Island (вузький); 1–54 — стара широка «брова»; 0 — Android/прев'ю (острів ≈ як у новому айфоні)
      const probe = document.createElement("div");
      probe.style.cssText = "position:fixed;top:0;left:0;padding-top:env(safe-area-inset-top,0px);visibility:hidden;pointer-events:none";
      document.body.appendChild(probe);
      const inset = probe.offsetHeight;
      document.body.removeChild(probe);
      setNotchHalf(inset > 0 && inset < 55 ? 112 : 74);
    };
    onR();
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  const descRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [addrTop, setAddrTop] = useState<number | string>("55%");

  // адреса стоїть рівно посередині між низом логотипа (у початковому положенні) і верхом опису кнопок
  useEffect(() => {
    const place = () => {
      const logo = logoRef.current, desc = descRef.current, sec = sectionRef.current, addr = addrRef.current;
      if (!logo || !desc || !sec || !addr) return;
      const secTop = sec.getBoundingClientRect().top;
      const logoTop0 = parseFloat(getComputedStyle(logo).top) + window.innerHeight * 0.35; // початкове положення логотипа (translateY 35vh)
      const logoBottom = logoTop0 + logo.offsetHeight;
      const descTop = desc.getBoundingClientRect().top - secTop;
      const ah = addr.offsetHeight;
      const mid = (logoBottom + descTop) / 2 - ah / 2;
      setAddrTop(Math.round(Math.max(logoBottom + 8, Math.min(mid, descTop - ah - 8))));
    };
    place();
    window.addEventListener("resize", place);
    (document as any).fonts?.ready?.then(place);
    const t = setTimeout(place, 600);
    return () => { window.removeEventListener("resize", place); clearTimeout(t); };
  }, [lang]);

  // висота логотипа у «стиснутому» вигляді (scale 0.4) → висота смужки; від неї центрується і прапорець мови
  useEffect(() => {
    const measure = () => {
      const el = logoRef.current;
      if (!el) return;
      const hgt = Math.round(el.offsetHeight * 0.4);
      if (hgt > 0) document.documentElement.style.setProperty("--bar-row-h", `${hgt}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    (document as any).fonts?.ready?.then(measure);
    const t = setTimeout(measure, 600);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [lang]);
  const [pinned, setPinned] = useState<number>(-1);   // який заголовок зараз «застиг» угорі (−1 = логотип)
  const dirRef = useRef<1 | -1>(1);

  // підігнати ширину назви блоку під вільну зону зліва від острова (на телефонах)
  useLayoutEffect(() => {
    const el = pinTextRef.current;
    if (!el || !isPhone) { setFit(1); return; }
    el.style.transform = "skewX(-14deg)";
    const natural = el.scrollWidth;                 // реальна ширина тексту (без стиснення)
    const room = zoneWPre / 0.4;                    // доступна ширина до зменшення у 0.4
    setFit(natural > room ? Math.max(0.35, room / natural) : 1);
    el.style.transform = "";
  }, [pinned, lang, isPhone, vw, notchHalf]);                   // напрямок скролу: звідки «в'їжджає» нова назва

  // заголовки блоків, що по черзі застигають угорі на місці логотипа: [селектор, індекс, коротка назва]
  const PINS: [string, number, string][] = [
    ["#bio h2", 0, tr(lang, "Instruktøren", "The instructor", "Інструкторка")],
    ["#pricing h2", 0, tr(lang, "Priser", "Prices", "Ціни")],
    ["#booking h2", 0, tr(lang, "Book prøvetime", "Book a trial", "Запис")],
    ["#contact h2", 0, tr(lang, "Kontakt", "Contact", "Контакти")],
    ["#info h2", 0, tr(lang, "Hva du trenger", "What to bring", "Що взяти")],
    ["#info h2", 1, tr(lang, "Slik finner du oss", "How to find us", "Як знайти двері")],
    ["#location h2", 0, tr(lang, "Finn oss", "Find us", "Де ми")],
    ["#studio h2", 0, tr(lang, "Dansestudio", "Dance studio", "Студія")],
  ];
  const pinsRef = useRef(PINS);
  pinsRef.current = PINS;

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 500;
      window.requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / maxScroll, 1);
        setScrollProgress(progress);
        // Заголовок блоку, що виїжджає знизу, піднімається під червону смужку і «застигає» на місці логотипа;
        // коли під смужку заїжджає наступний — він замінює попередній.
        const barBottom = barRef.current?.getBoundingClientRect().bottom ?? 90;
        let current = -1;
        pinsRef.current.forEach(([sel, idx], i) => {
          const el = document.querySelectorAll(sel)[idx] as HTMLElement | undefined;
          if (el && el.getBoundingClientRect().top <= barBottom - 6) current = i;
        });
        if (window.scrollY <= 200) current = -1;
        setPinned((prev) => { if (prev !== current) dirRef.current = current > prev ? 1 : -1; return current; });
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Початкова точка відео (після завантаження метаданих — інакше Safari ігнорує)
    // Гарантовано без звуку (React не завжди ставить атрибут muted у DOM)
    const forceMute = () => { video.defaultMuted = true; video.muted = true; video.volume = 0; };
    forceMute();
    video.addEventListener("volumechange", forceMute);
    video.addEventListener("loadedmetadata", forceMute);
    const seekStart = () => { try { /* відео вже обрізане, перемотка не потрібна */ } catch (e) {} };
    if (video.readyState >= 1) seekStart(); else video.addEventListener("loadedmetadata", seekStart, { once: true });

    const handleTimeUpdate = () => {
      // Починаємо плавно зафарбовувати в червоний за 1 секунду до кінця (плавний перехід ДО 1.5с холду)
      if (video.currentTime >= video.duration - 1 && !isRedOverlayVisible) {
        setIsRedOverlayVisible(true);
      }

      // Коли відео майже закінчилося — перекидаємо на початок
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 0;
        video.play();
        // Фіксуємо "щільний" червоний на 1.5 секунди перед початком зникнення
        setTimeout(() => setIsRedOverlayVisible(false), 1500);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const startPlay = async () => {
      try {
        await video.play();
      } catch (e) {
        console.log("Autoplay blocked");
      }
    };

    startPlay();
    // Червоний екран не чекає на відео: через 1.5с зникає, під ним уже видно постер (перший кадр)
    const redT = setTimeout(() => setIsRedOverlayVisible(false), 1500);
    return () => {
      clearTimeout(redT);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("volumechange", forceMute);
      video.removeEventListener("loadedmetadata", forceMute);
    };
  }, [isRedOverlayVisible, srcIdx]);

  const textScale = 1 - (scrollProgress * 0.6);
  const translateY = 35 * (1 - scrollProgress);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black text-white">
      <style>{`
        .font-bebas { font-family: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace; }
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; pointer-events: none; }

        .sticky-title-container {
          --safe-top: 4px;
          position: fixed; left: 0; width: 100%; z-index: 40; pointer-events: none;
          display: flex; flex-direction: column; align-items: center;
          will-change: transform; transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
        }

        .sticky-bar { --safe-top: 4px; position: fixed; top: 0; left: 0; width: 100%; z-index: 30; pointer-events: none;
          height: calc(var(--safe-top) + var(--bar-row-h, 30px) + var(--bar-pad-b, 28px)); background: transparent; backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border-bottom: 1px solid rgba(255,255,255,0.18); box-shadow: none; transition: opacity 0.2s linear; }
        /* телефон: скляна смужка на висоті острова (від верху екрана), центр смужки = центр острова */
        @media (max-width: 767px) { .sticky-bar { top: 0; height: max(calc(var(--island-c) * 2), calc(var(--bar-row-h, 30px) + 8px)); } }
        @media (min-width: 768px) { .sticky-bar { --safe-top: 28px; } }
        .pin-title { animation: pinIn 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
        @keyframes pinIn { from { opacity: 0; transform: translateY(calc(var(--pin-dir, 1) * 28px)); } to { opacity: 1; transform: translateY(0); } }

        .hero-title { font-size: 10.8vw !important; line-height: 0.8; display: block; width: 100%; text-align: center;
          /* курсив гарантовано: Bebas Neue не має курсивної гарнітури, тому нахил задано явно (як в оригінальному логотипі) */
          font-style: normal !important; transform: skewX(-14deg); transform-origin: 50% 100%; }
        .hero-subtitle { font-size: 3.3vw !important; letter-spacing: 0.49em !important; display: block; width: 100%; margin-right: -0.49em; text-align: center; }

        /* на телефоні брендинг при скролі зупиняється під «бровами» айфона (вирізом / Dynamic Island) */
        /* ТЕЛЕФОН (айфон з островом/бровами, Android): логотип/назва — ЗЛІВА від острова, прапорець — СПРАВА, на рівні острова */
        @media (max-width: 767px) {
          .sticky-title-container { --safe-top: max(2px, calc(var(--island-c) - var(--bar-row-h, 30px) / 2)); }
        }

        /* на комп'ютері логотип, що піднімається за скролом, зупиняється трохи нижче */
        @media (min-width: 768px) {
          .sticky-title-container { --safe-top: 28px; }
        }

        @media (min-width: 1024px) {
          .hero-title { font-size: 5.4vw !important; }
          .hero-subtitle { font-size: 1.65vw !important; }
        }

        .hero-spiral-button {
          position: relative; background: #fff; border: none;
          border-radius: 9999px; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex; align-items: center; justify-content: center;
          z-index: 1; cursor: pointer; text-decoration: none;
          box-shadow: 0 10px 30px var(--btn-shadow);
        }

        .hero-spiral-button::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 45%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        .hero-spiral-button::before {
          content: ""; position: absolute; inset: -200%; z-index: -1;
          background: var(--btn-gradient); filter: blur(30px); opacity: 1;
          animation: led-rotate 8s linear infinite;
        }

        @keyframes led-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Налаштування переходу: 0.5 секунди (півсекунди) */
        .red-transition { transition: opacity 0.5s ease-in-out; }
      `}</style>

      <div className="fixed-bg-video">
        <video key={srcIdx} ref={videoRef} src={VIDEO_SOURCES[srcIdx]} muted defaultMuted autoPlay loop={false} playsInline preload="auto" poster="/KFA-poster.jpg"
          onError={() => setSrcIdx((i) => Math.min(i + 1, VIDEO_SOURCES.length - 1))}
          className="w-full h-full object-cover" style={{ filter: "brightness(0.45)", transform: "scale(1.45)" }} />
        {/* Червоний оверлей з оновленою транзицією */}
        <div className={`absolute inset-0 z-[3] bg-red-600 red-transition pointer-events-none ${isRedOverlayVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      <div className="relative z-[10] flex-[0.8] flex flex-col justify-center items-center px-4">
        {/* [SEO] додано "Dansetimer i Bergen" — ключова фраза у видимому тексті */}
        <p className="font-bebas text-lg md:text-2xl tracking-[0.2em] opacity-60 uppercase text-center">
          {tr(lang, "Dansetimer i Bergen – velkommen til et signaturkurs i koreografi", "Dance classes in Bergen – welcome to a signature choreography course", "Танцювальні заняття в Бергені – ласкаво просимо на авторський курс хореографії")} <br className="hidden md:block"/> {tr(lang, "for nybegynnere og profesjonelle", "for beginners and professionals", "для початківців і професіоналів")}
        </p>
      </div>

      {/* ЧЕРВОНА СМУЖКА під логотипом/назвою: з'являється, коли логотип піднявся вгору */}
      <div ref={barRef} className="sticky-bar" style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.25)) }} />

      <div ref={logoRef} className="sticky-title-container" style={{
        top: "var(--safe-top)",
        transform: `translateX(${isPhone ? -(vw / 2 - zoneC) * scrollProgress : 0}px) translateY(${translateY}vh) scale(${textScale}) translateZ(0)`,
        transformOrigin: "top center",
        backfaceVisibility: "hidden"
      }}>
        <div className="w-full max-w-6xl px-4 relative" style={{ ["--pin-dir" as any]: dirRef.current }}>
          {/* НАЗВА БЛОКУ: застигає на місці логотипа; наступна заміняє її (напрямок залежить від скролу) */}
          {pinned >= 0 && (
            <div key={pinned} aria-hidden="true" className="pin-title absolute inset-x-0 top-0 bottom-0 px-4 flex flex-col items-center justify-center">
              <p ref={pinTextRef} className={`hero-title logo-font font-bebas font-bold uppercase text-white italic ${isPhone ? "" : "whitespace-nowrap"}`} style={isPhone ? { maxWidth: zoneW / 0.4, margin: "0 auto", whiteSpace: "nowrap", transform: `skewX(-14deg) scale(${fit})`, transformOrigin: "50% 50%" } : undefined}>{PINS[pinned][2]}</p>
              <p className="hero-subtitle logo-font font-bebas opacity-90 uppercase mt-3" style={isPhone ? { letterSpacing: "0.2em", marginRight: "-0.2em" } : undefined}>KOREOGRAFI FOR ALLE</p>
            </div>
          )}
          <div style={{ opacity: pinned >= 0 ? 0 : 1, transform: pinned >= 0 ? "translateY(-14px)" : "translateY(0)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
          {/* [SEO] єдиний H1 доповнено "dansetimer i Bergen" (візуально не змінюється) */}
          <h1 className="hero-title logo-font font-bebas font-bold uppercase text-white italic">KOREOGRAFI FOR ALLE<span className="sr-only"> – dansetimer i Bergen</span></h1>
          <p className="hero-subtitle logo-font font-bebas opacity-90 uppercase mt-3" style={isPhone ? { letterSpacing: `${0.49 - 0.29 * scrollProgress}em`, marginRight: `${-(0.49 - 0.29 * scrollProgress)}em` } : undefined}>{tr(lang, "med", "with", "з")} GALYNA GERASYMENKO</p>
          </div>
        </div>
      </div>

      {/* АДРЕСА: по центру по вертикалі між логотипом і описом кнопок (позиція рахується з реальних розмірів) */}
      <div ref={addrRef} className="absolute inset-x-0 z-[10] px-4 flex justify-center" style={{ top: addrTop }}>
        {/* [SEO/Ads] адреса одразу на першому екрані */}
            <button
              onClick={() => {
                trackEvent("click_directions", { location: "hero" });
                document.querySelector('#location')?.scrollIntoView({ behavior: "smooth" });
              }}
              className="underline underline-offset-4 decoration-white/30 hover:decoration-white text-sm md:text-lg text-white/80 text-center"
            >
              {/* пін локації: проста біла іконка без обводки */}
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="inline-block align-[-3px] mr-2" fill="#fff">
                <path fillRule="evenodd" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
              </svg>
              Wolffs gate 12, Møllaren Frivilligsentral, Bergen
            </button>
      </div>

      <div className="relative z-[10] flex-1 flex flex-col items-center px-4 justify-end pb-12">
        <div className="flex flex-col items-center gap-10 w-full">
          <div ref={descRef} className="text-center text-sm md:text-lg text-white/80 leading-relaxed font-normal">
            <p>{tr(lang, "Er du ny?", "New here?", "Ви тут уперше?")} <span className="text-[#22c55e] font-semibold">{tr(lang, "Book gratis prøvetime", "Book a free trial class", "Забронюйте безкоштовне пробне заняття")}</span></p>
            <p>{tr(lang, "Eksisterende kunde?", "Existing customer?", "Вже займаєтесь?")} <span className="text-[#f97316] font-semibold">{tr(lang, "Betal direkte", "Pay directly", "Оплатіть напряму")}</span></p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-2xl">
            <button
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => {
                trackEvent("select_content", { content_type: "cta", item_id: "hero_booking" }); // [GOOGLE ADS]
                document.querySelector('#booking')?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                '--btn-gradient': 'conic-gradient(from 0deg, #0047AB, #00BFFF, #22c55e, #0047AB)',
                '--btn-shadow': 'rgba(34, 197, 94, 0.3)'
              } as any}
            >
              {/* [GOOGLE ADS] текст кнопки збігається з обіцянкою в оголошенні ("gratis prøvetime") */}
              <span className="relative z-10 font-black uppercase text-[12px] tracking-[2.5px] drop-shadow-md">
                {tr(lang, "BOOK GRATIS PRØVETIME", "BOOK A FREE TRIAL", "БЕЗКОШТОВНЕ ПРОБНЕ ЗАНЯТТЯ")}
              </span>
            </button>

            <button
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => {
                trackEvent("select_content", { content_type: "cta", item_id: "hero_pricing" }); // [GOOGLE ADS]
                document.querySelector('#pricing')?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                '--btn-gradient': 'conic-gradient(from 0deg, #FF0000, #FF69B4, #f97316, #FF0000)',
                '--btn-shadow': 'rgba(249, 115, 22, 0.3)'
              } as any}
            >
              <span className="relative z-10 font-black uppercase text-[12px] tracking-[2.5px] drop-shadow-md">
                {tr(lang, "GÅ TIL BETALING", "GO TO PAYMENT", "ДО ОПЛАТИ")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
