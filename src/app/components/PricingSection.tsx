"use client";
import React, { useState, useRef, useEffect } from "react";
import { CreditCard, Heart } from "lucide-react";

let activeSliderId: string | null = null;

export function PricingSection({ lang }: { lang: string }) {
  const [successStates, setSuccessStates] = useState<{ [key: number]: boolean }>({ 0: false, 1: false, 2: false });
  const [sliderVals, setSliderVals] = useState<{ [key: number]: number }>({ 0: 0, 1: 0, 2: 0 });

  const pricingData = [
    { name: "60 Minutter", price: "110", info: "Tirsdager", description: "Nybegynnere & Grunnleggende" },
    { name: "90 Minutter", price: "165", info: "Fredager", description: "Viderekomne & Teknikk" },
    { name: "Privat / Gruppe", price: "Avtale", info: "Individuell", description: "Skreddersydd opplegg" }
  ];

  const resetCard = (index: number) => {
    setSuccessStates(prev => ({ ...prev, [index]: false }));
    setSliderVals(prev => ({ ...prev, [index]: 0 }));
  };

  return (
    <section id="pricing" className="py-20 md:py-24 px-4 relative flex flex-col items-center justify-center min-h-screen bg-transparent font-sans text-white">
      <style>{`
        .slider-wrapper {
          position: relative; width: 100%; height: 64px;
          background: rgba(255, 255, 255, 0.08); border-radius: 9999px;
          overflow: hidden; padding: 4px; border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          user-select: none; -webkit-user-select: none;
        }
        .slider-text-base {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }
        .glass-fill {
          position: absolute; left: 4px; top: 4px; bottom: 4px;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
          border-radius: 9999px; z-index: 5;
          pointer-events: none;
        }
        .slider-text-active {
          position: absolute; inset: 0; z-index: 10;
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }
        .thumb-element {
          position: absolute; width: 56px; height: 56px; border-radius: 9999px;
          background: white; z-index: 40; display: flex; align-items: center;
          justify-content: center; cursor: grab; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
          touch-action: none;
        }
      `}</style>

      <div className="max-w-6xl w-full z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight capitalize text-white">Priser</h2>
          <p className="text-xl text-white/80 text-center font-normal">Betaling kan gjøres på forhånd eller etter timen ved oppmөte.</p>
        </div>

        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-3xl rounded-[50px] border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
          {pricingData.map((plan, index) => {
            const isSuccess = successStates[index];
            const currentVal = sliderVals[index];
            const cardOpacity = currentVal / 100;

            return (
              <div 
                key={index} 
                className={`relative flex-1 min-h-[520px] flex flex-col items-center justify-between p-8 ${index !== pricingData.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}
                style={{ 
                  backgroundColor: `rgba(255, 255, 255, ${cardOpacity})`,
                  color: currentVal > 50 ? 'black' : 'white',
                  transition: 'background-color 0.1s linear, color 0.2s ease'
                }}
              >
                {isSuccess && (
                  <div className="absolute inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <Heart className="w-16 h-16 text-[#f97316] fill-[#f97316] mb-6" />
                    <h3 className="text-7xl font-bold tracking-tighter text-black uppercase leading-none">TAKK!</h3>
                    <p className="text-black text-lg font-bold uppercase tracking-widest mt-6">Åpner Vipps...</p>
                  </div>
                )}

                <div className="w-full flex flex-col items-center h-24 justify-center">
                  <span className="font-bold tracking-widest uppercase text-[10px] mb-2" style={{ color: '#f97316' }}>{plan.info}</span>
                  <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase text-center">{plan.name}</h3>
                  <p className="text-[10px] uppercase opacity-60 tracking-widest font-bold text-center h-4">{plan.description}</p>
                </div>

                <div className="flex flex-col items-center py-6 min-h-[160px] justify-center">
                  <span className="text-7xl font-bold tracking-tighter leading-none">{plan.price}</span>
                  <span className="text-lg font-bold uppercase tracking-widest mt-2" style={{ color: '#f97316' }}>{plan.price === "Avtale" ? "Pris" : "NOK"}</span>
                </div>

                <div className="w-full h-24 flex flex-col justify-end">
                  <ManualSlider 
                    id={`slider-card-${index}`}
                    beforeLabel={plan.price === "Avtale" ? "Betal - Vipps" : `Betal ${plan.price} - Vipps`}
                    afterLabel="Gå til betaling"
                    color="#f97316" 
                    icon={<CreditCard className="w-5 h-5"/>} 
                    isLightMode={currentVal > 50}
                    onValueChange={(v: number) => setSliderVals(prev => ({ ...prev, [index]: v }))}
                    onComplete={() => {
                      setSuccessStates(prev => ({ ...prev, [index]: true }));
                      
                      const userAgent = navigator.userAgent || navigator.vendor;
                      const isiOS = /iPad|iPhone|iPod/.test(userAgent);
                      
                      const phone = "4798148210";
                      const targetUrl = `https://qr.vipps.no/28/2/01/031/${phone}?v=1`;

                      // ДЛЯ IPHONE (iOS) - мінімальна затримка для стабільності
                      // ДЛЯ ANDROID та PC - твої 3 секунди
                      const delay = isiOS ? 500 : 3000;

                      setTimeout(() => { 
                        if (isiOS) {
                          window.location.href = targetUrl;
                        } else {
                          window.location.assign(targetUrl);
                        }
                      }, delay);

                      setTimeout(() => { resetCard(index); }, 8000);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 w-full max-w-[340px]">
           <ManualSlider 
             id="slider-booking-footer"
             beforeLabel="Meld deg på prøvetime" 
             afterLabel="Gå til booking"
             color="#22c55e" 
             icon={<CreditCard className="w-5 h-5"/>} 
             isLightMode={false}
             onValueChange={() => {}}
             onComplete={() => {
               document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
             }}
           />
        </div>
      </div>
    </section>
  );
}

function ManualSlider({ id, beforeLabel, afterLabel, color, icon, onComplete, onValueChange, isLightMode }: any) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(0);

  useEffect(() => {
    if (id === "slider-booking-footer" && position > 0 && !isDragging) {
      const timer = setTimeout(() => { setPosition(0); positionRef.current = 0; onValueChange(0); }, 1000);
      return () => clearTimeout(timer);
    }
  }, [position, isDragging, id, onValueChange]);

  const handleStart = () => { if (activeSliderId !== null) return; activeSliderId = id; setIsDragging(true); };

  useEffect(() => {
    const handleMove = (e: any) => {
      if (!isDragging || activeSliderId !== id || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left - 32;
      const maxPath = rect.width - 64;
      const newPos = Math.max(0, Math.min(x, maxPath));
      positionRef.current = newPos; setPosition(newPos);
      onValueChange((newPos / maxPath) * 100);
    };
    const handleEnd = () => {
      if (!isDragging || activeSliderId !== id) return;
      setIsDragging(false); activeSliderId = null;
      const maxPath = containerRef.current!.offsetWidth - 64;
      if (positionRef.current >= maxPath * 0.95) { 
        setPosition(maxPath); 
        onValueChange(100); 
        setTimeout(() => {
            onComplete();
            setPosition(0);
            positionRef.current = 0;
            onValueChange(0);
        }, 200); 
      }
      else { setPosition(0); positionRef.current = 0; onValueChange(0); }
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMove); window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleMove); window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove); window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, id, onComplete, onValueChange]);

  const textStyle = { fontWeight: 800, textTransform: 'uppercase' as const, fontSize: '11px', letterSpacing: '1px' };

  return (
    <div ref={containerRef} className={`slider-wrapper`}>
      <div className="slider-text-base">
        <span style={{ ...textStyle, color: isLightMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)' }}>{beforeLabel}</span>
      </div>
      <div className="glass-fill" style={{ width: position > 0 ? `${position + 56}px` : 0, transition: isDragging ? 'none' : '0.4s', opacity: position > 0 ? 1 : 0 }} />
      <div className="slider-text-active">
        <span style={{ ...textStyle, color, opacity: position > 120 ? 1 : 0, transition: '0.2s' }}>{afterLabel}</span>
      </div>
      <div className="thumb-element" onMouseDown={handleStart} onTouchStart={handleStart} style={{ left: position + 4, transition: isDragging ? 'none' : '0.4s', color }}>
        {icon}
      </div>
    </div>
  );
}