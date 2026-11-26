"use client";

import { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TRAVELER_REVIEWS = [
  {
    name: "Sarah & David M.",
    country: "United Kingdom",
    lang: "English",
    tour: "Giza Pyramids, Sphinx & Egyptian Museum Private Tour",
    quote:
      "Kareem made our first trip to Egypt unforgettable. His knowledge as a licensed Egyptologist brought every temple and hieroglyph to life, and everything from hotel pickup to lunch ran smoothly.",
  },
  {
    name: "Carlos y Elena R.",
    country: "España",
    lang: "Español",
    tour: "Crucero por el Nilo y Templos de Luxor y Asuán",
    quote:
      "Una experiencia mágica de principio a fin. Nuestro guía hablaba un español perfecto y nos explicó toda la historia del Antiguo Egipto con mucha pasión. Totalmente recomendado.",
  },
  {
    name: "Camille & Laurent D.",
    country: "France",
    lang: "Français",
    tour: "Safari Privé Désert Blanc & Oasis de Bahariya",
    quote:
      "Un voyage extraordinaire avec Ramess Tours ! Le bivouac sous les étoiles dans le Désert Blanc était magique et l'organisation porte-à-porte depuis Le Caire était irréprochable.",
  },
  {
    name: "Michael T.",
    country: "United States",
    lang: "English",
    tour: "6 Days / 5 Nights Cairo, Aswan & Luxor Package",
    quote:
      "Zero stress and top-notch hospitality. Having private air-conditioned transfers and an expert guide at Abu Simbel and the Valley of the Kings made all the difference.",
  },
  {
    name: "Sofía G.",
    country: "México",
    lang: "Español",
    tour: "Tour Privado a las Pirámides de Guiza y Saqqara",
    quote:
      "Excelente atención por WhatsApp desde antes de llegar a El Cairo. Puntuales, amables y sin precios ocultos. Sin duda volveremos a viajar con Ramess Tours.",
  },
  {
    name: "Jean-Philippe B.",
    country: "Suisse",
    lang: "Français",
    tour: "Excursion Privée à Louxor – Rive Est et Rive Ouest",
    quote:
      "Un service sur mesure d'une grande qualité. La visite de Karnak et de la Vallée des Rois avec un guide passionné restera notre plus beau souvenir d'Égypte.",
  },
];

export default function ReviewsCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const step = 380;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#F3EFE6] border-t border-[#E8E2D5] py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header + Desktop Prev/Next Arrow Controls */}
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#C59B3B] block mb-1.5">
              GUEST STORIES • ENGLISH • ESPAÑOL • FRANÇAIS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#133B4A] mb-2">
              Loved by Travelers Around the World
            </h2>
            <p className="text-slate-600 text-xs sm:text-base">
              Real feedback from guests who explored Cairo, Luxor, Aswan, and
              the White Desert with our licensed Egyptologist guides.
            </p>
          </div>

          {/* Desktop Carousel Arrows */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Previous reviews"
              className="w-11 h-11 rounded-full bg-white border border-[#E2DBD0] hover:border-[#133B4A] hover:bg-[#133B4A] text-[#133B4A] hover:text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Next reviews"
              className="w-11 h-11 rounded-full bg-[#133B4A] hover:bg-[#0E2C38] text-white flex items-center justify-center transition-all shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#C59B3B]" />
            </button>
          </div>
        </div>

        {/* Horizontal Snap Carousel (Both Mobile & Desktop) */}
        <div
          ref={sliderRef}
          className="no-scrollbar flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-2"
        >
          {TRAVELER_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[82vw] max-w-[330px] md:w-[370px] md:max-w-[370px] bg-white rounded-3xl p-5 sm:p-6 border border-[#E8E2D5] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-0.5 text-[#C59B3B]">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#C59B3B] text-[#C59B3B]"
                      />
                    ))}
                  </div>
                </div>

                <p className="notranslate text-slate-700 text-xs sm:text-sm leading-relaxed line-clamp-4 mb-5">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="notranslate font-extrabold text-xs sm:text-sm text-[#133B4A] truncate">
                    {review.name}
                  </p>
                  <p className="notranslate text-[11px] text-slate-500 truncate">
                    {review.country} •{" "}
                    <span className="text-[#9B7724] font-medium">
                      {review.tour}
                    </span>
                  </p>
                </div>
                <Quote className="w-5 h-5 text-[#C59B3B]/30 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
