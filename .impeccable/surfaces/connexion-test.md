# Connexion EBM — test

- **Mode:** Operate.
- **Route:** `/connexion-test` (`noindex, follow`). Entry: “Tester la connexion” at the bottom of `/espace-eduka`; return link and official Eduka access remain available.
- **Status:** Frontend prototype; SHIP finish review required no fixes. Recorded 25 October 2026.

## Purpose and behavior

Let families try login and registration with fictitious details. A visible “Version test” notice explains the scope before the form. Login requests e-mail and a fictitious password; registration adds first name, last name and campus. A sample action fills fictitious data. Password visibility is a labelled toggle.

Submission validates locally and displays an honest preview receipt: no information was sent and no account or session was created. It clears the password and focuses the result. Switching modes clears the password, visibility, errors and result while retaining other entered values. Editing a field clears its error and the previous result.

## States and accessibility

- Default login; selected registration, with keyboard tabs supporting arrows, Home and End.
- Validation errors linked to their fields, invalid field styling, and focus on the first invalid field. Registration requires a 15–128 character password.
- Pending state disables the form and tabs and labels the action “Vérification…”. An unexpected preview failure uses an alert with a retry instruction.
- Successful preview uses an olive status block and receives focus; it never claims successful authentication.
- Before hydration and without JavaScript, controls cannot submit credentials; a no-script notice points users to official Eduka access. Visible labels, focus outlines and password-control names remain explicit.

## Visual inheritance and layout

Inherits `DESIGN.md`; this surface introduces no new identity. Playfair Display is reserved for the main heading; Avenir Next serves copy, controls and the result heading. Existing clay/Kiln Ink marks actions, Riad Paper and white form the ground, Charcoal/Walnut provide text, and Grove Olive supports the campus caption and result. Buttons and fields use the established 4px corner token. Controls are at least 44px high; inputs and the primary action are at least 52px.

The task comes first in document order. From 1024px, a 460px maximum form column sits beside a sticky, square-cornered photograph of the real Casablanca campus (`hero-casablanca-entree.jpg`). Below that breakpoint the photograph follows the form; names stack below 768px. Controls use brief color transitions only when reduced motion is not requested.

## Extension boundary

`src/features/auth-test/contract.ts` prepares typed requests; `preview.ts` is the replaceable adapter. Its current implementation performs no authentication request, storage write, account creation or session creation. Eduka remains an external destination, with no integration. A PostgreSQL account/session schema is prepared in `database/auth-test/001_accounts_and_sessions.sql`; PostgreSQL 18.6 is installed locally, with empty test_auth.accounts and test_auth.sessions tables in ebm_auth_test and a loopback-only server. The frontend remains disconnected; no Node auth API or Docker container exists yet. Future Node.js integration must replace the adapter and provide server validation and authentication before this can become a working account surface.

## Evidence

19 checks passed in `/Users/ayoub/Documents/Codex/2026-10-24/fet/work/ebm-auth-test/qa/results.json`: login/registration at 360, 390, 768 and 1440px, validation and focus, keyboard switching, password visibility/clearing, honest receipts, no authentication or POST requests, no browser exceptions, Eduka entry links and no-JavaScript submission protection. Matching screenshots, including `result-360.jpg` and `eduka-entry-{390,1440}.jpg`, are in the same directory.
