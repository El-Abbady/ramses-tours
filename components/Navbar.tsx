"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Menu, X, Compass, ChevronDown, ChevronRight } from "lucide-react";

export interface NavTourItem {
  id: string;
  slug?: string;
  title: string;
  city: string;
  category: string;
}

interface NavbarProps {
  tours?: NavTourItem[];
}

const CITIES = ["Cairo", "Luxor", "Aswan", "Hurghada", "Alexandria"];

const PACKAGE_DURATIONS = [
  { label: "All Egypt Packages", href: "/tours?category=package" },
  {
    label: "2 Days / 1 Night",
    href: "/tours?category=package&duration=2+Days+%2F+1+Night",
  },
  {
    label: "3 Days / 2 Nights",
    href: "/tours?category=package&duration=3+Days+%2F+2+Nights",
  },
  {
    label: "4 Days / 3 Nights",
    href: "/tours?category=package&duration=4+Days+%2F+3+Nights",
  },
  {
    label: "5 Days / 4 Nights",
    href: "/tours?category=package&duration=5+Days+%2F+4+Nights",
  },
  {
    label: "6 Days / 5 Nights",
    href: "/tours?category=package&duration=6+Days+%2F+5+Nights",
  },
  {
    label: "7 Days / 6 Nights",
    href: "/tours?category=package&duration=7+Days+%2F+6+Nights",
  },
  {
    label: "8 Days / 7 Nights",
    href: "/tours?category=package&duration=8+Days+%2F+7+Nights",
  },
  {
    label: "10 Days / 9 Nights",
    href: "/tours?category=package&duration=10+Days+%2F+9+Nights",
  },
];

export default function Navbar({ tours = [] }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCitiesOpen, setMobileCitiesOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);

  const cityToursList = tours.filter(
    (t) => !t.category || t.category === "city-tour",
  );

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md text-[#133B4A] border-b border-[#E8E2D5] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/icon.png"
              alt="Ramess Tours Emblem"
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-wider text-[#133B4A]">
                RAMESS <span className="text-[#C59B3B]">TOURS</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                Egypt Travel Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-700 hover:text-[#133B4A] transition-colors"
            >
              Home
            </Link>

            {/* City Tours Multi-Level Flyout Dropdown */}
            <div className="relative group/city">
              <Link
                href="/tours?category=city-tour"
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-[#133B4A] transition-colors py-6"
              >
                <span>City Tours</span>
                <ChevronDown className="w-4 h-4 text-[#C59B3B] group-hover/city:rotate-180 transition-transform" />
              </Link>

              {/* Level 1: Cities */}
              <div className="invisible opacity-0 group-hover/city:visible group-hover/city:opacity-100 transition-all duration-150 absolute left-0 top-full w-56 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl py-2 z-50">
                {CITIES.map((city) => {
                  const toursInCity = cityToursList.filter(
                    (t) => t.city?.toLowerCase() === city.toLowerCase(),
                  );
                  return (
                    <div key={city} className="relative group/sub">
                      <Link
                        href={`/tours?category=city-tour&city=${city}`}
                        className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FAF9F6] hover:text-[#133B4A] transition-colors"
                      >
                        <span>{city} Tours</span>
                        {toursInCity.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-[#C59B3B]" />
                        )}
                      </Link>

                      {/* Level 2: Dynamic Tours in This City */}
                      {toursInCity.length > 0 && (
                        <div className="invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-150 absolute left-full top-0 ml-1 w-72 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                          <Link
                            href={`/tours?category=city-tour&city=${city}`}
                            className="block px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#C59B3B] border-b border-slate-100 hover:bg-[#FAF9F6]"
                          >
                            View All {city} Tours ({toursInCity.length})
                          </Link>
                          {toursInCity.map((tour) => (
                            <Link
                              key={tour.id}
                              href={`/tours/${tour.slug || tour.id}`}
                              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-[#FAF9F6] hover:text-[#133B4A] transition-colors line-clamp-1"
                            >
                              {tour.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="border-t border-slate-100 mt-1 pt-1">
                  <Link
                    href="/tours?category=city-tour"
                    className="block px-4 py-2 text-sm font-bold text-[#133B4A] hover:bg-[#FAF9F6] transition-colors"
                  >
                    All City Tours
                  </Link>
                </div>
              </div>
            </div>

            {/* Packages Dropdown */}
            <div className="relative group/pkg">
              <Link
                href="/tours?category=package"
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-[#133B4A] transition-colors py-6"
              >
                <span>Packages</span>
                <ChevronDown className="w-4 h-4 text-[#C59B3B] group-hover/pkg:rotate-180 transition-transform" />
              </Link>
              <div className="invisible opacity-0 group-hover/pkg:visible group-hover/pkg:opacity-100 transition-all duration-150 absolute left-0 top-full w-56 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl py-2 z-50 max-h-96 overflow-y-auto">
                {PACKAGE_DURATIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-[#FAF9F6] hover:text-[#133B4A] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/tours?category=nile-cruise"
              className="text-sm font-semibold text-slate-700 hover:text-[#133B4A] transition-colors"
            >
              Nile Cruises
            </Link>

            <Link
              href="/tours?category=desert-safari"
              className="text-sm font-semibold text-slate-700 hover:text-[#133B4A] transition-colors"
            >
              Desert Safari
            </Link>
          </nav>

          {/* Right Action: Social Icons + Custom Trip Pill Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/custom-trip"
              className="flex items-center gap-2 bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#C59B3B]" />
              <span>Custom trip</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#133B4A] hover:bg-[#EFECE4]"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E2D5] px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#133B4A] py-1.5"
          >
            Home
          </Link>

          {/* Mobile City Tours Accordion */}
          <div>
            <button
              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
              className="flex items-center justify-between w-full text-base font-semibold text-slate-800 hover:text-[#133B4A] py-1.5"
            >
              <span>City Tours</span>
              <ChevronDown
                className={`w-4 h-4 text-[#C59B3B] transition-transform ${mobileCitiesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileCitiesOpen && (
              <div className="pl-4 mt-1 space-y-2 border-l-2 border-[#C59B3B]/40">
                {CITIES.map((city) => (
                  <Link
                    key={city}
                    href={`/tours?category=city-tour&city=${city}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-slate-600 hover:text-[#133B4A] py-1"
                  >
                    {city} Tours
                  </Link>
                ))}
                <Link
                  href="/tours?category=city-tour"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-bold text-[#133B4A] py-1"
                >
                  All City Tours
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Packages Accordion */}
          <div>
            <button
              onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
              className="flex items-center justify-between w-full text-base font-semibold text-slate-800 hover:text-[#133B4A] py-1.5"
            >
              <span>Packages</span>
              <ChevronDown
                className={`w-4 h-4 text-[#C59B3B] transition-transform ${mobilePackagesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilePackagesOpen && (
              <div className="pl-4 mt-1 space-y-2 border-l-2 border-[#C59B3B]/40">
                {PACKAGE_DURATIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-slate-600 hover:text-[#133B4A] py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/tours?category=nile-cruise"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#133B4A] py-1.5"
          >
            Nile Cruises
          </Link>

          <Link
            href="/tours?category=desert-safari"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-800 hover:text-[#133B4A] py-1.5"
          >
            Desert Safari
          </Link>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.instagram.com/ramess.101"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E2DBD0] text-[#133B4A] hover:text-[#C59B3B] flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/ramesstours"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#E2DBD0] text-[#133B4A] hover:text-[#C59B3B] flex items-center justify-center"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>

            <Link
              href="/custom-trip"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#133B4A] hover:bg-[#0E2C38] text-white font-bold text-sm py-2.5 rounded-full"
            >
              <Compass className="w-4 h-4 text-[#C59B3B]" />
              <span>Custom trip</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
