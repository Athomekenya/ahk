"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Hello At Home Kenya, I would like to arrange home-based care for a loved one. Please advise."
  );

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-near-black"
      aria-label="Hero Section"
    >
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1c1130]/95 via-[#23153d]/85 to-[#3b0b3c]/75 z-10" />

      {/* Background image placeholder - warm Kenyan home tones */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/hero-bg.jpg')",
          backgroundColor: "#1e1130",
        }}
        role="img"
        aria-label="A caring professional nurse tending to a patient at a warm Nairobi home"
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-44 sm:pt-48 md:pt-52 lg:pt-56 pb-24 my-auto">
        <div className="max-w-3xl">

          {/* Pre-heading badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/30 border border-sage/40 text-sage-light text-xs font-semibold uppercase tracking-widest font-sans mb-6">
              <ShieldCheck className="h-4 w-4 text-gold" />
              Nursing Council Registered · 100+ Verified Caregivers
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
            className="font-display text-white leading-tight mb-6"
            style={{ fontSize: "var(--text-hero)" }}
          >
            Compassionate care,{" "}
            <span className="text-terracotta">right at</span>{" "}
            your door.
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="text-white/80 font-sans leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: "var(--text-body)" }}
          >
            We match families across Nairobi — and the diaspora — with vetted, professional
            nurses and caregivers within hours. From chronic disease support to palliative
            care, we bring clinical expertise home.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            {/* Primary Call Button (Prominent on mobile) */}
            <a
              href="tel:+254705320618"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-sage hover:bg-[#2e4338] text-white font-sans font-semibold rounded-btn transition-colors border border-sage/40 shadow-md tap-target text-center group"
              aria-label="Call At.home Care Coordinator"
            >
              <Phone className="h-5 w-5 text-gold shrink-0 animate-pulse" />
              <span>Call Us: +254 705 320 618</span>
            </a>

            {/* Primary Booking CTA */}
            <a
              href={`https://wa.me/254705320618?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold rounded-btn transition-colors shadow-lg hover:shadow-terracotta/30 tap-target text-center group"
            >
              Book a Caregiver
            </a>

            {/* Secondary — WhatsApp */}
            <a
              href={`https://wa.me/254705320618?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-card-white/10 hover:bg-card-white/20 text-white font-sans font-semibold rounded-btn transition-colors border border-white/20 backdrop-blur-sm tap-target"
            >
              <WhatsAppIcon className="h-5 w-5 text-success" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Quick trust proof below CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-white/60 text-sm font-sans"
          >
            <span>✓ Matched within 12–24 hours</span>
            <span>✓ Pay via M-Pesa or card</span>
            <span>✓ WhatsApp updates after every visit</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 60L1440 60L1440 20C1080 60 360 0 0 40L0 60Z" fill="#f3f3f3" />
        </svg>
      </div>
    </section>
  );
}
