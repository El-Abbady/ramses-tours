"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-[#133B4A] text-slate-200 border-t border-[#1D4E61]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info & Social Media */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/icon.png"
                alt="Ramess Tours Emblem"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-extrabold tracking-wider text-white">
                RAMESS <span className="text-[#C59B3B]">TOURS</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t("description")}
            </p>

            {/* Social Media Icons (Same Brand Palette) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/ramess.101"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ramess Tours on Instagram"
                className="w-10 h-10 rounded-full bg-[#0E2C38] border border-[#C59B3B]/40 hover:border-[#C59B3B] hover:bg-[#C59B3B] text-[#C59B3B] hover:text-[#133B4A] flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/ramesstours"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ramess Tours on Facebook"
                className="w-10 h-10 rounded-full bg-[#0E2C38] border border-[#C59B3B]/40 hover:border-[#C59B3B] hover:bg-[#C59B3B] text-[#C59B3B] hover:text-[#133B4A] flex items-center justify-center transition-all"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.15em]">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#C59B3B] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=city-tour"
                  className="hover:text-[#C59B3B] transition-colors"
                >
                  City Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=package"
                  className="hover:text-[#C59B3B] transition-colors"
                >
                  Egypt Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=nile-cruise"
                  className="hover:text-[#C59B3B] transition-colors"
                >
                  Nile Cruises
                </Link>
              </li>
              <li>
                <Link
                  href="/tours?category=desert-safari"
                  className="hover:text-[#C59B3B] transition-colors"
                >
                  Desert Safari
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.15em]">
              {t("contactUs")}
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C59B3B] shrink-0" />
                <span>Giza &amp; Cairo, Egypt</span>
              </li>
              <li>
                <a
                  href="https://wa.me/201508842101?text=Hello%20Ramess%20Tours!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#C59B3B] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C59B3B] shrink-0" />
                  <span>+20 15 08842101 (WhatsApp 24/7)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ramess101egy@gmail.com"
                  className="flex items-center gap-3 hover:text-[#C59B3B] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C59B3B] shrink-0" />
                  <span>ramess101egy@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1D4E61] text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Ramess Tours. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
