import React from "react";
import type { Metadata } from "next";
import { articlesData } from "@/lib/data/articles";
import ResourcesDirectory from "@/components/resources/ResourcesDirectory";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export const metadata: Metadata = {
  title: "Care Guides & Medical Resources | At Home Kenya",
  description:
    "Explore our complete library of 50+ clinical care guides, post-surgery recovery advice, dementia support, home nursing tips, palliative care, and physiotherapy insights from At Home Kenya.",
};

export default function ResourcesPage() {
  return (
    <div className="pt-32 pb-16 bg-ivory min-h-screen flex flex-col">
      {/* Page Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-10">
        <span className="inline-block text-xs font-sans font-bold uppercase tracking-widest text-terracotta bg-terracotta/10 px-3.5 py-1.5 rounded-full mb-4">
          Clinical Knowledge &amp; Family Guides
        </span>
        <h1
          className="font-display text-near-black mb-4 leading-tight"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Care Guides &amp; Resources
        </h1>
        <p className="text-muted max-w-2xl mx-auto font-sans leading-relaxed text-base sm:text-lg">
          Insights, practical advice, and medical knowledge from our team of senior nurses,
          physiotherapists, and clinical care coordinators in Kenya.
        </p>
      </section>

      {/* Interactive Care Directory with all 20 articles */}
      <ResourcesDirectory articles={articlesData} />

      {/* Newsletter Signup CTA */}
      <div className="mt-auto border-t border-border">
        <NewsletterSignup />
      </div>
    </div>
  );
}
