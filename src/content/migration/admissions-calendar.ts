/** Signed 2026–2027 school PDF, visually transcribed in the migration pack on 2026-10-24.
 * Inclusive end dates are converted to exclusive DTEND in the ICS export. No event is bookable. */
export interface SchoolCalendarEvent {
 title: string
 start_date: string
 end_date_inclusive: string | null
 tentative_in_source: boolean
 notes: string
 bookable: boolean
}
export const schoolCalendar = {
  "source_page": "https://www.ecolebelge.org/calendrier",
  "source_pdf": "https://www.ecolebelge.org/web/content/4779?unique=24bcf465973967fadfa9dc1b9b75f1068bb29a6a&download=true",
  "method": "Visual transcription of one-page signed image-based PDF; compared with public HTML. Dates are the school document’s published dates, not independent verification of holidays.",
  "school_year": "2026-2027",
  "timezone": "Africa/Casablanca",
  "campus_applicability": "Network calendar; school-specific rentrée organisation may differ.",
  "end_date_semantics": "inclusive; convert correctly for exclusive ICS DTEND",
  "events": [
    {
      "title": "rentrée",
      "start_date": "2026-08-24",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "Rentrée selon l’organisation de chaque école",
      "bookable": false
    },
    {
      "title": "Aïd Al Mawlid",
      "start_date": "2026-08-25",
      "end_date_inclusive": "2026-08-26",
      "tentative_in_source": true,
      "notes": "Vers le 25 août et son lendemain; HTML conflicts (05/08).",
      "bookable": false
    },
    {
      "title": "Congé de détente",
      "start_date": "2026-10-17",
      "end_date_inclusive": "2026-11-01",
      "tentative_in_source": false,
      "notes": "Dates inclusives; reprise 2 novembre.",
      "bookable": false
    },
    {
      "title": "Reprise des cours",
      "start_date": "2026-11-02",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Marche verte",
      "start_date": "2026-11-06",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Fête de l’Indépendance",
      "start_date": "2026-11-18",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Vacances d’hiver",
      "start_date": "2026-12-19",
      "end_date_inclusive": "2027-01-03",
      "tentative_in_source": false,
      "notes": "Dates inclusives; reprise 4 janvier.",
      "bookable": false
    },
    {
      "title": "Reprise des cours",
      "start_date": "2027-01-04",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Manifeste de l’indépendance",
      "start_date": "2027-01-11",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Nouvel an Amazigh",
      "start_date": "2027-01-14",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "As published in the school PDF; not independently verified against national holiday rules.",
      "bookable": false
    },
    {
      "title": "Congé de détente",
      "start_date": "2027-02-20",
      "end_date_inclusive": "2027-03-07",
      "tentative_in_source": false,
      "notes": "Dates inclusives; reprise 8 mars.",
      "bookable": false
    },
    {
      "title": "Reprise des cours",
      "start_date": "2027-03-08",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Aïd El-Fitr",
      "start_date": "2027-03-10",
      "end_date_inclusive": "2027-03-11",
      "tentative_in_source": true,
      "notes": "Vers le 10 mars et son lendemain.",
      "bookable": false
    },
    {
      "title": "Vacances de printemps",
      "start_date": "2027-04-24",
      "end_date_inclusive": "2027-05-09",
      "tentative_in_source": false,
      "notes": "Inclut le 1er mai; reprise 10 mai. HTML incorrectly extends holiday to 10 May.",
      "bookable": false
    },
    {
      "title": "Reprise des cours",
      "start_date": "2027-05-10",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Aïd El Kebir",
      "start_date": "2027-05-17",
      "end_date_inclusive": "2027-05-18",
      "tentative_in_source": true,
      "notes": "Vers le 17 mai et son lendemain.",
      "bookable": false
    },
    {
      "title": "Premier Moharem",
      "start_date": "2027-06-06",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "As published; verify lunar-holiday confirmation with EBM.",
      "bookable": false
    },
    {
      "title": "Dernier jour d’école",
      "start_date": "2027-07-02",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "",
      "bookable": false
    },
    {
      "title": "Vacances d’été",
      "start_date": "2027-07-03",
      "end_date_inclusive": "2027-08-29",
      "tentative_in_source": false,
      "notes": "Dates inclusives.",
      "bookable": false
    },
    {
      "title": "Fête du Trône",
      "start_date": "2027-07-30",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "Listed for information in summer holiday period.",
      "bookable": false
    },
    {
      "title": "Allégeance",
      "start_date": "2027-08-14",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "Listed for information in summer holiday period.",
      "bookable": false
    },
    {
      "title": "Révolution du Roi et du Peuple",
      "start_date": "2027-08-20",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "Listed for information in summer holiday period.",
      "bookable": false
    },
    {
      "title": "Fête de la Jeunesse",
      "start_date": "2027-08-21",
      "end_date_inclusive": null,
      "tentative_in_source": false,
      "notes": "Listed for information in summer holiday period.",
      "bookable": false
    }
  ]
} as const
export const schoolCalendarEvents: SchoolCalendarEvent[] = [...schoolCalendar.events]
export const calendarPdfHref = '/documents/school-calendar-2026-2027.pdf'

const compactDate = (date: string) => date.replaceAll('-', '')
function nextDay(date: string): string {
 const d = new Date(`${date}T12:00:00Z`)
 d.setUTCDate(d.getUTCDate() + 1)
 return d.toISOString().slice(0, 10)
}
const escapeIcs = (value: string) => value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(';', '\\;').replaceAll(',', '\\,')
export function schoolCalendarIcs(): string {
 const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//EBM//Calendrier scolaire de consultation//FR', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:EBM 2026–2027', 'X-WR-TIMEZONE:Africa/Casablanca']
 schoolCalendarEvents.forEach((event, index) => {
  const tentative = event.tentative_in_source || event.title === 'Premier Moharem'
  lines.push('BEGIN:VEVENT', `UID:ebm-2026-2027-${index}@ecolebelge.org`, 'DTSTAMP:20261024T120000Z', `DTSTART;VALUE=DATE:${compactDate(event.start_date)}`, `DTEND;VALUE=DATE:${compactDate(nextDay(event.end_date_inclusive ?? event.start_date))}`, `SUMMARY:${escapeIcs(event.title + (tentative ? ' (date estimée)' : ''))}`, `DESCRIPTION:${escapeIcs('Calendrier scolaire EBM 2026–2027. Source : document scolaire signé. ' + (tentative ? 'Date lunaire à confirmer. ' : '') + (event.title === 'rentrée' ? 'Selon l’organisation de chaque école. ' : '') + 'Cette date ne constitue pas un créneau de visite. Export ponctuel ; pas de mise à jour automatique.')}`, `STATUS:${tentative ? 'TENTATIVE' : 'CONFIRMED'}`, 'TRANSP:TRANSPARENT', 'END:VEVENT')
 })
 lines.push('END:VCALENDAR')
 // RFC 5545: fold content at 75 UTF-8 octets without cutting a character.
 return lines.map(line => {
  const folded: string[] = []
  let part = ''
  for (const char of line) {
   if (new TextEncoder().encode(part + char).length > 75) { folded.push(part); part = ' ' }
   part += char
  }
  folded.push(part)
  return folded.join('\r\n')
 }).join('\r\n') + '\r\n'
}
