# SEO Optimization & Keyword Infusion Plan (Google Search Console Data)

## Overview
Based on the 28-day Google Search Console performance data, your website is gaining strong search impressions across **8 distinct, high-value search intent clusters**:
1. **Core Caregiver & Agency Searches** (`caregivers in kenya`, `caregiver agencies in kenya`, `home based care services in kenya`, `home care nairobi`)
2. **Elderly Care & "Nursing Homes in Kenya"** (`nursing homes in kenya`, `elderly homes in kenya`, `homes for the elderly in kenya`, `list of elderly homes in nairobi`, `old people homes in kenya`)
3. **Medical Equipment Rental & Hospital Bed Hire** (`hospital bed rental`, `hospital bed on rent near me`, `can i hire a hospital bed for home`, `benefits of leasing medical equipment`)
4. **Specialized Nursing & Night Nurses** (`night nurse kenya`, `night nurses near me`, `home nursing services`, `home based nursing care`)
5. **Home Physiotherapy & In-Home Rehab** (`home physiotherapy services`, `physiotherapy home service`, `home physiotherapy near me`)
6. **Brand & High-Intent Brand Variants** (`at home kenya`, `athome`, `at.home`, `at home care services`)
7. **Caregiver Recruitment & Training Searches** (`how to apply for work`, `caregiver jobs nairobi`, `online caregiver course in kenya`, `home based care jobs in nairobi`)
8. **Emergency & Ambulance Assistance** (`ambulance services`, `ambulance`)

This implementation plan infuses these search queries naturally into your site's **page metadata, structured JSON-LD schemas (Rich Snippets), page copy, and high-ranking FAQ sections**.

---

## User Review Required

> [!IMPORTANT]
> **Key Enhancements in this Plan**:
> - **Rich JSON-LD Structured Data**: Adding Google-compliant Schema.org markup (`MedicalBusiness`, `HomeHealthService`, `FAQPage`, and `JobPosting`) to unlock Google Rich Results and Knowledge Panels.
> - **Direct Capture of "Nursing Homes in Kenya" Searchers**: Optimizing elderly care content to educate families searching for nursing homes in Nairobi on the advantages, safety, and costs of private in-home care.
> - **Equipment & Careers Page Metadata**: Adding dedicated Next.js layouts with keyword-rich titles, meta descriptions, and FAQs for `/equipment` (hospital bed rental) and `/careers` (caregiver jobs in Nairobi).

---

## Proposed Changes

### Component 1: Global SEO & Schema.org Structured Data

#### [MODIFY] [app/layout.tsx](file:///c:/Users/adohj/Desktop/ahk/app/layout.tsx)
- Enrich global `metadata` with primary keyword targets: `"AtHome Kenya | #1 Home Healthcare & Caregiver Agency in Nairobi, Kenya"`.
- Inject a comprehensive `MedicalBusiness` / `HomeHealthService` JSON-LD schema with service area (`Nairobi`, `Kenya`), contact points, and offered medical services.

#### [NEW] [components/seo/JsonLd.tsx](file:///c:/Users/adohj/Desktop/ahk/components/seo/JsonLd.tsx)
- Reusable component for rendering valid JSON-LD schemas (`FAQPage`, `MedicalBusiness`, `Service`, `JobPosting`).

---

### Component 2: Core Landing Pages SEO & Copy Infusion

#### [MODIFY] [app/page.tsx](file:///c:/Users/adohj/Desktop/ahk/app/page.tsx)
- Update homepage `metadata` (Title & Meta Description) to target:
  - *Title*: `AtHome Kenya | Vetted Caregivers, Home Nursing & Elderly Care in Kenya`
  - *Description*: `Top-rated home care agency in Nairobi, Kenya. Hire vetted caregivers, licensed private nurses, home physiotherapy, night nurses, and hospital bed rentals.`
- Add homepage `FAQPage` JSON-LD schema matching common questions (`How quickly can you arrange a caregiver?`, `Can I hire a live-in caregiver in Nairobi?`, `Can I pay via M-Pesa?`).

#### [MODIFY] [components/home/ServicesGrid.tsx](file:///c:/Users/adohj/Desktop/ahk/components/home/ServicesGrid.tsx)
- Infuse search terms into service card descriptions and headings: `"Home Care Nursing"`, `"Night Nurse & Maternity Care"`, `"In-Home Physiotherapy"`, `"Hospital Bed & Equipment Leasing"`.

#### [MODIFY] [app/caregivers/page.tsx](file:///c:/Users/adohj/Desktop/ahk/app/caregivers/page.tsx)
- Update metadata to target: `Vetted Caregivers in Kenya | Certified Nurses & Home Care Aides Nairobi`.
- Enhance intro and FAQ to capture queries like `caregiver agencies in kenya`, `live-in caregiver`, `home care givers in nairobi`.

---

### Component 3: Equipment Leasing & Hospital Bed Rental Page

#### [NEW] [app/equipment/layout.tsx](file:///c:/Users/adohj/Desktop/ahk/app/equipment/layout.tsx)
- Add server-side Next.js `metadata` and OpenGraph tags:
  - *Title*: `Hospital Bed Rental & Medical Equipment Leasing in Nairobi | AtHome Kenya`
  - *Description*: `Rent or buy hospital beds, oxygen concentrators, wheelchairs, suction machines, and crutches in Nairobi. Fast home delivery and setup.`

#### [MODIFY] [app/equipment/page.tsx](file:///c:/Users/adohj/Desktop/ahk/app/equipment/page.tsx)
- Enrich headings and add an interactive FAQ section answering the exact Google queries:
  - *"Can I hire a hospital bed for home in Kenya?"*
  - *"What are the benefits of leasing medical equipment over buying?"*
  - *"How does medical equipment delivery and setup work in Nairobi?"*

---

### Component 4: Services Data & Targeted Service Pages

#### [MODIFY] [lib/data/services.ts](file:///c:/Users/adohj/Desktop/ahk/lib/data/services.ts)
- **Home Physiotherapy (`home-physiotherapy`)**: Add keywords `home physiotherapy services near me`, `in home physiotherapy Nairobi`, `stroke & orthopedic rehabilitation`.
- **Chronic Disease Management & Nursing (`chronic-disease-management`)**: Add keywords `home care nursing agencies in Kenya`, `home based medical care`, `specialized nursing care`.
- **Newborn & Postnatal Care (`newborn-postnatal-care`)**: Explicitly target `night nurse Kenya`, `night nurses near me`, `overnight newborn care`.
- **Equipment Leasing (`equipment-leasing`)**: Optimize for `hospital beds for rent`, `renting a hospital bed`, `hiring medical equipment near me`.

---

### Component 5: Careers Page (Caregiver Jobs & Recruitment)

#### [NEW] [app/careers/layout.tsx](file:///c:/Users/adohj/Desktop/ahk/app/careers/layout.tsx)
- Add metadata targeting job seekers:
  - *Title*: `Caregiver Jobs in Nairobi & Kenya | Apply to AtHome Kenya Care Team`
  - *Description*: `Looking for caregiver jobs in Nairobi? Join AtHome Kenya as a certified nurse, nurse aide, physiotherapist, or home caregiver. Competitive compensation and flexible shifts.`
- Add `JobPosting` schema for caregiver positions.

#### [MODIFY] [app/careers/page.tsx](file:///c:/Users/adohj/Desktop/ahk/app/careers/page.tsx)
- Add an applicant FAQ section addressing:
  - *"How to apply for caregiver work at AtHome Kenya?"*
  - *"What qualifications are required? (Nursing Council of Kenya, KMTC, Red Cross, St. John Ambulance certificates)"*

---

### Component 6: High-Ranking Resource Guides

#### [MODIFY] [lib/data/articles.ts](file:///c:/Users/adohj/Desktop/ahk/lib/data/articles.ts)
- Enrich existing articles with keyword anchors and add/refine the top-performing guide:
  - **Guide on Elderly Care**: *"Elderly Care in Kenya: In-Home Caregiving vs. Nursing Homes & Elderly Homes in Nairobi (Costs & Comparison)"* (Captures queries: `nursing homes in kenya`, `list of elderly homes in kenya`, `homes for the elderly in kenya`, `care homes in kenya`).

---

## Verification Plan

### Automated Tests
1. **Typecheck & Linting**:
   ```bash
   npm run lint
   ```
2. **Production Build Verification**:
   ```bash
   npx next build
   ```
   Ensures all static and dynamic pages compile with valid metadata and JSON-LD scripts without hydration mismatches.

### Manual / Tool Verification
- **Rich Results Test**: Validate JSON-LD structured data using schema validator tool.
- **Inspect Meta Tags**: Verify OpenGraph, Twitter Cards, and canonical URLs on all core routes (`/`, `/services`, `/caregivers`, `/equipment`, `/careers`).
