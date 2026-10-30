import { calendarIcs, getCalendar } from '@/lib/calendar'

/*
 * /calendrier/ebm.ics: the school calendar as an .ics file, built from the same dates as the page
 * (the CMS once connected, the signed document until then). Refreshed hourly and on every CMS
 * change (CalendarEvents hooks revalidate /calendrier).
 */
export const revalidate = 3600

export async function GET() {
  const calendar = await getCalendar()
  return new Response(calendarIcs(calendar), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="EBM-calendrier-scolaire-${calendar.schoolYear}.ics"`,
    },
  })
}
