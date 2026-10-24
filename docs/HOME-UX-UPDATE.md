# EBM homepage UX update — 24 October 2026

Implemented in `/Users/ayoub/Documents/ayoub/EBM_Website`.

Preview: <http://127.0.0.1:3100/>

## Latest certificate animation

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

## What changed

- Replaced the age slider and campus form with three direct choices: **2–5**, **6–11**, **12–18 years**. The bands follow the existing school-year mapping; ages are indicative at the start of the school year. Each choice shows a real school photo, three short points and the link to the admissions steps already on the homepage.
- Replaced the eight-row institutional table with a connected **CEB → CE1D → CESS** certificate diagram, horizontal on desktop and vertical on phones. The currently visible age/certificate sections contain roughly 117 words together, instead of the previous detailed panels and table.
- Moved the video into its own large section above the FAQ. The actual school video plays a muted preview when it enters view. Clicking anywhere on the video restarts it at zero, unmutes it and gives control to the YouTube player. A separate pause control stops the preview. Reduced motion keeps the poster still until clicked; a direct YouTube link remains available.
- Replaced the FAQ paragraphs with ten expandable question cards. Opening a question slides its answer downward and closes the previous card. The same question closes it again. Keyboard navigation and expanded state come from the existing Radix Accordion package.
- The “Toutes les questions” link follows the cards on phones. Detailed former homepage copy remains in `docs/content-archive/home-detailed-copy.md` for future inner pages; conflicting or time-sensitive facts still require confirmation before publication.

## Verified

- Production build and TypeScript passed; no packages added. Home first-load JS: **159.9 KiB gzip / 138.1 KiB Brotli** (previously 162.5 / 140.2).
- Checked all three age choices, native arrow-key selection, no-JavaScript age selection, ten FAQ cards, opening/closing/single-open behaviour and reduced motion.
- Exact viewport widths **360, 390, 768 and 1440px** remain intact, with no horizontal overflow or broken images. The new section headings fit in at most two lines.
- Live YouTube verification confirmed preview state `playing` with mute on; after clicking, playback resumed at **0.26 seconds**, with mute off and focus inside the player.
- Source taste lint: **0 FAIL / 0 WARN**. Final page inspection: **0 FAIL / 6 WARN with documented existing-design allowances**. The unfiltered first pass also flagged the existing count-up/mobile fixed-bar overlap; it was reviewed and retained. Other warnings concern the approved mixed headings, type sizes, existing long scroll scene/statement, and a video below the inspector’s capture range. The video was separately tested live.
- Reviewed desktop, tablet and phone screenshots of every changed section. No deployment or integration work was performed.

Implementation uses the official [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) for mute, play/pause and seeking, alongside the existing privacy-enhanced embed host.

## Design review

The installed design-taste-frontend, frontend-design and Impeccable skills were used within the established EBM identity; no new visual direction or third-party imagery was introduced. The first review caught uneven phone age labels, minimum-video-width overflow and the FAQ link position; all three were corrected together. Final scoped assessment: design 8, usability 8, creativity 6, content 8 → **7.6/10**. The age chooser and certificate path use familiar patterns deliberately to improve comprehension. This score covers the changed sections, not the unfinished site as a whole.

The existing 14 placeholder pages and visibly labelled alumni samples remain pending.
