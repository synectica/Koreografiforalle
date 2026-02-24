"use client";
import React from 'react';
import { Download } from 'lucide-react';

export function PosterSection() {
  const pdfUrl = "https://cdn.jsdelivr.net/gh/synectica/assets/plakat%20A3%20KOREOGRAFI%20FOR%20ALLE.pdf";
  const previewImg = "https://cdn.jsdelivr.net/gh/synectica/assets/WhatsApp%20Image%202026-02-21%20at%2012.43.59.jpeg";

  return (
    <section id="poster" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">
      
      <style>{`
        /* ОБ'ЄДНАННЯ LED ТА CANDY ЕФЕКТІВ */
        .btn-candy-spiral {
          position: relative;
          width: 100%;
          height: 64px;
          background: #000; /* Базовий фон */
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: white;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 11px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
          /* Глибока внутрішня тінь для цукеркового об'єму поверх кольорів */
          box-shadow: 
            inset 0 -6px 10px rgba(0, 0, 0, 0.4),
            inset 0 4px 8px rgba(255, 255, 255, 0.2),
            0 10px 25px rgba(0, 0, 0, 0.3);
          text-decoration: none;
        }

        /* 1. КОЛЬОРОВЕ ПЕРЕЛИВАННЯ (НИЖНІЙ ШАР) */
        .btn-candy-spiral::before {
          content: "";
          position: absolute;
          inset: -200%;
          z-index: -1;
          background: conic-gradient(
            from 0deg,
            #0047AB, #FF69B4, #00BFFF, #FF0000, #008000, #0047AB
          );
          filter: blur(30px);
          animation: led-rotate 8s linear infinite;
        }

        /* 2. ГЛЯНЦЕВИЙ ВІДБЛИСК (ВЕРХНІЙ ШАР ЯК НА ЛЬОДЯНИКУ) */
        .btn-candy-spiral::after {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px;
          pointer-events: none;
          z-index: 2;
        }

        @keyframes led-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .btn-candy-spiral:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 
            inset 0 -6px 10px rgba(0, 0, 0, 0.3),
            inset 0 4px 8px rgba(255, 255, 255, 0.4),
            0 15px 30px rgba(255, 255, 255, 0.1);
        }

        .btn-candy-spiral:active {
          transform: translateY(1px) scale(0.97);
          box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.8);
        }

        .poster-card-frame {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .icon-glow {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        {/* ЗАГОЛОВОК */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg uppercase italic font-bebas">
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
              alt="KFA Poster Preview" 
              className="w-full h-full object-cover opacity-95"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center text-center px-4">
            <p className="text-lg md:text-xl font-bold text-white tracking-tight uppercase italic font-bebas max-w-lg leading-tight">
              Plakat for de som setter pris på en sunn og estetisk livsstil
            </p>
            
            <div className="flex flex-row items-center justify-center gap-4 md:gap-8 mt-6">
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">1. LAST NED</span>
              <span className="text-white/20">•</span>
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">2. HENG OPP</span>
              <span className="text-white/20">•</span>
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">3. SPRE GLEDE</span>
            </div>
          </div>
        </div>

        {/* КОЛЬОРОВА ЦУКЕРКОВА КНОПКА */}
        <div className="w-full max-w-sm">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="KFA_Poster_A3.pdf"
            className="btn-candy-spiral group"
          >
            <Download className="w-5 h-5 icon-glow transition-transform group-hover:scale-110 relative z-10" />
            <span className="relative z-10">
              LAST NED PLAKAT
            </span>
          </a>
          <p className="text-center mt-6 text-[9px] text-white/30 uppercase tracking-[4px] font-bold">
            Format: A3 PDF • 300 DPI
          </p>
        </div>
      </div>
    </section>
  );
}