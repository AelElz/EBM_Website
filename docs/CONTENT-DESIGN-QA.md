# Design inspector context — inner-page migration

The existing EBM identity and the user's explicit homepage freeze take precedence over the inspector's generic landing-page defaults. The first unfiltered fees-page report is retained in `taste-inspect/report.json`.

The initial report found one useful copy refinement: shorten the mobile H1 from “Préparer le dossier. Comprendre les frais.” to “Documents et frais”. That is implemented, not waived. The separate responsive sweep also found a real 768px archival-story photo overflow on Grandir aux EBM. Its 240px minimum height transferred through the aspect ratio to an automatic 384px width in a 333px grid column. An explicit 100% width and zero minimum width constrain it to its column. The inner hero tracks were also made explicitly shrinkable; that earlier hypothesis alone did not resolve the story photo.

Contextual allowances for the final fees-page inspection:

| Rule | Evidence and reason |
| --- | --- |
| eyebrow | The two labels are semantic `dt` terms identifying tuition versus one-time registration amounts in a `dl`. Removing them would make financial information ambiguous. |
| palette-claude | Clay, olive, paper and cream are the established EBM brand tokens, explicitly retained by the brief. |
| few-pictures, no-footage, still-page | This is a fee/document utility page. Photos, decorative motion and autoplay footage would interrupt the task; the marketing pages use real EBM photography. |
| focal-point, hero-void | The compact editorial title and introduction use the established inner-page scale. A large marketing graphic is unnecessary for this reading task. |
| lopsided | Terms and conditions use a readable line length; the fee tables and chooser use the full grid. |
| off-centre | The probe measures text extents rather than the actual centered container. Screenshots and DOM bounds confirm the intended 140px desktop/20px mobile container insets. |
| size-count | Includes inherited navigation/footer sizes plus distinct numeric fee values and the two established font families. No new type family was introduced. |
| first-action | The first screen offers labelled page-section links. This page's job is to read fee conditions, rather than start a transaction from its hero. |
| side-scroll | Actual financial comparison tables have labelled, keyboard-focusable scroll regions; no page-level horizontal overflow. The selector provides the chosen amount without horizontal scrolling. |
| hairline | The single inherited shared-header divider is frozen with the homepage. New decorative divider rules were removed; real table/form boundaries remain. |
| reduced-hidden | All 17 matches are links in closed shared navigation menus, intentionally hidden until the menu opens. No new page content starts hidden under reduced motion. |
| covered-text | Final mobile film frames show two headings momentarily passing under the inherited fixed bottom Calendrier/Candidater action bar. They remain in normal document flow and become fully readable by scrolling; there is no new pinned scene, overlaid image or persistent clipping. The user explicitly froze the shared homepage UI. |

These allowances are local to this utility page; they are not a claim that every generic inspector rule is automatically irrelevant. Responsive bounds, visual screenshots, functional controls, source checks and the unchanged-home hash check remain separate acceptance evidence.

## Screenshot critique, final content pass

ROUND 2
Seen in one second: the EBM campus and a clear page title; operational pages lead with the requested subject.
Idea (one sentence): retain the established EBM identity while giving each parent task a concrete destination.
Live thing: level selection, activity filters, fee lookup, FAQ search, calendar filters/export and an honest e-mail draft.
Layout words by section: marketing hero=photo split / principles=columns / history=timeline / life=photo stories / fees=finder and tables / questions=disclosures / next step=actions.
Scores: design 7.0 · usability 8.0 · creativity 6.5 · content 8.0 → overall 7.3. This is an editorial content pass using an existing identity, not a new gallery-art-direction exercise.
Caps applied: no claim above 7 for visual invention or motion; real financial labels, fixed inherited navigation and photography-free utility pages use the explicitly documented contextual allowances above.
Top three problems, most visible first:
1. Initial tablet story photo exceeded its grid column (Grandir, 768px). Fixed explicit width/minimum width; final screenshot and eight route/width follow-ups pass.
2. Initial fees H1 wrapped to three phone lines. Shortened to “Documents et frais”; final 390px inspection is one line.
3. Initial no-JavaScript contact controls could not update their draft. They now appear only with client enhancement; direct addresses remain available and six focused checks pass.

The final accepted mobile inspector reports 0 FAIL / 0 WARN using these recorded contextual allowances. Earlier raw reports are retained in the workspace QA folder. The final screenshots show the decoded campus photos correctly. Visual evidence samples 48 school/campus/support views plus admissions inspector sheets and targeted corrected layouts; DOM checks cover the remaining page bounds. This is not a full accessibility certification or factual publication approval.
