"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  BookOpen,
  UserCheck,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw
} from "lucide-react";
import { Article } from "@/lib/data/articles";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface ResourcesDirectoryProps {
  articles: Article[];
}

export default function ResourcesDirectory({ articles }: ResourcesDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Standardized categories and their counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: articles.length };
    articles.forEach((art) => {
      counts[art.category] = (counts[art.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  // Filter articles based on query & category
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        (article.keyTakeaways &&
          article.keyTakeaways.some((t) => t.toLowerCase().includes(q))) ||
        article.content.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = selectedCategory === "All" && !searchQuery ? articles[0] : null;
  const gridArticles = featuredArticle
    ? filteredArticles.slice(1)
    : filteredArticles;

  return (
    <div className="w-full">
      {/* Controls: Search & Category Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-card-white border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-sm flex flex-col gap-5">
          
          {/* Top Row: Search Input */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by symptom, condition, or guide (e.g. stroke, dementia, physiotherapy, wound care)..."
              className="w-full pl-11 pr-10 py-3.5 sm:py-4 bg-background border border-border rounded-xl sm:rounded-2xl font-sans text-near-black placeholder:text-muted/70 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-near-black transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Header & Actions */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/40">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-near-black uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-sage" />
              <span>Browse by Category</span>
            </div>

            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta hover:text-terracotta/80 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset Filters
              </button>
            )}
          </div>

          {/* Mobile View: Compact Category Dropdown Selector (< md) */}
          <div className="block md:hidden">
            <label htmlFor="mobile-category-select" className="sr-only">
              Select Category
            </label>
            <div className="relative">
              <select
                id="mobile-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-background border-2 border-sage/30 rounded-xl px-4 py-3.5 text-sm font-bold text-near-black font-sans focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent shadow-xs pr-10"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat} ({categoryCounts[cat]})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sage">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>

            {/* Quick-tap swipeable pill strip for mobile */}
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? "bg-sage text-white shadow-xs"
                        : "bg-background border border-border/80 text-muted"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-card-white text-muted"
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop View: Generous Pill Bar (>= md) */}
          <div className="hidden md:flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const count = categoryCounts[cat];
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 tap-target ${
                    isActive
                      ? "bg-sage text-white shadow-sm ring-2 ring-sage/30 scale-[1.02]"
                      : "bg-background text-near-black hover:text-sage hover:bg-sage-light/40 border border-border/80 shadow-2xs hover:border-sage/40"
                  }`}
                >
                  <span className="tracking-tight">{cat}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-card-white border border-border/60 text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter Header */}
        <div className="flex items-center justify-between mt-4 px-2 text-xs sm:text-sm font-medium text-muted font-sans">
          <span>
            Showing <strong className="text-near-black">{filteredArticles.length}</strong> of{" "}
            {articles.length} clinical guides
            {selectedCategory !== "All" && (
              <> in <span className="text-sage font-semibold">&ldquo;{selectedCategory}&rdquo;</span></>
            )}
            {searchQuery && (
              <> matching <span className="text-terracotta font-semibold">&ldquo;{searchQuery}&rdquo;</span></>
            )}
          </span>
        </div>
      </div>

      {/* Featured Article Hero (Shown on All default view without search query) */}
      {featuredArticle && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
          <div className="bg-gradient-to-br from-card-white to-sage-light/20 border-2 border-sage/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="inline-flex items-center gap-1.5 bg-terracotta text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
                    <Sparkles className="h-3.5 w-3.5" /> Featured Guide
                  </span>
                  <span className="text-xs font-bold text-sage uppercase tracking-wider bg-sage/10 px-3 py-1.5 rounded-full border border-sage/20">
                    {featuredArticle.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted font-sans bg-card-white px-3 py-1.5 rounded-full border border-border/60">
                    <Clock className="h-3.5 w-3.5 text-terracotta" /> {featuredArticle.readTime}
                  </span>
                </div>

                <Link
                  href={`/resources/${featuredArticle.slug}`}
                  className="group block"
                >
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-near-black group-hover:text-sage transition-colors duration-200 mb-4 leading-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>

                <p className="text-muted text-base sm:text-lg font-sans leading-relaxed mb-6 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>

                {/* Key Takeaways preview */}
                {featuredArticle.keyTakeaways && (
                  <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featuredArticle.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 bg-card-white/95 p-3 rounded-xl border border-sage/15 text-xs sm:text-sm text-near-black font-medium leading-relaxed shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-sage shrink-0 mt-1.5" />
                        <span className="line-clamp-2">{takeaway}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage/10 text-sage flex items-center justify-center font-bold text-sm">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-near-black">
                        {featuredArticle.author?.name || "Clinical Care Team"}
                      </p>
                      <p className="text-xs text-muted">
                        {featuredArticle.date}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/resources/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-sage hover:bg-sage-dark text-white font-sans font-semibold text-sm rounded-btn transition-all shadow-sm hover:shadow-md tap-target"
                  >
                    Read Full Guide <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredArticles.length === 0 ? (
          <div className="bg-card-white border border-border rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-sm">
            <BookOpen className="h-12 w-12 text-muted/50 mx-auto mb-4" />
            <h3 className="font-display text-xl sm:text-2xl text-near-black mb-2">No Articles Found</h3>
            <p className="text-sm text-muted font-sans mb-6 leading-relaxed">
              We couldn&apos;t find any guides matching &ldquo;{searchQuery}&rdquo;. Try adjusting your search query or exploring another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-sage text-white text-sm font-semibold rounded-btn hover:bg-sage-dark transition-colors shadow-sm"
            >
              Show All {articles.length} Articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {gridArticles.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/${post.slug}`}
                className="group flex flex-col bg-card-white border border-border/80 rounded-card overflow-hidden hover:shadow-xl hover:border-sage/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                aria-label={`Read guide: ${post.title}`}
              >
                {/* Header card banner (Generous, fluid padding) */}
                <div className="bg-gradient-to-br from-sage/15 via-sage-light/30 to-ivory p-4 sm:p-5 border-b border-border/60 flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-block text-xs font-sans font-bold text-terracotta uppercase tracking-wider bg-card-white/95 px-3 py-1 rounded-full shadow-2xs border border-terracotta/15">
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

                {/* Content body */}
                <div className="flex flex-col gap-3 p-5 sm:p-6 flex-grow">
                  <h3
                    className="font-sans font-bold text-near-black leading-snug group-hover:text-sage transition-colors duration-200 text-base sm:text-lg line-clamp-2 min-h-[2.8rem] sm:min-h-[3.25rem]"
                  >
                    {post.title}
                  </h3>

                  <p className="text-muted text-xs sm:text-sm font-sans leading-relaxed line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Key Takeaway snippet */}
                  {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                    <div className="bg-sage-light/35 border border-sage/15 p-2.5 sm:p-3 rounded-xl text-xs text-near-black font-medium line-clamp-2 leading-relaxed flex items-start gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0 mt-1" />
                      <span className="line-clamp-2">{post.keyTakeaways[0]}</span>
                    </div>
                  )}

                  {/* Card bottom row */}
                  <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-border/60">
                    <span className="text-xs text-muted font-sans truncate max-w-[130px] sm:max-w-[150px]">
                      {post.author?.name || "Clinical Team"}
                    </span>
                    <span className="text-terracotta text-xs sm:text-sm font-semibold font-sans flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                      Read Guide <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Direct Clinical Guidance Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-sage/10 via-card-white to-sage-light/30 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-sage/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold text-terracotta uppercase tracking-wider mb-2 inline-block">
              Free Care Consultation
            </span>
            <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-near-black mb-2">
              Have Questions About Home Care in Nairobi?
            </h3>
            <p className="text-muted font-sans text-xs sm:text-base leading-relaxed">
              Our clinical nurse managers and physical therapy coordinators are available to answer your medical questions, review discharge instructions, or coordinate care.
            </p>
          </div>

          <a
            href="https://wa.me/254705320618?text=Hello%20At%20Home%20Kenya%2C%20I%20am%20browsing%20your%20Care%20Guides%20and%20would%20like%20to%20speak%20with%20a%20care%20coordinator."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-sans font-semibold rounded-full transition-all shadow-sm hover:shadow-md tap-target text-sm sm:text-base shrink-0 w-full sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" /> Chat with Care Coordinator
          </a>
        </div>
      </div>
    </div>
  );
}
