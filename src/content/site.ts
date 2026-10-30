import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import type { ImageAsset, LinkItem } from './types'

/*
 * Site-wide facts: contacts, campuses' addresses, external services, navigation.
 * Every value comes from EBM's current site, brand guide or blueprint (docs/HOME-SPEC.md).
 * Future source: Payload globals `site-settings`, `navigation`, `footer`.
 */

export type CampusId = 'casablanca' | 'rabat'

export interface Phone {
  /** City label shown before the number, e.g. "Casablanca". */
  label: string
  /** Human format with spaces, e.g. "+212 522 64 12 12". */
  display: string
  /** tel: URI without spaces. */
  href: string
}

export interface Email {
  address: string
  href: string
}

export interface PostalAddress {
  /** Lines as printed on the site (footer, contact). */
  lines: string[]
  /** schema.org PostalAddress parts (JSON-LD). */
  streetAddress: string
  addressLocality: string
  postalCode?: string
  addressCountry: 'MA'
}

const casablancaPhone: Phone = {
  label: 'Casablanca',
  display: '+212 522 64 12 12',
  href: 'tel:+212522641212',
}

const rabatPhone: Phone = {
  label: 'Rabat',
  display: '+212 537 717 278',
  href: 'tel:+212537717278',
}

const email = (address: string): Email => ({ address, href: `mailto:${address}` })

export interface ActionLink extends LinkItem {
  /** Longer wording where space allows (mobile bar, CTA band). */
  longLabel?: string
}

export interface SiteConfig {
  name: string
  shortName: string
  description: string
  statement: string
  url: string
  locale: string
  phones: Record<CampusId, Phone>
  emails: Record<CampusId, Email[]>
  addresses: Record<CampusId, PostalAddress>
  instagram: { handle: string; url: string }
  eduka: { label: string; portalUrl: string; loginUrl: string; host: string; applicationUrl: string }
  logos: { horizontal: ImageAsset; stacked: ImageAsset }
  partners: ImageAsset
  actions: {
    calendar: ActionLink
    apply: ActionLink
    visit: ActionLink
    contact: ActionLink
    search: ActionLink & { placeholder: string }
  }
}

export const site: SiteConfig = {
  name: 'Écoles Belges au Maroc',
  shortName: 'EBM',
  /** Default meta description (same sentence as the home hero). */
  description:
    'Le programme et les diplômes de la Fédération Wallonie-Bruxelles, de 2 à 18 ans, à Casablanca et à Rabat.',
  /** Footer statement under the stacked logo. */
  statement:
    'Établissements scolaires belges à programme de la Fédération Wallonie-Bruxelles, de la classe d’accueil au CESS.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ecolebelge.org',
  locale: 'fr_MA',

  phones: {
    casablanca: casablancaPhone,
    rabat: rabatPhone,
  },

  emails: {
    casablanca: [email('fondamental@ecolebelge.org'), email('secondaire@ecolebelge.org')],
    rabat: [email('ebmrabat@ecolebelge.org')],
  },

  addresses: {
    casablanca: {
      lines: ['Route d’Azemmour, Km 13', 'Ouled Azzouz, Dar Bouazza'],
      streetAddress: 'Route d’Azemmour, Km 13, Ouled Azzouz',
      addressLocality: 'Dar Bouazza',
      addressCountry: 'MA',
    },
    rabat: {
      lines: ['Avenue Sophora, Hay Riad', 'Secteur 23, 10110 Rabat'],
      streetAddress: 'Avenue Sophora, Hay Riad, Secteur 23',
      addressLocality: 'Rabat',
      postalCode: '10110',
      addressCountry: 'MA',
    },
  },

  instagram: {
    handle: '@ecolesbelgesaumaroc',
    url: 'https://www.instagram.com/ecolesbelgesaumaroc/',
  },

  eduka: {
    label: 'Espace Eduka',
    /** Parents' portal. The site links to its own Espace Eduka page (/espace-eduka), which
     *  hands off to Eduka's sign-in page: passwords are only ever typed on Eduka. */
    portalUrl: 'https://ecolebelge.eduka.school/',
    loginUrl: 'https://ecolebelge.eduka.school/login',
    /** Shown on /espace-eduka so families can check the address before typing a password. */
    host: 'ecolebelge.eduka.school',
    /** Current hosted application form (Candidater en ligne, until a custom form is verified). */
    applicationUrl: 'https://ecolebelge.eduka.school/registration/web/13/a1213c361ab0',
  },

  logos: {
    /** Header logo. SVG viewBox 365.48 x 54.32; width/height = display size at 38px high. */
    horizontal: {
      src: '/brand/logo-ebm-horizontal.svg',
      alt: 'Écoles Belges au Maroc, Enseignement Wallonie-Bruxelles',
      width: 256,
      height: 38,
    },
    /** Footer logo. SVG viewBox 176.76 x 79.62; width/height = display size at 64px high. */
    stacked: {
      src: '/brand/logo-ebm-stacked.svg',
      alt: 'Écoles Belges au Maroc, Enseignement Wallonie-Bruxelles',
      width: 142,
      height: 64,
    },
  },

  /** White partner logos for the charcoal footer bar. */
  partners: {
    src: '/brand/partners-white.png',
    alt: `Partenaires${NNBSP}: Fédération Wallonie-Bruxelles, Wallonie-Bruxelles International, AEBE`,
    width: 856,
    height: 170,
  },

  /*
   * Header and phone-bar actions (Ayoub, 24 Oct 2026): Calendrier + Candidater. The visit is a
   * later step, for families already convinced: the form is on /calendrier#visite (since
   * 30 Oct 2026, "Calendrier & visites" in the Vie scolaire menu) and in the footer ("Demander
   * une visite"), not in the bars. Contact details live in the footer only.
   */
  actions: {
    calendar: { label: 'Calendrier', href: routes.calendrier },
    apply: { label: 'Candidater', longLabel: 'Candidater en ligne', href: routes.candidater },
    visit: { label: 'Demander une visite', href: routes.reserverVisite },
    contact: { label: 'Nous contacter', href: routes.contact },
    search: { label: 'Rechercher', placeholder: 'Rechercher…', href: routes.recherche },
  },
}

/* ------------------------------------------------------------------------------------------ */
/* Navigation                                                                                  */
/* ------------------------------------------------------------------------------------------ */

export type NavId = 'ecole' | 'campus' | 'vie' | 'admissions'

/** A menu link; `hint` is the one line under it saying when to go there. */
export interface NavItem extends LinkItem {
  hint?: string
}

export interface NavGroup {
  id: NavId
  /** Menu trigger label. */
  label: string
  /** Landing page of the group (first link of the panel). */
  href: string
  items: NavItem[]
}

/** Header mega-menus (4 groups) and mobile sheet accordions, in display order. Every item has
 *  its one-line hint under the label (Ayoub, 30 Oct 2026: every small text beneath every big
 *  text, in all the menus). */
export const navigation: NavGroup[] = [
  {
    id: 'ecole',
    label: 'L’école',
    href: routes.reseau,
    items: [
      { label: 'Le réseau EBM', href: routes.reseau, hint: 'Notre histoire, nos valeurs, le cadre belge' },
      { label: 'Pédagogie', href: routes.pedagogie, hint: 'Le parcours de 2 à 18 ans, langues et diplômes' },
      { label: 'L’école du dehors', href: routes.ecoleDuDehors, hint: 'Apprendre dans la nature, à Casablanca' },
      { label: 'Après les EBM', href: routes.apresLesEbm, hint: 'Le CESS, l’orientation, les études supérieures' },
    ],
  },
  {
    id: 'campus',
    label: 'Nos campus',
    href: routes.campus,
    items: [
      { label: 'Nos campus', href: routes.campus, hint: 'Comparer Casablanca et Rabat' },
      { label: 'Campus de Casablanca', href: routes.campusCasablanca, hint: `Dar Bouazza${NNBSP}: espaces, services, accès` },
      { label: 'Campus de Rabat', href: routes.campusRabat, hint: `Hay Riad${NNBSP}: espaces, services, accès` },
    ],
  },
  {
    id: 'vie',
    label: 'Vie scolaire',
    href: routes.grandir,
    items: [
      { label: 'Grandir aux EBM', href: routes.grandir, hint: 'Activités, projets et services' },
      /* 30 Oct 2026 (Ayoub): the calendar sits here only, not also under Admissions. */
      { label: 'Calendrier & visites', href: routes.calendrier, hint: 'Les dates de l’année, demander une visite' },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    href: routes.admissions,
    items: [
      /* 30 Oct 2026 (Ayoub): no page repeats another. "Comprendre", the questions and
         "Candidater en ligne" merged into Admissions (the Candidater button in the header goes
         to its #candidater section); "Réserver une visite" into Calendrier & visites, which is
         in Vie scolaire only. */
      { label: 'Admissions', href: routes.admissions, hint: 'Les étapes, vos questions, candidater en ligne' },
      { label: 'Documents & frais', href: routes.documentsEtFrais, hint: 'Les pièces du dossier et le barème' },
      { label: 'Contact', href: routes.contact, hint: 'Écrire ou appeler votre campus' },
    ],
  },
]

export interface FooterColumn {
  title: string
  links: LinkItem[]
}

/** Footer link columns. The two campus columns are built from `site` (see campuses.ts). */
export const footerNav: FooterColumn[] = [
  {
    title: 'Accès rapides',
    links: [
      { label: 'Calendrier', href: routes.calendrier },
      { label: 'Demander une visite', href: routes.reserverVisite },
      { label: 'Candidater en ligne', href: routes.candidater },
      { label: 'Parents · Espace Eduka', href: routes.espaceEduka },
      { label: 'Nous contacter', href: routes.contact },
      { label: 'Recrutement', href: routes.recrutement },
    ],
  },
  {
    title: 'L’école',
    links: [
      { label: 'Le réseau EBM', href: routes.reseau },
      { label: 'Pédagogie', href: routes.pedagogie },
      { label: 'L’école du dehors', href: routes.ecoleDuDehors },
      { label: 'Grandir aux EBM', href: routes.grandir },
      { label: 'Après les EBM', href: routes.apresLesEbm },
    ],
  },
]

/** Bottom bar links (charcoal footer bar). */
export const legalLinks: LinkItem[] = [
  { label: 'Mentions légales', href: routes.mentionsLegales },
  { label: 'Conditions d’utilisation', href: routes.conditions },
  { label: 'Confidentialité et sécurité', href: routes.confidentialite },
  { label: 'Cookies', href: routes.cookies },
  { label: 'Plan du site', href: routes.planDuSite },
]

/** "En attendant" links shown on placeholder pages: real contacts only. */
export const contactLinks: LinkItem[] = [
  { label: `${casablancaPhone.label} ${casablancaPhone.display}`, href: casablancaPhone.href },
  { label: `${rabatPhone.label} ${rabatPhone.display}`, href: rabatPhone.href },
  { label: `Instagram ${site.instagram.handle}`, href: site.instagram.url, external: true },
]
