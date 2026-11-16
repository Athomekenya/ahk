import React from "react";
import type { Metadata } from "next";
import DiasporaStrip from "@/components/home/DiasporaStrip";
import TrustTicker from "@/components/home/TrustTicker";
import { ArrowRight, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Arrange Home Care in Kenya from Abroad | Diaspora Care Coordination — AtHome Kenya",
  description:
    "Living in the UK, USA, Canada, or Middle East? Arrange trusted home care, nursing, and elderly care for your loved one in Kenya. Transparent updates, M-Pesa or card payments.",
  alternates: {
    canonical: "https://www.athomekenya.com/diaspora",
  },
  openGraph: {
    title: "Arrange Home Care in Kenya from Abroad | AtHome Kenya Diaspora Services",
    description:
      "Coordinate professional home care and elderly care in Nairobi for a parent or relative from anywhere in the world. Secure booking, regular reporting, and 24-hour matching.",
    url: "https://www.athomekenya.com/diaspora",
  },
};

export default function DiasporaPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello At.home, I live abroad and would like to arrange care for a relative in Nairobi."
  );

  return (
    <div className="bg-ivory min-h-screen flex flex-col pt-40 sm:pt-48">
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#1c1130] via-[#23153d] to-[#3b0b3c] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-gold mb-6 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
            For Kenyan Families Abroad
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            Peace of mind, <br className="hidden sm:block" /> no matter where you are.
          </h1>
          <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-10">
            We understand the anxiety of managing a loved one&apos;s healthcare from thousands of miles away. 
            At.home bridges the gap with professional care, transparent communication, and easy international payments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/254705320618?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold rounded-btn transition-colors shadow-lg tap-target"
            >
              Consult via WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <TrustTicker />

      {/* The Problem / Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-sage" />
            </div>
            <h3 className="font-display text-2xl text-near-black mb-4">Vetted Professionals</h3>
            <p className="font-sans text-muted leading-relaxed">
              Every nurse and caregiver is background-checked and credential-verified.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-sage" />
            </div>
            <h3 className="font-display text-2xl text-near-black mb-4">Local Oversight</h3>
            <p className="font-sans text-muted leading-relaxed">
              Our clinical care coordinators act as your eyes and ears on the ground in Nairobi, ensuring care standards are met and adapting the care plan as needed.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-6">
              <HeartHandshake className="h-8 w-8 text-sage" />
            </div>
            <h3 className="font-display text-2xl text-near-black mb-4">Compassionate Care</h3>
            <p className="font-sans text-muted leading-relaxed">
              Beyond just medical support, our caregivers provide companionship and emotional support, ensuring your parents feel valued and respected.
            </p>
          </div>
        </div>
      </section>

      {/* Reused Diaspora Strip for the specific trust pillars */}
      <DiasporaStrip hideLearnMoreLink={true} />

      {/* Final CTA */}
      <section className="bg-near-black text-white py-20 px-4 sm:px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Let&apos;s discuss your loved one&apos;s needs.
          </h2>
          <p className="font-sans text-white/80 mb-10 max-w-xl mx-auto text-lg">
            Schedule a free consultation call with our care coordination team. 
            We&apos;ll assess the situation and propose a tailored care plan.
          </p>
          <a
            href={`https://wa.me/254705320618?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-semibold rounded-full transition-all duration-300 shadow-lg tap-target"
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat with a Coordinator
          </a>
        </div>
      </section>
    </div>
  );
}
