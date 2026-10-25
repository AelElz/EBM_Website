import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import { site } from './site'
import type { ImageAsset, LinkItem } from './types'

/*
 * Home page content (docs/HOME-SPEC.md, "Home page sections"). Copy is EBM's own; figures come
 * from EBM's current site and must be confirmed by EBM before launch.
 * Future source: Payload `pages` (home) blocks with the same shapes.
 */

/** Semantic icon keys; components map them to drawn SVG / lucide icons (1.5px stroke family). */
export type HomeIcon =
  | 'diploma' // graduation cap
  | 'outdoor' // sprout
  | 'admissions' // calendar with check
  | 'pupils' // two people
  | 'teachers' // board with check
  | 'campus' // school building
  | 'founded' // calendar

export interface HeroSlide extends ImageAsset {}

export interface HomeHero {
  title: string
  text: string
  /** Slide 1 is the LCP image (priority); slides 2-3 load lazily. */
  slides: HeroSlide[]
  primary: LinkItem
  secondary: LinkItem
}

export interface Highlight {
  icon: HomeIcon
  title: string
  text: string
  href: string
  linkLabel: string
}

export interface HomeStatement {
  /** Small descriptive line above the statement: who, where, what (plain facts, for SEO too). */
  intro: string
  /** The statement: words between asterisks are set in Playfair italic (emphasis.tsx). */
  text: string
}

export interface SchoolStage {
  /** Stage name, e.g. "Maternelle": white over the photo at rest, Playfair italic when open. */
  title: string
  /** Who it is for, e.g. "De 2 à 6 ans". */
  ages: string
  href: string
  image: ImageAsset
}

export interface HomeStages {
  /** Mixed heading, like HomeAbout.title. */
  title: string
  stages: SchoolStage[]
}

export interface HomeAbout {
  /** Small line above the heading, after the three dots. */
  label: string
  /** Mixed heading: words between asterisks are set in Playfair italic (emphasis.tsx). */
  title: string
  cta: LinkItem
  /**
   * The scroll scene behind the text (about.tsx), five photos in slot order: [0] the focus
   * photo, which rises behind the text and opens to full screen; then top-left, top-right,
   * bottom-left, bottom-right around it. Box sizes and positions live in
   * about-collage.module.css; choose `position` for those crops.
   */
  collage: ImageAsset[]
}

export interface AlumniStory {
  /** Pill on the card: what the story is about. */
  kind: 'Études' | 'Carrière'
  quote: string
  name: string
  /** e.g. "Promotion 2019". */
  promotion: string
  /** Where the story led: studies or career. */
  path: string
  image: ImageAsset
}

export interface HomeAlumni {
  label: string
  /** Mixed heading, like HomeAbout.title. */
  title: string
  text: string
  /** Visible notice while the stories are placeholders. */
  note: string
  /** Placeholder stories until EBM collects real ones (docs/ARCHITECTURE.md, alumni). */
  source: 'placeholder'
  stories: AlumniStory[]
  link: LinkItem
}

export interface Figure {
  /** Display string with French thin spaces, e.g. "2 000". Render with tabular-nums. */
  value: string
  /** Where the count-up starts when the band scrolls into view (count-up.tsx); it ends on
   *  `value`. Omit it to show the value still. */
  countFrom?: number
  label: string
  icon: HomeIcon
}

export interface InstagramPreview {
  title: string
  handle: string
  url: string
  linkLabel: string
  /** Static preview until the Instagram feed is connected (docs/ARCHITECTURE.md). */
  source: 'placeholder'
  tiles: ImageAsset[]
}

export interface CtaBandContent {
  title: string
  text: string
  /** Full-bleed background under a ~62% charcoal overlay; decorative (alt ""). */
  image: ImageAsset
  primary: LinkItem
  secondary: LinkItem
}

export interface HomeSeo {
  /** Absolute <title> of the home page (the layout's "%s · Écoles Belges au Maroc" template
   *  is not applied). Also the Open Graph title. */
  title: string
  /** Meta and Open Graph description (facts from PRODUCT.md / docs/HOME-SPEC.md). */
  description: string
}

export interface HomeContent {
  seo: HomeSeo
  hero: HomeHero
  highlights: Highlight[]
  statement: HomeStatement
  stages: HomeStages
  about: HomeAbout
  alumni: HomeAlumni
  figures: Figure[]
  instagram: InstagramPreview
  ctaBand: CtaBandContent
}

export const home: HomeContent = {
  seo: {
    title: `${site.name} · Enseignement belge à Casablanca et Rabat`,
    description: `Deux écoles belges au Maroc, à Casablanca et à Rabat${NNBSP}: le programme et les diplômes de la Fédération Wallonie-Bruxelles, de la classe d’accueil au CESS.`,
  },

  hero: {
    title: 'Un enseignement qui ouvre les horizons',
    text: 'Le programme et les diplômes de la Fédération Wallonie-Bruxelles, de 2 à 18 ans, à Casablanca et à Rabat.',
    slides: [
      {
        src: '/images/hero-rabat-entree.jpg',
        alt: 'Des élèves entrent dans le bâtiment du secondaire de l’École belge de Rabat.',
        width: 2400,
        height: 1600,
        position: '50% 50%',
      },
      {
        src: '/images/hero-casablanca-entree.jpg',
        alt: 'L’entrée de l’École belge de Casablanca, à Dar Bouazza.',
        width: 1448,
        height: 1086,
        position: '50% 40%',
      },
      {
        src: '/images/hero-rabat-batiment.jpg',
        alt: 'Le bâtiment du secondaire de l’École belge de Rabat, à Hay Riad.',
        width: 1448,
        height: 1086,
        position: '50% 45%',
      },
    ],
    primary: { label: 'Réserver une visite', href: routes.calendrier },
    secondary: { label: 'Candidater en ligne', href: routes.candidater },
  },

  highlights: [
    {
      icon: 'diploma',
      title: 'Un diplôme reconnu',
      text: 'Le CESS ouvre les portes des études supérieures, au Maroc et à l’international.',
      href: routes.pedagogie,
      linkLabel: 'En savoir plus',
    },
    {
      icon: 'outdoor',
      title: 'L’école du dehors',
      text: '1,5 hectare à Casablanca où la nature devient une salle de classe.',
      href: routes.ecoleDuDehors,
      linkLabel: 'En savoir plus',
    },
    {
      icon: 'admissions',
      title: 'Les admissions',
      text: 'Les étapes, les frais et le calendrier des visites, au même endroit.',
      href: routes.admissions,
      linkLabel: 'En savoir plus',
    },
  ],

  statement: {
    intro: 'Les Écoles Belges au Maroc accueillent les élèves de 2 à 18 ans à Casablanca (Dar Bouazza) et à Rabat (Hay Riad), avec le programme et les diplômes de la Fédération Wallonie-Bruxelles.',
    text: `Un *enseignement belge* exigeant, dans une *école bienveillante*. Nos élèves grandissent en confiance, en classe comme en dehors… *prêts à ouvrir leurs horizons.*`,
  },

  // Ages from the network's "de 2 à 18 ans" (classe d’accueil to CESS); EBM to confirm the cut-offs.
  // Photos are decorative (alt ''): each panel is a link named by its stage and ages.
  stages: {
    title: 'Un seul parcours, *de 2 à 18 ans*',
    stages: [
      {
        title: 'Maternelle',
        ages: 'De 2 à 6 ans',
        href: `${routes.pedagogie}#maternelle`,
        image: {
          src: '/images/collage-dessin.jpg',
          alt: '',
          width: 1600,
          height: 1067,
          position: '22% 50%',
        },
      },
      {
        title: 'Primaire',
        ages: 'De 6 à 12 ans',
        href: `${routes.pedagogie}#primaire`,
        image: {
          src: '/images/collage-badminton.jpg',
          alt: '',
          width: 1600,
          height: 1067,
          position: '32% 50%',
        },
      },
      {
        title: 'Secondaire',
        ages: 'De 12 à 18 ans, jusqu’au CESS',
        href: `${routes.pedagogie}#secondaire`,
        image: {
          src: '/images/parcours-secondaire.jpg',
          alt: '',
          width: 1600,
          height: 1066,
          position: '30% 60%',
        },
      },
    ],
  },

  about: {
    label: 'Casablanca et Rabat',
    title: 'Apprendre *ici*, réussir *partout*',
    cta: { label: 'Découvrir nos campus', href: routes.campus },
    collage: [
      {
        src: '/images/ceremonie-diplomes.jpg',
        alt: 'Des élèves lancent leur toque lors de la cérémonie de remise des diplômes.',
        width: 1920,
        height: 1269,
        position: '50% 40%',
      },
      {
        src: '/images/collage-cour-casablanca.jpg',
        alt: 'La cour intérieure du campus de Casablanca, entre les palmiers.',
        width: 1600,
        height: 1067,
        position: '50% 55%',
      },
      {
        src: '/images/casablanca-ecole-du-dehors.jpg',
        alt: 'Une séance d’école du dehors sous un arbre du campus de Casablanca.',
        width: 900,
        height: 1600,
        position: '50% 62%',
      },
      {
        src: '/images/collage-maternelle.jpg',
        alt: 'Une enfant de maternelle joue avec des formes en bois.',
        width: 1600,
        height: 1068,
        position: '62% 50%',
      },
      {
        src: '/images/collage-sciences.jpg',
        alt: 'Deux élèves font une expérience en blouse et lunettes de protection.',
        width: 1600,
        height: 900,
        position: '28% 50%',
      },
    ],
  },

  // Placeholder stories: EBM photos and invented quotes until real alumni stories are collected.
  alumni: {
    label: 'Après les EBM',
    title: 'Ils ont *grandi* aux EBM',
    text: `Études supérieures, premiers métiers, projets${NNBSP}: nos anciens élèves racontent ce que l’école leur a donné.`,
    note: '[Témoignages provisoires, en attendant les récits de nos anciens élèves.]',
    source: 'placeholder',
    stories: [
      {
        kind: 'Études',
        quote: 'J’ai appris ici à poser des questions avant de chercher des réponses. C’est ce qui m’a le plus servi à l’université.',
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Études d’ingénieur, Belgique',
        image: {
          src: '/images/alumni-universite.jpg',
          alt: 'Des élèves de rhétorique devant une université, à Bruxelles.',
          width: 690,
          height: 920,
          position: '50% 70%',
        },
      },
      {
        kind: 'Carrière',
        quote: 'Les projets en groupe m’ont préparé au travail en équipe bien mieux que je ne l’imaginais à l’époque.',
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Architecte',
        image: {
          src: '/images/alumni-bruges.jpg',
          alt: 'Des élèves en voyage de rhétorique sur un bateau, à Bruges.',
          width: 690,
          height: 920,
          position: '50% 80%',
        },
      },
      {
        kind: 'Études',
        quote: 'Partir étudier loin de chez soi fait peur. Mes professeurs m’ont aidée à préparer chaque étape.',
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Études de médecine',
        image: {
          src: '/images/alumni-atomium.jpg',
          alt: 'La promotion en voyage de rhétorique devant l’Atomium, à Bruxelles.',
          width: 1280,
          height: 868,
          position: '42% 50%',
        },
      },
      {
        kind: 'Carrière',
        quote: `Les sorties, les débats, l’école du dehors${NNBSP}: j’en garde le goût d’apprendre partout.`,
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Enseignante',
        image: {
          src: '/images/alumni-amphitheatre.jpg',
          alt: 'Des élèves assis dans un grand amphithéâtre.',
          width: 690,
          height: 517,
          position: '55% 50%',
        },
      },
      {
        kind: 'Carrière',
        quote: 'En classe, on nous demandait toujours notre avis. Aujourd’hui, c’est exactement mon métier.',
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Consultante',
        image: {
          src: '/images/alumni-ceremonie.jpg',
          alt: 'Des diplômés réunis sur scène lors d’une cérémonie.',
          width: 1280,
          height: 853,
          position: '50% 50%',
        },
      },
      {
        kind: 'Carrière',
        quote: 'Je suis revenu au Maroc pour créer mon entreprise, avec la même envie de construire.',
        name: '[Prénom Nom]',
        promotion: 'Promotion 20XX',
        path: 'Entrepreneur',
        image: {
          src: '/images/alumni-rabat.jpg',
          alt: 'Les élèves du secondaire de Rabat réunis dans le hall de l’école.',
          width: 1600,
          height: 1142,
          position: '50% 70%',
        },
      },
    ],
    link: { label: 'Découvrir Après les EBM', href: routes.apresLesEbm },
  },

  // Figures from EBM's current site; EBM to confirm before launch.
  figures: [
    { value: `2${NNBSP}000`, countFrom: 0, label: 'élèves sur nos deux campus', icon: 'pupils' },
    { value: '118', countFrom: 0, label: 'enseignants diplômés en Belgique', icon: 'teachers' },
    { value: '2', countFrom: 0, label: 'campus, Casablanca et Rabat', icon: 'campus' },
    // A year: counting from 0 would read as a quantity, so it runs 2000 -> 2014.
    { value: '2014', countFrom: 2000, label: 'année de création du réseau', icon: 'founded' },
  ],

  instagram: {
    title: 'Actualités & *projets*',
    handle: site.instagram.handle,
    url: site.instagram.url,
    linkLabel: `Suivre ${site.instagram.handle}`,
    source: 'placeholder',
    tiles: [
      {
        src: '/images/insta-1.jpg',
        alt: 'Des élèves sur les gradins de la cour du secondaire, à Casablanca.',
        width: 1448,
        height: 1086,
      },
      {
        src: '/images/insta-2.jpg',
        alt: 'Une classe de l’école du dehors installée dans l’herbe, à Casablanca.',
        width: 900,
        height: 1600,
        position: '50% 70%',
      },
      {
        src: '/images/insta-3.jpg',
        alt: 'Des élèves dans les gradins de la salle de sport, à Casablanca.',
        width: 1448,
        height: 1086,
      },
      {
        src: '/images/insta-4.jpg',
        alt: 'Le hall du secondaire de l’École belge de Rabat et sa fresque de bienvenue.',
        width: 1536,
        height: 1024,
      },
      {
        src: '/images/insta-5.jpg',
        alt: 'Des élèves travaillent à la bibliothèque du secondaire, à Casablanca.',
        width: 1535,
        height: 1025,
      },
      {
        src: '/images/insta-6.jpg',
        alt: 'Des élèves en laboratoire de sciences, à Casablanca.',
        width: 1536,
        height: 1024,
      },
    ],
  },

  ctaBand: {
    title: `Prêt à rejoindre les EBM${NNBSP}?`,
    text: 'Rencontrez nos équipes, découvrez nos campus et commencez votre parcours d’admission.',
    image: {
      src: '/images/casablanca-cour-secondaire.jpg',
      alt: '',
      width: 1448,
      height: 1086,
      position: '50% 50%',
    },
    primary: { label: 'Visiter nos écoles', href: routes.calendrier },
    secondary: { label: 'Candidater en ligne', href: routes.candidater },
  },
}
