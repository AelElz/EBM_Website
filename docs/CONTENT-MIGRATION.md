# EBM content migration — first implementation pass

Implementation: 24–25 October 2026. Source audit: 24 October 2026.

The 14 non-home main pages are populated in `/Users/ayoub/Documents/ayoub/EBM_Website`. The latest user instruction explicitly excluded the homepage: its layout, copy, statistics, placeholder alumni stories and interactions were preserved. The 69 files in the protected home/shared manifest remain unchanged.

This is a review version, not a publication approval. All 14 migrated main pages retain `noindex, follow` and stay out of the XML sitemap. Legal/privacy/recruitment, search, visit requests and Eduka are also noindex; the existing functional `/plan-du-site` directory remains indexable with `/`.

## Route readiness

Every route below now has substantive content rather than a whole-page “Page en préparation” notice. Missing specific blocks have intentional review notes or truthful empty states.

| Route | Implemented content | Essential review material |
|---|---|---|
| `/le-reseau` | Director’s sourced welcome, four values, Belgian framework, timeline, partners | Current leadership roles, campus portraits/bios, partner links |
| `/pedagogie` | Approach, three hash-linked level tabs, languages, evaluations/support | CEB/CEP terminology, current options/Rabat levels, teacher videos, typical days |
| `/ecole-du-dehors` | Casablanca approach, real gallery, 1.5-hectare setting, access and requests | Current participating levels/session programme, actual built equipment, voices/videos |
| `/grandir-aux-ebm` | Activity-domain filter, dated projects, gallery, canonical campus services, well-being | Current club catalogue/menus/prices, service-hour approval, testimony |
| `/nos-campus` | Two-campus comparison, location/access, services, photographs | Approved plans, current operating details |
| `/nos-campus/casablanca` | Shared campus template, photographed spaces, services, source timetable/contact | Campus direction, precise access/parking, disputed hours/childcare |
| `/nos-campus/rabat` | Same campus template, dated history, services, timetable/contact | Highest open secondary class, disputed hours, director/access material |
| `/apres-les-ebm` | CESS guidance, real dated trip, ceremony archive, historical charts/results | Genuine consented alumni profiles, ceremony year/promotion, cohort sizes |
| `/admissions` | Six quick links, four-phase summary of seven steps, visit policy, contacts | Active campaign dates, current class availability |
| `/admissions/comprendre` | All seven source steps, level/category conditions, searchable 46-answer FAQ | Current eligibility/campaign confirmation |
| `/admissions/documents-et-frais` | Campus/level/category finder, exact undated fee tables/conditions, shared checklist | Applicable fee year, upload requirements, payment instructions |
| `/calendrier` | 23 signed-calendar dates, filters, PDF, one-time ICS, visit guidance | Lunar confirmations and actual future events/visit availability |
| `/admissions/candidater` | Preparation/checklist and current hosted Eduka handoff | Verified custom-form/API capability remains a later phase |
| `/contact` | Service-specific calls/e-mails, address searches, local e-mail composer | Contact spelling confirmation, current office hours, approved access pins |

Support routes now explain real limitations: `/reserver-une-visite` prepares a request, `/recrutement` does not advertise unverified jobs, and legal/privacy are explicit review documents. Search includes the new route records and FAQ questions/answers without indexing internal gap notes. Existing header/footer/navigation and the homepage were not redesigned.

## Sources and editorial decisions

The supplied `EBM_Migration_Pack` contains the extracted editorial corpus, maps, conflict register, image index and two public PDFs. The external-volume blueprint PDF was unavailable during this pass, so its complete supplied text extraction and page-by-page migration brief were used. No new blog/news archive or old Odoo module was recreated.

- Institutional, programme, values and level content was merged into network/pedagogy pages. All four values survive; aliases do not create duplicate pages.
- The Rabat secondary event is dated **14 November 2023**; **12 January 2024** is the article’s publication. Outdoor launch imagery and initial programme are associated with the January 2024 publication without inventing an event date or presenting planned infrastructure as completed.
- The trip, German partnership and solidarity articles remain visibly dated 2024 stories. A campus visit does not prove university enrolment. The medicine preparation announcement has no established start year and is excluded from the active offer.
- Historical brochure statistics remain historical, with unknown cohort years/sample sizes explicit. No current 100% success rate, invented graduate or university logo is introduced. Home alumni placeholders are outside this task and remain unchanged.
- Fees retain all three categories and exact published amounts, with prominent missing-year notice. Accueil annual tuition is unknown. Standard sibling DPI reductions, reduced quota/financial evidence and Belgian re-enrolment conditions are qualified; no automatic total/discount or confirmed campus price equality is inferred.
- The signed 2026–2027 calendar wins over conflicting HTML: estimated Mawlid 25–26 August; spring holiday ends 9 May inclusive, return 10 May. ICS all-day ends are exclusive; lunar estimates remain tentative. The export is not an updating subscription.
- Service information uses one migration campus model. The source FAQ reports no Rabat transport at its writing; Casablanca transport is attributed to RUN RUN. Conflicting hours and childcare are qualified rather than reconciled silently.
- Old admissions campaigns, software-job templates, Odoo terms, cookie-contaminated FAQ answers, empty/module pages and stock/decorative assets are archived or excluded. The ledger preserves their dispositions.

## What is functional now

The application action opens the current public Eduka form:
`https://ecolebelge.eduka.school/registration/web/13/a1213c361ab0`.
Passwords, family documents and official application follow-up stay on Eduka. The site does not collect a custom application, issue a dossier reference or promise save-and-resume capability.

Contact/visit tools prepare a `mailto:` message for the visitor’s mail application. The visitor reviews and sends it there; this website neither delivers nor stores the message. A visit request is not a confirmed booking. There are no invented slots, capacities, public open days, automatic reminders or success screens.

The pass adds typed static content and scoped inner-page components. It installs no dependency, connects no new backend/CMS/database or delivery service, sends no real messages, changes no production state and deploys nothing. Existing source/home decisions remain intact.

## Ledgers and approval work

- `CONTENT-SOURCES.json`: 173 inventory/section/FAQ/document records, including all 80 entries in the pack’s migration map, with source URLs, destinations, date/status and disposition.
- `CONTENT-ASSETS.json`: 28 actual non-home photo/pictogram/partner/document records, with deployed paths and provenance; all mapped files exist. Three archive photographs were newly optimized with existing Sharp. This is not approval of every image in the pack.
- `CONTENT-GAPS.md`: consolidated school decisions/content needed before publication.
- `MIGRATION-SCHOOL-GAPS.md`, `MIGRATION-ADMISSIONS-GAPS.md`, `MIGRATION-CAMPUSES-GAPS.md`: detailed area registers.

`published-source` means source provenance, not current operational accuracy or EBM approval. EBM must approve the relevant facts, rights and legal material before a page’s noindex flag and sitemap exclusion are removed.

## Verification checkpoint

The final root integration pass passed TypeScript checking and production compilation. Repeated HTTP checks passed for 21 routes, 1,058 links, 73 hash targets, two PDFs and 32 redirects, with no failures; contact links were also checked. No real application or message was submitted. The protected manifest’s 69 files are unchanged.

Responsive inspection covered 68 route/width combinations without JavaScript errors or broken images. A 768px archival-story photo overflow was corrected with an explicit width constraint in scoped school CSS. All eight focused story-layout follow-ups across 360/390/768/1440px passed, and the decoded campus-image check passed. An independent visual review covered 48 school/campus/support desktop/mobile views. The original functional pass resolved 50 of 51 cases; the sole no-JavaScript composer issue was corrected and all six focused confirmation checks passed, resolving the outstanding case.

The taste source gate covered 16 files with no findings. The generic landing-page inspector on the financial utility page raised contextual conflicts with the fixed brand palette, semantic financial data, readable measures, responsive tables, inherited closed header, and the absence of unnecessary video/motion. The final mobile inspector reports no findings with the explicit allowances recorded in `CONTENT-DESIGN-QA.md`; this is not an unqualified generic-inspector pass.

The final bundle report measured the migrated main pages at 146.0–156.9 KiB gzip (fees 149.5; calendar 148.2; FAQ 147.4; campus/contact 156.9). Home remains 160.7 KiB gzip / 138.8 KiB Brotli at reported precision. All technical findings from this pass are resolved. This checkpoint does not assert a live production launch or a full accessibility certification.

Local preview: `http://127.0.0.1:3100/`.
