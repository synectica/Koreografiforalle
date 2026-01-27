"use client";
import React, { useState, useEffect } from "react";
import { Send, Heart } from "lucide-react";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/r5j6ds9yaef9sct9a8cyg1hkvkwnh501";
    try {
      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, message, recipient: "vikgerasimenco@gmail.com" })
      });
      await new Promise(resolve => setTimeout(resolve, 600));
      setSubmitted(true);
      setMessage("");
    } catch (err) { setSubmitted(true); } finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" className="relative py-20 px-4 flex items-center justify-center min-h-[100dvh] bg-transparent overflow-visible">
      <style>{`
        /* ПОТУЖНА ПУЛЬСАЦІЯ З ЦЕНТРУ (СИНЬО-ФІОЛЕТОВА) */
        @keyframes ultraPulseCenterContact {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; filter: blur(30px); }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; filter: blur(20px); }
          100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; filter: blur(30px); }
        }

        .contact-glass-btn-base {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }

        .contact-glass-btn-base::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 250%; height: 250%;
          background: var(--glow-gradient);
          z-index: 1;
          pointer-events: none;
          animation: ultraPulseCenterContact 3.5s ease-in-out infinite;
          transition: all 0.4s ease;
        }

        .contact-glass-btn-base:hover:not(:disabled) {
          transform: scale(0.98) translateY(2px);
          filter: brightness(1.2);
        }

        .contact-glass-btn-base:active:not(:disabled) {
          transform: scale(0.95) translateY(4px);
          box-shadow: inset 0 4px 25px rgba(0, 0, 0, 0.6);
        }

        /* КОЛЬОРИ БЛОКУ КОНТАКТІВ */
        .btn-contact-glow {
          background: rgba(255, 255, 255, 0.12);
          --glow-gradient: radial-gradient(circle, #1877F2 0%, #9d4edd 50%, transparent 80%);
          --border-color: rgba(24, 119, 242, 0.5);
        }

        .btn-content {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 10px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }
      `}</style>
      
      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">Kontakt meg</h2>
        <div className="mb-8">
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            Ta gjerne kontakt hvis du har spørsmål, forslag eller bare vil takke for timen.
          </p>
        </div>
        
        <div className="relative w-full min-h-[500px] flex flex-col">
          <form onSubmit={handleSubmit} className={`bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col flex-1 transition-all duration-500 ${submitted ? 'blur-[2px] brightness-75 scale-95 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Navn" required value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-[56px] px-6 bg-white border-transparent rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-[#1877F2]" />
                <input type="email" placeholder="E-post" required value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-[56px] px-6 bg-white border-transparent rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-[#1877F2]" />
              </div>
              <div className="relative flex-1 flex flex-col">
                <textarea placeholder="Melding" required maxLength={200} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-6 bg-white border-transparent rounded-[32px] text-gray-900 flex-1 min-h-[180px] resize-none outline-none focus:ring-2 focus:ring-[#1877F2]" />
                <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{message.length} / 200</div>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="contact-glass-btn-base btn-contact-glow w-full py-4 rounded-full font-bold text-xl text-white mt-8 shadow-2xl">
              <span className="btn-content">
                {isSubmitting ? "Sender..." : "Send melding"} {!isSubmitting && <Send className="w-5 h-5" />}
              </span>
            </button>
          </form>

          {submitted && (
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-[40px] z-40 flex flex-col p-8 md:p-12 border border-white/10 animate-in fade-in zoom-in duration-500">
              <div className="flex-1 flex flex-col items-center justify-center w-full text-center">
                 <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-white/20 relative">
                    <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
                 </div>
                 <h3 className="text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-md">Takk!</h3>
                 <p className="text-white font-extrabold text-xl leading-relaxed max-w-md drop-shadow-sm">
                   Meldingen din er sendt.
                 </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="contact-glass-btn-base btn-contact-glow w-full max-w-sm py-4 rounded-full font-bold text-xl text-white mt-8 mx-auto shadow-2xl relative z-50">
                <span className="btn-content">Send en ny melding</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}