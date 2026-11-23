"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/client";
import {
  CheckCircle2,
  Send,
  Calendar,
  Users,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

interface BookingFormProps {
  tourId: string;
  tourTitle: string;
  pricePerPerson: number;
}

export default function BookingForm({
  tourId,
  tourTitle,
  pricePerPerson,
}: BookingFormProps) {
  const t = useTranslations("Booking");
  const locale = useLocale();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const estimatedTotal =
    adults * pricePerPerson + children * (pricePerPerson * 0.5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      tour_id: tourId,
      tour_title: tourTitle,
      full_name: fullName,
      email: email.trim() || "Not provided",
      phone,
      nationality,
      travel_date: travelDate,
      adults,
      children,
      notes,
      locale,
      status: "pending",
    };

    const { error: insertError } = await supabase
      .from("bookings")
      .insert([payload]);

    if (insertError) {
      setLoading(false);
      setError(
        "Something went wrong. Please try again or contact us via WhatsApp.",
      );
      return;
    }

    // Trigger instant admin email notification
    fetch("/api/notify-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-xl text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {t("successMsg")}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const whatsappDirectUrl = `https://wa.me/201508842101?text=${encodeURIComponent(
    `Hello Ramess Tours, I would like to inquire about: ${tourTitle}`,
  )}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden sticky top-24">
      <div className="bg-slate-950 text-white p-6 border-b border-amber-500/20">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
            {t("title")}
          </span>
          <span className="text-2xl font-extrabold text-white">
            ${pricePerPerson}{" "}
            <span className="text-xs font-normal text-slate-400">/ person</span>
          </span>
        </div>
        <p className="text-xs text-slate-300">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t("fullName")} *
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("email")}{" "}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("phone")} *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                {t("travelDate")} *
              </span>
            </label>
            <input
              type="date"
              required
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("nationality")}
            </label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="USA / Spain / France"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                {t("adults")}
              </span>
            </label>
            <input
              type="number"
              min={1}
              max={30}
              required
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {t("children")}
            </label>
            <input
              type="number"
              min={0}
              max={20}
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {t("notes")}
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Hotel pickup location, dietary preferences..."
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="bg-slate-50 rounded-xl p-3.5 flex items-center justify-between border border-slate-200/80">
          <span className="text-xs font-semibold text-slate-600">
            Estimated Total:
          </span>
          <span className="text-lg font-extrabold text-slate-900">
            ${estimatedTotal.toFixed(0)}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-extrabold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? t("sending") : t("submit")}</span>
        </button>

        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Instant Chat on WhatsApp (+20 15 08842101)</span>
        </a>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Free cancellation up to 24 hours before trip</span>
        </div>
      </form>
    </div>
  );
}
