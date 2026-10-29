---
name: Écoles Belges au Maroc
description: Warm, clear, reassuring school website built on real campus photography, clay and olive.
colors:
  fired-clay: "#b85431"
  kiln-ink: "#9c4425"
  grove-olive: "#505940"
  dune-sand: "#d0a057"
  plaster-cream: "#ece0d3"
  riad-paper: "#f4f1ec"
  charcoal-ink: "#282828"
  walnut-grey: "#5f584f"
  hairline-linen: "#ece6de"
  chalk-white: "#ffffff"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 5.6vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.01em"
  h1:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.8vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.125rem, 3.6vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.2vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "Avenir Next, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.375
  lead:
    fontFamily: "Avenir Next, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Avenir Next, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Avenir Next, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
  figure:
    fontFamily: "Avenir Next, system-ui, sans-serif"
    fontSize: "42px"
    fontWeight: 700
    lineHeight: 1.1
    fontFeature: "tnum"
rounded:
  ui: "4px"
  full: "9999px"
spacing:
  gutter: "clamp(20px, 4vw, 40px)"
  section: "clamp(88px, 10vw, 140px)"
  header: "76px"
  tile-gap: "12px"
components:
  button-primary:
    backgroundColor: "{colors.fired-clay}"
    textColor: "{colors.chalk-white}"
    typography: "{typography.label}"
    rounded: "{rounded.ui}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.kiln-ink}"
  button-primary-large:
    backgroundColor: "{colors.fired-clay}"
    textColor: "{colors.chalk-white}"
    rounded: "{rounded.ui}"
    padding: "0 26px"
    height: "52px"
  button-outline-dark:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.ui}"
    padding: "0 18px"
    height: "44px"
  button-outline-dark-hover:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "{colors.chalk-white}"
  button-outline-light:
    backgroundColor: "transparent"
    textColor: "{colors.chalk-white}"
    rounded: "{rounded.ui}"
    padding: "0 26px"
    height: "52px"
  button-outline-light-hover:
    backgroundColor: "{colors.chalk-white}"
    textColor: "{colors.charcoal-ink}"
  main-bar:
    backgroundColor: "{colors.chalk-white}"
    textColor: "{colors.charcoal-ink}"
    height: "76px"
  nav-trigger-active:
    textColor: "{colors.kiln-ink}"
  highlights-panel:
    backgroundColor: "{colors.chalk-white}"
    textColor: "{colors.charcoal-ink}"
    padding: "36px 40px"
  figures-band:
    backgroundColor: "{colors.riad-paper}"
    textColor: "{colors.fired-clay}"
    typography: "{typography.figure}"
  footer:
    backgroundColor: "{colors.riad-paper}"
    textColor: "{colors.charcoal-ink}"
  footer-bar:
    backgroundColor: "{colors.charcoal-ink}"
    textColor: "rgba(255, 255, 255, 0.82)"
---

# Design System: Écoles Belges au Maroc

## Overview

**Creative North Star: "The Sunlit Courtyard"**

The site opens the way a school courtyard does at mid-morning: real light on real buildings, children crossing it, and a calm order around them. Full-bleed photographs of the Casablanca and Rabat campuses carry the emotion; the interface stays quiet, white and well kept around them. Clay and olive come from EBM's brand guide and are used sparingly, so the colour always means something: an action, the current place, a figure worth remembering.

The voice is warm, clear and reassuring. Parents comparing schools on a phone should feel the seriousness of a Belgian curriculum without any coldness: a classic serif for the few big titles, a friendly geometric sans for everything else, generous section spacing, sentence-case labels and static, rectangular buttons that never perform. Nothing glows, slides on hover or asks for attention it has not earned.

The approved reference is the "version 2" canvas board: dark top bar, white header with dropdown menus, photo slider with an overlapping highlights panel, collage, figures, Instagram preview, photo call-to-action band and a light footer. The code reproduces it, minus its small uppercase eyebrow labels, which the system rejects. On 23 Oct 2026 Ayoub replaced the collage with his own scroll scene (ANIMATION 1-3, after korowa.vic.edu.au) and asked for a Korowa-style card deck for the alumni stories; both speak a second, louder voice described under Components.

**Key Characteristics:**
- Photography leads; every photo is a real EBM campus picture, square-cornered and full-bleed or in a collage.
- Two typefaces only: Playfair Display for titles, Avenir Next for everything else.
- Fired Clay marks action and position; it never fills large surfaces.
- One lifted element per view (the highlights panel); everything else sits flat on white, Riad Paper or charcoal.
- Motion belongs to scenes (the hero crossfade, the experience scene, the alumni deck), never to controls.
- Mobile first: the two bar actions, Calendrier and Candidater, are always one tap away; the visit is booked from the Admissions menu.

## Colors

An earthy, sun-warmed palette: one clay accent with its deeper ink, an olive counterpoint, and warm neutrals instead of greys.

### Primary
- **Fired Clay** (#b85431): primary buttons ("Candidater", "Réserver une visite"), the 3px underline of the active menu, the 3px top border of dropdown panels, the key-figure numbers and the large decorative circle outline of inner-page heroes (at 35% opacity). White text on it reaches 4.8:1.
- **Kiln Ink** (#9c4425): hover state of every Fired Clay button, active and hovered menu text, and every small text link on white or Riad Paper (6.4:1 on white, 5.7:1 on paper). Use it wherever clay must be read as text; Fired Clay itself is for fills and large numbers.

### Secondary
- **Grove Olive** (#505940): the checklist ticks in the about section and the small decorative circle outline of inner-page heroes (at 40% opacity). A supporting accent, never a fill.

### Tertiary
- **Dune Sand** (#d0a057): part of EBM's brand palette and defined as a token, reserved for small highlights. No built component uses it yet.

### Neutral
- **Charcoal Ink** (#282828): body text and headings (14.7:1 on white), the footer bottom bar, the outline-dark button and the base of every photo overlay.
- **Walnut Grey** (#5f584f): secondary text, intros under headings, labels of the figures, footer addresses and placeholders (7.0:1 on white, 6.2:1 on paper).
- **Riad Paper** (#f4f1ec): the light bands: key figures, footer ground, inner-page heroes, the stage bands, and the hover fill of menu links.
- **Plaster Cream** (#ece0d3): the background of collage photos while they load, the hover fill of light buttons, the soft accent fill.
- **Hairline Linen** (#ece6de): every border and divider: the line under the main bar, separators between stacked highlights on phones, sheet and accordion rules.
- **Chalk White** (#ffffff): the page ground, cards, panels and the main bar.

### Named Rules
**The Logo-Only Rule.** The logo's own colours (#F1A804 yellow, #E02B2F red, #2B4A99 blue, with its charcoal) live only inside the logo artwork. They never become UI colours.

**The Clay Means Action Rule.** Fired Clay appears only where it says "act here" or "you are here": buttons, the active menu, dropdown borders, the contact block, the figures. No clay section backgrounds, no clay body text. One exception, Ayoub's own design: the full-screen clay stage of the experience scene.

**The Measured Overlay Rule.** White text sits on a photo only over a charcoal overlay measured against that photo's brightest pixels. The hero uses 50% charcoal plus a deepening gradient where the text sits (45% to 32% to 15% from the bottom on phones; 45% to 30% to 10% from the left from 768px), which keeps the paragraph at 4.8:1 or better and the title at 4:1 or better on all three slides at 360 to 1920px. The CTA band uses a flat 66%. Re-measure whenever a slide or band photo changes.

## Typography

**Display Font:** Playfair Display (Times New Roman as the size-adjusted local-font fallback)
**Body Font:** Avenir Next, self-hosted from EBM's files (size-adjusted Arial as the fallback, then system-ui)

**Character:** A high-contrast transitional serif for the big statements, set tight and balanced, against a clean, round geometric sans that keeps every label and paragraph friendly and legible. The serif gives the curriculum its authority; the sans makes it approachable.

### Hierarchy
- **Display** (Playfair 600, clamp(40px, 5.6vw, 76px), line-height 1.06, -0.01em): the home hero title only, max 11em wide, balanced wrapping. The 40px floor keeps "Un enseignement" on one line from 360px wide.
- **H1** (Playfair 600, clamp(40px, 4.8vw, 64px), 1.08): the title of every inner page and the 404.
- **H2** (Playfair 600, clamp(34px, 3.6vw, 48px), 1.1): section titles of the inner pages, and the home's closing CTA band ("Prêt à rejoindre les EBM ?").
- **Home section title** (25 Oct 2026; `SectionHeading`, `components/home/emphasis.tsx`): Avenir 600, clamp(36px, 4vw, 56px), line-height 1.04, -0.025em, with one accent word in Playfair italic (clay on light grounds, a light tint on olive), no full stop: "Un seul parcours, *de 2 à 18 ans*", "Questions *fréquentes*", "Actualités & *projets*". Every home section uses it, so the page speaks in one voice between the Playfair hero and the Playfair CTA band.
- **H3** (Playfair 600, clamp(24px, 2.2vw, 30px), 1.2): large sub-titles only, such as the site map groups.
- **Title** (Avenir 700, 18px, 1.375): headings inside panels and cards (the three highlights). Footer headings use the same voice at 15px.
- **Lead** (Avenir 400, clamp(17px, 1.4vw, 19px), 1.55): the paragraph under a hero or section title, max 32 to 34em.
- **Body** (Avenir 400, 16px, 1.6): running text, measure 60 to 70ch; secondary copy at 14 to 15px in Walnut Grey.
- **Label** (Avenir 700, 15 to 16px; nav triggers and header links 600 at 15px): buttons, menu triggers, "En savoir plus" links. Always sentence case.
- **Figure** (Avenir 700, 42px, 34px on phones, tabular numerals, Fired Clay): the four key figures.

### Named Rules
**The Two Voices Rule.** Exactly two families. Playfair is reserved for h1, h2 and large h3; panel, card, footer and navigation headings stay in Avenir, even when they are h2 elements for structure. Exception: the mixed headings of home sections 2 and 3 (Avenir 600 with Playfair Display italic 400 accent words, marked `*word*` in content).

**The Sentence-Case Rule.** No uppercase letter-spaced labels and no eyebrow line above a heading. A heading speaks alone. Exception: the three-dot uppercase labels and the tracked white button of home sections 2 and 3, from Ayoub's mock-ups.

**The French Typesetting Rule.** Typographic apostrophe (’), a narrow no-break space (U+202F) before ? ! : ; and as the thousands separator ("2 000"), ellipsis character (…) in placeholders.

## Layout

A centred column of 1240px including its side gutters (clamp(20px, 4vw, 40px)), on a white page. Sections breathe vertically with clamp(88px, 10vw, 140px), with more space above a title than below it. Full-bleed is reserved for photographs: the hero, the CTA band, and the charcoal and white bars that frame the page.

Breakpoints follow Tailwind: 640px (sm), 768px (md), 1024px (lg, desktop navigation), 1280px (xl, the header's Calendrier button and five footer columns), 1440px (the header's link labels), plus 1360px, from which the hero arrows move from the control row to mid-height on the edges.

- **Header:** one white bar (64px on phones, 76px from 1024px) pinned at the top, frosted once the page has scrolled; its content uses the wide container (1440px incl. gutters).
- **Hero:** min(86svh, 760px) tall, never under 560px; content left-aligned in the column, vertically centred, with bottom padding that reserves the panel overlap.
- **Highlights panel:** pulled up over the hero by 48px on phones and 96px from 768px; stacked rows on phones, three columns from 768px (icon above the text), icon beside the text from 1024px.
- **Statement band:** white room under the highlights panel, then a full-width Fired Clay band (88 to 160px padding) with the page column: a 13px white line, then the statement at up to 23em wide.
- **School stages:** a centred mixed heading, then a block wider than the page column (90rem with gutters) holding three panels with 48px top corners (32px on phones), clamp(440px, 70svh, 680px) tall from 768px; stacked on phones.
- **About (experience scene):** white room above, then a full-screen clay stage pinned for two more screens. The text is centred in what the sticky bars leave visible. Corner photos are placed in percent of the stage from the 16:9 mock-up (bands above and below the text on portrait screens); the focus window is 59% by 40% of a landscape stage, 88% by 38% of a portrait one.
- **Alumni (deck):** centred heading block, then the deck: cards 280 to 420px wide (80vw, 340px max on phones), the front card centred (on the page column on phones, the stack peeking at the right edge), controls 36px under it.
- **Key figures:** one Riad Paper band, max 1160px, 2 by 2 on phones and tablets, 4 across from 1024px, cells divided by 1px white lines.
- **Instagram preview:** six square tiles, 3 per row on phones, 6 from 1024px, 12px gaps.
- **CTA band:** text and buttons stacked on phones, side by side from 1024px; buttons full width on phones.
- **Footer:** 1 column on phones, 2 from 640px (brand spanning both), 4 from 1024px (brand on its own row), 5 from 1280px.
- **Phones:** a frosted action bar with "Calendrier" and "Candidater" appears once the hero buttons have scrolled away and reserves its own height at the end of the page.

## Elevation & Depth

Flat by default. Depth comes from photography under overlays and from tonal bands (white, Riad Paper, charcoal), not from stacked cards. Shadows are warm (rgb 40 30 20), long, soft and pushed downward, so lifted things look like paper in daylight, never like glowing UI. Translucency exists only on the two bars that float over content: the frosted main bar after scroll and the phone action bar.

### Shadow Vocabulary
- **Panel lift** (`box-shadow: 0 24px 60px -24px rgb(40 30 20 / 0.28)`): the highlights panel over the hero, the placeholder notice on inner pages, the mobile menu sheet.
- **Dropdown** (`box-shadow: 0 24px 48px -20px rgb(40 30 20 / 0.3)`): desktop menu panels.
- **Frosted bar** (`box-shadow: 0 12px 32px -24px rgb(40 30 20 / 0.4)` with white at 85%, backdrop blur and 150% saturation): the main bar once scrolled.
- **Action bar** (`box-shadow: 0 -12px 32px -24px rgb(40 30 20 / 0.35)` with white at 90% and backdrop blur): the phone action bar, casting upward.

### Named Rules
**The One Lift Rule.** At most one lifted surface per view. Buttons, tiles, photos and figures never carry a shadow, and nothing gains a shadow on hover.

## Shapes

Quiet geometry. Buttons and fields have small 4px corners; photographs, panels, bands and tiles are square-cornered. Circles appear only where they mean something round: the 48px slider controls with their thin white outline, and the two 1.5px decorative circle outlines (Fired Clay at 35%, Grove Olive at 40%) that sit in the inner-page heroes, never covering a photo.

### Named Rules
**The Square Photo Rule.** Photographs are never rounded, masked into shapes or cut out. They are full-bleed, or rectangles in a grid. Exception: the school-stages block has rounded top corners, from Ayoub's Korowa screenshot. Since 29 Oct 2026 the home school-path band (Ayoub's mock-up) shows each stage's photo in a circle with two Fired Clay circles behind it, and its children photo is a cutout.

## Components

### Buttons
Static and confident: solid rectangles with bold sentence-case labels that only change colour.
- **Shape:** small 4px corners; heights 44px (header, bars, compact) and 52px (hero, CTA band, page actions); label Avenir 700 at 15 to 16px.
- **Primary:** Fired Clay fill, white label, 20px side padding (26px at 52px). Hover: Kiln Ink fill. The main action everywhere ("Candidater", "Réserver une visite", "Visiter nos écoles").
- **Outline dark:** transparent with a 1.5px Charcoal Ink border on light grounds ("Calendrier" in the header and the phone bar). Hover: charcoal fill, white label.
- **Outline light:** transparent with a 1.5px white border at 85% on photos ("Candidater en ligne" in the hero and CTA band). Hover: white fill, charcoal label.
- **Icon (ghost):** 44 by 44px, no fill, Riad Paper on hover, always with an accessible name (search, menu).
- **Focus:** a 2px Kiln Ink outline 3px outside the shape; white on dark or photo grounds. Colour transitions only (200ms); no movement, no scale, no shadow.
- Light (white fill) and dark (charcoal fill) variants exist in the code but are not used on the built pages.

### Inputs / Fields
- **Search:** no field in the header since 24 Oct 2026: "Rechercher" is a link to the search page (`/recherche`), which holds the field.

### Navigation
- **No top bar** (since 24 Oct 2026, at Ayoub's request): the charcoal strip with phones, Calendrier, Espace Eduka and "Nous contacter" is gone. Phones, e-mails and "Nous contacter" are in the footer; Eduka and Calendrier moved into the main bar.
- **Main bar:** logo on the left, four menu triggers (L’école, Nos campus, Vie scolaire, Admissions) in Avenir 600 at 15px with a 14px chevron, then, after Ayoub's reference screenshot: "Rechercher" and "Espace Eduka" (the login, new tab) as a 22px Fired Clay line icon followed by the label in the triggers' voice (labels from 1440px, icons only below), a thin divider, the outline "Calendrier" button (from 1280px) and "Candidater". The bar uses the 1440px wide container. Hover turns a trigger Kiln Ink; the current section gets Kiln Ink text and a 3px Fired Clay bottom border.
- **Dropdown panels:** white, 3px Fired Clay top border, dropdown shadow, at least 270px wide, links in Avenir 500 at 15px with Riad Paper and Kiln Ink on hover. They fade in over 150ms; hover opens after a short intent delay; keyboard and click work too.
- **Phones and tablets (under 1024px):** logo, search icon, Eduka login icon and menu button; the menu is a full-height sheet from the right with the four groups as accordions, Espace Eduka, then Calendrier and Candidater pinned at the bottom.
- **Phone action bar:** frosted white with two equal 44px buttons (outline dark "Calendrier", primary "Candidater"), above the home-indicator inset, sliding up over 300ms.

### Hero Slider (signature)
Three full-bleed campus photographs under the measured overlay, crossfading over 900ms every 7 seconds. The active photo settles slowly from 104% to 100%. Autoplay stops on hover, on keyboard focus, in a hidden tab and under reduced motion, and a visible pause button always controls it. Round 48px controls with a thin white outline (charcoal at 30% inside, white fill on hover); a three-dash indicator in white. Only the first photo loads with the page.

### Highlights Panel (signature)
One white panel, not three cards, lifted over the bottom of the hero with the panel shadow. Three columns, each with a 40px line icon (1.4px stroke, charcoal), an Avenir 700 title at 18px, a 15px Walnut Grey sentence and an "En savoir plus" link (Avenir 700 at 14px with a 14px arrow) that turns Kiln Ink and underlines on hover.

### Espace Eduka Page (Ayoub's request)
The login page behind the header's person icon (`/espace-eduka`). Two halves from 1024px: on the left, a photo of students entering the Rabat campus, pinned under the header at the screen's height, with a measured bottom scrim, the white dotted label, a mixed heading ("Toute la scolarité, *au même endroit.*") and three checked points (what Eduka holds: the application and its follow-up, admission decisions and enrolment, billing); on the right, on Riad Paper, one white card with the card shadow: dotted label, mixed h1 "Connexion à votre *espace famille*", a lead, the full-width primary "Se connecter" button (to Eduka's sign-in page, same tab), a lock icon with the address to check (ecolebelge.eduka.school), then three help rows with Fired Clay line icons (forgotten password, new family → Candidater en ligne, help → Nous contacter). Phones: the card first, the photo panel under it. No password field anywhere on the site: families type it on Eduka only. Entrance: the photo settles, the card's contents rise in 60ms apart.

### Search Overlay (Ayoub's request)
"Rechercher" in the header opens it (a plain link to the search page without JavaScript). The page dims (charcoal at 50%) and a Fired Clay panel drops from the top (700ms, ease-out-expo): full screen on phones, at least 600px tall elsewhere. Then, staggered: the magnifier pops in with a small overshoot, the big white field rises in with its caret blinking (Avenir 600, 22 to 72px, placeholder "Que cherchez-vous ?"), a white underline draws from left to right, and the frequent searches (outline-light 44px buttons) cascade in; tapping one types it. Typing shows up to six matching pages as rows (menu name, title with the typed words underlined, purpose, arrow), each new row sliding up; the magnifier nudges on every keystroke. Enter opens the first result, arrow keys move through the rows, Escape or the round close button lifts the panel back up (450ms, ease-in). All text is pure white (4.8:1). The dialog chunk loads on demand.

### Intro Curtain (Ayoub's design)
On the first page load of a browser session, whatever the page: a full Fired Clay screen above everything but the skip link (z-90), with the white one-colour stacked logo (200 to 340px wide) rising into the middle through a mask (0.9s, ease-out-expo). After a short hold the whole screen slides up by its own height and out through the top (1s, ease in-out), the logo drifting up a little faster as it fades, while the page underneath rises 6vh into place. 2.3s in all, CSS only, never blocks a click (pointer-events none), hidden for good at the end. Not shown again in the same session, nor under reduced motion.

### Statement Band (Ayoub's design)
After the band under Korowa's hero. Fired Clay ground; a small white factual line (who, where, what) and one big sentence in Avenir 500, Riad Paper, with Playfair italic accent words ("Un *enseignement belge* exigeant, dans une *école bienveillante*. […] *prêts à ouvrir leurs horizons.*"). Paper on clay is 4.3:1, allowed for large text; the small line is white (4.8:1). No motion.

### School Stages (Ayoub's design)
After Korowa's "From first steps to future leaders". Mixed heading "Un seul parcours, *de 2 à 18 ans*" with a Fired Clay accent, then three photo panels, each one link: Maternelle (de 2 à 6 ans), Primaire (de 6 à 12 ans), Secondaire (de 12 à 18 ans, jusqu’au CESS), pointing to the pedagogy page. With a mouse, a panel at rest is its photo with the stage name in white Avenir 600 over a measured top scrim (3:1 or better even over a white ceiling); hover or keyboard focus slides a Riad Paper band down from the top (stage in Playfair italic, ages in Avenir 600), pushes the photo down by the band and washes the other two panels with white at 40%. On touch screens and phones the band is always shown above the photo. CSS only.

### Experience Scene (signature, Ayoub's design)
Ayoub's own mock-ups (ANIMATION 1-3, 23 Oct 2026), after the "Korowa experiences" scene on korowa.vic.edu.au. The stage pins on a full Fired Clay screen with, centred: three touching white dots and an uppercase label ("De la maternelle au CESS"), a two-line mixed heading in Avenir 600 with Playfair italic accent words ("Apprendre *ici*, réussir *partout*", up to 9.5rem, capped at 15svh), and a white button with a Fired Clay uppercase label tracked at 0.3em, 8px corners ("Découvrir nos campus"). Scrolling, four EBM photos slide in from their own corners and bleed off the edges while the focus photo (the diploma ceremony) rises behind the text as a wide window; then the window opens to the whole screen and its photo grows to full size, covering the corners. A measured charcoal scrim (66% to 42% of the height, 50% from 70%) keeps the label at 4.5:1 or better and the heading at 3:1 or better at every step. Without JavaScript or under reduced motion, the collage stays still.

### Alumni Deck (signature)
After the "News from Korowa" deck. On white: the dotted label ("Après les EBM"), a mixed heading with a Fired Clay accent word ("Ils ont *grandi* aux EBM"), a lead and the placeholder notice, centred. The current story card sits in front; the next two are stacked behind it to the right, each 52% of a card further (9% on phones), tilted 2 degrees more, a little smaller and shaded; past cards leave to the left. Cards: white, hairline border, 14px padding, the card shadow, a 5:4 photo, a Plaster Cream pill ("Études" or "Carrière") and the promotion, the quote in Avenir 600 between « », the name in bold and the path. Arrows (disabled at the ends, no loop) and one dot per card underneath; a click on a stacked card, a 60px drag or swipe, and the arrow keys also move through it. Then the outline button "Découvrir Après les EBM".

### Key Figures
A Riad Paper band split by 1px white lines; each cell has a 36px line icon (1.4px stroke), the figure in Fired Clay (Avenir 700, 42px, tabular numerals) and its label in Walnut Grey at 14px underneath. The numbers count up once, the first time the band is well inside the screen: from 0 to 2 000, 118 and 2, and from 2000 to 2014 for the founding year (a year counted from 0 would read as a quantity). 1.6s each, ease-out, 120ms apart. An invisible copy of the final value keeps the width, so nothing shifts; screen readers, no-JS and reduced motion get the final values.

### Instagram Preview
Six square photo tiles linking to the school's account, 12px apart, with a Riad Paper ground while loading; the photo eases to 103% on hover (700ms, pointer devices, motion allowed). A Kiln Ink "Suivre @ecolesbelgesaumaroc" link with an arrow icon sits beside the H2. Static until the feed is connected.

### CTA Band
A full-bleed campus photograph under a flat 66% charcoal overlay, white H2 and lead, then the two priority actions (primary and outline light). Shared by every page.

### Footer
Riad Paper ground: the stacked logo with the one-sentence statement and the Instagram link, "Accès rapides" and "L’école" link lists (15px, Kiln Ink and underline on hover), and the two campus addresses with underlined phone and e-mail links. Headings in Avenir 700 at 15px. Then a charcoal bar with the white partner logos (Fédération Wallonie-Bruxelles, WBI, AEBE), the copyright and the legal links in white at 82%.

### Page Hero (inner pages)
A Riad Paper band with a breadcrumb (14px Walnut Grey, chevron separators), the page H1 and a lead, with the two decorative circles on the right from 1024px. Placeholder pages follow it with a white "Page en préparation" notice carrying the panel shadow.

## Homepage UX simplification (latest, 24 Oct 2026)

Ayoub replaced the dense age/campus tool and institutional table with direct age bands and a
connected certificate diagram. The guide offers 2–5, 6–11 and 12–18 years, each with one real
EBM photo, three short points and an admissions-steps link. Native radio controls use the
existing clay active colour, a check and a visible keyboard-focus outline. Age numbers are
26–40px on desktop and 25px on phones; phone units share a second line. The selection has no
slider, campus question or client JavaScript. The CEB, CE1D and CESS form one linked rail,
horizontal on desktop and vertical on phones. Ayoub's latest request gives this section an
olive-green field (#505940), white text and warm orange (#F3A766) connections/checkpoints.
The lighter orange has 3.70:1 contrast against olive; white text has 7.38:1. This local orange
is an intentional extension for the requested path, not a change to the primary button colour.
On viewport entry, the orange rail draws from CEB through CE1D to CESS over 2.3 seconds,
lighting each checkpoint as reached. The sequence runs once. A small `certificate-path.tsx`
client wrapper arms CSS animations; all content remains server-rendered and visible. Without
JavaScript, with reduced motion, or if reduced motion is enabled during the sequence, the
complete path is shown immediately. The green certificate section meets the following
Fired Clay experience scene directly, with no white spacer between their backgrounds.

The video is a large 16:9 feature above the FAQ (minimum 200px high on small screens, explicit
100% width). It autoplays muted on its first arrival in view, then exposes YouTube's native
controls directly to pointer and keyboard users. There is no overlaid restart CTA, forced
seek, forced unmute or custom preview pause button. Leaving view pauses playback; native
controls own resumption, so returning to the section does not override a user's pause.
Reduced motion or blocked autoplay keeps a poster with a labelled icon-only Play control.
The direct YouTube fallback remains. The FAQ is now ten white cards on paper, with 12px corners (an intentional
exception requested by Ayoub), 16–17px questions and one expanding answer at a time. Answers
slide down over 300ms and close over 240ms; reduced motion removes the travel. A plus turns
to a close mark for the active card. The all-questions link follows the cards on phones.

This update supersedes the earlier age-tool/table/FAQ descriptions below; it keeps the EBM
palette, imagery and typefaces. See `docs/HOME-UX-UPDATE.md` for implementation and verification.

### Shared campus frame (latest, 24 Oct 2026)

Casablanca and Rabat now occupy one frame instead of successive full-screen chapters.
Casablanca starts on Olive Grove with Rabat's small photo peeking from the right edge in
a native button. Selecting Rabat slides Casablanca left while Rabat enters the main frame;
Casablanca becomes an equally sized thumbnail on the left, with a left-pointing arrow.
The same button moves to the left edge, keeping focus; selecting it returns to Casablanca
and restores Rabat's preview on the right. Each full-panel slide lasts 850ms while the field
fades between olive and charcoal (#282828) over 900ms. Preview arrival fades soften each edge
change; the main photo reserves room on the side holding the preview.
The place name uncovers word by word through masks; facts, the short description and the
campus-page link follow in a stagger. The title retains one intact accessible text string.

Touch users can swipe horizontally between campuses while vertical pan and pinch zoom
remain native. The inactive panel is inert and hidden from assistive technology; a short
live status names the selected campus. The moving control retains keyboard focus. Reduced
motion removes all transition delays and travel; without JavaScript, Casablanca and direct
links to both campus pages remain available. The shared frame has no scroll-driven inset.
Implementation: `campus-chapters.tsx`, `campus-switcher.tsx` and `campus-chapters.module.css`.

### Admissions sequence (latest, 24 Oct 2026)

The decorative square diagram is replaced by a direct numbered ordered list: prepare a
candidature, meet the team, then receive the decision and confirm after admission. Shorter
verified copy preserves eligibility from 2 years through 1re secondaire, available places,
the age-adapted observation, and the commission decision. The existing clay application
button and quiet details link follow the steps.

The Playfair h2 and real Rabat entrance photo sit on the left on desktop, with the Avenir
steps/actions on the right. Phones show heading, steps/actions, then photo. An olive strip
under the photo carries the existing “Une admission est un dialogue. Sans test sélectif.”
reassurance. There is no decorative process animation or new JavaScript: this is a static
Server Component. The unused `admissions-diagram.ts` is removed.

## Homepage completion notes (earlier pass, 24 Oct 2026)

At this earlier pass, the home gained an age/campus pathway tool, semantic Belgian guarantee
table, two campus chapters (superseded by the shared frame above), the network director's full letter, admissions steps and a FAQ/video
section. These use the established clay, paper and cream palette, real EBM photography and
two-family typography. The table stacks by row on phones; the FAQ's full-questions link
follows the answers on phones. CSS section reveals remain visible without animation support
and under reduced motion.

School-stage links retain an explicit stage/age accessible name. On pointer devices their
parked hover band uses both opacity and visibility; hover and keyboard focus reveal it.
The existing stage design intentionally uses 32/48px panel corners, a 28–36px fluid band
title and 14px age text. These are approved exceptions to the default square-photo/type rules.
The photograph scrim is for legibility, not decoration.

At that earlier pass, the admissions heading took six desktop columns; the sequence above
supersedes that layout. The director's
portrait keeps the sticky outer wrapper, with a separate relative aspect-ratio wrapper for
`next/image fill`. Playfair Display is now loaded locally from the same production Latin
WOFF2 files (upright 500–600, italic 400), with its OFL licence. Avenir Next remains unchanged.

See `docs/HOME-FINISH.md` for test results and the inspector's accepted exceptions. Preserve
the approved mixed headings, signature scroll collage and branded controls when continuing.

## Do's and Don'ts

### Do:
- **Do** use only Playfair Display (h1, h2, large h3) and Avenir Next (everything else).
- **Do** keep Fired Clay (#b85431) for actions, the active state and the key figures, and use Kiln Ink (#9c4425) whenever clay must be read as small text.
- **Do** keep Calendrier and Candidater in the header and the phone action bar, and a visit or apply action in the hero and the CTA band.
- **Do** measure white-on-photo contrast against the photo's brightest pixels and keep text at 4.5:1 or better (3:1 for titles), as the hero and CTA band overlays do.
- **Do** draw icons as 1.5px line icons on a 24px grid (lucide or authored SVG; 1.4px for the 36 to 40px feature icons), decorative and hidden from screen readers.
- **Do** use real EBM campus photography with explicit dimensions, and show unknown facts as a visible [placeholder].
- **Do** keep 4px corners on buttons and fields and square corners on photos, panels and tiles.
- **Do** honour reduced motion: no autoplay, no settle, instant transitions, scroll scenes replaced by their still layouts.

### Don't:
- **Don't** add eyebrow or kicker labels above headings, uppercase letter-spaced labels or section numbers.
- **Don't** use gradient text, decorative gradients, glows or glass as decoration; the only gradients are the measured photo scrims.
- **Don't** move, scale or lift buttons on hover or press, and don't add magnetic, rolling or bouncing controls.
- **Don't** add scroll hints or floating UI chips over photographs.
- **Don't** use emoji or Unicode characters as icons.
- **Don't** use the logo's yellow, red or blue outside the logo artwork.
- **Don't** add a third typeface, or set panel, card, footer or navigation headings in Playfair.
- **Don't** round, mask or cut out photographs.
- **Don't** add a dark mode: the site is light only, read in daylight on phones.
