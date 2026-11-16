import React from "react";
import type { Metadata } from "next";
import ServicesGrid from "@/components/home/ServicesGrid";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Home Care Services in Kenya | Nursing, Physiotherapy & Elderly Care Nairobi",
  description:
    "Comprehensive home healthcare services in Nairobi, Kenya. Hire private nurses, in-home physiotherapists, elderly caregivers, night nurses, wound care specialists, and rent hospital beds.",
  alternates: {
    canonical: "https://www.athomekenya.com/services",
  },
  openGraph: {
    title: "Home Care Services in Kenya | AtHome Kenya",
    description:
      "Vetted home nursing, physiotherapy, elderly care, postnatal night nurse, chronic disease management, and medical equipment leasing in Nairobi.",
    url: "https://www.athomekenya.com/services",
  },
};

export default function ServicesPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello At Home Kenya, I would like to arrange home-based care. Please advise."
  );

  return (
    <div className="pt-32 pb-16 bg-ivory min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-8">
        <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-2">
          Home Care &amp; Medical Services · Nairobi, Kenya
        </span>
        <h1 className="font-display text-near-black mb-4" style={{ fontSize: "var(--text-h1)" }}>
          Home Care Services in Kenya
        </h1>
        <p className="text-muted max-w-2xl mx-auto font-sans leading-relaxed text-lg">
          AtHome Kenya brings professional, compassionate healthcare directly to your doorstep across Nairobi.
          Our vetted nurses, caregivers, and physiotherapists provide home-based medical care, elderly care, and equipment leasing matched to your clinical needs.
        </p>
      </section>

      {/* Services Grid (Reused from Home Page) */}
      <ServicesGrid hideViewAllLink={true} />

      {/* CTA Section */}
      <section className="bg-near-black text-white py-16 px-4 sm:px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Not sure what type of care you need?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto text-lg">
            Our care coordinators are ready to help you build a personalized care plan for your loved one.
          </p>
          <a
            href={`https://wa.me/254705320618?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-terracotta/40 tap-target"
          >
            Chat with a Coordinator <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
