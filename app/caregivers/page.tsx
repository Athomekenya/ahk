import React from "react";
import type { Metadata } from "next";
import MeetCaregivers from "@/components/home/MeetCaregivers";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Vetted Caregivers in Kenya | Certified Home Nurses & Aides Nairobi",
  description:
    "Find trusted, background-checked caregivers in Kenya. We match families with professional live-in caregivers, registered nurses, and elderly care aides across Nairobi.",
  alternates: {
    canonical: "https://www.athomekenya.com/caregivers",
  },
  openGraph: {
    title: "Vetted Caregivers in Kenya | Certified Home Nurses & Aides Nairobi",
    description:
      "Looking for trusted caregivers or caregiver agencies in Kenya? Match with vetted, NCK-licensed nurses and compassionate care aides in 12–24 hours.",
    url: "https://www.athomekenya.com/caregivers",
  },
};

const caregiverPageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Caregiver & Private Nursing Agency",
  provider: {
    "@type": "MedicalBusiness",
    name: "AtHome Kenya",
    url: "https://www.athomekenya.com",
    telephone: "+254705320618",
  },
  areaServed: {
    "@type": "City",
    name: "Nairobi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Caregiver & Nursing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Live-In Caregiver Services",
          description: "24/7 continuous in-home support for seniors and chronic care patients.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Night Nurse & Overnight Monitoring",
          description: "Licensed nocturnal vital tracking, medication administration, and infant night nursing.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hourly & Day Shift Home Care",
          description: "Flexible procedural visits and 8-to-12 hour dedicated day caregiver shifts.",
        },
      },
    ],
  },
};

export default function CaregiversPage() {
  const whatsappMessage = encodeURIComponent(
    "Hello At Home Kenya, I would like to arrange home-based care. Please advise."
  );

  return (
    <div className="pt-32 pb-16 bg-ivory min-h-screen flex flex-col">
      <JsonLd data={caregiverPageSchema} />
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-8">
        <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-2">
          Verified Caregiver Agency · Nairobi &amp; Kenya
        </span>
        <h1 className="font-display text-near-black mb-4" style={{ fontSize: "var(--text-h1)" }}>
          Vetted Caregivers &amp; Private Nurses in Kenya
        </h1>
        <p className="text-muted max-w-2xl mx-auto font-sans leading-relaxed text-lg">
          We match families across Nairobi and the diaspora with verified, compassionate healthcare aides and registered nurses. Every caregiver in our network is identity-verified, background-checked, and credentialed with the Nursing Council of Kenya.
        </p>
      </section>

      {/* Caregivers Grid (Reused from Home Page) */}
      <MeetCaregivers hideViewAllLink={true} />

      {/* CTA Section */}
      <section className="bg-near-black text-white py-16 px-4 sm:px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Ready to match with a caregiver?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto text-lg">
            Our coordinators will pair you with the perfect professional based on your specific medical and personal needs.
          </p>
          <a
            href={`https://wa.me/254705320618?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-terracotta/40 tap-target"
          >
            Match me with a Caregiver <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
