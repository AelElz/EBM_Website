# Espace personnel EBM

The staff home of the Écoles Belges au Maroc: the page a teacher or staff member lands on after
signing in with Google. A separate Next.js app from the public site (`EBM_Website`), designed the
way Apple designs its own apps (simple grouped lists, the system font, one tint: EBM's Fired Clay),
meant to run on its own machine.

**There is no authentication in this project yet.** The pages read the signed-in person through
one function, `getStaffUser()` in `src/lib/session.ts`, which returns a sample teacher for now.
Everything you need to plug Google sign-in in is described below.

## Run it

Node 22 or newer.

```bash
npm install
npm run dev        # http://localhost:3200
```

Production, on the hosting machine:

```bash
npm ci
npm run build
npm run start      # port 3200, put it behind your HTTPS reverse proxy
```

## What is on the home (`/`)

Only what the day needs:

| Block | Answers |
| --- | --- |
| "Bonjour, Salma" and the date | Whose day is this? |
| Remplacement à pourvoir | A class without cover at a time I am free, with one button: "Je le prends" |
| Votre journée | My lessons and my duty, in time order; my free periods underneath |
| Annonces | The three latest, unread ones with a dot, as in Mail |
| Agenda | The next three events, dated as on a calendar page |

On a computer, a sidebar like a Mac app's: Accueil, Annonces, Agenda, Absences, Documents,
Annuaire, then the tools (Gmail, Agenda Google, Drive, Classroom, Eduka) and the account. On
phones and tablets, a tab bar at the bottom like an iPhone app (Accueil, Annonces, Agenda,
Absences, Plus); "Plus" opens a sheet with Documents, Annuaire, the tools and Se déconnecter.

## The other screens

All in the same style: a large title and one grey line, then grouped lists on white cards.

| Screen | What it shows |
| --- | --- |
| `/annonces` | Unread, then already read; each row shows the author, the time and the first two lines. Opens `/annonces/[id]`: the full text, and the event it is about as a link into the agenda. |
| `/agenda` | What is coming, grouped into this week, next week, then by month, dated as on a calendar page. |
| `/absences` | Today: the class still without cover (with "Je le prends" when you are free), the cover already arranged, and the duty rota. Never the reason for an absence. |
| `/documents` | The school's documents by use (rules and calendar, procedures, evaluation, forms), with a search that ignores accents. |
| `/annuaire` | Everyone, as in Contacts: a search, a campus filter (Tous, Casablanca, Rabat), names under the first letter of the last name, one tap to e-mail. |

Shared parts: `src/components/ui/page.tsx` (the title and back link), `section.tsx` (grouped
lists), `search-field.tsx`, `segmented.tsx`.

## Connecting Google sign-in

1. Add your auth (Auth.js / NextAuth v5 with the Google provider is the usual choice for Next.js).
   Decide **who may sign in** there, not in the pages: for EBM staff, accept only the school's Google
   Workspace domain (Google's `hd` claim) and/or an allow-list of e-mail addresses.
2. Make `getStaffUser()` return the signed-in person, or `null` for anyone who is not:

   ```ts
   // src/lib/session.ts — an example with Auth.js v5
   import { auth } from '@/auth'

   export async function getStaffUser(): Promise<StaffUser | null> {
     const session = await auth()
     if (!session?.user?.email) return null
     const entry = await findStaffByEmail(session.user.email) // your staff directory
     if (!entry) return null
     return {
       name: session.user.name ?? entry.name,
       givenName: entry.givenName,          // or Google's `given_name`, passed through the jwt callback
       email: session.user.email,
       image: session.user.image ?? undefined,
       role: entry.role,
       campus: entry.campus,                // 'casablanca' | 'rabat'
     }
   }
   ```

3. Point the two URLs at your auth routes in `.env` (see `.env.example`). The defaults are Auth.js's:
   `NEXT_PUBLIC_SIGN_IN_URL=/api/auth/signin`, `NEXT_PUBLIC_SIGN_OUT_URL=/api/auth/signout`.
   A visitor with no session is redirected to the sign-in URL by `src/app/(espace)/layout.tsx`;
   the arrow at the foot of the sidebar goes to the sign-out URL.

Once `getStaffUser()` reads the session, Next renders the pages per request on its own (they are
prerendered today only because the sample user is a constant). Google profile photos are shown
with a plain `<img>` (no image optimiser or remote pattern needed).

## Replacing the sample data

Everything in `src/data/sample.ts` is **invented** (people, e-mail addresses, classes, absences,
duties, announcements, events, documents). Replace each export with the real source; the
components only need the same shapes.

| Export | Likely source |
| --- | --- |
| `sampleNow` | `new Date()` (it is fixed at Monday 9 Nov 2026, 8h05 for the screenshots) |
| `people`, `usefulContacts`, `coverCoordinator` | Google Workspace directory (Admin SDK) or the HR list |
| `sampleUser` | Goes away: `getStaffUser()` returns the real person |
| `bell` | The school's real periods (sample periods built from the published hours 7h45 / 8h25 / 15h30) |
| `myLessons`, `absences`, `duties` | The timetable and absence system |
| `events` | The school's Google Calendar |
| `announcements` | Wherever the direction publishes (a Google Group, the CMS) |
| `documents` | Shared Drive folder |

The file checks its own sums when it loads (`console.assert`): cover counts, slots on the bell,
announcements pointing to real events.

## Actions to wire

- **Je le prends** (`src/components/home/cover-offer.tsx`): only flips to a confirmation
  today. Send the offer to the coordinator (an API route, an e-mail) there.
- **Sign out**: the links in `src/components/shell/user-row.tsx` (sidebar) and
  `src/components/shell/tab-bar.tsx` (phone sheet), through `SIGN_OUT_URL`.

## Design notes

- Built with the apple-design skill: restraint first, light by default, one tint, type and space
  instead of boxes. Tokens and type scale are in `src/app/globals.css`.
- Page: the grouped grey `#f5f5f7`; content on white cards with 12px corners, hairlines inset to
  the text, no borders or shadows. The only translucent surface is the phone tab bar.
- Tint: EBM's Fired Clay `#b85431` for the one filled button, unread dots, the selected tab and
  the badges; `#9c4425` (the same tint, deeper) for small text links, 5.9:1 on the grey page.
- Type: the system font (SF Pro on Apple devices, Segoe UI or Roboto elsewhere), on Apple's
  scale: large title 34, title 20, body 17 (15 on a computer), footnote 13, tab label 10.
- Motion only where it gives feedback: the sheet rises in 300ms, presses dim; nothing moves
  under reduced motion.
- No web font to load or license: the EBM logo is the only brand asset.
