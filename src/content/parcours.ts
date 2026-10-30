import { NNBSP } from '@/lib/typography'

import type { ImageAsset } from './types'

/*
 * The school path, word for word from EBM's validated `Parcours_scolaire.docx` (Ayoub, 30 Oct
 * 2026: "this is the real validated data"). Only the typography is the site's: curly
 * apostrophes and a narrow no-break space before colons. **Double asterisks** are the document's
 * bold runs. Used by the home band 5 (home-bands.ts) and by /pedagogie (pedagogy-page.tsx).
 */

export const parcoursOverview = [
  'Les Écoles Belges au Maroc proposent **un parcours scolaire complet, de la maternelle au secondaire**, fondé sur les programmes officiels de l’enseignement belge francophone.',
  'Chaque étape répond à des objectifs pédagogiques précis et prépare la suivante, assurant une progression cohérente et continue des apprentissages.',
  'Cette continuité repose notamment sur **l’expertise d’enseignants qualifiés, formés en Belgique et spécialisés dans leur discipline**, conformément aux exigences de la Fédération Wallonie-Bruxelles.',
]

export interface ParcoursStage {
  id: 'accueil' | 'maternelle' | 'primaire' | 'secondaire'
  /** The stage's name as the document heads it, without the ages. */
  name: string
  ages: string
  /** The document's second heading, e.g. "Les premiers pas à l’école". */
  title: string
  paragraphs: string[]
  listIntro: string
  points: string[]
  /** The bold closing sentence. */
  closing: string
  photo: ImageAsset
}

export const parcoursStages: ParcoursStage[] = [
  {
    id: 'accueil',
    name: 'La classe d’accueil',
    ages: '2 ans',
    title: 'Les premiers pas à l’école',
    paragraphs: [
      'La classe d’accueil marque la première rencontre de l’enfant avec le monde scolaire.',
      'À 2 ans, l’essentiel est de découvrir un nouvel environnement, d’apprendre progressivement à vivre en collectivité et de développer ses premières formes d’autonomie.',
    ],
    listIntro: `Dans nos écoles, la classe d’accueil privilégie${NNBSP}:`,
    points: [
      'Une adaptation progressive et rassurante à la vie scolaire',
      'L’éveil sensoriel, moteur et langagier à travers le jeu et l’exploration',
      'Les premières interactions sociales et la découverte de la vie en groupe',
      'Le respect du rythme et des besoins de chaque enfant',
    ],
    closing: 'Une première expérience de l’école qui donne envie de découvrir, d’explorer et de grandir.',
    photo: {
      src: '/images/collage-maternelle.jpg',
      alt: 'Une petite fille joue avec des formes en bois en classe.',
      width: 1600,
      height: 1068,
      position: '58% 55%',
    },
  },
  {
    id: 'maternelle',
    name: 'La maternelle',
    ages: '3 à 6 ans',
    title: 'Grandir et s’éveiller',
    paragraphs: [
      'Les années de maternelle construisent les fondations essentielles du parcours scolaire.',
      'À travers une pédagogie active, les enfants développent progressivement leurs capacités cognitives, langagières, motrices, sociales et émotionnelles, accompagnés par des enseignants formés à la petite enfance.',
    ],
    listIntro: `L’enseignement en maternelle favorise${NNBSP}:`,
    points: [
      'L’apprentissage par le jeu, l’expérience et la découverte',
      'Le développement du langage, de la motricité et des premières compétences',
      'La curiosité, la créativité et les interactions avec les autres',
      'L’autonomie et la confiance en soi, dans le respect du rythme de chacun',
    ],
    closing: 'C’est le temps des premières grandes découvertes, où se construisent la curiosité et le plaisir d’apprendre.',
    photo: {
      src: '/images/collage-dessin.jpg',
      alt: 'Un enfant de maternelle et son enseignante devant un tableau de couleurs et de chiffres.',
      width: 1600,
      height: 1067,
      position: '40% 50%',
    },
  },
  {
    id: 'primaire',
    name: 'Le primaire',
    ages: '6 à 12 ans',
    title: 'Construire des bases durables',
    paragraphs: [
      'Le primaire permet à chaque élève d’acquérir les connaissances et les méthodes qui lui serviront tout au long de sa scolarité.',
      `Les apprentissages progressent de manière structurée${NNBSP}: les notions sont découvertes, approfondies puis réinvesties au fil des années pour consolider les acquis.`,
    ],
    listIntro: `L’enseignement primaire met l’accent sur${NNBSP}:`,
    points: [
      'La maîtrise progressive des savoirs fondamentaux',
      'La compréhension, le raisonnement et la résolution de problèmes',
      'L’organisation de la pensée et l’expression orale et écrite',
      'Le développement de l’autonomie et de méthodes de travail efficaces',
    ],
    closing: 'Un parcours qui donne aux élèves les outils pour apprendre avec méthode, confiance et curiosité.',
    photo: {
      src: '/images/collage-sciences.jpg',
      alt: 'Deux élèves font une expérience de sciences en blouse et lunettes de protection.',
      width: 1600,
      height: 900,
      position: '45% 45%',
    },
  },
  {
    id: 'secondaire',
    name: 'Le secondaire',
    ages: '12 à 18 ans',
    title: 'Construire son avenir',
    paragraphs: [
      'Le secondaire accompagne les élèves vers une autonomie croissante et les prépare progressivement aux études supérieures.',
      'Les connaissances s’approfondissent, les exigences académiques évoluent et chaque élève affine ses centres d’intérêt et ses choix d’orientation.',
    ],
    listIntro: `L’enseignement secondaire s’appuie sur${NNBSP}:`,
    points: [
      'Un socle commun de connaissances et de compétences solides',
      'Un approfondissement progressif des disciplines et un choix d’options adapté au parcours',
      'Le développement de l’esprit critique, du raisonnement et de l’autonomie intellectuelle',
      'L’acquisition de méthodes de travail adaptées aux exigences de l’enseignement supérieur',
    ],
    closing: 'Une dernière étape pour consolider ses acquis, affirmer ses ambitions et se préparer aux études supérieures.',
    photo: {
      src: '/images/parcours-secondaire.jpg',
      alt: 'Une classe du secondaire au travail dans une salle lumineuse.',
      width: 1600,
      height: 1066,
      position: '45% 60%',
    },
  },
]
