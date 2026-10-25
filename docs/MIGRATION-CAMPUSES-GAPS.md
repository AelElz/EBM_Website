# Campus and contact migration — 24 October 2026

Scope: `/nos-campus`, `/nos-campus/casablanca`, `/nos-campus/rabat`, `/contact`. Home, its imports and shared site settings were left unchanged. These populated pages remain noindex review drafts pending EBM validation.

## Implemented

One server-rendered campus template, a comparison hub, service-specific telephone/e-mail contacts, address-based external Google Maps searches, photographed spaces with literal captions, services, dated campus history, source timetables with explicit conflicts, campus-event empty states, official social links and applicant-only visit requests. Pictograms and existing optimized campus photographs are reused exactly. No new image files were needed.

The contact composer and visit reuse prepare a `mailto:` URL for the selected campus/service and subject, with an optional message. The link opens the visitor's mail application, which performs any delivery. There is no website mail delivery, data persistence, fabricated success notification, real visit booking or Instagram feed. Static telephone/e-mail links remain usable without JavaScript. No message was sent during implementation.

## Publication gaps

- Campus-specific director names, welcome messages and portraits: not supplied. Each campus has a specific intentional review note; the network director is not presented as both campus directors.
- Public campus plans and exact approved entrance/parking pins: not supplied. Links search each published address, and do not claim a verified visitor route or parking plan.
- Rabat highest secondary level: source has conflicting S3/S5 descriptions and an old forecast for September 2026. No claim that S6 is currently open; ask the campus about the requested class and places.
- Rabat area and pupil count: conflicting source values excluded from headline facts. No per-campus pupil or staff counts are published in these pages.
- Hours: campus-specific source schedules retained in a collapsible block labelled “à confirmer”. Published campus 08:25 conflicts with FAQ 08:20. Wednesday finishes vary by campus/section; never a single generic timetable. Administrative office opening times are unknown and not derived from class hours.
- Casablanca childcare: campus page indicates paid 16:00–17:00; general FAQ says 18:00. The page explicitly identifies the conflict, and does not promise 18:00 Casablanca cover.
- Transport: published for Casablanca only. Rabat is not given an invented service.
- Contacts: use primary `/contactez-nous` and current config `fondamental@ecolebelge.org`; alternate page `fondamentale@…` needs EBM confirmation. Rabat uses valid mailto `ebmrabat@ecolebelge.org`, correcting the visible hidden-space typo. Bad `tel:23 - 10110` is discarded. Casa secondary +212 522 92 03 03 and extra fundamental mobile +212 673 22 64 64 preserved. Mobile is not labelled WhatsApp.
- Archival `admissions@ecolebelge.org` is not substituted for a current workflow.
- No confirmed upcoming campus-specific events in evidence; shared school calendar remains linked. No fictional open-day slots.
- Social links are static destinations, not a live feed.
- Photo permission, including identifiable children, and the Avenir web licence still require EBM confirmation before publication.

## Evidence and reuse

Canonical migration records: `src/content/migration/campuses.ts`. Exports source URLs/fetch date/destinations/scope/status through `campusSources`; facility and hero assets through `campusAssetLedger`; shared service/timetable records via `migratedCampuses`; lightweight composer routing via `campusContactRecipients`.

Source originals: pack `sources/casablanca.md`, `rabat.md`, `contactez-nous.md`, `contactez-nous-1.md`, B01 outdoor-school article and B02 Rabat secondary inauguration. B02 event is 14 November 2023; 12 January 2024 is its publication date. Planned outdoor infrastructure is not described as wholly completed. Cambridge certificate stock/scan is not reused as an unsupported current claim, and generic Unsplash school imagery is excluded.

Existing local asset provenance is in `docs/HOME-SPEC.md`; campus-specific captions/source files are recorded in `campusAssetLedger`. No media was hotlinked, no temporary asset-token URLs used, and no remote video downloaded.

## Readiness

Content is populated and routes share an established EBM layout. EBM must approve current operations, disputed hours/levels, access, director material and photography before indexing. The root migration pass owns final typecheck/build/bundle report and multi-width browser QA.
