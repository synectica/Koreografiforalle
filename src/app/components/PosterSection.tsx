"use client";
import React from 'react';
import { Download } from 'lucide-react';

export function PosterSection() {
  const pdfUrl = "https://cdn.jsdelivr.net/gh/synectica/assets/plakat%20A3%20KOREOGRAFI%20FOR%20ALLE.pdf";
  const previewImg = "https://cdn.jsdelivr.net/gh/synectica/assets/WhatsApp%20Image%202026-02-21%20at%2012.43.59.jpeg";

  return (
    <section id="poster" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">
      
      <style>{`
        /* Компактна LED кнопка (розмір як у MapSection) */
        .poster-spiral-button {
          position: relative;
          background: #000;
          border: none;
          border-radius: 9999px;
          overflow: hidden;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .poster-spiral-button::before {
          content: "";
          position: absolute;
          inset: -200%; 
          z-index: -1;
          background: conic-gradient(
            from 0deg,
            #0047AB, #FF69B4, #00BFFF, #FF0000, #008000, #0047AB
          );
          filter: blur(40px); 
          animation: led-rotate 10s linear infinite;
        }

        @keyframes led-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .poster-spiral-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
        }

        .poster-spiral-button:active {
          scale: 0.98;
        }

        .poster-card-frame {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        {/* ЗАГОЛОВОК (Точний розмір як у Finn Oss) */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg uppercase italic">
            DU ER IDÉEN
          </h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            Bli en ambassadør for danseglede.
          </p>
        </div>

        {/* КАРТКА ПЛАКАТА */}
        <div className="poster-card-frame w-full p-4 md:p-8 rounded-[40px] md:rounded-[50px] shadow-2xl relative mb-12 flex flex-col items-center">
          
          <div className="w-full max-w-[340px] aspect-[1/1.414] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src={previewImg} 
              alt="KFA Poster" 
              className="w-full h-full object-cover opacity-95"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center px-4">
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase italic font-bebas">
              KOREOGRAFI FOR ALLE
            </p>
            
            {/* ПУНКТИ 1 2 3 В РЯДОК (БІЛІ) */}
            <div className="flex flex-row items-center justify-center gap-4 md:gap-8 mt-4">
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">1. PRINT UT</span>
              <span className="text-white/30">•</span>
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">2. HENG OPP</span>
              <span className="text-white/30">•</span>
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">3. SPRE GLEDE</span>
            </div>
          </div>
        </div>

        {/* КНОПКА (Розмір h-16 як у Мапи) */}
        <div className="w-full max-w-sm">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="KFA_Poster_A3.pdf"
            className="poster-spiral-button w-full h-16 rounded-full text-white group no-underline"
          >
            <div className="relative z-10 flex items-center justify-center">
              <Download className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
              <span className="font-black uppercase text-[11px] tracking-[2px]">
                LAST NED PLAKAT
              </span>
            </div>
          </a>
          <p className="text-center mt-6 text-[9px] text-white/20 uppercase tracking-[4px] font-bold">
            Format: A3 PDF
          </p>
        </div>
      </div>
    </section>
  );
}