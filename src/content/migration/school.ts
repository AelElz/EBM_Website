import type { ImageAsset } from '@/content/types'
import { routes } from '@/lib/routes'

/** Review draft, sourced from the public EBM archive fetched on 24 October 2026. */
export type SchoolSourceStatus = 'published-source' | 'historical' | 'needs-confirmation' | 'missing'
export interface SchoolSourceRecord {
  id: string
  urls: string[]
  fetchedAt: '2026-10-24'
  destinations: string[]
  section: string
  status: SchoolSourceStatus
  applicableYear?: string
  campus?: 'casablanca' | 'rabat' | 'both'
  note?: string
}
const origin = 'https://www.ecolebelge.org'
const urls = {
  framework: `${origin}/fondamentaux`, director: `${origin}/mot-directeur`,
  project: `${origin}/notre-projet-pedagogique`, levels: `${origin}/approche-valeurs`,
  values: `${origin}/engagement`, faq: `${origin}/faq`, olderFaq: `${origin}/faqs`,
  nursery: `${origin}/maternelle`, accueil: `${origin}/classe-d-accueil`,
  casablanca: `${origin}/casablanca`, rabat: `${origin}/rabat`,
  outdoors: `${origin}/blog/actualites-2/l-ecole-belge-de-casablanca-lance-son-ecole-du-dehors-8`,
  inauguration: `${origin}/blog/actualites-2/le-site-de-la-section-secondaire-de-l-ecole-belge-de-rabat-officiellement-inaugure-9`,
  trip: `${origin}/blog/actualites-2/les-futurs-laureats-de-la-promotion-2024-2025-en-voyage-de-retho-18`,
  german: `${origin}/blog/actualites-2/partenariat-entre-l-ambassade-d-allemagne-l-institut-goethe-et-l-ecole-belge-de-rabat-17`,
  solidarity: `${origin}/blog/actualites-2/un-precieux-moment-de-rencontre-et-de-partage-11`,
  brochure: `${origin}/web/content/1060?unique=acab899e24308f36f3aa25c9998050576776dac9&download=true`,
}
const source = (id: string, paths: string[], destinations: string[], section: string,
  status: SchoolSourceStatus = 'published-source', extra: Partial<SchoolSourceRecord> = {}): SchoolSourceRecord =>
  ({ id, urls: paths, fetchedAt: '2026-10-24', destinations, section, status, ...extra })
export const schoolSourceLedger: SchoolSourceRecord[] = [
  source('network-framework', [urls.framework], [routes.reseau, routes.pedagogie], 'Statut, programme, titres, inspection et certificats', 'published-source', { campus: 'both', note: 'Reformulation des déclarations institutionnelles EBM. Pas de garantie d’admission universitaire.' }),
  source('director-message', [urls.director], [routes.reseau], 'Message signé et portrait', 'needs-confirmation', { note: 'Message authentique; rôle actuel et accord de republication du portrait à confirmer.' }),
  source('mission-values', [urls.project, urls.values], [routes.reseau, routes.pedagogie], 'Projet éducatif et quatre valeurs', 'published-source', { campus: 'both' }),
  source('network-history', [urls.framework, urls.rabat, urls.inauguration], [routes.reseau], 'Accord 2014, ouverture 2018, inauguration 2023', 'historical'),
  source('level-pathways', [urls.levels, urls.nursery, urls.accueil, urls.brochure], [routes.pedagogie], 'Accueil, maternelle, primaire, secondaire', 'published-source', { note: 'Âges indicatifs; niveaux effectivement ouverts à Rabat à confirmer. Anciennes options non importées comme catalogue actuel.' }),
  source('language-pathways', [urls.framework, urls.casablanca, urls.olderFaq], [routes.pedagogie], 'Français, arabe, anglais, espagnol; choix Rabat', 'needs-confirmation', { note: 'Débuts publiés conservés; anglais/néerlandais à Rabat signalé à confirmer. B2 présenté comme objectif.' }),
  source('support-wellbeing', [urls.project, urls.faq], [routes.pedagogie, routes.grandir], 'Évaluation, méthodes, dialogue et climat scolaire', 'published-source'),
  source('outdoor-overview', [urls.outdoors, urls.casablanca], [routes.ecoleDuDehors, routes.pedagogie], 'Pédagogie mixte et espace de 1,5 hectare', 'published-source', { campus: 'casablanca', note: 'Équipements décrits au futur dans l’article de lancement exclus de l’offre actuelle.' }),
  source('outdoor-scope', [urls.outdoors], [routes.ecoleDuDehors], 'Déploiement initial accueil–P2, 2–7 ans', 'historical', { applicableYear: '2024', campus: 'casablanca', note: 'Aucun horaire de séance ni périmètre actuel inventé.' }),
  source('activities', [urls.faq, urls.olderFaq], [routes.grandir], 'Sport, arts et culture', 'needs-confirmation', { note: 'Domaines publiés, catalogue par campus/niveau non fourni. Clubs détaillés anciens exclus de l’offre actuelle.' }),
  source('trip-2024', [urls.trip], [routes.grandir, routes.apresLesEbm], 'Voyage de rhéto promotion 2024–2025', 'historical', { applicableYear: '2024–2025', campus: 'casablanca', note: 'Article du 12 novembre 2024; visites de campus, pas preuve d’inscription universitaire.' }),
  source('german-2024', [urls.german], [routes.grandir, routes.pedagogie], 'Ateliers germanophones de Rabat', 'historical', { applicableYear: '2024', campus: 'rabat', note: 'Article du 9 octobre 2024; ne constitue pas un cours universel actuel.' }),
  source('solidarity-2024', [urls.solidarity], [routes.grandir], 'Projet de solidarité à Imzayne', 'historical', { applicableYear: '2024', campus: 'rabat' }),
  source('cess-guidance', [urls.faq, urls.project], [routes.apresLesEbm], 'CESS, équivalences et orientation', 'published-source', { note: 'Conditions propres à chaque établissement conservées. Préparation médecine non annoncée comme active.' }),
  source('historical-outcomes', [urls.brochure], [routes.apresLesEbm], 'Brochure pages 30–33', 'historical', { applicableYear: '2018–2023 / quatre promotions non datées', note: 'Données transcrites depuis les graphiques vérifiés. Effectifs et années de cohortes non fournis.' }),
  source('missing-material', [], [routes.reseau, routes.pedagogie, routes.ecoleDuDehors, routes.grandir, routes.apresLesEbm], 'Portraits d’équipes, vidéos, témoignages et profils alumni', 'missing'),
]

export const schoolImages = {
  network: { src: '/images/collage-cour-casablanca.jpg', width: 1600, height: 1067, alt: 'La cour et les bâtiments du campus EBM de Casablanca.', position: '50% 58%' },
  director: { src: '/images/directeur-reseau.jpg', width: 1200, height: 800, alt: 'Axel Bex Chaval à son bureau, portrait publié par les EBM.', position: '46% 50%' },
  sciences: { src: '/images/collage-sciences.jpg', width: 1600, height: 900, alt: 'Des élèves des EBM travaillent ensemble en sciences.' },
  nursery: { src: '/images/collage-maternelle.jpg', width: 1600, height: 1068, alt: 'Un moment d’apprentissage en maternelle aux EBM.' },
  primary: { src: '/images/collage-dessin.jpg', width: 1600, height: 1067, alt: 'Une élève des EBM réalise un dessin en classe.' },
  secondary: { src: '/images/parcours-secondaire.jpg', width: 1600, height: 1066, alt: 'Des élèves du secondaire des EBM lors d’un cours.' },
  outdoor: { src: '/images/casablanca-ecole-du-dehors.jpg', width: 900, height: 1600, alt: 'Des enfants et leur enseignante apprennent dehors, dans l’espace naturel de Casablanca.', position: '50% 58%' },
  outdoorLaunch: { src: '/images/migration-school/outdoor-launch.webp', width: 1600, height: 1067, alt: 'Photographie du lancement de l’école du dehors, publiée en janvier 2024.' },
  sport: { src: '/images/collage-badminton.jpg', width: 1600, height: 1067, alt: 'Des élèves des EBM pratiquent le badminton.' },
  ceremony: { src: '/images/ceremonie-diplomes.jpg', width: 1920, height: 1269, alt: 'Une cérémonie de remise de diplômes des EBM. L’année de la photographie reste à confirmer.', position: '50% 55%' },
  trip: { src: '/images/alumni-atomium.jpg', width: 1280, height: 868, alt: 'Les élèves de Casablanca lors du voyage de rhéto de la promotion 2024–2025 en Belgique.' },
  tripCampus: { src: '/images/alumni-amphitheatre.jpg', width: 690, height: 517, alt: 'Une visite d’établissement supérieur pendant le voyage de rhéto de 2024.' },
  bruges: { src: '/images/alumni-bruges.jpg', width: 690, height: 920, alt: 'Une étape à Bruges du voyage de rhéto présenté dans l’article de novembre 2024.' },
  german: { src: '/images/migration-school/rabat-german-workshop.webp', width: 1600, height: 900, alt: 'Photographie publiée avec le partenariat germanophone de Rabat, en octobre 2024.' },
  solidarity: { src: '/images/migration-school/imzayne-solidarity.webp', width: 1280, height: 576, alt: 'Rencontre solidaire des élèves de Rabat avec l’école rurale d’Imzayne, présentée en mai 2024.' },
} satisfies Record<string, ImageAsset>

export const networkPage = {
  title: 'Le réseau EBM',
  intro: 'Deux écoles au Maroc, un même projet : faire grandir chaque enfant dans le cadre de l’enseignement belge francophone.',
  description: 'Découvrez le réseau des Écoles Belges au Maroc, son projet éducatif, ses quatre valeurs et son histoire à Casablanca et Rabat.',
  director: {
    title: 'Une école se construit ensemble',
    quote: 'Ensemble vers la réussite et le bonheur d’apprendre',
    paragraphs: ['Depuis 2014, les EBM font vivre la rencontre entre le Maroc et la Belgique francophone. Dans son message de bienvenue, le directeur du réseau souligne l’attention portée à la progression et au bien-être de chaque élève.', 'Équipes pédagogiques, équipes administratives et parents partagent cette ambition : accompagner les enfants avec compétence, engagement et bienveillance.'],
    name: 'Axel BEX CHAVAL', role: 'Directeur du réseau, selon le message publié par les EBM',
  },
  mission: {
    title: 'Apprendre, se construire, choisir',
    paragraphs: ['Notre projet relie les savoirs, les méthodes de travail et le développement personnel. Comprendre, raisonner et apprendre par soi-même prépare les élèves à poursuivre leurs études et à construire leurs choix de vie.', 'Cette ambition repose sur un cadre progressif, des enseignants qualifiés et une relation suivie avec les familles.'],
  },
  values: [
    { title: 'Compétence', text: 'Construire des connaissances solides et savoir les réutiliser dans des situations nouvelles.' },
    { title: 'Engagement', text: 'Donner à l’élève une place active dans ses apprentissages et dans la vie du groupe.' },
    { title: 'Dépassement de soi', text: 'Développer l’effort, la persévérance et la confiance pour progresser à son rythme.' },
    { title: 'Bienveillance', text: 'Valoriser chaque élève et installer une relation de confiance, attentive à ses besoins.' },
  ],
  framework: {
    title: 'Un cadre belge, une école au Maroc',
    paragraphs: ['Les établissements de Casablanca et de Rabat suivent le programme de la Fédération Wallonie-Bruxelles. Leur activité s’inscrit dans l’accord de coopération conclu le 21 mai 2014 entre le Royaume du Maroc et la Fédération Wallonie-Bruxelles.', 'Le programme belge est complété par la langue et la culture arabes, ainsi que l’histoire et la géographie du Maroc.'],
    facts: ['Programme de Wallonie-Bruxelles Enseignement.', 'Personnel enseignant et de direction titulaire des titres requis en Fédération Wallonie-Bruxelles.', 'Niveau des études et conformité du programme contrôlés par l’inspection de l’enseignement belge francophone.', 'Épreuves externes à la fin du primaire, du premier degré et du secondaire.'],
  },
  history: [
    { date: '21 mai 2014', title: 'Le cadre de coopération', text: 'Accord entre le Royaume du Maroc et la Fédération Wallonie-Bruxelles : le socle institutionnel des EBM.' },
    { date: 'Septembre 2018', title: 'Rabat ouvre ses portes', text: 'Le réseau accueille les familles sur le campus de Hay Riad.' },
    { date: 'Novembre 2018', title: 'L’inauguration de Rabat', text: 'L’école est inaugurée par S.A.R. la Princesse Astrid de Belgique.' },
    { date: '14 novembre 2023', title: 'Un site pour le secondaire à Rabat', text: 'Inauguration du site secondaire en présence de Pierre-Yves Jeholet. L’article qui relate cet événement a été publié le 12 janvier 2024.' },
  ],
  teamGap: 'Les portraits, biographies et fonctions actuelles des directions de campus restent à fournir par EBM.',
  /** The four figures under the hero (network-page.tsx), all from this page's own content. */
  keyFacts: [
    { value: '2014', label: 'Accord de coopération entre le Maroc et la Fédération Wallonie-Bruxelles' },
    { value: '2', label: 'campus, à Casablanca et à Rabat' },
    { value: '2–18', label: 'ans, de la classe d’accueil au CESS' },
    { value: '4', label: 'valeurs partagées par les équipes' },
  ],
  partnersIntro: 'Les EBM présentent la Fédération Wallonie-Bruxelles, Wallonie-Bruxelles International et l’Association des Écoles Belges à l’Étranger parmi leurs partenaires institutionnels.',
}

export interface SchoolLevel {
  id: 'maternelle' | 'primaire' | 'secondaire'
  label: string
  ages: string
  title: string
  text: string
  objectives: string[]
  subjects: string
  milestone: string
  image: ImageAsset
}
export const schoolLevels: SchoolLevel[] = [
  { id: 'maternelle', label: 'Maternelle', ages: 'Dès 2 ans en accueil · puis 3 à 6 ans en maternelle', title: 'Prendre confiance et découvrir', text: 'La classe d’accueil accompagne la première scolarisation dès 2 ans révolus. Les trois années de maternelle posent ensuite les bases du langage, de la pensée et des relations avec les autres, dans le respect du rythme de chaque enfant.', objectives: ['Développer le langage, la curiosité et la confiance.', 'Manipuler, explorer et apprendre par le jeu.', 'Grandir dans la relation aux autres et gagner en autonomie.'], subjects: 'Langage, découvertes mathématiques, éveil, expression créative et psychomotricité.', milestone: 'Des observations et échanges avec la famille accompagnent la progression. L’admission et le niveau d’entrée dépendent des conditions précisées par l’école.', image: schoolImages.nursery },
  { id: 'primaire', label: 'Primaire', ages: 'Environ 6 à 12 ans', title: 'Comprendre, consolider, devenir autonome', text: 'Au fil des six années du primaire, les élèves construisent des bases académiques durables. Les notions sont reprises et approfondies progressivement : cette démarche spiralaire relie les nouveaux apprentissages à ce qui est déjà compris.', objectives: ['Lire, écrire et s’exprimer avec précision.', 'Raisonner, résoudre des problèmes et structurer sa pensée.', 'Installer des méthodes de travail et apprendre à coopérer.'], subjects: 'Français, mathématiques, éveil scientifique et culturel, langues, éducation physique et expression artistique.', milestone: 'Fin de 6e primaire : épreuves externes et CEB, selon la terminologie de la page institutionnelle actuelle.', image: schoolImages.primary },
  { id: 'secondaire', label: 'Secondaire', ages: 'Environ 12 à 18 ans', title: 'Approfondir ses savoirs, préparer ses choix', text: 'Le secondaire associe des fondations communes, des choix progressifs d’options et une préparation méthodologique aux études supérieures. L’élève apprend à organiser son travail et à construire son projet d’orientation.', objectives: ['Approfondir les connaissances et argumenter.', 'Développer rigueur, autonomie et méthodes de travail.', 'Préparer un projet personnel d’études supérieures.'], subjects: 'Socle commun, langues, sciences, mathématiques et options progressives. Le détail actuel des options et des niveaux ouverts se confirme auprès du campus.', milestone: 'Fin de S2 : CE1D. Fin de S6 : CESS. Les établissements supérieurs conservent leurs conditions propres d’admission.', image: schoolImages.secondary },
]
export const pedagogyPage = {
  title: 'Comprendre pour apprendre, apprendre pour grandir',
  intro: 'De la première découverte aux choix d’orientation, une pédagogie active dans un cadre belge exigeant et bienveillant.',
  description: 'La pédagogie des EBM : maternelle, primaire, secondaire, langues, certificats belges, méthodes de travail et accompagnement des élèves.',
  principles: [
    { title: 'Partir du concret', text: 'Observer, manipuler et expérimenter pour comprendre les notions avant de les réutiliser.' },
    { title: 'S’appuyer sur des enseignants qualifiés', text: 'Des équipes formées à l’enseignement belge francophone ajustent leurs pratiques à la progression des élèves.' },
    { title: 'Progresser avec des repères clairs', text: 'Des objectifs explicites et des apprentissages construits sur la durée, dans le respect des programmes officiels.' },
    { title: 'Construire l’autonomie ensemble', text: 'L’école, l’élève et sa famille partagent une relation de confiance et des responsabilités complémentaires.' },
  ],
  outdoorTitle: 'À Casablanca, la classe s’ouvre sur la nature',
  outdoorText: 'L’école du dehors complète les apprentissages en salle. Observer, explorer et expérimenter prend aussi place dans un espace naturel de 1,5 hectare sur le campus de Dar Bouazza.',
  languageIntro: 'Le français est la langue d’enseignement. Les langues et la culture du Maroc complètent le programme belge, tandis que les langues étrangères élargissent les possibilités de communication.',
  languages: [
    { title: 'Arabe dès la M3', text: 'Langue et culture arabes, complétées par l’histoire et la géographie du Maroc au fil du parcours.' },
    { title: 'Anglais dès la P1', text: 'À Casablanca, l’anglais commence en 1re primaire. Des certifications Cambridge jalonnent le parcours; le niveau B2 en fin de secondaire est un objectif annoncé, pas un résultat garanti.' },
    { title: 'Une offre propre à Rabat', text: 'Le site EBM publie un choix entre anglais et néerlandais dès la P1 à Rabat. L’organisation actuelle et les places se confirment auprès du campus.' },
    { title: 'Espagnol à partir de la S4', text: 'L’introduction de l’espagnol en 4e secondaire est décrite dans le cadre institutionnel. L’offre de langues dépend du parcours et du campus.' },
  ],
  supports: [
    { question: 'Comment les élèves sont-ils évalués ?', answer: 'Les évaluations formatives servent à repérer ce qui est compris et à progresser; leurs points ne sont pas repris au bulletin. Les évaluations certificatives valident les acquis travaillés et contribuent aux décisions de passage ou de certification.' },
    { question: 'Quelle place pour les devoirs ?', answer: 'À l’école fondamentale, les devoirs consolident les apprentissages de classe, en quantité limitée. Le travail personnel augmente progressivement au secondaire pour apprendre à organiser son temps et préparer les études supérieures.' },
    { question: 'Comment l’école échange-t-elle avec les familles ?', answer: 'La communication régulière, les échanges avec les enseignants et les directions et le dialogue autour de la progression de l’élève font partie du projet éducatif. Les modalités se précisent avec le campus.' },
    { question: 'Comment se prépare l’orientation ?', answer: 'La connaissance de soi, les méthodes de travail et la construction du projet personnel sont travaillées progressivement. Le voyage de rhéto décrit en novembre 2024 illustre une rencontre avec des établissements supérieurs et des conseillers en orientation.' },
  ],
  diplomaGap: 'Terminologie à valider : la page institutionnelle actuelle emploie « CEB », tandis que l’ancienne FAQ et la brochure utilisent « CEP ». Aucun lien d’équivalence entre ces termes n’est déduit ici.',
  videoGap: 'Les épisodes identifiés et autorisés de la série « Parole d’enseignant », leurs sous-titres et leurs visuels restent à fournir par EBM.',
  /** The four figures under the hero (pedagogy-page.tsx), all from this page's own content. */
  keyFacts: [
    { value: '3', label: 'niveaux : maternelle, primaire et secondaire' },
    { value: '4', label: 'langues au fil du parcours, du français à l’espagnol' },
    { value: '1,5 ha', label: 'd’école du dehors sur le campus de Casablanca' },
    { value: '3', label: 'épreuves externes : fin du primaire, du 1er degré et du secondaire' },
  ],
}

export const outdoorsPage = {
  title: 'L’école du dehors',
  intro: 'À Casablanca, apprendre passe aussi par la nature\u202f: observer, explorer et expérimenter, en complément de la classe.',
  description: 'Découvrez l’école du dehors du campus EBM de Casablanca : une pédagogie qui relie apprentissages en classe, exploration et nature à Dar Bouazza.',
  introduction: ['Un terrain naturel devient un lieu d’apprentissage à part entière. Les enfants y mobilisent leur curiosité, leur langage et leur capacité à agir ensemble, puis relient ces expériences au travail en classe.', 'Le projet, présenté dans une publication de janvier 2024 après trois années de développement, associe expertise pédagogique et formation des enseignants. La page actuelle du campus confirme une pédagogie mixte « indoor/outdoor ».'],
  principles: [
    { title: 'Apprendre en faisant', text: 'L’exploration et l’expérimentation donnent une place concrète à l’observation et au questionnement.' },
    { title: 'Faire place à la nature', text: 'Le dehors devient un support pour découvrir le vivant et observer son environnement.' },
    { title: 'Agir avec les autres', text: 'Les situations vécues en groupe permettent d’exercer l’autonomie et la coopération.' },
  ],
  session: { title: 'Comment se déroule une séance ?', text: 'La publication de 2024 annonçait un premier déploiement de la classe d’accueil à la P2, pour les enfants de 2 à 7 ans. Le programme par niveau et l’organisation d’une séance actuelle restent à confirmer avec l’équipe de Casablanca.', gap: 'À compléter par EBM : niveaux participants cette année, fréquence des séances, déroulé concret et consignes aux familles.' },
  voicesGap: 'Un témoignage attribué et autorisé d’un enseignant, d’un parent ou d’un élève reste à recueillir. Les vidéos pédagogiques du dehors restent également à fournir.',
  location: { title: 'À Dar Bouazza, au sein du campus', text: 'L’espace de 1,5 hectare se situe dans l’enceinte du campus de Casablanca, sur la route d’Azemmour. Les informations d’accès et le contact sont regroupés sur la page du campus.' },
  events: 'Aucun événement public de l’école du dehors n’est confirmé dans les données disponibles. Contactez le campus pour connaître les possibilités de découverte dans le cadre de votre candidature.',
}

export interface SchoolActivity {
  id: string; title: string; text: string; type: 'sport' | 'arts' | 'culture'
  campus: 'both'; level: 'all'; sourceId: string; image: ImageAsset
}
export const schoolActivities: SchoolActivity[] = [
  { id: 'sport', title: 'Bouger et jouer ensemble', text: 'Les activités sportives font partie des domaines publiés par les EBM. Disciplines, groupes et créneaux sont communiqués par chaque école.', type: 'sport', campus: 'both', level: 'all', sourceId: 'activities', image: schoolImages.sport },
  { id: 'arts', title: 'Créer et s’exprimer', text: 'L’offre comprend des activités artistiques. Le programme de cette année et les niveaux accueillis restent à préciser auprès du campus.', type: 'arts', campus: 'both', level: 'all', sourceId: 'activities', image: schoolImages.primary },
  { id: 'culture', title: 'S’ouvrir à d’autres univers', text: 'Les activités culturelles prolongent la découverte et les échanges. La participation est facultative, payante et sur inscription.', type: 'culture', campus: 'both', level: 'all', sourceId: 'activities', image: schoolImages.bruges },
]
export const schoolStories = [
  { id: 'rheto', title: 'La Belgique, au fil du voyage de rhéto', date: '12 novembre 2024', datetime: '2024-11-12', campus: 'Casablanca', text: 'La promotion 2024–2025 a découvert Bruxelles, Namur, Liège et Bruges. Des visites de campus et des rencontres avec des enseignants, conseillers et étudiants ont nourri le projet d’études supérieures des élèves.', sourceId: 'trip-2024', sourceUrl: urls.trip, image: schoolImages.trip },
  { id: 'german', title: 'Pratiquer l’allemand autrement', date: '9 octobre 2024', datetime: '2024-10-09', campus: 'Rabat', text: 'Un partenariat annoncé avec l’Ambassade d’Allemagne et l’Institut Goethe proposait des ateliers interactifs aux enfants germanophones de 5 à 8 ans. Un exemple daté d’ouverture culturelle, dont la reconduction reste à confirmer.', sourceId: 'german-2024', sourceUrl: urls.german, image: schoolImages.german },
  { id: 'solidarite', title: 'Une rencontre solidaire à Imzayne', date: '30 mai 2024', datetime: '2024-05-30', campus: 'Rabat', text: 'Les élèves de S2 ont représenté la mobilisation de leur communauté scolaire après le séisme de septembre 2023 : dons, co-aménagement de l’école rurale et moments de jeux et de lecture avec les enfants.', sourceId: 'solidarity-2024', sourceUrl: urls.solidarity, image: schoolImages.solidarity },
]
export const schoolLifePage = {
  title: 'Grandir aux EBM',
  intro: 'Des apprentissages, des rencontres et une vie d’école qui se partage : dans la cour, sur le terrain et au-delà du campus.',
  description: 'La vie scolaire aux EBM : activités sportives, artistiques et culturelles, projets, bien-être, cantine, transport et informations pratiques par campus.',
  activityIntro: 'Sport, arts et culture : les domaines ci-dessous donnent un aperçu de l’offre publiée. Le catalogue actuel, les tarifs, les âges et les places sont communiqués aux familles par leur campus.',
  activitiesGap: 'Catalogue à fournir par EBM : activités de cette année, campus, niveaux, intervenants, horaires, tarifs et inscriptions. Les anciens exemples de clubs ne sont pas présentés comme une offre actuelle.',
  storiesIntro: 'Ces projets ont été publiés en 2024. Ils racontent la vie des écoles à cette date et ne constituent pas un agenda à venir.',
  wellbeingTitle: 'Être écouté, apprendre à vivre ensemble',
  wellbeing: ['Les équipes recherchent un équilibre entre exigence, bienveillance et sécurité. Les règles donnent des repères pour le respect de soi, des adultes, des autres élèves et du travail scolaire.', 'En cas de conflit, la priorité est de comprendre les faits et d’écouter les élèves concernés. Le dialogue ou les mesures éducatives s’inscrivent dans le règlement d’ordre intérieur; les familles sont associées lorsque la situation le demande.'],
  eventEmpty: 'Aucun événement public de vie scolaire à venir n’a été confirmé. Le calendrier 2026–2027 présente les dates scolaires et congés; les projets passés restent dans les récits ci-dessus.',
  quoteGap: 'Un témoignage de parent ou d’élève, avec son accord et son attribution, reste à fournir par EBM.',
}

export interface AlumniProfile {
  id: string; name: string; graduationYear: number; campus: 'casablanca' | 'rabat'; field: string
  biography: string; quote: string; image: ImageAsset; consent: true
}
/** No invented home personas imported. Filters/dialog/carousel activate only with real consented records. */
export const alumniProfiles: AlumniProfile[] = []
export const alumniFilterModel = { fields: ['graduationYear', 'campus', 'field'], minimumProfiles: 4 } as const
export const alumniPage = {
  title: 'Après les EBM',
  intro: 'Préparer un choix d’études, obtenir le CESS et poursuivre son propre chemin : la fin du secondaire ouvre une nouvelle étape.',
  description: 'CESS, orientation et poursuite d’études après les EBM. Découvrez le voyage de rhéto et des données historiques, clairement datées, sur les parcours des anciens.',
  portraitsGap: 'Les portraits individuels seront publiés après réception des noms, promotions, études ou métiers, photographies et témoignages autorisés. Les filtres par année, campus et domaine resteront masqués jusque-là.',
  ceremonyTitle: 'Les moments qui marquent un parcours',
  ceremonyText: 'La photographie de cérémonie appartient aux archives des EBM. Sa date et la promotion représentée restent à confirmer : elle n’est associée ici à aucun résultat ni effectif actuel.',
  orientationTitle: 'Un diplôme, puis un projet à construire',
  orientationText: ['Le CESS est le Certificat d’enseignement secondaire supérieur de l’enseignement belge francophone. Selon les EBM, il permet de présenter une candidature à des études supérieures au Maroc et à l’international.', 'Chaque établissement conserve ses propres critères : examen du dossier, sélection, prérequis ou démarches administratives d’équivalence. Le diplôme ne garantit donc pas une place dans une formation.', 'La construction du projet personnel, les méthodes de travail et les rencontres avec l’enseignement supérieur accompagnent progressivement l’orientation. Les services des EBM indiquent pouvoir aider les lauréats dans leurs démarches d’équivalence lorsqu’elles sont demandées.'],
  historyTitle: 'Un regard sur les parcours passés',
  historyIntro: 'La brochure des EBM conserve des données historiques. Elles décrivent les promotions étudiées dans ce document, sans représenter la situation des diplômés d’aujourd’hui.',
  destinationNote: 'Destinations de quatre promotions selon la brochure, page 32. Les années des promotions et le nombre d’élèves ne sont pas précisés.',
  fieldNote: 'Domaines d’études selon la brochure, page 33. Les années de cohorte et l’effectif ne sont pas précisés.',
  resultsNote: 'Résultats historiques transcrits des graphiques de la brochure, pages 30–31. Aucun résultat 2020 n’y figure. Les effectifs et dénominateurs ne sont pas indiqués; aucune performance actuelle ne se déduit de ces chiffres.',
  questions: [
    { question: 'Le CESS permet-il de poursuivre des études au Maroc ?', answer: 'Oui, selon la FAQ institutionnelle des EBM. Certaines institutions peuvent demander une procédure administrative d’équivalence; les EBM indiquent accompagner leurs lauréats dans cette démarche.' },
    { question: 'Et pour des études à l’international ?', answer: 'Le CESS permet de candidater à des formations à l’étranger, selon les règles propres à chaque établissement. Certaines filières examinent le dossier, imposent des prérequis ou organisent une sélection.' },
    { question: 'Les filières sélectives sont-elles accessibles ?', answer: 'Une candidature reste possible si le parcours académique, les résultats et le projet de l’élève répondent aux exigences de la formation. Il faut vérifier les critères et échéances directement auprès de l’établissement visé.' },
  ],
  joinTitle: 'Vous avez été élève aux EBM ?',
  joinText: 'Partagez votre parcours avec l’équipe : votre promotion, vos études ou votre métier, et ce que vous aimeriez transmettre aux élèves d’aujourd’hui. Le premier contact se fait directement avec les EBM.',
  joinHref: `${routes.contact}?sujet=alumni`,
  brochureHref: '/documents/brochure-archive.pdf',
}
export const alumniDestinations = [
  { label: 'Belgique', value: 56 }, { label: 'Maroc', value: 20 }, { label: 'Canada', value: 6 },
  { label: 'Royaume-Uni', value: 4 }, { label: 'France', value: 4 }, { label: 'États-Unis', value: 3 },
  { label: 'Suisse', value: 3 }, { label: 'Espagne', value: 2 }, { label: 'Norvège', value: 1 }, { label: 'Roumanie', value: 1 },
]
export const alumniStudyFields = [
  { label: 'Sciences de gestion', value: 44 }, { label: 'Sciences de la santé', value: 21 },
  { label: 'Ingénierie', value: 17 }, { label: 'Droit', value: 8 }, { label: 'Architecture', value: 7 },
  { label: 'Cinéma', value: 1 }, { label: 'Sciences politiques', value: 1 }, { label: 'Hôtellerie', value: 1 },
]
export const historicalResults = [
  { year: 2018, primaryEbm: 98, primaryFwb: 91, cessEbm: 100, cessFwb: 93 },
  { year: 2019, primaryEbm: 100, primaryFwb: 91, cessEbm: 100, cessFwb: 96 },
  { year: 2021, primaryEbm: 99, primaryFwb: 88, cessEbm: 98, cessFwb: 92 },
  { year: 2022, primaryEbm: 95, primaryFwb: 85, cessEbm: 100, cessFwb: 75 },
  { year: 2023, primaryEbm: 99.5, primaryFwb: 88.17, cessEbm: 98, cessFwb: 98 },
]
