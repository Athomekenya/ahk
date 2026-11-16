import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caregiver Jobs in Nairobi & Kenya | Apply to AtHome Kenya Care Team",
  description:
    "Looking for caregiver or nursing jobs in Nairobi? Join AtHome Kenya as a certified nurse, nurse aide, physiotherapist, or home caregiver. Competitive M-Pesa pay and flexible shifts.",
  alternates: {
    canonical: "https://www.athomekenya.com/careers",
  },
  keywords: [
    "caregiver jobs nairobi",
    "nursing jobs in kenya",
    "home based care jobs nairobi",
    "caregiver jobs kenya",
    "nurse aide jobs nairobi",
    "physiotherapy jobs nairobi",
    "how to apply for caregiver work kenya",
    "home care nurse jobs",
  ],
  openGraph: {
    title: "Caregiver & Nurse Jobs in Nairobi | Apply to AtHome Kenya",
    description:
      "Join our fast-growing team of nurses, caregivers, and physiotherapists in Kenya. Flexible shifts, fair M-Pesa pay, and meaningful work.",
    url: "https://www.athomekenya.com/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
