import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import TourCard, { Tour } from "../../components/TourCard";
import { Search, ShieldCheck, Award, Headphones, Compass } from "lucide-react";

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
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-slate-950 text-white py-24 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
            {hero("badge")}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-4xl mx-auto leading-tight mb-6">
            {hero("title")}
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl mb-10">
            {hero("subtitle")}
          </p>

          {/* Search Bar Box */}
          <form
            action="/tours"
            className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 flex-grow text-slate-700">
              <Search className="w-5 h-5 text-amber-500 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder={hero("searchPlaceholder")}
                className="w-full bg-transparent text-sm focus:outline-none text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-7 py-3.5 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              {hero("exploreBtn")}
            </button>
          </form>
        </div>
      </section>

      {/* 2. Why Choose Ramses Tours */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Expert Egyptologists
                </h4>
                <p className="text-xs text-slate-500">
                  Licensed multilingual guides
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  No Hidden Fees
                </h4>
                <p className="text-xs text-slate-500">
                  Flexible booking & free cancellation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Tailor-Made Itineraries
                </h4>
                <p className="text-xs text-slate-500">
                  Private tours designed for you
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  24/7 Local Support
                </h4>
                <p className="text-xs text-slate-500">
                  Direct WhatsApp assistance in Egypt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Tours Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">
              {toursT("featuredTitle")}
            </h2>
            <p className="text-slate-600">{toursT("featuredSubtitle")}</p>
          </div>
          <Link
            href="/tours"
            className="text-amber-600 hover:text-amber-700 font-bold text-sm underline underline-offset-4"
          >
            {hero("exploreBtn")} →
          </Link>
        </div>

        {tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(tours as Tour[]).map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
            <p className="text-slate-600 font-medium mb-2">
              No tours added yet in the database.
            </p>
            <p className="text-sm text-slate-400">
              Once we build the Admin Dashboard in the next step, your tours
              will appear right here!
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
