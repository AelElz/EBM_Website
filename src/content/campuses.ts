import { routes } from '@/lib/routes'

import { site, type CampusId, type Email, type Phone, type PostalAddress } from './site'
import type { ImageAsset } from './types'

/*
 * Data for the shared campus template (src/app/(frontend)/nos-campus/[campus]/page.tsx).
 * Only verified facts; pupil numbers per campus are not used (1 045 vs 1 050 is unresolved,
 * docs/ARCHITECTURE.md section 6). Future source: Payload collection `campuses`.
 */

export interface Campus {
  slug: CampusId
  route: string
  /** Page title, e.g. "Campus de Casablanca". */
  name: string
  /** City only, e.g. "Casablanca". */
  city: string
  /** Neighbourhood, e.g. "Dar Bouazza". */
  district: string
  /** One-line purpose shown under the page h1. */
  intro: string
  address: PostalAddress
  phone: Phone
  emails: Email[]
  /** Square terracotta pictogram (city drawing + name). 189.41 x 189.41 viewBox. */
  picto: ImageAsset
  /** Representative photo of the campus. */
  image: ImageAsset
  /** Sections planned for the campus page (placeholder notice). */
  planned: string[]
}

const sharedPlanned = {
  before: ['Présentation du campus', 'Niveaux et sections', 'Installations'],
  after: ['Plan illustré du campus', 'Équipe de direction', 'Accès et contacts', 'Galerie photo'],
}

export const campuses: Record<CampusId, Campus> = {
  casablanca: {
    slug: 'casablanca',
    route: routes.campusCasablanca,
    name: 'Campus de Casablanca',
    city: 'Casablanca',
    district: 'Dar Bouazza',
    intro: 'Notre campus de Dar Bouazza, route d’Azemmour, à Casablanca.',
    address: site.addresses.casablanca,
    phone: site.phones.casablanca,
    emails: site.emails.casablanca,
    picto: {
      src: '/brand/picto-casablanca.svg',
      alt: 'Pictogramme du campus de Casablanca',
      width: 189,
      height: 189,
    },
    image: {
      src: '/images/hero-casablanca-entree.jpg',
      alt: 'L’entrée de l’École belge de Casablanca, à Dar Bouazza.',
      width: 1448,
      height: 1086,
      position: '50% 40%',
    },
    planned: [...sharedPlanned.before, 'L’école du dehors', ...sharedPlanned.after],
  },
  rabat: {
    slug: 'rabat',
    route: routes.campusRabat,
    name: 'Campus de Rabat',
    city: 'Rabat',
    district: 'Hay Riad',
    intro: 'Notre campus de Hay Riad, à Rabat.',
    address: site.addresses.rabat,
    phone: site.phones.rabat,
    emails: site.emails.rabat,
    picto: {
      src: '/brand/picto-rabat.svg',
      alt: 'Pictogramme du campus de Rabat',
      width: 189,
      height: 189,
    },
    image: {
      src: '/images/hero-rabat-batiment.jpg',
      alt: 'Le bâtiment du secondaire de l’École belge de Rabat, à Hay Riad.',
      width: 1448,
      height: 1086,
      position: '50% 45%',
    },
    planned: [...sharedPlanned.before, ...sharedPlanned.after],
  },
}

/** Display order: Casablanca, then Rabat. */
export const campusList: Campus[] = [campuses.casablanca, campuses.rabat]

export function getCampus(slug: string): Campus | undefined {
  return campusList.find((campus) => campus.slug === slug)
}
