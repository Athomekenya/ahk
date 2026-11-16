# TASK LIST
Last updated: 2026-07-08T09:02:26-04:00

## Phase 0 — Bootstrap
- [x] T00: Create docs/ folder and all docs files
- [x] T01: Scaffold Next.js 14 project (TypeScript, App Router, Tailwind)
- [x] T02: Install dependencies ⏸ MANUAL
- [x] T03: Configure Tailwind with design tokens
- [x] T04: Set up globals.css with CSS variables and Google Fonts (Fraunces, Public Sans)
- [x] T05: Create .env.example
- [x] T05b: Log compliance flag in ERROR_LOG.md (Kenya Data Protection Act considerations)

## Phase 1 — Database & Auth
- [x] T06: Write Prisma schema (all models)
- [x] T07: Run prisma generate ⏸ MANUAL
- [x] T08: Configure NextAuth (Google + credentials)
- [x] T09: Create auth API route + role-based middleware (CLIENT/CAREGIVER/ADMIN)

## Phase 2 — Core Layout
- [x] T10: Navbar (desktop + mobile, accessibility-first tap targets)
- [x] T11: Footer
- [x] T12: WhatsAppFloat persistent button
- [x] T13: Root layout.tsx with font loading

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
