"use client";
import React, { useState, useEffect } from "react";
import { CreditCard, Heart, ArrowRight } from "lucide-react";

export function PricingSection({ lang }: { lang: string }) {
  const [successStates, setSuccessStates] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });
  const [browserInfo, setBrowserInfo] = useState({ isChromeAndroid: false, isSamsung: false, isiOS: false });

  useEffect(() => {
    const ua = navigator.userAgent;
    const isAndroid = /Android/i.test(ua);
    const isChrome = /Chrome/i.test(ua) && !/SamsungBrowser/i.test(ua);
    const isSamsung = /SamsungBrowser/i.test(ua);
    const isiOS = /iPhone|iPad|iPod/i.test(ua);

    setBrowserInfo({
      isChromeAndroid: isAndroid && isChrome,
      isSamsung: isSamsung,
      isiOS: isiOS
    });
  }, []);

  const pricingData = [
    { name: "60 Minutter", price: "110", info: "Tirsdager", description: "Nybegynnere & Grunnleggende" },
    { name: "90 Minutter", price: "165", info: "Fredager", description: "Viderekomne & Teknikk" },
    { name: "Privat / Gruppe", price: "Avtale", info: "Individuell", description: "Skreddersydd opplegg" }
  ];

  const vippsNumber = "981 48 210";
  const vippsUrl = `https://qr.vipps.no/28/2/01/031/4798148210?v=1`;

  const handlePayment = (index: number) => {
    setSuccessStates(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      window.location.href = vippsUrl;
    }, 500);
  };

  const resetCard = (index: number) => {
    setSuccessStates(prev => ({ ...prev, [index]: false }));
  };

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 relative flex flex-col items-center justify-center min-h-screen bg-transparent font-sans text-white">
      <style>{`
        .pricing-glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          transform: translateZ(0);
          will-change: transform, backdrop-filter;
          isolation: isolate;
        }

        .btn-candy {
          width: 100%; height: 64px; border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          gap: 12px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1.5px; font-size: 13px; border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
          backface-visibility: hidden;
        }

        .btn-candy::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        .btn-candy:active { transform: scale(0.96); }

        .btn-white-vipps {
          background: #ffffff; color: #000000;
          box-shadow: 
            inset 0 -6px 8px rgba(0, 0, 0, 0.1),
            inset 0 4px 6px rgba(255, 255, 255, 1),
            0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-booking {
          background: #22c55e; color: #ffffff;
          box-shadow: 
            inset 0 -6px 8px rgba(0, 0, 0, 0.2),
            inset 0 4px 6px rgba(255, 255, 255, 0.3),
            0 12px 25px rgba(34, 197, 94, 0.4);
        }

        .vipps-card-pila {
           width: 100%;
           border-radius: 50px; /* Таке ж закруглення як у карток */
        }
        @media (min-width: 768px) {
           .vipps-card-pila {
              width: calc(100% / 3);
           }
        }
      `}</style>

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        <div className="text-center mb-12 relative">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#f97316] text-[10px] font-black uppercase tracking-[2px] rounded-full shadow-lg">
            Testperiode
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight capitalize text-white">Priser</h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-lg">Betaling kan gjøres på forhånd eller etter timen ved oppmøte.</p>
        </div>

        {/* ОСНОВНИЙ БЛОК КАРТОК */}
        <div className="pricing-glass-card w-full max-w-5xl flex flex-col md:flex-row relative">
          {pricingData.map((plan, index) => {
            const isSuccess = successStates[index];
            return (
              <div key={index} className={`relative flex-1 min-h-[520px] flex flex-col items-center justify-between p-8 ${index !== pricingData.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}>
                
                {isSuccess && (
                  <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <Heart className="w-16 h-16 text-[#f97316] fill-[#f97316] mb-6 animate-pulse" />
                    <h3 className="text-6xl font-black tracking-tighter text-black uppercase leading-none">TAKK!</h3>
                    <p className="text-black text-sm font-bold uppercase tracking-widest mt-8 opacity-40">SENDER DEG TIL VIPPS</p>
                    <button onClick={() => resetCard(index)} className="absolute bottom-8 text-[10px] text-black/20 font-bold uppercase tracking-widest hover:text-black/60 transition-colors">Lukk</button>
                  </div>
                )}

                <div className="w-full flex flex-col items-center h-24 justify-center">
                  <span className="font-bold tracking-widest uppercase text-[10px] mb-2 text-[#f97316]">{plan.info}</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase text-center">{plan.name}</h3>
                  <p className="text-[10px] uppercase opacity-60 tracking-widest font-bold text-center h-4">{plan.description}</p>
                </div>

                <div className="flex flex-col items-center py-6 min-h-[160px] justify-center">
                  <span className="text-7xl font-bold tracking-tighter leading-none">{plan.price}</span>
                  <span className="text-lg font-bold uppercase tracking-widest mt-2 text-[#f97316]">
                    {plan.price === "Avtale" ? "Pris" : "NOK"}
                  </span>
                </div>

                <div className="w-full h-24 flex flex-col justify-end px-2">
                  <button onClick={() => handlePayment(index)} className="btn-candy btn-white-vipps">
                    <CreditCard className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">{plan.price === "Avtale" ? "BETAL" : `BETAL ${plan.price}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ПЛАШКА VIPPS: ЗАРУГЛЕНА ТА ВІДІРВАНА (Рівні відстані) */}
        <div className="w-full max-w-5xl flex justify-center mt-12 mb-12">
           <div className="vipps-card-pila bg-white/5 backdrop-blur-3xl border border-white/10 p-8 flex flex-col items-center justify-center shadow-2xl transition-transform hover:scale-[1.02]">
              <p className="text-[10px] uppercase tracking-[3px] font-bold text-white/30 mb-3 text-center">Betaling fra PC?</p>
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-[#f97316] uppercase tracking-[2px] mb-1">Vipps Nummer</span>
                <p className="text-2xl md:text-3xl font-black text-white tracking-[4px]">{vippsNumber}</p>
              </div>
              <p className="text-[9px] uppercase mt-4 text-white/20 font-bold tracking-[3px] italic">Galyna Gerasymenko</p>
           </div>
        </div>

        {/* КНОПКА ЗАПИСУ */}
        <div className="w-full max-w-[340px] px-4">
           <button 
             onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
             className="btn-candy btn-booking"
           >
             <span className="relative z-10">Meld deg på prøvetime</span>
             <ArrowRight className="w-5 h-5 relative z-10" />
           </button>
        </div>
      </div>
    </section>
  );
}