"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Calendar, ArrowRight, Check } from "lucide-react";

let activeSliderId: string | null = null;

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

  const executeSubmit = async () => {
    if (!selectedDate || isSubmitting) return;
    setIsSubmitting(true);
    const isTuesday = selectedDate.getDay() === 2;
    // ТУТ ЗМІНЕНО ЧАС
    const timeRange = isTuesday ? "15:00 - 16:00" : "16:00 - 17:30";
    const formattedDay = `${isTuesday ? "Tirsdag" : "Fredag"} ${selectedDate.toLocaleDateString('no-NO')}`;
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
    activeSliderId = null;
  };

  return (
    <section id="booking" className="relative w-full flex flex-col items-center justify-center min-h-[100dvh] py-12 px-4 bg-transparent overflow-visible">
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
        }
      `}</style>
      
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
                  <BookingSlider id="tue" beforeLabel="Tirsdag 15:00 - 16:00" afterLabel="Tirsdag valgt" activeColor="#22c55e" icon={<Calendar className="w-4 h-4" />} isActive={activeFilter === 'tuesday'} onComplete={() => { setActiveFilter('tuesday'); setSelectedDate(null); }} isFormSubmitted={submitted} />
                  {/* ТУТ ЗМІНЕНО ЧАС */}
                  <BookingSlider id="fri" beforeLabel="Fredag 16:00 - 17:30" afterLabel="Fredag valgt" activeColor="#22c55e" icon={<Calendar className="w-4 h-4" />} isActive={activeFilter === 'friday'} onComplete={() => { setActiveFilter('friday'); setSelectedDate(null); }} isFormSubmitted={submitted} />
              </div>

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

              <div className="flex flex-col gap-3">
                <input type="text" placeholder="Navn" value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white outline-none focus:border-white/40 transition-all" />
                <input type="email" placeholder="E-post" value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white outline-none focus:border-white/40 transition-all" />
                <input type="tel" placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-14 px-6 bg-white/5 border border-white/10 rounded-full text-white outline-none focus:border-white/40 transition-all" />
                <BookingSlider id="submit" beforeLabel={!selectedDate ? "Velg dato" : isSubmitting ? "Sender..." : "Skyv for å booke"} afterLabel="Bestiller..." activeColor="#22c55e" icon={<ArrowRight className="w-5 h-5" />} disabled={!selectedDate || isSubmitting} onComplete={executeSubmit} isFormSubmitted={submitted} />
              </div>
            </div>
          </div>

          <div className={`w-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col items-center justify-between text-center transition-all duration-500 absolute inset-0 ${!submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-20'}`}>
                <div className="flex flex-col items-center justify-center flex-1">
                  <Heart className="w-16 h-16 text-[#22c55e] fill-[#22c55e] mb-6 animate-pulse" />
                  <h3 className="text-6xl md:text-7xl font-black text-white uppercase leading-none mb-4 tracking-tighter">Takk!</h3>
                  <p className="text-white/80 font-extrabold text-xl uppercase mb-8">Din prøvetime er booket:</p>
                  <div className="bg-white/10 rounded-[32px] py-8 px-10 border border-white/20 backdrop-blur-xl w-full max-w-md">
                    <span className="text-white font-black text-2xl md:text-3xl block mb-2 uppercase">{finalDetails.day}</span>
                    <span className="text-white/90 font-bold text-xl block uppercase tracking-widest leading-none">kl. {finalDetails.time}</span>
                  </div>
                </div>
                
                <div className="w-full mt-6">
                  <BookingSlider 
                    id="reset"
                    beforeLabel="Bestill en ny time"
                    afterLabel="Vennligst vent..."
                    activeColor="#22c55e"
                    icon={<Check className="w-5 h-5" />}
                    onComplete={handleReset}
                    isFormSubmitted={submitted}
                  />
                </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function BookingSlider({ id, beforeLabel, afterLabel, activeColor, icon, onComplete, isActive = false, disabled = false, isFormSubmitted }: any) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const posRef = useRef(0);

  useEffect(() => {
    if (!isFormSubmitted) {
      if (!isActive || id === 'submit' || id === 'reset') {
        setPosition(0);
        posRef.current = 0;
      }
    }
  }, [isFormSubmitted, isActive, id]);

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
      else if (!isActive) { setPosition(0); posRef.current = 0; }
    };
    window.addEventListener("mousemove", handleMove); window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMove); window.addEventListener("touchend", handleEnd);
    return () => {
      window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMove); window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, id, onComplete, isActive]);

  const textStyle = { fontWeight: 800, textTransform: 'uppercase' as const, fontSize: '10px', letterSpacing: '1px' };

  return (
    <div ref={containerRef} className={`slider-wrapper ${disabled ? 'opacity-20 grayscale pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}>
      <div className="slider-text-base absolute inset-0 flex items-center justify-center pointer-events-none">
        <span style={{...textStyle, color: 'white'}}>{beforeLabel}</span>
      </div>
      <div className="glass-fill" style={{ width: position + 52, transition: isDragging ? 'none' : '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} />
      <div className="slider-text-active absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <span style={{ color: activeColor, opacity: position > 100 ? 1 : 0, transition: '0.2s', ...textStyle }}>{afterLabel}</span>
      </div>
      <div className="thumb-element" onMouseDown={handleStart} onTouchStart={handleStart} style={{ left: position + 4, transition: isDragging ? 'none' : '0.4s', color: activeColor }}>
        {icon}
      </div>
    </div>
  );
}