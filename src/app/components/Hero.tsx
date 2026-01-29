"use client";
import React, { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRedOverlayVisible, setIsRedOverlayVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.currentTime = 10;
    const handlePlay = async () => {
      try { 
        await video.play(); 
        setTimeout(() => setIsRedOverlayVisible(false), 1000); 
      } catch (err) { console.error(err); }
    };
    handlePlay();
    const handleTimeUpdate = () => {
      const stopTime = video.duration - 10;
      if (video.currentTime >= stopTime - 1 && !isRedOverlayVisible) setIsRedOverlayVisible(true);
      if (video.currentTime >= stopTime) {
        video.currentTime = 10; video.play();
        setTimeout(() => setIsRedOverlayVisible(false), 1000);
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isRedOverlayVisible]);

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; pointer-events: none; }

        @media (max-height: 500px) and (orientation: landscape) {
          .hero-title { font-size: 3.2rem !important; }
          .hero-subtitle { font-size: 1rem !important; margin-top: -2px; letter-spacing: 0.3em !important; }
          .hero-top-text, .hero-description { display: none; }
          .slider-group { flex-direction: row !important; gap: 15px !important; margin-top: 10px; }
        }
      `}</style>

      <div className="fixed-bg-video">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover" 
          style={{ filter: "brightness(0.35)" }}
        >
          <source src="https://res.cloudinary.com/dt4imocd3/video/upload/v1768832308/VUE_20251018125313_eijxvp.mp4" type="video/mp4" />
        </video>
        {/* ЧЕРВОНИЙ ОВЕРЛЕЙ, ЯКИЙ ТИ ХОТІВ */}
        <div 
          className={`absolute inset-0 z-[3] bg-red-600 transition-opacity duration-1000 pointer-events-none ${isRedOverlayVisible ? 'opacity-40' : 'opacity-0'}`} 
        />
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* ВЕРХНЯ ЧАСТИНА: Velkommen */}
      <div className="relative z-[10] flex-1 flex flex-col justify-center items-center px-4">
        <p className="font-bebas text-lg md:text-2xl tracking-[0.2em] opacity-60 uppercase text-center">
          Velkommen til et signaturkurs i koreografi <br className="hidden md:block"/> for nybegynnere og profesjonelle
        </p>
      </div>

      {/* ЦЕНТРАЛЬНА ЧАСТИНА: Заголовок */}
      <div className="relative z-[10] text-center w-full flex flex-col items-center px-4">
        <div className="w-full max-w-6xl text-center">
          <h1 className="hero-title font-bebas text-[13vw] md:text-[9.5rem] font-bold tracking-tighter uppercase leading-[0.8] text-white italic inline-block w-full">
            KOREOGRAFI FOR ALLE
          </h1>
          <p className="hero-subtitle font-bebas text-[3.5vw] md:text-4xl tracking-[0.55em] opacity-90 uppercase w-full text-center mt-3">
            med GALYNA GERASYMENKO
          </p>
        </div>
      </div>

      {/* НИЖНЯ ЧАСТИНА: Опущена нижче */}
      <div className="relative z-[10] flex-1 flex flex-col items-center pt-24 pb-12 px-4 justify-start">
        <p className="hero-description text-sm md:text-lg mb-10 text-white/80 max-w-xl mx-auto text-center leading-relaxed">
          Er du ny? Book en <span className="text-[#22c55e] font-semibold">prøvetime</span>. <br className="hidden md:block" />
          Eksisterende kunder kan <span className="text-[#f97316] font-semibold">betale direkte</span>.
        </p>

        <div className="slider-group flex flex-col md:flex-row gap-6 justify-center items-center w-full">
          <TouchSlider 
            beforeText="Skyv for prøvetime"
            afterText="Gå til booking"
            target="#booking" 
            activeColor="#22c55e"
          />
          <TouchSlider 
            beforeText="Skyv for betaling"
            afterText="Gå til priser"
            target="#pricing" 
            activeColor="#f97316"
          />
        </div>
      </div>
    </section>
  );
}

function TouchSlider({ beforeText, afterText, target, activeColor }: any) {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  const handleStart = () => setIsDragging(true);

  const handleMove = (e: any) => {
    if (!isDragging || !containerRef.current) return;
    if (e.cancelable) e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const rect = containerRef.current.getBoundingClientRect();
    const thumbWidth = containerRef.current.offsetHeight - 8;
    const x = clientX - rect.left - (thumbWidth / 2);
    const max = rect.width - thumbWidth - 8;
    const newPos = Math.max(0, Math.min(x, max));
    posRef.current = newPos;
    setPosition(newPos);
  };

  const handleEnd = () => {
    if (!isDragging || !containerRef.current) return;
    setIsDragging(false);
    const rect = containerRef.current.getBoundingClientRect();
    const thumbWidth = containerRef.current.offsetHeight - 8;
    const max = rect.width - thumbWidth - 8;
    if (posRef.current >= max * 0.9) {
      setPosition(max);
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { setPosition(0); posRef.current = 0; }, 1000);
    } else {
      setPosition(0); posRef.current = 0;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="slider-container-main relative w-full max-w-[340px] h-[60px] md:h-[64px] bg-white/10 rounded-full p-1 border border-white/20 shadow-inner overflow-hidden select-none touch-none"
      onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchMove={handleMove} onTouchEnd={handleEnd}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 font-bold text-[11px] uppercase tracking-widest text-center">
        <span style={{ color: activeColor, opacity: position > 120 ? 0 : 1, transition: '0.2s' }}>{beforeText}</span>
        <span style={{ color: activeColor, opacity: position > 120 ? 1 : 0, transition: '0.2s', position: 'absolute' }}>{afterText}</span>
      </div>
      <div 
        className="absolute left-1 top-1 bottom-1 bg-white/90 rounded-full shadow-xl z-20"
        style={{ width: position + (containerRef.current?.offsetHeight || 60) - 8, transition: isDragging ? 'none' : '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} 
      />
      <div 
        className="absolute aspect-square h-full max-h-[52px] md:max-h-[56px] bg-white rounded-full shadow-lg z-40 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart} onTouchStart={handleStart}
        style={{ left: position + 4, transition: isDragging ? 'none' : '0.4s ease', color: activeColor }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
    </div>
  );
}