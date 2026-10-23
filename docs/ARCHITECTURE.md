# EBM website: architecture and plan

Status: phase 2 started (21 Oct 2026). Home page built against static typed content; the other
14 main pages are placeholders. Nothing here is connected to Eduka, Supabase, Resend,
Trigger.dev or Turnstile yet: those integrations are **not built** and must not be presented
as working.

Requirements sources, in order of authority:
1. `docs/BRIEF.md`: Ayoub's technical brief (stack, rules, sequence).
2. Blueprint v1.1 (`EBM_Website_Blueprint_v1.1.pdf`): pages, blocks, journeys, booking rules,
   design system. Items marked "APPROVED BY EBM" are approved; booking capacities, windows,
   48-hour holds and no-show rules are **proposals**; the admissions journey is **under EBM review**.
3. EBM's site map `Arborescence_Website_EBM.xlsx`: 6 universes, mega-menus, two priority
   actions (Visiter / Candidater), footer links (Eduka, Calendrier, Recrutement, legal).
4. The approved visual design: the Claude Design canvas "EBM Home Page", version 2 board
   (https://claude.ai/artifact/C1mREFzdLin7dvo67cNpv5), Playfair Display + Avenir Next only.

## 1. Understanding

A premium, mobile-first, French-language website for two campuses (Casablanca, Rabat) whose
job is to turn prospective families into visits and applications, while giving EBM staff an
editor they can run without developers. Admissions records stay in Eduka; the website owns
public content, visit booking (unless Eduka can), and reliable hand-off of applications to Eduka.

## 2. Architecture

One Next.js application, one domain, one Vercel deployment.

| Layer | Choice | Why |
|---|---|---|
| Web + server | Next.js 16.4.2 (App Router, TypeScript, React 19) | Static pre-render of public pages, server actions/route handlers for forms, one deploy. |
| CMS | Payload 3.91.0 inside the same app (`/admin`) | Code-defined content model, blocks, drafts, versions, scheduled publish, access control; no second backend. |
| Database | Supabase PostgreSQL via `@payloadcms/db-postgres` | Payload's own adapter (Drizzle inside Payload): no extra ORM. |
| Files | Supabase Storage via its S3-compatible API (`@payloadcms/storage-s3`) | Public bucket for media/PDFs, private bucket + signed URLs for family documents. |
| UI | Tailwind CSS 4 + shadcn/ui (Radix primitives only where needed) | Accessible menus/dialogs without a heavy UI kit. |
| Forms | React Hook Form + Zod | Shared schemas client/server. |
| Jobs | Trigger.dev | Eduka delivery retries, reminders, draft expiry. |
| Email | Resend + React Email | Verified EBM domain. |
| Abuse | Cloudflare Turnstile + server-side rate limiting | Forms and booking. |
| Maps | Illustrated SVG per campus, component replaceable by Mappedin | Public areas only. |

Compatibility verified on 21 Oct 2026: `@payloadcms/next@3.91.0` peer-requires
`next >=16.3.3 <17` (and React 19); Node 24 is installed (Payload needs ≥20.18.1).

Rendering: public pages are static (SSG) and revalidated on publish (Payload `afterChange`
hook → `revalidatePath`/`revalidateTag`). Booking availability is fetched fresh (no cache).
Private data never renders into cached pages.

## 3. Website vs Eduka

| Concern | Owner |
|---|---|
| Public pages, media, events, FAQ, fees, PDFs, alumni | Website (Payload) |
| Visit booking | Eduka if it supports slots, capacity, approval, reminders; otherwise website module (Postgres + Payload) |
| Application form UI + temporary drafts | Website (only if Eduka's write API is verified); else Eduka's hosted form (current link: `https://ecolebelge.eduka.school/registration/web/13/a1213c361ab0`) |
| Applications, decisions, enrolment, billing, dossier follow-up | Eduka |
| Delivery records (needs-delivery, reference, retries) | Website (Postgres) + Trigger.dev |

## 4. Content model (Payload)

Collections: `users` (roles: project lead, communication, general management, admissions-limited),
`media`, `documents` (public PDFs), `pages` (layout blocks), `campuses`, `events`,
`faqs` (+ categories), `fees` (school year × campus × level), `alumni`, `classes`
(promotions), `visit-slots` / `bookings` (only if not in Eduka), `application-drafts`
(admin-only, never editor-readable), `delivery-records` (admin-only).
Globals: `navigation`, `footer`, `site-settings` (contacts, socials, Eduka URLs, alert banner),
`notification-templates`.
Blocks: hero, intro, text+image, cards, gallery, video, quote, statistics, tabs, FAQ,
fee table, event list, campus map, call to action, Instagram.

The home page currently reads `src/content/` (typed data shaped like these blocks) so it can
switch to Payload queries without layout changes.

## 5. Folder structure

```
src/
  app/
    (frontend)/            public site: layout, home, placeholder pages, legal, search, 404
    (payload)/             Payload admin + API (generated)
  components/
    site/                  header, footer, CTA band, page hero, placeholders
    home/                  home sections
    ui/                    shadcn primitives + small design-system parts
  content/                 typed static content (navigation, site, home, pages)
  collections/ globals/    Payload config
  lib/                     utils, metadata, routes
  fonts/                   Avenir Next woff2 (licence to verify)
public/images, public/brand   optimised photos, logos, pictograms
docs/                      brief, architecture, home spec, design system
```

## 6. Unresolved external requirements (blockers for later phases)

- Eduka: API documentation, auth method, test environment, technical contact, supported
  operations (parents, children, applications, prospects, documents), required fields and
  campus/level IDs, upload limits, duplicate handling, webhooks, booking + notification features.
- Supabase project (region validated by EBM with CNDP / law 09-08), service keys, buckets.
- Resend domain verification on EBM's domain; WhatsApp Business number and templates; SMS provider.
- Avenir Next **web licence** (fonts are self-hosted from EBM's files for now).
- Instagram account access for the feed (home shows a static preview linking to the account).
- Final figures: Rabat pupils is 1 045 on its campus page vs 1 050 on the current home page.
- Visits policy: the current FAQ says visits are only for families who have applied and there
  are no public open days; the blueprint plans open days and online booking. EBM must decide.
- Mappedin vs illustrated map.

## 7. Phased plan

1. Eduka proof of concept + decide booking ownership (needs Eduka access).
2. Next.js + Payload + Supabase + storage + page blocks. **← home page + placeholders done here; DB not yet connected.**
3. Admissions content and booking.
4. Verified application route (custom 5-step form or Eduka hosted form).
5. Remaining pages, media, maps.
6. Production validation, backups/restore test, handover docs.

## 8. Schedule inconsistency in the blueprint

Page 4 gives Friday 6 November 2026 as the V1 deadline (3 weeks from the 19 Oct kick-off);
page 39 gives the same date as the "wireframes review, end of week 3". These cannot both hold:
a wireframe review on the V1 date leaves no build time. To confirm with EBM which one is true.
