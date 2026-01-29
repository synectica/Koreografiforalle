"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

let activeSliderId: string | null = null;

export function MapSection() {
  const displayAddress = "Thormøhlens Gate 27, 5006 Bergen";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`;

  return (
    <section id="location" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">
      
      <style>{`
        /* М'ЯКА БІЛА ПУЛЬСАЦІЯ */
        @keyframes ultraPulseWhite {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.4; filter: blur(35px); }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.7; filter: blur(20px); }
          100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.4; filter: blur(35px); }
        }

        .slider-wrapper {
          position: relative; width: 100%; height: 64px;
          background: rgba(255, 255, 255, 0.1); border-radius: 9999px;
          overflow: hidden; padding: 4px; border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          user-select: none; -webkit-user-select: none;
        }

        .slider-text-base {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }

        .glass-fill {
          position: absolute; left: 4px; top: 4px; bottom: 4px;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px);
          border-radius: 9999px; z-index: 5;
          pointer-events: none;
        }

        .slider-text-active {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }

        .thumb-element {
          position: absolute; width: 56px; height: 56px; border-radius: 9999px;
          background: white; z-index: 40; display: flex; align-items: center;
          justify-content: center; cursor: grab; box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          touch-action: none;
        }

        /* ЕФЕКТ ПУЛЬСАЦІЇ ДЛЯ ТАМБА */
        .thumb-element::before {
          content: ''; position: absolute; top: 50%; left: 50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
          z-index: -1; animation: ultraPulseWhite 4s ease-in-out infinite;
        }

        .map-iframe-container {
          position: relative; width: 100%; overflow: hidden;
          background: #1a1a1a; -webkit-mask-image: -webkit-radial-gradient(white, black);
          border-radius: 28px;
        }

        .map-iframe-wrapper {
          position: absolute; width: 160%; height: 200%;
          top: -50%; left: -30%; pointer-events: none;
        }

        .map-iframe-wrapper iframe {
          width: 100%; height: 100%; border: 0;
          filter: grayscale(0.5) contrast(1.1) brightness(0.9);
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            Finn oss
          </h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            Studiolokasjon
          </p>
        </div>

        <div className="w-full p-3 md:p-6 bg-white/10 backdrop-blur-2xl rounded-[40px] md:rounded-[50px] border border-white/20 shadow-2xl relative mb-12">
          
          <div className="map-iframe-container h-[40vh] md:h-[50vh]">
            <div className="map-iframe-wrapper">
              <iframe
                title="Bergen Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center px-4 pb-4">
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Thormøhlens Gate 27
            </p>
            <p className="text-white/50 text-base md:text-lg mt-1 font-medium">
              5006 Bergen, Norge
            </p>
          </div>
        </div>

        {/* СЛАЙДЕР ЗАМІСТЬ КНОПКИ */}
        <div className="w-full max-w-sm">
          <MapSlider 
            id="map-open-slider"
            beforeLabel="Åpne i Google Maps"
            afterLabel="Åpner kart..."
            onComplete={() => {
              window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
            }}
          />
        </div>
      </div>
    </section>
  );
}

function MapSlider({ id, beforeLabel, afterLabel, onComplete }: { id: string, beforeLabel: string, afterLabel: string, onComplete: () => void }) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(0);

  const handleStart = () => {
    if (activeSliderId !== null) return;
    activeSliderId = id;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || activeSliderId !== id || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const x = clientX - rect.left - 32;
      const maxPath = rect.width - 64;
      
      const newPos = Math.max(0, Math.min(x, maxPath));
      positionRef.current = newPos;
      setPosition(newPos);
    };

    const handleEnd = () => {
      if (!isDragging || activeSliderId !== id) return;
      setIsDragging(false);
      activeSliderId = null;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const maxPath = rect.width - 64;

      if (positionRef.current >= maxPath * 0.9) {
        setPosition(maxPath);
        onComplete();
        // Скидаємо через невелику паузу, щоб юзер побачив успіх
        setTimeout(() => {
          setPosition(0);
          positionRef.current = 0;
        }, 1500);
      } else {
        setPosition(0);
        positionRef.current = 0;
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, id, onComplete]);

  const textStyle = { fontWeight: 800, textTransform: 'uppercase' as const, fontSize: '11px', letterSpacing: '1px' };

  return (
    <div ref={containerRef} className="slider-wrapper">
      <div className="slider-text-base">
        <span style={{ ...textStyle, color: 'white' }}>{beforeLabel}</span>
      </div>
      
      <div 
        className="glass-fill" 
        style={{ 
          width: position > 0 ? `${position + 56}px` : 0, 
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          opacity: position > 0 ? 1 : 0
        }} 
      />

      <div className="slider-text-active">
        <span style={{ ...textStyle, color: 'black', opacity: position > 120 ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          {afterLabel}
        </span>
      </div>
      
      <div 
        className="thumb-element" 
        onMouseDown={handleStart} 
        onTouchStart={handleStart}
        style={{ 
          left: position + 4, 
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          color: 'black' 
        }}
      >
        <MapPin className="w-5 h-5" />
      </div>
    </div>
  );
}