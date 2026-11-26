"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import {
  Compass,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Mail,
  ShieldCheck,
  Clock,
  Award,
  ArrowLeft,
} from "lucide-react";

const DESTINATIONS = [
  "Cairo & Giza Pyramids",
  "Luxor (East & West Bank)",
  "Aswan & Philae",
  "Abu Simbel",
  "Nile River Cruise",
  "White & Black Desert",
  "Hurghada & Red Sea",
  "Alexandria",
  "Sharm El Sheikh & Sinai",
];

const INTERESTS = [
  "Ancient Temples & Pyramids",
  "Luxury Nile Cruise",
  "Private Desert Safari",
  "Red Sea Snorkeling & Diving",
  "Family-Friendly Pace",
  "Photography & Hidden Gems",
  "Local Cuisine & Bazaars",
  "Airport VIP Meet & Assist",
];

const ACCOMMODATION_TIERS = [
  "5-Star Luxury Hotels & Deluxe Nile Cruise",
  "4-Star Boutique & Comfort Hotels",
  "Day Tours & Transfers Only (Hotels Booked)",
  "Flexible / Mix of Hotels & Desert Camp",
];

const GUIDE_LANGUAGES = ["English", "Español", "Français"];

export default function CustomTripPage() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    "Cairo & Giza Pyramids",
    "Luxor (East & West Bank)",
  ]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Ancient Temples & Pyramids",
  ]);
  const [arrivalDate, setArrivalDate] = useState("");
  const [duration, setDuration] = useState("7 Days / 6 Nights");
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [accommodation, setAccommodation] = useState(ACCOMMODATION_TIERS[0]);
  const [guideLanguage, setGuideLanguage] = useState("English");
  const [budget, setBudget] = useState("$1,000 – $2,000 per person");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const toggleItem = (
    item: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  const buildTripSummary = () => {
    return [
      `Hello Ramess Tours! I would like to plan a Custom Egypt Trip:`,
      ``,
      `*Name:* ${fullName || "Traveler"}`,
      email ? `*Email:* ${email}` : null,
      phone ? `*WhatsApp / Phone:* ${phone}` : null,
      `*Destinations:* ${selectedDestinations.length > 0 ? selectedDestinations.join(", ") : "Flexible"}`,
      `*Arrival Date:* ${arrivalDate || "Flexible"}`,
      `*Duration:* ${duration}`,
      `*Travelers:* ${adults} Adult(s)${childrenCount > 0 ? `, ${childrenCount} Child(ren)` : ""}`,
      `*Guide Language:* ${guideLanguage}`,
      `*Accommodation Style:* ${accommodation}`,
      `*Estimated Budget:* ${budget}`,
      `*Interests:* ${selectedInterests.length > 0 ? selectedInterests.join(", ") : "Classic Highlights"}`,
      notes ? `*Special Requests:* ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(buildTripSummary());
    window.open(`https://wa.me/201508842101?text=${message}`, "_blank");
  };

  const handleEmailSubmit = () => {
    const subject = encodeURIComponent(
      `Custom Egypt Trip Request - ${fullName || "Ramess Tours Guest"} (${duration})`,
    );
    const body = encodeURIComponent(buildTripSummary().replace(/\*/g, ""));
    window.location.href = `mailto:ramess101egy@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Top Breadcrumb & Sunlit Header */}
      <section className="border-b border-[#E8E2D5] bg-gradient-to-b from-[#FAF9F6] via-[#F4F0E6] to-[#FAF9F6] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#133B4A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C59B3B]" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C59B3B]/15 border border-[#C59B3B]/30 text-[#9B7724] text-xs font-extrabold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailor-Made Egypt Itinerary</span>
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#133B4A] leading-tight mb-4">
              Plan Your Custom Egypt Trip
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Tell us where you want to go, your travel pace, and your preferred
              style. Our licensed Egyptologist team will craft a private,
              door-to-door itinerary within 24 hours—with zero obligation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Form & Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <form
          onSubmit={handleWhatsAppSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Interactive Trip Builder (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Destinations */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-8 rounded-full bg-[#133B4A] text-[#C59B3B] font-extrabold text-sm flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xl font-extrabold text-[#133B4A]">
                  Where would you like to visit?
                </h2>
              </div>
              <p className="text-sm text-slate-500 mb-5 pl-11">
                Select one or more destinations across Egypt.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {DESTINATIONS.map((dest) => {
                  const active = selectedDestinations.includes(dest);
                  return (
                    <button
                      type="button"
                      key={dest}
                      onClick={() =>
                        toggleItem(
                          dest,
                          selectedDestinations,
                          setSelectedDestinations,
                        )
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#133B4A] text-white shadow-xs"
                          : "bg-[#FAF9F6] text-slate-700 border border-[#E2DBD0] hover:border-[#133B4A]"
                      }`}
                    >
                      <MapPin
                        className={`w-3.5 h-3.5 ${active ? "text-[#C59B3B]" : "text-slate-400"}`}
                      />
                      <span>{dest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Dates, Duration & Group Size */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#133B4A] text-[#C59B3B] font-extrabold text-sm flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xl font-extrabold text-[#133B4A]">
                  Dates, Duration &amp; Travelers
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Preferred Arrival Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Trip Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  >
                    <option>3 Days / 2 Nights</option>
                    <option>4 Days / 3 Nights</option>
                    <option>5 Days / 4 Nights</option>
                    <option>6 Days / 5 Nights</option>
                    <option>7 Days / 6 Nights</option>
                    <option>8 Days / 7 Nights</option>
                    <option>10 Days / 9 Nights</option>
                    <option>12+ Days Grand Egypt Tour</option>
                    <option>Day Tours Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Adults (12+ yrs)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value) || 1)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Children (Under 12)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={childrenCount}
                    onChange={(e) =>
                      setChildrenCount(Number(e.target.value) || 0)
                    }
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Travel Style, Language & Interests */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#133B4A] text-[#C59B3B] font-extrabold text-sm flex items-center justify-center">
                  3
                </span>
                <h2 className="text-xl font-extrabold text-[#133B4A]">
                  Style, Guide Language &amp; Interests
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Accommodation &amp; Cruise Tier
                  </label>
                  <select
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  >
                    {ACCOMMODATION_TIERS.map((tier) => (
                      <option key={tier}>{tier}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Estimated Budget (Excluding Flights)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  >
                    <option>Under $800 per person</option>
                    <option>$800 – $1,200 per person</option>
                    <option>$1,000 – $2,000 per person</option>
                    <option>$2,000 – $3,500 per person</option>
                    <option>$3,500+ Ultra-Luxury Private</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Preferred Egyptologist Guide Language
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {GUIDE_LANGUAGES.map((lang) => (
                    <button
                      type="button"
                      key={lang}
                      onClick={() => setGuideLanguage(lang)}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        guideLanguage === lang
                          ? "bg-[#133B4A] text-white"
                          : "bg-[#FAF9F6] text-slate-700 border border-[#E2DBD0] hover:border-[#133B4A]"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  What experiences matter most to you?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS.map((interest) => {
                    const active = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() =>
                          toggleItem(
                            interest,
                            selectedInterests,
                            setSelectedInterests,
                          )
                        }
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          active
                            ? "bg-[#C59B3B] text-[#133B4A]"
                            : "bg-[#FAF9F6] text-slate-700 border border-[#E2DBD0] hover:border-[#C59B3B]"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#133B4A] text-[#C59B3B] font-extrabold text-sm flex items-center justify-center">
                  4
                </span>
                <h2 className="text-xl font-extrabold text-[#133B4A]">
                  Your Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Miller"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 555 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  Special Requests, Must-See Temples, or Flight Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your dream Egypt trip, special occasions, accessibility needs, or specific temples like Abu Simbel or Dendera..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E2DBD0] focus:border-[#133B4A] rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky Trip Summary Card (4 cols) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D5] shadow-lg">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#C59B3B] mb-2">
                <Compass className="w-4 h-4" />
                <span>Your Trip Summary</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#133B4A] mb-5">
                Private Tailor-Made Plan
              </h3>

              <div className="space-y-3.5 text-sm border-y border-slate-100 py-4 mb-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-slate-500 flex items-center gap-1.5 shrink-0">
                    <MapPin className="w-4 h-4 text-[#C59B3B]" />
                    Destinations
                  </span>
                  <span className="font-bold text-[#133B4A] text-right">
                    {selectedDestinations.length > 0
                      ? selectedDestinations.join(", ")
                      : "Flexible"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#C59B3B]" />
                    Duration
                  </span>
                  <span className="font-bold text-[#133B4A]">{duration}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C59B3B]" />
                    Travelers
                  </span>
                  <span className="font-bold text-[#133B4A]">
                    {adults} Adult{adults > 1 ? "s" : ""}
                    {childrenCount > 0 ? `, ${childrenCount} Child` : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">Guide Language</span>
                  <span className="font-bold text-[#133B4A]">
                    {guideLanguage}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#C59B3B]" />
                  <span>Send Plan via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF9F6] hover:bg-[#F1EDE2] text-[#133B4A] border border-[#E2DBD0] font-bold text-sm py-3 px-6 rounded-full transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#C59B3B]" />
                  <span>Send via Email Instead</span>
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% private vehicles &amp; licensed Egyptologist</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C59B3B] shrink-0" />
                  <span>Custom itinerary &amp; quote within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C59B3B] shrink-0" />
                  <span>Free changes &amp; no booking fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C59B3B] shrink-0" />
                  <span>Direct local support in Cairo, Luxor &amp; Aswan</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
