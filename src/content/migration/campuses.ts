import { campuses as existingCampuses } from '@/content/campuses'
import { site, type CampusId, type Phone } from '@/content/site'
import type { ImageAsset } from '@/content/types'

export interface CampusSource {
  id: string
  url: string
  fetchedAt: '2026-10-24'
  destinations: string[]
  scope: string
  status: 'published-source' | 'historical' | 'needs-confirmation' | 'missing'
  note?: string
}

/** Source availability is not a claim of EBM's approval or of current operational accuracy. */
export const campusSources: CampusSource[] = [
  { id: 'S09', url: 'https://www.ecolebelge.org/casablanca', fetchedAt: '2026-10-24', destinations: ['/nos-campus', '/nos-campus/casablanca', '/contact'], scope: 'Casablanca; published campus description and services', status: 'published-source', note: 'Counts omitted. Exact hours and childcare conditions require confirmation.' },
  { id: 'S10', url: 'https://www.ecolebelge.org/rabat', fetchedAt: '2026-10-24', destinations: ['/nos-campus', '/nos-campus/rabat', '/contact'], scope: 'Rabat; opening, setting, services and published timetable', status: 'published-source', note: 'Area, pupil count and highest secondary level conflict; excluded from current facts.' },
  { id: 'S24', url: 'https://www.ecolebelge.org/contactez-nous', fetchedAt: '2026-10-24', destinations: ['/contact', '/nos-campus', '/nos-campus/casablanca', '/nos-campus/rabat'], scope: 'Campus and service contacts', status: 'published-source', note: 'Rabat email uses valid mailto value; malformed address-as-phone link discarded.' },
  { id: 'S25', url: 'https://www.ecolebelge.org/contactez-nous-1', fetchedAt: '2026-10-24', destinations: ['/contact'], scope: 'Alternate contact page', status: 'needs-confirmation', note: 'Alternate fondamentale@ spelling retained in gap register; primary fondamental@ wins.' },
  { id: 'S02', url: 'https://www.ecolebelge.org/fondamentaux', fetchedAt: '2026-10-24', destinations: ['/nos-campus', '/nos-campus/rabat'], scope: 'Shared Belgian curriculum and French-language teaching', status: 'published-source' },
  { id: 'S11', url: 'https://www.ecolebelge.org/nos-ecoles', fetchedAt: '2026-10-24', destinations: ['/nos-campus'], scope: 'Published two-campus network overview', status: 'published-source' },
  { id: 'S17', url: 'https://www.ecolebelge.org/faq', fetchedAt: '2026-10-24', destinations: ['/nos-campus/casablanca', '/nos-campus/rabat'], scope: 'Service providers and campus-specific transport policy', status: 'published-source', note: 'Class/childcare hours conflict with campus pages and are separately flagged.' },
  { id: 'B02', url: 'https://www.ecolebelge.org/blog/actualites-2/le-site-de-la-section-secondaire-de-l-ecole-belge-de-rabat-officiellement-inaugure-9', fetchedAt: '2026-10-24', destinations: ['/nos-campus/rabat'], scope: 'Event 14 November 2023; article 12 January 2024', status: 'historical', note: 'Past forecast of complete cycle in September 2026 is not current confirmation.' },
  { id: 'B01', url: 'https://www.ecolebelge.org/blog/actualites-2/l-ecole-belge-de-casablanca-lance-son-ecole-du-dehors-8', fetchedAt: '2026-10-24', destinations: ['/nos-campus/casablanca', '/nos-campus'], scope: 'Outdoor school; article 12 January 2024', status: 'historical', note: 'No claim that every planned facility has been delivered.' },
]

export interface CampusContact {
  label: string
  email: string
  phones: Phone[]
}

export interface CampusGalleryItem extends ImageAsset {
  caption: string
  source: string
}

export interface MigratedCampus {
  slug: CampusId
  city: string
  district: string
  title: string
  route: string
  intro: string
  description: string
  image: ImageAsset
  picto: ImageAsset
  address: string[]
  directionsUrl: string
  contacts: CampusContact[]
  levels: { title: string; detail: string; review?: string }
  facts: Array<{ label: string; value: string; source: string }>
  /** `short`: the one line the campus pages show (25 Oct 2026); `text` keeps the full source wording. */
  services: Array<{ title: string; summary?: string; short: string; text: string; source: string }>
  timetable: Array<{ group: string; rows: Array<{ label: string; value: string }> }>
  timetableReview: string
  gallery: CampusGalleryItem[]
  /** `title` marks its accent words with asterisks, like the home's section titles. */
  feature: { title: string; text: string; href: string; label: string; image: ImageAsset }
  history: Array<{ date: string; text: string; source: string }>
  sourceIds: string[]
  facebook: string
}

const phone = (label: string, display: string, digits: string): Phone => ({ label, display, href: `tel:${digits}` })
const addressSearch = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const migratedCampuses: MigratedCampus[] = [
  {
    slug: 'casablanca', city: 'Casablanca', district: 'Dar Bouazza', title: 'Campus de Casablanca', route: '/nos-campus/casablanca',
    intro: 'À Dar Bouazza, un parcours belge de 2 à 18 ans dans un campus ouvert sur la nature.',
    description: 'Le français est la langue d’enseignement. La maternelle, le primaire et le secondaire partagent un environnement pensé pour apprendre, expérimenter et grandir, à l’écart de l’agitation urbaine.',
    image: existingCampuses.casablanca.image, picto: existingCampuses.casablanca.picto,
    address: site.addresses.casablanca.lines,
    directionsUrl: addressSearch('École belge de Casablanca, Route d’Azemmour Km 13, Ouled Azzouz, Dar Bouazza, Maroc'),
    contacts: [
      { label: 'Section fondamentale', email: site.emails.casablanca[0].address, phones: [site.phones.casablanca, phone('Mobile', '+212 673 22 64 64', '+212673226464')] },
      { label: 'Section secondaire', email: site.emails.casablanca[1].address, phones: [phone('Secondaire', '+212 522 92 03 03', '+212522920303')] },
    ],
    levels: { title: 'De la classe d’accueil au secondaire', detail: 'Un cursus belge francophone complet, de 2 à 18 ans, jusqu’à la fin du secondaire.' },
    facts: [
      { label: 'Le campus', value: '7,5 hectares', source: 'S09' },
      { label: 'L’école du dehors', value: '1,5 hectare', source: 'S09' },
      { label: 'L’enseignement', value: 'En français', source: 'S09' },
    ],
    services: [
      { title: 'Cantine', short: 'Un repas chaud préparé sur place, menu envoyé chaque mois.', text: 'Un repas chaud est préparé et servi sur place par ProxyRest, prestataire mentionné sur le site de l’école. Le menu est communiqué aux parents chaque début de mois.', source: 'S09' },
      { title: 'Transport scolaire', short: 'Des circuits organisés selon les demandes des familles.', text: 'Le transport est assuré par RUN RUN, prestataire mentionné sur le site de l’école. Les circuits dépendent des demandes des familles en début d’année. Trajets, inscription et règlement sont à voir avec le prestataire.', source: 'S09' },
      { title: 'Garderie', short: 'Un accueil autour du temps scolaire, au fondamental.', text: 'Un accueil est prévu autour du temps scolaire au fondamental. Les horaires et les conditions de garde payante sont à confirmer auprès du campus.', source: 'S09' },
      { title: 'EBM ExtraClub', short: 'Des activités créatives, culturelles et sportives.', text: 'Des activités créatives, culturelles et sportives prolongent les apprentissages. L’offre et les modalités sont à demander au campus.', source: 'S09' },
    ],
    timetable: [
      { group: 'Section fondamentale', rows: [ { label: 'Ouverture des portes', value: '07 h 45' }, { label: 'Début des cours', value: '08 h 25 ; 08 h 50 en maternelle' }, { label: 'Fin des cours', value: '15 h 30' }, { label: 'Mercredi', value: '12 h 10 en maternelle ; 13 h en primaire' }, { label: 'Fermeture des portes', value: '17 h' } ] },
      { group: 'Section secondaire', rows: [ { label: 'Cours', value: '08 h 25 – 16 h 30' }, { label: 'Dernier degré, mardi et jeudi', value: 'Fin à 17 h 20' }, { label: 'Mercredi', value: 'Fin à 13 h' } ] },
    ],
    timetableReview: 'Ces horaires proviennent de la page du campus, consultée le 24 octobre 2026. La FAQ publie d’autres heures de début et de garderie. Faites confirmer l’horaire de la classe et la garde : la page Casablanca indique notamment une garde payante de 16 h à 17 h, et non jusqu’à 18 h.',
    gallery: [
      { src: '/images/casablanca-cour-fondamental.jpg', alt: 'La cour de la section fondamentale à Casablanca.', width: 1448, height: 1086, caption: 'La cour du fondamental.', source: 'Photos/CASABLANCA/Fondamental_EBC.png' },
      { src: '/images/casablanca-bibliotheque.jpg', alt: 'La bibliothèque de la section secondaire à Casablanca.', width: 1535, height: 1025, caption: 'La bibliothèque du secondaire.', source: 'Photos/CASABLANCA/Biblio_secondaire_EBC.png' },
      { src: '/images/casablanca-cour-secondaire.jpg', alt: 'La cour du secondaire au campus de Casablanca.', width: 1448, height: 1086, caption: 'La cour du secondaire.', source: 'Photos/CASABLANCA/6bdda8ee-a9c1-43b4-9d99-61829e02b72d.png' },
    ],
    feature: { title: 'Apprendre aussi *dehors*', text: 'Au sein du campus, l’école du dehors occupe un espace de 1,5 hectare. La nature devient un terrain d’observation et d’expérimentation, en complément des apprentissages en classe.', href: '/ecole-du-dehors', label: 'Découvrir l’école du dehors', image: { src: '/images/casablanca-ecole-du-dehors.jpg', alt: 'L’espace de l’école du dehors au campus de Casablanca.', width: 900, height: 1600 } },
    history: [{ date: 'Janvier 2024', text: 'Le lancement de l’école du dehors est présenté dans une publication du réseau. Les équipements alors annoncés en cours d’aménagement ne sont pas tous confirmés comme réalisés.', source: 'B01' }],
    sourceIds: ['S09', 'S17', 'S24', 'B01'], facebook: 'https://www.facebook.com/ecolebelgedecasablanca',
  },
  {
    slug: 'rabat', city: 'Rabat', district: 'Hay Riad', title: 'Campus de Rabat', route: '/nos-campus/rabat',
    intro: 'Au cœur de Hay Riad, une école belge dans un environnement urbain, verdoyant et calme.',
    description: 'Ouvert en septembre 2018, le campus réunit l’enseignement maternel, primaire et secondaire. Il fait vivre le programme belge francophone au quotidien, avec des espaces pour apprendre et des activités pour s’épanouir.',
    image: existingCampuses.rabat.image, picto: existingCampuses.rabat.picto,
    address: site.addresses.rabat.lines,
    directionsUrl: addressSearch('École belge de Rabat, Avenue Sophora, Hay Riad, Secteur 23, 10110 Rabat, Maroc'),
    contacts: [{ label: 'Accueil du campus', email: site.emails.rabat[0].address, phones: [site.phones.rabat] }],
    levels: { title: 'Maternelle, primaire et secondaire', detail: 'Un accueil dès 2 ans et un enseignement secondaire développé progressivement depuis l’ouverture.', review: 'La dernière année secondaire effectivement ouverte et les places disponibles sont à confirmer auprès du campus. Le site ancien contient des indications différentes (S3, S5 et un cycle complet annoncé pour septembre 2026).' },
    facts: [
      { label: 'Ouverture du campus', value: 'Septembre 2018', source: 'S10' },
      { label: 'Le quartier', value: 'Hay Riad', source: 'S24' },
      { label: 'L’enseignement', value: 'En français', source: 'S02' },
    ],
    services: [
      { title: 'Cantine', short: 'Un repas chaud préparé sur place\u202f: entrée, plat et dessert.', text: 'Un repas chaud, avec entrée, plat et dessert, est préparé et servi sur place par ProxyRest, prestataire mentionné sur le site de l’école.', source: 'S10' },
      { title: 'Transport scolaire', summary: 'Transport non proposé dans la FAQ', short: 'Non proposé selon la FAQ, à confirmer avec le campus.', text: 'La FAQ du réseau indique que le transport scolaire n’est pas proposé à Rabat au moment de sa rédaction. Faites confirmer la situation actuelle auprès du campus avant de vous organiser.', source: 'S17' },
      { title: 'Garderie', short: 'Un accueil autour du temps scolaire, au fondamental.', text: 'Un accueil des élèves du fondamental est organisé autour du temps scolaire. Demandez au campus les plages de garde et les conditions applicables à votre enfant.', source: 'S10' },
      { title: 'EBM ExtraClub', short: 'Des activités créatives, culturelles et sportives.', text: 'Des activités créatives, culturelles et sportives sont proposées en complément de la vie de classe. Le programme actuel est à demander au campus.', source: 'S10' },
    ],
    timetable: [
      { group: 'Section fondamentale', rows: [{ label: 'Ouverture des portes', value: '07 h 45' }, { label: 'Cours', value: '08 h 25 – 15 h 30' }, { label: 'Mercredi', value: '12 h 10 en maternelle ; 13 h en primaire' }, { label: 'Fermeture des portes', value: '18 h' }] },
      { group: 'Section secondaire', rows: [{ label: 'Lundi, mardi, jeudi', value: '08 h 25 – 16 h 20' }, { label: 'Vendredi', value: '08 h 25 – 15 h 30' }, { label: 'Mercredi', value: 'Fin à 12 h 10' }] },
    ],
    timetableReview: 'Ces horaires proviennent de la page du campus, consultée le 24 octobre 2026. La FAQ mentionne notamment un début à 08 h 20 et des heures de fin différentes le mercredi. Demandez l’horaire de la classe et les conditions de garde à l’équipe de Rabat avant de vous organiser.',
    gallery: [
      { src: '/images/hero-rabat-entree.jpg', alt: 'L’entrée de la section secondaire de l’École belge de Rabat.', width: 2400, height: 1600, caption: 'L’entrée du secondaire.', source: 'Photos/RABAT/Entrée secondaire EBR avec élèves.jpg' },
      { src: '/images/campus-rabat.jpg', alt: 'Les espaces extérieurs et les terrains de sport du campus de Rabat.', width: 1600, height: 1068, caption: 'Les espaces extérieurs du campus.', source: 'A06 Rabat/04_Rabat 4.jpg' },
      { src: '/images/alumni-rabat.jpg', alt: 'Photo de groupe d’élèves dans le hall de l’École belge de Rabat.', width: 1600, height: 1142, caption: 'Des élèves réunis dans le hall du campus de Rabat.', source: 'A06 Rabat/03_Rabat 1.jpg' },
    ],
    feature: { title: 'Une école *au cœur de Hay Riad*', text: 'Le campus s’inscrit dans la vie de Hay Riad. Son site secondaire a été officiellement inauguré le 14 novembre 2023, une étape dans le développement de l’école.', href: '/le-reseau#histoire', label: 'L’histoire du réseau', image: { src: '/images/hero-rabat-entree.jpg', alt: 'L’entrée du secondaire de l’École belge de Rabat à Hay Riad.', width: 2400, height: 1600 } },
    history: [ { date: 'Septembre 2018', text: 'Ouverture de l’École belge de Rabat.', source: 'S10' }, { date: 'Novembre 2018', text: 'Inauguration par la Princesse Astrid de Belgique.', source: 'S10' }, { date: '14 novembre 2023', text: 'Inauguration officielle du site secondaire. L’article qui relate l’événement est publié le 12 janvier 2024.', source: 'B02' } ],
    sourceIds: ['S02', 'S10', 'S17', 'S24', 'B02'], facebook: 'https://www.facebook.com/ecolebelgederabat/',
  },
]

export const getMigratedCampus = (slug: string) => migratedCampuses.find((campus) => campus.slug === slug)
export const campusRequestHref = (campus: MigratedCampus, subject: string, service = 0) => `mailto:${campus.contacts[service].email}?subject=${encodeURIComponent(`${subject} — ${campus.city}`)}`

export const campusAssetLedger = migratedCampuses.flatMap((campus) => [
  { src: campus.image.src, campus: campus.slug, use: 'Campus split hero and hub card', provenance: 'docs/HOME-SPEC.md existing asset ledger', review: 'EBM rights/parental permissions to confirm before publication' },
  ...campus.gallery.map((image) => ({ src: image.src, campus: campus.slug, use: image.caption, provenance: image.source, review: 'EBM rights/parental permissions to confirm before publication' })),
  { src: campus.feature.image.src, campus: campus.slug, use: 'Campus distinctive feature', provenance: campus.slug === 'casablanca' ? 'Photos/CASABLANCA/DEHORS/IMG_0724.HEIC' : 'Photos/RABAT/Entrée secondaire EBR avec élèves.jpg', review: 'EBM rights/parental permissions to confirm before publication' },
])

/** Lightweight recipients passed from Server Components to the optional mail composer. */
export const campusContactRecipients = migratedCampuses.flatMap((campus) => campus.contacts.map((service, index) => ({ id: `${campus.slug}-${index}`, campus: campus.slug, label: `${campus.city} — ${service.label}`, email: service.email })))
