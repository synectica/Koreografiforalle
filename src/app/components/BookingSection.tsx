"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export function BookingSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [finalDetails, setFinalDetails] = useState({ day: "", time: "" });
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;
    setIsSubmitting(true);
    
    const isTuesday = selectedDate.getDay() === 2;
    const timeRange = isTuesday ? "15:00 - 16:00" : "15:30 - 17:00";
    const startTime = isTuesday ? "15:00:00" : "15:30:00";
    const endTime = isTuesday ? "16:00:00" : "17:00:00";
    const formattedDay = `${isTuesday ? "Tirsdag" : "Fredag"} ${selectedDate.toLocaleDateString('no-NO')}`;

    const MAKE_WEBHOOK_URL = "https://hook.eu1.make.com/r5j6ds9yaef9sct9a8cyg1hkvkwnh501";
    
    try {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const isoDate = `${yyyy}-${mm}-${dd}`;

      setFinalDetails({ day: formattedDay, time: timeRange });

      await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "booking", name, email, phone, 
          date: formattedDay, time: timeRange,
          startISO: `${isoDate}T${startTime}`, 
          endISO: `${isoDate}T${endTime}`,
          recipient: "vikgerasimenco@gmail.com" 
        }),
      });

      setSubmitted(true);
      setPhone("");
    } catch (error) { setSubmitted(true); } finally { setIsSubmitting(false); }
  };

  return (
    <section id="booking" className="relative w-full flex flex-col items-center justify-center min-h-[100dvh] py-12 px-4 bg-transparent overflow-visible">
      <style>{`
        @keyframes ultraPulseCenter {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; filter: blur(25px); }
          50% { transform: translate(-50%, -50%) scale(1.4); opacity: 1; filter: blur(15px); }
          100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.8; filter: blur(25px); }
        }

        .booking-glass-btn-base {
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

        .booking-glass-btn-base::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 250%; height: 250%;
          background: var(--glow-gradient);
          z-index: 1;
          pointer-events: none;
          animation: ultraPulseCenter 3s ease-in-out infinite;
          transition: all 0.4s ease;
        }

        .booking-glass-btn-base:hover:not(:disabled) {
          transform: scale(0.98) translateY(2px);
          filter: brightness(1.25);
        }

        .booking-active-state {
          transform: scale(0.95) translateY(4px) !important;
          box-shadow: inset 0 4px 20px rgba(0, 0, 0, 0.6) !important;
          border-color: rgba(34, 197, 94, 0.9) !important;
          filter: brightness(0.9);
        }

        .btn-green-yellow-glow {
          background: rgba(255, 255, 255, 0.15);
          --glow-gradient: radial-gradient(circle, #fbbc05 0%, #22c55e 40%, #16a34a 70%, transparent 95%);
          --border-color: rgba(34, 197, 94, 0.7);
        }

        /* Стиль для матової скляної краплі сьогоднішнього дня */
        .today-drop {
          background: rgba(255, 255, 255, 0.9) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
          color: #000 !important;
          border: 1px solid white !important;
        }

        .btn-content {
          position: relative;
          z-index: 10;
          text-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }
      `}</style>
      
      <div className="w-full max-w-3xl z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          Book en gratis prøvetime
        </h2>
        
        <div className={`transition-opacity duration-500 mb-6 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl text-white/80 text-center font-normal">Velg en dato og fyll ut skjemaet</p>
        </div>
        
        <div className="relative w-full flex flex-col min-h-[650px]">
          <form onSubmit={handleSubmit} className={`bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col transition-all duration-500 ${submitted ? 'blur-[2px] brightness-75 scale-95 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-3">
                  {['tuesday', 'friday'].map((day) => (
                    <div key={day} 
                        onClick={() => {
                          const nextFilter = activeFilter === day ? null : (day as any);
                          setActiveFilter(nextFilter);
                          setSelectedDate(null); 
                        }}
                        className={`booking-glass-btn-base h-[56px] rounded-full px-6 justify-between transition-all 
                        ${activeFilter === day ? 'btn-green-yellow-glow text-white shadow-lg border-[#22c55e] booking-active-state' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
                        <span className="btn-content text-sm font-bold uppercase tracking-widest">{day === 'tuesday' ? 'Tirsdag' : 'Fredag'}</span>
                        <span className="btn-content text-sm font-bold">{day === 'tuesday' ? '15:00 - 16:00' : '15:30 - 17:00'}</span>
                    </div>
                  ))}
              </div>

              <div className="w-full pt-2 text-center">
                  <div className="flex justify-between items-center w-full px-2 mb-4">
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))} className="text-white p-1 hover:opacity-50"><ChevronLeft className="w-6 h-6"/></button>
                      <span className="font-bold text-sm text-white capitalize tracking-widest">{monthName} {year}</span>
                      <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="text-white p-1 hover:opacity-50"><ChevronRight className="w-6 h-6"/></button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Ma', 'Ti', 'On', 'To', 'Fr', 'Lø', 'Sø'].map(d => (
                      <div key={d} className="text-[10px] font-black uppercase text-white/30 tracking-tighter">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                      {days.map((dateObj, i) => {
                          if (!dateObj) return <div key={`empty-${i}`} className="h-10" />;
                          
                          const isTue = dateObj.getDay() === 2;
                          const isFri = dateObj.getDay() === 5;
                          const isAvailable = (isTue && activeFilter === 'tuesday') || (isFri && activeFilter === 'friday');
                          const isSelected = selectedDate && dateObj.toDateString() === selectedDate.toDateString();
                          const isToday = dateObj.toDateString() === new Date().toDateString();

                          return (
                              <div key={dateObj.getTime()} className="flex items-center justify-center h-10">
                                  <button type="button" disabled={!isAvailable} onClick={() => setSelectedDate(dateObj)}
                                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all relative
                                          ${isSelected ? 'bg-[#22c55e] text-white shadow-lg scale-90 booking-active-state' : 
                                            isToday ? 'today-drop' : 
                                            isAvailable ? 'text-white hover:bg-white/10' : 'text-white/20 cursor-default'}`}>
                                      {dateObj.getDate()}
                                  </button>
                              </div>
                          );
                      })}
                  </div>
              </div>

              <div className="flex flex-col gap-4">
                <input type="text" placeholder="Navn" required value={name} onChange={(e) => handleChange("name", e.target.value)} className="h-[56px] px-6 bg-white border-transparent rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]" />
                <input type="email" placeholder="E-post" required value={email} onChange={(e) => handleChange("email", e.target.value)} className="h-[56px] px-6 bg-white border-transparent rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]" />
                <input type="tel" placeholder="Telefon" required value={phone} onChange={(e) => setPhone(e.target.value)} className="h-[56px] px-6 bg-white border-transparent rounded-full text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e]" />
                
                <button type="submit" disabled={isSubmitting || !selectedDate} 
                    className={`booking-glass-btn-base w-full py-4 rounded-full font-bold text-xl text-white transition-all shadow-2xl 
                    ${!selectedDate ? 'opacity-30 border-white/10 pointer-events-none' : 'btn-green-yellow-glow opacity-100'}`}>
                  <span className="btn-content">{isSubmitting ? "Sender..." : !activeFilter ? "Velg dag og tid" : !selectedDate ? "Velg en dato" : "Book gratis time"}</span>
                </button>
              </div>
            </div>
          </form>

          {submitted && (
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md rounded-[40px] z-40 flex flex-col items-center justify-between p-8 md:p-12 animate-in fade-in zoom-in duration-500 border border-white/10 text-center">
                <div className="h-32 flex flex-col items-center justify-center">
                  <Heart className="w-12 h-12 text-white fill-white animate-pulse mb-4" />
                  <h3 className="text-6xl font-black text-white tracking-tighter drop-shadow-md">Takk!</h3>
                </div>

                <div className="flex flex-col items-center justify-center">
                   <p className="text-white font-extrabold text-xl mb-4 drop-shadow-sm">Din prøvetime er booket:</p>
                   <div className="bg-white/10 rounded-[32px] py-6 px-10 border border-white/10 shadow-xl backdrop-blur-xl">
                      <span className="text-white font-black text-3xl block mb-2">{finalDetails.day}</span>
                      <span className="text-white/90 font-bold text-xl block">kl. {finalDetails.time}</span>
                   </div>
                </div>

                <div className="w-full flex flex-col items-center">
                  <p className="text-white font-bold text-lg mb-10 drop-shadow-sm h-[56px] flex items-center justify-center">
                    Vi gleder oss до зустрічі!
                  </p>
                  
                  <button 
                    onClick={() => { setSubmitted(false); setSelectedDate(null); setActiveFilter(null); }} 
                    className="booking-glass-btn-base btn-green-yellow-glow w-full max-w-sm py-4 rounded-full font-bold text-xl text-white shadow-2xl relative z-50"
                  >
                    <span className="btn-content">Bestill en ny time</span>
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}