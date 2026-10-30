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

- Home page: 15 content sections plus the shared footer. Order: hero + highlights, then the
  five bands of Ayoub's board (29 Oct 2026, below), Belgian certificate diagram, experience scroll
  scene, alumni deck, shared campus frame, director's letter, admissions path,
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
  sharing `editorial-hero.tsx` (photo beside the copy inside the page margins + four key figures from the page's
  `keyFacts`; titles over 32 characters step down a size) and `editorial.module.css`;
  `pedagogy.module.css` holds Pédagogie's own sections.
- Validated copy (30 Oct 2026, Ayoub: "this is the real validated data"): EBM's
  `UI projects/EBM WEBSITE/Notre_pédagogie.docx` and `Parcours_scolaire.docx`, word for word
  (site typography only) in `src/content/pedagogie.ts` and `src/content/parcours.ts`. Do not
  rewrite or add to that copy. `parcours.ts` feeds both the home band 5 (each stage's opening
  paragraphs + bold closing line) and `/pedagogie` (full stages with their lists). `/pedagogie`
  follows the document's order and its "Traitement graphique" notes: framework + three sober
  markers, way of teaching + steps 01-04, the four stages as tabs, languages timeline on olive,
  diplomas as a staircase of three steps (CEB, CE1D, CESS), each taller than the last, the
  diploma on its landing and the years that lead to it at its foot. Ayoub's board
  `Parcours_scolaire.ai` is for the data only, not a design to copy (he said so on 30 Oct). The
  board says CEP, the validated text CEB, so CEB is used. Then the three savoirs as overlapping rings on
  Fired Clay. Each stage tab ends with "Repères" cards (its languages, the diploma it leads to,
  the way of teaching) linking down to those sections. The language levels and the staircase link
  back to the stage tab (`#maternelle` etc.; `level-tabs.tsx` opens the tab and scrolls its row
  into view). The old migrated principles, outdoor band, language cards, teacher-voice note and
  follow-up questions were removed from that page (not in the validated document).
  Le réseau in detail: its own component
  `components/inner/school/network-page.tsx` + `editorial.module.css` instead of the generic
  blocks (same content, plus four key figures in `networkPage.keyFacts`). A hero with the photo
  inside the page margins and the key figures, the director's motto large beside his portrait,
  values on a Fired Clay band, the Belgian framework as a checklist, history as a timeline on
  olive, the campuses as photo cards, partners on charcoal. The shared inner blocks are unchanged,
  so the other inner pages are untouched.
- Legal pages (30 Oct 2026, Ayoub: "the big 3"): `/conditions-utilisation`, `/confidentialite`
  (now "Confidentialité et sécurité"), `/cookies`, plus `/mentions-legales` in the same layout
  (`components/legal/`, content in `src/content/legal.ts`, Moroccan loi 09-08 / CNDP / loi
  2-00). Every statement matches the code: keep `legal.ts` in sync when the site starts storing
  or sending anything new (analytics, forms, embeds). Facts only EBM can give are in each
  document's `missing` box, never invented. `/cookies` holds the video choice (`ebm-videos`,
  `src/lib/video-choice.ts`): "Seulement quand je clique" keeps YouTube unloaded until play.
  Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set
  in next.config.ts. To be reviewed by EBM's legal adviser before launch.
- Admissions merged (30 Oct 2026, Ayoub: remove the duplicated pages, "make a good user
  experience specially on understanding which page need to go"): five pages, in the order of a
  candidature, each with a one-line `hint` in the menu (`NavItem.hint`, shown in the desktop
  panel and the phone sheet). `/admissions` holds what `/admissions/comprendre` held (seven
  steps, levels, conditions, FAQ, contacts; same section ids) and opens with "Par où commencer
  ?". The visit request is on `/calendrier#visite` (`routes.reserverVisite`, `visitFor(campus)`).
  `/admissions/comprendre` redirects in next.config.ts; `/reserver-une-visite` redirects in its
  page, keeping `?campus=`. `/admissions/candidater` merged into `/admissions#candidater`
  the same day (only its campus/level/pieces cards and the Eduka panel were unique;
  `routes.candidater` is that anchor, redirect in next.config.ts). Admissions menu: Admissions,
  Documents & frais, Contact; the header's Candidater button goes to #candidater. Calendrier & visites is in the Vie scolaire menu only (Ayoub: the same link
  was in both).
- Apple-style pass, site-wide (30 Oct 2026, Ayoub: "make all the website feel like Apple style
  … keep the design the same"): pill buttons (semibold, a press dims them, no movement), circle
  icon buttons, 12px fields and tiles, 20px cards and inner photos (`--radius-ui`,
  `--radius-card`), smooth in-page scrolling, no iOS tap flash, and a page-change transition
  (`components/site/page-transition.tsx` + `.page` in globals.css). DESIGN.md Shapes/Buttons
  updated to match.
- `/calendrier` (30 Oct 2026, Ayoub: "a dashboard that could be working with the CMS", Apple
  design skill, utility surface): four cards at a glance (today, next date, next holidays, year
  progress), one month at a time chosen by month and year (arrows, "Aujourd'hui", the chosen
  day's dates beside it), then "À venir": only the dates not over yet, six first then a
  button for the rest, no filters (Ayoub: "clean up the events"; a campus filter appears only
  once a date is campus-specific) (`components/inner/calendar/`). The dates come from `src/lib/calendar.ts`: the Payload
  collection `calendar-events` (`src/collections/CalendarEvents.ts`, staff edit it in `/admin`,
  published dates only for visitors, the page revalidates on every change) once `DATABASE_URI`
  is set, else the signed 2026–2027 transcription. `npm run seed:calendar` copies that
  transcription into the CMS. `/calendrier/ebm.ics` serves the same dates. No database is
  connected yet, so the page runs on the document today.
- `/ecole-du-dehors` (25 Oct 2026): Ayoub asked for a design unlike the editorial pages, then
  for less ("too much overkill … keep the home branding, simple but clean") and the taste
  skill. Direction "The sentence is the layout". Since 30 Oct 2026 the title follows Ayoub's
  mock-up: "L'école" beside a Fired Clay pill holding "du dehors" in white Playfair italic, two
  lighter pills fanning out behind it (the home band 5's circles), the buttons right under (no
  intro sentence in the hero). Rebuilt below the title on 30 Oct 2026 (Ayoub: "an ass design",
  then "easy, smooth and good", Apple design skill): a pinned scene where the garden photo opens
  from a rounded window to the whole screen and the page sentence rises over it; the statement
  lighting up word by word; three principles under three square photos of the garden (Ayoub's
  own `Photos/CASABLANCA/DEHORS`, cropped low to leave out the building site behind); the area
  as one fifth of the campus (five plots, the garden in olive) and the first levels CA–P2; the
  launch; the place. Headings use the home bands' `BandHeading`. The notes about missing
  content (current sessions, testimonials, events) left the page; they stay in
  docs/MIGRATION-SCHOOL-GAPS.md. `outdoor-page.tsx` + `outdoor.module.css`. Taste lint: 0 FAIL.
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
- Home bands (29 Oct 2026, Ayoub's board `UI projects/EBM WEBSITE/Bandeaux_website.ai` plus two
  mock-ups sent in chat for band 5): `components/home/bands/`, copy in `src/content/home-bands.ts`.
  They replaced the statement, school stages, age-group chooser and key figures. 1 values (Fired
  Clay statement whose words light up line by line on scroll, three values), 2 network on charcoal
  over the B&W courtyard + six count-up figures (a lighter clay, #e4835f: Fired Clay on charcoal is 2.2:1),
  3 institutional anchorage (photo gallery with a clip-path wipe, flags that unfold, the 2014
  agreement, partners logo strip in charcoal), 4 pedagogy on olive (three medallions that open
  through a circle), 5 school path drawn to Ayoub's mock-ups: clay uppercase label, plain Playfair
  title, uppercase tabs on grey shields (native radios + :has), the docx paragraphs, a pill
  "En savoir plus"; the children cutout for the overview, three clay circles fanning out behind
  the stage photo for each stage. Bands 2 to 5 follow the board's layout (Ayoub: "fix the
  layout"): an uppercase label and a plain Playfair title with a full stop (`band-heading.tsx`),
  centred bands 1, 2 and 4, the cooperation text centred beside the photos with round arrows at
  the lower right, six figures in one row from 1280px, uppercase pillar names, pill buttons.
  These, the shields and the round photos are Ayoub's own exceptions to the rules above. Figures (200 staff, 120 Belgian expatriates,
  90 000 m²) are the board's and await EBM confirmation. Motion is scroll-driven CSS only.
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
(`count-up.tsx`; the final value is in the server HTML), the anchorage photo gallery
(`bands/anchorage-gallery.tsx`), the FAQ accordion, video player, shared campus switcher and certificate-path viewport trigger.
The school-path tabs (band 5) are native radio inputs + CSS, with no client component. Admissions is static server-rendered HTML/CSS, without a scroll-driven diagram or client code.
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
