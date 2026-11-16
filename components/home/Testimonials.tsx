"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Susan Njoroge",
    relationship: "Daughter, caring for her mother in Kilimani",
    rating: 5,
    body: "I was so worried about leaving Mum alone after her hip surgery. At Home Kenya matched us with Grace within an hour. She was professional, gentle, and genuinely caring. I can't recommend them enough.",
    initials: "SN",
    bgColor: "bg-[#d4a88c]",
  },
  {
    name: "David Kariuki",
    relationship: "Son in Manchester, arranging care for father in Westlands",
    rating: 5,
    body: "Managing my father's diabetes from the UK felt impossible until I found At Home Kenya. The WhatsApp updates after every visit gave me real peace of mind. The process was surprisingly simple — I paid by card and everything was sorted within a day.",
    initials: "DK",
    bgColor: "bg-[#8faf9f]",
    isDiaspora: true,
  },
  {
    name: "Fatuma Odhiambo",
    relationship: "Wife of palliative care patient, South C",
    rating: 5,
    body: "During the most difficult time of our family's life, the palliative care team from At Home Kenya brought so much dignity and compassion into our home. Peter was extraordinary. We are truly grateful.",
    initials: "FO",
    bgColor: "bg-[#b5a8c8]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section
      className="bg-sage-light py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
            What families say
          </span>
          <h2
            id="testimonials-heading"
            className="font-display text-near-black"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Stories from the families we serve
          </h2>
        </div>

        {/* Horizontal swipe carousel */}
        <motion.div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory pb-4 px-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              variants={cardVariants}
              className="bg-card-white border border-border rounded-card p-7 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300 snap-start shrink-0 w-[300px] sm:w-[360px] md:w-[calc(33.333%-16px)]"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-gold fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-near-black font-sans leading-relaxed italic flex-grow" style={{ fontSize: "var(--text-small)" }}>
                &ldquo;{t.body}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
                <div className={`${t.bgColor} h-11 w-11 rounded-full flex items-center justify-center shrink-0`}>
                  <span className="text-white font-display font-semibold text-sm">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-near-black text-sm">{t.name}</p>
                  <p className="text-muted text-xs font-sans">{t.relationship}</p>
                  {t.isDiaspora && (
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-sage bg-sage-light px-2 py-0.5 rounded-full">
                      Diaspora client
                    </span>
                  )}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={scrollRight}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
