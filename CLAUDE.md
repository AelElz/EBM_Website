# EBM website: project rules

New website for Écoles Belges au Maroc (Casablanca + Rabat). French at launch.

Read before working:
- `docs/BRIEF.md`: the standing technical brief (stack, security rules, Eduka, booking, sequence).
- `docs/ARCHITECTURE.md`: architecture, Website vs Eduka split, content model, blockers, phases.
- `docs/HOME-SPEC.md`: tokens, navigation, header/footer, home sections, placeholder pages, perf budget.
- `DESIGN.md` / `PRODUCT.md`: design system as built, product truth.

## Stack (pinned, verified 21 Oct 2026)

Next.js 16.4.2 (App Router, TS, React 19) · Payload 3.91.0 (`@payloadcms/next`,
`db-postgres`, `richtext-lexical`) · Tailwind CSS 4 · shadcn/ui (Radix) · Supabase Postgres +
Storage (not connected yet) · RHF + Zod · Trigger.dev · Resend · Turnstile · Vercel Pro.
Do not add another backend, ORM, auth service or UI kit without explaining why.

## Status

- Home page complete: 9 sections (1 hero slider + highlights panel, 2 statement band,
  3 school stages, 4 the "experience" scroll scene from Ayoub's ANIMATION 1-3 mock-ups,
  5 alumni card deck, 6 key figures with count-up, 7 Instagram preview, 8 CTA band, 9 footer),
  checked at 360 to 1920px on 24 Oct 2026. Sections 2 and 3 follow Ayoub's Korowa screenshots. Built
  from typed static content in `src/content/`. Swap to Payload queries once Supabase is
  connected; keep the same component props. `DESIGN.md` (+ `.impeccable/design.json`)
  documents the built system.
- The alumni stories are placeholders (`source: 'placeholder'`): EBM photos, invented quotes,
  `[Prénom Nom]`, a visible notice. Replace them once EBM collects real stories.
- The other 14 main pages are **placeholders** (noindex) until Ayoub specifies their content.
- No integration (Eduka, Supabase, Resend, Trigger.dev, Turnstile, Instagram) is built. Never
  present a placeholder or mock as a working feature.

## Design rules

- Only two typefaces: Playfair Display (h1/h2/large headings) and Avenir Next (everything else,
  self-hosted from EBM's files; web licence still to verify).
- Palette: terracotta #B85431 (ink #9C4425), olive #505940, sand #D0A057, cream #ECE0D3,
  paper #F4F1EC, charcoal #282828. Logo colours only inside the logo.
- No eyebrow labels above headings, no uppercase tracked labels, no section numbers, no
  gradient text, no emoji/unicode icons, no scroll hints, static buttons (colour change only).
- Exception, Ayoub's own design (23-24 Oct 2026, mock-ups in `UI projects/EBM WEBSITE/ANIMATION
  1-3.png` and screenshots of korowa.vic.edu.au): home sections 2 to 5 use mixed headings
  (Avenir + Playfair italic accent words, `*word*` in content), Fired Clay bands (statement,
  scene), the three-dot uppercase label and the white tracked button (scene, alumni), and
  rounded top corners on the stage panels. Keep that language to those sections unless
  Ayoub extends it.
- Real EBM photos and copy only; anything unknown is a visible `[placeholder]`.

## Performance rules

Static routes; Server Components by default; client components only for header state/menus,
mobile sheet, hero slider, mobile action bar, the home scroll-scene driver (`collage-zoom.tsx`,
writes two CSS variables; shared code in `scroll-scene.ts`) and the alumni deck
(`story-deck.tsx`; the cards are server-rendered children) and the key-figure count-up
(`count-up.tsx`; the final value is in the server HTML). No animation or carousel library. `next/image`
everywhere (only the LCP image has `preload`), `next/font` for both faces. Check the first-load
JS table after changes with `npm run report:bundle` (Next 16 no longer prints it): home is
149.9 KiB gzip / 129.1 KiB brotli, about 133 KiB of which is Next 16 + React 19 alone.

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
