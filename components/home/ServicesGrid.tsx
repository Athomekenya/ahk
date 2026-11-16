"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { servicesData as services } from "@/lib/data/services";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

interface ServicesGridProps {
  hideViewAllLink?: boolean;
}

export default function ServicesGrid({ hideViewAllLink = false }: ServicesGridProps) {

  return (
    <section
      className="bg-sage-light py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
            What we offer
          </span>
          <h2
            id="services-heading"
            className="font-display text-near-black"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Home care services
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto font-sans" style={{ fontSize: "var(--text-body)" }}>
            Every service is delivered by qualified, background-checked professionals
            who come to you — so your loved one can heal in a familiar, safe environment.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={service.slug} 
                variants={cardVariants}
                className={!hideViewAllLink && index >= 4 ? "hidden lg:block" : ""}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col gap-4 bg-card-white border border-border rounded-card p-6 h-full hover:shadow-lg hover:border-sage/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  aria-label={`Learn more about ${service.name}`}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage-light border border-border group-hover:bg-sage group-hover:border-sage transition-colors duration-300">
                    <Icon
                      className="h-6 w-6 text-sage group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Service Name */}
                  <h3
                    className="font-sans font-semibold text-near-black leading-snug"
                    style={{ fontSize: "1rem" }}
                  >
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted font-sans leading-relaxed flex-grow" style={{ fontSize: "var(--text-small)" }}>
                    {service.shortDescription}
                  </p>

                  {/* Price + Learn More */}
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-border">
                    {service.priceFrom ? (
                      <span className="text-xs font-sans font-semibold text-sage bg-sage-light px-2.5 py-1 rounded-full">
                        From {service.priceFrom}
                      </span>
                    ) : (
                      <span className="text-xs font-sans font-medium text-muted">
                        Get a quote
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-terracotta text-sm font-sans font-semibold group-hover:gap-2 transition-all duration-300">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all services link */}
        {!hideViewAllLink && (
          <div className="text-center mt-12 lg:hidden">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-sage text-sage hover:bg-sage hover:text-white font-sans font-semibold rounded-btn transition-colors duration-300 tap-target"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
