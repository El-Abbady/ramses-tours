import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookingForm from "../../../../components/BookingForm";
import TourGalleryCarousel from "../../../../components/TourGalleryCarousel";
import {
  MapPin,
  Clock,
  Star,
  Check,
  X,
  Sparkles,
  UserCheck,
  Navigation,
  Globe,
  DollarSign,
  Ship,
  Compass,
} from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  "city-tour": "City Tour",
  package: "Egypt Package",
  "nile-cruise": "Nile Cruise",
  "desert-safari": "Desert Safari",
};

export default async function TourDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("Tours");

  const supabase = await createClient();
  const { data: tour } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tour) {
    notFound();
  }

  const title = tour.title_en;
  const summary = tour.summary_en;
  const description = tour.itinerary || tour.description_en;

  const highlightsList: string[] = Array.isArray(tour.highlights)
    ? tour.highlights
    : [];
  const includedList: string[] = Array.isArray(tour.included)
    ? tour.included
    : [];
  const excludedList: string[] = Array.isArray(tour.excluded)
    ? tour.excluded
    : [];
  const galleryList: string[] =
    Array.isArray(tour.gallery) && tour.gallery.length > 0
      ? tour.gallery
      : tour.cover_image
        ? [tour.cover_image]
        : [];
  const pricingLines: string[] = tour.pricing_tiers
    ? tour.pricing_tiers.split("\n").filter((l: string) => l.trim() !== "")
    : [];

  const categoryBadge =
    CATEGORY_LABELS[tour.category] || tour.category.replace("-", " ");

  const locationDisplay =
    tour.category === "nile-cruise"
      ? tour.sailing_route || tour.city
      : tour.category === "package"
        ? tour.cities_covered || tour.city
        : tour.city;

  return (
    <div className="bg-slate-50 pb-20">
      {/* Top Header Banner */}
      <div className="relative h-[340px] md:h-[400px] w-full bg-slate-950">
        <img
          src={tour.cover_image}
          alt={title}
          className="w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="bg-amber-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
              {categoryBadge}
            </span>
            {tour.ship_class && (
              <span className="bg-slate-800/90 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full">
                {tour.ship_class}
                {tour.ship_name ? ` • ${tour.ship_name}` : ""}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm text-amber-400 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              {tour.rating} ({tour.reviews_count} reviews)
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold max-w-4xl leading-tight mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              {tour.category === "nile-cruise"
                ? "Sailing Route"
                : tour.category === "package"
                  ? "Destinations"
                  : t("city")}
              : <strong>{locationDisplay}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              {t("duration")}: <strong>{tour.duration}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content + Sticky Booking Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large Carousel Gallery */}
            <TourGalleryCarousel images={galleryList} title={title} />

            {/* Quick Facts Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {tour.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {tour.category === "nile-cruise" ? (
                  <Ship className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : tour.category === "desert-safari" ? (
                  <Compass className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <UserCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    {tour.category === "nile-cruise"
                      ? "Ship Category"
                      : tour.category === "desert-safari"
                        ? "Safari Type"
                        : "Tour Type"}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {tour.category === "nile-cruise"
                      ? tour.ship_class || "5-Star Deluxe"
                      : tour.category === "desert-safari"
                        ? tour.activity_type || tour.tour_type
                        : tour.tour_type || "Private Tour"}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    Pick up & Drop off
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {tour.pickup_dropoff || locationDisplay}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">
                    Guide Languages
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {tour.guide_languages || "English, Spanish, French"}
                  </span>
                </div>
              </div>
            </div>

            {/* Overview & Highlights */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-3">
                  Overview
                </h2>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                  {summary}
                </p>
              </div>

              {highlightsList.length > 0 && (
                <div className="pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Highlights</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                    {highlightsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Day-by-Day Itinerary */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5">
                {t("itinerary")}
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                {description}
              </div>
            </div>

            {/* Prices Quoted Per Person */}
            {pricingLines.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <span>Prices Quoted Per Person in USD ($)</span>
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {pricingLines.map((line, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-50/60"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included & Excluded */}
            {(includedList.length > 0 || excludedList.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                    {t("included")}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    {includedList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </span>
                    {t("excluded")}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    {excludedList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Form */}
          <div className="lg:col-span-1">
            <BookingForm
              tourId={tour.id}
              tourTitle={tour.title_en}
              pricePerPerson={tour.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
