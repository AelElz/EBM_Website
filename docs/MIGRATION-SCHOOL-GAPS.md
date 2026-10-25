# School-page migration: review register

Implemented routes: `/le-reseau`, `/pedagogie`, `/ecole-du-dehors`, `/grandir-aux-ebm`, `/apres-les-ebm`.
These remain noindex review drafts. The homepage, its source content and its components were not edited by this work.

Sources were audited on 24 October 2026. `src/content/migration/school.ts` stores meaningful section provenance, status, destinations and dates in `schoolSourceLedger`; `docs/MIGRATION-SCHOOL-ASSETS.json` records the three newly optimized archive photos. The other photographs reuse the existing optimized EBM media and their incumbent source mapping in `docs/HOME-SPEC.md`.

## Decisions applied

- Combined institutional status, the director’s welcome, teaching project and all four named values on the network page. The director’s short closing quotation is authentic; the surrounding copy is a paraphrase.
- Network timeline distinguishes the 14 November 2023 Rabat secondary inauguration from the article published 12 January 2024. Future campus expansion forecasts are not described as confirmed openings.
- Combined the nursery/primary/secondary sources on one pedagogy page. Hash links select the right level after hydration; without JavaScript all three levels remain readable. Native tab keyboard support includes Left/Right/Home/End. The early accueil begins at age 2; this is distinct from M1–M3 around 3–6.
- Preserved current institutional CEB terminology and made the older CEP conflict visible. B2 English is an announced learning objective, not a promised outcome. Rabat’s English/Dutch offer remains campus-specific and marked for confirmation.
- Outdoor content describes the mixed indoor/outdoor approach and the published 1.5-hectare Casablanca space. January 2024 plans for pavilions, adventure/animal/fire zones, energy/water systems and simultaneous capacity are excluded from the current facilities list.
- Activities present only published sport/arts/culture domains and a meaningful domain filter. Campus/level metadata exists in the typed model; speculative campus/level selectors and the unconfirmed old detailed club list are not exposed as current availability.
- Grandir reads the canonical campus-specific service records from `src/content/migration/campuses.ts` rather than maintaining a second timetable/provider model. Hours and childcare conflicts are signposted to those campus records. No generic Rabat transport offer or 18:00 Casablanca childcare claim.
- The November 2024 rhéto trip, October 2024 German partnership and May 2024 solidarity project remain dated stories. They are never future calendar events. The German initiative is not a universal current German curriculum.
- Après les EBM publishes the complete historical destination and study-field proportions from the visually checked brochure charts. Four-promotion destination years/sample sizes and study-field cohort/sample remain explicitly unknown. Historical 2018, 2019, 2021, 2022 and 2023 primary/CESS comparisons are behind a disclosure. No 2020 value, current 100% success or named university enrolment is invented.
- Ceremony photo source is the old primary-pathway imagery; date/promotion are unconfirmed. It is captioned as a generic EBM ceremony archive, never proof of a particular CESS graduation or success rate.
- No invented home alumni records are imported. Typed profile/filter data models are ready, with an empty consented-profile collection; interactive portrait carousel/dialog and visible filters await genuine records. A contact link provides a functioning invitation to share a story; there is no fake newsletter/event registration.
- Existing partner artwork is reused exactly on charcoal. Official partner links are omitted until destinations are verified. Existing canonical Instagram URL is reused from site config.

## EBM material or decisions still needed

| Page | Missing or disputed item | Current treatment |
|---|---|---|
| Le réseau | Confirm current director role and approval to republish his message/portrait; current campus leadership names, bios and photographs | Published source attribution plus precise visible review note; no fabricated team directory |
| Le réseau | Partner official outbound destinations | Exact existing logos, no guessed links |
| Pédagogie | CEB/CEP terminology, current secondary options, highest Rabat level and typical days | Explicit review note; no fictional schedule or exhaustive option list |
| Pédagogie | Current campus language availability and Cambridge pathway details | Source-qualified copy; no B2 guarantee |
| Pédagogie | Current 16-child accueil cap | Not generalized or advertised without confirmation |
| Pédagogie / outdoor | Identified, licensed teacher videos with subjects, posters and captions | Named media gap; unrelated YouTube clips not repackaged as “Parole d’enseignant” |
| Outdoor | Current participating levels, session frequency, concrete session steps and family instructions; what infrastructure is actually operational | Initial accueil–P2 / ages 2–7 described as January 2024 scope; no invented current timetable |
| Outdoor / Grandir | Authorized attributed parent, teacher or pupil quotations | Specific review notes, no synthetic testimonial |
| Grandir | Current club catalogue by campus, level, activity, facilitator, price and schedule; menus/service tariffs | General published domains, contacts and concise gap note |
| Grandir | Conflicting hours and childcare conditions | Canonical campus review records and links |
| Après les EBM | Real consented alumni profiles, year, campus, field, quotation, photograph, up-to-date study/career | Empty typed data model; filters not displayed |
| Après les EBM | Exact ceremony year/promotion; brochure cohort years/sample sizes; current graduate results | Visible archival limitations, no current metrics |
| Après les EBM | Medicine entrance preparation start year, campus and active status | Kept out of the active offer |
| All | Current confirmed public events | Truthful empty states; school-calendar links remain functional |

## Assets and verification

New archive photographs were inspected and optimized with existing Sharp, without installing dependencies: outdoor launch (1600×1067), German partnership meeting (1600×900), solidarity article image (1280×576). There are no third-party photo hotlinks or transient access-token asset URLs in the new pages.

The five route files and their dedicated TypeScript/TSX files passed syntax transpilation. Integration typecheck/build and the consolidated phone/tablet/desktop browser pass are owned by the main migration task so parallel agents do not compete over the build/server.
