import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospital Bed Rental & Medical Equipment Leasing in Nairobi | AtHome Kenya",
  description:
    "Rent or buy hospital beds, oxygen concentrators, wheelchairs, suction machines, crutches, and mobility aids in Nairobi. Fast home delivery, professional setup, and flexible lease plans.",
  alternates: {
    canonical: "https://www.athomekenya.com/equipment",
  },
  keywords: [
    "hospital bed rental nairobi",
    "hospital bed hire kenya",
    "rent hospital bed kenya",
    "medical equipment leasing nairobi",
    "oxygen concentrator rental",
    "wheelchair hire nairobi",
    "hospital bed for home use kenya",
    "hiring medical equipment near me",
  ],
  openGraph: {
    title: "Hospital Bed Rental & Medical Equipment Leasing Nairobi | AtHome Kenya",
    description:
      "Need a hospital bed at home in Nairobi? AtHome Kenya rents and sells sanitized hospital beds, wheelchairs, oxygen concentrators, and more with same-day delivery.",
    url: "https://www.athomekenya.com/equipment",
  },
};

export default function EquipmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
