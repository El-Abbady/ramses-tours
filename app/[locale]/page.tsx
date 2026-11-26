import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import TourCard, { Tour } from "../../components/TourCard";
import ReviewsCarousel from "../../components/ReviewsCarousel";
import {
  Search,
  ShieldCheck,
  Award,
  Headphones,
  Compass,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const QUICK_FILTER_PILLS = [
  { label: "Top Picks", href: "/tours" },
  { label: "Cairo", href: "/tours?category=city-tour&city=Cairo" },
  { label: "Luxor", href: "/tours?category=city-tour&city=Luxor" },
  { label: "Aswan", href: "/tours?category=city-tour&city=Aswan" },
  { label: "Hurghada", href: "/tours?category=city-tour&city=Hurghada" },
  { label: "Nile Cruises", href: "/tours?category=nile-cruise" },
  { label: "Egypt Packages", href: "/tours?category=package" },
  { label: "Desert Safari", href: "/tours?category=desert-safari" },
];

export default async function HomePage() {
  const hero = await getTranslations("Hero");
  const toursT = await getTranslations("Tours");

  const supabase = await createClient();
  const { data: tours } = await supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div className="bg-[#FAF9F6]">
      {/* 1. Sunlit Split Hero Section */}
      <section className="relative overflow-hidden border-b border-[#E8E2D5] bg-gradient-to-b from-[#FAF9F6] via-[#F5F2EA] to-[#FAF9F6] py-10 md:py-24">
        <div className="hidden lg:block pointer-events-none absolute right-[8%] top-12 w-[420px] h-[420px] rounded-full bg-[#EFE9DC]/80 blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Subtitle & Pill Search Bar */}
            <div className="lg:col-span-7 text-left">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#C59B3B]/15 border border-[#C59B3B]/30 text-[#9B7724] text-[11px] sm:text-xs font-extrabold tracking-widest uppercase mb-4">
                {hero("badge")}
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#133B4A] leading-[1.12] tracking-tight mb-4">
                {hero("title")}
              </h1>

              <p className="text-slate-600 max-w-xl text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {hero("subtitle")}
              </p>

              {/* Pill Search Bar */}
              <form
                action="/tours"
                className="max-w-xl bg-white p-1.5 sm:p-2 rounded-full border border-[#E2DBD0] shadow-lg flex items-center gap-2"
              >
                <div className="flex items-center gap-2.5 pl-3.5 sm:pl-4 py-1.5 sm:py-2 flex-grow text-slate-700">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59B3B] shrink-0" />
                  <input
                    type="text"
                    name="q"
                    placeholder={hero("searchPlaceholder")}
                    className="w-full bg-transparent text-xs sm:text-sm focus:outline-none text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors cursor-pointer shrink-0 flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59B3B]" />
                  <span>{hero("exploreBtn")}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Floating Featured White Desert Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Link
                href="/tours?category=desert-safari"
                className="group w-full max-w-[370px] bg-white rounded-3xl p-3 border border-[#E8E2D5] shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-[240px] sm:h-[310px] w-full rounded-2xl overflow-hidden bg-[#EFECE4]">
                  <img
                    src="/hero-safari.jpeg"
                    alt="Private White & Black Desert Safari with Ramess Tours"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#133B4A]/95 backdrop-blur-sm text-white text-[11px] sm:text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow">
                    Private Safari • All-Inclusive
                  </span>
                </div>

                <div className="pt-3.5 px-1.5 pb-1">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#133B4A] group-hover:text-[#C59B3B] transition-colors">
                    White &amp; Black Desert Private Expedition
                  </h3>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="flex items-center gap-1 font-extrabold text-[#C59B3B]">
                      <Star className="w-3.5 h-3.5 fill-[#C59B3B]" />
                      5.0{" "}
                      <span className="text-slate-400 font-normal">
                        (Verified Guide)
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#133B4A]" />
                      White Desert
                    </span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Door-to-door transfer
                    </span>
                    <span className="font-extrabold text-[#133B4A]">
                      Explore →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Experiences: Horizontal Snap Carousel on Mobile, 3-Col Grid on Desktop */}
      <section className="max-w-7xl mx-auto pt-12 pb-14 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#C59B3B] block mb-1.5">
            TOP EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#133B4A] mb-2">
            {toursT("featuredTitle")}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            {toursT("featuredSubtitle")}
          </p>
        </div>

        {/* Single-Line Swipeable Filter Pills on Mobile */}
        <div className="no-scrollbar flex md:flex-wrap items-center md:justify-center gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-2 mb-6 md:mb-10">
          {QUICK_FILTER_PILLS.map((pill, idx) => (
            <Link
              key={pill.label}
              href={pill.href}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                idx === 0
                  ? "bg-[#133B4A] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-[#E5DFD3] hover:border-[#133B4A] hover:text-[#133B4A]"
              }`}
            >
              {pill.label}
            </Link>
          ))}
        </div>

        {/* Tours Carousel (Mobile) / Grid (Desktop) */}
        {tours && tours.length > 0 ? (
          <>
            <div className="no-scrollbar flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-4">
              {(tours as Tour[]).map((tour) => (
                <div
                  key={tour.id}
                  className="snap-center shrink-0 w-[82vw] max-w-[330px] md:w-auto md:max-w-none flex"
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-12 text-center px-4">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-xs sm:text-sm px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-colors shadow-sm"
              >
                <span>{hero("exploreBtn")}</span>
                <span className="text-[#C59B3B]">→</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="mx-4 sm:mx-6 lg:mx-8 bg-white border border-dashed border-[#D8D0C2] rounded-2xl p-10 text-center">
            <p className="text-slate-700 font-semibold mb-1">
              No tours added yet in the database.
            </p>
            <p className="text-xs sm:text-sm text-slate-500">
              Publish your tours from the Admin Dashboard and they will appear
              right here.
            </p>
          </div>
        )}
      </section>

      {/* 3. Multilingual Traveler Reviews Carousel (Mobile + Desktop) */}
      <ReviewsCarousel />

      {/* 4. Trust Carousel on Mobile, 4-Column Row on Desktop */}
      <section className="bg-white border-t border-[#E8E2D5] pt-8 pb-20 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="no-scrollbar flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-1">
            <div className="snap-start shrink-0 w-[72vw] max-w-[270px] lg:w-auto lg:max-w-none flex items-center gap-3.5 bg-[#FAF9F6] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[#E8E2D5] lg:border-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white lg:bg-[#FAF9F6] border border-[#E8E2D5] text-[#133B4A] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B3B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#133B4A] text-xs sm:text-sm leading-snug">
                  Expert Egyptologists
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Licensed guides
                </p>
              </div>
            </div>

            <div className="snap-start shrink-0 w-[72vw] max-w-[270px] lg:w-auto lg:max-w-none flex items-center gap-3.5 bg-[#FAF9F6] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[#E8E2D5] lg:border-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white lg:bg-[#FAF9F6] border border-[#E8E2D5] text-[#133B4A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B3B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#133B4A] text-xs sm:text-sm leading-snug">
                  No Hidden Fees
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Free cancellation
                </p>
              </div>
            </div>

            <div className="snap-start shrink-0 w-[72vw] max-w-[270px] lg:w-auto lg:max-w-none flex items-center gap-3.5 bg-[#FAF9F6] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[#E8E2D5] lg:border-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white lg:bg-[#FAF9F6] border border-[#E8E2D5] text-[#133B4A] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B3B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#133B4A] text-xs sm:text-sm leading-snug">
                  Tailor-Made Trips
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  Private itineraries
                </p>
              </div>
            </div>

            <div className="snap-start shrink-0 w-[72vw] max-w-[270px] lg:w-auto lg:max-w-none flex items-center gap-3.5 bg-[#FAF9F6] lg:bg-transparent p-4 lg:p-0 rounded-2xl border border-[#E8E2D5] lg:border-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white lg:bg-[#FAF9F6] border border-[#E8E2D5] text-[#133B4A] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B3B]" />
              </div>
              <div>
                <h4 className="font-bold text-[#133B4A] text-xs sm:text-sm leading-snug">
                  24/7 Local Support
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500">
                  WhatsApp in Egypt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
