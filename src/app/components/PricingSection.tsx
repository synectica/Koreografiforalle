"use client";
import React, { useState } from "react";
import { CreditCard, ArrowDown, Check, Heart } from "lucide-react";

export function PricingSection({ lang }: { lang: string }) {
  const [flippedStates, setFlippedStates] = useState<{ [key: number]: boolean }>({
    0: false, 1: false, 2: false
  });

  const [successStates, setSuccessStates] = useState<{ [key: number]: boolean }>({
    0: false, 1: false, 2: false
  });

  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const pricingData = [
    { name: "60 Minutter", price: "110", info: "Tirsdager", description: "Nybegynnere & Grunnleggende" },
    { name: "90 Minutter", price: "165", info: "Fredager", description: "Viderekomne & Teknikk" },
    { name: "Privat / Gruppe", price: "Avtale", info: "Individuell", description: "Skreddersydd opplegg" }
  ];

  const toggleCard = (index: number) => {
    if (successStates[index]) return;
    setFlippedStates(prev => ({ ...prev, [index]: !prev[index] }));
    if (!flippedStates[index]) {
      setActiveCardIndex(index);
    }
  };

  const resetCards = () => {
    setFlippedStates({ 0: false, 1: false, 2: false });
    setSuccessStates({ 0: false, 1: false, 2: false });
    setActiveCardIndex(null);
  };

  const handleVippsClick = (index: number) => {
    const plan = pricingData[index];
    setActiveCardIndex(index);

    // Копіюємо суму одразу
    if (plan.price !== "Avtale") {
      navigator.clipboard.writeText(plan.price).catch(() => {
        const el = document.createElement('textarea');
        el.value = plan.price;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      });
    }

    // 1. ЗАЙТРИМКА 0.5 СЕКУНДИ ДЛЯ ЕФЕКТУ НАТИСНУТОЇ КНОПКИ
    setTimeout(() => {
      setSuccessStates(prev => ({ ...prev, [index]: true }));

      const bizPhone = "4798148210";
      const priceValue = parseInt(plan.price);
      
      let vippsUrl;
      if (!isNaN(priceValue)) {
        const amountInOre = priceValue * 100;
        vippsUrl = `https://qr.vipps.no/28/2/01/031/${bizPhone}?v=2&a=${amountInOre}`;
      } else {
        vippsUrl = `https://qr.vipps.no/28/2/01/031/${bizPhone}?v=1`;
      }

      // 2. ЗАЙТРИМКА 3 СЕКУНДИ ПЕРЕД ПЕРЕХОДОМ У VIPPS
      setTimeout(() => {
        window.location.assign(vippsUrl);
      }, 3000);
    }, 500); 
  };

  const isAnyCardFlipped = Object.values(flippedStates).some(state => state);

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-visible">
      <style>{`
        @keyframes softFlow {
          0% { transform: translate(-60%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-40%, -50%) scale(1.2); opacity: 0.9; }
          100% { transform: translate(-60%, -50%) scale(1); opacity: 0.6; }
        }
        @keyframes strongFlow {
          0% { transform: translate(-55%, -50%) scale(1.1); opacity: 0.8; }
          50% { transform: translate(-45%, -50%) scale(1.35); opacity: 1; }
          100% { transform: translate(-55%, -50%) scale(1.1); opacity: 0.8; }
        }
        @keyframes heartBeatGlow {
          0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255,255,255,0.4)); }
          25% { transform: scale(1.3); filter: drop-shadow(0 0 20px rgba(255,255,255,0.8)); }
          40% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(255,255,255,0.6)); }
          60% { transform: scale(1.4); filter: drop-shadow(0 0 25px rgba(255,255,255,0.9)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(255,255,255,0.4)); }
        }
        .animate-heart-glow { animation: heartBeatGlow 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        
        .glass-btn-base {
          position: relative; overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          gap: 10px; cursor: pointer;
        }
        .glass-btn-base::before {
          content: ''; position: absolute; top: 50%; left: 50%;
          width: 180%; height: 180%; background: var(--glow-gradient);
          z-index: 1; pointer-events: none;
          animation: softFlow 4s ease-in-out infinite;
        }
        
        .glass-btn-base:hover:not(:disabled) {
          transform: scale(0.98) translateY(2px); filter: brightness(1.2);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .pricing-active-state {
          transform: scale(0.95) translateY(4px) !important;
          box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.6) !important;
          filter: brightness(0.9);
        }

        .btn-content { position: relative; z-index: 10; display: flex; align-items: center; gap: 10px; font-weight: 700; }
        
        .btn-brand-pricing { 
          background: rgba(255, 255, 255, 0.1);
          --glow-gradient: radial-gradient(circle, #EA4335 0%, #FBBC05 45%, #f97316 70%, transparent 85%); 
          --border-color: rgba(255, 255, 255, 0.3); color: white;
        }

        .btn-pay-orange { 
          background: rgba(234, 67, 53, 0.1);
          --glow-gradient: radial-gradient(circle, #EA4335 0%, #f97316 40%, #FBBC05 70%, transparent 90%); 
          border: 1px solid rgba(234, 67, 53, 0.4); color: white;
        }
        .btn-pay-orange::before { animation: strongFlow 3s ease-in-out infinite; opacity: 0.95; width: 200%; height: 200%; }
        
        .btn-booking-green {
          background: rgba(255, 255, 255, 0.05);
          --glow-gradient: radial-gradient(circle, #fbbc05 0%, #22c55e 40%, transparent 70%); 
          --border-color: rgba(34, 197, 94, 0.5); color: white;
        }

        .text-soft-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.3); }
        .glass-success-overlay {
          position: absolute; inset: 0; background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          z-index: 40; display: flex; flex-direction: column; align-items: center; text-align: center;
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-6xl w-full z-10 flex flex-col items-center text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight drop-shadow-lg text-white">Priser</h2>
          <p className="text-xl text-white/80 text-center font-normal">Betaling kan gjøres på forhånd eller etter timen ved oppmøte.</p>
        </div>

        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-3xl rounded-[50px] border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          {pricingData.map((plan, index) => {
            const isFlipped = flippedStates[index];
            const isSuccess = successStates[index];
            const isActive = activeCardIndex === index;
            
            let cardClasses = isFlipped 
              ? (isActive ? "bg-white opacity-100 z-10 shadow-lg text-black" : "bg-white/85 backdrop-blur-md z-0 text-black")
              : "bg-transparent hover:bg-white/5 text-white";

            return (
              <div key={index} className={`relative flex-1 min-h-[480px] md:min-h-[500px] flex flex-col items-center justify-center p-8 transition-all duration-300 ${index !== pricingData.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''} ${cardClasses}`}>
                
                {isSuccess && (
                  <div className="glass-success-overlay p-8 animate-in fade-in zoom-in duration-500 text-white">
                    <div className="h-32 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white fill-white animate-heart-glow" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h3 className="text-6xl font-black tracking-tighter text-white text-soft-shadow">Takk!</h3>
                        <p className="text-white font-black text-lg text-soft-shadow leading-tight mt-2 whitespace-nowrap">
                          Vi gleder oss til å se deg!
                        </p>
                    </div>

                    <div className="w-full h-[112px] flex flex-col items-center justify-center mb-8">
                        <div className="h-[44px] flex flex-col items-center justify-center">
                           <p className="text-black font-bold text-[10px] uppercase tracking-widest leading-none opacity-60">Sum kopiert!</p>
                           <p className="text-black font-black text-xs leading-none mt-1 uppercase">Lim inn i Vipps</p>
                        </div>
                        <div className="h-3" />
                        <div className="h-[56px] w-full flex items-center justify-center">
                           <p className="text-black font-bold text-sm uppercase flex items-center gap-2">
                              <Check className="w-4 h-4" /> Åpner Vipps app...
                           </p>
                        </div>
                    </div>
                  </div>
                )}

                <div className={`w-full h-full flex flex-col items-center text-center justify-between transition-all duration-500 ${isSuccess ? 'scale-95 blur-[1px]' : ''}`}>
                  <div className="w-full flex flex-col items-center">
                    <div className="h-8 flex items-center justify-center text-[#22c55e]">
                      <span className="font-bold tracking-widest uppercase text-[10px]">{plan.info}</span>
                    </div>
                    <div className="h-14 flex items-center justify-center">
                      <h3 className="text-2xl font-bold tracking-tight">{plan.name}</h3>
                    </div>
                    <div className="h-10 flex items-center justify-center text-xs uppercase opacity-60">
                      {plan.description}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center py-6">
                    <span className="text-6xl font-bold tracking-tighter">{plan.price}</span>
                    <span className={`text-lg mt-2 font-bold uppercase tracking-widest ${isFlipped ? 'text-black/40' : 'text-[#22c55e]'}`}>{plan.price === "Avtale" ? "Pris" : "NOK"}</span>
                  </div>

                  <div className="w-full h-[100px] flex flex-col items-center justify-end relative z-10">
                    {!isFlipped ? (
                      <button onClick={(e) => { e.stopPropagation(); toggleCard(index); }} className={`glass-btn-base btn-brand-pricing w-full h-[56px] rounded-full font-bold text-lg ${flippedStates[index] ? 'pricing-active-state' : ''}`}>
                        <span className="btn-content"><CreditCard className="w-5 h-5" /> Vipps nå</span>
                      </button>
                    ) : (
                      <div className="w-full flex flex-col items-center gap-3">
                        <div className="p-2 bg-black/5 rounded-xl h-[44px] w-full flex flex-col items-center justify-center text-black">
                          <p className="text-[9px] font-bold text-black/40 uppercase leading-none">Vippsnummer</p>
                          <p className="text-sm font-mono font-black text-black leading-none mt-1">#981 48 210</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); handleVippsClick(index); }} className={`glass-btn-base btn-pay-orange h-[56px] text-sm w-full rounded-full font-bold ${successStates[index] ? 'pricing-active-state' : ''}`}>
                          <span className="btn-content"><CreditCard className="w-4 h-4" /> Betal {plan.price} NOK</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-16 flex items-center justify-center w-full mt-6">
          {isAnyCardFlipped && (
            <button onClick={resetCards} className="text-white/40 hover:text-white transition-all text-[11px] font-bold uppercase tracking-[0.3em]">Nullstill valg</button>
          )}
        </div>

        <div className="mt-4 text-center">
          <a href="#booking" className="glass-btn-base btn-booking-green inline-flex py-4 px-12 rounded-full no-underline">
            <span className="btn-content font-bold text-sm md:text-base text-white">
              Vil du prøve først? Meld deg på gratis prøvetime her <ArrowDown className="w-5 h-5 animate-bounce text-[#22c55e]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}