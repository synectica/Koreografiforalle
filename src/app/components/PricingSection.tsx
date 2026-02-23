"use client";
import React, { useState } from "react";
import { CreditCard, Heart, ArrowRight } from "lucide-react";

export function PricingSection({ lang }: { lang: string }) {
  const [successStates, setSuccessStates] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });

  const pricingData = [
    { name: "60 Minutter", price: "110", info: "Tirsdager", description: "Nybegynnere & Grunnleggende" },
    { name: "90 Minutter", price: "165", info: "Fredager", description: "Viderekomne & Teknikk" },
    { name: "Privat / Gruppe", price: "Avtale", info: "Individuell", description: "Skreddersydd opplegg" }
  ];

  const handlePayment = (index: number) => {
    setSuccessStates(prev => ({ ...prev, [index]: true }));
    
    const vippsUrl = `https://qr.vipps.no/28/2/01/031/4798148210?v=1`;
    window.location.href = vippsUrl;

    setTimeout(() => {
      setSuccessStates(prev => ({ ...prev, [index]: false }));
    }, 10000);
  };

  const handleBookingScroll = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 relative flex flex-col items-center justify-center min-h-screen bg-transparent font-sans text-white">
      <style>{`
        .btn-premium {
          width: 100%;
          height: 64px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 13px;
          transition: all 0.2s ease;
          position: relative;
          border: none;
          cursor: pointer;
        }
        /* БІЛА КНОПКА VIPPS */
        .btn-white-vipps {
          background-color: #ffffff;
          color: #000000;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        /* ЕФЕКТ ВНУТРІШНЬОЇ ТІНІ ПРИ НАТИСКАННІ */
        .btn-white-vipps:active {
          transform: scale(0.98);
          background-color: #ffffff;
          box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2);
        }
        .btn-booking {
          background-color: #22c55e;
          color: white;
          box-shadow: 0 10px 20px rgba(34, 197, 94, 0.2);
        }
        .btn-booking:active {
          transform: scale(0.96);
          box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight capitalize text-white">Priser</h2>
          <p className="text-xl text-white/80 text-center font-normal">Betaling kan gjøres på forhånd eller etter timen ved oppmөте.</p>
        </div>

        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-3xl rounded-[50px] border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          {pricingData.map((plan, index) => {
            const isSuccess = successStates[index];

            return (
              <div 
                key={index} 
                className={`relative flex-1 min-h-[500px] flex flex-col items-center justify-between p-8 ${index !== pricingData.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
              >
                {isSuccess && (
                  <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <Heart className="w-16 h-16 text-[#f97316] fill-[#f97316] mb-8" />
                    <h3 className="text-7xl font-bold tracking-tighter text-black uppercase leading-none">TAKK!</h3>
                    <p className="text-black text-lg font-bold uppercase tracking-widest mt-6">ÅPNER VIPPS...</p>
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
                  <button 
                    onClick={() => handlePayment(index)}
                    className="btn-premium btn-white-vipps"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>{plan.price === "Avtale" ? "BETAL" : `BETAL ${plan.price}`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 w-full max-w-[340px] px-4">
           <button 
             onClick={handleBookingScroll}
             className="btn-premium btn-booking"
           >
             <span>Meld deg på prøvetime</span>
             <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </section>
  );
}