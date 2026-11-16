"use client";

import React, { useState } from "react";
import { X, Gift, ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Desktop: premium top bar ── */}
      <div className="hidden md:flex relative overflow-hidden bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] text-white py-2.5 px-6 items-center justify-between gap-4 font-sans relative z-40">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" />

        <div className="flex items-center gap-3 mx-auto text-center relative z-10">
          {/* Accent dot */}
          <span className="flex items-center justify-center h-6 w-6 bg-terracotta/20 rounded-full">
            <Gift className="h-3.5 w-3.5 text-terracotta animate-bounce" />
          </span>

          <span className="text-base tracking-wide">
            <span className="text-white/60 font-medium">Limited Offer</span>
            <span className="mx-3 text-white/20">|</span>
            <span className="font-medium">Home Physiotherapy Sessions —</span>
            <span className="ml-2 font-bold text-terracotta text-lg">Just KES 2,700/=</span>
          </span>

          <a
            href="https://wa.me/254705320618?text=Hello%20At.home%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20session."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center gap-2 px-5 py-2 bg-terracotta hover:bg-[#b014b1] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_12px_rgba(211,25,212,0.4)] whitespace-nowrap"
          >
            Book Now <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="relative z-10 p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/40 hover:text-white"
          aria-label="Dismiss Announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Mobile: centered popup modal ── */}
      <div className="md:hidden fixed inset-0 z-[60] flex items-center justify-center p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        />

        {/* Popup card */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-[scaleIn_0.3s_ease-out]">
          {/* Terracotta header accent */}
          <div className="bg-terracotta px-6 pt-6 pb-4 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 bg-white/20 rounded-full mb-3">
              <Gift className="h-6 w-6 text-white animate-bounce" />
            </div>
            <h3 className="text-white font-display font-bold text-xl">
              Special Offer
            </h3>
          </div>

          {/* Body */}
          <div className="px-6 py-5 text-center">
            <p className="text-near-black font-sans text-base leading-relaxed">
              Home Physiotherapy Sessions
            </p>
            <p className="text-terracotta font-display font-bold text-3xl mt-1 mb-4">
              Just KES 2,700/=
            </p>
            <a
              href="https://wa.me/254705320618?text=Hello%20At.home%2C%20I%20would%20like%20to%20book%20a%20physiotherapy%20session."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold text-sm rounded-btn transition-colors shadow-sm"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setIsVisible(false)}
              className="mt-3 text-sm text-muted hover:text-near-black font-sans transition-colors"
            >
              Maybe later
            </button>
          </div>

          {/* Close X */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            aria-label="Dismiss Announcement"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
