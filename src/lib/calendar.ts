import { schoolCalendarEvents, type SchoolCalendarEvent } from '@/content/migration/admissions-calendar'

/*
 * The school calendar for /calendrier (30 Oct 2026). One shape for the page, whatever the source:
 *   'cms'      the Payload collection `calendar-events` (src/collections/CalendarEvents.ts), as
 *              soon as DATABASE_URI is set;
 *   'document' the signed 2026–2027 PDF transcription (content/migration/admissions-calendar.ts),
 *              when no database is connected yet or the query fails.
 * Dates are whole days (YYYY-MM-DD) in Africa/Casablanca; `end` is the last day, included.
 */

export type CalendarCategory = 'holidays' | 'school' | 'public' | 'event'
export type CalendarCampus = 'network' | 'casablanca' | 'rabat'

export interface CalendarEntry {
  id: string
  title: string
  start: string
  end: string | null
  category: CalendarCategory
  campus: CalendarCampus
  tentative: boolean
  note: string | null
}

export interface Calendar {
  entries: CalendarEntry[]
  source: 'cms' | 'document'
  schoolYear: string
}

export const TIME_ZONE = 'Africa/Casablanca'
const SCHOOL_YEAR = '2026-2027'

/** Today as YYYY-MM-DD in Casablanca. */
export function todayInCasablanca(now = new Date()): string {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
}

/* ---- The signed document, as entries ------------------------------------------------------------ */

function categoryOf(title: string): CalendarCategory {
  if (/vacances|congé/i.test(title)) return 'holidays'
  if (/reprise|rentrée|dernier jour/i.test(title)) return 'school'
  return 'public'
}

/* The document's notes are internal transcription remarks; families see these instead. */
function familyNote(event: SchoolCalendarEvent): string | null {
  if (event.title === 'rentrée') return 'Selon l’organisation de chaque école.'
  return null
}

function fromDocument(event: SchoolCalendarEvent, index: number): CalendarEntry {
  return {
    id: `document-${index}`,
    title: event.title === 'rentrée' ? 'Rentrée scolaire' : event.title,
    start: event.start_date,
    end: event.end_date_inclusive,
    category: categoryOf(event.title),
    campus: 'network',
    tentative: event.tentative_in_source || event.title === 'Premier Moharem',
    note: familyNote(event),
  }
}

export function documentCalendar(): Calendar {
  return { entries: schoolCalendarEvents.map(fromDocument), source: 'document', schoolYear: SCHOOL_YEAR }
}

/* ---- The CMS ---------------------------------------------------------------------------------------- */

/** A Payload date (ISO datetime) as the Casablanca day it falls on. */
function toDay(value: string | null | undefined): string | null {
  if (!value) return null
  return todayInCasablanca(new Date(value))
}

export async function getCalendar(): Promise<Calendar> {
  if (!process.env.DATABASE_URI) return documentCalendar()
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'calendar-events',
      where: { published: { equals: true } },
      sort: 'startDate',
      limit: 500,
      depth: 0,
    })
    if (result.docs.length === 0) return documentCalendar()
    const entries: CalendarEntry[] = result.docs.map((doc) => ({
      id: String(doc.id),
      title: doc.title,
      start: toDay(doc.startDate) ?? '',
      end: toDay(doc.endDate),
      category: doc.category as CalendarCategory,
      campus: doc.campus as CalendarCampus,
      tentative: Boolean(doc.tentative),
      note: doc.note ?? null,
    }))
    const years = [...new Set(result.docs.map((doc) => doc.schoolYear))].sort()
    return { entries, source: 'cms', schoolYear: years.at(-1) ?? SCHOOL_YEAR }
  } catch (error) {
    console.error('[calendar] CMS unavailable, showing the signed document instead.', error)
    return documentCalendar()
  }
}

/* ---- The .ics export ---------------------------------------------------------------------------------- */

const compactDate = (date: string) => date.replaceAll('-', '')
function nextDay(date: string): string {
  const d = new Date(`${date}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}
const escapeIcs = (value: string) =>
  value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(';', '\\;').replaceAll(',', '\\,')

/** RFC 5545 calendar of the entries; end dates become the exclusive DTEND. */
export function calendarIcs(calendar: Calendar, stamp = new Date()): string {
  const dtstamp = stamp.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EBM//Calendrier scolaire//FR',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:EBM ${calendar.schoolYear.replace('-', '–')}`,
    `X-WR-TIMEZONE:${TIME_ZONE}`,
  ]
  for (const entry of calendar.entries) {
    const description = [
      `Calendrier scolaire des Écoles Belges au Maroc ${calendar.schoolYear.replace('-', '–')}.`,
      entry.tentative ? 'Date estimée, à confirmer par l’école.' : '',
      entry.note ?? '',
    ]
      .filter(Boolean)
      .join(' ')
    lines.push(
      'BEGIN:VEVENT',
      `UID:ebm-${calendar.schoolYear}-${entry.id}@ecolebelge.org`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART;VALUE=DATE:${compactDate(entry.start)}`,
      `DTEND;VALUE=DATE:${compactDate(nextDay(entry.end ?? entry.start))}`,
      `SUMMARY:${escapeIcs(entry.title + (entry.tentative ? ' (date estimée)' : ''))}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `STATUS:${entry.tentative ? 'TENTATIVE' : 'CONFIRMED'}`,
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  // Fold at 75 UTF-8 octets without cutting a character.
  const encoder = new TextEncoder()
  return (
    lines
      .map((line) => {
        const folded: string[] = []
        let part = ''
        for (const char of line) {
          if (encoder.encode(part + char).length > 75) {
            folded.push(part)
            part = ' '
          }
          part += char
        }
        folded.push(part)
        return folded.join('\r\n')
      })
      .join('\r\n') + '\r\n'
  )
}
