"use client";
import React, { useEffect, useState } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";
import { tr } from "./i18n";
import { trackEvent } from "./track"; // [GOOGLE ADS] події

// Реєструє service worker і показує картку «Встановити як застосунок» —
// підпис: «Betaling for kurs – for faste kunder» (оплата за курс для постійних клієнтів).
// Android/Chrome/Edge/ПК: справжня кнопка встановлення. iPhone/iPad (Safari): коротка інструкція «Del → Legg til på Hjem-skjerm».

export function InstallApp({ lang = "no" }: { lang?: string }) {
  const [evt, setEvt] = useState<any>(null);
  const [standalone, setStandalone] = useState(true); // true на старті, щоб картка не блимала
  const [ios, setIos] = useState(false);
  const [help, setHelp] = useState(false);

  useEffect(() => {
    try {
      if ("serviceWorker" in navigator && window.isSecureContext) {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      }
    } catch {}
    const isStandalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setStandalone(!!isStandalone);
    setIos(/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e); };
    const onInstalled = () => { setStandalone(true); setEvt(null); trackEvent("select_content", { content_type: "pwa", item_id: "installed" }); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => { window.removeEventListener("beforeinstallprompt", onPrompt); window.removeEventListener("appinstalled", onInstalled); };
  }, []);

  if (standalone) return null; // вже встановлено — картка не потрібна

  const install = async () => {
    trackEvent("select_content", { content_type: "pwa", item_id: "install_click" });
    if (evt) { evt.prompt(); try { await evt.userChoice; } catch {} setEvt(null); }
    else setHelp(true); // iOS або браузер без кнопки встановлення — показуємо інструкцію
  };

  return (
    <section aria-label={tr(lang, "Installer som app", "Install as an app", "Встановити як застосунок")} className="relative z-10 w-full max-w-xl mx-auto">
      <div className="bg-white/10 backdrop-blur-2xl rounded-[28px] border border-white/20 shadow-2xl p-4 md:p-6 flex items-center gap-4">
        <img src="/icon-192.png" alt="" width={56} height={56} className="w-14 h-14 rounded-2xl shrink-0 shadow-lg" />
        <div className="flex-1 min-w-0 text-left">
          <p className="text-white font-bold text-sm md:text-base leading-tight">
            {tr(lang, "Betaling for kurs – for faste kunder", "Payment for the course – for regular clients", "Оплата за курс – для постійних клієнтів")}
          </p>
          <p className="text-white/60 text-[11px] md:text-xs mt-1 leading-snug">
            {tr(lang, "Legg til på hjem-skjermen – ett trykk til betaling.", "Add to your home screen – one tap to pay.", "Додайте на головний екран – оплата в один дотик.")}
          </p>
        </div>
        <button type="button" onClick={install}
          className="shrink-0 h-11 px-4 rounded-full bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
          <Download className="w-4 h-4" />
          {tr(lang, "Installer", "Install", "Встановити")}
        </button>
      </div>

      {help && (
        <div role="dialog" className="mt-3 bg-[#111]/95 border border-white/15 rounded-3xl p-5 text-white/85 text-sm leading-relaxed relative">
          <button type="button" onClick={() => setHelp(false)} aria-label={tr(lang, "Lukk", "Close", "Закрити")} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><X className="w-4 h-4" /></button>
          {ios ? (
            <p className="pr-8">
              {tr(lang, "I Safari: trykk", "In Safari: tap", "У Safari: натисніть")} <Share className="inline w-4 h-4 -mt-1" /> {tr(lang, "(Del), velg", "(Share), then choose", "(Поділитися), потім оберіть")} <PlusSquare className="inline w-4 h-4 -mt-1" /> <b>{tr(lang, "«Legg til på Hjem-skjerm»", "“Add to Home Screen”", "«На екран Додому»")}</b>.
            </p>
          ) : (
            <p className="pr-8">
              {tr(lang, "Åpne nettleser-menyen (⋮) og velg «Installer app» / «Legg til på startskjermen».", "Open the browser menu (⋮) and choose “Install app” / “Add to Home screen”.", "Відкрийте меню браузера (⋮) і виберіть «Встановити застосунок» / «Додати на головний екран».")}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
