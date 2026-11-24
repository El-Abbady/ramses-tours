import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import TourCard, { Tour } from "../../../components/TourCard";
import { Link } from "@/i18n/routing";

const PAGE_HEADINGS: Record<string, { title: string; subtitle: string }> = {
  "city-tour": {
    title: "Egypt City Tours",
    subtitle:
      "Private day excursions and guided tours in Cairo, Luxor, Aswan, Hurghada, and Alexandria.",
  },
  package: {
    title: "Egypt Holiday Packages",
    subtitle:
      "All-inclusive multi-day Egypt itineraries combining Cairo, Nile Cruises, and Red Sea stays.",
  },
  "nile-cruise": {
    title: "Luxury Nile Cruises",
    subtitle:
      "5-Star Deluxe and Luxury Nile River cruises sailing between Luxor and Aswan.",
  },
  "desert-safari": {
    title: "Egypt Desert Safari",
    subtitle:
      "4x4 White Desert camping, Siwa Oasis expeditions, and Red Sea quad adventures.",
  },
};

const CITY_FILTERS = ["Cairo", "Luxor", "Aswan", "Hurghada", "Alexandria"];

export default async function AllToursPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    city?: string;
    duration?: string;
    q?: string;
  }>;
}) {
  const params = await searchParams;
  const toursT = await getTranslations("Tours");

  const supabase = await createClient();
  let query = supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });

  if (params.category) {
    query = query.eq("category", params.category);
  }
  if (params.city) {
    query = query.ilike("city", `%${params.city}%`);
  }
  if (params.duration) {
    query = query.ilike("duration", `%${params.duration}%`);
  }
  if (params.q) {
    query = query.or(
      `title_en.ilike.%${params.q}%,city.ilike.%${params.q}%,cities_covered.ilike.%${params.q}%,sailing_route.ilike.%${params.q}%`,
    );
  }

  const { data: tours } = await query;

  const categories = [
    { id: "", label: "All Experiences" },
    { id: "city-tour", label: "City Tours" },
    { id: "package", label: "Packages" },
    { id: "nile-cruise", label: "Nile Cruises" },
    { id: "desert-safari", label: "Desert Safari" },
  ];

  const activeMeta = params.category ? PAGE_HEADINGS[params.category] : null;
  const headingTitle = params.city
    ? `${params.city} Tours`
    : params.duration
      ? `${params.duration} Egypt Packages`
      : activeMeta?.title || "Explore All Egypt Tours";

  const headingSubtitle = activeMeta?.subtitle || toursT("featuredSubtitle");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          {headingTitle}
        </h1>
        <p className="text-slate-600">{headingSubtitle}</p>
      </div>

      {/* Main Category Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-5">
        {categories.map((cat) => {
          const isActive = (params.category || "") === cat.id;
          return (
            <Link
              key={cat.id}
              href={cat.id ? `/tours?category=${cat.id}` : "/tours"}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                isActive
                  ? "bg-slate-900 text-amber-400 shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-amber-400"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* City Sub-Filter Pills (Shown when City Tours is selected) */}
      {params.category === "city-tour" && (
        <div className="flex flex-wrap items-center gap-2 mb-8 pt-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Filter by City:
          </span>
          <Link
            href="/tours?category=city-tour"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              !params.city
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-100 text-slate-700 hover:bg-amber-100"
            }`}
          >
            All Cities
          </Link>
          {CITY_FILTERS.map((cityName) => {
            const isCityActive =
              params.city?.toLowerCase() === cityName.toLowerCase();
            return (
              <Link
                key={cityName}
                href={`/tours?category=city-tour&city=${cityName}`}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isCityActive
                    ? "bg-amber-500 text-slate-950"
                    : "bg-slate-100 text-slate-700 hover:bg-amber-100"
                }`}
              >
                {cityName}
              </Link>
            );
          })}
        </div>
      )}

      {/* Active Duration Badge for Packages */}
      {params.duration && (
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full">
            Duration: {params.duration}
          </span>
          <Link
            href="/tours?category=package"
            className="text-xs font-bold text-slate-500 hover:text-slate-900 underline"
          >
            Show all package durations
          </Link>
        </div>
      )}

      {/* Tours Grid */}
      {tours && tours.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(tours as Tour[]).map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
          <p className="text-lg font-semibold text-slate-700 mb-2">
            No tours found in this selection
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Try clearing the filters or check back once listings are published
            from the Admin Dashboard.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-amber-500 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-xl"
          >
            View All Experiences
          </Link>
        </div>
      )}
    </div>
  );
}
