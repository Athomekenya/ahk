# ERROR LOG & DECISION RECORD

## Errors

| # | Task | Error | Resolution | Status |
|---|------|-------|------------|--------|
| 1 | T13/T15 | `next/font/google` ETIMEDOUT — build env has no outbound internet to fonts.googleapis.com | Switch to `@fontsource/fraunces`, `@fontsource/public-sans`, `@fontsource/inter` npm packages (bundled locally); import in globals.css; manually set CSS variables | RESOLVED |

## Decisions (Ambiguity Resolutions)

| # | Task | Ambiguity | Decision Made | Justification |
|---|------|-----------|---------------|---------------|
| 1 | T13 | Font delivery method when network is unavailable | Use `@fontsource/*` npm packages instead of `next/font/google` | Eliminates build-time network dependency; fonts are self-hosted via node_modules; more performant and GDPR-friendly |

## Compliance Flags (require human sign-off, not auto-resolved)

| # | Task | Issue | Status |
|---|------|-------|--------|
| 1 | T05b | Patient condition notes + care logs are sensitive personal data under Kenya Data Protection Act 2019 — need explicit consent capture flow and retention policy before Phase 1 DB build | APPROVED |
