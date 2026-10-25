/** Admissions review data. Each record retains its source; published-source is not school approval. */
export type AdmissionsContentStatus = 'published-source' | 'needs-confirmation' | 'historical' | 'missing'
export interface AdmissionsSource {
  url: string
  fetchedAt: '2026-10-24'
  destination: string
  status: AdmissionsContentStatus
  campus?: 'network' | 'casablanca' | 'rabat'
  level?: string
  schoolYear?: string | null
}
const evidence = (path: string, destination: string, status: AdmissionsContentStatus = 'published-source'): AdmissionsSource => ({ url: `https://www.ecolebelge.org/${path}`, fetchedAt: '2026-10-24', destination, status, campus: 'network', schoolYear: null })

export const admissionSteps = [
  { title: 'S’informer et échanger', text: 'Découvrez le projet éducatif et prenez contact avec le service admissions de votre campus pour vos premières questions.' },
  { title: 'Déposer le dossier sur Eduka', text: 'La candidature en ligne situe le parcours de votre enfant et prépare les étapes suivantes. Le dépôt du dossier est nécessaire avant de poursuivre le processus.' },
  { title: 'Rencontrer la famille', text: 'Un entretien individuel avec les parents permet de présenter le projet, comprendre le profil de l’enfant et échanger sur les attentes de chacun.' },
  { title: 'Observer et comprendre les acquis', text: 'Selon le niveau, l’école organise une rencontre, une observation en classe ou une analyse pédagogique. Pour un élève venant d’une école officielle à programme de la Fédération Wallonie-Bruxelles, l’analyse s’appuie sur le dossier scolaire.' },
  { title: 'Recevoir la décision', text: 'La commission admissions examine les échanges et le profil pédagogique. Sa décision est communiquée aux parents par courriel.' },
  { title: 'Échanger après l’admission', text: 'Pour les familles des enfants admis, un échange permet de partager les observations, répondre aux dernières questions et préparer la suite.' },
  { title: 'Confirmer l’inscription', text: 'La famille confirme son choix, complète les formalités administratives et règle les frais requis. L’inscription devient définitive à l’issue de cette étape.' },
].map(step => ({ ...step, source: evidence('processus-admission', '/admissions/comprendre#parcours') }))

export const admissionLevelRequirements = [
  { level: 'Accueil / M0 et M1', title: 'Une rencontre avec vous et votre enfant', text: 'Un rendez-vous à l’école permet de faire connaissance avec la famille et l’enfant.' },
  { level: 'M2, M3 et P1', title: 'Une matinée d’observation en classe', text: 'L’enfant est observé en situation de classe afin d’apprécier son adaptation possible au cadre scolaire, sur rendez-vous.' },
  { level: 'P2 à S1', title: 'Une analyse pédagogique', text: 'Les acquis nécessaires à l’intégration sont analysés. Le processus publié prévoit une matinée du samedi, organisée en fonction des places disponibles.' },
].map(row => ({ ...row, source: evidence('processus-admission', '/admissions/comprendre#niveaux') }))

export const admissionCategories = [
  { question: 'Fratries en maternelle', answer: 'La page des catégories décrit une admission automatique pour les frères et sœurs d’élèves déjà scolarisés dans les établissements, lorsqu’ils demandent une entrée en maternelle. Les modalités et la campagne applicable sont à confirmer par le service admissions.' },
  { question: 'Admission sur dossier', answer: 'Cette catégorie concerne les enfants du personnel expatrié des EBM, de la Délégation générale Wallonie-Bruxelles, de l’APEFE, de l’Ambassade et des Consulats du Royaume de Belgique au Maroc. Elle concerne aussi les élèves ayant suivi au moins les deux dernières années complètes dans une école belge francophone à programme et diplôme de la Fédération Wallonie-Bruxelles. L’éligibilité exacte est examinée par l’école.' },
  { question: 'Entretien, observation ou analyse pédagogique', answer: 'Hors catégories particulières, le mode d’examen dépend du niveau demandé : entretien en accueil/M0 et M1, observation de M2 à P1, puis vérification des acquis de P2 à S1. L’école confirme le déroulement et les places disponibles pour chaque situation.' },
].map(row => ({ ...row, source: evidence('types-admission', '/admissions/comprendre#conditions', 'needs-confirmation') }))

export const applicationDocuments = [
  { title: 'Photo d’identité de l’élève', condition: 'Pour tous les dossiers', text: 'Une photo datant de moins de trois mois.' },
  { title: 'Pièce d’identité du tuteur légal', condition: 'Pour tous les dossiers', text: 'Copie recto-verso de la CIN ou copie du passeport.' },
  { title: 'Certificat de scolarité', condition: 'À partir de M3, à confirmer', text: 'Document datant de moins de trois mois. La page la plus récente indique M3 ; une ancienne page indiquait P1. Vérifiez le seuil applicable dans votre dossier Eduka.' },
  { title: 'Bulletins des deux dernières années', condition: 'À partir de P2', text: 'Préparez les bulletins des deux dernières années scolaires. Le service admissions confirme les années attendues pour la campagne en cours.' },
  { title: 'Pièce d’identité de l’élève belge', condition: 'Si l’enfant est de nationalité belge', text: 'Copie du passeport ou de la carte d’identité recto-verso.' },
].map(row => ({ ...row, source: evidence('comment-inscrire-mon-enfant', '/admissions/documents-et-frais#documents', 'needs-confirmation') }))

export type FeeCategory = 'standard' | 'belgian' | 'reduced'
export type FeeLevel = 'accueil' | 'maternelle' | 'primaire' | 'secondaire-S1-S3' | 'secondaire-S4-S6'
export const feeCategories: { value: FeeCategory; label: string }[] = [
  { value: 'standard', label: 'Standard' },
  { value: 'belgian', label: 'Enfants belges' },
  { value: 'reduced', label: 'Réduit — sous conditions' },
]
export const feeLevels: { value: FeeLevel; label: string }[] = [
  { value: 'accueil', label: 'Classe d’accueil' },
  { value: 'maternelle', label: 'Maternelle' },
  { value: 'primaire', label: 'Primaire' },
  { value: 'secondaire-S1-S3', label: 'Secondaire S1 à S3' },
  { value: 'secondaire-S4-S6', label: 'Secondaire S4 à S6' },
]
export const annualTuition: Record<FeeLevel, Record<FeeCategory, number | null>> = {
  accueil: { standard: null, belgian: null, reduced: null },
  maternelle: { standard: 47060, belgian: 37520, reduced: 28236 },
  primaire: { standard: 56070, belgian: 44410, reduced: 33642 },
  'secondaire-S1-S3': { standard: 65400, belgian: 51520, reduced: 39240 },
  'secondaire-S4-S6': { standard: 68580, belgian: 54700, reduced: 41148 },
}
export const firstRegistration: Record<FeeCategory, { accueil: number; other: number }> = {
  standard: { accueil: 30000, other: 40000 },
  belgian: { accueil: 7000, other: 10000 },
  reduced: { accueil: 18000, other: 24000 },
}
export const reEnrolment = {
  standard: { maternelle: 5000, primaire: 6000, secondaire: 7000 },
  reduced: { maternelle: 3000, primaire: 3600, secondaire: 4200 },
} as const
export const feeSource = evidence('frais-scolaire', '/admissions/documents-et-frais', 'needs-confirmation')
export const formatMad = (amount: number) => `${new Intl.NumberFormat('fr-MA').format(amount)} MAD`
export const visitPolicy = {
  title: 'Une visite dans le cadre de votre candidature',
  text: 'Les visites sont proposées aux familles ayant engagé une démarche de candidature. Elles sont organisées avec l’équipe de l’école, dans le respect du fonctionnement des classes. Il n’y a pas de visites libres ni de journées portes ouvertes au grand public.',
  source: evidence('faq', '/calendrier#visites'),
}
export const admissionsCampaign = {
  title: 'Dates communiquées par le service admissions',
  text: 'Contactez votre campus pour les dates de dépôt des dossiers, les niveaux ouverts et les rendez-vous de la campagne en cours.',
  source: { ...evidence('admission', '/admissions#dates', 'missing'), schoolYear: null },
}
