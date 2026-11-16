# MASTER PROMPT — AT HOME KENYA WEBSITE REDESIGN
**Version:** 1.0
**Project:** At Home Kenya — Premium Home-Based Healthcare & Caregiving Platform
**Model:** Orchestrator–Actor–Gatekeeper (OAG)
**Date:** 2026-07-08

---

## RESEARCH BASIS (read before building)

This prompt was written after benchmarking:
- **athomekenya.com** (current site) — Hostinger-built, functional but generic; strong WhatsApp habit already ("Physio Sessions at KSH 2200" promo bar, wa.me pre-filled links everywhere); services already defined (chronic disease management, palliative care, home physiotherapy, wound care, newborn/post-natal care, telemedicine, nutrition consultation, equipment leasing); stats to preserve: 400+ families supported, 800+ home visits, 100+ verified caregivers.
- **Local competitors**: Harmony Home Care (harmonyhomecare.co.ke) is the most advanced — diaspora targeting (UK/US/Gulf families arranging care remotely), M-Pesa + card/bank booking, WhatsApp updates after every visit, family portal, 2-hour match guarantee. HomeCare360, BenaCare, Sahara, Nikko, Serenity are less differentiated — mostly static brochure sites with phone-call CTAs, no online booking.
- **International award-winning healthcare UX**: Mayo Clinic (search-first content architecture), Maven Clinic (calming green psychology, brand-true photography over stock), Hims & Hers (consumer-brand warmth over clinical sterility), San Francisco Health Service System (FAQ-led anxiety reduction).

**Strategic gap identified:** No Kenyan home-care agency combines (a) real online booking with M-Pesa + diaspora payment options, (b) visible caregiver vetting/trust signals, and (c) design quality that doesn't look like a template. This is At Home Kenya's opening.

---

## BOOTSTRAP INSTRUCTION (Run First — No Exceptions)

Before any code is written, create the following in the project root:

```
docs/
  MASTER_PROMPT.md     ← copy of this file
  TASK_LIST.md         ← generated task checklist (see Task List section below)
  ERROR_LOG.md         ← error tracker, starts empty with headers
```

Load `TASK_LIST.md` and track every action against it. Do not proceed to any task without checking off the prior one.

---

## AMBIGUITY RESOLUTION RULE

> **Pick the most professional option that maximizes trust, clarity, and production-readiness. Do not ask. Document the choice in `docs/ERROR_LOG.md` under "Decisions" with a one-line justification.**

Healthcare-specific override: when a choice affects patient data handling, payment security, or accessibility, always choose the more conservative/compliant option even if it costs polish.

---

## COMMAND EXECUTION RULES

### ✅ Execute autonomously:
- Folder/file creation, scaffolding, writing/editing source files
- Boilerplate, types, constants, utils, config

### 🛑 STOP and ask user to run manually:
- `npm install` / `yarn install` / `pnpm install`
- `npm run dev` / `npm run build` / `npm run start`
- `npx prisma migrate` / `npx prisma generate` / `npx prisma db push`
- Any database seed/reset command
- Any deployment command (`vercel`, `railway`, `docker`)
- M-Pesa Daraja sandbox↔production credential swap

**When stopping**, output:
```
⏸ MANUAL STEP REQUIRED
Command: <exact command>
Directory: <where to run it>
Then confirm: "done" to continue.
```

---

## OAG ROLES — ALWAYS ACTIVE

### ORCHESTRATOR
Restate each task in engineering terms, list constraints/assumptions/invariants, produce a sub-step plan, define acceptance criteria before handoff.

### ACTOR
Implement strictly per the plan. No new requirements or assumptions. Deterministic, scoped output only.

### GATEKEEPER
After each task, verify: correctness, edge cases, security (especially patient data + payment handling), accessibility, mobile responsiveness, TypeScript errors, broken imports. Reject and log failures to `ERROR_LOG.md`. Mark task `✅ DONE` only on pass. **No output is final without sign-off.**

---

## PROJECT SPECIFICATION

### Brand Identity
- **Brand Voice:** "Compassionate expertise, right at your door." Warm, plain-spoken, never clinical-cold, never saccharine.
- **Design Philosophy:** A trust instrument first, a booking funnel second. Every screen should reduce a worried family member's anxiety within 3 seconds.
- **Reference aesthetic:** Maven Clinic's calm + Mayo Clinic's credibility + Nairobi warmth (real Kenyan homes and faces, not generic stock).
- **Target market:** (1) Nairobi families arranging care for an aging or recovering relative; (2) Kenyan diaspora (UK/US/Gulf) arranging and paying for care remotely; (3) hospitals/institutions referring discharged patients.

---

## DESIGN SYSTEM (Non-Negotiable — Implement Exactly)

### Color Palette
Deliberately avoids generic clinical blue-and-white. Sage signals healing/calm (backed by color-psychology research cited by Maven Clinic); terracotta signals warmth and local identity without tipping into "luxury brand" territory that would feel inappropriate for a care service.

```
--color-ivory:        #FAF7F2   /* page background — warm, not sterile white */
--color-sage:          #3F5B4E   /* primary — trust, calm, healing; buttons, nav active states */
--color-sage-light:    #E8EEE9   /* section backgrounds, tags */
--color-terracotta:    #C1694F   /* secondary accent — CTAs, warmth, human touches */
--color-near-black:    #22221E   /* primary text */
--color-card-white:    #FFFFFF   /* card backgrounds */
--color-border:        #E5DFD3
--color-muted:         #6B6660   /* secondary text, labels */
--color-gold:          #C9A227   /* trust badges only — "verified", "registered nurse" */
--color-success:       #2F7A4F   /* booking confirmations */
```

### Typography
```css
/* Display — warm editorial, not fashion-luxury */
font-family: 'Fraunces', 'Lora', Georgia, serif;
/* weights: 400, 500, 600 */

/* Body — accessible, high legibility for all ages */
font-family: 'Public Sans', 'Inter', -apple-system, sans-serif;
/* weights: 400, 500, 600, 700 */

/* Type scale — base bumped up from typical 16px for accessibility (older users, low vision) */
--text-hero:   clamp(2.5rem, 6vw, 4.5rem);
--text-h1:     clamp(1.875rem, 4vw, 3rem);
--text-h2:     clamp(1.5rem, 3vw, 2.125rem);
--text-h3:     1.375rem;
--text-body:   1.0625rem;  /* 17px base, not 16px */
--text-small:  0.9375rem;
--text-label:  0.8125rem; /* uppercase, letter-spacing: 0.08em */
```

### Accessibility (elevated priority for this audience)
- WCAG 2.2 AA minimum across the entire site, not just forms.
- Minimum tap target 48×48px (elderly/low-mobility users).
- Never rely on color alone for status (booking states, form errors) — pair with icon + text.
- `prefers-reduced-motion` respected everywhere, not just decorative sections.
- All phone/WhatsApp CTAs remain reachable without JavaScript (real `tel:` and `wa.me` links, not JS-only handlers).

### Motion
- Calm, deliberate: `ease-out`, 350–550ms. No aggressive parallax, no autoplaying video with sound.
- Scroll fade-ins: opacity 0→1, 16px upward translate (subtler than a fashion site — this is not for spectacle).
- Card hover: shadow lift only, no aggressive scale — avoid anything that feels like a sales gimmick.
- Framer Motion for all animation.

### Spacing (8pt grid)
```
--space-xs: 8px   --space-sm: 16px   --space-md: 24px
--space-lg: 40px  --space-xl: 64px   --space-2xl: 96px
```

### Border Radius
- Cards: `12px` (soft, human — opposite of the fashion brief's sharp 4px; this is a care brand, not a luxury goods brand)
- Buttons: `8px`
- Images: `12px`, never full-bleed hard edges on portrait/patient-adjacent photography

---

## TECH STACK

### Frontend
- **Framework:** Next.js 14 (App Router), TypeScript strict mode
- **Styling:** Tailwind CSS v3, custom tokens mapped to CSS variables above
- **Animation:** Framer Motion
- **Images:** Next.js `<Image>` + Cloudinary

### Backend
- **Runtime:** Next.js API Routes / Route Handlers
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** NextAuth.js (email + Google OAuth) — separate roles for CLIENT, CAREGIVER, ADMIN
- **File uploads:** Cloudinary SDK (caregiver credentials, ID docs — see compliance note below)

### Booking & Payments
- **Local payments:** M-Pesa Daraja API (STK Push) — primary, shown first for KE-based users
- **Diaspora payments:** Stripe (card) + bank transfer instructions — shown first when user selects "Booking from abroad"
- **Booking state:** Custom flow via Prisma (see schema) — not a shopping cart; a request-and-match funnel

### Communications
- **WhatsApp:** wa.me deep links with pre-filled context-specific messages on every service page, plus a persistent floating WhatsApp button (matches proven current-site behavior — do not remove this pattern, only polish it)
- **Email:** Resend — booking confirmation, caregiver match notification, visit reminders
- **SMS (Kenya-critical):** Africa's Talking API for booking confirmations to users without smartphones/data — this is a meaningful accessibility/inclusion gap the diaspora-focused competitor does not obviously address for lower-income local segments

### Analytics & Marketing
- Meta Pixel via `next/script` (lazyOnload)
- GA4 via `@next/third-parties`
- Server-side conversion tracking for WhatsApp click-throughs (these are currently invisible conversions)

### Compliance note (flag, do not silently decide)
This site will collect health-adjacent personal data (patient conditions, care notes). Orchestrator must flag data-retention, consent-capture, and Kenya Data Protection Act 2019 considerations explicitly in `ERROR_LOG.md` before Phase 1 database work begins — this is not a task to auto-resolve under the Ambiguity Resolution Rule.

### Deployment Target
- Frontend + API: Vercel
- Database: Railway PostgreSQL or Supabase

---

## SITE ARCHITECTURE

```
/                              → Homepage
/about                         → Brand story, mission, care philosophy
/services                      → Services overview
/services/[slug]               → Individual service detail
  chronic-disease-management
  palliative-care
  home-physiotherapy
  wound-care
  newborn-postnatal-care
  telemedicine
  nutrition-consultation
  equipment-leasing
/get-a-caregiver               → Multi-step booking/intake funnel
/diaspora                      → Dedicated page for families arranging care remotely
/caregivers                    → Meet the caregivers (trust/vetting showcase)
/equipment                     → Equipment leasing catalog
/pricing                       → Transparent indicative pricing (competitor gap — most local sites hide pricing entirely)
/resources                     → Blog index
/resources/[slug]              → Blog post
/faq                           → FAQ
/join-our-team                 → Careers / caregiver recruitment
/contact                       → Contact + WhatsApp + office location
/account                       → Client dashboard (bookings, visit history, invoices)
/account/bookings/[id]         → Booking/visit detail
/caregiver-portal              → Caregiver-facing schedule + visit logging (internal tool)
/admin                         → Admin dashboard
```

---

## HOMEPAGE SECTION ORDER

Build in this exact sequence:

1. **Announcement bar** — rotating promo/urgent info (preserves current site's "Physio Sessions at KSH 2200" pattern), dismissible
2. **Hero** — full-viewport, real (not stock) photography of a caregiver with a client in a Kenyan home; warm serif headline; dual CTA: primary "Get a Caregiver," secondary WhatsApp
3. **Trust ticker** — scrolling marquee: "400+ Families Supported · 800+ Home Visits Completed · 100+ Verified Caregivers · Registered with the Nursing Council of Kenya ·"
4. **How It Works** — 4 steps: Tell us your needs → We match a vetted caregiver within hours → Confirm & pay (M-Pesa or card) → Care begins at home
5. **Services Grid** — 8 cards, one per service, icon + name + one-line description + "Learn more"
6. **Diaspora Strip** — full-bleed sage section: "Arranging care for a loved one from abroad?" + bullet trust points (WhatsApp visit updates, remote payment, family portal) + CTA to `/diaspora`
7. **Meet Our Caregivers** — 3–4 real caregiver profile cards: photo, name, credential badge, years of experience, specialty — this directly answers the #1 anxiety objection ("who is coming into my parent's home?")
8. **Success in Numbers** — restated stats with icons, positioned as social proof not just decoration
9. **Testimonials** — 3 cards, star ratings, real names + relationship ("Daughter, caring for her mother in Kilimani")
10. **From the Blog** — 3 latest resource articles (positions At Home Kenya as an authority, per Mayo Clinic pattern)
11. **FAQ Preview** — top 5 questions, accordion, link to full `/faq`
12. **WhatsApp Concierge Strip** — "Not sure where to start? Chat with a care coordinator" → wa.me link
13. **Newsletter / Care Tips Signup** — minimal, sage-light background
14. **Footer** — nav, services, social, office location (Madonna House, Westlands Road), M-Pesa + trust badges, copyright

---

## NAVIGATION

```
[Logo]     About · Services ▾ · Get a Caregiver (button) · Diaspora · Resources ▾     [WhatsApp icon] [Call] [Account]
```

- Desktop: fixed top, transparent over hero → ivory background on scroll (300ms transition)
- Mobile: hamburger → full-screen overlay, sage background, generously sized tap targets (accessibility priority over density)
- "Get a Caregiver" is always styled as the primary CTA button, never a plain nav link — it is the site's single most important action

---

## SERVICE CARD SPEC

```
- Icon (custom line icon, not emoji, not generic medical clipart)
- Service name (Public Sans, 16px, semibold)
- One-line description (14px, muted)
- "From KSh X" indicative price tag if available (transparency differentiator)
- "Learn more →" link, full card clickable
- No stock-photo icons — commission or use a consistent custom icon set
```

---

## SERVICE DETAIL PAGE SPEC

```
Hero: service name (h1, serif), short description, primary CTA "Book this service"
What's included (bulleted, plain language, no jargon)
Who it's for (helps self-selection — reduces wrong-fit bookings)
How it works (mini version of homepage 4-step, service-specific)
Caregiver qualifications relevant to this service (credential transparency)
Pricing indication + "Get exact quote" CTA
FAQ specific to this service (3–5 questions)
Related services ("You may also need…")
WhatsApp CTA: "Questions about [service]? Chat with a coordinator →"
```

---

## GET A CAREGIVER — BOOKING FUNNEL

Multi-step, not a cart. Steps:

**Step 1 — Who needs care**
- Relationship to patient, patient age range, general condition/reason for care (chronic illness / recovery / elderly support / newborn / palliative / other)

**Step 2 — Care details**
- Service type(s) needed, frequency (one-time / daily / weekly / live-in), preferred start date, location (county → town)

**Step 3 — Booking context**
- "I'm booking from Kenya" vs "I'm booking from abroad" — branches payment method shown next (M-Pesa first vs Stripe/bank-transfer first)

**Step 4 — Contact & confirm**
- Name, phone, email, WhatsApp opt-in for visit updates
- Summary + consent notice (data use, per compliance note above)
- Submit → creates `BookingRequest`, triggers coordinator notification, shows "We'll match you within 2 hours" confirmation (matching the credible local benchmark)

**Step 5 — Payment (if deposit required for the service)**
- M-Pesa STK Push (primary for local) or Stripe/bank transfer (primary for diaspora)
- Order/booking summary sidebar throughout

**Confirmation**
- Booking reference, matched caregiver summary once assigned, "Track on WhatsApp" CTA

---

## DIASPORA PAGE SPEC

This is the site's key competitive differentiator opportunity — build it with real depth, not a token section:

```
Hero: speaks directly to "arranging care for a parent back home"
Trust pillars: WhatsApp update after every visit, family portal with care notes,
  accepted payment methods (card, international bank transfer, M-Pesa via family member)
Time-zone-aware contact: show coordinator availability across common diaspora time zones
  (UK, US East/West, Gulf states)
Testimonials specifically from diaspora clients
FAQ specific to remote arrangement (how do I verify care is happening, what if something
  goes wrong, how do I pay from abroad)
CTA: "Book a call" (calendar embed) as alternative to self-serve funnel — remote decision-makers
  often want a human conversation before committing
```

---

## FOLDER STRUCTURE

```
/
├── docs/
│   ├── MASTER_PROMPT.md
│   ├── TASK_LIST.md
│   └── ERROR_LOG.md
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  ← Homepage
│   │   ├── about/
│   │   ├── services/[slug]/
│   │   ├── diaspora/
│   │   ├── caregivers/
│   │   ├── equipment/
│   │   ├── pricing/
│   │   ├── resources/[slug]/
│   │   ├── faq/
│   │   └── join-our-team/
│   ├── get-a-caregiver/              ← booking funnel
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── account/
│   ├── caregiver-portal/
│   ├── admin/
│   └── api/
│       ├── auth/
│       ├── bookings/
│       ├── caregivers/
│       ├── mpesa/
│       ├── stripe/
│       ├── sms/
│       └── webhooks/
├── components/
│   ├── ui/                           ← Button, Badge, Input, Modal, Accordion
│   ├── layout/                       ← Navbar, Footer, WhatsAppFloat
│   ├── home/                         ← Hero, TrustTicker, HowItWorks, ServicesGrid, etc.
│   ├── booking/                      ← BookingSteps, MpesaForm, StripeForm, BookingSummary
│   ├── caregiver/                    ← CaregiverCard, CredentialBadge
│   └── admin/                        ← AdminSidebar, BookingTable, CaregiverForm
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── cloudinary.ts
│   ├── mpesa.ts
│   ├── stripe.ts
│   ├── resend.ts
│   └── africastalking.ts
├── store/
│   └── booking.ts                    ← Zustand booking-funnel state
├── types/
│   └── index.ts
├── prisma/
│   └── schema.prisma
├── public/
│   └── fonts/
└── styles/
    └── globals.css
```

---

## DATABASE SCHEMA (Prisma)

- `User` (id, email, name, phone, role: CLIENT|CAREGIVER|ADMIN, country, isDiaspora, createdAt)
- `Patient` (id, userId, name, dob, relationship, conditionNotes, county, town, address)
- `Caregiver` (id, name, bio, photoUrl, qualifications[], specialties[], yearsExperience, nursingCouncilRegNo, verified, ratingAvg)
- `ServiceCategory` (id, name, slug, description, iconKey, indicativePriceFrom)
- `BookingRequest` (id, userId, patientId, serviceCategoryId, frequency, startDate, county, town, isDiaspora, status: PENDING|MATCHED|CONFIRMED|IN_PROGRESS|COMPLETED|CANCELLED, notes, mpesaRef, stripePaymentId, createdAt)
- `CareVisit` (id, bookingId, caregiverId, scheduledAt, completedAt, careNote, status: SCHEDULED|COMPLETED|MISSED)
- `Testimonial` (id, name, relationship, rating, body, avatarUrl, isDiaspora, featured)
- `BlogPost` (id, title, slug, excerpt, body, coverImage, author, category, publishedAt)
- `FAQ` (id, question, answer, category, order)
- `JobApplication` (id, name, email, phone, roleAppliedFor, cvUrl, coverNote, status)
- `EquipmentItem` (id, name, category, dailyRate, weeklyRate, imageUrl, available)
- `EquipmentLeaseRequest` (id, userId, equipmentId, startDate, endDate, deliveryAddress, status)
- `NewsletterSubscriber` (id, email, subscribedAt)

---

## ENVIRONMENT VARIABLES TEMPLATE

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# M-Pesa Daraja
MPESA_CONSUMER_KEY=
MPESA_CONSUMER_SECRET=
MPESA_SHORTCODE=
MPESA_PASSKEY=
MPESA_CALLBACK_URL=
MPESA_ENV=sandbox

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=

# Africa's Talking (SMS)
AT_API_KEY=
AT_USERNAME=

# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=254705320618
```

---

## DOCS FILE TEMPLATES

### `docs/TASK_LIST.md` — Generate with this structure:

```markdown
# TASK LIST
Last updated: [timestamp]

## Phase 0 — Bootstrap
- [ ] T00: Create docs/ folder and all docs files
- [ ] T01: Scaffold Next.js 14 project (TypeScript, App Router, Tailwind)
- [ ] T02: Install dependencies ⏸ MANUAL
- [ ] T03: Configure Tailwind with design tokens
- [ ] T04: Set up globals.css with CSS variables and Google Fonts (Fraunces, Public Sans)
- [ ] T05: Create .env.example
- [ ] T05b: Log compliance flag in ERROR_LOG.md (Kenya Data Protection Act considerations)

## Phase 1 — Database & Auth
- [ ] T06: Write Prisma schema (all models)
- [ ] T07: Run prisma generate ⏸ MANUAL
- [ ] T08: Configure NextAuth (Google + credentials)
- [ ] T09: Create auth API route + role-based middleware (CLIENT/CAREGIVER/ADMIN)

## Phase 2 — Core Layout
- [ ] T10: Navbar (desktop + mobile, accessibility-first tap targets)
- [ ] T11: Footer
- [ ] T12: WhatsAppFloat persistent button
- [ ] T13: Root layout.tsx with font loading

## Phase 3 — Homepage Sections
- [ ] T14: Announcement bar
- [ ] T15: Hero
- [ ] T16: Trust ticker marquee
- [ ] T17: How It Works (4 steps)
- [ ] T18: Services Grid
- [ ] T19: Diaspora strip
- [ ] T20: Meet Our Caregivers section
- [ ] T21: Success in Numbers
- [ ] T22: Testimonials
- [ ] T23: From the Blog preview
- [ ] T24: FAQ preview accordion
- [ ] T25: WhatsApp concierge strip
- [ ] T26: Newsletter signup
- [ ] T27: Assemble homepage page.tsx

## Phase 4 — Services & Content
- [ ] T28: ServiceCard component
- [ ] T29: Service detail page template [slug] (all 8 services)
- [ ] T30: About page
- [ ] T31: Caregivers listing page + CaregiverCard
- [ ] T32: Pricing page
- [ ] T33: Blog index + post template
- [ ] T34: FAQ full page
- [ ] T35: Join Our Team page + application form

## Phase 5 — Diaspora Page
- [ ] T36: Diaspora hero + trust pillars
- [ ] T37: Time-zone-aware contact section
- [ ] T38: Diaspora testimonials
- [ ] T39: "Book a call" calendar embed

## Phase 6 — Booking Funnel
- [ ] T40: BookingSteps component (5-step flow)
- [ ] T41: Step 1 — Who needs care
- [ ] T42: Step 2 — Care details
- [ ] T43: Step 3 — Booking context (local vs diaspora branch)
- [ ] T44: Step 4 — Contact & confirm
- [ ] T45: Step 5 — M-Pesa STK Push integration
- [ ] T46: Step 5 — Stripe + bank transfer integration
- [ ] T47: M-Pesa callback API route
- [ ] T48: Stripe webhook route
- [ ] T49: Booking confirmation page + SMS/email/WhatsApp triggers

## Phase 7 — Account & Caregiver Portal
- [ ] T50: Login/Register pages
- [ ] T51: Client account dashboard (bookings, invoices)
- [ ] T52: Booking detail page
- [ ] T53: Caregiver portal (schedule, visit logging)

## Phase 8 — Admin
- [ ] T54: Admin layout + sidebar
- [ ] T55: Admin dashboard (today's bookings, revenue, caregiver utilization)
- [ ] T56: Booking list + status management + caregiver matching
- [ ] T57: Caregiver CRUD (with credential upload)
- [ ] T58: Equipment leasing management
- [ ] T59: Blog/FAQ content management

## Phase 9 — Integration & Polish
- [ ] T60: Cloudinary upload utility
- [ ] T61: Resend email templates (booking confirmation, match notification, visit reminder)
- [ ] T62: Africa's Talking SMS integration
- [ ] T63: Meta Pixel + GA4 + WhatsApp click conversion tracking
- [ ] T64: SEO — metadata, OG images, sitemap, local KE schema markup
- [ ] T65: Mobile responsiveness audit (all pages)
- [ ] T66: Framer Motion animations (all sections)
- [ ] T67: Loading skeletons
- [ ] T68: Error boundaries and 404/500 pages
- [ ] T69: Accessibility audit — WCAG 2.2 AA, tap targets, screen reader pass
- [ ] T70: Performance audit
- [ ] T71: Final Gatekeeper review — full system check
```

### `docs/ERROR_LOG.md` — Generate with this structure:

```markdown
# ERROR LOG & DECISION RECORD

## Errors

| # | Task | Error | Resolution | Status |
|---|------|-------|------------|--------|
|   |      |       |            |        |

## Decisions (Ambiguity Resolutions)

| # | Task | Ambiguity | Decision Made | Justification |
|---|------|-----------|---------------|---------------|

## Compliance Flags (require human sign-off, not auto-resolved)

| # | Task | Issue | Status |
|---|------|-------|--------|
| 1 | T05b | Patient condition notes + care logs are sensitive personal data under Kenya Data Protection Act 2019 — need explicit consent capture flow and retention policy before Phase 1 DB build | OPEN |
```

---

## EXECUTION INSTRUCTIONS

1. Start by creating `docs/` and all three docs files.
2. Load `TASK_LIST.md`. Every subsequent action must reference a task ID (e.g., `[T14]`).
3. Complete tasks in phase order. Do not skip ahead.
4. For each task: Orchestrator states task + acceptance criteria → Actor implements → Gatekeeper verifies, logs pass/fail, marks done only on pass.
5. For any `⏸ MANUAL` task: stop, output the manual step block, wait for "done."
6. For the compliance flag (T05b): stop and surface it explicitly to the user before proceeding to Phase 1 — this is the one exception to "never ask between tasks," because it is a legal/consent question, not a design/implementation ambiguity.
7. Never ask "should I continue?" for design or implementation choices — consult the task list and proceed.
8. On completion of all 71 tasks, run a final Gatekeeper full-system review and output a summary to `docs/ERROR_LOG.md`.

---

*End of Master Prompt — v1.0*.
