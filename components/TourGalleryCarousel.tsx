"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface TourGalleryCarouselProps {
  images: string[];
  title: string;
}

export default function TourGalleryCarousel({
  images,
  title,
}: TourGalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Large Carousel Frame */}
      <div className="relative h-[340px] sm:h-[440px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
        <img
          src={images[currentIndex]}
          alt={`${title} - Photo ${currentIndex + 1}`}
          onClick={() => setIsLightboxOpen(true)}
          className="w-full h-full object-cover cursor-zoom-in transition-all duration-300"
        />

        {/* Photo Counter Badge */}
        <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Expand Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="View full screen"
          className="absolute top-4 right-4 bg-slate-950/75 hover:bg-amber-500 text-white hover:text-slate-950 p-2 rounded-full transition-colors cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Left / Right Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg transition-all cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Clickable Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-28 sm:w-32 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? "border-amber-500 ring-2 ring-amber-500/30 opacity-100"
                  : "border-transparent opacity-65 hover:opacity-100"
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 bg-white/10 hover:bg-amber-500 text-white hover:text-slate-950 p-2.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 sm:left-8 w-12 h-12 rounded-full bg-white/15 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 sm:right-8 w-12 h-12 rounded-full bg-white/15 hover:bg-amber-500 text-white hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          <img
            src={images[currentIndex]}
            alt={`${title} Fullscreen`}
            className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
          />

          <div className="absolute bottom-5 text-white/80 text-sm font-semibold">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
