"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  UserCheck,
  CreditCard,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Tell us your needs",
    description:
      "Share details about your loved one — their condition, location, and the type of care they need. Takes less than 3 minutes.",
  },
  {
    icon: UserCheck,
    number: "02",
    title: "We match a vetted caregiver",
    description:
      "Our care coordinators review your request and match you with a qualified, background-checked caregiver within 12–24 hours.",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Confirm & pay securely",
    description:
      "Confirm your booking and pay securely via M-Pesa or card. Diaspora families can pay from anywhere in the world.",
  },
  {
    icon: HeartHandshake,
    number: "04",
    title: "Care begins at home",
    description:
      "Your caregiver arrives on time. You receive a WhatsApp update after every visit, so you're always in the loop.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section
      className="bg-ivory py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
            Simple &amp; Transparent
          </span>
          <h2
            id="how-it-works-heading"
            className="font-display text-near-black"
            style={{ fontSize: "var(--text-h1)" }}
          >
            How it works
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto font-sans" style={{ fontSize: "var(--text-body)" }}>
            We&apos;ve made arranging professional home care as simple as possible — whether
            you&apos;re in Nairobi or booking from abroad.
          </p>
        </div>

        {/* Steps — horizontal swipe on mobile, grid on lg+ */}
        <motion.div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory pb-4 px-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-auto"
              >
                {/* Connector line between steps on desktop */}
                {!isLast && (
                  <div
                    className="hidden lg:block absolute top-10 left-[calc(100%-16px)] w-full h-px bg-border z-0"
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 flex flex-col items-start gap-4">
                  {/* Icon circle */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-sage-light border border-border">
                    <Icon className="h-7 w-7 text-sage" strokeWidth={1.5} />
                  </div>

                  {/* Step Number */}
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-terracotta">
                    Step {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="font-display text-near-black" style={{ fontSize: "var(--text-h3)" }}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted font-sans text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chevron controls — visible only below lg */}
        <div className="flex items-center justify-center gap-4 mt-10 lg:hidden">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target"
            aria-label="Next step"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
