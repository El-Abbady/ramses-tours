"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/201508842101?text=Hello%20Ramses%20Tours!%20I%20would%20like%20to%20plan%20a%20trip%20to%20Egypt."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ramses Tours on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-4 py-3.5 rounded-full shadow-2xl transition-transform hover:scale-105"
    >
      <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
