"use client";
import React, { useState } from 'react';
import { Award, MapPin, Activity, Music, Move, X, Smile } from 'lucide-react';

export function BioSection() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const content = {
    barre: {
      title: "Ved barren",
      subtitle: "Teknikk & Balanse",
      color: "#22c55e",
      video: "https://res.cloudinary.com/dt4imocd3/video/upload/v1738366453/Koreografi_Musikalitet_msc0p0.mp4",
      whatItGives: "Utvikling av nevromuskulær kontakt. Fokus på holdning, balanse og teknisk presisjon.",
      result: "Kroppen blir lydig, bevegelsene bevisste og dansen emosjonell."
    },
    senter: {
      title: "Senter",
      subtitle: "Flyt & Estetikk",
      color: "#FBBC05",
      video: "", 
      whatItGives: "Koordinasjon og estetisk utførelse uten støtte fra barren.",
      result: "Grasiøse bevegelser og evnen til å tolke musikk gjennom dans."
    },
    gulv: {
      title: "Gulvarbeid",
      subtitle: "Styrke & Tøying",
      color: "#EA4335",
      video: "",
      whatItGives: "Bruk av gravitasjon for dype tøyninger og sømløse overganger.",
      result: "En smidig kropp, sunne ledd og frihet i bevegelse."
    }
  };

  return (
    <section id="bio" className="relative w-full flex flex-col items-center justify-center py-8 md:py-12 px-4 bg-transparent snap-start">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .font-bebas-bio { font-family: 'Bebas Neue', sans-serif; }
        .bio-img { width: 100%; height: 100%; object-fit: cover; transition: all 0.5s ease; }
        
        @media (max-width: 767px) {
          .bio-photo-container { height: 350px; }
          .bio-img { transform: scale(1.8) translateY(-25%); transform-origin: top; }
        }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: gentle-bounce 2s infinite ease-in-out; }
        .animate-bounce-mid { animation: gentle-bounce 2.3s infinite ease-in-out; }
        .animate-bounce-fast { animation: gentle-bounce 1.8s infinite ease-in-out; }

        .photo-popup {
          position: absolute; inset: 0; z-index: 30;
          background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(20px);
          display: flex; flex-direction: column; padding: 1rem;
          color: white; animation: fadeIn 0.3s ease forwards;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10">
        <h2 className="text-2xl md:text-5xl font-bold text-center mb-6 md:mb-10 text-white tracking-tight">
          Instruktøren bak konseptet
        </h2>

        <div className="w-full bg-white/5 backdrop-blur-2xl rounded-[30px] md:rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px]">
          
          <div className="w-full md:w-[40%] h-[350px] md:h-auto relative border-b md:border-b-0 md:border-r border-white/5 shrink-0 overflow-hidden">
            <img src="https://res.cloudinary.com/dt4imocd3/image/upload/v1768882046/copy_of_img-20250904-wa0003_vd4ktj_2aeeb9.webp" alt="Galyna Gerasymenko" className="bio-img" />
            
            {!activeTab && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 flex flex-col justify-end p-6 md:hidden">
                <h3 className="font-bebas-bio text-3xl text-white uppercase leading-none">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-sm text-white/60 uppercase tracking-widest mt-1">Koreograf & Mentor</p>
              </div>
            )}

            {activeTab && (
              <div className="photo-popup text-left justify-start">
                <button onClick={() => setActiveTab(null)} className="absolute top-3 right-3 p-1.5 bg-white/10 rounded-full hover:bg-white/20 transition-all z-40">
                  <X className="w-4 h-4" />
                </button>
                
                {/* Оптимізована висота відео для запобігання прокрутці */}
                <div className="w-full aspect-[16/10] bg-black rounded-xl overflow-hidden mb-3 border border-white/10 shadow-2xl shrink-0">
                  {content[activeTab as keyof typeof content].video && (
                    <video key={content[activeTab as keyof typeof content].video} autoPlay loop muted playsInline className="w-full h-full object-cover">
                      <source src={content[activeTab as keyof typeof content].video} type="video/mp4" />
                    </video>
                  )}
                </div>

                <div className="shrink-0">
                  <h5 className="font-bebas-bio text-2xl uppercase tracking-widest leading-none mb-2" style={{ color: content[activeTab as keyof typeof content].color }}>
                    {content[activeTab as keyof typeof content].title}
                  </h5>
                  <div className="space-y-2 text-[10px] md:text-xs leading-snug">
                    <p><span className="font-bold uppercase tracking-tighter mr-1 italic opacity-70">Hva det gir:</span>{content[activeTab as keyof typeof content].whatItGives}</p>
                    <p><span className="text-[#22c55e] font-bold uppercase tracking-tighter mr-1 italic">Resultat:</span>{content[activeTab as keyof typeof content].result}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col items-center text-center justify-between bg-gradient-to-br from-white/5 to-transparent">
            <div className="w-full">
              <div className="hidden md:block mb-4">
                <h3 className="font-bebas-bio text-5xl lg:text-6xl text-white tracking-wider uppercase leading-none">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-xl text-white/40 uppercase tracking-[0.4em] mt-1">Koreograf & Mentor</p>
              </div>

              <div className="text-white/80 text-[13px] md:text-base leading-snug max-w-lg mx-auto">
                <p>Galyna forener sin bakgrunn fra det ukrainske landslaget med en unik metodikk utviklet gjennom en lang karriere som profesjonell koreograf.</p>
                <div className="h-3" />
                <p>Med utdannelse fra Universitetet for idrett i Kyiv bringer hun ekspertise fra trening av alt fra OL-utøvere til estetisk gymnastikk.</p>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 md:gap-6 my-4 border-b border-white/10 pb-4 w-full font-bebas-bio">
                 <div className="flex items-center gap-1.5 opacity-60">
                    <Award className="w-4 h-4 text-[#FBBC05]" /><span className="text-sm md:text-lg text-white">40 års erfaring</span>
                 </div>
                 <div className="flex items-center gap-1.5 opacity-60">
                    <MapPin className="w-4 h-4 text-[#22c55e]" /><span className="text-sm md:text-lg text-white">Bergen siden 2015</span>
                 </div>
              </div>
            </div>

            <div className="w-full">
              <div className="mb-4 md:mb-6 w-full text-center">
                <h4 className="font-bebas-bio text-2xl md:text-4xl text-[#EA4335] uppercase tracking-[0.2em] md:tracking-[0.3em] flex justify-between md:justify-center w-full overflow-hidden leading-none">
                  {"Koreografi for alle".split("").map((char, i) => (
                    <span key={i} className={char === " " ? "w-2" : ""}>{char}</span>
                  ))}
                </h4>
                <p className="text-[9px] md:text-[11px] text-white/40 uppercase tracking-[0.2em] mt-2 font-medium leading-none">Focus på estetisk utførelse og teknisk presisjon</p>
              </div>
              
              <div className="flex flex-row justify-between items-start w-full gap-2 md:gap-4 font-bebas-bio">
                <IconBox active={activeTab === 'barre'} color="#22c55e" icon={<Activity />} title="Ved barren" sub="Teknikк" animClass="animate-bounce-mid" onClick={() => setActiveTab(activeTab === 'barre' ? null : 'barre')} />
                <IconBox active={activeTab === 'senter'} color="#FBBC05" icon={<Music />} title="Senter" sub="Flyt" animClass="animate-bounce-slow" onClick={() => setActiveTab(activeTab === 'senter' ? null : 'senter')} />
                <IconBox active={activeTab === 'gulv'} color="#EA4335" icon={<Move />} title="Gulvarbeid" sub="Styrke" animClass="animate-bounce-fast" onClick={() => setActiveTab(activeTab === 'gulv' ? null : 'gulv')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconBox({ icon, title, sub, onClick, active, color, animClass }: any) {
  return (
    <div className={`flex-1 flex flex-col items-center group cursor-pointer transition-all duration-300 ${active ? 'scale-105' : 'hover:scale-105'}`} onClick={onClick}>
      <div 
        className={`mb-2 w-11 h-11 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2 relative
          ${active 
            ? 'bg-white border-white shadow-[0_0_25px_rgba(255,255,255,0.6)]' 
            : `bg-white/5 border-white/10 ${animClass} hover:border-white/40`
          }
        `}
        style={{ 
           boxShadow: !active ? `0 0 10px ${color}11` : `0 0 30px ${color}44` 
        }}
      >
        {active ? (
          <Smile className="w-6 h-6 md:w-9 md:h-9 text-black animate-in zoom-in duration-300" />
        ) : (
          React.cloneElement(icon, { 
            className: "w-5 h-5 md:w-8 md:h-8 transition-colors",
            style: { color: color }
          })
        )}
      </div>
      <h5 className={`text-[10px] md:text-lg uppercase mb-1 tracking-widest transition-colors ${active ? 'text-white font-bold' : 'text-white/60'}`}>{title}</h5>
      <p className="text-[7px] md:text-[9px] text-white/30 uppercase tracking-tighter leading-tight font-sans">{sub}</p>
    </div>
  );
}