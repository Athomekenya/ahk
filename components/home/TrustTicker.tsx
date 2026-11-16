"use client";

import React from "react";

const items = [
  "1,000+ Families Served",
  "800+ Home Visits Completed",
  "100+ Verified Caregivers",
  "Registered with the Nursing Council of Kenya",
  "Distributed Team — Serving Kenya",
  "Diaspora-friendly remote booking",
  "Flexible payments – pay with M-Pesa",
];

export default function TrustTicker() {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full bg-sage overflow-hidden py-3.5 border-y border-sage/20"
      aria-label="Trust indicators ticker"
    >
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-sans font-medium text-white/90 px-8"
          >
            <span className="text-gold text-base" aria-hidden="true">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
