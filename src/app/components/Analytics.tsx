"use client";
import React, { useEffect, useState } from "react";
import { tr } from "./i18n";

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined; // G-XXXXXXXXXX
const ADS_ID = import.meta.env.VITE_ADS_ID as string | undefined; // AW-XXXXXXXXX
const CONSENT_KEY = "kfa_consent";

const GRANTED = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
};

const DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

function loadGtag(loaderId: string) {
  if (document.getElementById("gtag-loader")) return;

  window.dataLayer = window.dataLayer || [];
  // gtag мусить пушити саме об'єкт arguments
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };

  // Consent Mode v2: усе "denied", доки користувач не погодився
  window.gtag("consent", "default", { ...DENIED, wait_for_update: 500 });
  try {
    if (localStorage.getItem(CONSENT_KEY) === "granted") window.gtag("consent", "update", GRANTED);
  } catch {}

  window.gtag("js", new Date());
  if (GA_ID) window.gtag("config", GA_ID);
  if (ADS_ID) window.gtag("config", ADS_ID);

  const s = document.createElement("script");
  s.id = "gtag-loader";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${loaderId}`;
  document.head.appendChild(s);
}

export function Analytics({ lang = "no" }: { lang?: string }) {
  // true на старті, щоб банер не блимав до читання localStorage
  const [answered, setAnswered] = useState(true);

  useEffect(() => {
    if (!GA_ID && !ADS_ID) return;
    loadGtag((GA_ID ?? ADS_ID) as string);
    try {
      setAnswered(!!localStorage.getItem(CONSENT_KEY));
    } catch {
      setAnswered(false);
    }
  }, []);

  if (!GA_ID && !ADS_ID) return null;

  const answer = (value: "granted" | "denied") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    if (value === "granted") window.gtag?.("consent", "update", GRANTED);
    setAnswered(true);
  };

  if (answered) return null;

  return (
    <div
      role="dialog"
      aria-label={tr(lang, "Informasjonskapsler", "Cookies", "Файли cookie")}
      className="fixed bottom-0 inset-x-0 z-[14000] p-4"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="max-w-3xl mx-auto bg-[#111]/95 backdrop-blur-xl border border-white/15 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-2xl">
        <p className="text-white/80 text-sm leading-relaxed flex-1">
          {tr(lang, "Vi bruker informasjonskapsler for å måle trafikk og vise relevante annonser på Google. Du kan godta eller avslå.", "We use cookies to measure traffic and show relevant ads on Google. You can accept or decline.", "Ми використовуємо файли cookie, щоб вимірювати трафік і показувати релевантну рекламу в Google. Ви можете прийняти або відхилити.")}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => answer("denied")}
            className="h-11 px-6 rounded-full border border-white/25 text-white/80 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            {tr(lang, "Avslå", "Decline", "Відхилити")}
          </button>
          <button
            type="button"
            onClick={() => answer("granted")}
            className="h-11 px-6 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            {tr(lang, "Godta", "Accept", "Прийняти")}
          </button>
        </div>
      </div>
    </div>
  );
}
