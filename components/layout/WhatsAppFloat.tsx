"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFloat() {
  const whatsappNumber = "254705320618";
  const defaultMessage = "Hello At.home, I would like to inquire about home-based caregiving or physiotherapy services.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center gap-3">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center h-11 w-11 bg-terracotta hover:bg-[#b014b1] text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-terracotta/30 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* WhatsApp Float Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-14 w-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg transition-transform hover:scale-105 duration-300 group focus:outline-none focus:ring-4 focus:ring-success/50"
        aria-label="Chat with At.home care coordinator on WhatsApp"
      >
        {/* Visual pulse background for micro-interaction */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 group-hover:scale-110 transition-all duration-300 animate-ping" />

        {/* Official WhatsApp SVG Icon */}
        <WhatsAppIcon className="h-7 w-7 relative z-10" />

        {/* Hidden tooltip shown on hover for larger screens */}
        <span className="absolute right-16 bg-near-black text-white text-xs font-semibold px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
          Chat with Care Coordinator
        </span>
      </a>
    </div>
  );
}
