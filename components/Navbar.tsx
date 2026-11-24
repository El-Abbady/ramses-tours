"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import {
  Menu,
  X,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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

  const whatsappUrl =
    "https://wa.me/201508842101?text=Hello%20Ramess%20Tours!%20I%20would%20like%20to%20plan%20a%20trip%20to%20Egypt.";

  // Filter active city tours
  const cityToursList = tours.filter(
    (t) => !t.category || t.category === "city-tour",
  );

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md text-white border-b border-amber-500/20 shadow-lg">
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
              <span className="text-xl font-bold tracking-wider text-white">
                RAMESS <span className="text-amber-400">TOURS</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                Egypt Travel Experts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors"
            >
              Home
            </Link>

            {/* City Tours Multi-Level Flyout Dropdown */}
            <div className="relative group/city">
              <Link
                href="/tours?category=city-tour"
                className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors py-6"
              >
                <span>City Tours</span>
                <ChevronDown className="w-4 h-4 text-amber-400/80 group-hover/city:rotate-180 transition-transform" />
              </Link>

              {/* Level 1: Cities */}
              <div className="invisible opacity-0 group-hover/city:visible group-hover/city:opacity-100 transition-all duration-150 absolute left-0 top-full w-56 bg-slate-900 border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50">
                {CITIES.map((city) => {
                  const toursInCity = cityToursList.filter(
                    (t) => t.city?.toLowerCase() === city.toLowerCase(),
                  );
                  return (
                    <div key={city} className="relative group/sub">
                      <Link
                        href={`/tours?category=city-tour&city=${city}`}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                      >
                        <span>{city} Tours</span>
                        {toursInCity.length > 0 && (
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover/sub:text-amber-400" />
                        )}
                      </Link>

                      {/* Level 2: Dynamic Tours in This City */}
                      {toursInCity.length > 0 && (
                        <div className="invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition-all duration-150 absolute left-full top-0 ml-1 w-72 bg-slate-900 border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                          <Link
                            href={`/tours?category=city-tour&city=${city}`}
                            className="block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 border-b border-slate-800 hover:bg-slate-800"
                          >
                            View All {city} Tours ({toursInCity.length})
                          </Link>
                          {toursInCity.map((tour) => (
                            <Link
                              key={tour.id}
                              href={`/tours/${tour.slug || tour.id}`}
                              className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors line-clamp-1"
                            >
                              {tour.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="border-t border-slate-800 mt-1 pt-1">
                  <Link
                    href="/tours?category=city-tour"
                    className="block px-4 py-2 text-sm font-medium text-amber-400 hover:bg-slate-800 transition-colors"
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
                className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors py-6"
              >
                <span>Packages</span>
                <ChevronDown className="w-4 h-4 text-amber-400/80 group-hover/pkg:rotate-180 transition-transform" />
              </Link>
              <div className="invisible opacity-0 group-hover/pkg:visible group-hover/pkg:opacity-100 transition-all duration-150 absolute left-0 top-full w-56 bg-slate-900 border border-amber-500/20 rounded-xl shadow-2xl py-2 z-50 max-h-96 overflow-y-auto">
                {PACKAGE_DURATIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/tours?category=nile-cruise"
              className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors"
            >
              Nile Cruises
            </Link>

            <Link
              href="/tours?category=desert-safari"
              className="text-sm font-medium text-slate-200 hover:text-amber-400 transition-colors"
            >
              Desert Safari
            </Link>
          </nav>

          {/* Right Action: Direct WhatsApp */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm px-4 py-2.5 rounded-full transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
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
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-4 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-1.5"
          >
            Home
          </Link>

          {/* Mobile City Tours Accordion */}
          <div>
            <button
              onClick={() => setMobileCitiesOpen(!mobileCitiesOpen)}
              className="flex items-center justify-between w-full text-base font-medium text-slate-200 hover:text-amber-400 py-1.5"
            >
              <span>City Tours</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileCitiesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileCitiesOpen && (
              <div className="pl-4 mt-1 space-y-2 border-l border-amber-500/30">
                {CITIES.map((city) => (
                  <Link
                    key={city}
                    href={`/tours?category=city-tour&city=${city}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-slate-300 hover:text-amber-400 py-1"
                  >
                    {city} Tours
                  </Link>
                ))}
                <Link
                  href="/tours?category=city-tour"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-amber-400 py-1"
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
              className="flex items-center justify-between w-full text-base font-medium text-slate-200 hover:text-amber-400 py-1.5"
            >
              <span>Packages</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobilePackagesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilePackagesOpen && (
              <div className="pl-4 mt-1 space-y-2 border-l border-amber-500/30">
                {PACKAGE_DURATIONS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-slate-300 hover:text-amber-400 py-1"
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
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-1.5"
          >
            Nile Cruises
          </Link>

          <Link
            href="/tours?category=desert-safari"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-200 hover:text-amber-400 py-1.5"
          >
            Desert Safari
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm py-2.5 rounded-xl mt-3"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp (+20 15 08842101)</span>
          </a>
        </div>
      )}
    </header>
  );
}
