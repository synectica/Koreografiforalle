"use client";
import React, { useState } from 'react';
import { Award, MapPin, Activity, Music, Move, X } from 'lucide-react';

export function BioSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const content = {
    barre: {
      title: "Ved barren",
      subtitle: "Teknikk & Presisjon",
      color: "#22c55e",
      whatItGives: "Grunnleggende koreografi ved barren. Vi fokuserer på tekniske elementer ved støtten for å bygge et fundament. Her legger vi vekt på presist fotarbeid, riktig kroppsplassering og muskulær kontroll.",
      result: "En sterk og disiplinert kropp med korrekt holdning. Du utvikler muskelminne og den tekniske tryggheten som kreves for all videre progresjon."
    },
    senter: {
      title: "Senter",
      subtitle: "Adagio & Danseelementer",
      color: "#FBBC05",
      whatItGives: "Adagio og koordinasjonsøvelser i senter. Her overfører vi teknikken fra barren til fri bevegelse i rommet. Vi jobber med balanse, flyt og estetiske danseelementer uten fast støtte.",
      result: "Forbedret koordinasjon, balanse og bevegelsesfrihet. Du lærer å binde sammen elementer med eleganse og uttrykke deg gjennom musikalitet."
    },
    gulv: {
      title: "Gulvarbeid",
      subtitle: "Styrke & Fleksibilitet",
      color: "#EA4335",
      whatItGives: "Målrettet styrketrening og tøyning på gulvet. Vi bruker underlaget for å jobbe i dybden med ulike muskelgrupper, øke leddmobilitet og forbedre kroppens generelle smidighet.",
      result: "En smidig, langstrakt muskulatur og økt fleksibilitet. Kroppen blir sterkere, mer motstandsdyktig og klar for mer krevende fysiske utfordringer."
    }
  };

  return (
    <section id="bio" className="relative w-full flex flex-col items-center justify-center py-12 md:py-20 px-4 bg-transparent snap-start">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas-bio { font-family: 'Bebas Neue', sans-serif; }
        
        .bio-img { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: all 0.5s ease; 
            
            /* МАСШТАБ 1.5, ЗСУВ ВПРАВО 12% ТА ОПУЩЕНО ДО -10% ВГОРУ */
            transform: scale(1.5) translateX(12%) translateY(-10%);
            
            /* ОБРОБКА: Затемнення, Різкість, Колір */
            filter: brightness(0.85) contrast(1.1) saturate(1.05);
            transform-origin: center center;
        }
        
        @media (max-width: 767px) {
          .bio-photo-container { height: 350px; }
          /* Корекція для мобілок: також трохи нижче */
          .bio-img { transform: scale(1.5) translateX(8%) translateY(-5%); }
        }

        .photo-popup {
          position: absolute; inset: 0; z-index: 30;
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; padding: 2rem; animation: fadeIn 0.3s ease forwards;
        }

        .candy-icon-static {
          position: relative; overflow: hidden;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        .candy-icon-static::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-white tracking-tight">
          Instruktøren bak konseptet
        </h2>

        <div className="w-full bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* PHOTO SECTION */}
          <div className="w-full md:w-[42%] h-[350px] md:h-auto relative shrink-0 overflow-hidden bio-photo-container border-b md:border-b-0 md:border-r border-white/5">
            <img 
              src="https://cdn.jsdelivr.net/gh/synectica/assets/mama%20for%20KFA.webp" 
              alt="Galyna Gerasymenko" 
              className="bio-img absolute inset-0" 
            />
            
            {!activeTab && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 flex flex-col justify-end p-8 md:hidden">
                <h3 className="font-bebas-bio text-4xl text-white uppercase leading-none">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-base text-white/50 uppercase tracking-widest mt-1">Koreograf & Mentor</p>
              </div>
            )}

            {activeTab && (
              <div className="photo-popup" style={{ backgroundColor: content[activeTab as keyof typeof content].color }}>
                <div className="w-full h-full flex flex-col justify-center text-black">
                    <h5 className="font-bebas-bio text-3xl md:text-5xl uppercase tracking-widest leading-none mb-4 text-center border-b border-black/20 pb-4">
                        {content[activeTab as keyof typeof content].title}
                    </h5>
                    
                    <div className="space-y-4 text-sm md:text-lg leading-snug font-semibold">
                        <div>
                            <span className="font-black uppercase tracking-wider block mb-1 text-[10px] md:text-xs opacity-50 italic">Innhold:</span>
                            <p>{content[activeTab as keyof typeof content].whatItGives}</p>
                        </div>
                        <div>
                            <span className="font-black uppercase tracking-wider block mb-1 text-[10px] md:text-xs opacity-50 italic">Resultat:</span>
                            <p>{content[activeTab as keyof typeof content].result}</p>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* TEXT SECTION */}
          <div className="w-full md:w-[58%] p-8 md:p-12 flex flex-col items-center text-center justify-between bg-white/[0.02]">
            <div className="w-full">
              <div className="hidden md:block mb-8">
                <h3 className="font-bebas-bio text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-xl text-white/40 uppercase tracking-[0.4em] mt-2">Koreograf & Mentor</p>
              </div>

              <div className="text-white/80 text-[13px] md:text-base leading-relaxed max-w-lg mx-auto">
                <p>Galyna forener sin bakgrunn fra det ukrainske landslaget med en unik metodikk utviklet gjennom en lang karriere som profesjonell koreograf.</p>
                <div className="h-3" />
                <p>Med utdannelse fra Universitetet for idrett i Kyiv bringer hun ekspertise fra trening av alt fra OL-utøvere til estetisk gymnastikk.</p>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 md:gap-8 my-6 border-y border-white/5 py-6 w-full font-bebas-bio">
                 <div className="flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-[#FBBC05]" /><span className="text-base md:text-xl text-white opacity-80">40 års erfaring</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <MapPin className="w-5 h-5 text-[#22c55e]" /><span className="text-base md:text-xl text-white opacity-80">Bergen siden 2015</span>
                 </div>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-6 w-full text-center">
                <h4 className="font-bebas-bio text-2xl md:text-4xl text-[#EA4335] uppercase tracking-[0.2em] italic">
                  Koreografi for alle
                </h4>
                <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mt-2 font-medium">Estetisk utførelse og teknisk presisjon</p>
              </div>
              
              <div className="flex flex-row justify-between items-start w-full gap-2 md:gap-4 font-bebas-bio">
                <IconBox active={activeTab === 'barre'} color="#22c55e" icon={<Activity />} title="Ved barren" sub="Klikk for teknikk" onClick={() => setActiveTab(activeTab === 'barre' ? null : 'barre')} />
                <IconBox active={activeTab === 'senter'} color="#FBBC05" icon={<Music />} title="Senter" sub="Klikk for adagio" onClick={() => setActiveTab(activeTab === 'senter' ? null : 'senter')} />
                <IconBox active={activeTab === 'gulv'} color="#EA4335" icon={<Move />} title="Gulvarbeid" sub="Klikk for styrke" onClick={() => setActiveTab(activeTab === 'gulv' ? null : 'gulv')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconBox({ icon, title, sub, onClick, active, color }: any) {
  return (
    <div className={`flex-1 flex flex-col items-center group cursor-pointer transition-all duration-300 ${active ? 'scale-105' : 'hover:scale-105'}`} onClick={onClick}>
      <div 
        className={`mb-2 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 candy-icon-static
          ${active 
            ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.8)]'
            : 'border-white/10'
          }
        `}
      >
        {active ? (
            <X className="w-6 h-6 md:w-8 md:h-8 text-black animate-in zoom-in duration-300" />
        ) : (
            React.cloneElement(icon, { 
                className: "w-6 h-6 md:w-8 md:h-8 transition-colors relative z-10",
                style: { color: color }
            })
        )}
      </div>
      <h5 className={`text-[10px] md:text-lg uppercase mb-1 tracking-widest transition-colors ${active ? 'text-white font-bold' : 'text-white/60'}`}>{title}</h5>
      <p className={`text-[7px] md:text-[9px] uppercase tracking-tighter leading-tight font-sans transition-opacity ${active ? 'opacity-100 text-white' : 'text-white/30'}`}>{sub}</p>
    </div>
  );
}