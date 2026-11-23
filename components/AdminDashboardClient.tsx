"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "@/i18n/routing";
import {
  Plus,
  Trash2,
  Pencil,
  LogOut,
  CalendarCheck,
  Map,
  Users,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Loader2,
  X,
  MessageCircle,
  BarChart3,
  Compass,
  Ship,
  Briefcase,
  Globe,
} from "lucide-react";

export default function AdminDashboardClient({
  initialTours,
  initialBookings,
  userEmail,
}: {
  initialTours: any[];
  initialBookings: any[];
  userEmail: string;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"bookings" | "tours" | "form">(
    "bookings",
  );
  const [bookingFilter, setBookingFilter] = useState<
    "all" | "pending" | "confirmed" | "cancelled"
  >("all");
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
  const [tours, setTours] = useState(initialTours);
  const [bookings, setBookings] = useState(initialBookings);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Live Statistics Calculations
  const totalBookings = bookings.length;
  const pendingBookingsCount = bookings.filter(
    (b) => (b.status || "pending") === "pending",
  ).length;
  const confirmedBookingsCount = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const cancelledBookingsCount = bookings.filter(
    (b) => b.status === "cancelled",
  ).length;

  const totalTours = tours.length;
  const dayToursCount = tours.filter((t) => t.category === "day-tours").length;
  const nileCruisesCount = tours.filter(
    (t) => t.category === "nile-cruises",
  ).length;
  const packagesCount = tours.filter((t) => t.category === "packages").length;

  const filteredBookings =
    bookingFilter === "all"
      ? bookings
      : bookings.filter((b) => (b.status || "pending") === bookingFilter);

  // Tour Form Fields (Single Language — GTranslate handles all visitor languages)
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("day-tours");
  const [city, setCity] = useState("Aswan");
  const [duration, setDuration] = useState("2 Days / 1 Night");
  const [tourType, setTourType] = useState("Private Tour");
  const [pickupDropoff, setPickupDropoff] = useState(
    "Aswan Hotel / Airport / Cruise",
  );
  const [guideLanguages, setGuideLanguages] = useState(
    "English, Spanish, French",
  );
  const [price, setPrice] = useState(300);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [pricingTiers, setPricingTiers] = useState(
    "Single Person = $600\nFrom 2 to 3 People = $370 per person\nFrom 4 to 10 People = $300 per person\nChild (6 to 11 yrs) = 50% of adult price",
  );

  const [titleEn, setTitleEn] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [descEn, setDescEn] = useState("");

  const [highlightsText, setHighlightsText] = useState("");
  const [includedText, setIncludedText] = useState("");
  const [excludedText, setExcludedText] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const resetFormForCreate = () => {
    setEditingTourId(null);
    setSlug("");
    setCategory("day-tours");
    setCity("Cairo");
    setDuration("1 Day (8 Hours)");
    setTourType("Private Tour");
    setPickupDropoff("Hotel / Airport");
    setGuideLanguages("English, Spanish, French");
    setPrice(85);
    setUploadedImages([]);
    setPricingTiers(
      "Single Person = $150\nFrom 2 to 3 People = $95 per person\nFrom 4 to 10 People = $85 per person\nChild (6 to 11 yrs) = 50% of adult price",
    );
    setTitleEn("");
    setSummaryEn("");
    setDescEn("");
    setHighlightsText(
      "Private Egyptologist Tour Guide\nHassle-free hotel transfers",
    );
    setIncludedText(
      "Hotel pickup and drop-off\nPrivate air-conditioned vehicle\nLicensed Egyptologist guide\nBottled water",
    );
    setExcludedText("Entrance fees to monuments\nPersonal expenses & tipping");
    setActiveTab("form");
  };

  const startEditingTour = (tour: any) => {
    setEditingTourId(tour.id);
    setSlug(tour.slug || "");
    setCategory(tour.category || "day-tours");
    setCity(tour.city || "");
    setDuration(tour.duration || "");
    setTourType(tour.tour_type || "Private Tour");
    setPickupDropoff(tour.pickup_dropoff || "");
    setGuideLanguages(tour.guide_languages || "English, Spanish, French");
    setPrice(tour.price || 0);
    setUploadedImages(
      Array.isArray(tour.gallery) && tour.gallery.length > 0
        ? tour.gallery
        : tour.cover_image
          ? [tour.cover_image]
          : [],
    );
    setPricingTiers(tour.pricing_tiers || "");
    setTitleEn(tour.title_en || "");
    setSummaryEn(tour.summary_en || "");
    setDescEn(tour.description_en || "");
    setHighlightsText(
      Array.isArray(tour.highlights) ? tour.highlights.join("\n") : "",
    );
    setIncludedText(
      Array.isArray(tour.included) ? tour.included.join("\n") : "",
    );
    setExcludedText(
      Array.isArray(tour.excluded) ? tour.excluded.join("\n") : "",
    );
    setActiveTab("form");
  };

  const handleImageFilesChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("tour-images")
        .upload(fileName, file);

      if (uploadError) {
        alert(`Failed to upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("tour-images")
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) {
        newUrls.push(publicUrlData.publicUrl);
      }
    }

    setUploadedImages((prev) => [...prev, ...newUrls]);
    setUploadingImages(false);
    e.target.value = "";
  };

  const removeUploadedImage = (indexToRemove: number) => {
    setUploadedImages(uploadedImages.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSaveTour = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      alert("Please upload at least one image from your PC for this tour.");
      return;
    }

    setSaving(true);

    const formattedSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

    const tourPayload = {
      slug: formattedSlug,
      category,
      city,
      duration,
      tour_type: tourType,
      pickup_dropoff: pickupDropoff,
      guide_languages: guideLanguages,
      price: Number(price),
      pricing_tiers: pricingTiers,
      cover_image: uploadedImages[0],
      gallery: uploadedImages,
      title_en: titleEn,
      title_es: titleEn,
      title_fr: titleEn,
      summary_en: summaryEn,
      summary_es: summaryEn,
      summary_fr: summaryEn,
      description_en: descEn,
      description_es: descEn,
      description_fr: descEn,
      highlights: highlightsText
        .split("\n")
        .filter((line) => line.trim() !== ""),
      included: includedText.split("\n").filter((line) => line.trim() !== ""),
      excluded: excludedText.split("\n").filter((line) => line.trim() !== ""),
      is_featured: true,
    };

    if (editingTourId) {
      const { data, error } = await supabase
        .from("tours")
        .update(tourPayload)
        .eq("id", editingTourId)
        .select()
        .single();

      setSaving(false);

      if (error) {
        alert("Error updating tour: " + error.message);
        return;
      }

      setTours(tours.map((t) => (t.id === editingTourId ? data : t)));
      setEditingTourId(null);
      setActiveTab("tours");
      router.refresh();
    } else {
      const { data, error } = await supabase
        .from("tours")
        .insert([tourPayload])
        .select()
        .single();

      setSaving(false);

      if (error) {
        alert("Error adding tour: " + error.message);
        return;
      }

      setTours([data, ...tours]);
      setActiveTab("tours");
      router.refresh();
    }
  };

  const handleDeleteTour = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    const { error } = await supabase.from("tours").delete().eq("id", id);
    if (!error) {
      setTours(tours.filter((t) => t.id !== id));
      router.refresh();
    }
  };

  const handleBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  const handleDeleteBooking = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to permanently delete this booking request from the database?",
      )
    ) {
      return;
    }

    const { error } = await supabase.from("bookings").delete().eq("id", id);

    if (error) {
      alert("Error deleting booking: " + error.message);
      return;
    }

    setBookings(bookings.filter((b) => b.id !== id));
    router.refresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Bar */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold">
            Ramses Tours <span className="text-amber-400">Admin Panel</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as: {userEmail}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 bg-slate-800 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* LIVE STATISTICS OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Booking Requests Statistics */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>Booking Requests Overview</span>
            </h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              Total: {totalBookings}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab("bookings");
                setBookingFilter("pending");
              }}
              className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-left hover:shadow transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <span className="text-xs font-bold uppercase">
                  New / Pending
                </span>
                <Clock className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold text-amber-900">
                {pendingBookingsCount}
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("bookings");
                setBookingFilter("confirmed");
              }}
              className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 text-left hover:shadow transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <span className="text-xs font-bold uppercase">Confirmed</span>
                <CheckCircle className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold text-emerald-900">
                {confirmedBookingsCount}
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("bookings");
                setBookingFilter("cancelled");
              }}
              className="p-4 rounded-xl bg-red-50 border border-red-200/80 text-left hover:shadow transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-red-700 mb-1">
                <span className="text-xs font-bold uppercase">Cancelled</span>
                <XCircle className="w-4 h-4" />
              </div>
              <p className="text-2xl font-extrabold text-red-900">
                {cancelledBookingsCount}
              </p>
            </button>
          </div>
        </div>

        {/* Card 2: Tours by Category Statistics */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span>Published Tours by Category</span>
            </h2>
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              Total: {totalTours}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("tours")}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-bold uppercase">Day Tours</span>
                <Compass className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {dayToursCount}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tours")}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-bold uppercase">
                  Nile Cruises
                </span>
                <Ship className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {nileCruisesCount}
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tours")}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-amber-400 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between text-slate-600 mb-1">
                <span className="text-xs font-bold uppercase">Packages</span>
                <Briefcase className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {packagesCount}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => {
            setActiveTab("bookings");
            setBookingFilter("all");
          }}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "bookings"
              ? "bg-slate-900 text-amber-400 shadow-md"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Booking Requests ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("tours")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "tours"
              ? "bg-slate-900 text-amber-400 shadow-md"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <span>Manage Tours ({tours.length})</span>
        </button>

        <button
          onClick={resetFormForCreate}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === "form" && !editingTourId
              ? "bg-amber-500 text-slate-950 shadow-md"
              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tour</span>
        </button>
      </div>

      {/* TAB 1: BOOKING REQUESTS */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {/* Status Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(
              [
                { id: "all", label: `All (${totalBookings})` },
                {
                  id: "pending",
                  label: `New / Pending (${pendingBookingsCount})`,
                },
                {
                  id: "confirmed",
                  label: `Confirmed (${confirmedBookingsCount})`,
                },
                {
                  id: "cancelled",
                  label: `Cancelled (${cancelledBookingsCount})`,
                },
              ] as const
            ).map((pill) => (
              <button
                key={pill.id}
                onClick={() => setBookingFilter(pill.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  bookingFilter === pill.id
                    ? "bg-amber-500 text-slate-950"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-amber-400"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-slate-600 font-semibold">
                No booking requests in this category.
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const cleanCustomerPhone = String(booking.phone || "").replace(
                /[^0-9]/g,
                "",
              );
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Lang: {booking.locale}
                      </span>
                      <span
                        className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-700"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {booking.status === "pending"
                          ? "New / Pending"
                          : booking.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        Travel Date: <strong>{booking.travel_date}</strong>
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900">
                      {booking.tour_title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                      <span className="font-bold text-slate-900">
                        {booking.full_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-amber-600" />
                        {booking.phone}
                      </span>
                      {booking.email && booking.email !== "Not provided" && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-amber-600" />
                          {booking.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        {booking.adults} Adults, {booking.children} Children
                      </span>
                    </div>

                    {booking.notes && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    )}
                  </div>

                  {/* Status & Direct WhatsApp Reply */}
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {cleanCustomerPhone && (
                      <a
                        href={`https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(
                          `Hello ${booking.full_name}, thank you for contacting Ramses Tours regarding "${booking.tour_title}".`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Reply WhatsApp
                      </a>
                    )}
                    <button
                      onClick={() =>
                        handleBookingStatus(booking.id, "confirmed")
                      }
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm
                    </button>
                    <button
                      onClick={() => handleBookingStatus(booking.id, "pending")}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </button>
                    <button
                      onClick={() =>
                        handleBookingStatus(booking.id, "cancelled")
                      }
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Cancel
                    </button>
                    {booking.status === "cancelled" && (
                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: MANAGE TOURS (WITH EDIT & DELETE) */}
      {activeTab === "tours" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col"
            >
              <img
                src={tour.cover_image}
                alt={tour.title_en}
                className="h-44 w-full object-cover"
              />
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-amber-600">
                    {tour.category} • {tour.city}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-1 mb-2">
                    {tour.title_en}
                  </h3>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="font-extrabold text-slate-900">
                    From ${tour.price}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => startEditingTour(tour)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ADD OR EDIT TOUR FORM (SINGLE LANGUAGE — GTRANSLATE READY) */}
      {activeTab === "form" && (
        <form
          onSubmit={handleSaveTour}
          className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                {editingTourId ? "Edit Existing Tour" : "Publish a New Tour"}
              </h2>
              <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                <Globe className="w-4 h-4" />
                <span>
                  Write once in English — the website translator automatically
                  translates it for visitors.
                </span>
              </p>
            </div>
            {editingTourId && (
              <button
                type="button"
                onClick={() => {
                  setEditingTourId(null);
                  setActiveTab("tours");
                }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer self-start"
              >
                Cancel Editing
              </button>
            )}
          </div>

          {/* Multi-Image Upload from PC */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6">
            <label className="block text-sm font-extrabold text-slate-900 mb-1">
              Tour Photos (Upload Multiple Images from Your PC) *
            </label>
            <p className="text-xs text-slate-500 mb-4">
              The first image is the main Cover Image; all images appear in the
              large tour carousel gallery.
            </p>

            <label className="inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer transition-colors">
              {uploadingImages ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading images...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Add Images from PC</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploadingImages}
                onChange={handleImageFilesChange}
                className="hidden"
              />
            </label>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-5">
                {uploadedImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden border border-slate-200 h-24 bg-white"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Core Tour Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                URL Slug (no spaces) *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white"
              >
                <option value="day-tours">Day Tours</option>
                <option value="nile-cruises">Nile Cruises</option>
                <option value="packages">Egypt Packages</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / Destination *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Duration *
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tour Type *
              </label>
              <input
                type="text"
                required
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pick up & Drop off *
              </label>
              <input
                type="text"
                required
                value={pickupDropoff}
                onChange={(e) => setPickupDropoff(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Guide Languages *
              </label>
              <input
                type="text"
                required
                value={guideLanguages}
                onChange={(e) => setGuideLanguages(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Starting From Price (USD) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Group Pricing Tiers */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Prices Quoted Per Person in USD (One per line)
            </label>
            <textarea
              rows={4}
              value={pricingTiers}
              onChange={(e) => setPricingTiers(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
            />
          </div>

          {/* Tour Content (English Only) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tour Title *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Overview *
              </label>
              <textarea
                rows={2}
                required
                value={summaryEn}
                onChange={(e) => setSummaryEn(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Day-by-Day Itinerary *
              </label>
              <textarea
                rows={6}
                required
                value={descEn}
                onChange={(e) => setDescEn(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* Highlights, Included & Excluded */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tour Highlights (One bullet per line)
              </label>
              <textarea
                rows={5}
                value={highlightsText}
                onChange={(e) => setHighlightsText(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                What&apos;s Included (One item per line)
              </label>
              <textarea
                rows={5}
                value={includedText}
                onChange={(e) => setIncludedText(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                What&apos;s Excluded (One item per line)
              </label>
              <textarea
                rows={5}
                value={excludedText}
                onChange={(e) => setExcludedText(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving || uploadingImages}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-md cursor-pointer"
          >
            {saving
              ? "Saving Changes..."
              : editingTourId
                ? "Update Tour Now"
                : "Publish Tour Now"}
          </button>
        </form>
      )}
    </div>
  );
}
