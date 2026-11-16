"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Package, ShieldCheck } from "lucide-react";
import { equipmentData } from "@/lib/data/equipment";

export default function EquipmentGrid() {
  // Show 4 items on home grid
  const itemsToShow = equipmentData.slice(0, 4);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "mobility":
        return "Mobility Support";
      case "respiratory":
        return "Respiratory Care";
      case "patient-care":
        return "Patient Care";
      case "diagnostics":
        return "Diagnostics";
      default:
        return category;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-sage-light/35" aria-labelledby="equipment-heading">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest text-sage mb-3">
              <ShieldCheck className="h-4.5 w-4.5 text-gold" />
              Sanitized & Certified Equipment
            </span>
            <h2
              id="equipment-heading"
              className="font-display text-near-black leading-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Medical Equipment Leasing
            </h2>
            <p className="font-sans text-muted mt-3 max-w-xl" style={{ fontSize: "var(--text-body)" }}>
              Transform your home into a safe care environment. Rent high-quality, clinical-grade medical equipment delivered and set up directly at your door.
            </p>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 mt-6 md:mt-0 font-sans font-bold text-sm text-terracotta hover:text-[#b014b1] transition-colors group whitespace-nowrap"
          >
            Browse full catalog
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {itemsToShow.map((item) => {
            const whatsappMessage = encodeURIComponent(
              `Hello At.home, I would like to request a lease quote for "${item.name}". Please provide pricing details.`
            );
            const whatsappUrl = `https://wa.me/254705320618?text=${whatsappMessage}`;

            return (
              <div
                key={item.id}
                className="bg-card-white border border-border rounded-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image Placeholder Frame */}
                <div className="relative aspect-[4/3] bg-background flex items-center justify-center p-4 border-b border-border/60">
                  {/* Styled Premium Icon Placeholder if image doesn't exist */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-sage-light/10 flex items-center justify-center">
                    <Package className="h-12 w-12 text-sage/40 stroke-[1.2]" />
                  </div>
                  
                  {/* Availability badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    item.available 
                      ? "bg-success/10 text-success" 
                      : "bg-near-black/10 text-muted"
                  }`}>
                    {item.available ? "Available" : "Leased Out"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted font-sans mb-1.5 block">
                    {getCategoryLabel(item.category)}
                  </span>
                  
                  <h3 className="font-sans font-bold text-near-black text-base leading-snug group-hover:text-terracotta transition-colors duration-200 mb-2">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm text-muted font-sans line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Rates -> Get Quote Today */}
                  <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                    <span className="text-xs font-sans font-semibold text-sage uppercase tracking-wider bg-sage-light/60 px-3 py-1 rounded-full">
                      Custom Lease
                    </span>
                    <span className="text-xs font-sans font-bold text-terracotta">
                      Get Quote Today
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <div className="px-5 pb-5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 inline-flex items-center justify-center font-sans font-semibold text-xs rounded-btn transition-colors tap-target ${
                      item.available
                        ? "bg-terracotta hover:bg-[#b014b1] text-white shadow-sm"
                        : "bg-near-black/5 hover:bg-near-black/10 text-near-black"
                    }`}
                  >
                    {item.available ? "Get Quote Today" : "Inquire Availability"}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-card-white border border-border hover:bg-sage-light hover:border-sage/30 text-near-black font-sans font-semibold rounded-btn transition-colors shadow-sm tap-target"
          >
            View All Equipment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
