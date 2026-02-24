"use client";
import React, { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRedOverlayVisible, setIsRedOverlayVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 500;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 3;
    const handleTimeUpdate = () => {
      if (video.currentTime >= video.duration - 1 && !isRedOverlayVisible) {
        setIsRedOverlayVisible(true);
      }
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 3;
        video.play();
        setTimeout(() => setIsRedOverlayVisible(false), 3000);
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    const startPlay = async () => {
      try {
        await video.play();
        setTimeout(() => setIsRedOverlayVisible(false), 500);
      } catch (e) { console.log("Autoplay blocked"); }
    };
    startPlay();
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isRedOverlayVisible]);

  /** * МАСШТАБУВАННЯ: 
   * Було 0.5 (зменшення до 50%).
   * Стало 0.6 (зменшення до 40% - текст буде ще меншим у фіналі).
   */
  const textScale = 1 - (scrollProgress * 0.6);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; pointer-events: none; }
        
        .sticky-title-container {
          position: fixed; left: 0; width: 100%; z-index: 40; pointer-events: none;
          display: flex; flex-direction: column; align-items: center;
          transition: top 0.1s linear, transform 0.1s linear; will-change: top, transform;
        }

        .hero-title { font-size: 10.8vw !important; line-height: 0.8; display: block; width: 100%; font-style: italic !important; text-align: center; }
        .hero-subtitle { font-size: 3.3vw !important; letter-spacing: 0.49em !important; display: block; width: 100%; margin-right: -0.49em; text-align: center; }
        
        @media (min-width: 1024px) {
          .hero-title { font-size: 5.4vw !important; }
          .hero-subtitle { font-size: 1.65vw !important; }
        }

        .hero-spiral-button {
          position: relative; background: #000; border: none; border-radius: 9999px;
          overflow: hidden; transition: all 0.4s ease; display: flex;
          align-items: center; justify-content: center; z-index: 1; cursor: pointer;
          text-decoration: none;
        }

        .hero-spiral-button::before {
          content: ""; position: absolute; inset: -200%; z-index: -1;
          background: var(--btn-gradient); filter: blur(40px);
          animation: led-rotate 10s linear infinite;
        }

        @keyframes led-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .hero-spiral-button:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1); }
        .hero-spiral-button:active { scale: 0.98; }
        .red-transition { transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>

      <div className="fixed-bg-video">
        <video ref={videoRef} muted autoPlay playsInline className="w-full h-full object-cover" style={{ filter: "brightness(0.45)", transform: "scale(1.45)" }}>
          <source src="https://cdn.jsdelivr.net/gh/synectica/assets/KFA.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 z-[3] bg-red-600 red-transition pointer-events-none ${isRedOverlayVisible ? 'opacity-100' : 'opacity-0'}`} />
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      <div className="relative z-[10] flex-[0.8] flex flex-col justify-center items-center px-4">
        <p className="font-bebas text-lg md:text-2xl tracking-[0.2em] opacity-60 uppercase text-center">
          Velkommen til et signaturkurs i koreografi <br className="hidden md:block"/> for nybegynnere og profesjonelle
        </p>
      </div>

      <div className="sticky-title-container" style={{ 
        top: `calc(35% - ${scrollProgress * 35}% + ${scrollProgress * 20}px)`, 
        transform: `scale(${textScale})`, 
        transformOrigin: "top center" 
      }}>
        <div className="w-full max-w-6xl px-4">
          <h1 className="hero-title font-bebas font-bold uppercase text-white italic">KOREOGRAFI FOR ALLE</h1>
          <p className="hero-subtitle font-bebas opacity-90 uppercase mt-3">med GALYNA GERASYMENKO</p>
        </div>
      </div>

      <div className="relative z-[10] text-center w-full flex flex-col items-center px-4 mb-4 opacity-0 pointer-events-none">
        <div className="w-full max-w-6xl">
          <h1 className="hero-title font-bebas font-bold uppercase text-white">KOREOGRAFI FOR ALLE</h1>
        </div>
      </div>

      <div className="relative z-[10] flex-1 flex flex-col items-center px-4 justify-end pb-12">
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="text-center text-sm md:text-lg text-white/80 leading-relaxed font-normal">
            <p>Er du ny? <span className="text-[#22c55e] font-semibold">Book prøvetime</span></p>
            <p>Eksisterende kunde? <span className="text-[#f97316] font-semibold">Betal direkte</span></p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-2xl">
            <button 
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: "smooth" })}
              style={{ '--btn-gradient': 'conic-gradient(from 0deg, #0047AB, #00BFFF, #008000, #0047AB)' } as any}
            >
              <span className="font-black uppercase text-[11px] tracking-[2px]">BESTILL PRØVETIME</span>
            </button>

            <button 
              className="hero-spiral-button w-full h-16 text-white"
              onClick={() => document.querySelector('#pricing')?.scrollIntoView({ behavior: "smooth" })}
              style={{ '--btn-gradient': 'conic-gradient(from 0deg, #FF0000, #FF69B4, #f97316, #FF0000)' } as any}
            >
              <span className="font-black uppercase text-[11px] tracking-[2px]">GÅ TIL BETALING</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}