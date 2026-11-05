"use client";
import React, { useState, useEffect } from "react";
import { Send, Heart, Check, ArrowRight } from "lucide-react";
import { trackEvent } from "./track"; // [GOOGLE ADS] події конверсій
import { tr } from "./i18n";

export function ContactForm({ lang = "no" }: { lang?: string }) {
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
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, message, recipient: "vikgerasimenco@gmail.com" })
      });
      // [GOOGLE ADS] вторинна конверсія — лише коли сервер справді прийняв запит
      if (res.ok) trackEvent("contact", { form: "contact" });
      setSubmitted(true);
      setMessage("");
    } catch (err) { setSubmitted(true); } finally { setIsSubmitting(false); }
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative w-full flex flex-col items-center justify-center py-6 md:py-12 px-4 bg-transparent overflow-visible">
      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        {/* Заголовок у стандартному регістрі */}
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-lg">
          {tr(lang, "Kontakt meg", "Contact me", "Зв'яжіться зі мною")}
        </h2>

        <div className={`transition-opacity duration-500 mb-6 ${submitted ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-xl text-white/80 text-center font-normal">
            {tr(lang, "Ta gjerne kontakt hvis du har spørsmål", "Feel free to get in touch if you have any questions", "Звертайтесь, якщо маєте запитання")}
          </p>
        </div>

        <div className="relative w-full h-[580px]">

          {/* КАРТКА ФОРМИ */}
          <div className={`absolute inset-0 w-full h-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col transition-all duration-500 ${submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-10'}`}>
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={tr(lang, "Navn", "Name", "Ім'я")}
                    required
                    value={name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="h-14 px-6 bg-white border-transparent rounded-full text-gray-900 text-base outline-none focus:ring-2 focus:ring-[#1877F2] transition-all"
                  />
                  <input
                    type="email"
                    placeholder={tr(lang, "E-post", "E-mail", "Електронна пошта")}
                    required
                    value={email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="h-14 px-6 bg-white border-transparent rounded-full text-gray-900 text-base outline-none focus:ring-2 focus:ring-[#1877F2] transition-all"
                  />
                </div>
                <div className="relative flex-1 flex flex-col">
                  <textarea
                    placeholder={tr(lang, "Melding", "Message", "Повідомлення")}
                    required
                    maxLength={200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-6 bg-white border-transparent rounded-[32px] text-gray-900 text-base flex-1 resize-none outline-none focus:ring-2 focus:ring-[#1877F2] transition-all"
                  />
                  <div className="absolute bottom-4 right-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {message.length} / 200
                  </div>
                </div>
              </div>

              {/* КНОПКА ВІДПРАВКИ ЗАМІСТЬ СЛАЙДЕРА */}
              <div className="w-full mt-6">
                <button
                  disabled={!message || isSubmitting}
                  onClick={executeSubmit}
                  className={`h-14 w-full rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 transition-all duration-300
                  ${!message || isSubmitting
                    ? 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                    : 'bg-white text-[#1877F2] border border-white shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:scale-[1.02] active:scale-95'}`}
                >
                  {isSubmitting ? tr(lang, "Sender...", "Sending...", "Надсилання...") : !message ? tr(lang, "Skriv melding", "Write a message", "Напишіть повідомлення") : tr(lang, "Send melding", "Send message", "Надіслати повідомлення")}
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* КАРТКА ПОДЯКИ */}
          <div className={`absolute inset-0 w-full h-full bg-white/10 backdrop-blur-2xl rounded-[40px] p-6 md:p-10 border border-white/20 shadow-2xl flex flex-col items-center transition-all duration-500 ${!submitted ? 'opacity-0 pointer-events-none scale-95 z-0' : 'opacity-100 scale-100 z-20'}`}>
            <div className="flex flex-col items-center justify-center flex-1 text-center">
              <Heart className="w-20 h-20 text-[#1877F2] fill-[#1877F2] mb-8 animate-pulse" />
              <p aria-hidden={!submitted} className="text-6xl md:text-7xl font-black text-white leading-none mb-6 tracking-tighter">{submitted ? tr(lang, "Takk!", "Thank you!", "Дякуємо!") : ""}</p>
              <p className="text-white font-bold text-xl leading-relaxed max-w-md">
                {tr(lang, "Meldingen din er sendt.", "Your message has been sent.", "Ваше повідомлення надіслано.")}
              </p>
            </div>

            {/* КНОПКА СКИДАННЯ ЗАМІСТЬ СЛАЙДЕРА */}
            <div className="w-full mt-6">
              <button
                onClick={handleReset}
                className="h-14 w-full bg-white text-[#1877F2] rounded-full font-black uppercase text-xs tracking-[2px] flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform"
              >
                <Check className="w-5 h-5" />
                {tr(lang, "Send en ny melding", "Send another message", "Надіслати ще одне повідомлення")}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
