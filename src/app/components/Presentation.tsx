import { useState } from "react";
import { ChevronLeft, ChevronRight, Edit3 } from "lucide-react";
import { slides } from "./slides/slideData";
import { CoverSlide } from "./slides/CoverSlide";
import { AgendaSlide } from "./slides/AgendaSlide";
import { TargetMarketSlide } from "./slides/TargetMarketSlide";
import { BrandIdentitySlide } from "./slides/BrandIdentitySlide";
import { NameLogoSlide } from "./slides/NameLogoSlide";
import { MoodBoardSlide } from "./slides/MoodBoardSlide";
import { MarketingStrategiesSlide } from "./slides/MarketingStrategiesSlide";
import { CommunicationsPlanSlide } from "./slides/CommunicationsPlanSlide";
import { DistributionChannelSlide } from "./slides/DistributionChannelSlide";
import { CollectionOverviewSlide } from "./slides/CollectionOverviewSlide";
import { PrintsFabricsSlide } from "./slides/PrintsFabricsSlide";
import { OurCollectionSlide } from "./slides/OurCollectionSlide";
import { AdvertisementSlide } from "./slides/AdvertisementSlide";
import { SustainablePackagingSlide } from "./slides/SustainablePackagingSlide";
import { ThankYouSlide } from "./slides/ThankYouSlide";

const slideComponents = [
  CoverSlide,
  AgendaSlide,
  TargetMarketSlide,
  BrandIdentitySlide,
  NameLogoSlide,
  MoodBoardSlide,
  MarketingStrategiesSlide,
  CommunicationsPlanSlide,
  DistributionChannelSlide,
  CollectionOverviewSlide,
  PrintsFabricsSlide,
  OurCollectionSlide,
  AdvertisementSlide,
  SustainablePackagingSlide,
  ThankYouSlide
];

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showEditHelper, setShowEditHelper] = useState(true);

  const nextSlide = () => {
    if (currentSlide < slideComponents.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentSlideComponent = slideComponents[currentSlide];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Edit Helper Banner */}
      {showEditHelper && (
        <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit3 className="w-5 h-5" />
            <p className="text-sm">
              <span className="font-semibold">Customization Guide:</span> All slides contain placeholder content. 
              Edit slide files in <code className="bg-blue-700 px-2 py-0.5 rounded">/src/app/components/slides/</code> to customize text, images, and data.
            </p>
          </div>
          <button 
            onClick={() => setShowEditHelper(false)}
            className="text-white hover:text-blue-200 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Presentation Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl aspect-[16/9] bg-white rounded-lg shadow-2xl overflow-hidden">
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="bg-slate-800 px-8 py-6 flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-4">
          <span className="text-white text-sm">
            Slide {currentSlide + 1} of {slideComponents.length}
          </span>
          <div className="flex gap-2">
            {slideComponents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? "bg-blue-500 w-8" 
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slideComponents.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
