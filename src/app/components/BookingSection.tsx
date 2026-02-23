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

  // СУВОРА ВАЛІДАЦІЯ
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
    const timeRange = isTuesday ? "15:00 - 16:00" : "16:00 - 17:30";
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
      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Book en gratis prøvetime
        </h2>
        
        <div className={`transition-opacity duration-500 mb-6 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl text-white/80 text-center font-normal">Velg en dato og fyll ut skjemaet</p>
        </div>
        
        <div className="relative w-full min-h-[650px]">
          <div className={`w-full h-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col transition-all duration-500 ${submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'} relative`}>
            <div className="flex flex-col h-full justify-between gap-6">
              
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
                    label="Fredag 16:00 - 17:30" 
                    activeLabel="Fredag valgt"
                    activeColor="#22c55e" 
                    icon={<Calendar className="w-5 h-5" />} 
                    isActive={activeFilter === 'friday'} 
                    onClick={() => { setActiveFilter('friday'); setSelectedDate(null); }} 
                  />
              </div>

              {/* КАЛЕНДАР */}
              <div className="w-full pt-2 text-center flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center w-full px-2 mb-4">
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-white hover:opacity-50 transition-opacity"><ChevronLeft/></button>
                      <span className="font-bold text-sm text-white capitalize tracking-widest">{monthName} {year}</span>
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-white hover:opacity-50 transition-opacity"><ChevronRight/></button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                      <div key={d} className="text-[10px] font-black uppercase text-white/30 text-center">{d}</div>
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
                                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all relative
                                          ${isSelected ? 'bg-[#22c55e] text-white shadow-none' : 
                                            isToday ? 'bg-white text-black ring-2 ring-white/50' : 
                                            isAvailable ? 'text-white border border-white/20 hover:bg-white/10' : 'text-white/10'}`}>
                                      {dateObj.getDate()}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
              </div>

              {/* ПОЛЯ ВВОДУ */}
              <div className="flex flex-col gap-3">
                <input type="text" placeholder="Galyna Gerasymenko" value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white text-base outline-none focus:border-white/40 transition-all placeholder:text-white/20" />
                <input type="email" placeholder="navn@eksempel.no" value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white text-base outline-none focus:border-white/40 transition-all placeholder:text-white/20" />
                <input type="tel" placeholder="+47 900 00 000" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white text-base outline-none focus:border-white/40 transition-all placeholder:text-white/20" />
                
                {/* КНОПКА З КОЛЬОРОВИМ ТЕКСТОМ */}
                <button 
                  disabled={buttonState.disabled || isSubmitting}
                  onClick={executeSubmit}
                  className={`h-14 w-full rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 transition-all duration-300
                  ${buttonState.disabled || isSubmitting 
                    ? 'bg-white/5 text-[#ef4444] border border-white/10 cursor-not-allowed' // ЧЕРВОНИЙ ТЕКСТ ЯКЩО НЕАКТИВНА
                    : 'bg-white text-[#22c55e] border border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-95' // ЗЕЛЕНИЙ ТЕКСТ ЯКЩО АКТИВНА
                  }`}
                >
                  {isSubmitting ? "Sender..." : buttonState.label}
                  <ArrowRight className={`w-5 h-5 transition-colors ${buttonState.disabled ? 'text-[#ef4444]' : 'text-[#22c55e]'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* SUCCESS SCREEN */}
          <div className={`w-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col items-center justify-between text-center transition-all duration-500 absolute inset-0 ${!submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-20'}`}>
                <div className="flex flex-col items-center justify-center flex-1">
                  <Heart className="w-16 h-16 text-[#22c55e] fill-[#22c55e] mb-6 animate-pulse" />
                  <h3 className="text-6xl md:text-7xl font-black text-white leading-none mb-4 tracking-tighter">
                    Takk!
                  </h3>
                  <p className="text-white/80 font-bold text-xl mb-8">Din prøvetime er booket:</p>
                  <div className="bg-white/10 rounded-[32px] py-8 px-10 border border-white/20 backdrop-blur-xl w-full max-w-md">
                    <span className="text-white font-black text-2xl md:text-3xl block mb-2">{finalDetails.day}</span>
                    <span className="text-white/90 font-bold text-xl block tracking-widest leading-none">kl. {finalDetails.time}</span>
                  </div>
                </div>
                
                <div className="w-full mt-6">
                  <button 
                    onClick={handleReset}
                    className="h-14 w-full bg-white text-[#22c55e] rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform"
                  >
                    <Check className="w-5 h-5" />
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
        ? 'bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)]' 
        : 'bg-white/5 text-white border-white/10 hover:bg-white/10 active:scale-95'
      } ${disabled ? 'opacity-20 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} style={{ color: isActive ? activeColor : 'inherit' }}>
        {icon}
      </div>
      <span className="font-black uppercase text-[11px] tracking-[1.5px] whitespace-nowrap">
        {isActive ? activeLabel : label}
      </span>
      {isActive && (
        <div className="absolute inset-0 bg-white/20 blur-xl pointer-events-none" />
      )}
    </button>
  );
}