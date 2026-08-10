"use client";
import React, { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Сайт починається з червоного кольору (true)
  const [isRedOverlayVisible, setIsRedOverlayVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 500;
      window.requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / maxScroll, 1);
        setScrollProgress(progress);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Початкова точка відео
    video.currentTime = 3;

    const handleTimeUpdate = () => {
      // Починаємо плавно зафарбовувати в червоний за 1 секунду до кінця (плавний перехід ДО 1.5с холду)
      if (video.currentTime >= video.duration - 1 && !isRedOverlayVisible) {
        setIsRedOverlayVisible(true);
      }

      // Коли відео майже закінчилося — перекидаємо на початок
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 3;
        video.play();
        // Фіксуємо "щільний" червоний на 1.5 секунди перед початком зникнення
        setTimeout(() => setIsRedOverlayVisible(false), 1500);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const startPlay = async () => {
      try {
        await video.play();
        // При першому заході: тримаємо червоний 1.5с, потім запускаємо перехід у 0.5с
        setTimeout(() => setIsRedOverlayVisible(false), 1500);
      } catch (e) {
        console.log("Autoplay blocked");
      }
    };

    startPlay();
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isRedOverlayVisible]);

  const textScale = 1 - (scrollProgress * 0.6);
  const translateY = (35 * (1 - scrollProgress)) + (scrollProgress * 20 / 10);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; pointer-events: none; }
        
        .sticky-title-container {
          position: fixed; left: 0; width: 100%; z-index: 40; pointer-events: none;
          display: flex; flex-direction: column; align-items: center;
          will-change: transform; transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
        }

        .hero-title { font-size: 10.8vw !important; line-height: 0.8; display: block; width: 100%; font-style: italic !important; text-align: center; }
        .hero-subtitle { font-size: 3.3vw !important; letter-spacing: 0.49em !important; display: block; width: 100%; margin-right: -0.49em; text-align: center; }
        
        @media (min-width: 1024px) {
          .hero-title { font-size: 5.4vw !important; }
          .hero-subtitle { font-size: 1.65vw !important; }
        }

        .hero-spiral-button {
          position: relative; background: #000; border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex; align-items: center; justify-content: center;
          z-index: 1; cursor: pointer; text-decoration: none;
          box-shadow: inset 0 -8px 12px rgba(0, 0, 0, 0.5), inset 0 4px 8px rgba(255, 255, 255, 0.2), 0 10px 30px var(--btn-shadow);
        }

        .hero-spiral-button::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 45%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        .hero-spiral-button::before {
          content: ""; position: absolute; inset: -200%; z-index: -1;
          background: var(--btn-gradient); filter: blur(35px);
          animation: led-rotate 8s linear infinite;
        }

        @keyframes led-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Налаштування переходу: 0.5 секунди (півсекунди) */
        .red-transition { transition: opacity 0.5s ease-in-out; }
      `}</style>

      <div className="fixed-bg-video">
        <video ref={videoRef} muted autoPlay playsInline className="w-full h-full object-cover" style={{ filter: "brightness(0.45)", transform: "scale(1.45)" }}>
          <source src="https://cdn.jsdelivr.net/gh/synectica/assets/KFA.mp4" type="video/mp4" />
        </video>
        {/* Червоний оверлей з оновленою транзицією */}
        <div className={`absolute inset-0 z-[3] bg-red-600 red-transition pointer-events-none ${isRedOverlayVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      <div className="relative z-[10] flex-[0.8] flex flex-col justify-center items-center px-4">
        <p className="font-bebas text-lg md:text-2xl tracking-[0.2em] opacity-60 uppercase text-center">
          Velkommen til et signaturkurs i koreografi <br className="hidden md:block"/> for nybegynnere og profesjonelle
        </p>
      </div>

      <div className="sticky-title-container" style={{ 
        top: 0,
        transform: `translateY(${translateY}vh) scale(${textScale}) translateZ(0)`, 
        transformOrigin: "top center",
        backfaceVisibility: "hidden"
      }}>
        <div className="w-full max-w-6xl px-4">
          <h1 className="hero-title font-bebas font-bold uppercase text-white italic">KOREOGRAFI FOR ALLE</h1>
          <p className="hero-subtitle font-bebas opacity-90 uppercase mt-3">med GALYNA GERASYMENKO</p>
        </div>
      </div>

      <div className="relative z-[10] flex-1 flex flex-col items-center px-4 justify-end pb-12">
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="text-center text-sm md:text-lg text-white/80 leading-relaxed font-normal">
            <p>Er du ny? <span className="text-[#22c55e] font-semibold">Book prøvetime</span></p>
            <p>Eksisterende kunde? <span className="text-[#f97316] font-semibold">Betal direkte</span></p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-2xl">
            <button 
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: "smooth" })}
              style={{ 
                '--btn-gradient': 'conic-gradient(from 0deg, #0047AB, #00BFFF, #22c55e, #0047AB)',
                '--btn-shadow': 'rgba(34, 197, 94, 0.3)'
              } as any}
            >
              <span className="relative z-10 font-black uppercase text-[12px] tracking-[2.5px] drop-shadow-md">
                BESTILL PRØVETIME
              </span>
            </button>

            <button 
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: "smooth" })}
              style={{ 
                '--btn-gradient': 'conic-gradient(from 0deg, #FF0000, #FF69B4, #f97316, #FF0000)',
                '--btn-shadow': 'rgba(249, 115, 22, 0.3)'
              } as any}
            >
              <span className="relative z-10 font-black uppercase text-[12px] tracking-[2.5px] drop-shadow-md">
                GÅ TIL BETALING
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
