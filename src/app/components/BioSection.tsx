"use client";
import React from 'react';
import { Award, MapPin, Activity, Music, Move } from 'lucide-react';

export function BioSection() {
  return (
    <section id="bio" className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 px-4 bg-transparent snap-start">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        
        .font-bebas-bio { 
          font-family: 'Bebas Neue', sans-serif; 
        }

        .bio-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.95);
          transition: all 0.5s ease;
        }

        /* Розподіл літер по всій ширині для мобільного */
        .justify-letters {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        @media (max-width: 767px) {
          .bio-photo {
            transform: scale(1.8) translateY(-25%);
            transform-origin: top;
          }
        }

        @media (min-width: 768px) {
          .bio-photo {
            object-position: center 20%;
            transform: scale(1.05);
          }
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10">
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white drop-shadow-md tracking-tight">
          Instruktøren bak konseptet
        </h2>

        <div className="w-full bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* ФОТО */}
          <div className="w-full md:w-[40%] h-[320px] md:h-auto relative border-b md:border-b-0 md:border-r border-white/5 shrink-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 md:hidden" />
            
            <img 
              src="https://res.cloudinary.com/dt4imocd3/image/upload/v1768882046/copy_of_img-20250904-wa0003_vd4ktj_2aeeb9.webp" 
              alt="Galyna Gerasymenko"
              className="bio-photo"
            />
            
            <div className="absolute bottom-6 left-0 right-0 z-20 md:hidden text-center px-4">
              <h3 className="font-bebas-bio text-4xl text-white leading-none uppercase tracking-wider">
                Galyna Gerasymenko
              </h3>
              <p className="font-bebas-bio text-lg text-white/70 uppercase tracking-[0.2em] mt-1">
                Koreograf & Mentor
              </p>
            </div>
          </div>

          <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col items-center text-center justify-center bg-gradient-to-br from-white/5 to-transparent relative">
            
            <div className="hidden md:block mb-6">
              <h3 className="font-bebas-bio text-5xl lg:text-6xl text-white leading-none tracking-wider uppercase">
                Galyna Gerasymenko
              </h3>
              <p className="font-bebas-bio text-xl text-white/40 uppercase tracking-[0.4em] mt-2">
                Koreograf & Mentor
              </p>
            </div>

            <div className="mb-6 text-white/70 text-[13px] md:text-base leading-relaxed font-normal max-w-lg mx-auto">
              <p>
                Galyna forener sin bakgrunn fra det ukrainske landslaget med en unik metodikk utviklet gjennom en lang karriere som profesjonell koreograf.
              </p>
              <div className="h-4" />
              <p>
                Med utdannelse fra Universitetet for idrett i Kyiv bringer hun ekspertise fra trening av alt fra OL-utøvere til estetisk gymnastikk.
              </p>
            </div>

            {/* СТАТИСТИКА */}
            <div className="flex flex-row justify-center items-center gap-2 md:gap-6 mb-8 border-b border-white/10 pb-8 w-full">
               <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 shrink-0">
                  <Award className="w-4 h-4 text-[#FBBC05] shrink-0" />
                  <span className="font-bebas-bio text-base md:text-xl text-white tracking-wide whitespace-nowrap">40 års erfaring</span>
               </div>
               <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 shrink-0">
                  <MapPin className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span className="font-bebas-bio text-base md:text-xl text-white tracking-wide whitespace-nowrap">Bergen siden 2015</span>
               </div>
            </div>

            {/* БЛОК КУРСУ */}
            <div className="w-full">
              <div className="mb-6 w-full">
                <h4 className="font-bebas-bio text-2xl md:text-4xl text-[#EA4335] uppercase tracking-[0.2em] md:tracking-[0.3em] flex justify-between md:justify-center w-full overflow-hidden">
                  {"Koreografi for alle".split("").map((char, i) => (
                    <span key={i} className={char === " " ? "w-2" : ""}>{char}</span>
                  ))}
                </h4>
                <p className="text-[10px] md:text-xs text-white uppercase tracking-widest px-2 mt-2 opacity-100 font-medium">
                  Fokus på estetisk utførelse og teknisk presisjon
                </p>
              </div>
              
              <div className="flex flex-row justify-between items-start w-full gap-2 md:gap-4">
                {/* ICON 1: Activity (Зелений на білому) */}
                <div className="flex-1 flex flex-col items-center group">
                  <div className="mb-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-[#22c55e]" />
                  </div>
                  <h5 className="font-bebas-bio text-[11px] md:text-xl text-white tracking-widest uppercase mb-1 text-center leading-none">Ved barren</h5>
                  <p className="text-[8px] md:text-xs text-white/40 uppercase tracking-tighter text-center leading-tight">Teknikk &<br className="md:hidden"/> Balanse</p>
                </div>

                {/* ICON 2: Music (Жовтий на білому) */}
                <div className="flex-1 flex flex-col items-center group">
                  <div className="mb-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Music className="w-5 h-5 md:w-6 md:h-6 text-[#FBBC05]" />
                  </div>
                  <h5 className="font-bebas-bio text-[11px] md:text-xl text-white tracking-widest uppercase mb-1 text-center leading-none">Senter</h5>
                  <p className="text-[8px] md:text-xs text-white/40 uppercase tracking-tighter text-center leading-tight">Flyt &<br className="md:hidden"/> Estetikk</p>
                </div>

                {/* ICON 3: Move (Червоний на білому) */}
                <div className="flex-1 flex flex-col items-center group">
                  <div className="mb-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-500 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Move className="w-5 h-5 md:w-6 md:h-6 text-[#EA4335]" />
                  </div>
                  <h5 className="font-bebas-bio text-[11px] md:text-xl text-white tracking-widest uppercase mb-1 text-center leading-none">Gulvarbeid</h5>
                  <p className="text-[8px] md:text-xs text-white/40 uppercase tracking-tighter text-center leading-tight">Styrke &<br className="md:hidden"/> Tøying</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}