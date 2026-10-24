# Former detailed homepage copy

Archived when Ayoub requested shorter age groups and a visual certificate path. Reference for future inner pages; recheck time-sensitive and conflicting claims before publication.

## Former age/campus data

```ts
import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import type { LinkItem } from './types'

/*
 * The year-by-year tool of the home page ("Et votre enfant, à la rentrée ?", journey.tsx and the
 * client journey-picker.tsx): pick an age and a campus, read the class, the languages, the next
 * official exam, the day and the campus services. Its own module so the client chunk carries only
 * this data. Facts from EBM's current site ("Statut et fonctionnement", "Parcours scolaire", the
 * Casablanca and Rabat pages, the FAQ); hours as published for the current school year, EBM to
 * confirm them every year.
 */

export type CampusKey = 'casablanca' | 'rabat'
export type Section = 'maternelle' | 'primaire' | 'secondaire'

export interface SchoolYear {
  /** Age at the start of the school year (indicative: the class follows the birth year). */
  age: number
  /** Short code used by the school, e.g. "P3". */
  code: string
  /** Full name, e.g. "3e primaire". */
  name: string
  section: Section
}

/** Classe d'accueil (M0) at 2, then one year per class up to the 6th secondary (S6) at 17. */
export const schoolYears: SchoolYear[] = [
  { age: 2, code: 'M0', name: 'Classe d’accueil', section: 'maternelle' },
  { age: 3, code: 'M1', name: '1re maternelle', section: 'maternelle' },
  { age: 4, code: 'M2', name: '2e maternelle', section: 'maternelle' },
  { age: 5, code: 'M3', name: '3e maternelle', section: 'maternelle' },
  { age: 6, code: 'P1', name: '1re primaire', section: 'primaire' },
  { age: 7, code: 'P2', name: '2e primaire', section: 'primaire' },
  { age: 8, code: 'P3', name: '3e primaire', section: 'primaire' },
  { age: 9, code: 'P4', name: '4e primaire', section: 'primaire' },
  { age: 10, code: 'P5', name: '5e primaire', section: 'primaire' },
  { age: 11, code: 'P6', name: '6e primaire', section: 'primaire' },
  { age: 12, code: 'S1', name: '1re secondaire', section: 'secondaire' },
  { age: 13, code: 'S2', name: '2e secondaire', section: 'secondaire' },
  { age: 14, code: 'S3', name: '3e secondaire', section: 'secondaire' },
  { age: 15, code: 'S4', name: '4e secondaire', section: 'secondaire' },
  { age: 16, code: 'S5', name: '5e secondaire', section: 'secondaire' },
  { age: 17, code: 'S6', name: '6e secondaire', section: 'secondaire' },
]

/** Languages and the age (class) they start at. English or Dutch from P1 in Rabat. */
export const languages = [
  { name: 'Français', from: 2, note: 'langue d’enseignement' },
  { name: 'Arabe', from: 5, note: 'dès la 3e maternelle' },
  { name: 'Anglais', from: 6, note: 'dès la 1re primaire, avec certifications Cambridge' },
  { name: 'Espagnol', from: 15, note: 'dès la 4e secondaire' },
] as const

/** Official Belgian external exams, at the end of these years (age of that year). */
export const externalExams = [
  { code: 'CEB', name: 'Certificat d’études de base', end: 'fin de 6e primaire', age: 11 },
  { code: 'CE1D', name: 'Certificat du premier degré', end: 'fin de 2e secondaire', age: 13 },
  { code: 'CESS', name: 'Certificat d’enseignement secondaire supérieur', end: 'fin de 6e secondaire', age: 17 },
] as const

/** Admissions are open at every level up to S1 (age 12), within the places available. */
export const lastAdmissionAge = 12

export interface DayPlan {
  /** Lines of the typical day, in order. */
  lines: string[]
  /** Wednesday, which ends at lunchtime. */
  wednesday: string
}

export interface CampusDay {
  label: string
  maternelle: DayPlan
  primaire: DayPlan
  secondaire: DayPlan
  services: string[]
}

/** Hours as published by each school for the current year (EBM to confirm every year). */
export const campusDays: Record<CampusKey, CampusDay> = {
  casablanca: {
    label: 'Casablanca',
    maternelle: {
      lines: ['7h45 ouverture des portes', '8h50 début des cours', '15h30 fin des cours'],
      wednesday: 'Le mercredi, fin des cours à 12h10',
    },
    primaire: {
      lines: ['7h45 ouverture des portes', '8h25 début des cours', '15h30 fin des cours'],
      wednesday: 'Le mercredi, fin des cours à 13h',
    },
    secondaire: {
      lines: ['8h25 début des cours', '16h30 fin des cours', 'Mardi et jeudi, 17h20 pour le dernier degré'],
      wednesday: 'Le mercredi, fin des cours à 13h',
    },
    services: [
      'Repas chaud préparé sur place',
      'Surveillance 30 minutes avant et après les cours, garde jusqu’à 17h',
      'Transport scolaire',
      'Activités de l’EBM ExtraClub',
    ],
  },
  rabat: {
    label: 'Rabat',
    maternelle: {
      lines: ['7h45 ouverture des portes', '8h25 début des cours', '15h30 fin des cours'],
      wednesday: 'Le mercredi, fin des cours à 12h10',
    },
    primaire: {
      lines: ['7h45 ouverture des portes', '8h25 début des cours', '15h30 fin des cours'],
      wednesday: 'Le mercredi, fin des cours à 13h',
    },
    secondaire: {
      lines: ['8h25 début des cours', '16h20 fin des cours, 15h30 le vendredi'],
      wednesday: 'Le mercredi, fin des cours à 12h10',
    },
    services: [
      'Repas chaud préparé sur place',
      'Surveillance 30 minutes avant et après les cours',
      'Activités de l’EBM ExtraClub',
    ],
  },
}

export const journey = {
  title: `Et votre enfant, à la rentrée${NNBSP}?`,
  text: `Choisissez son âge et son campus${NNBSP}: voici sa classe, ses langues, la prochaine épreuve officielle et sa journée.`,
  note: `Indicatif${NNBSP}: la classe dépend de l’année de naissance, selon les règles de l’enseignement belge.`,
  hoursNote: 'Horaires indicatifs, à confirmer auprès du campus.',
  apply: { label: 'Candidater en ligne', href: routes.candidater } satisfies LinkItem,
  steps: { label: 'Les étapes de l’admission', href: routes.comprendre } satisfies LinkItem,
}

```

## Former institutional table

```ts
export interface GuaranteeRow {
  /** When it applies. Rows of one group share it: it is printed once, on the group's first row. */
  when: string
  what: string
  who: string
  result: string
}

export const guarantee = {
  /** Two lines, the second indented (guarantee.tsx). */
  title: ['Contrôlée', 'par la Belgique'],
  text: `Nos écoles ne s’inspirent pas de l’enseignement belge${NNBSP}: elles en font partie, avec ses règles, ses contrôles et ses diplômes.`,
  groups: [
    [
      {
        when: 'Depuis 2014',
        what: 'Statut d’établissement d’enseignement étranger',
        who: 'Accord du 21 mai 2014 entre le Royaume du Maroc et la Fédération Wallonie-Bruxelles',
        result: 'Un cadre stable et durable',
      },
    ],
    [
      {
        when: 'Chaque année',
        what: 'Enseignants et directions diplômés de l’enseignement supérieur belge',
        who: 'Obligation légale de la Fédération Wallonie-Bruxelles',
        result: 'Une qualification garantie',
      },
      {
        when: 'Chaque année',
        what: 'Niveau des études et respect des programmes',
        who: 'Inspection de l’enseignement belge francophone',
        result: 'Un niveau contrôlé',
      },
      {
        when: 'Chaque année',
        what: 'Langue et culture arabes, histoire et géographie du Maroc',
        who: 'En plus du programme belge',
        result: 'Les deux cultures',
      },
    ],
    [
      {
        when: 'Fin de 6e primaire',
        what: 'Épreuve externe commune',
        who: 'Fédération Wallonie-Bruxelles',
        result: 'CEB',
      },
    ],
    [
      {
        when: 'Fin de 2e secondaire',
        what: 'Épreuve externe commune',
        who: 'Fédération Wallonie-Bruxelles',
        result: 'CE1D',
      },
    ],
    [
      {
        when: 'Fin de 6e secondaire',
        what: 'Épreuve externe commune',
        who: 'Fédération Wallonie-Bruxelles',
        result: 'CESS, reconnu au Maroc et à l’international',
      },
    ],
    [
      {
        when: 'Tout le parcours',
        what: 'Anglais dès la 1re primaire',
        who: 'Certifications Cambridge',
        result: 'Niveau B2 minimum en fin de secondaire',
      },
    ],
  ] satisfies GuaranteeRow[][],
}


```
