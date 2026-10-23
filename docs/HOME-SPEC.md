# Home page + site shell: build spec

Source of truth for the coded home page, the shared header/footer, and the 14 placeholder pages.
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
| charcoal | `#282828` | text, top bar, dark buttons, footer bottom bar |
| ink-soft | `#5F584F` | secondary text on light grounds (≥4.5:1 on white and paper) |
| hairline | `#ECE6DE` | borders |
| white | `#FFFFFF` | page ground, cards |

Logo colours (#282828, #F1A804, #E02B2F, #2B4A99) appear only inside the logo artwork.

Typography: exactly two families.
- **Playfair Display** (Google, self-hosted by `next/font/google`, weights 500 + 600, latin +
  latin-ext): h1, h2, large h3 and display headings only. Weight 600, letter-spacing -0.01em,
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

External: Espace Eduka (parents) `https://ecolebelge.eduka.school/` (opens in a new tab,
↗ drawn as an icon, not a glyph). Instagram `https://www.instagram.com/ecolesbelgesaumaroc/`.

## Header (shared, every page)

1. **Top bar**: charcoal, 40px, 13px text, white at 86% opacity. Left: phone icon +
   "Casablanca +212 522 64 12 12" (`tel:+212522641212`), "Rabat +212 537 717 278"
   (`tel:+212537717278`, hidden < 640px). Right: "Calendrier" (`/calendrier`), user icon +
   "Espace Eduka" (external), "Nous contacter" (`/contact`) as a terracotta block button.
   The top bar scrolls away; it is not sticky.
2. **Main bar**: white, 76px, sticky. Logo left (height ~38px, links `/`). Four menu
   triggers with a chevron; each opens a dropdown panel (white, 3px terracotta top border,
   soft shadow) listing its links. Hover opens on pointer devices with a short intent delay;
   click/Enter/Space/ArrowDown open; Escape closes and returns focus; links are reachable by
   Tab/arrows. Active section gets a 3px terracotta bottom border + terracotta-ink text
   (pass the active section from the page). Right: search field look-alike (paper ground,
   "Rechercher…", magnifier) that submits to `/recherche?q=`; "Visiter" outline button
   (`/calendrier`); "Candidater" terracotta button (`/admissions/candidater`).
   On scroll past the top bar the main bar turns translucent white with backdrop blur and a
   hairline/shadow (frosted). Use a tiny client component for the scroll state only.
3. **Mobile (< 1024px)**: logo, search icon button, menu button (44px targets). Menu opens
   a full-height panel (Radix Dialog via shadcn Sheet) with the four groups as accordions,
   then Espace Eduka, Calendrier, phones. A **bottom action bar** (white, frosted, two equal
   buttons "Visiter l’école" + "Candidater") is pinned to the bottom on phones once the hero
   buttons have scrolled out of view; respects `env(safe-area-inset-bottom)`.

## Home page sections (top to bottom)

Seven sections, numbered as in `page.tsx` and the component comments. The highlights panel
that overlaps the hero is part of section 1.

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
2. **About, the experience scene** (redone 23 Oct 2026 from Ayoub's mock-ups `UI projects/EBM
   WEBSITE/ANIMATION 1.png` to `3.png`, modelled on the "Korowa experiences" scene of
   korowa.vic.edu.au). Pinned for 200lvh after white room under the highlights panel:
   (1) a full Fired Clay screen with, centred, three white dots + "DE LA MATERNELLE AU CESS",
   the h2 "Apprendre *ici*, réussir *partout*" (Avenir 600 + Playfair italic accents) and a
   white button "DÉCOUVRIR NOS CAMPUS" → `/nos-campus`; (2) four EBM photos slide in from the
   corners (cour de Casablanca, école du dehors, maternelle, sciences) while the diploma
   ceremony rises behind the text as a wide window; (3) the window opens to full screen.
   Ayoub asked for better, functional copy than his mock-up's placeholder text: label = the
   school range, heading = the promise, button = a real destination. Still collage
   (step 2) without JS or under reduced motion. The scrim over the focus photo is measured.
3. **Alumni deck** "Ils ont *grandi* aux EBM" (carousel redone 23 Oct 2026: Ayoub rejected
   the pinned horizontal scroll; his reference screenshot did not arrive, so the deck follows
   the "News from Korowa" card deck on his inspiration site). Dotted label "APRÈS LES EBM",
   mixed h2, lead, visible placeholder notice; six cards (5:4 photo, pill Études/Carrière,
   promotion, quote, name · path) stacked as a deck; arrows + dots, click on a stacked card,
   swipe/drag, arrow keys; no loop; then the outline button "Découvrir Après les EBM" →
   `/apres-les-ebm`. Stories are placeholders (`source: 'placeholder'`): real EBM photos,
   invented quotes, `[Prénom Nom]`, "Promotion 20XX".
4. **Key figures**: paper band inside the container (max 1160px), 4 cells with a drawn icon,
   number (Avenir 700, ~42px, terracotta, tabular numerals) and label: "2 000" élèves sur nos
   deux campus · "118" enseignants diplômés en Belgique · "2" campus, Casablanca et Rabat ·
   "2014" année de création du réseau. Use `<dl>`. (Figures come from EBM's current site;
   EBM to confirm before launch.) Count-up on first view (asked 23 Oct 2026): 0 → 2 000,
   0 → 118, 0 → 2, and 2000 → 2014 for the year (`countFrom` in the content).
5. **Actualités & projets** (Instagram block, like SAS): h2 "Actualités & projets", link
   "Suivre @ecolesbelgesaumaroc" + external icon; 6 square tiles (3 per row on phones, 6 on
   desktop) from `insta-*.jpg`, each linking to the Instagram account. This is a static
   preview until the Instagram feed is connected: keep the data in `src/content/home.ts`
   flagged `source: "placeholder"`.
6. **CTA band** (shared component, also used on placeholder pages): full-bleed
   `casablanca-cour-secondaire` photo, charcoal overlay ~62%, h2 "Prêt à rejoindre les EBM ?",
   paragraph "Rencontrez nos équipes, découvrez nos campus et commencez votre parcours
   d’admission.", buttons "Visiter nos écoles" (`/calendrier`) and "Candidater en ligne".
7. **Footer** (shared): paper ground, 4–5 columns: stacked logo + "Établissements scolaires
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

## Placeholder pages (14 main pages + system pages)

Each placeholder uses the shared header (correct active menu), a compact page hero (paper
ground, breadcrumb "Accueil / …", Playfair h1, one-line purpose from the blueprint), a clearly
labelled notice "Page en préparation" listing the sections the blueprint plans for that page,
then the CTA band and footer. Metadata `robots: { index: false }` until the page is real.

| Route | Title | Blueprint purpose (one line) |
|---|---|---|
| `/le-reseau` | Le réseau EBM | Qui est EBM : écoles belges au Maroc, programme de la Fédération Wallonie-Bruxelles. |
| `/pedagogie` | Pédagogie | Comment les enfants apprennent, de la maternelle à la fin du secondaire. |
| `/ecole-du-dehors` | L’école du dehors | L’école à ciel ouvert du campus de Casablanca. |
| `/grandir-aux-ebm` | Grandir aux EBM | La vie à l’école : activités, sport, arts, bien-être et services. |
| `/nos-campus` | Nos campus | Deux campus, une même exigence. |
| `/nos-campus/casablanca` | Campus de Casablanca | Dar Bouazza (shared campus template). |
| `/nos-campus/rabat` | Campus de Rabat | Hay Riad (shared campus template). |
| `/apres-les-ebm` | Après les EBM | Alumni, promotions et études supérieures. |
| `/admissions` | Admissions | Le point de départ du parcours d’admission. |
| `/admissions/comprendre` | Comprendre les admissions | Étapes, conditions et FAQ (ancre `#faq`). |
| `/admissions/documents-et-frais` | Documents & frais | Frais de scolarité et documents requis. |
| `/calendrier` | Calendrier & visites | Événements, visites et réservation. |
| `/admissions/candidater` | Candidater en ligne | Le dossier de candidature (aujourd’hui sur Eduka). |
| `/contact` | Contact | Joindre la bonne équipe, sur le bon campus. |

Campus pages: one dynamic route `src/app/(frontend)/nos-campus/[campus]/page.tsx` with
`generateStaticParams` for `casablanca` and `rabat`, data from `src/content/campuses.ts`.

System pages: `/mentions-legales`, `/confidentialite`, `/plan-du-site` (lists every route),
`/recherche` (placeholder results page reading `?q=`), `/recrutement`, `/reserver-une-visite`
(direct booking route placeholder), and a designed `not-found.tsx` (French copy, links home
and to Admissions).

## Performance budget (the site must be fast)

- Every public route static (SSG). No client JS except: header scroll state + menus,
  mobile sheet, hero slider, mobile action bar, the home scroll-scene driver (writes two CSS
  variables) and the alumni deck (positions server-rendered cards).
  Everything else is a Server Component.
- Home first-load JS ≤ ~120 KB gzip (report the build table; on Next 16 + React 19 the
  floor is ~133 KiB, the home ships 149.9 KiB). No animation libraries, no carousel
  libraries; CSS transitions + a few lines of React.
- LCP image: slide 1 via `next/image` with `priority`, `sizes="100vw"`, AVIF/WebP.
  Every other image lazy with explicit `sizes`. No layout shift: explicit dimensions/aspect.
- Fonts: `next/font` (self-hosted, `display: swap`), preload only Avenir 400 and Playfair 600.
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
`sitemap.ts` (real pages only; placeholders excluded while noindex), `robots.ts`, JSON-LD
`School` for each campus on the home page (name, address, telephone, url). No rich-result
promises.
