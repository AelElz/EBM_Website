# EBM homepage UX update — 24 October 2026

Implemented in `/Users/ayoub/Documents/ayoub/EBM_Website`.

Preview: <http://127.0.0.1:3100/>

## Latest video interaction

The video autoplays muted on its first viewport arrival. Once playback starts, YouTube's
native iframe controls receive pointer events and keyboard focus directly; the overlaid
“Regarder depuis le début” CTA and custom pause control are removed. Clicking the running
video no longer forces a restart, seeking or unmute. Leaving view pauses playback, and
native controls own resumption so viewport re-entry cannot override a user's pause.

Reduced motion or blocked autoplay retains a poster with a labelled icon-only Play control.
The direct YouTube fallback remains. Source: `src/components/home/video-facade.tsx`.
The production build and TypeScript passed; source lint returned no failures or warnings.
Live YouTube checks confirmed muted autoplay, direct iframe access, native pause/resume at
the current time (2.73 → 2.82 → 3.84 seconds), and a preserved user pause after scrolling away
and back. The 390px reduced-motion check retained a still poster until requested, then opened
native playback with sound and no restart overlay. Desktop/phone renders were reviewed.
Home first-load JS is 160.7 KiB gzip / 138.7 KiB Brotli. The restart-on-click behaviour and
its verification below are historical and superseded.

## Admissions simplification (preceding update)

The abstract square diagram is removed. Admissions now presents a direct numbered ordered
list: prepare a candidature, meet the team, then receive the commission's response and
confirm if admitted. Shorter verified copy preserves entry from 2 years through 1re
secondaire, available places, the parent interview and age-adapted observation. The existing
clay application button and details link remain.

The Playfair heading and real Rabat entrance photo sit left of the Avenir steps/actions on
desktop. An olive strip under the photo carries the existing dialogue/no-selective-test
reassurance. Phones show heading, steps/actions, then photo. This remains a static Server
Component with no scroll-driven diagram or new JavaScript; the unused
`admissions-diagram.ts` is removed. Source: `admissions-path.tsx`,
`admissions-path.module.css` and `src/content/home-details.ts`.

The production build and TypeScript passed; source lint returned 0 failures and 0 warnings.
Chrome checks passed at 360, 390, 768, 1024, 1280 and 1440px: three ordered steps, preserved
conditions, correct brand fonts/colours, mobile content order, both action destinations,
keyboard focus, no horizontal overflow/collisions and loaded images. Content also remains
visible with reduced motion and JavaScript disabled. No browser runtime errors were recorded.
The independent visual review returned “Ship” for this admissions section after reviewing
desktop, tablet and phone captures. Home first-load JS remains 160.9 KiB gzip / 139.0 KiB
Brotli; no package or client component was added. The checks below describe preceding passes.

## Campus interaction (preceding update)

The previous consecutive campus chapters now share one frame. Casablanca appears first on
olive, with Rabat's small photo peeking from the right edge as a native button. Clicking it
slides Casablanca left and brings Rabat into the main frame. Casablanca becomes an equally
sized thumbnail on the left; the same button moves left, keeps keyboard focus and points
left to return. Returning restores Casablanca and Rabat's preview on the right. Each panel
slide lasts 850ms while olive fades to charcoal (#282828), or back, over 900ms. The preview
fades into its new edge and Rabat's main photo leaves room on the left. Title words uncover
through masks, followed by staggered facts, the short description and the campus-page link.
Campus photos, copy and destinations remain unchanged.

The button works by keyboard and stays outside the inert inactive panel so focus survives
selection. One intact title remains accessible; a short live status names the selected campus.
Touch-only horizontal swipes preserve native vertical pan and pinch zoom. Reduced motion
switches instantly. Without JavaScript, Casablanca and direct links to both campus pages
remain available. The old scroll-driven inset is removed from the shared frame.

Source: `src/components/home/campus-chapters.tsx`, `campus-switcher.tsx` and
`campus-chapters.module.css`.

Final verification: TypeScript and the production build passed; focused source lint returned
0 failures / 0 warnings. Real Chrome checks passed at 360, 390, 768, 1024, 1280 and 1440px:
intermediate slide/background states, matching right/left preview widths, keyboard return,
rapid reversal, stable frame height, no text collisions or horizontal overflow, loaded images,
instant reduced motion and no-JS links. Real touch input at 390px confirmed horizontal swipe
selection and ordinary vertical scrolling without changing campus. Desktop/tablet/phone
screenshots were reviewed; the tablet return arrow now wraps instead of clipping. No browser
runtime errors were recorded. Home first-load JS: 160.9 KiB gzip / 139.0 KiB Brotli. No package
was added. The measurements below belong to the preceding updates.

## Certificate animation (preceding update)

At Ayoub’s request, “Un parcours belge reconnu” now uses an olive-green background, white
text and a warm orange connecting line. CEB, CE1D and CESS light up in order as the line draws
once over 2.3 seconds on viewport entry; the path runs downward on phones. Reduced motion and
no-JavaScript retain the complete path. No copy or school facts changed.

TypeScript/build passed. The live sequence was checked at 360, 390, 768 and 1440px: initial,
midpoint and complete line states, sequential checkpoint timing, no horizontal overflow,
no repeat on scroll re-entry, and live/static reduced-motion and no-JavaScript fallbacks.
Home first-load JavaScript is now 160.1 KiB gzip / 138.2 KiB Brotli. Source lint reports no
failures; its two scale-from-zero warnings apply to the intentional checkpoint fill geometry,
not text or content entrances. The design detector's type-size advisories concern retained
14px labels and 28/32px certificate codes.

## Initial age/video/FAQ update (historical)

- Replaced the age slider and campus form with three direct choices: **2–5**, **6–11**, **12–18 years**. The bands follow the existing school-year mapping; ages are indicative at the start of the school year. Each choice shows a real school photo, three short points and the link to the admissions steps already on the homepage.
- Replaced the eight-row institutional table with a connected **CEB → CE1D → CESS** certificate diagram, horizontal on desktop and vertical on phones. The currently visible age/certificate sections contain roughly 117 words together, instead of the previous detailed panels and table.
- Moved the video into its own large section above the FAQ. The actual school video plays a muted preview when it enters view. Clicking anywhere on the video restarts it at zero, unmutes it and gives control to the YouTube player. A separate pause control stops the preview. Reduced motion keeps the poster still until clicked; a direct YouTube link remains available.
- Replaced the FAQ paragraphs with ten expandable question cards. Opening a question slides its answer downward and closes the previous card. The same question closes it again. Keyboard navigation and expanded state come from the existing Radix Accordion package.
- The “Toutes les questions” link follows the cards on phones. Detailed former homepage copy remains in `docs/content-archive/home-detailed-copy.md` for future inner pages; conflicting or time-sensitive facts still require confirmation before publication.

## Verification of the initial update (historical)

- Production build and TypeScript passed; no packages added. Home first-load JS: **159.9 KiB gzip / 138.1 KiB Brotli** (previously 162.5 / 140.2).
- Checked all three age choices, native arrow-key selection, no-JavaScript age selection, ten FAQ cards, opening/closing/single-open behaviour and reduced motion.
- Exact viewport widths **360, 390, 768 and 1440px** remain intact, with no horizontal overflow or broken images. The new section headings fit in at most two lines.
- Historical, superseded restart verification: live YouTube checks confirmed preview state `playing` with mute on; after clicking, playback resumed at **0.26 seconds**, with mute off and focus inside the player.
- Source taste lint: **0 FAIL / 0 WARN**. Final page inspection: **0 FAIL / 6 WARN with documented existing-design allowances**. The unfiltered first pass also flagged the existing count-up/mobile fixed-bar overlap; it was reviewed and retained. Other warnings concern the approved mixed headings, type sizes, existing long scroll scene/statement, and a video below the inspector’s capture range. The video was separately tested live.
- Reviewed desktop, tablet and phone screenshots of every changed section. No deployment or integration work was performed.

That earlier implementation used the official [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) for mute, play/pause and seeking, alongside the privacy-enhanced embed host. Its forced restart/seeking behaviour is superseded by the native-controls interaction above.

## Design review

The installed design-taste-frontend, frontend-design and Impeccable skills were used within the established EBM identity; no new visual direction or third-party imagery was introduced. The first review caught uneven phone age labels, minimum-video-width overflow and the FAQ link position; all three were corrected together. Final scoped assessment: design 8, usability 8, creativity 6, content 8 → **7.6/10**. The age chooser and certificate path use familiar patterns deliberately to improve comprehension. This score covers the changed sections, not the unfinished site as a whole.

The existing 14 placeholder pages and visibly labelled alumni samples remain pending.
