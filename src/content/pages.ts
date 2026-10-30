import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import { campuses } from './campuses'
import { contactLinks, site, type NavId } from './site'
import type { LinkItem } from './types'

/*
 * Placeholder pages (noindex) until Ayoub specifies their content (docs/HOME-SPEC.md,
 * "Placeholder pages"). `intro` is the blueprint's one-line purpose; `planned` lists the blocks
 * the page will hold, shown in the "Page en préparation" notice. Nothing here is a feature.
 */

export type PageSlug =
  // 14 main pages
  | 'le-reseau'
  | 'pedagogie'
  | 'ecole-du-dehors'
  | 'grandir-aux-ebm'
  | 'nos-campus'
  | 'campus-casablanca'
  | 'campus-rabat'
  | 'apres-les-ebm'
  | 'admissions'
  | 'admissions-documents-et-frais'
  | 'calendrier'
  | 'contact'
  // system placeholders
  | 'mentions-legales'
  | 'confidentialite'
  | 'recrutement'

export interface PlaceholderPageContent {
  slug: PageSlug
  route: string
  /** h1 and <title>. */
  title: string
  /** One-line purpose under the h1 (also the meta description). */
  intro: string
  /** Header menu to highlight; null for system pages. */
  section: NavId | null
  /** Parent page for the breadcrumb (Accueil / parent / page). */
  parent?: PageSlug
  /** Blocks planned for the page. */
  planned: string[]
  /** Real, working links shown under "En attendant" (defaults to the phone numbers). */
  links?: LinkItem[]
  kind: 'main' | 'system'
}

const main = (page: Omit<PlaceholderPageContent, 'kind'>): PlaceholderPageContent => ({
  ...page,
  kind: 'main',
})
const system = (page: Omit<PlaceholderPageContent, 'kind'>): PlaceholderPageContent => ({
  ...page,
  kind: 'system',
})

const emailLinks: LinkItem[] = [...site.emails.casablanca, ...site.emails.rabat].map((e) => ({
  label: e.address,
  href: e.href,
}))

export const pages: Record<PageSlug, PlaceholderPageContent> = {
  'le-reseau': main({
    slug: 'le-reseau',
    route: routes.reseau,
    title: 'Le réseau EBM',
    intro: `Qui est EBM${NNBSP}: des écoles belges au Maroc, au programme de la Fédération Wallonie-Bruxelles.`,
    section: 'ecole',
    planned: [
      'Mot de la direction',
      'Mission, vision et valeurs',
      'L’enseignement de la Fédération Wallonie-Bruxelles',
      'Histoire du réseau, depuis 2014',
      'Direction et équipes',
      `Partenaires${NNBSP}: Fédération Wallonie-Bruxelles, WBI et AEBE`,
    ],
  }),
  pedagogie: main({
    slug: 'pedagogie',
    route: routes.pedagogie,
    title: 'Pédagogie',
    intro: 'Comment les enfants apprennent, de la maternelle à la fin du secondaire.',
    section: 'ecole',
    planned: [
      'Notre approche pédagogique',
      'Le parcours, de la maternelle au CESS',
      `Les langues${NNBSP}: français, arabe, anglais et espagnol`,
      'Évaluations et diplômes de la Fédération Wallonie-Bruxelles',
      'Accompagnement des élèves',
      'Projets et sorties pédagogiques',
    ],
  }),
  'ecole-du-dehors': main({
    slug: 'ecole-du-dehors',
    route: routes.ecoleDuDehors,
    title: 'L’école du dehors',
    intro: 'L’école à ciel ouvert du campus de Casablanca.',
    section: 'ecole',
    planned: [
      'Le principe de l’école du dehors',
      'Un site de 1,5 hectare à Casablanca',
      'Les apprentissages au dehors, par niveau',
      'Une journée au dehors',
      'Galerie photo',
    ],
  }),
  'grandir-aux-ebm': main({
    slug: 'grandir-aux-ebm',
    route: routes.grandir,
    title: 'Grandir aux EBM',
    intro: `La vie à l’école${NNBSP}: activités, sport, arts, bien-être et services.`,
    section: 'vie',
    planned: [
      'Activités extrascolaires',
      'Sport',
      'Arts et culture',
      'Bien-être et accompagnement des élèves',
      'Cantine et garderie',
      'La vie de l’école en images',
    ],
  }),
  'nos-campus': main({
    slug: 'nos-campus',
    route: routes.campus,
    title: 'Nos campus',
    intro: 'Deux campus, une même exigence.',
    section: 'campus',
    planned: [
      'Deux campus, une même exigence',
      'Le campus de Casablanca, à Dar Bouazza',
      'Le campus de Rabat, à Hay Riad',
      'Les niveaux proposés sur chaque campus',
      'Accès et plans',
    ],
    links: [
      { label: campuses.casablanca.name, href: campuses.casablanca.route },
      { label: campuses.rabat.name, href: campuses.rabat.route },
    ],
  }),
  'campus-casablanca': main({
    slug: 'campus-casablanca',
    route: campuses.casablanca.route,
    title: campuses.casablanca.name,
    intro: campuses.casablanca.intro,
    section: 'campus',
    parent: 'nos-campus',
    planned: campuses.casablanca.planned,
    links: [
      { label: `Téléphone ${campuses.casablanca.phone.display}`, href: campuses.casablanca.phone.href },
      ...campuses.casablanca.emails.map((e) => ({ label: e.address, href: e.href })),
    ],
  }),
  'campus-rabat': main({
    slug: 'campus-rabat',
    route: campuses.rabat.route,
    title: campuses.rabat.name,
    intro: campuses.rabat.intro,
    section: 'campus',
    parent: 'nos-campus',
    planned: campuses.rabat.planned,
    links: [
      { label: `Téléphone ${campuses.rabat.phone.display}`, href: campuses.rabat.phone.href },
      ...campuses.rabat.emails.map((e) => ({ label: e.address, href: e.href })),
    ],
  }),
  'apres-les-ebm': main({
    slug: 'apres-les-ebm',
    route: routes.apresLesEbm,
    title: 'Après les EBM',
    intro: 'Alumni, promotions et études supérieures.',
    section: 'ecole',
    planned: [
      'Le CESS et la poursuite d’études',
      'Orientation et accompagnement',
      'Parcours d’anciens élèves',
      'Les promotions',
      'Rester en contact avec le réseau',
    ],
  }),
  admissions: main({
    slug: 'admissions',
    route: routes.admissions,
    title: 'Admissions',
    intro: 'Le point de départ du parcours d’admission.',
    section: 'admissions',
    planned: [
      'Le parcours d’admission en bref',
      'Niveaux et âges d’entrée',
      'Calendrier des admissions',
      'Documents & frais',
      'Candidater en ligne',
      'Les contacts des admissions, par campus',
    ],
    links: [
      { label: 'Candidater sur Eduka', href: site.eduka.applicationUrl, external: true },
      ...contactLinks.slice(0, 2),
    ],
  }),
  'admissions-documents-et-frais': main({
    slug: 'admissions-documents-et-frais',
    route: routes.documentsEtFrais,
    title: 'Documents & frais',
    intro: 'Frais de scolarité et documents requis.',
    section: 'admissions',
    parent: 'admissions',
    planned: [
      'Frais de scolarité, par campus et par niveau',
      'Frais d’inscription et frais annexes',
      'Cantine, garderie et activités',
      'Documents à fournir',
      'Modalités de paiement',
      'Documents à télécharger (PDF)',
    ],
  }),
  calendrier: main({
    slug: 'calendrier',
    route: routes.calendrier,
    title: 'Calendrier & visites',
    intro: 'Événements, visites et réservation.',
    section: 'admissions',
    planned: [
      'Agenda des événements, filtrable par campus',
      'Visites des campus',
      'Journées portes ouvertes et webinaires',
      'Réservation en ligne',
      'Calendrier scolaire',
      'Abonnement au calendrier (.ics)',
    ],
  }),
  contact: main({
    slug: 'contact',
    route: routes.contact,
    title: 'Contact',
    intro: 'Joindre la bonne équipe, sur le bon campus.',
    section: 'admissions',
    planned: [
      'Les coordonnées des deux campus',
      'Le bon interlocuteur selon votre demande',
      'Formulaire de contact',
      'Horaires des secrétariats',
      'Plans d’accès',
    ],
    links: [...contactLinks.slice(0, 2), ...emailLinks],
  }),

  'mentions-legales': system({
    slug: 'mentions-legales',
    route: routes.mentionsLegales,
    title: 'Mentions légales',
    intro: 'Les informations légales relatives au site des Écoles Belges au Maroc.',
    section: null,
    planned: [
      'Éditeur du site',
      'Directeur de la publication',
      'Hébergement',
      'Propriété intellectuelle',
      'Crédits photographiques',
      'Contact',
    ],
  }),
  confidentialite: system({
    slug: 'confidentialite',
    route: routes.confidentialite,
    title: 'Politique de confidentialité',
    intro: 'Comment nous traitons vos données personnelles, conformément à la loi 09-08.',
    section: null,
    planned: [
      'Responsable du traitement',
      'Données collectées et finalités',
      'Durées de conservation',
      'Vos droits au titre de la loi 09-08',
      'Déclarations auprès de la CNDP',
      'Cookies et mesure d’audience',
      'Exercer vos droits',
    ],
  }),
  recrutement: system({
    slug: 'recrutement',
    route: routes.recrutement,
    title: 'Recrutement',
    intro: 'Rejoindre les équipes des Écoles Belges au Maroc.',
    section: null,
    planned: [
      'Travailler aux EBM',
      'Postes ouverts sur nos deux campus',
      'Candidature spontanée',
      'Contact recrutement',
    ],
  }),
}

export const mainPages: PlaceholderPageContent[] = Object.values(pages).filter(
  (page) => page.kind === 'main',
)

/** Breadcrumb trail after "Accueil" (PageHero prepends Accueil itself). */
export function getBreadcrumb(page: PlaceholderPageContent): { label: string; href?: string }[] {
  const trail: { label: string; href?: string }[] = [{ label: page.title }]
  let parentSlug = page.parent
  while (parentSlug) {
    const parent = pages[parentSlug]
    trail.unshift({ label: parent.title, href: parent.route })
    parentSlug = parent.parent
  }
  return trail
}
