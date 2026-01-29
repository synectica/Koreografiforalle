"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Heart, Check, ArrowRight } from "lucide-react";

let activeSliderId: string | null = null;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setName(localStorage.getItem("user_name") || "");
      setEmail(localStorage.getItem("user_email") || "");
    };
    window.addEventListener("local-data-update", handleStorage);
    handleStorage();
    return () => window.removeEventListener("local-data-update", handleStorage);
  }, []);

  const handleChange = (field: "name" | "email", value: string) => {
    localStorage.setItem(`user_${field}`, value);
    if (field === "name") setName(value); else setEmail(value);
    window.dispatchEvent(new Event("local-data-update"));
  };

  const executeSubmit = async () => {
    if (isSubmitting || !message) return;
    setIsSubmitting(true);
    const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/r5j6ds9yaef9sct9a8cyg1hkvkwnh501";
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, message, recipient: "vikgerasimenco@gmail.com" })
      });
      setSubmitted(true);
      setMessage("");
    } catch (err) { setSubmitted(true); } finally { setIsSubmitting(false); }
  };

  const handleReset = () => {
    setSubmitted(false);
    activeSliderId = null;
  };

  return (
    <section id="contact" className="relative w-full flex flex-col items-center justify-center min-h-[100dvh] py-12 px-4 bg-transparent overflow-visible">
      <style>{`
        .slider-wrapper {
          position: relative; width: 100%; height: 60px;
          background: rgba(255, 255, 255, 0.05); border-radius: 9999px;
          overflow: hidden; padding: 4px; border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .slider-text-base {
          position: absolute; inset: 0; z-index: 2;
          display: flex; align-items: center; justify-content: center; pointer-events: none;
        }
        .glass-fill {
          position: absolute; left: 4px; top: 4px; bottom: 4px;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
          border-radius: 9999px; z-index: 5;
        }
        .thumb-element {
          position: absolute; width: 52px; height: 52px; border-radius: 50%;
          background: white; z-index: 40; display: flex; align-items: center;
          justify-content: center; cursor: grab; box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          touch-action: none;
        }
      `}</style>
      
      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Kontakt meg
        </h2>
        
        <div className={`transition-opacity duration-500 mb-6 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl text-white/80 text-center font-normal">
            Ta gjerne kontakt hvis du har spørsmål
          </p>
        </div>
        
        {/* ФІКСОВАНА ВИСОТА КОНТЕЙНЕРА */}
        <div className="relative w-full h-[580px]">
          
          {/* КАРТКА ФОРМИ */}
          <div className={`absolute inset-0 w-full h-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col transition-all duration-500 ${submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'}`}>
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Navn" required value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-14 px-6 bg-white border-transparent rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-[#1877F2]" />
                  <input type="email" placeholder="E-post" required value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-14 px-6 bg-white border-transparent rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-[#1877F2]" />
                </div>
                <div className="relative flex-1 flex flex-col">
                  <textarea placeholder="Melding" required maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-6 bg-white border-transparent rounded-[32px] text-gray-900 flex-1 resize-none outline-none focus:ring-2 focus:ring-[#1877F2]" />
                  <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{message.length} / 200</div>
                </div>
              </div>

              <div className="w-full mt-6">
                <ContactSlider id="contact-submit" beforeLabel={!message ? "Skriv melding" : isSubmitting ? "Sender..." : "Skyv for å sende"} afterLabel="Sender..." activeColor="#1877F2" icon={<ArrowRight className="w-5 h-5" />} disabled={!message || isSubmitting} onComplete={executeSubmit} isFormSubmitted={submitted} />
              </div>
            </div>
          </div>

          {/* КАРТКА ПОДЯКИ - ТОЧНИЙ КЛОН РОЗМІРУ */}
          <div className={`absolute inset-0 w-full h-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col items-center transition-all duration-500 ${!submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-20'}`}>
            <div className="flex flex-col items-center justify-center flex-1">
              <Heart className="w-20 h-20 text-[#1877F2] fill-[#1877F2] mb-8 animate-pulse" />
              <h3 className="text-6xl md:text-7xl font-black text-white uppercase leading-none mb-6 tracking-tighter">Takk!</h3>
              <p className="text-white font-extrabold text-xl leading-relaxed max-w-md drop-shadow-sm uppercase">
                Meldingen din er sendt.
              </p>
            </div>
            
            {/* СЛАЙДЕР В ТОМУ Ж МІСЦІ */}
            <div className="w-full mt-6">
              <ContactSlider id="contact-reset" beforeLabel="Send en ny melding" afterLabel="Vennligst vent..." activeColor="#1877F2" icon={<Check className="w-5 h-5" />} onComplete={handleReset} isFormSubmitted={submitted} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactSlider({ id, beforeLabel, afterLabel, activeColor, icon, onComplete, disabled = false, isFormSubmitted }: any) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const posRef = useRef(0);

  useEffect(() => {
    if (!isFormSubmitted || id === 'contact-reset') {
      setPosition(0);
      posRef.current = 0;
    }
  }, [isFormSubmitted, id]);

  const handleStart = () => { if (!disabled && activeSliderId === null) { setIsDragging(true); activeSliderId = id; } };

  useEffect(() => {
    const handleMove = (e: any) => {
      if (!isDragging || activeSliderId !== id || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left - 28;
      const max = rect.width - 60;
      const newPos = Math.max(0, Math.min(x, max));
      posRef.current = newPos; setPosition(newPos);
    };
    const handleEnd = () => {
      if (!isDragging || activeSliderId !== id) return;
      setIsDragging(false); activeSliderId = null;
      const max = containerRef.current!.offsetWidth - 60;
      if (posRef.current >= max * 0.9) { setPosition(max); onComplete(); }
      else { setPosition(0); posRef.current = 0; }
    };
    window.addEventListener("mousemove", handleMove); window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove); window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove); window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, id, onComplete]);

  const textStyle = { fontWeight: 800, textTransform: 'uppercase' as const, fontSize: '10px', letterSpacing: '1px' };

  return (
    <div ref={containerRef} className={`slider-wrapper ${disabled ? 'opacity-20 grayscale pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}>
      <div className="slider-text-base absolute inset-0 flex items-center justify-center pointer-events-none">
        <span style={{...textStyle, color: 'white'}}>{beforeLabel}</span>
      </div>
      <div className="glass-fill" style={{ width: position + 52, transition: isDragging ? 'none' : '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span style={{ color: activeColor, opacity: position > 100 ? 1 : 0, transition: '0.2s', ...textStyle }}>{afterLabel}</span>
      </div>
      <div className="thumb-element" onMouseDown={handleStart} onTouchStart={handleStart} style={{ left: position + 4, transition: isDragging ? 'none' : '0.4s', color: activeColor }}>
        {icon}
      </div>
    </div>
  );
}