import React from "react";
import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustTicker from "@/components/home/TrustTicker";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesGrid from "@/components/home/ServicesGrid";
import DiasporaStrip from "@/components/home/DiasporaStrip";
import MeetCaregivers from "@/components/home/MeetCaregivers";
import SuccessInNumbers from "@/components/home/SuccessInNumbers";
import Testimonials from "@/components/home/Testimonials";
import FAQPreview from "@/components/home/FAQPreview";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AtHome Kenya | Vetted Caregivers, Home Nursing & Elderly Care in Kenya",
  description:
    "Top-rated caregiver agency in Nairobi, Kenya. We match families with vetted caregivers, licensed private nurses, elderly home care, in-home physiotherapy, night nurses, and hospital bed rentals.",
  alternates: {
    canonical: "https://www.athomekenya.com",
  },
  openGraph: {
    title: "AtHome Kenya | Vetted Caregivers, Home Nursing & Elderly Care in Kenya",
    description:
      "Hire vetted caregivers, licensed nurses, elderly home care, and in-home physiotherapy in Nairobi, Kenya. Fast matching in 12–24 hours.",
    url: "https://www.athomekenya.com",
    siteName: "AtHome Kenya",
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly can you arrange a caregiver in Kenya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In most cases, we confirm and match a vetted caregiver or nurse within 12–24 hours of receiving your request. For urgent specialist clinical needs, our care coordinator contacts you directly.",
      },
    },
    {
      "@type": "Question",
      name: "Are your caregivers in Kenya background-checked and qualified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every caregiver and nurse undergoes identity verification, criminal background vetting, and credential verification with the Nursing Council of Kenya (NCK) or relevant regulatory healthcare bodies.",
      },
    },
    {
      "@type": "Question",
      name: "Can I hire a live-in caregiver or night nurse in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We offer flexible options including hourly visits (1–2 hours), full day shifts (8–12 hours), dedicated night nurses for nocturnal monitoring, and full-time 24/7 live-in caregivers across Nairobi and surrounding counties.",
      },
    },
    {
      "@type": "Question",
      name: "Can I pay for home care services via M-Pesa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. M-Pesa is fully integrated for local clients via instant STK push. Credit/debit cards and international transfers are also supported for diaspora sponsors in the UK, USA, Canada, Europe, and Middle East.",
      },
    },
    {
      "@type": "Question",
      name: "How do diaspora families arrange care for aging parents in Nairobi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our diaspora coordination service allows you to book online, consult via telemedicine, pay securely with international cards, and receive detailed WhatsApp and email updates after every clinical visit.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0 overflow-hidden">
      <JsonLd data={homeFaqSchema} />
      {/* Hero — full viewport */}
      <Hero />

      {/* Trust Ticker Marquee */}
      <TrustTicker />

      {/* How It Works — 4 steps */}
      <HowItWorks />

      {/* Our Impact (Success in Numbers) — Moved higher up */}
      <SuccessInNumbers />

      {/* Services Grid — 8 cards */}
      <ServicesGrid />

      {/* Diaspora Strip */}
      <DiasporaStrip />

      {/* Meet Our Caregivers (Desktop only) */}
      <MeetCaregivers />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Preview Accordion — Final Homepage Section */}
      <FAQPreview />
    </div>
  );
}
