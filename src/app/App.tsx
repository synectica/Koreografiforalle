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
    
    // 1. МИТТЄВА РЕАКЦІЯ: Змінюємо мову та запускаємо анімацію відразу
    setActiveOverlay(nextLang);
    setIsAnimating(true);
    
    // Зміна контенту тепер відбувається через 200мс (достатньо, щоб око помітило початок анімації)
    setTimeout(() => setLang(nextLang), 200);

    // 2. ОПТИМІЗОВАНІ ТАЙМІНГИ: Завершуємо все значно швидше
    setTimeout(() => { 
      setIsAnimating(false); 
      // Прибираємо оверлей відразу після завершення транзиції
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
      {/* ОВЕРЛЕЙ: Скорочено час clip-path з 1.2s до 0.7s */}
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
          {/* КАРТКА ПРАПОРА: Скорочено поворот з 800ms до 400ms */}
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

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone === true ||
                        window.location.search.includes('standalone=1');

    if (isStandalone) {
      setTimeout(() => {
        const el = document.getElementById('pricing-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 2000); 
    }
  }, []);

  const iconK = "https://ui-avatars.com/api/?name=K&background=EA4335&color=fff&size=512&font-size=0.7&bold=true";
  
  const manifestData = {
    name: "KOREOGRAFI-BETALING",
    short_name: "BETALING",
    id: "/?standalone=1",
    start_url: "/?standalone=1",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#EA4335",
    icons: [{ 
      src: iconK, 
      sizes: "512x512", 
      type: "image/png",
      purpose: "any maskable"
    }]
  };
  const manifestString = `data:application/json,${encodeURIComponent(JSON.stringify(manifestData))}`;

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-[#22c55e]/30 scroll-smooth flex flex-col overflow-x-hidden">
      
      <link rel="manifest" href={manifestString} />
      <link rel="apple-touch-icon" href={iconK} />
      <link rel="icon" type="image/png" href={iconK} />
      
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="BETALING" />
      <meta name="application-name" content="BETALING" />
      <meta name="theme-color" content="#EA4335" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        
        .footer-logo {
          height: 90px;
          width: auto;
          object-fit: contain;
          border-radius: 12px;
          opacity: 0.9;
          transition: all 0.3s ease;
        }
        .footer-logo:hover { 
           opacity: 1;
           transform: scale(1.03);
        }
        @media (max-width: 768px) { 
           .footer-logo { 
               height: 65px;
               border-radius: 8px;
           } 
        }
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

      <footer className="w-full py-12 text-left relative z-20 bg-white/5 backdrop-blur-md border-t border-white/10"
              style={{ paddingBottom: 'calc(3rem + env(safe-area-inset-bottom))' }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-row items-center justify-between gap-8">
          <div className="flex flex-row items-center justify-start gap-4 md:gap-8 flex-shrink-0">
            <img src="https://cdn.jsdelivr.net/gh/synectica/assets/kfaforkfa.png" alt="Møte" className="footer-logo" />
            <img src="https://cdn.jsdelivr.net/gh/synectica/assets/frivilliglogoforkfacopy.jpg" alt="Frivillig" className="footer-logo" />
          </div>

          <div className="flex flex-col items-start gap-2"> 
            <p className="font-bebas text-white uppercase tracking-[0.1em] md:tracking-[0.15em] opacity-60 text-[11px] sm:text-[14px] md:text-[16px] leading-tight">
              Koreografi for alle med Galyna Gerasymenko — © {new Date().getFullYear()}
            </p>
            <p className="font-bebas text-white/40 uppercase tracking-[0.1em] text-[10px] md:text-[12px] leading-tight">
              Designed & Developed by <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Viktor Herasymenko</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}