import type { CampusKey, StaffUser } from '@/lib/session'

/*
 * SAMPLE DATA. Every person, class, absence, duty, announcement, event and document below is
 * invented so the staff home can be designed at full density. None of it is EBM's. Replace each
 * export with the real source when the app is connected (README.md, "Remplacer les données
 * d'exemple"). Shapes are kept small and close to what those sources return, so the components
 * do not change.
 *
 * The bell schedule follows the Casablanca hours published on ecolebelge.org (doors 7h45, classes
 * 8h25 to 15h30) cut into 50-minute periods; EBM to confirm the real periods.
 *
 * Facts shown in two places are one value here: the evacuation drill and the report deadline are
 * events, and their announcements and the count tile are built from those events.
 */

/** The moment the sample screen is seen: Monday 9 November 2026, 8h05, before the first bell. */
export const sampleNow = new Date('2026-11-09T08:05:00+01:00')

export const campuses: Record<CampusKey, { name: string; place: string }> = {
  casablanca: { name: 'Casablanca', place: 'Dar Bouazza' },
  rabat: { name: 'Rabat', place: 'Hay Riad' },
}

/* ---- The school day ------------------------------------------------------------------------ */

/** Minutes after midnight. */
type Minutes = number

export interface BellSlot {
  code: string
  label: string
  from: Minutes
  to: Minutes
  kind: 'period' | 'break'
}

export const bell: BellSlot[] = [
  { code: 'P1', label: '1re heure', from: 505, to: 555, kind: 'period' },
  { code: 'P2', label: '2e heure', from: 555, to: 605, kind: 'period' },
  { code: 'R', label: 'Récréation', from: 605, to: 620, kind: 'break' },
  { code: 'P3', label: '3e heure', from: 620, to: 670, kind: 'period' },
  { code: 'P4', label: '4e heure', from: 670, to: 720, kind: 'period' },
  { code: 'Midi', label: 'Midi', from: 720, to: 780, kind: 'break' },
  { code: 'P5', label: '5e heure', from: 780, to: 830, kind: 'period' },
  { code: 'P6', label: '6e heure', from: 830, to: 880, kind: 'period' },
  { code: 'P7', label: '7e heure', from: 880, to: 930, kind: 'period' },
]

/** The day on the timeline: doors open at 7h45, the last bus leaves at 16h00. */
export const dayStart: Minutes = 465
export const dayEnd: Minutes = 960

/* ---- People -------------------------------------------------------------------------------- */

export interface Person {
  id: string
  name: string
  role: string
  campus: CampusKey
  email: string
  /** Extension at the reception desk. */
  extension?: string
}

export const people: Person[] = [
  { id: 'salma', name: 'Salma Benali', role: 'Professeure de français, secondaire', campus: 'casablanca', email: 'salma.benali@ecolebelge.org', extension: '214' },
  { id: 'camille', name: 'Camille Renard', role: 'Coordinatrice pédagogique, secondaire', campus: 'casablanca', email: 'camille.renard@ecolebelge.org', extension: '201' },
  { id: 'imane', name: 'Imane Kettani', role: 'Infirmière scolaire', campus: 'casablanca', email: 'imane.kettani@ecolebelge.org', extension: '110' },
  { id: 'omar', name: 'Omar Benjelloun', role: 'Service informatique, comptes Google', campus: 'casablanca', email: 'omar.benjelloun@ecolebelge.org', extension: '150' },
  { id: 'rachid', name: 'Rachid El Fassi', role: 'Secrétariat de direction', campus: 'casablanca', email: 'rachid.elfassi@ecolebelge.org', extension: '100' },
  { id: 'nadia', name: 'Nadia Berrada', role: 'Éducatrice, secondaire', campus: 'casablanca', email: 'nadia.berrada@ecolebelge.org', extension: '230' },
  { id: 'karim', name: 'Karim Idrissi', role: 'Éducateur, primaire', campus: 'casablanca', email: 'karim.idrissi@ecolebelge.org', extension: '130' },
  { id: 'sophie', name: 'Sophie Lambert', role: 'Maîtresse de remédiation, primaire', campus: 'casablanca', email: 'sophie.lambert@ecolebelge.org' },
  { id: 'youssef', name: 'Youssef Alaoui', role: 'Professeur d’éducation physique', campus: 'casablanca', email: 'youssef.alaoui@ecolebelge.org' },
  { id: 'mounia', name: 'Mounia Chraibi', role: 'Puéricultrice, maternelle', campus: 'casablanca', email: 'mounia.chraibi@ecolebelge.org' },
  { id: 'leila', name: 'Leila Amrani', role: 'Institutrice, 5e primaire B', campus: 'casablanca', email: 'leila.amrani@ecolebelge.org' },
  { id: 'thomas', name: 'Thomas Peeters', role: 'Professeur de mathématiques, secondaire', campus: 'casablanca', email: 'thomas.peeters@ecolebelge.org' },
  { id: 'hind', name: 'Hind Tazi', role: 'Institutrice, 2e maternelle A', campus: 'casablanca', email: 'hind.tazi@ecolebelge.org' },
  { id: 'julie', name: 'Julie Martens', role: 'Institutrice, 1re primaire', campus: 'rabat', email: 'julie.martens@ecolebelge.org' },
  { id: 'hamza', name: 'Hamza Ouazzani', role: 'Professeur de néerlandais', campus: 'rabat', email: 'hamza.ouazzani@ecolebelge.org' },
]

export function person(id: string) {
  const found = people.find((p) => p.id === id)
  if (!found) throw new Error(`Unknown person in sample data: ${id}`)
  return found
}

/** The signed-in teacher of the sample (src/lib/session.ts). */
export const sampleUser: StaffUser = {
  name: 'Salma Benali',
  givenName: 'Salma',
  email: 'salma.benali@ecolebelge.org',
  role: 'Professeure de français, secondaire',
  campus: 'casablanca',
}

/** Who answers an offer to cover a class. */
export const coverCoordinator = 'camille'

/** The directory's opening list, before anyone types: the people staff look for most. */
export const usefulContacts = ['camille', 'imane', 'omar', 'rachid']

/* ---- Her day ------------------------------------------------------------------------------- */

export interface Lesson {
  slot: string
  group: string
  room: string
}

/** Salma's classes today. Free periods are the ones not listed. */
export const myLessons: Lesson[] = [
  { slot: 'P1', group: '3e A', room: 'S12' },
  { slot: 'P2', group: '4e B', room: 'S14' },
  { slot: 'P4', group: '5e A', room: 'S12' },
  { slot: 'P7', group: '3e A', room: 'S12' },
]

/* ---- Duties -------------------------------------------------------------------------------- */

export interface Duty {
  label: string
  place: string
  /** One word for the timeline, written after the short duty bar. */
  short: string
  from: Minutes
  to: Minutes
  people: string[]
}

export const duties: Duty[] = [
  { label: 'Accueil', place: 'Grille d’entrée', short: 'Entrée', from: 465, to: 505, people: ['karim', 'hind'] },
  { label: 'Récréation', place: 'Cour du primaire', short: 'Cour', from: 605, to: 620, people: ['salma', 'youssef'] },
  { label: 'Midi', place: 'Cantine', short: 'Cantine', from: 720, to: 780, people: ['sophie', 'nadia'] },
  { label: 'Sortie', place: 'Parking des bus', short: 'Bus', from: 930, to: 960, people: ['karim', 'mounia'] },
]

/* ---- Absences and cover ---------------------------------------------------------------------- */

/**
 * The reason for an absence is never shown (health is private): only whether the colleague is
 * away from school or working elsewhere (a training, a school trip).
 */
export type AbsenceKind = 'absence' | 'formation'

export interface CoverSlot {
  from: Minutes
  to: Minutes
  /** Who takes the class; null while nobody does. */
  by: string | null
  /** What the class does meanwhile, when it is not the usual lesson. */
  note?: string
}

export interface Absence {
  person: string
  kind: AbsenceKind
  /** The class or classes left without their teacher. */
  group: string
  cover: CoverSlot[]
}

export const absences: Absence[] = [
  {
    person: 'leila',
    kind: 'absence',
    group: '5e primaire B',
    cover: [
      { from: 505, to: 605, by: 'karim' },
      { from: 620, to: 720, by: 'sophie' },
      { from: 780, to: 880, by: null },
      // 7th period: physical education with Youssef Alaoui, as every Monday. No cover needed.
    ],
  },
  {
    person: 'thomas',
    kind: 'formation',
    group: 'Maths, 3e et 4e',
    cover: [{ from: 620, to: 720, by: 'nadia', note: 'Étude surveillée' }],
  },
  {
    person: 'hind',
    kind: 'absence',
    group: '2e maternelle A',
    cover: [{ from: 830, to: 930, by: 'mounia' }],
  },
]

/* ---- Calendar ------------------------------------------------------------------------------ */

export interface SchoolEvent {
  id: string
  title: string
  /** ISO date-time with offset; a date alone is an all-day event. */
  at: string
  allDay?: boolean
  place: string
}

export const events: SchoolEvent[] = [
  { id: 'conseil-3e', title: 'Conseil de classe, 3e secondaire', at: '2026-11-10T16:00:00+01:00', place: 'Salle des professeurs' },
  { id: 'evacuation', title: 'Exercice d’évacuation incendie', at: '2026-11-12T10:30:00+01:00', place: 'Tout le campus' },
  { id: 'bulletins', title: 'Clôture de l’encodage des bulletins', at: '2026-11-13T16:00:00+01:00', place: 'Eduka' },
  { id: 'journee-pedagogique', title: 'Journée pédagogique, pas de cours', at: '2026-11-20T08:00:00+01:00', allDay: true, place: 'Tout le réseau' },
  { id: 'conseils', title: 'Début des conseils de classe', at: '2026-11-16T15:45:00+01:00', place: 'Secondaire' },
  { id: 'reunion-parents', title: 'Réunion parents–professeurs, secondaire', at: '2026-11-26T17:00:00+01:00', place: 'Bâtiment du secondaire' },
  { id: 'bulletins-familles', title: 'Bulletins visibles par les familles', at: '2026-12-04T08:00:00+01:00', allDay: true, place: 'Eduka' },
]

export function event(id: string) {
  const found = events.find((e) => e.id === id)
  if (!found) throw new Error(`Unknown event in sample data: ${id}`)
  return found
}

/* ---- Announcements ------------------------------------------------------------------------- */

export interface Announcement {
  id: string
  title: string
  from: string
  at: string
  read: boolean
  /** The event it is about, if any: its date and time are then printed from the event. */
  event?: string
  /** The text, one paragraph per entry. */
  body: string[]
}

export const announcements: Announcement[] = [
  {
    id: 'bulletins',
    title: 'Encodage des bulletins du 1er trimestre',
    from: 'Direction du secondaire',
    at: '2026-11-09T07:12:00+01:00',
    read: false,
    event: 'bulletins',
    body: [
      'Les notes et les appréciations du 1er trimestre sont à encoder dans Eduka avant la clôture. Passé ce délai, l’encodage sera fermé pour préparer les conseils de classe.',
      'Les conseils de classe commencent le lundi 16 novembre. Le planning par classe suivra cette semaine.',
    ],
  },
  {
    id: 'evacuation',
    title: 'Exercice d’évacuation incendie',
    from: 'Conseiller en prévention',
    at: '2026-11-06T15:50:00+01:00',
    read: false,
    event: 'evacuation',
    body: [
      'Un exercice d’évacuation aura lieu sur tout le campus. Au signal, accompagnez votre classe au point de rassemblement indiqué sur le plan affiché dans chaque local.',
      'Prenez la liste de présence de votre classe et signalez tout élève manquant au responsable de zone.',
    ],
  },
  {
    id: 'journee',
    title: 'Journée pédagogique : programme et ateliers',
    from: 'Direction du réseau',
    at: '2026-11-04T09:30:00+01:00',
    read: true,
    event: 'journee-pedagogique',
    body: [
      'La journée pédagogique réunit les équipes de Casablanca et de Rabat. Il n’y a pas cours pour les élèves ce jour-là.',
      'Le matin est consacré à l’évaluation formative, l’après-midi à des ateliers au choix. Les inscriptions aux ateliers se font par le formulaire envoyé par e-mail.',
    ],
  },
  {
    id: 'google',
    title: 'Comptes Google : activez la validation en deux étapes',
    from: 'Service informatique',
    at: '2026-11-02T11:00:00+01:00',
    read: true,
    body: [
      'Pour protéger les données des élèves, la validation en deux étapes devient obligatoire sur tous les comptes Google de l’école.',
      'Activez-la depuis les paramètres de votre compte Google. En cas de difficulté, le service informatique vous aide au poste 150.',
    ],
  },
]

/* ---- Documents ----------------------------------------------------------------------------- */

export type DocumentKind = 'pdf' | 'docs' | 'sheets' | 'forms'

export type DocumentCategory = 'Règlements et calendrier' | 'Procédures' | 'Évaluation' | 'Formulaires'

export interface StaffDocument {
  title: string
  kind: DocumentKind
  category: DocumentCategory
  updated: string
  /** Where it lives (a Drive link once connected). */
  href: string
}

export const documents: StaffDocument[] = [
  { title: 'Règlement d’ordre intérieur 2026-2027', kind: 'pdf', category: 'Règlements et calendrier', updated: '2026-09-01', href: '#' },
  { title: 'Calendrier scolaire 2026-2027', kind: 'pdf', category: 'Règlements et calendrier', updated: '2026-08-28', href: '#' },
  { title: 'Procédure : signaler une absence', kind: 'docs', category: 'Procédures', updated: '2026-10-05', href: '#' },
  { title: 'Grilles d’évaluation communes, 1er degré', kind: 'sheets', category: 'Évaluation', updated: '2026-10-21', href: '#' },
  { title: 'Formulaire : signaler un incident', kind: 'forms', category: 'Formulaires', updated: '2026-09-14', href: '#' },
  { title: 'Projet d’établissement', kind: 'pdf', category: 'Règlements et calendrier', updated: '2026-06-30', href: '#' },
  { title: 'Procédure : sortie pédagogique', kind: 'docs', category: 'Procédures', updated: '2026-09-22', href: '#' },
  { title: 'Plan d’évacuation du campus', kind: 'pdf', category: 'Procédures', updated: '2026-09-10', href: '#' },
  { title: 'Calendrier des évaluations, 2e degré', kind: 'sheets', category: 'Évaluation', updated: '2026-10-12', href: '#' },
  { title: 'Formulaire : demande de matériel', kind: 'forms', category: 'Formulaires', updated: '2026-09-03', href: '#' },
]

/* ---- Tools --------------------------------------------------------------------------------- */

export const tools = [
  { label: 'Gmail', href: 'https://mail.google.com/' },
  { label: 'Agenda Google', href: 'https://calendar.google.com/' },
  { label: 'Drive', href: 'https://drive.google.com/' },
  { label: 'Classroom', href: 'https://classroom.google.com/' },
  { label: 'Eduka', href: 'https://ecolebelge.eduka.school/' },
]

/* ---- What the screen derives, checked ------------------------------------------------------ */

export const coverSlots = absences.flatMap((a) => a.cover.map((slot) => ({ ...slot, absence: a })))
export const openCover = coverSlots.filter((slot) => slot.by === null)
export const coveredCount = coverSlots.length - openCover.length

/** Periods of the open cover that fall in Salma's free periods: the cover she could take. */
export function freeFor(lessons: Lesson[], from: Minutes, to: Minutes) {
  const busy = lessons.map((l) => bell.find((b) => b.code === l.slot)!)
  return !busy.some((b) => b.from < to && from < b.to)
}

console.assert(coveredCount + openCover.length === coverSlots.length, 'cover counts do not add up')
console.assert(
  coverSlots.every((s) => bell.some((b) => b.from === s.from) && bell.some((b) => b.to === s.to)),
  'a cover slot does not start and end on the bell',
)
console.assert(
  myLessons.every((l) => bell.some((b) => b.code === l.slot && b.kind === 'period')),
  'a lesson is not on a period',
)
console.assert(
  announcements.every((a) => !a.event || events.some((e) => e.id === a.event)),
  'an announcement points to a missing event',
)
