"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Compass, Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navbar");

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950">
                <Compass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                RAMSES <span className="text-amber-400">TOURS</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-amber-400 transition-colors"
                >
                  {nav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="hover:text-amber-400 transition-colors"
                >
                  {nav("tours")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=nile-cruises"
                  className="hover:text-amber-400 transition-colors"
                >
                  {nav("nileCruises")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=day-tours"
                  className="hover:text-amber-400 transition-colors"
                >
                  {nav("dayTours")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Giza & Cairo, Egypt</span>
              </li>
              <li>
                <a
                  href="https://wa.me/201508842101?text=Hello%20Ramses%20Tours!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+20 15 08842101 (WhatsApp 24/7)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ramess101egy@gmail.com"
                  className="flex items-center gap-3 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ramess101egy@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Ramses Tours. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
