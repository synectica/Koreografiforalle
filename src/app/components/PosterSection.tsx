"use client";
import React from 'react';
import { Download } from 'lucide-react';

export function PosterSection() {
  const pdfUrl = "https://cdn.jsdelivr.net/gh/synectica/assets/plakat%20A3%20KOREOGRAFI%20FOR%20ALLE.pdf";
  const previewImg = "https://cdn.jsdelivr.net/gh/synectica/assets/WhatsApp%20Image%202026-02-21%20at%2012.43.59.jpeg";

  return (
    <section id="poster" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center px-4 py-20 overflow-visible">
      
      <style>{`
        /* Кнопка з ефектом плавної кольорової спіралі */
        .spiral-gradient-button {
          position: relative;
          background: #000; /* Базовий колір під градієнтом */
          border: none;
          border-radius: 9999px;
          overflow: hidden;
          transition: all 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* Шар зі спіральним градієнтом ПІД текстом */
        .spiral-gradient-button::before {
          content: "";
          position: absolute;
          /* Величезний оверсет, щоб при обертанні не було видно країв */
          inset: -200%; 
          z-index: -1;
          background: conic-gradient(
            from 0deg,
            #0047AB,  /* Синій */
            #FF69B4,  /* Рожевий */
            #00BFFF,  /* Блакитний */
            #FF0000,  /* Червоний */
            #008000,  /* Зелений */
            #0047AB   /* Замикаємо */
          );
          /* Сильне розмиття прибирає всі чіткі межі */
          filter: blur(50px); 
          /* Повільне обертання по спіралі */
          animation: slow-spiral 12s linear infinite;
        }

        @keyframes slow-spiral {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spiral-gradient-button:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 45px rgba(255, 255, 255, 0.1);
        }

        .spiral-gradient-button:hover::before {
          animation-duration: 6s; /* Прискорюємо рух при наведенні */
          filter: blur(40px); /* Кольори стають трохи насиченішими */
        }

        .button-text-layer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          /* Тінь для тексту, щоб він не губився на яскравому фоні */
          text-shadow: 0 1px 10px rgba(0,0,0,0.4); 
        }

        .poster-card-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        {/* ЗАГОЛОВОК (Великий Bebas) */}
        <div className="text-center mb-12">
          <h2 className="font-bebas text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight uppercase italic drop-shadow-2xl">
            DU ER IDÉEN
          </h2>
          <p className="text-xl text-white/70 text-center font-normal max-w-xl mx-auto leading-relaxed">
            Bli en ambassadør for danseglede. Last ned plakaten og spre ordet.
          </p>
        </div>

        {/* ПЛАКАТ (Скляний контейнер А3) */}
        <div className="poster-card-glass w-full p-4 md:p-8 rounded-[50px] shadow-2xl relative mb-16 flex flex-col items-center">
          
          <div className="w-full max-w-[360px] aspect-[1/1.414] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-white/10">
            <img 
              src={previewImg} 
              alt="KFA Poster" 
              className="w-full h-full object-cover opacity-95"
            />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center text-center px-4">
            <p className="text-3xl md:text-4xl font-bebas font-bold text-white tracking-widest uppercase italic">
              Koreografi For Alle
            </p>
            <p className="text-white/30 text-[10px] md:text-xs mt-3 font-black uppercase tracking-[5px]">
              Print ut • Heng opp • Spre glede
            </p>
          </div>
        </div>

        {/* КНОПКА ЗІ СПІРАЛЬНИМ ГРАДІЄНТОМ */}
        <div className="w-full max-w-sm">
          <a 
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="KFA_Poster_A3.pdf"
            className="spiral-gradient-button w-full h-20 rounded-full text-white group no-underline"
          >
            <div className="button-text-layer">
              <Download className="w-6 h-6 mr-3 transition-transform group-hover:scale-125" />
              <span className="font-black uppercase text-[12px] md:text-[14px] tracking-[3px]">
                LAST NED PLAKAT
              </span>
            </div>
          </a>
          <p className="text-center mt-8 text-[9px] text-white/20 uppercase tracking-[4px] font-bold">
            Optimalisert for A3 utskrift
          </p>
        </div>
      </div>
    </section>
  );
}