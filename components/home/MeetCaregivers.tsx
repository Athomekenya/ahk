"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const caregivers = [
  {
    name: "Grace Wanjiku, RN",
    initials: "GW",
    specialty: "Chronic Disease & Elder Care",
    years: 9,
    credential: "Registered Nurse",
    rating: 5.0,
    bio: "Grace has spent nine years supporting elderly patients and families managing diabetes and heart conditions across Kenya.",
    bgColor: "bg-[#d4a88c]",
  },
  {
    name: "James Omondi, RPT",
    initials: "JO",
    specialty: "Home Physiotherapy & Stroke Rehab",
    years: 7,
    credential: "Registered Physiotherapist",
    rating: 5.0,
    bio: "James specialises in post-stroke rehabilitation and recovery care, helping patients regain independence at home.",
    bgColor: "bg-[#8faf9f]",
  },
  {
    name: "Amina Hassan, RM",
    initials: "AH",
    specialty: "Newborn, Postnatal & Maternal Care",
    years: 6,
    credential: "Registered Midwife",
    rating: 4.9,
    bio: "Amina brings warm, expert support to new mothers and families welcoming a newborn, with a focus on maternal wellness.",
    bgColor: "bg-[#b5a8c8]",
  },
  {
    name: "Peter Kamau, CNA",
    initials: "PK",
    specialty: "Palliative & Wound Care",
    years: 11,
    credential: "Certified Nursing Assistant",
    rating: 5.0,
    bio: "Peter provides dignified, compassionate palliative support, drawing on over a decade of experience with families facing serious illness.",
    bgColor: "bg-[#c49a7a]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

interface MeetCaregiversProps {
  hideViewAllLink?: boolean;
}

export default function MeetCaregivers({ hideViewAllLink = false }: MeetCaregiversProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      className="hidden md:block bg-ivory py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="caregivers-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
            Trust &amp; Vetting
          </span>
          <h2
            id="caregivers-heading"
            className="font-display text-near-black"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Meet some of our caregivers
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto font-sans" style={{ fontSize: "var(--text-body)" }}>
            Every caregiver on our platform is background-checked, credential-verified,
            and registered with the Nursing Council of Kenya or a relevant professional body.
          </p>
        </div>

        {/* Caregiver Horizontal Carousel */}
        <motion.div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory pb-6 px-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {caregivers.map((c, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-card-white border border-border rounded-card overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col snap-start shrink-0 w-[290px] sm:w-[328px]"
            >
              {/* Avatar */}
              <div className={`${c.bgColor} h-36 flex items-center justify-center`}>
                <span className="text-4xl font-display font-semibold text-white/90">
                  {c.initials}
                </span>
              </div>

              {/* Card Body */}
              <div className="flex flex-col gap-3 p-5 flex-grow">
                {/* Name + Rating */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans font-semibold text-near-black text-base leading-snug">
                    {c.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gold font-semibold shrink-0">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {c.rating.toFixed(1)}
                  </span>
                </div>

                {/* Specialty */}
                <span className="text-xs font-sans font-medium text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full w-fit">
                  {c.specialty}
                </span>

                {/* Bio */}
                <p className="text-muted text-sm font-sans leading-relaxed flex-grow">
                  {c.bio}
                </p>

                {/* Credential badge */}
                <div className="flex items-center gap-1.5 pt-3 border-t border-border">
                  <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
                  <span className="text-xs font-sans text-muted leading-tight">
                    {c.credential}
                  </span>
                </div>

                {/* Years */}
                <p className="text-xs text-muted font-sans">
                  {c.years} years of experience
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Previous caregiver"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {!hideViewAllLink && (
            <Link
              href="/caregivers"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-sage text-sage hover:bg-sage hover:text-white font-sans font-semibold rounded-btn transition-colors duration-300 tap-target text-sm sm:text-base whitespace-nowrap"
            >
              View All Caregivers
            </Link>
          )}

          <button
            onClick={scrollRight}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Next caregiver"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
