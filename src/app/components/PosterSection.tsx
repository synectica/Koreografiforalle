"use client";
import React, { useState } from 'react';
import { Download, X, ZoomIn } from 'lucide-react';

export function PosterSection() {
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);

  const posters = [
    {
      id: 1,
      title: "KFA PLAKAT - VERSJON 1",
      description: "Plakat for de som setter pris på en sunn og estetisk livsstil",
      // Точна назва КАПСОМ та з розширенням .jpeg
      preview: "/KOREOGRAFIFORALLEPLAKATA3FUNKY.jpeg",
      // Додано %20 замість пробілів, щоб посилання працювало в браузері
      pdf: "/plakat%20A3%20KOREOGRAFI%20FOR%20ALLE.pdf",
      fileName: "KFA_Poster_V1.pdf"
    },
    {
      id: 2,
      title: "KFA PLAKAT - VERSJON 2",
      description: "Bli en ambassadør for danseglede і ditt lokalsamhumun",
      // Точні назви малими літерами
      preview: "/plakatkfaminimala3.jpg", 
      pdf: "/koreografiforalleplakatminimala3.pdf",
      fileName: "KFA_Poster_V2.pdf"
    }
  ];

  return (
    <section id="poster" className="relative min-h-screen w-full bg-transparent flex flex-col items-center justify-center py-20 px-4 overflow-visible">
      
      <style>{`
        .btn-candy-spiral {
          position: relative;
          width: 100%;
          height: 64px;
          background: #000;
          border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          gap: 12px; color: white; font-weight: 800;
          text-transform: uppercase; letter-spacing: 2px; font-size: 11px;
          cursor: pointer; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
          box-shadow: inset 0 -6px 10px rgba(0, 0, 0, 0.4), inset 0 4px 8px rgba(255, 255, 255, 0.2), 0 10px 25px rgba(0, 0, 0, 0.3);
          text-decoration: none;
        }

        .btn-candy-spiral::before {
          content: ""; position: absolute; inset: -200%; z-index: -1;
          background: conic-gradient(from 0deg, #0047AB, #FF69B4, #00BFFF, #FF0000, #008000, #0047AB);
          filter: blur(30px); animation: led-rotate 8s linear infinite;
        }

        .btn-candy-spiral::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        @keyframes led-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .poster-main-frame {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(0,0,0,0.95);
        }

        .icon-glow { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8)); }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg uppercase italic font-bebas">
            DU ER IDÉEN
          </h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            Bli en ambassadør for danseglede.
          </p>
        </div>

        <div className="poster-main-frame w-full p-4 md:p-10 rounded-[40px] md:rounded-[50px] shadow-2xl relative mb-12">
          
          <div className="hidden md:grid grid-cols-2 gap-10">
            {posters.map((p) => (
              <div key={p.id} className="group relative cursor-pointer" onClick={() => setSelectedPoster(p.id)}>
                <div className="aspect-[1/1.414] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                  <img src={p.preview} className="w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105" alt={p.title} />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-10 h-10 icon-glow" />
                  </div>
                </div>
                <p className="mt-4 text-center font-bebas text-xl text-white/80 italic tracking-wider">{p.title}</p>
              </div>
            ))}
          </div>

          <div className="md:hidden flex flex-col items-center">
            <div 
              className="relative w-full max-w-[300px] aspect-[1/1.414] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={() => setSelectedPoster(posters[activeMobileIndex].id)}
            >
              <img src={posters[activeMobileIndex].preview} className="w-full h-full object-cover" alt="Active Poster" />
              <div className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-full">
                <ZoomIn className="text-white w-5 h-5" />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              {posters.map((p, idx) => (
                <button 
                  key={p.id} 
                  onClick={() => setActiveMobileIndex(idx)}
                  className={`w-14 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeMobileIndex === idx ? 'border-[#f97316] scale-110' : 'border-transparent opacity-40'}`}
                >
                  <img src={p.preview} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center text-center px-4">
            <p className="text-lg md:text-xl font-bold text-white tracking-tight uppercase italic font-bebas max-w-lg leading-tight">
              {selectedPoster 
                ? posters.find(p => p.id === selectedPoster)?.description 
                : posters[activeMobileIndex].description}
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

        <div className="w-full max-w-sm">
          <button 
            onClick={() => setSelectedPoster(posters[activeMobileIndex].id)}
            className="btn-candy-spiral group"
          >
            <Download className="w-5 h-5 icon-glow transition-transform group-hover:scale-110 relative z-10" />
            <span className="relative z-10">LAST NED PLAKAT</span>
          </button>
          <p className="text-center mt-6 text-[9px] text-white/30 uppercase tracking-[4px] font-bold">
            Format: A3 PDF • 300 DPI
          </p>
        </div>
      </div>

      {/* МОДАЛЬНИЙ ПОПАП */}
      {selectedPoster && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 modal-blur" onClick={() => setSelectedPoster(null)} />
          
          <div className="relative bg-[#0a0a0a] w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-[40px] border border-white/10 p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-4xl">
            
            <button 
              onClick={() => setSelectedPoster(null)} 
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[11000] bg-white text-black p-2 md:p-3 rounded-full shadow-2xl transition-transform active:scale-90"
              aria-label="Close"
            >
              <X className="w-8 h-8 md:w-9 md:h-9 stroke-[3px]" />
            </button>

            <div className="w-full md:w-1/2">
              <div className="aspect-[1/1.414] rounded-xl overflow-hidden border border-white/10">
                <img src={posters.find(p => p.id === selectedPoster)?.preview} className="w-full h-full object-cover" alt="Full view" />
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <h3 className="font-bebas text-4xl text-white mb-4 italic tracking-tight">
                {posters.find(p => p.id === selectedPoster)?.title}
              </h3>
              <p className="text-white/60 mb-10 text-lg leading-relaxed">
                {posters.find(p => p.id === selectedPoster)?.description}
              </p>

              <div className="space-y-6">
                <a 
                  href={posters.find(p => p.id === selectedPoster)?.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download={posters.find(p => p.id === selectedPoster)?.fileName}
                  className="btn-candy-spiral"
                >
                  <Download className="w-5 h-5 icon-glow relative z-10" />
                  <span className="relative z-10">BEKREFT NEDLASTING</span>
                </a>
                <p className="text-center text-[9px] text-white/20 uppercase tracking-[2px] font-bold">
                  Klar til utskrift • A3 PDF
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}