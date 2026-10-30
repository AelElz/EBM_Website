/*
 * Copies the signed 2026–2027 school calendar (content/migration/admissions-calendar.ts) into the
 * Payload collection `calendar-events`, so EBM staff start from the real dates.
 *   npm run seed:calendar
 * Needs DATABASE_URI and PAYLOAD_SECRET in .env. Skips a date already there (same title and
 * first day), so it is safe to run twice.
 */
import { getPayload } from 'payload'

import config from '@payload-config'
import { documentCalendar } from '@/lib/calendar'

const payload = await getPayload({ config })
const { entries, schoolYear } = documentCalendar()
let created = 0

for (const entry of entries) {
  const existing = await payload.find({
    collection: 'calendar-events',
    where: { and: [{ title: { equals: entry.title } }, { startDate: { equals: `${entry.start}T12:00:00.000Z` } }] },
    limit: 1,
    depth: 0,
  })
  if (existing.totalDocs > 0) continue
  await payload.create({
    collection: 'calendar-events',
    data: {
      title: entry.title,
      // Noon UTC is the same day in Casablanca whatever the season.
      startDate: `${entry.start}T12:00:00.000Z`,
      endDate: entry.end ? `${entry.end}T12:00:00.000Z` : null,
      category: entry.category,
      campus: entry.campus,
      tentative: entry.tentative,
      note: entry.note,
      schoolYear,
      published: true,
    },
  })
  created += 1
}

payload.logger.info(`Calendrier : ${created} dates ajoutées, ${entries.length - created} déjà présentes.`)
process.exit(0)
