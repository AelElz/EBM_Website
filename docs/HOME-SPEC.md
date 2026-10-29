# Home page + site shell: build spec

Source of truth for the coded home page and shared header/footer, with an overview of the 14
inner pages. Their first content pass and publication gaps are documented in CONTENT-MIGRATION.md
and CONTENT-GAPS.md. The latest migration request explicitly left the homepage unchanged.
Visual reference: the approved "Accueil · version 2 (slider)" board on the Claude Design canvas
(https://claude.ai/artifact/C1mREFzdLin7dvo67cNpv5) and its shared Header / CtaBand / Footer
components. Reproduce that composition faithfully, with the deviations listed under "Taste rules".

All copy is French. Typographic apostrophe ’ and French spacing before ? ! : (use a narrow
no-break space U+202F or a no-break space U+00A0). Never invent facts: every figure, address,
phone and claim below comes from EBM's current site, brand guide or blueprint.

## Design tokens

| Token | Value | Use |
|---|---|---|
| terracotta | `#B85431` | primary buttons, accents, active nav underline, CTA bar |
| terracotta-ink | `#9C4425` | small text links on light grounds (AA contrast) |
| olive | `#505940` | check icons, secondary dark accents |
| sand | `#D0A057` | small highlights only |
| cream | `#ECE0D3` | soft fills |
| paper | `#F4F1EC` | light section bands, footer ground, search field |
| charcoal | `#282828` | text, dark buttons, footer bottom bar |
| ink-soft | `#5F584F` | secondary text on light grounds (≥4.5:1 on white and paper) |
| hairline | `#ECE6DE` | borders |
| white | `#FFFFFF` | page ground, cards |

Logo colours (#282828, #F1A804, #E02B2F, #2B4A99) appear only inside the logo artwork.

Typography: exactly two families.
- **Playfair Display** (self-hosted by `next/font/local`, Latin WOFF2 files in `src/fonts/`,
  upright variable weights 500–600 and italic 400; licence `PLAYFAIR-OFL.txt`): h1, h2, large
  h3 and display headings only. These are the same Latin files used by the prior production
  build, now stored locally to avoid a failing Turbopack Google-font resolver. Weight 600, letter-spacing -0.01em,
  line-height ~1.06–1.12, `text-wrap: balance`.
- **Avenir Next** (EBM's own files, `next/font/local`, weights 400/500/600/700 from
  `~/Documents/ayoub/UI projects/EBM WEBSITE/Avenir-Next-Font/Avenir Next/WOFF2/`):
  everything else. Body 16–18px, line-height 1.6, measure ≤ 70ch. Fallback stack must be the
  system sans (`system-ui, -apple-system, "Segoe UI", sans-serif`) with `adjustFontFallback`
  to avoid layout shift. Never Nunito, Inter or any third face.

Shape: buttons are rectangles with 4px radius (as in version 2), heights 44–56px, weight 700.
Cards: white, no border, soft offset shadow `0 24px 60px -24px rgba(40,30,20,.28)`.
Container: max-width 1240px, side padding `clamp(20px, 4vw, 40px)`.
Section rhythm: vertical padding `clamp(88px, 10vw, 140px)`; more space above a heading than below.

## Taste rules (Ayoub's standing preferences + impeccable craft floor)

- No eyebrow / kicker labels above headings (the canvas had a few; drop them). No uppercase
  tracked labels, no section numbers. Headings speak alone.
- No gradient text, no glass as decoration, no emoji or unicode glyphs as icons (draw icons
  as SVG in one consistent 1.5px stroke style; lucide-react is acceptable).
- Static buttons: colour transitions only, no magnetic/rolling/bouncing controls. Motion belongs
  to scenes (hero crossfade, a single restrained section reveal), never to controls.
- No scroll hints, no floating UI chips over photos.
- Theme the browser surfaces: `::selection` (terracotta on white text), focus ring
  (2px terracotta-ink, 3px offset), caret colour, `text-underline-offset`, tabular numerals for figures.
- Light theme only (school site, read in daylight on phones); no dark mode toggle.

## Assets (copy into the repo, optimised)

Source folder: `~/Documents/ayoub/UI projects/EBM WEBSITE/` (was `UI:UX projects` until Oct
2026; quote the path, it has spaces). Photos from EBM's current site:
`EBM_Site_Actuel/images/<page>/` in that folder (`index.csv` lists them).

| Repo path | Source | Notes |
|---|---|---|
| `public/brand/logo-ebm-horizontal.svg` | `LOGO/1x/SVG/Asset 13.svg` | header |
| `public/brand/logo-ebm-stacked.svg` | `LOGO/1x/SVG/Asset 14.svg` | footer |
| `public/brand/picto-casablanca.svg` | `LOGO/SVG/Asset 17.svg` | campus pictogram |
| `public/brand/picto-rabat.svg` | `LOGO/SVG/Asset 16.svg` | campus pictogram |
| `public/brand/partners-white.png` | `LOGO/2x/Asset 5@2x.png` | FWB · WBI · AEBE, white, for the dark footer bar |
| `public/images/hero-rabat-entree.jpg` | `Photos/RABAT/Entrée secondaire EBR avec élèves.jpg` | slide 1 = LCP image |
| `public/images/hero-casablanca-entree.jpg` | `Photos/CASABLANCA/3c3cc3d0-1325-407f-8a55-5c3f6cb00354.png` | slide 2 |
| `public/images/hero-rabat-batiment.jpg` | `Photos/RABAT/ea51aeb9-5cc2-439a-9e01-d57ea70157ab.png` | slide 3 |
| `public/images/casablanca-cour-fondamental.jpg` | `Photos/CASABLANCA/Fondamental_EBC.png` | unused since 23 Oct (old about collage) |
| `public/images/casablanca-bibliotheque.jpg` | `Photos/CASABLANCA/Biblio_secondaire_EBC.png` | unused since 23 Oct (old about collage) |
| `public/images/casablanca-ecole-du-dehors.jpg` | `Photos/CASABLANCA/DEHORS/IMG_0724.HEIC` | scroll collage, left (convert with `sips`) |
| `public/images/ceremonie-diplomes.jpg` | `EBM_Site_Actuel/images/A04 Parcours scolaire/04_Primaire.jpg` | scroll collage focus + alumni backdrop (1920px) |
| `public/images/collage-*.jpg` | `A05 Casablanca/05_EBM-C_0048.jpg` (cour), `A03 Projet pédagogique/03_Eélèves en sciences.jpg`, `A04 Parcours scolaire/03_Maternelle.jpg`, `A03 Projet pédagogique/02_EBM-C_0370.jpg` (dessin), `A03 Projet pédagogique/06_EBM-C_0150.jpg` (badminton), all in `EBM_Site_Actuel/images/` | scroll collage |
| `public/images/alumni-*.jpg` | `D01 Les futurs lauréats…/03_1.jpg`, `05_4.webp`, `06_w.webp`, `07_c.webp`; `A04 Parcours scolaire/01_IMG-20190701-WA0004_2.webp`; `A06 Rabat/03_Rabat 1.jpg` (native size, never upscaled) | placeholder alumni cards |
| `public/images/casablanca-cour-secondaire.jpg` | `Photos/CASABLANCA/6bdda8ee-a9c1-43b4-9d99-61829e02b72d.png` | CTA band background |
| `public/images/insta-*.jpg` | `CASABLANCA/237cc02d…png`, `DEHORS/IMG_0722.HEIC`, `CASABLANCA/c9ef3e7c…png`, `RABAT/Secondaire_EBR.png`, `CASABLANCA/Biblio_secondaire_EBC.png`, `CASABLANCA/8aae59b1…png` | 6 Instagram preview tiles |

Convert photos with `sips` to JPEG quality ~85, longest side ≤ 2400px (hero) / ≤ 1600px (others);
`next/image` generates AVIF/WebP at request time. Fonts go to `src/fonts/`.

## Navigation (4 menus, EBM site map grouped; routes from the blueprint)

| Menu | Items (label → route) |
|---|---|
| L’école → `/le-reseau` | Le réseau EBM `/le-reseau` · Pédagogie `/pedagogie` · L’école du dehors `/ecole-du-dehors` · Après les EBM `/apres-les-ebm` |
| Nos campus → `/nos-campus` | Nos campus `/nos-campus` · Campus de Casablanca `/nos-campus/casablanca` · Campus de Rabat `/nos-campus/rabat` |
| Vie scolaire → `/grandir-aux-ebm` | Grandir aux EBM `/grandir-aux-ebm` · Calendrier & visites `/calendrier` |
| Admissions → `/admissions` | Admissions `/admissions` · Comprendre les admissions `/admissions/comprendre` · Documents & frais `/admissions/documents-et-frais` · Calendrier & visites `/calendrier` · Candidater en ligne `/admissions/candidater` · Questions fréquentes `/admissions/comprendre#faq` · Contact `/contact` |

Espace Eduka (parents): the site's own `/espace-eduka` login page (24 Oct 2026), whose button
opens Eduka's sign-in `https://ecolebelge.eduka.school/login`. External links open in a new tab
with ↗ drawn as an icon, not a glyph: Instagram `https://www.instagram.com/ecolesbelgesaumaroc/`.

## Header (shared, every page)

Reworked 24 Oct 2026 from Ayoub's reference screenshot (icon + label utility links):

1. **No top bar.** The charcoal strip (phones, Calendrier, Espace Eduka, "Nous contacter") is
   removed. Contact details (phones, e-mails, addresses, "Nous contacter") live in the footer.
2. **Main bar**: white, 76px, sticky at the top, wide container (1440px incl. gutters). Logo
   left (height ~38px, links `/`). Four menu triggers with a chevron; each opens a dropdown
   panel (white, 3px terracotta top border, soft shadow) listing its links. Hover opens on
   pointer devices with a short intent delay; click/Enter/Space/ArrowDown open; Escape closes
   and returns focus; links are reachable by Tab/arrows. Active section gets a 3px terracotta
   bottom border + terracotta-ink text. Right: "Rechercher" (opens the search overlay; a link to
   `/recherche` without JS) and "Espace Eduka"
   (login → the site's `/espace-eduka` page, which hands off to Eduka's sign-in), each a terracotta line icon + label
   (labels from 1440px, icon only below); a thin divider; "Calendrier" outline button
   (`/calendrier`, from 1280px; it replaces "Visiter": the visit is a later step, for families
   already convinced); "Candidater" terracotta button (`/admissions/candidater`). The bar
   frosts (translucent white, backdrop blur, shadow) once the page has scrolled.
3. **Visit**: "Réserver une visite" (`/reserver-une-visite`) is an item of the Admissions menu,
   after "Calendrier & visites", and of the footer's quick links.
4. **Mobile (< 1024px)**: logo, search icon, Eduka login icon, menu button (44px targets). The
   menu sheet has the four groups as accordions, then Espace Eduka, with "Calendrier" +
   "Candidater" at the bottom. The **bottom action bar** (frosted, two equal buttons
   "Calendrier" + "Candidater") appears on phones once the hero buttons have scrolled out of
   view; respects `env(safe-area-inset-bottom)`.

## Intro curtain (shared, every page)

Added 24 Oct 2026 at Ayoub's request: on the first load of a browser session, a Fired Clay
screen with the white stacked logo in the middle, which then slides up and out (2.3s, CSS
only, `src/components/site/intro.tsx`). Not shown on later loads in the session, nor under
`prefers-reduced-motion`.

## Current homepage order (29 Oct 2026)

Hero + highlights → values band → network + figures → institutional anchorage → pedagogy →
school path (the five bands of Ayoub's board, `components/home/bands/`, copy in
`src/content/home-bands.ts`; they replace the statement, stages, age groups and key figures,
whose specifications below are kept for history) → Belgian certificate diagram →
experience scene → alumni → shared campus frame (Casablanca ↔ Rabat) → director's
letter → admissions path → large muted-preview video → expandable FAQ → Instagram preview → CTA band →
shared footer. Keep the experience scene immediately before the alumni deck.

The homepage guide now presents three direct choices (2–5, 6–11 and 12–18 years) using native
radio controls and CSS `:has`. They work by click/tap or arrow keys, before hydration and
without JavaScript. Each result has a real photo, three short facts and an anchor to the
admissions steps. Ages are indicative at the start of the school year; this is not a placement
or admission eligibility calculator. Timetables and campus services no longer fill this panel.

The institutional table is replaced by one connected CEB → CE1D → CESS diagram, horizontal
on desktop and vertical on phones. Its field is olive green, all text is white and the rail/
checkpoints use warm orange #F3A766. The rail draws CEB → CE1D → CESS once on viewport entry
(2.3s), with sequential checkpoint fills. Reduced motion and no-JavaScript show the complete
static diagram. The driver is `certificate-path.tsx`; no animation dependency is needed.
Detailed former copy is preserved in
`content-archive/home-detailed-copy.md` as an authoring reference, not approved launch copy.

The campuses share one frame: Casablanca on olive initially, with Rabat's small photo at
the right edge as a native switch button. Selecting Rabat slides Casablanca left and Rabat
into the main frame. Casablanca becomes an equally sized thumbnail at the left edge; the
same button moves left while retaining focus and points left to return. Returning restores
Rabat's preview on the right. Each full-panel slide lasts 850ms; olive ↔ charcoal (#282828)
fades over 900ms. Preview arrival fades soften the edge change, with room for the main photo
mirrored in Rabat's state. Masked title words and staggered facts animate into the active panel.
The title has an intact accessible name, the inactive panel is inert, and a short live status
announces the selection. Touch-only horizontal swipes preserve vertical pan and pinch zoom.
Reduced motion switches instantly; without JavaScript, Casablanca and direct links to both
campus pages remain available. There is no scroll-driven background inset. Server-rendered
content stays in `campus-chapters.tsx`; `campus-switcher.tsx` owns selection and swipe state.

Admissions uses a direct numbered ordered list instead of the decorative square diagram:
candidature → meeting → commission response and, if admitted, confirmation. Shorter verified
copy retains entry from age 2 through 1re secondaire, availability of places, the parent
interview and age-adapted observation. The existing clay application button and details link
remain. A Playfair h2 and real Rabat entrance photo with an olive reassurance strip sit left
of the Avenir steps/actions on desktop; phones show heading → steps/actions → photo.
The static Server Component has no scroll-driven diagram and adds no client JavaScript.
The unused `admissions-diagram.ts` geometry module is removed.

The video has its own full-container section above the FAQ. Its privacy-enhanced YouTube
player loads on first viewport arrival and autoplays muted. Once playback starts, the native
iframe receives pointer events and keyboard focus, with YouTube's own playback controls.
There is no overlaid restart CTA, seek-to-zero, forced unmute or custom pause button.
Leaving view pauses playback; native controls own resumption and viewport re-entry does not
automatically resume it. Reduced motion or blocked autoplay keeps the poster with a labelled
icon-only Play control. The direct YouTube fallback remains. This supersedes restart-on-click.
The FAQ uses the installed Radix Accordion: ten rounded white question cards, one answer
open at a time, with a downward height animation and reduced-motion fallback. The all-questions
link comes after the cards on phones. No new packages, backend or service integration.

Copy remains in `src/content/home-details.ts` and `src/content/home-bands.ts`. See
`HOME-UX-UPDATE.md` for the latest checks. The original section specifications below still
describe retained sections; their numbering is superseded by the current sequence above.

## Original section specifications

Nine sections (since 24 Oct 2026), numbered as in `page.tsx` and the component comments. The
highlights panel that overlaps the hero is part of section 1.

1. **Hero slider** (full bleed, height `min(86svh, 760px)`, min 560px): three photos
   (rabat-entree → LCP, casablanca-entree, rabat-batiment) with a charcoal overlay at ~50%
   so white text passes AA. Crossfade 900ms; autoplay every 7s with a visible pause/play
   button (WCAG 2.2.2), pauses on hover/focus and when the tab is hidden, no autoplay with
   `prefers-reduced-motion`. Round prev/next buttons (48px, white border) at mid-height on
   left and right; small slide indicator. Content, left aligned in the container, vertically
   centred with bottom padding for the overlap: h1 "Un enseignement qui ouvre les horizons"
   (Playfair, clamp(40px, 5.6vw, 76px), max ~11em); paragraph "Le programme et les diplômes
   de la Fédération Wallonie-Bruxelles, de 2 à 18 ans, à Casablanca et à Rabat."; buttons
   "Réserver une visite" (terracotta, `/calendrier`) and "Candidater en ligne" (white outline,
   `/admissions/candidater`). Only slide 1 is `priority`; slides 2–3 load lazily after the
   first paint. No eyebrow above the h1.

   **Highlights panel** (part of section 1) overlapping the hero by ~96px: one white panel (not three separate
   cards), soft shadow, three columns (stack on phones), each: drawn icon (40px, 1.4px
   stroke, charcoal), title (Avenir 700, 18px), sentence (14–15px, ink-soft), link
   "En savoir plus" + arrow icon.
   - Graduation cap · "Un diplôme reconnu" · "Le CESS ouvre les portes des études supérieures,
     au Maroc et à l’international." → `/pedagogie`
   - Sprout · "L’école du dehors" · "1,5 hectare à Casablanca où la nature devient une salle
     de classe." → `/ecole-du-dehors`
   - Calendar-check · "Les admissions" · "Les étapes, les frais et le calendrier des visites,
     au même endroit." → `/admissions`
2. **Statement band** (added 24 Oct 2026 from Ayoub's screenshot of korowa.vic.edu.au): Fired
   Clay band; small line "Les Écoles Belges au Maroc accueillent les élèves de 2 à 18 ans à
   Casablanca (Dar Bouazza) et à Rabat (Hay Riad), avec le programme et les diplômes de la
   Fédération Wallonie-Bruxelles."; statement "Un *enseignement belge* exigeant, dans une
   *école bienveillante*. Nos élèves grandissent en confiance, en classe comme en dehors…
   *prêts à ouvrir leurs horizons.*" Static.
3. **School stages** (added 24 Oct 2026, after Korowa's "From first steps to future leaders"):
   h2 "Un seul parcours, *de 2 à 18 ans*"; three link panels Maternelle / Primaire /
   Secondaire with their ages (EBM to confirm the cut-offs), to `/pedagogie#maternelle`,
   `#primaire`, `#secondaire`; photos `collage-dessin`, `collage-badminton`,
   `parcours-secondaire` (from `EBM_Site_Actuel/images/A04 Parcours scolaire/05_Secondaire.jpg`).
   Hover/focus reveal with a mouse; band always shown on touch screens. CSS only.
4. **About, the experience scene** (redone 23 Oct 2026 from Ayoub's mock-ups `UI projects/EBM
   WEBSITE/ANIMATION 1.png` to `3.png`, modelled on the "Korowa experiences" scene of
   korowa.vic.edu.au). Pinned for 200lvh after white room under the highlights panel:
   (1) a full Fired Clay screen with, centred, three white dots + "CASABLANCA ET RABAT" (was
   "DE LA MATERNELLE AU CESS" until the stages section took that message),
   the h2 "Apprendre *ici*, réussir *partout*" (Avenir 600 + Playfair italic accents) and a
   white button "DÉCOUVRIR NOS CAMPUS" → `/nos-campus`; (2) four EBM photos slide in from the
   corners (cour de Casablanca, école du dehors, maternelle, sciences) while the diploma
   ceremony rises behind the text as a wide window; (3) the window opens to full screen.
   Ayoub asked for better, functional copy than his mock-up's placeholder text: label = the
   school range, heading = the promise, button = a real destination. Still collage
   (step 2) without JS or under reduced motion. The scrim over the focus photo is measured.
5. **Alumni deck** "Ils ont *grandi* aux EBM" (carousel redone 23 Oct 2026: Ayoub rejected
   the pinned horizontal scroll; his reference screenshot did not arrive, so the deck follows
   the "News from Korowa" card deck on his inspiration site). Dotted label "APRÈS LES EBM",
   mixed h2, lead, visible placeholder notice; six cards (5:4 photo, pill Études/Carrière,
   promotion, quote, name · path) stacked as a deck; arrows + dots, click on a stacked card,
   swipe/drag, arrow keys; no loop; then the outline button "Découvrir Après les EBM" →
   `/apres-les-ebm`. Stories are placeholders (`source: 'placeholder'`): real EBM photos,
   invented quotes, `[Prénom Nom]`, "Promotion 20XX".
6. **Key figures**: paper band inside the container (max 1160px), 4 cells with a drawn icon,
   number (Avenir 700, ~42px, terracotta, tabular numerals) and label: "2 000" élèves sur nos
   deux campus · "118" enseignants diplômés en Belgique · "2" campus, Casablanca et Rabat ·
   "2014" année de création du réseau. Use `<dl>`. (Figures come from EBM's current site;
   EBM to confirm before launch.) Count-up on first view (asked 23 Oct 2026): 0 → 2 000,
   0 → 118, 0 → 2, and 2000 → 2014 for the year (`countFrom` in the content).
7. **Actualités & projets** (Instagram block, like SAS): h2 "Actualités & projets", link
   "Suivre @ecolesbelgesaumaroc" + external icon; 6 square tiles (3 per row on phones, 6 on
   desktop) from `insta-*.jpg`, each linking to the Instagram account. This is a static
   preview until the Instagram feed is connected: keep the data in `src/content/home.ts`
   flagged `source: "placeholder"`.
8. **CTA band** (shared component, also used on placeholder pages): full-bleed
   `casablanca-cour-secondaire` photo, charcoal overlay ~62%, h2 "Prêt à rejoindre les EBM ?",
   paragraph "Rencontrez nos équipes, découvrez nos campus et commencez votre parcours
   d’admission.", buttons "Visiter nos écoles" (`/calendrier`) and "Candidater en ligne".
9. **Footer** (shared): paper ground, 4–5 columns: stacked logo + "Établissements scolaires
   belges à programme de la Fédération Wallonie-Bruxelles, de la classe d’accueil au CESS." +
   Instagram link; "Accès rapides" (Visiter nos écoles, Candidater en ligne, Calendrier,
   Parents · Espace Eduka ↗, Recrutement `/recrutement` placeholder); "L’école" (Le réseau EBM,
   Pédagogie, L’école du dehors, Grandir aux EBM, Après les EBM); "Campus de Casablanca"
   (Route d’Azemmour, Km 13, Ouled Azzouz, Dar Bouazza · +212 522 64 12 12 ·
   fondamental@ecolebelge.org · secondaire@ecolebelge.org); "Campus de Rabat" (Avenue Sophora,
   Hay Riad, Secteur 23, 10110 Rabat · +212 537 717 278 · ebmrabat@ecolebelge.org).
   Bottom charcoal bar: partners image (alt "Partenaires : Fédération Wallonie-Bruxelles,
   Wallonie-Bruxelles International, AEBE"), "© 2026 Écoles Belges au Maroc", Mentions légales
   `/mentions-legales`, Politique de confidentialité `/confidentialite`, Plan du site `/plan-du-site`.
   Headings in the footer are Avenir 700 15px (not Playfair).

## Populated inner pages (14 main pages, review drafts)

The 24–25 Oct 2026 first content pass replaced the whole-page placeholder notices with sourced
French content and scoped `components/inner/` blocks. Typed data and readiness records live in
`content/migration/`. Each main route remains `noindex, follow` while essential facts/media await
EBM review; the XML sitemap excludes them. Detailed scope, sources, missing material and checks
are in `CONTENT-MIGRATION.md`, `CONTENT-GAPS.md`, `CONTENT-SOURCES.json` and `CONTENT-ASSETS.json`.

| Route | Implemented focus |
|---|---|
| `/le-reseau` | Institutional framework, director, all four values, history and partners |
| `/pedagogie` | Approach, hash-linked maternelle/primaire/secondaire tabs, languages and support |
| `/ecole-du-dehors` | Casablanca approach, real gallery, source-qualified scope, contact/access |
| `/grandir-aux-ebm` | Activity-domain filter, dated stories, shared campus services and well-being |
| `/nos-campus` | Campus comparison, services, locations and photographs |
| `/nos-campus/casablanca` | Shared campus template, practical source records and contacts |
| `/nos-campus/rabat` | Same template; highest open secondary level explicitly to confirm |
| `/apres-les-ebm` | CESS/orientation, dated trip and historical brochure data; no invented alumni |
| `/admissions` | Six quick destinations, four-phase overview and applicant-only visit policy |
| `/admissions/comprendre` | Seven-step process, conditions and searchable FAQ at `#faq` |
| `/admissions/documents-et-frais` | Qualified checklist and undated campus/level/category fee finder |
| `/calendrier` | Signed 2026–2027 calendar, PDF, one-time ICS and visit-request guidance |
| `/admissions/candidater` | Preparation and hosted Eduka handoff; no custom document collection |
| `/contact` | Correct service contacts, address searches and local e-mail request composer |

Campus pages still share `nos-campus/[campus]/page.tsx`, with canonical migration practical data
in `src/content/migration/campuses.ts` and unchanged incumbent site/contact assets. The preserved
home campus sections were not rewired or changed.

Support pages: legal/privacy are intentional review drafts; recruitment has no unverified live
jobs; `/reserver-une-visite` prepares an applicant request through the visitor’s mail application,
not a booking. `/recherche` searches the new pages and FAQ. The existing `/plan-du-site` directory,
Eduka sign-in handoff and designed 404 remain available. Requests never produce a fake sent or
reserved state. No new backend, library or production deployment was introduced.

## Performance budget (the site must be fast)

- Editorial routes are pre-rendered where possible; query-context contact/visit/search pages
  may be request-rendered. Server Components by default. Client code covers header
  menus/search, mobile sheet/action bar, hero slider, the home scroll-scene driver, alumni
  deck, key-figure count-up, shared campus switcher, FAQ accordion, certificate-path trigger and video player. The age
  chooser and home admissions sequence are native HTML/CSS and need no client code. Inner pages
  add small islands for level tabs, activity filtering, FAQ search, fee/calendar selection and
  local e-mail composition; their long content stays server-rendered.
- The original ~120 KB gzip aspiration is below the current Next 16 + React 19 floor of
  ~133 KiB. The measured home first-load JS is 160.7 KiB gzip / 138.7 KiB Brotli after the
  native video controls build (24 Oct 2026, `npm run report:bundle`). Report the actual size after changes.
  No animation or carousel libraries; CSS transitions and small native drivers.
- LCP image: slide 1 via `next/image` with `priority`, `sizes="100vw"`, AVIF/WebP.
  Every other image lazy with explicit `sizes`. No layout shift: explicit dimensions/aspect.
- Fonts: `next/font` (self-hosted, `display: swap`), preload only Avenir 400 and the upright Playfair file.
- `next.config`: `images.formats = ['image/avif','image/webp']`, sensible `deviceSizes`.
- Targets: Lighthouse mobile performance ≥ 95, LCP < 2.0 s on a 4G profile, CLS < 0.05,
  accessibility 100.

## Accessibility

Semantic landmarks (header, nav, main, footer), one h1 per page, skip link "Aller au contenu",
`lang="fr"`, every icon-only button labelled, visible focus everywhere, menus operable by
keyboard, `aria-expanded`/`aria-controls` on triggers, slider controls labelled and its
region `aria-roledescription="carrousel"` with live slide label, reduced-motion respected,
contrast AA on photos (overlay) and on paper/cream grounds.

## SEO

`metadata` per route (title template "%s · Écoles Belges au Maroc"), canonical URLs from
`NEXT_PUBLIC_SITE_URL` (placeholder `https://www.ecolebelge.org`), Open Graph image (hero),
`sitemap.ts` (approved indexable routes only; migrated review drafts excluded while noindex), `robots.ts`, JSON-LD
`School` for each campus on the home page (name, address, telephone, url). No rich-result
promises.
