"use client";

import React, { useState } from "react";
import { ArrowLeft, Package, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";
import { equipmentData } from "@/lib/data/equipment";
import JsonLd from "@/components/seo/JsonLd";

const equipmentFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can I hire a hospital bed for home use in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AtHome Kenya offers flexible hospital bed hire and leasing for home use across Nairobi. We deliver fully sanitized, clinical-grade electric and manual hospital beds directly to your home, set them up, and provide operational training.",
      },
    },
    {
      "@type": "Question",
      name: "What are the benefits of leasing medical equipment instead of buying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Leasing medical equipment is cost-effective for short-term recovery periods. You only pay for the duration you need, we handle maintenance and sanitization between uses, and you avoid the large upfront cost of purchasing hospital-grade equipment outright.",
      },
    },
    {
      "@type": "Question",
      name: "How does medical equipment delivery and setup work in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Once your order is confirmed, our trained technicians deliver the equipment to your home address in Nairobi, install and configure it safely, demonstrate proper usage to your family or caregiver, and remain available for any follow-up support during the lease period.",
      },
    },
    {
      "@type": "Question",
      name: "What medical equipment can I rent from AtHome Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our catalog includes manual and electric hospital beds, oxygen concentrators, wheelchairs, crutches and walkers, suction machines, patient hoists and lifts, pressure-relief mattresses, and a range of pharmaceuticals and diagnostics.",
      },
    },
  ],
};

type CategoryFilter = "all" | "mobility" | "respiratory" | "patient-care" | "diagnostics";

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const filteredItems = selectedCategory === "all"
    ? equipmentData
    : equipmentData.filter((item) => item.category === selectedCategory);

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
    <div className="bg-ivory min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-muted hover:text-near-black font-sans text-sm font-medium transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <JsonLd data={equipmentFaqSchema} />

        {/* Hero Section */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-widest text-sage mb-3">
            <ShieldCheck className="h-4.5 w-4.5 text-gold" />
            Hospital Bed Rental &amp; Medical Equipment Leasing · Nairobi, Kenya
          </span>
          <h1 className="font-display text-near-black mb-4" style={{ fontSize: "var(--text-h1)" }}>
            Rent or Buy Medical Equipment in Nairobi
          </h1>
          <p className="font-sans text-muted max-w-2xl text-base sm:text-lg leading-relaxed">
            Need a hospital bed for home use in Kenya? We rent and sell fully sanitized, clinical-grade hospital beds, oxygen concentrators, wheelchairs, and mobility aids — with fast delivery and professional setup anywhere in Nairobi.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-6 mb-10">
          {[
            { key: "all", label: "All Items" },
            { key: "mobility", label: "Mobility Support" },
            { key: "respiratory", label: "Respiratory Care" },
            { key: "patient-care", label: "Patient Care" },
            { key: "diagnostics", label: "Diagnostics" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key as CategoryFilter)}
              className={`px-5 py-2.5 rounded-full text-sm font-sans font-semibold transition-all duration-200 tap-target ${
                selectedCategory === tab.key
                  ? "bg-sage text-white shadow-sm"
                  : "bg-card-white border border-border text-muted hover:text-near-black hover:bg-sage-light/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => {
              const whatsappMessage = encodeURIComponent(
                `Hello At.home, I would like to request a lease quote for "${item.name}". Please provide pricing details.`
              );
              const whatsappUrl = `https://wa.me/254705320618?text=${whatsappMessage}`;

              return (
                <div
                  key={item.id}
                  className="bg-card-white border border-border rounded-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] bg-background flex items-center justify-center p-4 border-b border-border/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-sage-light/10 flex items-center justify-center">
                      <Package className="h-12 w-12 text-sage/40 stroke-[1.2]" />
                    </div>
                    
                    {/* Availability tag */}
                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.available 
                        ? "bg-success/10 text-success" 
                        : "bg-near-black/10 text-muted"
                    }`}>
                      {item.available ? "Available" : "Leased Out"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted font-sans mb-1.5 block">
                      {getCategoryLabel(item.category)}
                    </span>
                    
                    <h3 className="font-sans font-bold text-near-black text-base leading-snug group-hover:text-terracotta transition-colors duration-200 mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-muted font-sans line-clamp-3 leading-relaxed mb-4 flex-grow">
                      {item.description}
                    </p>
                    
                    {/* Rates Info -> Get Quote Today */}
                    <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                      <span className="text-xs font-sans font-semibold text-sage uppercase tracking-wider bg-sage-light/60 px-3 py-1 rounded-full">
                        Custom Lease
                      </span>
                      <span className="text-xs font-sans font-bold text-terracotta">
                        Get Quote Today
                      </span>
                    </div>
                  </div>

                  {/* Button Action */}
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
        ) : (
          <div className="text-center py-16 bg-card-white border border-border rounded-card">
            <Package className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="font-sans font-bold text-near-black text-lg mb-1">No items found</h3>
            <p className="font-sans text-muted text-sm">We don&apos;t have any equipment listed in this category right now.</p>
          </div>
        )}

        {/* Informational Accordion for Renting */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="font-display text-near-black text-2xl text-center mb-8">Hospital Bed Rental &amp; Equipment FAQ</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I hire a hospital bed for home use in Kenya?",
                a: "Yes. We offer flexible hospital bed hire and leasing for home use across Nairobi. We deliver fully sanitized, clinical-grade electric and manual hospital beds directly to your home, set them up, and provide full operational training."
              },
              {
                q: "What are the benefits of leasing medical equipment over buying?",
                a: "Leasing is cost-effective for short-term recovery periods. You only pay for the duration you need, we handle all maintenance and sanitization between uses, and you avoid the large upfront purchase cost of hospital-grade equipment."
              },
              {
                q: "How does medical equipment delivery and setup work in Nairobi?",
                a: "Once your order is confirmed, our trained technicians deliver to your home in Nairobi, install and configure the equipment safely, demonstrate proper usage to your family or caregiver, and remain available for any follow-up support during the lease period."
              },
              {
                q: "Is there a security deposit required?",
                a: "Yes, a fully refundable security deposit based on item value is required before delivery. It is returned to you upon satisfactory inspection when the item is collected."
              },
              {
                q: "What payment methods are accepted?",
                a: "We accept M-Pesa (STK Push) for local clients and international credit/debit cards for diaspora sponsors. Invoices are generated and managed inside your AtHome Kenya client portal."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-card-white border border-border rounded-card p-6">
                <h3 className="font-sans font-semibold text-near-black text-base flex items-center gap-2 mb-2">
                  <HelpCircle className="h-5 w-5 text-sage shrink-0" />
                  {faq.q}
                </h3>
                <p className="font-sans text-muted text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
