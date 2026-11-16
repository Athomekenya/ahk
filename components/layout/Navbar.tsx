"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
} from "lucide-react";
import AnnouncementBar from "@/components/home/AnnouncementBar";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import WhatsAppIntakeModal from "@/components/ui/WhatsAppIntakeModal";

import { servicesData } from "@/lib/data/services";

const resources = [
  { name: "Care Blog & Resources", href: "/resources" },
  { name: "Meet Our Caregivers", href: "/caregivers" },
  { name: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<"services" | "resources" | null>(null);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  
  const pathname = usePathname();

  // Scroll detection to transition background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Background style based on scroll state and current pathname (non-homepage pages should default to ivory background)
  const isHomepage = pathname === "/";
  const navbarBg = scrolled || !isHomepage 
    ? "bg-ivory border-b border-border shadow-sm text-near-black" 
    : "bg-transparent text-white";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${navbarBg}`}>
        <AnnouncementBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20 sm:h-24 md:h-28 py-1">
            
            {/* Logo — Prominent & Real Large */}
            <Link href="/" className="flex items-center gap-2 tap-target" aria-label="At.home Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/logo.svg" 
                alt="At.home Logo" 
                className={`h-16 sm:h-20 md:h-22 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-all duration-300 ${
                  !scrolled && isHomepage ? "brightness-0 invert" : ""
                }`} 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "services" ? null : "services")}
                  onMouseEnter={() => setActiveDropdown("services")}
                  className="flex items-center gap-1 font-sans font-medium text-sm hover:text-terracotta transition-colors"
                  aria-expanded={activeDropdown === "services"}
                >
                  Services <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === "services" && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-card-white border border-border rounded-card shadow-lg p-2 flex flex-col gap-1 text-near-black"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {servicesData.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="px-4 py-2 text-sm hover:bg-sage-light hover:text-sage rounded-md transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Diaspora Page */}
              <Link 
                href="/diaspora" 
                className={`font-sans font-medium text-sm hover:text-terracotta transition-colors ${
                  pathname === "/diaspora" ? "text-terracotta border-b-2 border-terracotta" : ""
                }`}
              >
                Diaspora
              </Link>

              {/* Shop & Equipment */}
              <Link 
                href="/equipment" 
                className={`font-sans font-medium text-sm hover:text-terracotta transition-colors ${
                  pathname === "/equipment" ? "text-terracotta border-b-2 border-terracotta" : ""
                }`}
              >
                Lease
              </Link>

              {/* Resources Dropdown (includes Careers) */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
                  onMouseEnter={() => setActiveDropdown("resources")}
                  className="flex items-center gap-1 font-sans font-medium text-sm hover:text-terracotta transition-colors"
                  aria-expanded={activeDropdown === "resources"}
                >
                  Resources <ChevronDown className="h-4 w-4" />
                </button>
                {activeDropdown === "resources" && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-card-white border border-border rounded-card shadow-lg p-2 flex flex-col gap-1 text-near-black"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {resources.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="px-4 py-2 text-sm hover:bg-sage-light hover:text-sage rounded-md transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Quick Contact Links */}
              <a 
                href="https://wa.me/254705320618" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:text-terracotta text-sage transition-colors tap-target" 
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a 
                href="tel:+254705320618" 
                className="p-2 hover:text-terracotta text-sage transition-colors tap-target" 
                aria-label="Call our coordinate office"
              >
                <Phone className="h-5 w-5" />
              </a>

              {/* Main Book CTA — Opens Intake Flow */}
              <button
                onClick={() => setIsIntakeOpen(true)}
                className="px-6 py-2.5 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold text-sm rounded-btn transition-colors shadow-sm tap-target flex items-center cursor-pointer"
              >
                Get a Caregiver
              </button>
            </div>

            {/* Mobile hamburger menu toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsIntakeOpen(true)}
                className="px-4 py-2 bg-terracotta hover:bg-[#b014b1] text-white font-sans font-semibold text-xs rounded-btn transition-colors tap-target flex items-center cursor-pointer"
              >
                Book Care
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 text-inherit hover:text-terracotta transition-colors tap-target"
                aria-label="Toggle Navigation Menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer Overlay */}
        {isOpen && (
          <div className="fixed inset-0 top-20 z-40 bg-sage text-white flex flex-col p-6 overflow-y-auto lg:hidden">
            <div className="flex flex-col gap-6 font-sans text-lg font-medium">
              <Link href="/" className="hover:text-sage-light py-2 border-b border-sage-light/20 tap-target">
                Home
              </Link>
              
              {/* Services List inside Mobile Drawer */}
              <div className="flex flex-col gap-2">
                <span className="text-sm uppercase tracking-wider text-sage-light/60 font-semibold">Services</span>
                <div className="grid grid-cols-1 gap-2 pl-4 border-l border-sage-light/20">
                  {servicesData.map((service) => (
                    <Link 
                      key={service.slug} 
                      href={`/services/${service.slug}`} 
                      className="hover:text-sage-light text-base py-1 tap-target"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Diaspora Link */}
              <Link href="/diaspora" className="hover:text-sage-light py-2 border-b border-sage-light/20 tap-target">
                Diaspora Care
              </Link>

              {/* Shop & Equipment */}
              <Link href="/equipment" className="hover:text-sage-light py-2 border-b border-sage-light/20 tap-target">
                Lease Equipment
              </Link>

              {/* Resources (including Careers) */}
              <div className="flex flex-col gap-2">
                <span className="text-sm uppercase tracking-wider text-sage-light/60 font-semibold">Resources</span>
                <div className="grid grid-cols-1 gap-2 pl-4 border-l border-sage-light/20">
                  {resources.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className="hover:text-sage-light text-base py-1 tap-target"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Phone + WhatsApp Support */}
              <div className="flex items-center justify-around mt-4 py-4 border-t border-sage-light/20">
                <a 
                  href="https://wa.me/254705320618" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 hover:text-sage-light tap-target"
                >
                  <WhatsAppIcon className="h-6 w-6" /> WhatsApp
                </a>
                <a 
                  href="tel:+254705320618" 
                  className="flex items-center gap-2 hover:text-sage-light tap-target"
                >
                  <Phone className="h-6 w-6" /> Call Support
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Structured WhatsApp Intake Modal */}
      <WhatsAppIntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
      />
    </>
  );
}
