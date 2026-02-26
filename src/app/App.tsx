"use client";
import React, { useState, useEffect } from "react";

// Імпорти твоїх компонентів
import { Hero } from "./components/Hero";
import { BioSection } from "./components/BioSection";
import { PricingSection } from "./components/PricingSection";
import { BookingSection } from "./components/BookingSection";
import { ContactForm } from "./components/ContactForm";
import { MapSection } from "./components/MapSection";
import { PosterSection } from "./components/PosterSection";

function FlagSwitch({ lang, setLang }: { lang: string, setLang: (l: string) => void }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<"ua" | "no" | "">("");
  const isUkraine = lang === "ua";

  const handleSwitch = () => {
    if (isAnimating) return;
    const nextLang = isUkraine ? "no" : "ua";
    setActiveOverlay(nextLang);
    setIsAnimating(true);
    setTimeout(() => setLang(nextLang), 200);
    setTimeout(() => { 
      setIsAnimating(false); 
      setTimeout(() => setActiveOverlay(""), 600); 
    }, 800);
  };

  const getOverlayBackground = () => {
    if (activeOverlay === "ua") return "linear-gradient(to bottom, #0057B7 50%, #FFD700 50%)";
    if (activeOverlay === "no") return `linear-gradient(to bottom, transparent calc(50% - 4vh), #00205B calc(50% - 4vh), #00205B calc(50% + 4vh), transparent calc(50% + 4vh)), linear-gradient(to right, transparent calc(35% - 4vh), #00205B calc(35% - 4vh), #00205B calc(35% + 4vh), transparent calc(35% + 4vh)), linear-gradient(to bottom, transparent calc(50% - 8vh), white calc(50% - 8vh), white calc(50% + 8vh), transparent calc(50% + 8vh)), linear-gradient(to right, transparent calc(35% - 8vh), white calc(35% - 8vh), white calc(35% + 8vh), transparent calc(35% + 8vh)), #BA0C2F`;
    return "transparent";
  };

  return (
    <>
      <div className="fixed inset-0 z-[12000] pointer-events-none"
        style={{
          opacity: isAnimating ? 1 : 0,
          clipPath: isAnimating ? 'circle(150% at calc(100% - 30px) 30px)' : 'circle(0% at calc(100% - 30px) 30px)',
          transition: isAnimating 
            ? 'clip-path 0.7s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.1s' 
            : 'clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s 0.2s',
          background: getOverlayBackground(),
        }}
      />
      <div className="fixed top-5 right-5 z-[13000] cursor-pointer" onClick={handleSwitch}>
        <div className="w-[25.3px] h-[18.4px] relative [perspective:1000px]">
          <div className={`w-full h-full transition-transform duration-[400ms] cubic-bezier(0.34, 1.56, 0.64, 1) [transform-style:preserve-3d] ${!isUkraine ? '[transform:rotateY(180deg)]' : ''}`}>
            <div className="absolute inset-0 [backface-visibility:hidden] rounded-[2px] overflow-hidden shadow-lg border border-white/10">
                <div className="h-1/2 bg-[#0057B7]" /><div className="h-1/2 bg-[#FFD700]" />
            </div>
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2px] overflow-hidden shadow-lg bg-[#BA0C2F] border border-white/10">
                <div className="absolute top-[37.5%] h-[25%] w-full bg-white" /><div className="absolute left-[27.27%] w-[18.18%] h-full bg-white" /><div className="absolute top-[43.75%] h-[12.5%] w-full bg-[#00205B] z-[2]" /><div className="absolute left-[31.81%] w-[9.09%] h-full bg-[#00205B] z-[2]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState("ua");
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/vik_gerasymenko/");

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) setInstagramUrl("instagram://user?username=vik_gerasymenko");
  }, []);

  const iconK = "https://ui-avatars.com/api/?name=K&background=EA4335&color=fff&size=512&font-size=0.7&bold=true";
  
  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#22c55e]/30 scroll-smooth flex flex-col overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        
        /* ПОВЕРНУТО ОРИГІНАЛЬНИЙ ВИГЛЯД: без фільтрів */
        .footer-logo {
          height: 52px;
          width: auto;
          object-fit: contain;
          border-radius: 4px;
          opacity: 1; /* Повна яскравість оригіналу */
          transition: transform 0.3s ease;
        }
        .footer-logo:hover { 
          transform: translateY(-2px) scale(1.02);
        }
        @media (max-width: 768px) { .footer-logo { height: 40px; } }
      `}</style>

      <FlagSwitch lang={lang} setLang={setLang} />

      <div className="relative z-10 flex-grow">
        <Hero />
        <BioSection />
        
        <div className="max-w-7xl mx-auto space-y-20 pb-20 px-4 md:px-10">
          <div id="pricing-anchor">
            <PricingSection lang={lang} />
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <BookingSection />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <ContactForm />
          <MapSection />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <PosterSection /> 
        </div>
      </div>

      <footer className="w-full py-4 relative z-20 bg-white/5 backdrop-blur-md border-t border-white/10"
              style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-row items-center justify-between">
          
          {/* ЛОГОТИПИ: ОРИГІНАЛЬНІ КОЛЬОРИ ТА ФОНИ */}
          <div className="flex flex-row items-center gap-5 md:gap-8">
            <img src="https://cdn.jsdelivr.net/gh/synectica/assets/kfaforkfa.png" alt="KFA Logo" className="footer-logo" />
            <img src="https://cdn.jsdelivr.net/gh/synectica/assets/frivilliglogoforkfacopy.jpg" alt="Frivillig Logo" className="footer-logo" />
          </div>

          <div className="flex flex-col items-end text-right"> 
            <p className="font-bebas text-white uppercase tracking-[0.1em] opacity-50 text-[10px] sm:text-[13px] leading-none whitespace-nowrap">
              Koreografi for alle — © {new Date().getFullYear()}
            </p>
            <p className="font-bebas text-white/30 uppercase tracking-[0.1em] text-[9px] sm:text-[11px] mt-1">
              Dev by <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Viktor H.</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}