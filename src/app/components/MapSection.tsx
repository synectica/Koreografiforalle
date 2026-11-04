"use client";
import React from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { trackEvent } from "./track"; // [GOOGLE ADS] події конверсій
import { tr } from "./i18n";

export function MapSection({ lang = "no" }: { lang?: string }) {
  const displayAddress = "Wolffs gate 12, 5006 Bergen";
  // Ваше пряме посилання на локацію
  const googleMapsUrl = `https://www.google.no/maps/place/M%C3%B8llaren+Frivilligsentral/@60.3830593,5.3239127,17z/`;

  const handleOpenMap = () => {
    trackEvent("click_directions", { location: displayAddress }); // [GOOGLE ADS]
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className="relative w-full bg-transparent flex flex-col items-center justify-center snap-start snap-always overflow-visible px-4 py-10">

      <style>{`
        .map-iframe-container {
          position: relative; width: 100%; overflow: hidden;
          background: #1a1a1a; -webkit-mask-image: -webkit-radial-gradient(white, black);
          border-radius: 28px;
        }

        .map-iframe-wrapper {
          position: absolute; width: 160%; height: 200%;
          top: -50%; left: -30%; pointer-events: none;
        }

        .map-iframe-wrapper iframe {
          width: 100%; height: 100%; border: 0;
          filter: grayscale(0.5) contrast(1.1) brightness(0.8);
        }

        /* ЦУКЕРКОВИЙ СТИЛЬ КНОПКИ (CANDY GLASS) */
        .btn-candy-map {
          position: relative;
          width: 100%;
          height: 64px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: white;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 11px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow:
            inset 0 -6px 10px rgba(0, 0, 0, 0.2),
            inset 0 4px 8px rgba(255, 255, 255, 0.2),
            0 10px 25px rgba(0, 0, 0, 0.3);
        }

        /* ГЛЯНЦЕВИЙ ВІДБЛИСК ЯК НА ЛЬОДЯНИКУ */
        .btn-candy-map::after {
          content: "";
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px;
          pointer-events: none;
          z-index: 2;
        }

        .btn-candy-map:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(255, 255, 255, 0.2);
          box-shadow:
            inset 0 -6px 10px rgba(0, 0, 0, 0.15),
            inset 0 4px 8px rgba(255, 255, 255, 0.3),
            0 15px 35px rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-candy-map:active {
          transform: translateY(1px) scale(0.97);
          box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .icon-glow {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10 flex flex-col items-center">

        <div className="text-center mb-10">
          {/* [SEO/локальний пошук] заголовок і підзаголовок із назвою міста та місця (було: "Finn oss" / "Studiolokasjon") */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {tr(lang, "Finn oss i Bergen", "Find us in Bergen", "Знайдіть нас у Бергені")}
          </h2>
          <p className="text-xl text-white/80 text-center font-normal max-w-xl mx-auto leading-relaxed">
            {tr(lang, "Koreografistudio:", "Choreography studio:", "Студія хореографії:")} Møllaren Frivilligsentral
          </p>
        </div>

        {/* КАРТКА З МАПОЮ */}
        <div className="w-full p-3 md:p-6 bg-white/10 backdrop-blur-2xl rounded-[40px] md:rounded-[50px] border border-white/20 shadow-2xl relative mb-12">

          <div className="map-iframe-container h-[40vh] md:h-[50vh]">
            <div className="map-iframe-wrapper">
              <iframe
                title="Kart: Møllaren Frivilligsentral, Wolffs gate 12, Bergen"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(displayAddress)}&ll=60.3828628,5.3232897&t=&z=17&ie=UTF8&iwloc=&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* [SEO/локальний пошук] адреса в семантичному тегу <address> (NAP має збігатися з Google Business Profile) */}
          <address className="not-italic mt-8 flex flex-col items-center justify-center text-center px-4 pb-4">
            <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Wolffs gate 12
            </p>
            <p className="text-white/50 text-base md:text-lg mt-1 font-medium">
              {tr(lang, "5006 Bergen, Norge", "5006 Bergen, Norway", "5006 Берген, Норвегія")}
            </p>
          </address>
        </div>

        {/* ЦУКЕРКОВА КНОПКА (CANDY BUTTON) */}
        <div className="w-full max-w-sm">
          <button
            onClick={handleOpenMap}
            className="btn-candy-map group"
          >
            <MapPin className="w-5 h-5 icon-glow transition-transform group-hover:scale-110 text-white" />
            <span className="relative z-10">
              {tr(lang, "Åpne i Google Maps", "Open in Google Maps", "Відкрити в Google Maps")}
            </span>
            <ExternalLink className="w-4 h-4 opacity-40 transition-opacity group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </section>
  );
}
