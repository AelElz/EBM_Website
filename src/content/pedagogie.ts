import { NNBSP } from '@/lib/typography'

/*
 * /pedagogie, word for word from EBM's validated `Notre_pédagogie.docx` (Ayoub, 30 Oct 2026:
 * "this is the real validated data"). Only the typography is the site's: curly apostrophes and a
 * narrow no-break space before colons. Each section's `label` is the document's bullet heading,
 * its `title` the bold sentence under it. The document's "Traitement graphique" notes became the
 * figures in pedagogy-page.tsx: three sober markers, four numbered steps, a timeline of the
 * languages, the diplomas on the school-year line (the board Parcours_scolaire.ai) and the
 * three "savoirs". The school path itself comes from parcours.ts.
 */

export const pedagogie = {
  label: 'Notre pédagogie',
  title: 'Une pédagogie qui donne du sens aux apprentissages.',
  intro: [
    'Aux Écoles Belges au Maroc, nous sommes convaincus qu’un élève progresse durablement lorsqu’il comprend ce qu’il apprend, développe son raisonnement et acquiert des méthodes de travail solides.',
    'Notre approche associe les programmes officiels de l’enseignement belge francophone, l’expertise de nos équipes et un cadre éducatif exigeant et bienveillant.',
  ],
  description:
    `La pédagogie des Écoles Belges au Maroc${NNBSP}: le cadre belge, une manière d’enseigner par l’expérience, le parcours de 2 à 18 ans, les langues, les diplômes et l’autonomie.`,

  /** The four figures under the hero, each counted from this page's own validated content. */
  keyFacts: [
    { value: '2–18', label: 'ans, de la classe d’accueil à la fin du secondaire' },
    { value: '4', label: `langues${NNBSP}: français, arabe, anglais et espagnol` },
    { value: '3', label: `diplômes de l’enseignement belge${NNBSP}: CEB, CE1D et CESS` },
    { value: '4', label: `étapes pour apprendre${NNBSP}: observer, expérimenter, comprendre, réinvestir` },
  ],

  framework: {
    label: 'La solidité du cadre pédagogique',
    title: 'Un enseignement belge, un cadre reconnu.',
    paragraphs: [
      'Les EBM dispensent les programmes de l’enseignement belge francophone, dans le respect des exigences définies par la Fédération Wallonie-Bruxelles.',
      'Ce cadre repose sur des enseignants titulaires des qualifications requises, des progressions pédagogiques structurées et un suivi de la qualité de l’enseignement.',
      'Il garantit une cohérence des apprentissages, de la maternelle à la fin du secondaire.',
    ],
    markers: ['Programmes officiels', 'Enseignants qualifiés', 'Suivi pédagogique'],
  },

  method: {
    label: 'Notre manière d’enseigner',
    title: 'Apprendre par l’expérience et le raisonnement.',
    paragraphs: [
      'Dans nos classes, l’élève prend une part active à ses apprentissages. Il observe, manipule, expérimente et apprend progressivement à formuler son raisonnement.',
      'Les enseignants construisent des situations qui permettent de passer du concret à l’abstrait, puis de réutiliser les connaissances acquises dans de nouveaux contextes.',
      'Cette progression développe la compréhension, la curiosité et l’autonomie intellectuelle.',
    ],
    /** Numbered 01 to 04 in the document. */
    steps: [
      { number: '01', name: 'Observer' },
      { number: '02', name: 'Expérimenter' },
      { number: '03', name: 'Comprendre' },
      { number: '04', name: 'Réinvestir' },
    ],
  },

  /** The school path section (parcours.ts), headed like the home band 5. */
  path: {
    label: 'Notre parcours scolaire',
    title: 'De 2 à 18 ans, grandir, apprendre et se construire.',
  },

  languages: {
    label: 'Les langues et l’ouverture culturelle',
    title: 'Un enseignement francophone, ouvert sur le monde.',
    paragraphs: [
      'Le français constitue la langue d’enseignement aux EBM. Ce parcours est enrichi par l’apprentissage de la langue et de la culture arabes, de l’anglais dès le primaire et de l’espagnol au secondaire.',
      'L’anglais s’inscrit dans une progression accompagnée de certifications Cambridge, avec pour objectif le développement d’une maîtrise fonctionnelle de la langue.',
      'Cette ouverture linguistique et culturelle prépare les élèves à évoluer dans des environnements diversifiés.',
    ],
    timeline: [
      { level: 'Maternelle', text: 'Français et éveil à l’arabe' },
      { level: 'Primaire', text: 'Français, arabe et anglais' },
      { level: 'Secondaire', text: 'Poursuite des langues, espagnol et certifications' },
    ],
  },

  diplomas: {
    label: 'Les diplômes',
    title: 'Des étapes reconnues pour construire son avenir.',
    paragraphs: [
      'Tout au long de leur parcours, les élèves avancent vers les certifications de l’enseignement belge francophone.',
      'Le CEB marque la fin du primaire, le CE1D constitue un repère à la fin du premier degré secondaire, et le CESS sanctionne l’achèvement des études secondaires.',
      'Ces diplômes s’inscrivent dans un parcours qui prépare les élèves à poursuivre leurs études supérieures, au Maroc comme à l’international, selon les conditions des établissements choisis.',
    ],
    /** `after` is the school year the diploma closes, as on the board and in the document. */
    items: [
      { code: 'CEB', after: 'P6', when: 'Fin du primaire' },
      { code: 'CE1D', after: 'S2', when: 'Fin du 1er degré secondaire' },
      { code: 'CESS', after: 'S6', when: 'Fin du secondaire' },
    ],
  },

  autonomy: {
    label: 'Former des élèves autonomes',
    title: 'Des compétences pour apprendre, agir et choisir.',
    paragraphs: [
      'Notre ambition dépasse la seule acquisition de connaissances.',
      'Nous accompagnons chaque élève dans le développement de méthodes de travail durables, de la rigueur, de la persévérance et de l’esprit critique.',
      'Apprendre à s’organiser, coopérer, argumenter, faire preuve de discernement et construire progressivement son projet personnel fait pleinement partie de notre approche éducative.',
    ],
    savoirs: [
      { name: 'Savoir', text: 'Acquérir des connaissances solides' },
      { name: 'Savoir-faire', text: 'Raisonner, s’organiser et résoudre' },
      { name: 'Savoir-être', text: 'Coopérer, persévérer et gagner en confiance' },
    ],
  },
}

/*
 * The school years on the diplomas' line, from Ayoub's board Parcours_scolaire.ai: the classe
 * d'accueil, then the three cycles with each year's usual age.
 */
export const schoolYears = [
  { cycle: null, years: [{ code: 'CA', age: '2 ans', name: 'Classe d’accueil' }] },
  {
    cycle: 'Maternelle',
    years: [1, 2, 3].map((n) => ({ code: `M${n}`, age: `${n + 2} ans`, name: `${n}${n === 1 ? 're' : 'e'} maternelle` })),
  },
  {
    cycle: 'Primaire',
    years: [1, 2, 3, 4, 5, 6].map((n) => ({ code: `P${n}`, age: `${n + 5} ans`, name: `${n}${n === 1 ? 're' : 'e'} primaire` })),
  },
  {
    cycle: 'Secondaire',
    years: [1, 2, 3, 4, 5, 6].map((n) => ({ code: `S${n}`, age: `${n + 11} ans`, name: `${n}${n === 1 ? 're' : 'e'} secondaire` })),
  },
]
