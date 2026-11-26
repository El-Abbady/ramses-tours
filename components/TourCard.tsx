"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Clock, MapPin, Star, ArrowRight } from "lucide-react";

export interface Tour {
  id: string;
  slug: string;
  category: string;
  city: string;
  duration: string;
  price: number;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  cover_image: string;
  title_en: string;
  title_es: string;
  title_fr: string;
  summary_en: string;
  summary_es: string;
  summary_fr: string;
}

export default function TourCard({ tour }: { tour: Tour }) {
  const locale = useLocale();
  const t = useTranslations("Tours");

  const title =
    locale === "es"
      ? tour.title_es
      : locale === "fr"
        ? tour.title_fr
        : tour.title_en;
  const summary =
    locale === "es"
      ? tour.summary_es
      : locale === "fr"
        ? tour.summary_fr
        : tour.summary_en;

  return (
    <div className="group w-full bg-white rounded-3xl overflow-hidden border border-[#E8E2D5] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Tour Cover Image */}
      <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#EFECE4]">
        <img
          src={tour.cover_image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-[#133B4A]/90 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
          {tour.category.replace("-", " ")}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#133B4A] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 text-[#C59B3B] fill-[#C59B3B]" />
          <span>{tour.rating}</span>
          <span className="text-slate-400 font-normal">
            ({tour.reviews_count})
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C59B3B]" />
            {tour.city}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#C59B3B]" />
            {tour.duration}
          </span>
        </div>

        <Link href={`/tours/${tour.slug}`}>
          <h3 className="text-base sm:text-lg font-extrabold text-[#133B4A] group-hover:text-[#C59B3B] transition-colors line-clamp-2 mb-1.5">
            {title}
          </h3>
        </Link>

        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 sm:mb-6 flex-grow">
          {summary}
        </p>

        {/* Price & Details Button */}
        <div className="pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              {t("from")}
            </span>
            <span className="text-xl sm:text-2xl font-extrabold text-[#133B4A]">
              ${tour.price}
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500">
              {" "}
              {t("perPerson")}
            </span>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-1.5 bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-xs px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full transition-colors"
          >
            <span>{t("viewDetails")}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59B3B]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
