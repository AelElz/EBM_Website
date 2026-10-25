# EBM website: project rules

New website for Écoles Belges au Maroc (Casablanca + Rabat). French at launch.

Read before working:
- `docs/BRIEF.md`: the standing technical brief (stack, security rules, Eduka, booking, sequence).
- `docs/ARCHITECTURE.md`: architecture, Website vs Eduka split, content model, blockers, phases.
- `docs/HOME-SPEC.md`: tokens, navigation, header/footer, home sections, inner-page overview, perf budget.
- `DESIGN.md` / `PRODUCT.md`: design system as built, product truth.

## Stack (pinned, verified 21 Oct 2026)

Next.js 16.4.2 (App Router, TS, React 19) · Payload 3.91.0 (`@payloadcms/next`,
`db-postgres`, `richtext-lexical`) · Tailwind CSS 4 · shadcn/ui (Radix) · Supabase Postgres +
Storage (not connected yet) · RHF + Zod · Trigger.dev · Resend · Turnstile · Vercel Pro.
Do not add another backend, ORM, auth service or UI kit without explaining why.

## Status

- Home page: 15 content sections plus the shared footer. Order: hero + highlights,
  statement, school stages, direct age groups, Belgian certificate diagram, experience scroll
  scene, alumni deck, key figures, shared campus frame, director's letter, admissions path,
  large video, expandable FAQ cards, Instagram preview, CTA band. The latest additions were checked at 360, 390,
  768 and 1440px on 24 Oct 2026. The established scene/stage designs are preserved.
  The shared campus frame starts on Casablanca (olive) with Rabat's photo peeking from the
  right edge. Clicking it slides Casablanca left and brings Rabat into the main frame.
  Casablanca then becomes an equally sized thumbnail on the left; the same native button
  moves to that edge, retains focus and points left to return. A return restores Rabat's
  preview on the right. The full-panel slide lasts 850ms; olive-to-charcoal (#282828) fades over 900ms.
  Title words uncover through masks, followed by staggered facts.
  Touch swipes preserve vertical scrolling/pinch zoom. The inactive panel is inert, selection
  gets a short live announcement, reduced motion switches instantly, and no-JS campus links
  remain available. `docs/HOME-UX-UPDATE.md` records this behaviour and earlier checks.
  Admissions now uses a direct numbered ordered list: candidature, meeting, then decision
  and confirmation. A section heading and real Rabat entrance photo with an olive reassurance
  strip sit left of the Avenir steps/actions on desktop; phones show heading, steps/actions,
  then photo. Shorter copy preserves entry/place limits, the commission decision and existing
  clay application button/details link. This is a static Server Component; the decorative
  square diagram and unused `admissions-diagram.ts` are removed.
  `docs/HOME-FINISH.md` records the preceding completion pass and remaining content gaps.
- Header (24 Oct 2026, Ayoub's screenshot): no charcoal top bar any more; one white bar with
  the 4 menus, "Rechercher" + "Espace Eduka" (login) as clay icon + label (labels >= 1440px),
  then "Calendrier" (replaces "Visiter") + "Candidater". "Réserver une visite" is in the
  Admissions menu and the footer; phones, e-mails and "Nous contacter" only in the footer.
- Espace Eduka page `/espace-eduka` (24 Oct 2026, noindex): the login page in the EBM design,
  reached from the header's person icon, the phone menu and the footer. No credential fields on
  purpose: Eduka's sign-in is CSRF-protected and the brief forbids handling Eduka credentials,
  so "Se connecter" hands off to `https://ecolebelge.eduka.school/login`. Copy in
  `src/content/espace-eduka.ts`.
- Search overlay (24 Oct 2026): "Rechercher" opens a clay panel dropping from the top with a big
  field and live results from `src/content/search.ts` (page titles, purposes, synonyms; no
  full-text search yet). Lazy chunk (`search-trigger.tsx` → `search-overlay.tsx`, Radix
  Dialog); without JS the link goes to `/recherche`.
- Intro curtain (every page, first load of a browser session only, `components/site/intro.tsx`):
  Fired Clay screen, white one-colour stacked logo rising into the middle, then the screen
  slides up out of view (2.3s, CSS only). Skipped under reduced motion and on later loads
  (sessionStorage + `html[data-intro-seen]`, hence `suppressHydrationWarning` on <html>). Built
  from typed static content in `src/content/`. Swap to Payload queries once Supabase is
  connected; keep the same component props. `DESIGN.md` (+ `.impeccable/design.json`)
  documents the built system.
- The alumni stories are placeholders (`source: 'placeholder'`): EBM photos, invented quotes,
  `[Prénom Nom]`, a visible notice. Replace them once EBM collects real stories.
- The 14 non-home main pages now have a **first content implementation pass** (24–25 Oct 2026),
  using the supplied migration pack and the blueprint text extraction. They remain noindex review
  drafts, with specific missing-content notes rather than whole-page placeholders. Typed data is in
  `src/content/migration/`; scoped blocks/interactions are in `src/components/inner/`. See
  `docs/CONTENT-MIGRATION.md`, `docs/CONTENT-GAPS.md` and the source/asset JSON ledgers.
  The latest request excluded the homepage: its content, alumni placeholders and established
  interactions were preserved; 69 protected home/shared files remain unchanged.
  Legal/privacy/recruitment and visit-support pages are honest review/request pages. The existing
  site-directory page remains indexable. Applications hand off to the current hosted Eduka form;
  contact/visit tools prepare a local e-mail link and do not deliver/store messages or book slots.
- Editorial inner pages (25 Oct 2026, Ayoub: "enhance"): `/le-reseau` and `/pedagogie` have
  their own components (`network-page.tsx`, `pedagogy-page.tsx` in `components/inner/school/`)
  sharing `editorial-hero.tsx` (photo to the right edge + four key figures from the page's
  `keyFacts`; titles over 32 characters step down a size) and `editorial.module.css`;
  `pedagogy.module.css` holds Pédagogie's own sections (principles under clay rules, level tabs
  with a tall photo, olive outdoor band, languages as a path, question cards that open).
  Le réseau in detail: its own component
  `components/inner/school/network-page.tsx` + `editorial.module.css` instead of the generic
  blocks (same content, plus four key figures in `networkPage.keyFacts`). A hero with the photo
  running to the right edge and the key figures, the director's motto large beside his portrait,
  values on a Fired Clay band, the Belgian framework as a checklist, history as a timeline on
  olive, the campuses as photo cards, partners on charcoal. The shared inner blocks are unchanged,
  so the other inner pages are untouched.
- `/ecole-du-dehors` (25 Oct 2026): Ayoub asked for a design unlike the editorial pages, then
  for less ("too much overkill … keep the home branding, simple but clean") and the taste
  skill. Direction "The sentence is the layout": the title "L'école [photo] du dehors" holds the
  garden photo inline, the same photo opens wide below with the home stages' rounded top
  corners, then each section is a statement left with its evidence right (principles list,
  a ledger of figures aligned on the comma, the launch photo, notes, the campus photo).
  Headings use the home's `SectionHeading`. `outdoor-page.tsx` + `outdoor.module.css`; no
  drawings, no pinned scenes. Taste inspector: 0 FAIL.
- Campus pages (25 Oct 2026, Ayoub: "the most important pages … clean, without too much text
  or slop"): `/nos-campus` and `/nos-campus/[campus]` render `components/inner/campuses/
  campus-views.tsx` + `campus.module.css` (the contact page keeps `campus-pages.tsx`). Overview:
  title, two large campus cards (photo, pictogram, three facts), four photos "De l'intérieur",
  a four-row comparison, both contacts. Campus page: title + wide photo, figures row, photo
  mosaic (skips the feature's photo), the feature (+ Rabat's milestones), "Au quotidien" on olive
  (one-line `services[].short` + hours cards), contacts. Empty placeholders (events, the team's
  word, social links, map notice) were removed; facts to confirm stay as one short line.
  Taste inspector: 0 FAIL on both.
- No integration (Eduka, Supabase, Resend, Trigger.dev, Turnstile, Instagram) is built. Never
  present a placeholder or mock as a working feature. Hosted Eduka links and local e-mail
  requests are functional handoffs, not an Eduka API or website delivery/booking integration.

## Design rules

- Only two typefaces: Playfair Display (h1/h2/large headings) and Avenir Next (everything else,
  self-hosted from EBM's files; web licence still to verify).
- Palette: terracotta #B85431 (ink #9C4425), olive #505940, sand #D0A057, cream #ECE0D3,
  paper #F4F1EC, charcoal #282828. Logo colours only inside the logo. One-colour versions:
  EBM's charcoal logo, and `public/brand/logo-ebm-stacked-white.svg` (all fills white, made
  24 Oct 2026 for the clay intro).
- No eyebrow labels above headings, no uppercase tracked labels, no section numbers, no
  gradient text, no emoji/unicode icons, no scroll hints, static buttons (colour change only).
- Exception, Ayoub's own design (23-24 Oct 2026, mock-ups in `UI projects/EBM WEBSITE/ANIMATION
  1-3.png` and screenshots of korowa.vic.edu.au): home sections 2 to 5 use mixed headings
  (Avenir + Playfair italic accent words, `*word*` in content), Fired Clay bands (statement,
  scene), the three-dot uppercase label and the white tracked button (scene, alumni), and
  rounded top corners on the stage panels. Keep that language to those sections unless
  Ayoub extends it.
- Home section titles (25 Oct 2026 polish pass, Ayoub: "better design, polish the current
  look"): every home section h2 uses `SectionHeading` (`components/home/emphasis.tsx`), the
  mixed style above at one size (Avenir 600, clamp 36-56px, one Playfair italic accent word in
  clay, or a light tint on olive), no full stop. The hero h1 and the CTA band keep their large
  Playfair: they open and close the page. The director's letter keeps its small opening line.
  The campus frame's text aligns to the page margin from 1280px.
- Real EBM photos and copy only; anything unknown is a visible `[placeholder]`.

## Performance rules

Static routes; Server Components by default; client components only for header state/menus,
mobile sheet, hero slider, mobile action bar, the home scroll-scene driver (`collage-zoom.tsx`,
writes two CSS variables; shared code in `scroll-scene.ts`) and the alumni deck
(`story-deck.tsx`; the cards are server-rendered children) and the key-figure count-up
(`count-up.tsx`; the final value is in the server HTML), the FAQ accordion, video player, shared campus switcher and certificate-path viewport trigger.
The age-group chooser is native radio inputs + CSS, with no client component or slider. Admissions is static server-rendered HTML/CSS, without a scroll-driven diagram or client code.
Scoped inner-page client islands cover level tabs, activity filtering, FAQ search/disclosures,
fee selection, the school-calendar browser and local e-mail composition; long content and shared
blocks stay server-rendered. No animation or carousel library. `next/image`
everywhere (only the LCP image has `preload`), `next/font` for both faces. Check the first-load
JS table after changes with `npm run report:bundle` (Next 16 no longer prints it): home is
160.7 KiB gzip / 138.7 KiB brotli (24 Oct 2026, native video controls build), about 133 KiB of which is Next 16 + React 19 alone.

Scroll scene: the server HTML is the still collage (ANIMATION 2); the pinned version applies
only under `[data-ready]`, which the driver sets when JS runs and motion is allowed. Its scrim
over the focus photo is measured (label >= 4.5:1, heading >= 3:1 at 360 to 1920px, every step):
re-measure when the focus photo, the copy length or the heading size changes.

White text on photos must pass AA on the photo's brightest pixels: after changing a hero photo or
the hero overlay, run `npm run start` then `npm run qa:hero-contrast`.

## Environment

- Project lives at `~/Documents/ayoub/EBM_Website` (moved there 23 Oct 2026; GitHub
  `AelElz/EBM_Website`). Assets: `~/Documents/ayoub/UI projects/EBM WEBSITE/`
  (renamed from `UI:UX projects` by Oct 2026); EBM's current-site photos are in its
  `EBM_Site_Actuel/images/` (index.csv lists them).
- The Mac disk is nearly full: check `df -h ~` before installs/builds; run
  `npm cache clean --force` after big installs. Use npm (no pnpm installed).
- Commands: `npm run dev`, `npm run build`, `npm run typecheck`, `npm run report:bundle`,
  `npm run qa:hero-contrast` (needs the server on port 3100 and puppeteer's
  chrome-headless-shell in `~/.cache/puppeteer`, or `CHROME_BIN`).
- Visual QA: the app's browser pane can leave photos unpainted in emulated 768/1024px views and
  stalls image decoding when hidden; trust headless Chrome screenshots (scripts/qa/cdp.mjs).
- Never commit secrets; `.env` is git-ignored, `.env.example` lists variables.
