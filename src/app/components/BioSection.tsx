"use client";
import React, { useState } from 'react';
import { Award, MapPin, Activity, Music, Move, X, ChevronDown } from 'lucide-react';
import { tr, toLang } from './i18n';

export function BioSection({ lang = "no" }: { lang?: string }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [touched, setTouched] = useState(false); // після першого натискання пульсація підказки зникає
  const pick = (k: string) => { setTouched(true); setActiveTab(activeTab === k ? null : k); };

  const contentAll = {
    no: {
      barre: { title: "Ved barren", subtitle: "Teknikk & Presisjon", color: "#22c55e",
        whatItGives: "Grunnleggende koreografi ved barren. Vi fokuserer på tekniske elementer ved støtten for å bygge et fundament. Her legger vi vekt på presist fotarbeid, riktig kroppsplassering og muskulær kontroll.",
        result: "En sterk og disiplinert kropp med korrekt holdning. Du utvikler muskelminne og den tekniske tryggheten som kreves for all videre progresjon." },
      senter: { title: "Senter", subtitle: "Adagio & Danseelementer", color: "#FBBC05",
        whatItGives: "Adagio og koordinasjonsøvelser i senter. Her overfører vi teknikken fra barren til fri bevegelse i rommet. Vi jobber med balanse, flyt og estetiske danseelementer uten fast støtte.",
        result: "Forbedret koordinasjon, balanse og bevegelsesfrihet. Du lærer å binde sammen elementer med eleganse og uttrykke deg gjennom musikalitet." },
      gulv: { title: "Gulvarbeid", subtitle: "Styrke & Fleksibilitet", color: "#EA4335",
        whatItGives: "Målrettet styrketrening og tøyning på gulvet. Vi bruker underlaget for å jobbe i dybden med ulike muskelgrupper, øke leddmobilitet og forbedre kroppens generelle smidighet.",
        result: "En smidig, langstrakt muskulatur og økt fleksibilitet. Kroppen blir sterkere, mer motstandsdyktig og klar for mer krevende fysiske utfordringer." },
    },
    en: {
      barre: { title: "At the barre", subtitle: "Technique & Precision", color: "#22c55e",
        whatItGives: "Basic choreography at the barre. We focus on technical elements at the support to build a foundation, with emphasis on precise footwork, correct body placement and muscular control.",
        result: "A strong, disciplined body with correct posture. You develop muscle memory and the technical confidence needed for all further progress." },
      senter: { title: "Centre", subtitle: "Adagio & Dance Elements", color: "#FBBC05",
        whatItGives: "Adagio and coordination exercises in the centre. Here we carry the technique from the barre into free movement in the room, working with balance, flow and aesthetic dance elements without fixed support.",
        result: "Improved coordination, balance and freedom of movement. You learn to link elements with elegance and express yourself through musicality." },
      gulv: { title: "Floor work", subtitle: "Strength & Flexibility", color: "#EA4335",
        whatItGives: "Targeted strength training and stretching on the floor. We use the floor to work in depth with different muscle groups, increase joint mobility and improve the overall flexibility of the body.",
        result: "Supple, elongated muscles and greater flexibility. The body becomes stronger, more resilient and ready for more demanding physical challenges." },
    },
    ua: {
      barre: { title: "Біля станка", subtitle: "Техніка та точність", color: "#22c55e",
        whatItGives: "Базова хореографія біля станка. Ми працюємо над технічними елементами біля опори, щоб збудувати фундамент: точна робота стоп, правильне положення тіла та м'язовий контроль.",
        result: "Сильне, дисципліноване тіло з правильною поставою. Ви розвиваєте м'язову пам'ять і технічну впевненість, потрібну для будь-якого подальшого прогресу." },
      senter: { title: "На середині", subtitle: "Адажіо та танцювальні елементи", color: "#FBBC05",
        whatItGives: "Адажіо та вправи на координацію на середині залу. Тут ми переносимо техніку зі станка у вільний рух у просторі: працюємо над балансом, плавністю та естетичними танцювальними елементами без постійної опори.",
        result: "Краща координація, баланс і свобода рухів. Ви вчитеся поєднувати елементи з елегантністю та виражати себе через музикальність." },
      gulv: { title: "Робота на підлозі", subtitle: "Сила та гнучкість", color: "#EA4335",
        whatItGives: "Цілеспрямоване силове тренування та розтяжка на підлозі. Ми працюємо в глибину з різними групами м'язів, збільшуємо рухливість суглобів і покращуємо загальну гнучкість тіла.",
        result: "Гнучкі, подовжені м'язи та більша розтяжка. Тіло стає сильнішим, витривалішим і готовим до складніших фізичних навантажень." },
    },
  };
  const content = contentAll[toLang(lang)];

  return (
    <section id="bio" className="bio-section relative w-full flex flex-col items-center justify-center px-4 pb-8 md:pb-20 bg-transparent snap-start">
      <style>{`
        .font-bebas-bio { font-family: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace; }

        .bio-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: all 0.5s ease;
            transform: none;
            object-position: 60% 40%;
            filter: brightness(0.85) contrast(1.1) saturate(1.05);
            transform-origin: center center;
            /* Покращення для стабільності картинки */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }

        /* під брови/логотип: відступ зверху = safe-area + висота логотипу */
        .bio-section { padding-top: calc(max(env(safe-area-inset-top, 0px), 48px) * 1.1 + 36px); min-height: 100dvh; }
        @media (min-width: 768px) { .bio-section { padding-top: 5rem; min-height: 0; } }
        /* фото підлаштовується під висоту екрана */
        .bio-photo-container { height: clamp(190px, 31dvh, 350px); }
        @media (min-width: 768px) { .bio-photo-container { height: auto; } }
        .photo-popup { padding: 1rem; overflow-y: auto; }
        @media (min-width: 768px) { .photo-popup { padding: 2rem; } }
        .photo-popup > div { margin: auto 0; }
        /* низькі екрани: ховаємо другорядне, щоб блок поміщався */
        @media (max-width: 767px) and (max-height: 880px) { .bio-hide-mid { display: none; } }
        @media (max-width: 767px) and (max-height: 740px) {
          .bio-hide-short { display: none; }
        }
        @media (max-width: 767px) {
          .bio-img { transform: none; object-position: 55% 28%; }
        }

        /* FIX ДЛЯ СКЛА (ПРИБИРАЄ ГЛЮКИ ТА СМУГИ) */
        .glass-container {
          position: relative;
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          /* Магія проти артефактів */
          transform: translateZ(0);
          will-change: backdrop-filter;
          isolation: isolate;
        }

        .photo-popup {
          position: absolute; inset: 0; z-index: 30;
          display: flex; flex-direction: column; justify-content: center;
          align-items: center; padding: 2rem; animation: fadeIn 0.3s ease forwards;
        }

        .candy-icon-static {
          position: relative; overflow: hidden;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
        }
        .candy-icon-static::after {
          content: ""; position: absolute; top: 0; left: 10%; right: 10%; height: 40%;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: 9999px; pointer-events: none; z-index: 2;
        }

        /* підказка «можна натиснути»: пульсуюче кільце навколо іконок */
        @keyframes tapPulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); } 70% { box-shadow: 0 0 0 14px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }
        .tap-pulse { animation: tapPulse 1.8s ease-out infinite; }
        @keyframes tapBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(4px); } }
        .tap-bounce { animation: tapBounce 1.2s ease-in-out infinite; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      <div className="w-full max-w-5xl mx-auto z-10">
        {/* [SEO] заголовок із ключовою фразою (було: "Instruktøren bak konseptet") */}
        <h2 className="text-[clamp(1.25rem,6vw,1.875rem)] md:text-5xl font-bold text-center mb-4 md:mb-10 text-white tracking-tight leading-tight">
          {tr(lang, "Koreografitimer i Bergen – instruktøren bak konseptet", "Choreography classes in Bergen – the instructor behind the concept", "Заняття з хореографії в Бергені – інструкторка, яка створила концепцію")}
        </h2>

        {/* ОСНОВНИЙ КОНТЕЙНЕР З ФІКСОМ СКЛА */}
        <div className="glass-container flex flex-col md:flex-row md:min-h-[500px]">

          {/* PHOTO SECTION */}
          <div className="w-full md:w-[48%] relative shrink-0 overflow-hidden bio-photo-container border-b md:border-b-0 md:border-r border-white/5">
            {/* [SEO] описовий alt + lazy-loading */}
            <picture>
              {/* комп'ютер: вертикальний кадр, Галина видна повністю; телефон: широкий кадр */}
              <source media="(min-width: 768px)" srcSet="/galyna-portrait.webp" />
              <img
                src="/galyna.webp"
                alt="Galyna Gerasymenko, koreograf og instruktør i Bergen"
                loading="lazy"
                decoding="async"
                className="bio-img absolute inset-0"
              />
            </picture>

            {!activeTab && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 flex flex-col justify-end p-4 md:hidden">
                <h3 className="font-bebas-bio text-2xl text-white uppercase leading-none font-bold">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-xs text-white/50 uppercase tracking-widest mt-1">{tr(lang, "Koreograf & Mentor", "Choreographer & Mentor", "Хореограф і ментор")}</p>
              </div>
            )}

            {activeTab && (
              <div className="photo-popup" style={{ backgroundColor: content[activeTab as keyof typeof content].color }}>
                <div className="w-full h-full flex flex-col justify-center text-black">
                    <h5 className="font-bebas-bio text-lg md:text-2xl uppercase tracking-wide leading-tight mb-2 md:mb-4 font-bold text-center border-b border-black/20 pb-2 md:pb-4">
                        {content[activeTab as keyof typeof content].title}
                    </h5>

                    <div className="space-y-2 md:space-y-4 text-[12px] sm:text-sm md:text-lg leading-snug font-semibold">
                        <div>
                            <span className="font-black uppercase tracking-wider block mb-1 text-[10px] md:text-xs opacity-50 italic">{tr(lang, "Innhold:", "Content:", "Зміст:")}</span>
                            <p>{content[activeTab as keyof typeof content].whatItGives}</p>
                        </div>
                        <div>
                            <span className="font-black uppercase tracking-wider block mb-1 text-[10px] md:text-xs opacity-50 italic">{tr(lang, "Resultat:", "Result:", "Результат:")}</span>
                            <p>{content[activeTab as keyof typeof content].result}</p>
                        </div>
                    </div>
                </div>
              </div>
            )}
          </div>

          {/* TEXT SECTION */}
          <div className="w-full md:w-[58%] p-4 md:p-12 flex flex-col items-center text-center justify-between gap-3 md:gap-0 bg-white/[0.02]">
            <div className="w-full">
              <div className="hidden md:block mb-8">
                <h3 className="font-bebas-bio text-3xl lg:text-4xl text-white tracking-tight uppercase leading-none font-bold">Galyna Gerasymenko</h3>
                <p className="font-bebas-bio text-sm text-white/40 uppercase tracking-[0.25em] mt-3">{tr(lang, "Koreograf & Mentor", "Choreographer & Mentor", "Хореограф і ментор")}</p>
              </div>

              <div className="text-white/80 text-[12px] md:text-base leading-snug md:leading-relaxed max-w-lg mx-auto">
                <p>{tr(lang, "Galyna forener sin bakgrunn fra det ukrainske landslaget med en unik metodikk utviklet gjennom en lang karriere som profesjonell koreograf.", "Galyna combines her background from the Ukrainian national team with a unique methodology developed over a long career as a professional choreographer.", "Галина поєднує досвід у національній збірній України з унікальною методикою, розробленою за довгу кар'єру професійного хореографа.")}</p>
                <div className="h-2 md:h-3 bio-hide-short" />
                <p className="bio-hide-short">{tr(lang, "Med utdannelse fra Universitetet for idrett i Kyiv bringer hun ekspertise fra trening av alt fra OL-utøvere til estetisk gymnastikk.", "With a degree from the University of Sport in Kyiv, she brings expertise from training everyone from Olympic athletes to aesthetic gymnastics.", "Маючи освіту Університету спорту в Києві, вона привносить досвід підготовки від олімпійців до естетичної гімнастики.")}</p>
              </div>

              <div className="flex flex-row justify-center items-center gap-3 md:gap-8 my-3 md:my-6 border-y border-white/5 py-3 md:py-6 w-full font-bebas-bio">
                 <div className="flex items-center gap-1.5">
                    <Award className="w-5 h-5 text-[#FBBC05]" /><span className="text-xs md:text-base text-white opacity-80">{tr(lang, "40 års erfaring", "40 years of experience", "40 років досвіду")}</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <MapPin className="w-5 h-5 text-[#22c55e]" /><span className="text-xs md:text-base text-white opacity-80">{tr(lang, "Bergen siden 2015", "In Bergen since 2015", "У Бергені з 2015 року")}</span>
                 </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bio-hide-mid mb-3 md:mb-6 w-full text-center">
                <h4 className="font-bebas-bio text-lg md:text-2xl text-[#EA4335] uppercase tracking-[0.1em] italic font-bold">
                  Koreografi for alle
                </h4>
                <p className="bio-hide-short text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mt-2 font-medium">{tr(lang, "Estetisk utførelse og teknisk presisjon", "Aesthetic execution and technical precision", "Естетичне виконання та технічна точність")}</p>
              </div>

              {/* підказка: кнопки натискаються */}
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-3 text-white/70 text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold">
                <span>{tr(lang, "Trykk på et valg for å lese mer", "Tap an option to read more", "Натисніть на пункт, щоб дізнатися більше")}</span>
                <ChevronDown className={`w-4 h-4 ${touched ? "" : "tap-bounce"}`} />
              </div>

              <div className="flex flex-row justify-between items-stretch w-full gap-2 md:gap-4 font-bebas-bio">
                <IconBox active={activeTab === 'barre'} color="#22c55e" icon={<Activity />} title={content.barre.title} sub={tr(lang, "Klikk for teknikk", "Click for technique", "Натисніть: техніка")} pulse={!touched} onClick={() => pick('barre')} />
                <IconBox active={activeTab === 'senter'} color="#FBBC05" icon={<Music />} title={content.senter.title} sub={tr(lang, "Klikk for adagio", "Click for adagio", "Натисніть: адажіо")} pulse={!touched} onClick={() => pick('senter')} />
                <IconBox active={activeTab === 'gulv'} color="#EA4335" icon={<Move />} title={content.gulv.title} sub={tr(lang, "Klikk for styrke", "Click for strength", "Натисніть: сила")} pulse={!touched} onClick={() => pick('gulv')} />
              </div>
            </div>
          </div>
        </div>

        {/* [SEO] Google бачить текст усіх трьох вкладок одразу (раніше він з'являвся лише після кліку).
            Візуально нічого не змінюється: блок прихований від екрана. */}
        <div className="sr-only" aria-hidden="true">
          {Object.values(content).map((c) => (
            <div key={c.title}>
              <h3>{c.title} – {c.subtitle}</h3>
              <p>{c.whatItGives}</p>
              <p>{c.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconBox({ icon, title, sub, onClick, active, color, pulse }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={`flex-1 flex flex-col items-center cursor-pointer transition-all duration-300 rounded-2xl border px-1.5 py-2 md:px-3 md:py-4 text-center
        ${active ? 'bg-white/15 border-white/60 scale-105' : 'bg-white/[0.06] border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95'}`}
    >
      <div className="relative mb-2">
        <div
          className={`w-11 h-11 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 candy-icon-static
            ${active ? 'border-white shadow-[0_0_30px_rgba(255,255,255,0.8)]' : 'border-white/10'}
            ${pulse && !active ? 'tap-pulse' : ''}`}
        >
          {active ? (
            <X className="w-6 h-6 md:w-8 md:h-8 text-black animate-in zoom-in duration-300" />
          ) : (
            React.cloneElement(icon, {
              className: "w-6 h-6 md:w-8 md:h-8 transition-colors relative z-10",
              style: { color: color }
            })
          )}
        </div>
        {/* значок «+» у кутку: відкрити */}
        {!active && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-black text-sm font-black leading-none shadow-md" style={{ backgroundColor: color }}>+</span>
        )}
      </div>
      <h5 className={`text-[10px] md:text-sm uppercase mb-1 tracking-wide leading-tight ${active ? 'text-white font-bold' : 'text-white/80'}`}>{title}</h5>
      <p className={`text-[8px] md:text-[10px] uppercase tracking-tight leading-tight transition-opacity ${active ? 'opacity-100 text-white' : 'text-white/60'}`}>{sub}</p>
    </button>
  );
}
