import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import type { ImageAsset, LinkItem } from './types'

export type CampusKey = 'casablanca' | 'rabat'

/*
 * The home page's "convince the parents" sections (25 Oct 2026, Ayoub: "fill it up with the most
 * useful content"): the Belgian guarantee, the network director's letter, the two campuses, the
 * admission path and the FAQ.
 *
 * Every fact comes from EBM's current site (ecolebelge.org, exported to
 * UI projects/EBM WEBSITE/EBM_Site_Actuel/ecolebelge-contenu.html): "Statut et fonctionnement",
 * "Projet pédagogique", "Parcours scolaire", the Casablanca and Rabat pages, "Processus
 * d'admission", "Mot du directeur du réseau" and the FAQ. Left out on purpose, because they are
 * unresolved (docs/ARCHITECTURE.md, section 6): pupil numbers per campus, Rabat's site area, the
 * visits / open-days policy. EBM to confirm the hours each school year.
 */

/* ------------------------------------------------------------------------------------------ */
/* La garantie belge (guarantee.tsx): a short certification path                              */
/* ------------------------------------------------------------------------------------------ */

export const guarantee = {
  title: 'Un parcours belge *reconnu*',
  text: 'Les mêmes épreuves officielles qu’en Belgique francophone.',
  milestones: [
    { code: 'CEB', when: 'Fin de 6e primaire', name: 'Certificat d’études de base' },
    { code: 'CE1D', when: 'Fin de 2e secondaire', name: 'Certificat du premier degré' },
    { code: 'CESS', when: 'Fin de 6e secondaire', name: 'Certificat d’enseignement secondaire supérieur' },
  ],
  result: 'Avec le CESS, cap sur les études supérieures au Maroc et à l’international.',
}

/* ------------------------------------------------------------------------------------------ */
/* Le mot du directeur (director-letter.tsx): his message, word for word                       */
/* ------------------------------------------------------------------------------------------ */

export const director = {
  /** His own closing line, used as the section heading. */
  title: 'Ensemble vers la réussite et le bonheur d’apprendre',
  paragraphs: [
    'Depuis 2014, nos établissements proposent un enseignement fidèle aux programmes et aux méthodes pédagogiques de la Fédération Wallonie-Bruxelles. Nous y faisons vivre la richesse de la rencontre entre le Royaume du Maroc et la Belgique francophone.',
    'L’équipe pédagogique, composée de professionnels de l’enseignement, est soucieuse de la progression et du bien-être de chaque élève. Elle est aidée dans sa tâche par une équipe administrative engagée.',
    `Nous sommes fiers du travail réalisé jusqu’à présent${NNBSP}! Résolument tournés vers l’avenir, nous sommes particulièrement motivés à poursuivre le développement de nos écoles en collaboration avec les parents qui nous font confiance. Compétence, engagement, dépassement de soi et bienveillance sont les valeurs essentielles que nous faisons vivre au quotidien au travers de toutes nos actions.`,
  ],
  name: 'Axel Bex Chaval',
  role: 'Directeur du réseau des Écoles Belges au Maroc',
  image: {
    src: '/images/directeur-reseau.jpg',
    alt: 'Axel Bex Chaval, directeur du réseau des Écoles Belges au Maroc, à son bureau.',
    width: 1200,
    height: 800,
    position: '46% 50%',
  } satisfies ImageAsset,
}

/* ------------------------------------------------------------------------------------------ */
/* Nos deux campus (campus-chapters.tsx): one chapter per campus                               */
/* ------------------------------------------------------------------------------------------ */

export interface CampusChapter {
  key: CampusKey
  title: string
  /** Up to four short facts, top right. */
  facts: string[]
  /** One sentence, bottom left. */
  text: string
  link: LinkItem
  image: ImageAsset
  /** Field colour token: the darkest large tone of the photo, taken from the brand palette. */
  field: 'olive' | 'charcoal'
}

export const campusChapters: CampusChapter[] = [
  {
    key: 'casablanca',
    title: 'Casablanca, Dar Bouazza',
    facts: [
      'Campus de 7,5 hectares',
      'École du dehors sur 1,5 hectare',
      '58 enseignants',
      'Cantine, garderie, transport',
    ],
    text: 'Un campus ouvert sur la nature, à l’écart de la ville, où la classe se fait aussi dehors.',
    link: { label: 'Le campus de Casablanca', href: routes.campusCasablanca },
    image: {
      src: '/images/collage-cour-casablanca.jpg',
      alt: 'La cour intérieure du campus de Casablanca, entre les palmiers.',
      width: 1600,
      height: 1067,
      position: '50% 55%',
    },
    field: 'olive',
  },
  {
    key: 'rabat',
    title: 'Rabat, Hay Riad',
    facts: [
      'Inaugurée en novembre 2018',
      'Par S.A.R. la Princesse Astrid de Belgique',
      '60 enseignants',
      'Anglais ou néerlandais dès la 1re primaire',
    ],
    text: 'Une école au cœur de Hay Riad, dans un cadre à la fois urbain, verdoyant et calme.',
    link: { label: 'Le campus de Rabat', href: routes.campusRabat },
    image: {
      src: '/images/campus-rabat.jpg',
      alt: 'Les bâtiments et les terrains de sport de l’École belge de Rabat.',
      width: 1600,
      height: 1068,
      position: '42% 50%',
    },
    field: 'charcoal',
  },
]

/* ------------------------------------------------------------------------------------------ */
/* Rejoindre les EBM (admissions-path.tsx): seven steps in three phases                        */
/* ------------------------------------------------------------------------------------------ */

export const admissionsPath = {
  title: ['Rejoindre les EBM,', '*pas à pas*'],
  text: 'Dès 2 ans et jusqu’en 1re secondaire, selon les places disponibles.',
  reassurance: {
    title: 'Une admission est un dialogue',
    text: 'Sans test sélectif.',
  },
  image: {
    src: '/images/hero-rabat-entree.jpg',
    alt: 'Des élèves entrent dans le bâtiment de l’école belge de Rabat.',
    position: '52% 68%',
  },
  phases: [
    {
      name: 'Préparer votre candidature',
      text: 'Découvrez notre projet, échangez avec les admissions et déposez votre dossier sur Eduka.',
    },
    {
      name: 'Faire connaissance',
      text: 'Un entretien avec les parents, puis une observation ou une analyse pédagogique adaptée à l’âge de votre enfant.',
    },
    {
      name: 'Recevoir la réponse',
      text: 'La commission vous répond par e-mail. Si votre enfant est admis, un échange précède la confirmation de son inscription.',
    },
  ],
  apply: { label: 'Candidater en ligne', href: routes.candidater } satisfies LinkItem,
  more: { label: 'Les étapes de l’admission', href: `${routes.admissions}#parcours` } satisfies LinkItem,
}

/* ------------------------------------------------------------------------------------------ */
/* Questions fréquentes (faq.tsx): expandable question cards + a separate large video         */
/* ------------------------------------------------------------------------------------------ */

export const faq = {
  title: 'Questions *fréquentes*',
  video: {
    /** A local CMS video URL replaces YouTube when provided. */
    url: '',
    /** YouTube video published by EBM on its current site ("Tout savoir sur l'école belge"). */
    id: 'KdE5q6_kTSk',
    title: 'Jad nous explique le fonctionnement des écoles belges au Maroc',
    poster: {
      src: '/images/video-ecole-belge.jpg',
      alt: '',
      width: 1600,
      height: 1067,
      position: '50% 40%',
    } satisfies ImageAsset,
  },
  items: [
    {
      q: `À partir de quel âge${NNBSP}?`,
      a: 'Dès 2 ans révolus, en classe d’accueil. Les admissions sont possibles à tous les niveaux jusqu’en 1re secondaire, selon les places disponibles.',
    },
    {
      q: `Combien d’élèves par classe${NNBSP}?`,
      a: `26 en moyenne${NNBSP}: les effectifs sont volontairement plafonnés pour garantir un encadrement de qualité.`,
    },
    {
      q: `Y a-t-il un test d’entrée${NNBSP}?`,
      a: `Pas au sens sélectif. En maternelle, une observation en classe${NNBSP}; à partir du primaire, un diagnostic pédagogique, pour que l’enfant s’intègre sereinement.`,
    },
    {
      q: `Le CESS est-il reconnu${NNBSP}?`,
      a: 'Oui, au Maroc comme à l’international. Il permet de candidater en Belgique, au Maroc, au Canada, en France, au Royaume-Uni et ailleurs, selon les règles de chaque établissement.',
    },
    {
      q: `Et si mon enfant vient d’un autre système${NNBSP}?`,
      a: `Les transitions entre systèmes européens se font sans rupture${NNBSP}: seuls l’ordre des notions et les méthodes peuvent demander un temps d’adaptation.`,
    },
    {
      q: `Quelles langues apprendra-t-il${NNBSP}?`,
      a: 'Le français est la langue d’enseignement. L’arabe dès la 3e maternelle, l’anglais dès la 1re primaire avec des certifications Cambridge, l’espagnol dès la 4e secondaire. À Rabat, le néerlandais peut remplacer l’anglais.',
    },
    {
      q: `Y a-t-il des devoirs${NNBSP}?`,
      a: `Peu à l’école fondamentale${NNBSP}: ils consolident ce qui a été compris en classe. Au secondaire, le travail personnel augmente pour préparer aux études supérieures.`,
    },
    {
      q: `Comment les élèves sont-ils évalués${NNBSP}?`,
      a: 'Par des évaluations formatives, pour progresser, qui ne comptent pas dans le bulletin, et par des évaluations certificatives, qui valident les acquis.',
    },
    {
      q: `Quel calendrier scolaire${NNBSP}?`,
      a: 'Celui de la Fédération Wallonie-Bruxelles, adapté aux jours fériés marocains.',
    },
    {
      q: `Comment l’école travaille-t-elle avec les parents${NNBSP}?`,
      a: `Comme avec des partenaires${NNBSP}: une communication régulière et transparente, et des équipes disponibles pour échanger, dans l’intérêt de l’élève.`,
    },
  ],
  more: { label: 'Toutes les questions', href: routes.faq } satisfies LinkItem,
}
