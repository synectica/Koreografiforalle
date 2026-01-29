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
    <section className="relative h-screen w-full flex flex-col items-center justify-between py-12 md:py-20 overflow-hidden bg-black text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        
        .fixed-bg-video { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: 1; pointer-events: none; }

        .slider-container {
          position: relative; width: 340px; height: 64px;
          background: rgba(255, 255, 255, 0.1); border-radius: 9999px;
          display: flex; align-items: center; overflow: hidden; padding: 4px;
          box-shadow: inset 2px 2px 10px rgba(0,0,0,0.3); border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .slider-label-layer {
          position: absolute; width: 100%; z-index: 10; pointer-events: none;
          display: flex; justify-content: center; align-items: center; height: 100%;
          font-weight: 800; text-transform: uppercase; font-size: 11px; letter-spacing: 1.2px;
        }

        .glass-pill {
          position: absolute; left: 4px; top: 4px; bottom: 4px;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); border-radius: 9999px;
          z-index: 5; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .interactive-slider {
          -webkit-appearance: none; width: 100%; height: 100%; background: transparent;
          cursor: pointer; position: relative; z-index: 30; margin: 0;
        }

        .interactive-slider::-webkit-slider-thumb { -webkit-appearance: none; height: 56px; width: 56px; border-radius: 50%; background: transparent; }

        .thumb-icon {
          position: absolute; width: 56px; height: 56px; border-radius: 50%;
          background: white; z-index: 40; display: flex; align-items: center;
          justify-content: center; pointer-events: none; box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .icon-green { color: #22c55e; }
        .icon-orange { color: #f97316; }
      `}</style>

      <div className="fixed-bg-video">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" style={{ filter: "brightness(0.4)" }}>
          <source src="https://res.cloudinary.com/dt4imocd3/video/upload/v1768832308/VUE_20251018125313_eijxvp.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 z-[2]" />
      </div>

      {/* ВЕРХНЯ ЧАСТИНА: ВІТАЛЬНИЙ ТЕКСТ ВІДІРВАНИЙ ВГОРУ */}
      <div className="relative z-[10] w-full px-4 text-center mt-4 md:mt-10">
        <p className="font-bebas text-lg md:text-2xl tracking-[0.3em] opacity-70 uppercase max-w-4xl mx-auto leading-tight">
          Velkommen til et signaturkurs i koreografi <br className="hidden md:block"/> for nybegynnere og profesjonelle
        </p>
      </div>

      {/* ЦЕНТРАЛЬНА ЧАСТИНА */}
      <div className="relative z-[10] text-center px-4 w-full flex flex-col items-center">
        <div className="mb-12 md:mb-24"> {/* ЗБІЛЬШЕНИЙ ВІДСТУП ВІД ВЕРХУ */}
          <h1 className="font-bebas text-6xl md:text-9xl font-bold mb-2 tracking-wider drop-shadow-2xl uppercase leading-none">
            KOREOGRAFI FOR ALLE
          </h1>
          <p className="font-bebas text-xl md:text-4xl tracking-[0.4em] opacity-90 uppercase">
            med GALYNA GERASYMENKO
          </p>
        </div>

        <p className="text-sm md:text-lg mb-10 text-white/80 max-w-xl mx-auto leading-relaxed">
          Er du ny? Book en <span className="text-[#22c55e] font-bold">prøvetime</span>. <br className="hidden md:block" />
          Eksisterende kunder kan <span className="text-[#f97316] font-bold">betale direkte</span> her.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <LiquidSliderAction 
            beforeText="Skyv for prøvetime"
            afterText="Gå til booking"
            target="#booking" 
            activeColor="#22c55e"
            iconClass="icon-green"
          />
          <LiquidSliderAction 
            beforeText="Skyv for betaling"
            afterText="Gå til priser"
            target="#pricing" 
            activeColor="#f97316"
            iconClass="icon-orange"
          />
        </div>
      </div>
      
      {/* ПУСТИЙ DIV ДЛЯ БАЛАНСУ FLEX (BOTTOM) */}
      <div className="h-10 md:h-20" />
    </section>
  );
}

function LiquidSliderAction({ beforeText, afterText, target, activeColor, iconClass }: { beforeText: string; afterText: string; target: string; activeColor: string; iconClass: string }) {
  const [val, setVal] = useState(0);
  
  const handleRelease = () => {
    if (val > 92) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setVal(0), 1000);
    } else { setVal(0); }
  };

  const glassWidth = `calc(56px + (${val} * (340px - 64px) / 100))`;

  return (
    <div className="slider-container">
      <div className="slider-label-layer">
         <span style={{ color: activeColor, opacity: val > 15 ? 0 : 1, transition: '0.3s' }}>{beforeText}</span>
         <span style={{ color: activeColor, opacity: val > 40 ? 1 : 0, transition: '0.3s', position: 'absolute' }}>{afterText}</span>
      </div>
      
      <div 
        className="glass-pill" 
        style={{ 
          width: glassWidth,
          transition: val === 0 ? '0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
        }} 
      />

      <div 
        className={`thumb-icon ${iconClass}`}
        style={{ 
          left: `calc(4px + (${val} * (340px - 64px) / 100))`,
          transition: val === 0 ? '0.5s ease' : 'none'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      <input 
        type="range" min="0" max="100" value={val} 
        onChange={(e) => setVal(parseInt(e.target.value))}
        onMouseUp={handleRelease} onTouchEnd={handleRelease}
        className="interactive-slider"
      />
    </div>
  );
}