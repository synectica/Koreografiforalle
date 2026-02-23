"use client";
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';

export function MapSection() {
  const displayAddress = "Thormøhlens Gate 27, 5006 Bergen";
  // Коректне посилання для Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`;

  const handleOpenMap = () => {
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">
      
      <style>{`
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

        /* Стиль кнопки в стилі "скло" */
        .glass-button {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .glass-button:active {
          transform: translateY(0);
          scale: 0.98;
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

        {/* КАРТКА З МАПОЮ */}
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

        {/* КНОПКА ЗАМІСТЬ СЛАЙДЕРА */}
        <div className="w-full max-w-sm">
          <button 
            onClick={handleOpenMap}
            className="glass-button w-full h-16 rounded-full flex items-center justify-center gap-4 text-white group"
          >
            <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-black uppercase text-[11px] tracking-[2px]">
              Åpne i Google Maps
            </span>
            <ExternalLink className="w-4 h-4 opacity-50 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
}