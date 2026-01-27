"use client";
import { ArrowDown, CreditCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
      } catch (err) {
        console.error("Video play failed:", err);
      }
    };
    handlePlay();

    const handleTimeUpdate = () => {
      const stopTime = video.duration - 10;
      if (video.currentTime >= stopTime - 1 && !isRedOverlayVisible) {
        setIsRedOverlayVisible(true);
      }
      if (video.currentTime >= stopTime) {
        video.currentTime = 10;
        video.play();
        setTimeout(() => setIsRedOverlayVisible(false), 1000);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isRedOverlayVisible]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-visible">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }

        .responsive-title {
          font-size: clamp(2rem, 9.5vw, 8rem);
          white-space: nowrap;
          width: 100%;
          display: block;
          line-height: 1;
        }

        .fixed-bg-video {
          position: fixed; top: 0; left: 0;
          width: 100%; height: 100vh;
          z-index: -1; pointer-events: none;
        }

        @keyframes softFlow {
          0% { transform: translate(-60%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-40%, -50%) scale(1.1); opacity: 0.45; }
          100% { transform: translate(-60%, -50%) scale(1); opacity: 0.3; }
        }

        /* Анімація зовнішнього сяйва */
        @keyframes externalPulse {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(1.1); }
        }

        .glass-btn-base {
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          position: relative;
          /* overflow: visible !important; ПРИБРАНО, щоб бачити сяйво зовні */
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        /* ШАР СЯЙВА ПІД КНОПКОЮ */
        .glow-layer {
          position: absolute;
          top: -15px; left: -15px; right: -15px; bottom: -15px;
          background: white;
          filter: blur(35px);
          border-radius: 9999px;
          z-index: -1;
          opacity: 0.3;
          pointer-events: none;
          animation: externalPulse 4s infinite ease-in-out;
          transition: all 0.4s ease;
        }

        /* Внутрішній градієнт кнопки (обмежений) */
        .glass-btn-base::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 160%; height: 160%;
          background: var(--glow-gradient);
          z-index: 1;
          pointer-events: none;
          animation: softFlow 5s ease-in-out infinite;
          transition: all 0.4s ease;
          border-radius: 50%;
          clip-path: inset(0 round 9999px); /* Обрізає градієнт по формі кнопки */
        }

        .glass-btn-base:hover {
          transform: scale(0.98) translateY(2px);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .glass-btn-base:hover .glow-layer {
          opacity: 0.6;
          filter: blur(45px);
          transform: scale(1.15);
        }

        .glass-btn-base:active {
          transform: scale(0.95) translateY(4px);
          transition: all 0.1s ease;
        }

        .btn-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          text-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }

        .btn-green { 
          --glow-gradient: radial-gradient(circle, #fbbc05 0%, #22c55e 40%, transparent 70%); 
          --border-color: rgba(34, 197, 94, 0.5); 
        }
        
        .btn-orange { 
          --glow-gradient: radial-gradient(circle, #EA4335 0%, #f97316 40%, #FBBC05 70%, transparent 90%); 
          --border-color: rgba(255, 255, 255, 0.25); 
        } 
      `}</style>

      <div className="fixed-bg-video">
        <video
          ref={videoRef}
          autoPlay muted playsInline preload="auto"
          className="w-full h-full object-cover"
          poster="https://res.cloudinary.com/dt4imocd3/video/upload/v1768832308/VUE_20251018125313_eijxvp.jpg"
          style={{ transform: "scale(1.1)", filter: "blur(2px) brightness(0.7)" }}
        >
          <source src="https://res.cloudinary.com/dt4imocd3/video/upload/v1768832308/VUE_20251018125313_eijxvp.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className={`absolute inset-0 z-20 bg-[#FF0000] transition-opacity duration-700 ${isRedOverlayVisible ? "opacity-100" : "opacity-0"}`} />
      </div>

      <div className="relative z-30 text-center px-4 w-full max-w-[95vw] mx-auto text-white">
        <h1 className="font-bebas responsive-title font-bold mb-4 tracking-wider uppercase drop-shadow-2xl">
          KOREOGRAFI FOR ALLE
        </h1>

        <p className="font-bebas text-2xl md:text-4xl mb-6 tracking-wide uppercase opacity-90">
          med GALYNA GERASYMENKO
        </p>

        <p className="text-sm md:text-lg mb-10 text-white/70 max-w-xl mx-auto leading-relaxed">
          Er du ny? Book en <span className="text-[#22c55e] font-bold">gratis prøvetime</span>. <br className="hidden md:block" />
          Eksisterende kunder kan <span className="text-[#f97316] font-bold">betale direkte</span> her.
        </p>

        <div className="flex flex-col md:flex-row-reverse gap-6 justify-center items-center">
          <a
            href="#booking"
            className="glass-btn-base btn-green min-w-[260px] py-4 px-10 rounded-full text-white font-bold text-sm md:text-base no-underline"
          >
            {/* ДОДАНО ШАР СЯЙВА */}
            <div className="glow-layer" />
            <div className="btn-content">
              <span>Gratis prøvetime</span>
              <ArrowDown className="w-5 h-5 animate-bounce text-[#22c55e]" />
            </div>
          </a>

          <a
            href="#pricing"
            className="glass-btn-base btn-orange min-w-[260px] py-4 px-10 rounded-full text-white font-bold text-sm md:text-base no-underline"
          >
            {/* ДОДАНО ШАР СЯЙВА */}
            <div className="glow-layer" />
            <div className="btn-content">
              <CreditCard className="w-5 h-5 text-[#f97316]" />
              <span>Betal trening</span>
            </div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 animate-bounce">
        <ArrowDown className="w-8 h-8 text-white/40" />
      </div>
    </section>
  );
}