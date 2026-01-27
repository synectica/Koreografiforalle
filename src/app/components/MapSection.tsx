"use client";
import React from 'react';
import { ExternalLink } from 'lucide-react';

export function MapSection() {
  const displayAddress = "Thormøhlens Gate 27, 5006 Bergen";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(displayAddress)}`;

  return (
    <section id="location" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">
      
      <style>{`
        /* М'ЯКА БІЛА ПУЛЬСАЦІЯ ДЛЯ МАТОВОГО СКЛА */
        @keyframes ultraPulseWhite {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.4; filter: blur(35px); }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.7; filter: blur(20px); }
          100% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.4; filter: blur(35px); }
        }

        .map-glass-btn-base {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3); /* Яскравіший кант скла */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.25); /* БІЛЬШ МАТОВИЙ І БІЛИЙ ФОН */
          color: white;
          text-decoration: none;
        }

        .map-glass-btn-base::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 250%; height: 250%;
          /* ПУЛЬСАЦІЯ ТІЛЬКИ БІЛИМ */
          background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 80%);
          z-index: 1;
          pointer-events: none;
          animation: ultraPulseWhite 4s ease-in-out infinite;
          transition: all 0.4s ease;
        }

        .map-glass-btn-base:hover {
          transform: scale(0.98) translateY(2px);
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.5);
          filter: brightness(1.1);
        }

        .map-glass-btn-base:active {
          transform: scale(0.95) translateY(4px);
          box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }

        .btn-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          font-weight: 800;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .map-iframe-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #1a1a1a;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          border-radius: 28px;
        }

        @media (min-width: 768px) {
          .map-iframe-container {
            border-radius: 35px;
          }
        }

        .map-iframe-wrapper {
          position: absolute;
          width: 160%;
          height: 200%;
          top: -50%;
          left: -30%;
          pointer-events: none;
        }

        .map-iframe-wrapper iframe {
          width: 100%;
          height: 100%;
          border: 0;
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

          <div className="mt-8 flex flex-col items-center justify-center text-center px-4">
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Thormøhlens Gate 27
            </p>
            <p className="text-white/50 text-base md:text-lg mt-1 font-medium">
              5006 Bergen, Norge
            </p>
          </div>
        </div>

        <div className="text-center">
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="map-glass-btn-base py-4 px-12 rounded-full group"
          >
            <span className="btn-content">
              Åpne i Google Maps
              <ExternalLink className="w-5 h-5 ml-3 text-white transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}