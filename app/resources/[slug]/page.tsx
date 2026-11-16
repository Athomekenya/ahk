import React from "react";
import { notFound } from "next/navigation";
import { articlesData, Article } from "@/lib/data/articles";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Calendar,
  UserCheck,
  CheckCircle2,
  Quote,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Share2,
  BookmarkCheck,
  ArrowRight
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { Metadata } from "next";

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found | At Home Kenya" };
  }
  return {
    title: `${article.title} | At Home Kenya Resources`,
    description: article.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const articleIndex = articlesData.findIndex((a) => a.slug === params.slug);
  const article = articlesData[articleIndex];

  if (!article) {
    notFound();
  }

  const prevArticle = articleIndex > 0 ? articlesData[articleIndex - 1] : null;
  const nextArticle =
    articleIndex < articlesData.length - 1
      ? articlesData[articleIndex + 1]
      : null;

  // Find 3 related articles (prefer same category, fallback to others)
  const relatedArticles: Article[] = articlesData
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => {
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello At Home Kenya, I just read "${article.title}" on your website and would like to speak to a care coordinator.`
  );

  // Helper function to render bold text inside strings
  const renderFormattedText = (str: string) => {
    const parts = str.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-near-black">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 font-sans">
      
      {/* Top Header / Breadcrumb Section */}
      <section className="bg-card-white border-b border-border/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Top navigation row */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sage hover:text-terracotta font-sans text-sm font-semibold transition-colors tap-target"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Care Guides
            </Link>

            <span className="text-xs font-sans font-bold text-terracotta uppercase tracking-widest bg-terracotta/10 px-3.5 py-1.5 rounded-full">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-near-black mb-6 leading-tight"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {article.title}
          </h1>

          {/* Excerpt Subtitle */}
          <p className="font-sans text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-3xl">
            {article.excerpt}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-sage/10 text-sage flex items-center justify-center font-bold shrink-0">
                <UserCheck className="h-5.5 w-5.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-near-black leading-snug">
                  {article.author?.name || "Clinical Care Team"}
                </p>
                <p className="text-xs text-muted">
                  {article.author?.role || "At Home Kenya Healthcare Division"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 text-xs text-muted font-medium">
              <span className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border border-border/60">
                <Calendar className="h-3.5 w-3.5 text-sage" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5 bg-background px-3 py-1.5 rounded-full border border-border/60">
                <Clock className="h-3.5 w-3.5 text-terracotta" /> {article.readTime}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Key Takeaways Card */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-12 bg-card-white border-2 border-sage/20 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sage/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex items-center gap-2 text-sage font-bold text-base uppercase tracking-wider mb-4">
                <Sparkles className="h-5 w-5 text-gold shrink-0" />
                Key Article Takeaways
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-sage-light/30 p-3.5 rounded-xl border border-sage/10">
                    <CheckCircle2 className="h-5 w-5 text-sage shrink-0 mt-0.5" />
                    <p className="text-sm font-sans text-near-black leading-snug font-medium">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Body Renderer */}
          <div className="space-y-6">
            {article.content
              .trim()
              .split("\n\n")
              .map((block, index) => {
                const text = block.trim();
                if (!text) return null;

                // Horizontal Rule
                if (text === "---") {
                  return (
                    <hr
                      key={index}
                      className="my-10 border-t border-border/80"
                    />
                  );
                }

                // Blockquote / Callout Box
                if (text.startsWith("> ")) {
                  const calloutText = text.replace(/^>\s*/, "");
                  return (
                    <div
                      key={index}
                      className="my-8 bg-sage-light/40 border-l-4 border-sage p-6 rounded-r-2xl shadow-xs flex items-start gap-4"
                    >
                      <Quote className="h-6 w-6 text-sage shrink-0 mt-1 opacity-80" />
                      <div className="text-near-black font-sans text-base sm:text-lg leading-relaxed italic">
                        {renderFormattedText(calloutText)}
                      </div>
                    </div>
                  );
                }

                // H2 Heading
                if (text.startsWith("## ")) {
                  const headingText = text.replace("## ", "");
                  return (
                    <div key={index} className="mt-12 mb-6 pt-4 border-t border-border/40">
                      <h2 className="font-display text-near-black text-2xl sm:text-3xl font-bold leading-snug flex items-center gap-3">
                        <span className="w-2 h-7 bg-terracotta rounded-full inline-block shrink-0" />
                        {headingText}
                      </h2>
                    </div>
                  );
                }

                // H3 Subheading
                if (text.startsWith("### ")) {
                  const headingText = text.replace("### ", "");
                  return (
                    <h3
                      key={index}
                      className="font-sans text-xl font-bold text-sage mt-8 mb-4 flex items-center gap-2.5"
                    >
                      <BookmarkCheck className="h-5 w-5 text-terracotta shrink-0" />
                      {headingText}
                    </h3>
                  );
                }

                // H4 Minor Heading
                if (text.startsWith("#### ")) {
                  const headingText = text.replace("#### ", "");
                  return (
                    <h4
                      key={index}
                      className="font-sans text-lg font-bold text-near-black mt-6 mb-3"
                    >
                      {headingText}
                    </h4>
                  );
                }

                // Unordered List (- item)
                if (text.startsWith("- ")) {
                  const items = text.split("\n").map((line) => line.replace(/^-\s*/, ""));
                  return (
                    <ul key={index} className="my-6 space-y-3 pl-1">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-terracotta mt-2 shrink-0" />
                          <span className="text-muted text-base font-sans leading-relaxed">
                            {renderFormattedText(item)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Numbered List (1. item)
                if (/^\d+\.\s/.test(text)) {
                  const items = text.split("\n").map((line) => line.replace(/^\d+\.\s*/, ""));
                  return (
                    <ol key={index} className="my-6 space-y-4">
                      {items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-4 bg-card-white border border-border/80 p-4 rounded-xl shadow-2xs"
                        >
                          <span className="w-7 h-7 rounded-full bg-sage text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                            {idx + 1}
                          </span>
                          <span className="text-near-black text-base font-sans leading-relaxed">
                            {renderFormattedText(item)}
                          </span>
                        </li>
                      ))}
                    </ol>
                  );
                }

                // Standard Paragraph
                return (
                  <p
                    key={index}
                    className="text-muted text-base sm:text-lg leading-relaxed font-sans mb-6"
                  >
                    {renderFormattedText(text)}
                  </p>
                );
              })}
          </div>

          {/* Social Share & Clinical Review Tag */}
          <div className="mt-16 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-sage bg-sage/10 px-3.5 py-2 rounded-full font-sans">
                <CheckCircle2 className="h-4 w-4" /> Medically Reviewed by Clinical Governance Team
              </span>
            </div>
            
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Check out this article from At Home Kenya: ${article.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-near-black transition-colors"
            >
              <Share2 className="h-4 w-4" /> Share with family
            </a>
          </div>

          {/* Next / Previous Article Navigation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                href={`/resources/${prevArticle.slug}`}
                className="group p-5 bg-card-white border border-border rounded-2xl hover:border-sage transition-all duration-200 flex flex-col gap-2"
              >
                <span className="text-xs font-semibold text-muted flex items-center gap-1 font-sans">
                  <ChevronLeft className="h-4 w-4" /> Previous Guide
                </span>
                <span className="text-sm font-bold text-near-black group-hover:text-sage transition-colors line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                href={`/resources/${nextArticle.slug}`}
                className="group p-5 bg-card-white border border-border rounded-2xl hover:border-sage transition-all duration-200 flex flex-col gap-2 text-right items-end"
              >
                <span className="text-xs font-semibold text-muted flex items-center gap-1 font-sans">
                  Next Guide <ChevronRight className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-near-black group-hover:text-sage transition-colors line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            ) : <div />}
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border/80">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl text-near-black">
                  Related Care Guides
                </h3>
                <Link
                  href="/resources"
                  className="text-xs font-semibold text-sage hover:underline flex items-center gap-1"
                >
                  View All Guides <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/resources/${rel.slug}`}
                    className="group bg-card-white border border-border rounded-xl p-5 hover:shadow-md hover:border-sage/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider bg-terracotta/10 px-2 py-0.5 rounded-full inline-block mb-3">
                        {rel.category}
                      </span>
                      <h4 className="font-sans font-bold text-sm text-near-black group-hover:text-sage transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted font-sans line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted">
                      <span>{rel.readTime}</span>
                      <span className="text-sage font-semibold group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer Call to Action */}
          <div className="mt-16 bg-gradient-to-br from-sage/10 via-card-white to-sage-light/30 rounded-3xl p-8 sm:p-10 border border-sage/20 text-center relative overflow-hidden shadow-sm">
            <h3 className="font-display text-2xl sm:text-3xl text-near-black mb-3">
              Need Clinical Guidance or Home Care Assistance?
            </h3>
            <p className="font-sans text-muted max-w-xl mx-auto mb-8 text-base leading-relaxed">
              Our registered nurses, physiotherapists, and clinical coordinators are available to answer your questions and arrange personalized care in Nairobi.
            </p>
            <a
              href={`https://wa.me/254705320618?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-semibold rounded-full transition-all shadow-md hover:shadow-lg tap-target"
            >
              <WhatsAppIcon className="h-5.5 w-5.5" /> Speak with a Care Coordinator
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
