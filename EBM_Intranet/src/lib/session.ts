import { sampleUser } from '@/data/sample'

/*
 * THE AUTH HAND-OFF. This app has no authentication of its own: Google sign-in is added later,
 * on the machine that hosts it (README.md, "Brancher la connexion Google").
 *
 * Every page reads the signed-in person through getStaffUser(), and only through it. Today it
 * returns the sample teacher of src/data/sample.ts so the screens can be built and reviewed.
 * When the auth is in, make it return the person from the session (Auth.js: `const session =
 * await auth()`), mapped onto StaffUser, and null for anyone not signed in: the layout then
 * sends them to SIGN_IN_URL. Who may sign in at all (a Google Workspace domain, an allow-list)
 * is decided by the auth, not here.
 */

export interface StaffUser {
  /** Full name, as Google gives it ("Salma Benali"). */
  name: string
  /** First name, for the greeting. Google's `given_name`. */
  givenName: string
  email: string
  /** Google profile photo URL (`picture`), if any. Initials are shown without it. */
  image?: string
  /** What the person does, from the staff directory ("Professeure de français"). */
  role: string
  /** The campus whose day the home shows first. */
  campus: CampusKey
}

export type CampusKey = 'casablanca' | 'rabat'

export async function getStaffUser(): Promise<StaffUser | null> {
  return sampleUser
}

/** Auth.js routes by default; set them in .env to match the auth you add. */
export const SIGN_IN_URL = process.env.NEXT_PUBLIC_SIGN_IN_URL ?? '/api/auth/signin'
export const SIGN_OUT_URL = process.env.NEXT_PUBLIC_SIGN_OUT_URL ?? '/api/auth/signout'
