import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import TourCard, { Tour } from "../../../components/TourCard";
import { Link } from "@/i18n/routing";

export default async function AllToursPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; city?: string; q?: string }>;
}) {
  const params = await searchParams;
  const t = await getTranslations("Navbar");
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
  if (params.q) {
    query = query.or(
      `title_en.ilike.%${params.q}%,title_es.ilike.%${params.q}%,title_fr.ilike.%${params.q}%,city.ilike.%${params.q}%`
    );
  }

  const { data: tours } = await query;

  const categories = [
    { id: "", label: "All Tours" },
    { id: "day-tours", label: t("dayTours") },
    { id: "nile-cruises", label: t("nileCruises") },
    { id: "packages", label: "Egypt Packages" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          {t("tours")}
        </h1>
        <p className="text-slate-600">{toursT("featuredSubtitle")}</p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-10">
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
            No tours found
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Try clearing the filters or check back once tours are published from
            the Admin Dashboard.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-amber-500 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-xl"
          >
            View All Tours
          </Link>
        </div>
      )}
    </div>
  );
}
