"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Package,
  Stethoscope,
  BookOpen,
  X,
  Newspaper,
  HelpCircle,
  Users,
  HeartHandshake,
} from "lucide-react";

const resourceItems = [
  {
    href: "/resources",
    icon: Newspaper,
    label: "Blog & Guides",
  },
  {
    href: "/#faq",
    icon: HelpCircle,
    label: "FAQ",
  },
  {
    href: "/careers",
    icon: HeartHandshake,
    label: "Careers",
  },
  {
    href: "/caregivers",
    icon: Users,
    label: "Meet Caregivers",
  },
];

const mainTabs = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/equipment", icon: Package, label: "Lease" },
  { href: "/services", icon: Stethoscope, label: "Services" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isResourcesActive =
    resourceItems.some((r) => r.href !== "/#faq" && pathname.startsWith(r.href));

  return (
    <>
      {/* Resources pop-up sheet */}
      <AnimatePresence>
        {resourcesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setResourcesOpen(false)}
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-[64px] left-0 right-0 z-50 bg-card-white rounded-t-2xl shadow-2xl border-t border-border lg:hidden pb-safe"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <div className="flex items-center justify-between px-5 pt-2 pb-4">
                <span className="text-xs font-sans font-semibold uppercase tracking-widest text-terracotta">
                  Resources
                </span>
                <button
                  onClick={() => setResourcesOpen(false)}
                  className="p-1.5 rounded-full hover:bg-sage-light transition-colors"
                  aria-label="Close resources menu"
                >
                  <X className="h-4 w-4 text-muted" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 px-4 pb-6">
                {resourceItems.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setResourcesOpen(false)}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border bg-ivory hover:bg-sage-light hover:border-sage/30 transition-all group tap-target"
                  >
                    <div className="flex items-center justify-center w-11 h-11 rounded-full bg-sage-light group-hover:bg-sage group-hover:text-white text-sage transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-sans font-semibold text-near-black text-center leading-tight group-hover:text-sage transition-colors">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex lg:hidden bg-card-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        aria-label="Mobile bottom navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Regular tabs */}
        {mainTabs.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 py-3 tap-target"
              aria-current={active ? "page" : undefined}
            >
              <div className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${active ? "bg-sage-light" : ""}`}>
                <Icon
                  className={`h-5 w-5 transition-colors ${active ? "text-sage" : "text-muted"}`}
                  strokeWidth={active ? 2.5 : 1.75}
                />
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 rounded-full bg-sage-light -z-10"
                  />
                )}
              </div>
              <span
                className={`text-[10px] font-sans font-semibold leading-none transition-colors ${active ? "text-sage" : "text-muted"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Resources tab — opens sheet */}
        <button
          onClick={() => setResourcesOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-1 flex-1 py-3 tap-target"
          aria-expanded={resourcesOpen}
        >
          <div
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
              resourcesOpen || isResourcesActive ? "bg-sage-light" : ""
            }`}
          >
            <BookOpen
              className={`h-5 w-5 transition-colors ${
                resourcesOpen || isResourcesActive ? "text-sage" : "text-muted"
              }`}
              strokeWidth={resourcesOpen || isResourcesActive ? 2.5 : 1.75}
            />
          </div>
          <span
            className={`text-[10px] font-sans font-semibold leading-none transition-colors ${
              resourcesOpen || isResourcesActive ? "text-sage" : "text-muted"
            }`}
          >
            Resources
          </span>
        </button>
      </nav>

      {/* Spacer so footer content isn't hidden behind the nav bar on mobile */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </>
  );
}
