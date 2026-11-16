"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { articlesData as posts } from "@/lib/data/articles";

interface BlogPreviewProps {
  hideViewAllLink?: boolean;
}

export default function BlogPreview({ hideViewAllLink = false }: BlogPreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section
      className="bg-ivory py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-xs font-sans font-semibold uppercase tracking-widest text-terracotta mb-4">
              From the Care Team
            </span>
            <h2
              id="blog-heading"
              className="font-display text-near-black"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Care Guides &amp; Resources
            </h2>
          </div>
          {!hideViewAllLink && (
            <Link
              href="/resources"
              className="flex items-center gap-1.5 text-sage font-sans font-semibold text-sm hover:underline shrink-0"
            >
              Browse all {posts.length} guides <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Horizontal swipe carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory pb-4 px-1"
        >
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/resources/${post.slug}`}
              className="group flex flex-col bg-card-white border border-border rounded-card overflow-hidden hover:shadow-lg hover:border-sage/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage snap-start shrink-0 w-[300px] sm:w-[340px] md:w-[calc(33.333%-16px)]"
              aria-label={`Read: ${post.title}`}
            >
              {/* Header card banner */}
              <div className="bg-gradient-to-br from-sage/15 via-sage-light/30 to-ivory p-5 border-b border-border/60 flex flex-col justify-between gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-block text-xs font-sans font-bold text-terracotta uppercase tracking-wider bg-card-white/95 px-3 py-1 rounded-full shadow-2xs border border-terracotta/15 max-w-[190px] truncate">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted font-sans bg-card-white/90 px-2.5 py-1 rounded-full shadow-2xs border border-border/40 shrink-0">
                    <Clock className="h-3 w-3 text-terracotta" /> {post.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted font-sans">
                  <Calendar className="h-3.5 w-3.5 text-sage" /> {post.date}
                </div>
              </div>

              <div className="flex flex-col gap-3 p-6 flex-grow">
                <h3
                  className="font-sans font-bold text-near-black leading-snug group-hover:text-sage transition-colors duration-200 line-clamp-2 min-h-[2.8rem]"
                  style={{ fontSize: "1.05rem" }}
                >
                  {post.title}
                </h3>

                <p className="text-muted text-sm font-sans leading-relaxed line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
                  <span className="text-xs text-muted font-sans truncate max-w-[140px]">
                    {post.author?.name || "Clinical Team"}
                  </span>
                  <span className="text-terracotta text-sm font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Previous article"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {!hideViewAllLink && (
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-sage text-sage hover:bg-sage hover:text-white font-sans font-semibold rounded-btn transition-colors duration-300 tap-target text-sm sm:text-base whitespace-nowrap shadow-xs"
            >
              Explore All {posts.length} Care Guides
            </Link>
          )}

          <button
            onClick={scrollRight}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-border/80 bg-card-white hover:bg-sage-light hover:text-sage text-near-black transition-colors shadow-sm tap-target shrink-0"
            aria-label="Next article"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
