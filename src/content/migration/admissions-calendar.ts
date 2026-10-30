/** Signed 2026–2027 school PDF, visually transcribed in the migration pack on 2026-10-24.
 * The fallback of /calendrier until the CMS is connected (src/lib/calendar.ts), and the seed of
 * the Payload collection `calendar-events`. End dates are inclusive. No event is bookable. */
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

