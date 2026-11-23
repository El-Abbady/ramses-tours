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
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* صورة الرحلة */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-200">
        <img
          src={tour.cover_image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
          {tour.category.replace("-", " ")}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>{tour.rating}</span>
          <span className="text-slate-400 font-normal">
            ({tour.reviews_count})
          </span>
        </div>
      </div>

      {/* تفاصيل الكارت */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            {tour.city}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            {tour.duration}
          </span>
        </div>

        <Link href={`/tours/${tour.slug}`}>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-slate-600 line-clamp-2 mb-6 flex-grow">
          {summary}
        </p>

        {/* السعر وزر التفاصيل */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">{t("from")}</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ${tour.price}
            </span>
            <span className="text-xs text-slate-500"> {t("perPerson")}</span>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
          >
            <span>{t("viewDetails")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
