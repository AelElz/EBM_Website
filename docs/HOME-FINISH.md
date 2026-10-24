# EBM homepage completion — 24 October 2026

> Historical completion snapshot. The age guide, certificate display, video and FAQ were subsequently redesigned at Ayoub’s request. See [HOME-UX-UPDATE.md](HOME-UX-UPDATE.md) for the current behaviour.

Project: `/Users/ayoub/Documents/ayoub/EBM_Website`

Preview: <http://127.0.0.1:3100> while the local production server is running.

## Completed

Finished the homepage pass where Claude stopped, using the installed design-taste-frontend, frontend-design and Impeccable skills. Preserved the established EBM visual direction and Claude’s content additions.

- Fixed the school-stage hover panel: the parked band is now explicitly hidden, opens on hover or keyboard focus, and each link retains its stage and age range as an accessible name.
- Fixed the local font compilation failure by self-hosting the same Playfair Display Latin WOFF2 files already used by the production build, with their OFL licence. Avenir Next and the two-family design remain in place.
- Adjusted the desktop admissions heading to fit its intended two lines.
- Corrected the director portrait’s positioning wrapper for `next/image` while retaining its sticky layout.
- Added a visible note that school timetables are indicative and should be confirmed with the campus, because the source material contains differing times.

The homepage includes the age/campus picker, Belgian guarantee table, both campus chapters, director’s letter, admissions path, and FAQ with click-to-load video. Typed copy remains in `src/content/home-details.ts` and `src/content/journey.ts`.

## Verification

- `npm run typecheck`, `npm run build` and `npm run report:bundle` passed. The build generated 28 static pages; this does not mean all pages have finished content.
- Home first-load JavaScript: **162.5 KiB gzip / 140.2 KiB Brotli**. No new packages were installed.
- Production browser checks passed at **360, 390, 768 and 1440px**: no horizontal overflow, broken images or hidden section-reveal content; one H1; eight guarantee rows.
- Checked age limits, campus switching, hover and keyboard stage navigation, the scroll scene, reduced motion and server-rendered content with JavaScript disabled.
- The video starts with no iframe; activating it creates the privacy-enhanced YouTube embed and moves focus to it. External video playback was not validated.
- Reviewed desktop, tablet and phone screenshots, including the sections below the automated inspector’s capture range.
- Source/document whitespace checks passed. A repository-wide check also reports trailing whitespace in generated `.next` validator files; those generated files were left alone.

## Inspector findings and accepted design exceptions

The final browser inspector reports **1 FAIL / 6 WARN**, not a clean raw pass. The remaining failure is the guarantee heading passing behind the fixed mobile action bar during scrolling; the heading is fully readable after scrolling. It is an expected overlay rather than clipped section content.

Warnings concern existing approved mixed typography, fluid type sizes, the signature text/photo scroll composition, the longer tablet statement and secondary text that still meets AA contrast. The video warning comes from the deliberate click-to-load facade. Existing EBM palette, photo scrims, stage shapes, card treatments and intentionally closed menus were retained. The source linter flags the permitted neutral photograph scrim. Impeccable’s four advisory findings concern existing stage radii/type sizes; they do not indicate a new interaction failure.

## Remaining project work

- The other 14 main pages still have their existing placeholder content and noindex status.
- Alumni stories remain visibly labelled samples, awaiting authentic school-approved names, quotations and outcomes.
- Conflicting campus pupil/area figures and the visits/open-days policy remain unresolved. The homepage pass does not approve them for publication.
- CMS, live Instagram and service integrations remain future work. Admissions links do not imply a newly implemented admissions backend.
- Avenir Next web licensing still needs confirmation before launch. Launch performance targets have not been established by a Lighthouse run in this pass.

Project continuation notes are in `docs/HOME-FINISH.md`, with updated homepage order in `docs/HOME-SPEC.md` and status in `CLAUDE.md`. The existing Impeccable product metadata uses an older schema; no unrelated metadata migration was performed.
