# Écoles Belges au Maroc: the website

The new public website of **Écoles Belges au Maroc (EBM)**: two Belgian schools in Morocco, in
**Casablanca (Dar Bouazza)** and **Rabat (Hay Riad)**. They teach the programme of the
Fédération Wallonie-Bruxelles from the classe d'accueil (age 2) to the CESS (age 18). The site is
in French.

Its job: make the school's quality clear in a few seconds to families comparing schools (mostly
on phones), then keep two actions one tap away everywhere: **visit** and **apply**. Families'
private space stays on **Eduka**, the school's existing platform; the site hands off to it.

> **Status:** design and content stage. Every page is built with real EBM photos and text from
> the school's current site. The inner pages are still marked `noindex` while they are reviewed.
> No integration is connected yet (CMS database, e-mail, forms, Instagram). See
> [What is and isn't built](#what-is-and-isnt-built).

---

## Technologies

| Layer | Technology | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.4.2** (App Router) with **React 19** and **TypeScript** | Server Components by default; static routes |
| CMS | **Payload 3.91.0** (`@payloadcms/next`, `db-postgres`, `richtext-lexical`) | Admin at `/admin`; not connected to a database yet |
| Database | **PostgreSQL** (Supabase planned) | Read through `DATABASE_URI` |
| Styling | **Tailwind CSS 4** + CSS Modules | Design tokens in `src/app/(frontend)/globals.css` |
| UI parts | **shadcn/ui** on **Radix** (dialog, accordion, navigation menu) | Only where behaviour needs it |
| Icons | **lucide-react** | |
| Images | `next/image` (AVIF/WebP) | Photos in `public/images` |
| Fonts | `next/font/local` | Avenir Next (EBM's files) and Playfair Display, self-hosted |
| Planned | Supabase Storage, React Hook Form + Zod, Trigger.dev, Resend, Turnstile, Vercel Pro | Chosen in `docs/BRIEF.md`, not wired yet |

There is no animation or carousel library. Motion uses CSS, including scroll-driven animations,
plus a few small client components.

---

## Getting started

Requirements: **Node.js 20.18.1 or newer** and npm.

```bash
npm install
cp .env.example .env      # then fill in PAYLOAD_SECRET and DATABASE_URI
npm run dev               # http://localhost:3000
```

The public pages work without a database: their content is typed data in `src/content/`. Only the
Payload admin (`/admin`) and its API need `DATABASE_URI`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (`npm run start -- -p 3100` for another port) |
| `npm run typecheck` | TypeScript check, no output files |
| `npm run report:bundle` | Table of first-load JavaScript per route (Next 16 no longer prints it) |
| `npm run qa:hero-contrast` | Measures the hero text's contrast on every photo (needs the server on port 3100) |
| `npm run generate:types` | Regenerates `src/payload-types.ts` from the Payload config |
| `npm run generate:importmap` | Regenerates Payload's admin import map |

### Environment variables

| Variable | Used by |
| --- | --- |
| `PAYLOAD_SECRET` | Payload: signs admin sessions |
| `DATABASE_URI` | Payload: the PostgreSQL connection string |

`.env` is git-ignored. `.env.example` lists the variables without values.

---

## Folder structure

```text
EBM_Website/
├── src/
│   ├── app/
│   │   ├── (frontend)/          the public site (French)
│   │   │   ├── layout.tsx       header, footer, intro curtain, fonts, metadata
│   │   │   ├── globals.css      design tokens (colours, type scale, spacing) + base styles
│   │   │   ├── page.tsx         the home page
│   │   │   ├── le-reseau/  pedagogie/  ecole-du-dehors/  grandir-aux-ebm/  apres-les-ebm/
│   │   │   ├── nos-campus/      the overview, and [campus]/ for Casablanca and Rabat
│   │   │   ├── admissions/      comprendre, documents-et-frais, candidater
│   │   │   ├── calendrier/  reserver-une-visite/  contact/  espace-eduka/  recherche/
│   │   │   └── mentions-legales/  confidentialite/  recrutement/  plan-du-site/  connexion-test/
│   │   ├── (payload)/           the Payload admin (/admin) and its REST/GraphQL API (/api)
│   │   ├── global-not-found.tsx the designed French 404
│   │   ├── robots.ts, sitemap.ts
│   │
│   ├── components/
│   │   ├── home/                the home page's sections (hero, stages, scroll scene, alumni deck,
│   │   │                        figures, campus frame, director's letter, admissions, FAQ…)
│   │   ├── inner/               the inner pages
│   │   │   ├── blocks.tsx       shared blocks (hero, section, split, link list, actions band…)
│   │   │   ├── school/          Le réseau, Pédagogie, École du dehors, Grandir, Après les EBM
│   │   │   ├── campuses/        Nos campus, the campus pages, contact
│   │   │   └── admissions/      admissions, fees, calendar and FAQ tools
│   │   ├── site/                header (menus, search overlay, mobile sheet), footer, CTA band,
│   │   │                        intro curtain, mobile action bar
│   │   ├── ui/                  primitives: button, container, accordion, sheet, smart link
│   │   └── auth-test/           the login prototype on /connexion-test (not real authentication)
│   │
│   ├── content/                 ALL the site's text and data, typed (no CMS yet)
│   │   ├── site.ts              name, addresses, phones, e-mails, navigation, Eduka links
│   │   ├── home.ts, home-details.ts, journey.ts   the home page
│   │   ├── campuses.ts, pages.ts, search.ts, espace-eduka.ts
│   │   ├── migration/           inner-page content migrated from the current site
│   │   └── types.ts             shared types (ImageAsset, LinkItem…)
│   │
│   ├── lib/                     routes, metadata, structured data (JSON-LD), fonts, typography
│   ├── collections/             Payload collections: Users, Media
│   ├── features/auth-test/      the login prototype's contract and preview logic
│   ├── fonts/                   Avenir Next and Playfair Display files
│   ├── payload.config.ts        Payload configuration
│   └── payload-types.ts         generated Payload types
│
├── public/
│   ├── brand/                   logos, campus pictograms, partner logos, favicons
│   ├── images/                  EBM photographs
│   └── documents/               PDFs (school calendar, archived brochure)
│
├── scripts/                     bundle report and visual QA (headless Chrome over CDP)
├── docs/                        the project's documentation (see below)
├── CLAUDE.md, AGENTS.md         working rules for AI coding agents
├── DESIGN.md                    the design system as built
├── PRODUCT.md                   who the site is for and what it must do
└── next.config.ts, tsconfig.json, postcss.config.mjs, components.json
```

---

## How the content works

Every page reads **typed static data** from `src/content/`. The data is shaped like the future
Payload collections, so when the database is connected the components keep the same props and
only the data source changes.

- **Real content only.** Text and photos come from EBM's current site, its photo library and the
  migration pack. The sources are listed in `docs/CONTENT-SOURCES.json` and
  `docs/CONTENT-ASSETS.json`.
- **Nothing is invented.** A fact still to confirm with EBM is shown as a short visible note or a
  `[placeholder]`. The list is in `docs/CONTENT-GAPS.md`.
- **The alumni stories on the home page are placeholders** (`source: 'placeholder'`), marked as
  such on the page, until EBM collects real ones.
- French typography: a narrow no-break space before `? ! : ;` (`NNBSP` in `src/lib/typography.ts`)
  and typographic apostrophes.

---

## Design system

The full system is in **[DESIGN.md](DESIGN.md)**. In short:

- **Two typefaces.** Playfair Display for large titles, Avenir Next for everything else. Home
  section titles mix both: Avenir with one word in Playfair italic, written `*mot*` in the
  content (`SectionHeading` in `src/components/home/emphasis.tsx`).
- **Palette.** Fired Clay `#B85431` (the action colour; `#9C4425` for small text), Olive Grove
  `#505940`, Dune Sand `#D0A057`, Cream `#ECE0D3`, Riad Paper `#F4F1EC`, Charcoal `#282828`.
  The logo's colours stay inside the logo.
- **Shapes.** Photographs with rounded top corners (24px), 4px controls, static buttons (colour
  change only).
- **Motion.** CSS first, tied to the scroll where it helps. Everything works without JavaScript
  and becomes still under `prefers-reduced-motion`.
- **Accessibility.** WCAG AA contrast (white text on photos is measured), 44px touch targets,
  keyboard navigation, one `h1` per page.

---

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, the three stages (2–18), age chooser, Belgian certificates, the scroll scene, alumni, key figures, the two campuses, director's letter, admissions, video, FAQ, news |
| `/le-reseau` | The network: director's word, values, Belgian framework, history, partners |
| `/pedagogie` | Pedagogy: approach, the three levels, languages, follow-up |
| `/ecole-du-dehors` | The outdoor school at Casablanca (1.5 ha) |
| `/nos-campus`, `/nos-campus/casablanca`, `/nos-campus/rabat` | The campuses: places, daily life, hours, access |
| `/grandir-aux-ebm`, `/apres-les-ebm` | School life; after EBM |
| `/admissions/*` | How admission works, documents and fees, apply (hands off to Eduka's form) |
| `/calendrier`, `/reserver-une-visite`, `/contact` | Calendar, visit requests, contact (prepares an e-mail) |
| `/espace-eduka` | The families' sign-in page; it hands off to Eduka's own secure sign-in |
| `/recherche` | Search (also an overlay from the header) |
| `/mentions-legales`, `/confidentialite`, `/recrutement`, `/plan-du-site` | Legal, privacy, recruitment, site map |
| `/connexion-test` | A login **prototype** only, not real authentication (see `docs/AUTH-TEST.md`) |

---

## What is and isn't built

**Built:**
- every page, with real content;
- the header (menus, search overlay, mobile sheet), footer, intro animation and mobile action bar;
- the Payload configuration (Users and Media collections).

**Not built yet; nothing on the site pretends otherwise:**
- the Payload database connection (Supabase) and moving the content into the CMS;
- form delivery (Resend), bot protection (Turnstile) and background jobs (Trigger.dev): the
  contact and visit tools prepare an e-mail in the visitor's own mail app;
- any Eduka integration: links hand off to Eduka's pages. Eduka passwords are never handled by
  this site;
- the Instagram feed: the home shows a static preview linking to the account;
- real authentication: `/connexion-test` is a frontend demo.

---

## Documentation

| File | Contents |
| --- | --- |
| [docs/BRIEF.md](docs/BRIEF.md) | The technical brief: stack, security rules, Eduka, booking, build order |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Architecture, website vs Eduka, content model, open questions, phases |
| [docs/HOME-SPEC.md](docs/HOME-SPEC.md) | Tokens, navigation, header and footer, home sections, performance budget |
| [docs/CONTENT-MIGRATION.md](docs/CONTENT-MIGRATION.md) | How the inner pages' content was migrated |
| [docs/CONTENT-GAPS.md](docs/CONTENT-GAPS.md) | What EBM still has to provide or confirm |
| [docs/AUTH-TEST.md](docs/AUTH-TEST.md) | The login prototype and the plan for real authentication |
| [DESIGN.md](DESIGN.md) / [PRODUCT.md](PRODUCT.md) | Design system; audience and goals |
| [CLAUDE.md](CLAUDE.md) | Working rules and the detailed status of each page |

---

## Quality checks

Before shipping a change:

```bash
npm run typecheck
npm run build
npm run report:bundle
```

After changing a hero photo or its overlay, start the production build on port 3100 and run
`npm run qa:hero-contrast`. Visual checks use headless Chrome through `scripts/qa/cdp.mjs` (it
drives the Chrome that Puppeteer caches in `~/.cache/puppeteer`, or `CHROME_BIN`).

Licence note: EBM's web licence for Avenir Next is still to be confirmed before launch.
