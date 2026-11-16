"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How quickly can you arrange a caregiver?",
    answer:
      "In most cases we confirm a matched caregiver within 12–24 hours of receiving your request. For complex or specialist needs, our coordinator will contact you directly to discuss timelines.",
  },
  {
    question: "Are your caregivers background-checked and qualified?",
    answer:
      "Yes. Every caregiver undergoes identity verification, a criminal background check, and credential verification against the Nursing Council of Kenya or the relevant professional body before joining our platform.",
  },
  {
    question: "Can I pay via M-Pesa?",
    answer:
      "Absolutely. M-Pesa is our primary payment method for local clients. You'll receive an M-Pesa STK push directly to your phone to complete your booking deposit. Card payments are also accepted for diaspora clients.",
  },
  {
    question: "I'm based in the UK — how do I arrange care for my parent in Nairobi?",
    answer:
      "Our diaspora booking flow is designed for exactly this. You can complete the full process online, pay by card or international bank transfer, and receive WhatsApp updates after every visit. Visit our Diaspora page for details.",
  },
  {
    question: "What happens if I'm not satisfied with my caregiver?",
    answer:
      "Your satisfaction matters above everything. If you're not happy with a match, contact your care coordinator via WhatsApp or phone and we will arrange a replacement at no extra charge.",
  },
];

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className="bg-sage-light py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="faq-preview-heading"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
            Common questions
          </span>
          <h2
            id="faq-preview-heading"
            className="font-display text-near-black"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Frequently asked questions
          </h2>
        </div>

        <dl className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-card-white border border-border rounded-card overflow-hidden"
              >
                <dt>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-sans font-semibold text-near-black hover:text-sage transition-colors duration-200 tap-target"
                    aria-expanded={isOpen}
                    id={`faq-q-${i}`}
                    aria-controls={`faq-a-${i}`}
                  >
                    <span style={{ fontSize: "var(--text-small)" }}>{faq.question}</span>
                    {isOpen
                      ? <ChevronUp className="h-5 w-5 text-sage shrink-0" />
                      : <ChevronDown className="h-5 w-5 text-muted shrink-0" />
                    }
                  </button>
                </dt>
                {isOpen && (
                  <dd
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className="px-6 pb-5 text-muted font-sans leading-relaxed"
                    style={{ fontSize: "var(--text-small)" }}
                  >
                    {faq.answer}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sage font-sans font-semibold hover:underline"
          >
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}
