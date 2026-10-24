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

- Home page: 15 content sections plus the shared footer. Order: hero + highlights,
  statement, school stages, direct age groups, Belgian certificate diagram, experience scroll
  scene, alumni deck, key figures, two campus chapters, director's letter, admissions path,
  large video, expandable FAQ cards, Instagram preview, CTA band. The latest additions were checked at 360, 390,
  768 and 1440px on 24 Oct 2026. The established scene/stage designs are preserved.
  `docs/HOME-UX-UPDATE.md` records the latest simplification, video/FAQ behaviour and checks.
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
- The other 14 main pages are **placeholders** (noindex) until Ayoub specifies their content.
- No integration (Eduka, Supabase, Resend, Trigger.dev, Turnstile, Instagram) is built. Never
  present a placeholder or mock as a working feature.

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
- Real EBM photos and copy only; anything unknown is a visible `[placeholder]`.

## Performance rules

Static routes; Server Components by default; client components only for header state/menus,
mobile sheet, hero slider, mobile action bar, the home scroll-scene driver (`collage-zoom.tsx`,
writes two CSS variables; shared code in `scroll-scene.ts`) and the alumni deck
(`story-deck.tsx`; the cards are server-rendered children) and the key-figure count-up
(`count-up.tsx`; the final value is in the server HTML), the FAQ accordion and video player.
The age-group chooser is native radio inputs + CSS, with no client component or slider. The admissions diagram uses a small native scroll driver.
No animation or carousel library. `next/image`
everywhere (only the LCP image has `preload`), `next/font` for both faces. Check the first-load
JS table after changes with `npm run report:bundle` (Next 16 no longer prints it): home is
159.9 KiB gzip / 138.1 KiB brotli (24 Oct 2026), about 133 KiB of which is Next 16 + React 19 alone.

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
