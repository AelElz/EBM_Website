import { routes } from '@/lib/routes'
import { migrationPages } from './migration/route-registry'
import { admissionsFaqSearchEntries } from './migration/admissions-faq-search'

import { pages, type PageSlug } from './pages'
import { navigation, site } from './site'

/*
 * Site search index for the header's search overlay (components/site/header/search-overlay.tsx):
 * every page of the site with its title, its one-line purpose and the words people type for it.
 * It searches page titles/descriptions and curated FAQ questions/answer terms.
 * No internal gap register is indexed; Payload can replace this static data later.
 * Client-safe: loaded with the overlay's chunk, on demand.
 */

export interface SearchEntry {
  title: string
  /** One line under the title in the results. */
  text: string
  href: string
  /** Menu the page belongs to, shown above the title. */
  section?: string
  external?: boolean
}

/** Words people type for each page: synonyms and spellings, not facts. Accents are ignored. */
const keywords: Partial<Record<PageSlug, string>> = {
  'le-reseau': 'reseau histoire direction valeurs mission federation wallonie bruxelles belge',
  pedagogie: 'enseignement programme maternelle primaire secondaire cess langues methode',
  'ecole-du-dehors': 'nature exterieur plein air jardin dehors',
  'grandir-aux-ebm': 'vie scolaire activites sport arts musique cantine garderie extrascolaire',
  'nos-campus': 'campus ecoles sites casablanca rabat',
  'campus-casablanca': 'casa dar bouazza adresse plan',
  'campus-rabat': 'hay riad adresse plan',
  'apres-les-ebm': 'anciens alumni etudes superieures universite carriere diplome',
  admissions: 'inscription inscrire admission rentree',
  'admissions-comprendre': 'etapes conditions faq questions age',
  'admissions-documents-et-frais': 'frais tarifs prix scolarite cout documents dossier papiers',
  calendrier: 'evenements dates agenda visites rentree vacances',
  'admissions-candidater': 'candidature inscription dossier en ligne formulaire eduka',
  contact: 'telephone tel email mail adresse joindre ecrire',
  recrutement: 'emploi travail poste carriere enseignant professeur candidature spontanee',
  'reserver-une-visite': 'visite visiter rendez-vous decouvrir',
  confidentialite: 'donnees personnelles vie privee rgpd cookies',
}

const sectionLabel = (id: string | null) => navigation.find((group) => group.id === id)?.label

const entries: (SearchEntry & { keywords: string })[] = [
  ...Object.values(pages).map((page) => ({
    title: page.title,
    text: migrationPages.find(item => item.route === page.route)?.description ?? page.intro,
    href: page.route,
    section: sectionLabel(page.section),
    keywords: keywords[page.slug] ?? '',
  })),
  ...admissionsFaqSearchEntries.map(entry => ({
    title: entry.title,
    text: entry.text,
    href: entry.href,
    section: 'Questions fréquentes',
    keywords: Array.isArray(entry.keywords) ? entry.keywords.join(' ') : entry.keywords,
  })),
  {
    title: site.eduka.label,
    text: 'Le portail des familles, pour se connecter.',
    href: routes.espaceEduka,
    keywords: 'parents connexion login portail compte notes bulletin',
  },
  {
    title: 'Plan du site',
    text: 'Toutes les pages du site.',
    href: routes.planDuSite,
    keywords: 'pages liste',
  },
]

/** Lower case, no accents, one character in for one character out (so ranges can be marked). */
export const fold = (text: string) =>
  Array.from(text, (character) => character.normalize('NFD')[0].toLowerCase()).join('')

const words = (text: string) => fold(text).split(/[^a-z0-9]+/).filter(Boolean)

const index = entries.map((entry) => ({
  entry,
  title: words(entry.title),
  rest: words(`${entry.text} ${entry.section ?? ''} ${entry.keywords}`),
}))

/** Query words, folded. Exported for highlighting. */
export const queryWords = (query: string) => words(query)

/**
 * Pages matching every word of the query (each word as the start of a word), best first:
 * a word found in the title counts 3, elsewhere 1.
 */
export function searchSite(query: string, limit = 6): SearchEntry[] {
  const terms = queryWords(query)
  if (!terms.length) return []

  return index
    .map(({ entry, title, rest }) => {
      let score = 0
      for (const term of terms) {
        if (title.some((word) => word.startsWith(term))) score += 3
        else if (rest.some((word) => word.startsWith(term))) score += 1
        else return null
      }
      return { entry, score }
    })
    .filter((result) => result !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.entry)
}

/** Shown before anything is typed: tapping one types it into the field. */
export const searchSuggestions = [
  'Admissions',
  'Frais de scolarité',
  'Calendrier',
  'École du dehors',
  'Candidater',
  'Nos campus',
]
