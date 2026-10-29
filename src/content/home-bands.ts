import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import type { ImageAsset, LinkItem } from './types'

/*
 * The five home bands after the hero (29 Oct 2026), from Ayoub's own board
 * `UI projects/EBM WEBSITE/Bandeaux_website.ai`: values (Fired Clay), the network and its
 * figures (charcoal photo), the institutional cooperation (white), the pedagogy (olive) and the
 * school path (white, with the children cutout). Copy is EBM's, from that board and from
 * `Parcours_scolaire.docx`. Words between asterisks are set in Playfair italic (emphasis.tsx);
 * **double asterisks** mark the bold runs of the path's overview (path-band.tsx).
 *
 * The figures are the board's; EBM to confirm them before launch (the earlier home said
 * "118 enseignants diplômés en Belgique", the board says 200 staff and 120 Belgian expatriates).
 */

export type BandIcon = 'founded' | 'campus' | 'pupils' | 'staff' | 'expatriates' | 'surface'

export interface BandFigure {
  /** Number only, with French narrow no-break spaces ("2 000"); counts up (count-up.tsx). */
  value: string
  countFrom: number
  /** Drawn before / after the number, outside the count-up: "+", " m²". */
  prefix?: string
  suffix?: string
  label: string
  icon: BandIcon
}

export interface PathStage {
  id: 'ensemble' | 'accueil' | 'maternelle' | 'primaire' | 'secondaire'
  /** Tab label, one string per line (the board sets "Vue / d’ensemble" on two lines). */
  tab: string[]
  /** Paragraphs from Parcours_scolaire.docx; **double asterisks** mark the bold runs. */
  paragraphs: string[]
  /** The photo in the front circle; the overview shows the children cutout instead. */
  photo?: ImageAsset
}

export const homeBands = {
  values: {
    title: 'Nos valeurs',
    statement:
      'Un enseignement belge exigeant, *dans une école bienveillante.* *Nos élèves grandissent en confiance,* en classe comme en dehors, prêts à *ouvrir leurs horizons.*',
    items: [
      {
        title: 'L’exigence',
        text: 'Des enseignants qualifiés, des apprentissages solides et un cadre éducatif rigoureux pour donner à chaque élève les moyens de réussir.',
      },
      {
        title: 'La bienveillance',
        text: 'Une attention portée au développement de chaque enfant, dans un environnement où l’écoute, le respect et la confiance accompagnent les apprentissages.',
      },
      {
        title: 'L’autonomie',
        text: 'Une pédagogie active qui encourage à comprendre, à raisonner et à prendre confiance en ses capacités pour construire son propre chemin.',
      },
    ],
  },

  network: {
    label: 'Le réseau EBM',
    title: 'Des convictions fortes, un réseau qui grandit.',
    paragraphs: [
      `Deux campus, une même exigence${NNBSP}: offrir un enseignement belge francophone de qualité, dans un environnement stimulant et bienveillant.`,
      'Depuis 2014, les Écoles Belges au Maroc accompagnent chaque élève dans la construction de savoirs solides, le développement de son autonomie et la préparation de son avenir.',
    ],
    image: {
      src: '/images/reseau-cour.jpg',
      alt: '',
      width: 1448,
      height: 1086,
      position: '50% 55%',
    } satisfies ImageAsset,
    figures: [
      // A year: counting from 0 would read as a quantity, so it runs 2000 -> 2014.
      { value: '2014', countFrom: 2000, label: 'Année de création', icon: 'founded' },
      { value: '2', countFrom: 0, label: 'Campus au Maroc', icon: 'campus' },
      { value: `2${NNBSP}000`, countFrom: 0, prefix: '+', label: 'Élèves', icon: 'pupils' },
      { value: '200', countFrom: 0, label: 'Membres du personnel', icon: 'staff' },
      { value: '120', countFrom: 0, label: 'Expatriés belges', icon: 'expatriates' },
      { value: `90${NNBSP}000`, countFrom: 0, suffix: `${NNBSP}m²`, label: 'De superficie totale', icon: 'surface' },
    ] satisfies BandFigure[],
  },

  anchorage: {
    label: 'Notre ancrage institutionnel',
    title: 'Une coopération fondatrice, une ambition partagée.',
    text: 'Les Écoles Belges au Maroc sont le fruit d’une coopération entre le Royaume du Maroc et la Fédération Wallonie-Bruxelles.',
    // Rendered with the date in bold (anchorage-band.tsx).
    agreement: {
      before: 'Encadré par ',
      strong: 'l’Accord de Coopération du 21 mai 2014',
      after:
        ', notre réseau propose un enseignement belge francophone fidèle aux programmes officiels, dans un cadre institutionnel solide qui unit deux pays autour d’une même ambition éducative.',
    },
    flags: [
      { id: 'belgique', name: 'Belgique' },
      { id: 'fwb', name: 'Fédération Wallonie-Bruxelles' },
      { id: 'maroc', name: 'Maroc' },
    ],
    partners: {
      src: '/brand/partners-white.png',
      alt: 'Fédération Wallonie-Bruxelles, Wallonie-Bruxelles International et AEBE',
      width: 856,
      height: 170,
    } satisfies ImageAsset,
    // Read on the plaque in the first photo.
    photos: [
      {
        src: '/images/ancrage-inauguration.jpg',
        alt: 'S.A.R. la Princesse Astrid de Belgique et Rudy Demotte dévoilent la plaque d’inauguration de l’École belge de Rabat.',
        width: 1280,
        height: 720,
        position: '60% 40%',
        caption: 'Inauguration de l’École belge de Rabat, le 27 novembre 2018.',
      },
      {
        src: '/images/ancrage-princesse.jpg',
        alt: 'La Princesse Astrid accueillie par les élèves de maternelle, des drapeaux belges à la main.',
        width: 864,
        height: 486,
        position: '45% 40%',
        caption: 'La Princesse Astrid accueillie par les plus jeunes élèves.',
      },
      {
        src: '/images/ancrage-eleves.jpg',
        alt: 'Des élèves portent le drapeau de la Fédération Wallonie-Bruxelles lors de la visite officielle.',
        width: 1280,
        height: 720,
        position: '55% 35%',
        caption: 'Des élèves aux couleurs de la Fédération Wallonie-Bruxelles.',
      },
    ] satisfies (ImageAsset & { caption: string })[],
  },

  pedagogy: {
    label: 'Notre pédagogie',
    title: 'Apprendre à comprendre, pour aller plus loin.',
    text: 'Un enseignement belge francophone qui associe des programmes officiels, une pédagogie active et un accompagnement attentif à chaque étape du parcours.',
    pillars: [
      { title: 'Un cadre reconnu', text: 'Des programmes officiels et des enseignants qualifiés.', image: '/images/pedagogie-cadre.png' },
      { title: 'Une pédagogie active', text: 'Observer, expérimenter et raisonner pour mieux apprendre.', image: '/images/pedagogie-active.png' },
      { title: 'Des horizons ouverts', text: 'Des langues, des compétences et des diplômes pour préparer l’avenir.', image: '/images/pedagogie-horizons.png' },
    ],
    cta: { label: 'Découvrir notre approche pédagogique', href: routes.pedagogie } satisfies LinkItem,
  },

  // Ayoub's mock-ups of 29 Oct 2026 (sent in the chat): Playfair title on one line, uppercase
  // tabs on grey shields, the docx paragraphs with bold runs, a pill "En savoir plus" on the right;
  // the children for the overview, three Fired Clay circles for each stage (path-band.tsx).
  path: {
    label: 'Notre parcours scolaire',
    title: 'De 2 à 18 ans, grandir, apprendre et se construire.',
    link: { label: 'En savoir plus', href: routes.pedagogie } satisfies LinkItem,
    image: {
      src: '/images/parcours-enfants.png',
      alt: 'Quatre enfants de 2 à 16 ans, du tout-petit avec sa peluche à l’adolescente avec son skateboard.',
      width: 1008,
      height: 1511,
    } satisfies ImageAsset,
    stages: [
      {
        id: 'ensemble',
        tab: ['Vue', 'd’ensemble'],
        paragraphs: [
          'Les Écoles Belges au Maroc proposent **un parcours scolaire complet, de la maternelle au secondaire**, fondé sur les programmes officiels de l’enseignement belge francophone.',
          'Chaque étape répond à des objectifs pédagogiques précis et prépare la suivante, assurant une progression cohérente et continue des apprentissages.',
          'Cette continuité repose notamment sur **l’expertise d’enseignants qualifiés, formés en Belgique et spécialisés dans leur discipline**, conformément aux exigences de la Fédération Wallonie-Bruxelles.',
        ],
      },
      {
        id: 'accueil',
        tab: ['Classe', 'd’accueil'],
        paragraphs: [
          'La classe d’accueil marque **la première rencontre de l’enfant avec le monde scolaire**.',
          'À 2 ans, l’essentiel est de découvrir un nouvel environnement, d’apprendre progressivement à vivre en collectivité et de développer ses premières formes d’autonomie.',
        ],
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
        tab: ['Maternelle'],
        paragraphs: [
          'Les années de maternelle construisent **les fondations essentielles du parcours scolaire**.',
          'À travers une pédagogie active, les enfants développent progressivement leurs capacités cognitives, langagières, motrices, sociales et émotionnelles, accompagnés par des enseignants formés à la petite enfance.',
        ],
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
        tab: ['Primaire'],
        paragraphs: [
          'Le primaire permet à chaque élève d’acquérir **les connaissances et les méthodes qui lui serviront tout au long de sa scolarité**.',
          `Les apprentissages progressent de manière structurée${NNBSP}: les notions sont découvertes, approfondies puis réinvesties au fil des années pour consolider les acquis.`,
        ],
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
        tab: ['Secondaire'],
        paragraphs: [
          'Le secondaire accompagne les élèves vers **une autonomie croissante** et les prépare progressivement aux études supérieures.',
          'Les connaissances s’approfondissent, les exigences académiques évoluent et chaque élève affine ses centres d’intérêt et ses choix d’orientation.',
        ],
        photo: {
          src: '/images/parcours-secondaire.jpg',
          alt: 'Une classe du secondaire au travail dans une salle lumineuse.',
          width: 1600,
          height: 1066,
          position: '45% 60%',
        },
      },
    ] satisfies PathStage[],
  },
}
