"use client";
import React, { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRedOverlayVisible, setIsRedOverlayVisible] = useState(true);
  
  // Стейт для анімації тексту при скролі
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Обчислюємо прогрес скролу від 0 до 1 (на дистанції 500px)
      const maxScroll = 500;
      const currentScroll = window.scrollY;
      const progress = Math.min(currentScroll / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ПОЧАТОК З 3-Ї СЕКУНДИ
    video.currentTime = 3;

    const handleTimeUpdate = () => {
      // ПОЯВА ЧЕРВОНОГО НА ОСТАННІЙ СЕКУНДІ
      if (video.currentTime >= video.duration - 1 && !isRedOverlayVisible) {
        setIsRedOverlayVisible(true);
      }
      
      // ЗАЦИКЛЕННЯ
      if (video.currentTime >= video.duration - 0.1) {
        video.currentTime = 3; // ПОВЕРНЕННЯ НА 3-Ю СЕКУНДУ
        video.play();
        // ТРИМАЄМО ЧЕРВОНИЙ ЩІЛЬНИЙ КОЛІР 3 СЕКУНДИ
        setTimeout(() => setIsRedOverlayVisible(false), 3000);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    
    const startPlay = async () => {
        try {
            await video.play();
            setTimeout(() => setIsRedOverlayVisible(false), 500);
        } catch (e) {
            console.log("Autoplay blocked, waiting for interaction");
        }
    };
    startPlay();

    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isRedOverlayVisible]);

  // Обчислення стилів для тексту
  // 1. Scale: від 1 до 0.5
  const textScale = 1 - (scrollProgress * 0.5);
  // 2. Top position: від 35% (центр екрану) до 20px (шапка)
  // Використовуємо calc() у стилях, але тут логіка для opacity або додаткових зсувів
  const textOpacity = 1; 

  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100dvh; z-index: 1; pointer-events: none; }
        
        /* Стилі для плаваючого заголовка */
        .sticky-title-container {
          position: fixed;
          left: 0;
          width: 100%;
          z-index: 40; /* Високий z-index, щоб бути поверх контенту, але під меню/прапором */
          pointer-events: none; /* Щоб крізь текст можна було клікати */
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: top 0.1s linear, transform 0.1s linear;
          will-change: top, transform;
        }

        .hero-title { 
          font-size: 10.8vw !important; 
          line-height: 0.8;
          display: block;
          width: 100%;
          font-style: italic !important; /* КУРСИВ */
          text-align: center;
        }
        .hero-subtitle { 
          font-size: 3.3vw !important; 
          letter-spacing: 0.49em !important; 
          display: block;
          width: 100%;
          margin-right: -0.49em;
          text-align: center;
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 8.5rem !important; }
          .hero-subtitle { font-size: 2.6rem !important; }
        }
        .red-transition {
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes sliderHint {
          0%, 100% { transform: translateX(0); }
          10%, 30% { transform: translateX(15px); }
          20% { transform: translateX(5px); }
        }
        .slider-hint-anim {
          animation: sliderHint 4s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.5); }
        }
        .slider-glow {
          animation: pulseGlow 2s infinite ease-in-out;
        }
      `}</style>

      <div className="fixed-bg-video">
        <video 
            ref={videoRef} 
            muted 
            autoPlay 
            playsInline 
            loop={false} 
            className="w-full h-full object-cover" 
            style={{ filter: "brightness(0.35)", transform: "scale(1.45)" }} /* ЗБІЛЬШЕННЯ МАСШТАБУ */
        >
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

      {/* ПЛАВАЮЧИЙ ЗАГОЛОВОК */}
      <div 
        className="sticky-title-container"
        style={{
            // Інтерполяція позиції: від 35% зверху до 20px зверху
            top: `calc(35% - ${scrollProgress * 35}% + ${scrollProgress * 20}px)`,
            // Інтерполяція масштабу: від 1 до 0.5
            transform: `scale(${textScale})`,
            // Компенсація розмиття тексту при scale
            transformOrigin: "top center" 
        }}
      >
        <div className="w-full max-w-6xl px-4">
          <h1 className="hero-title font-bebas font-bold uppercase text-white italic">KOREOGRAFI FOR ALLE</h1>
          <p className="hero-subtitle font-bebas opacity-90 uppercase mt-3">med GALYNA GERASYMENKO</p>
        </div>
      </div>

      {/* Пустий блок, щоб зберегти місце в потоці Hero, де раніше був текст (щоб кнопки не стрибали) */}
      <div className="relative z-[10] text-center w-full flex flex-col items-center px-4 mb-4 opacity-0 pointer-events-none select-none">
         <div className="w-full max-w-6xl">
          <h1 className="hero-title font-bebas font-bold uppercase text-white">KOREOGRAFI FOR ALLE</h1>
          <p className="hero-subtitle font-bebas opacity-90 uppercase mt-3">med GALYNA GERASYMENKO</p>
        </div>
      </div>

      <div className="relative z-[10] flex-1 flex flex-col items-center px-4 justify-end pb-12">
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="text-center text-sm md:text-lg text-white/80 leading-relaxed font-normal">
            <p>Er du ny?</p>
            <p>Book en <span className="text-[#22c55e] font-semibold">prøvetime</span></p>
            <p>Eksisterende kunder kan <span className="text-[#f97316] font-semibold">betale direkte</span></p>
          </div>

          <div className="slider-group flex flex-col md:flex-row gap-6 justify-center items-center w-full">
            <TouchSlider beforeText="Skyv for prøvetime" afterText="Gå til booking" target="#booking" activeColor="#22c55e" delay={0} />
            <TouchSlider beforeText="Skyv for betaling" afterText="Gå til priser" target="#pricing" activeColor="#f97316" delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
}

function TouchSlider({ beforeText, afterText, target, activeColor, delay }: any) {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);

  const handleStart = () => {
    setIsDragging(true);
    setHasInteracted(true);
  };

  const handleMove = (e: any) => {
    if (!isDragging || !containerRef.current) return;
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

    if (posRef.current >= max * 0.95) {
      setPosition(max);
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => { setPosition(0); posRef.current = 0; }, 1000);
    } else {
      setPosition(0);
      posRef.current = 0;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="slider-container-main slider-glow relative w-full max-w-[320px] h-[58px] bg-white/10 rounded-full p-1 border border-white/20 overflow-hidden select-none transition-shadow"
      onMouseMove={handleMove} onMouseUp={handleEnd} onMouseLeave={handleEnd} onTouchMove={handleMove} onTouchEnd={handleEnd}
      style={{ touchAction: 'none' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 font-bold text-[10px] uppercase tracking-widest text-center">
        <span style={{ color: activeColor, opacity: position > 120 ? 0 : 1, transition: '0.2s' }}>{beforeText}</span>
        <span style={{ color: activeColor, opacity: position > 120 ? 1 : 0, transition: '0.2s', position: 'absolute' }}>{afterText}</span>
      </div>
      
      <div 
        className="absolute left-1 top-1 bottom-1 bg-white/90 rounded-full z-20"
        style={{ 
          width: position + (containerRef.current?.offsetHeight || 60) - 8, 
          transition: isDragging ? 'none' : '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
        }} 
      />

      <div 
        className={`absolute aspect-square h-full max-h-[50px] bg-white rounded-full z-40 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg 
          ${!hasInteracted ? 'slider-hint-anim' : ''}`}
        onMouseDown={handleStart} onTouchStart={handleStart}
        style={{ 
          left: position + 4, 
          transition: isDragging ? 'none' : '0.4s ease', 
          color: activeColor,
          animationDelay: `${delay}s` 
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
}