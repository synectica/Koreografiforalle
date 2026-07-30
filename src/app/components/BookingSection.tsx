"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Calendar, ArrowRight, Check } from "lucide-react";

export function BookingSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [finalDetails, setFinalDetails] = useState({ day: "", time: "" });
  
  const [currentMonth, setCurrentMonth] = useState(new Date()); 
  
  const [activeFilter, setActiveFilter] = useState<"tuesday" | "friday" | null>(null);
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

  const { days, monthName, year } = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const shift = firstDay === 0 ? 6 : firstDay - 1;
    const calendarDays = [];
    for (let i = 0; i < shift; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(new Date(y, m, d));
    return { days: calendarDays, monthName: currentMonth.toLocaleString('no-NO', { month: 'long' }), year: y };
  }, [currentMonth]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isNameValid = name.trim().split(/\s+/).length >= 2; 
  const isPhoneValid = phone.replace(/\s/g, "").length >= 8;

  const getButtonState = () => {
    if (!activeFilter) return { label: "Velg ukedag", disabled: true };
    if (!selectedDate) return { label: "Velg dato i kalenderen", disabled: true };
    if (!isNameValid) return { label: "Skriv fullt navn", disabled: true };
    if (!isEmailValid) return { label: "Ugyldig e-post", disabled: true };
    if (!isPhoneValid) return { label: "Oppgi telefonnummer", disabled: true };
    return { label: "Book prøvetime nå", disabled: false };
  };

  const buttonState = getButtonState();

  const executeSubmit = async () => {
    if (buttonState.disabled || isSubmitting) return;
    setIsSubmitting(true);
    const isTuesday = selectedDate!.getDay() === 2;
    const timeRange = isTuesday ? "15:00 - 16:00" : "15:30 - 17:00";
    const formattedDay = `${isTuesday ? "Tirsdag" : "Fredag"} ${selectedDate!.toLocaleDateString('no-NO')}`;
    setFinalDetails({ day: formattedDay, time: timeRange });

    try {
      await fetch("https://hook.eu1.make.com/r5j6ds9yaef9sct9a8cyg1hkvkwnh501", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", name, email, phone, date: formattedDay, time: timeRange, recipient: "vikgerasimenco@gmail.com" }),
      });
      setSubmitted(true);
    } catch (error) { setSubmitted(true); } finally { setIsSubmitting(false); }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedDate(null);
    setActiveFilter(null);
    setPhone("");
  };

  return (
    <section id="booking" className="relative w-full flex flex-col items-center min-h-screen py-20 px-4 bg-transparent overflow-hidden">
      
      <style>{`
        .optimized-gpu-layer {
          transform: translate3d(0,0,0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          isolation: isolate;
        }

        @keyframes softGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .light-frosted-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(34,197,94,0.15) 50%, rgba(255,255,255,0.6) 100%);
          background-size: 200% 200%;
          animation: softGradient 8s ease infinite;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
        }
      `}</style>

      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Book en gratis prøvetime
        </h2>
        
        <div className={`transition-opacity duration-500 mb-6 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl text-white/90 text-center font-medium drop-shadow-md">Velg en dato og fyll ut skjemaet</p>
        </div>
        
        <div className="relative w-full min-h-[650px] optimized-gpu-layer">
          
          {/* ФОРМА */}
          <div className={`w-full h-full light-frosted-glass rounded-[40px] p-6 md:p-10 flex flex-col transition-all duration-500 ${submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'} relative`}>
            <div className="flex flex-col h-full justify-between gap-6 relative z-10">
              
              <div className="flex flex-col gap-3">
                  <BookingButton 
                    label="Tirsdag 15:00 - 16:00" 
                    activeLabel="Tirsdag valgt"
                    activeColor="#22c55e" 
                    icon={<Calendar className="w-5 h-5" />} 
                    isActive={activeFilter === 'tuesday'} 
                    onClick={() => { setActiveFilter('tuesday'); setSelectedDate(null); }} 
                  />
                  <BookingButton 
                    label="Fredag 15:30 - 17:00" 
                    activeLabel="Fredag valgt"
                    activeColor="#22c55e" 
                    icon={<Calendar className="w-5 h-5" />} 
                    isActive={activeFilter === 'friday'} 
                    onClick={() => { setActiveFilter('friday'); setSelectedDate(null); }} 
                  />
              </div>

              {/* КАЛЕНДАР */}
              <div className="w-full mt-2 p-5 rounded-[24px] text-center flex-1 flex flex-col justify-center bg-white/40 border border-white/60 shadow-sm">
                  <div className="flex justify-between items-center w-full px-2 mb-4">
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-black hover:opacity-50 p-1 transition-opacity"><ChevronLeft/></button>
                      <span className="font-black text-base text-black capitalize tracking-widest">{monthName} {year}</span>
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-black hover:opacity-50 p-1 transition-opacity"><ChevronRight/></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                      <div key={d} className="text-[11px] font-black uppercase text-black/70 text-center">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                      {days.map((dateObj, i) => {
                          if (!dateObj) return <div key={i} className="h-10" />;
                          const isAvailable = (dateObj.getDay() === 2 && activeFilter === 'tuesday') || (dateObj.getDay() === 5 && activeFilter === 'friday');
                          const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
                          const isToday = dateObj.toDateString() === new Date().toDateString();

                          return (
                              <div key={i} className="flex items-center justify-center h-10">
                                  <button type="button" disabled={!isAvailable} onClick={() => setSelectedDate(dateObj)}
                                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                                          ${isSelected ? 'bg-[#22c55e] text-white shadow-md scale-110' : 
                                            isToday ? 'bg-transparent text-black ring-2 ring-black' : 
                                            isAvailable ? 'text-black border border-black/20 hover:bg-black/10 hover:border-black/40' : 'text-black/40'}`}>
                                      {dateObj.getDate()}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
                  
                  {/* ПОВІДОМЛЕННЯ ПРО ГРАФІК */}
                  <div className="mt-5 pt-3 border-t border-black/20">
                      <p className="text-black text-[11px] font-black uppercase tracking-[1.5px]">
                         Tidsplanen gjelder fra 7. august 2026
                      </p>
                  </div>
              </div>

              {/* ПОЛЯ ВВОДУ */}
              <div className="flex flex-col gap-3 mt-2">
                <input type="text" placeholder="Galyna Gerasymenko" value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-14 px-6 bg-white/70 border border-white/80 rounded-full text-black font-semibold text-base outline-none focus:border-black/50 transition-all placeholder:text-black/60 shadow-inner" />
                <input type="email" placeholder="navn@eksempel.no" value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-14 px-6 bg-white/70 border border-white/80 rounded-full text-black font-semibold text-base outline-none focus:border-black/50 transition-all placeholder:text-black/60 shadow-inner" />
                <input type="tel" placeholder="+47 900 00 000" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14 px-6 bg-white/70 border border-white/80 rounded-full text-black font-semibold text-base outline-none focus:border-black/50 transition-all placeholder:text-black/60 shadow-inner" />
                
                <button 
                  disabled={buttonState.disabled || isSubmitting}
                  onClick={executeSubmit}
                  className={`h-14 w-full rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 transition-all duration-300 mt-2
                  ${buttonState.disabled || isSubmitting 
                    ? 'bg-black/10 text-red-600 border border-black/10 cursor-not-allowed' 
                    : 'bg-black text-white hover:scale-[1.02] active:scale-95 shadow-xl' 
                  }`}
                >
                  {isSubmitting ? "Sender..." : buttonState.label}
                  <ArrowRight className={`w-5 h-5 transition-colors ${buttonState.disabled ? 'text-red-600' : 'text-[#22c55e]'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ЕКРАН УСПІХУ */}
          <div className={`w-full light-frosted-glass rounded-[40px] p-6 md:p-10 flex flex-col items-center justify-between text-center transition-all duration-500 absolute inset-0 ${!submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-20'}`}>
                <div className="flex flex-col items-center justify-center flex-1 relative z-10 w-full">
                  <Heart className="w-16 h-16 text-[#22c55e] fill-[#22c55e] mb-6 animate-pulse" />
                  <h3 className="text-6xl md:text-7xl font-black text-black leading-none mb-4 tracking-tighter">
                    Takk!
                  </h3>
                  <p className="text-black font-bold text-xl mb-8">Din prøvetime er booket:</p>
                  <div className="bg-white/60 rounded-[32px] py-8 px-10 border border-white/80 shadow-sm w-full max-w-md">
                    <span className="text-black font-black text-2xl md:text-3xl block mb-2">{finalDetails.day}</span>
                    <span className="text-black/90 font-bold text-xl block tracking-widest leading-none">kl. {finalDetails.time}</span>
                  </div>
                </div>
                
                <div className="w-full mt-6 relative z-10">
                  <button 
                    onClick={handleReset}
                    className="h-14 w-full bg-black text-white rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  >
                    <Check className="w-5 h-5 text-[#22c55e]" />
                    Bestill en ny time
                  </button>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingButton({ label, activeLabel, activeColor, icon, isActive, onClick, disabled }: any) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`relative w-full h-[60px] rounded-full border transition-all duration-300 flex items-center justify-center gap-3 px-6 overflow-hidden group
      ${isActive 
        ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(0,0,0,0.1)]' 
        : 'bg-white/40 text-black border-white/60 hover:bg-white/60 active:scale-95'
      } ${disabled ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} style={{ color: isActive ? activeColor : 'inherit' }}>
        {icon}
      </div>
      <span className="font-black uppercase text-[11px] tracking-[1.5px] whitespace-nowrap">
        {isActive ? activeLabel : label}
      </span>
    </button>
  );
}
