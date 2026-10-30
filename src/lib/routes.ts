import type { NavId } from '@/content/site'

/* Client-safe: a type-only import and plain data, so client components may import this file. */

/** Every public route of the site (docs/HOME-SPEC.md). Use these instead of string literals. */
export const routes = {
  home: '/',
  reseau: '/le-reseau',
  pedagogie: '/pedagogie',
  ecoleDuDehors: '/ecole-du-dehors',
  apresLesEbm: '/apres-les-ebm',
  campus: '/nos-campus',
  campusCasablanca: '/nos-campus/casablanca',
  campusRabat: '/nos-campus/rabat',
  grandir: '/grandir-aux-ebm',
  calendrier: '/calendrier',
  admissions: '/admissions',
  /** Since 30 Oct 2026 the steps, conditions and questions live on /admissions itself. */
  faq: '/admissions#faq',
  documentsEtFrais: '/admissions/documents-et-frais',
  /** The "Candidater" section of /admissions (the separate page merged there on 30 Oct 2026). */
  candidater: '/admissions#candidater',
  contact: '/contact',
  espaceEduka: '/espace-eduka',
  /** The visit request form, on the calendar page since 30 Oct 2026 (visitFor() picks a campus). */
  reserverVisite: '/calendrier#visite',
  recrutement: '/recrutement',
  mentionsLegales: '/mentions-legales',
  confidentialite: '/confidentialite',
  planDuSite: '/plan-du-site',
  recherche: '/recherche',
} as const

/** The visit request form with a campus already chosen. */
export function visitFor(campus: 'casablanca' | 'rabat'): string {
  return `${routes.calendrier}?campus=${campus}#visite`
}

/*
 * Which header menu is active for a path. `/calendrier` (with the visit request) belongs to Vie
 * scolaire since 30 Oct 2026.
 * System pages (legal, search, recruitment...) highlight no menu.
 */
const sectionPrefixes: ReadonlyArray<readonly [string, NavId]> = [
  [routes.reseau, 'ecole'],
  [routes.pedagogie, 'ecole'],
  [routes.ecoleDuDehors, 'ecole'],
  [routes.apresLesEbm, 'ecole'],
  [routes.campus, 'campus'],
  [routes.grandir, 'vie'],
  [routes.calendrier, 'vie'],
  [routes.admissions, 'admissions'],
  [routes.contact, 'admissions'],
]

/** Path part of an href or pathname: no query, no hash, no trailing slash ("/" stays "/"). */
export function normalizePath(href: string): string {
  return href.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/'
}

export function getSectionForPath(pathname: string | null | undefined): NavId | undefined {
  if (!pathname) return undefined
  const path = normalizePath(pathname)
  for (const [prefix, id] of sectionPrefixes) {
    if (path === prefix || path.startsWith(`${prefix}/`)) return id
  }
  return undefined
}
