import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
// Fonts self-hosted via @fontsource — no outbound network request at build time
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import SessionProvider from "@/components/providers/SessionProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.athomekenya.com"),
  title: {
    default: "AtHome Kenya | #1 Home Healthcare & Caregiver Agency in Nairobi",
    template: "%s | AtHome Kenya",
  },
  description:
    "Top-rated home care and caregiver agency in Nairobi, Kenya. Hire vetted caregivers, licensed private nurses, elderly home care, in-home physiotherapy, night nurses, and hospital bed rentals.",
  keywords: [
    "at home kenya",
    "caregivers in kenya",
    "home care services",
    "home based care services in kenya",
    "home nursing services",
    "night nurse kenya",
    "nursing homes in kenya",
    "elderly homes in kenya",
    "home physiotherapy services",
    "hospital bed rental near me",
    "caregiver agencies in kenya",
    "live-in caregiver nairobi",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.athomekenya.com",
    siteName: "AtHome Kenya",
    title: "AtHome Kenya | Vetted Caregivers & Home Nursing Services in Nairobi",
    description:
      "Compassionate, professional home healthcare, elderly care, and physiotherapy in Kenya. Matched within 12–24 hours.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AtHome Kenya | Home Healthcare & Caregiver Agency",
    description:
      "Vetted caregivers, licensed nurses, elderly care, and hospital bed rentals delivered to your home in Nairobi, Kenya.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "HomeHealthService"],
  name: "AtHome Kenya",
  alternateName: ["At.home", "At Home Kenya", "At-Home Healthcare Kenya"],
  url: "https://www.athomekenya.com",
  logo: "https://www.athomekenya.com/logo.svg",
  image: "https://www.athomekenya.com/images/hero-bg.jpg",
  description:
    "Leading home care and caregiver agency in Nairobi, Kenya. We provide vetted caregivers, private nurses, elderly care, home physiotherapy, night nurses, and hospital bed rentals.",
  telephone: "+254705320618",
  email: "info@athomekenya.com",
  priceRange: "KES",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-1.2921",
    longitude: "36.8219",
  },
  areaServed: [
    { "@type": "City", "name": "Nairobi" },
    { "@type": "Country", "name": "Kenya" },
  ],
  medicalSpecialty: [
    "Physiotherapy",
    "Nursing",
    "PalliativeCare",
    "GeriatricCare",
    "WoundCare",
  ],
  availableService: [
    { "@type": "MedicalService", name: "Home Caregiver Services" },
    { "@type": "MedicalService", name: "Home Nursing & Night Nurse Care" },
    { "@type": "MedicalService", name: "Elderly Care at Home" },
    { "@type": "MedicalService", name: "In-Home Physiotherapy & Rehabilitation" },
    { "@type": "MedicalService", name: "Medical Equipment & Hospital Bed Rental" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-ivory text-near-black">
        <JsonLd data={organizationSchema} />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9JSBS0QGN1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9JSBS0QGN1');
          `}
        </Script>
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppFloat />
        </SessionProvider>
      </body>
    </html>
  );
}
