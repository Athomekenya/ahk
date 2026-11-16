"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, Briefcase } from "lucide-react";

const highlights = [
  { icon: Heart, label: "Meaningful impact every day" },
  { icon: Shield, label: "Credential-verified & fully supported" },
  { icon: Briefcase, label: "Flexible schedules & fair pay" },
];

export default function JoinTeamStrip() {
  return (
    <section className="bg-sage py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, #e07a5f 0%, transparent 55%), radial-gradient(circle at 10% 60%, #d4a88c 0%, transparent 45%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left"
        >
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-sage-light/70 mb-4">
            Join our team
          </span>
          <h2
            className="font-display text-white mb-5"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Passionate about care?<br className="hidden sm:block" /> Work with us.
          </h2>
          <p className="text-sage-light/80 font-sans leading-relaxed max-w-lg mx-auto lg:mx-0" style={{ fontSize: "var(--text-body)" }}>
            AtHome Kenya is always looking for compassionate, skilled professionals — nurses,
            physiotherapists, caregivers, and more. Join a team that puts dignity and quality of
            care first.
          </p>

          {/* Highlights */}
          <ul className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sage-light/90 text-sm font-sans">
                <Icon className="h-4 w-4 text-terracotta shrink-0" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right CTA */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sage hover:bg-sage-light font-sans font-semibold text-base rounded-btn transition-colors shadow-md tap-target whitespace-nowrap"
          >
            View Open Positions <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="text-sage-light/60 text-xs font-sans">No positions listed? Apply anyway — we&apos;re always hiring.</p>
        </motion.div>
      </div>
    </section>
  );
}
