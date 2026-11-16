import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Globe, Bell, FileText } from "lucide-react";

const pillars = [
  {
    icon: Bell,
    title: "WhatsApp update after every visit",
    description: "You'll know exactly what happened, right when it happens.",
  },
  {
    icon: Globe,
    title: "Pay from anywhere in the world",
    description: "Stripe card payments, international bank transfer, or M-Pesa via a family member.",
  },
  {
    icon: FileText,
    title: "Care Notes & Visit Summaries",
    description: "Receive detailed digital care notes and regular status reports for every visit.",
  },
  {
    icon: Smartphone,
    title: "Matched within 12–24 hours",
    description: "We review your request and confirm your caregiver within 12–24 hours.",
  },
];

interface DiasporaStripProps {
  hideLearnMoreLink?: boolean;
}

export default function DiasporaStrip({ hideLearnMoreLink = false }: DiasporaStripProps) {
  return (
    <section
      className="bg-sage py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="diaspora-strip-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy */}
          <div>
            <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-4">
              For families abroad
            </span>
            <h2
              id="diaspora-strip-heading"
              className="font-display text-white leading-tight mb-6"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Arranging care for a loved one back home?
            </h2>
            <p className="text-white/75 font-sans leading-relaxed mb-8" style={{ fontSize: "var(--text-body)" }}>
              Thousands of Kenyan families in the UK, US, and Gulf trust us to care
              for their parents and relatives back home. We make the process as simple
              as booking from Nairobi — with the oversight you need from afar.
            </p>
            {!hideLearnMoreLink && (
              <Link
                href="/diaspora"
                className="inline-flex items-center gap-2 px-8 py-4 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold rounded-btn transition-colors shadow-lg tap-target"
              >
                Learn about diaspora care <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Right: Trust pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col gap-3 bg-white/10 border border-white/15 rounded-card p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-semibold text-white text-sm">
                    {pillar.title}
                  </h3>
                  <p className="text-white/65 text-sm font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
