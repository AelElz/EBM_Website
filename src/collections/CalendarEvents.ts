import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

/*
 * The school calendar shown on /calendrier (30 Oct 2026). EBM staff add, edit and unpublish the
 * dates in the admin; the page reads them through src/lib/calendar.ts and is refreshed on every
 * change. Until a database is connected the page shows the signed 2026–2027 document
 * (content/migration/admissions-calendar.ts), and `npm run seed:calendar` copies those dates in.
 *
 * Dates are whole days in Africa/Casablanca, the end date included. Visitors see published dates
 * only; signed-in staff see drafts too.
 */
export const CalendarEvents: CollectionConfig = {
  slug: 'calendar-events',
  labels: { singular: 'Date du calendrier', plural: 'Calendrier scolaire' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'endDate', 'category', 'campus', 'published'],
    group: 'Calendrier',
    description: 'Les dates affichées sur la page Calendrier du site. La date de fin est incluse.',
    listSearchableFields: ['title'],
  },
  defaultSort: 'startDate',
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/calendrier')
      },
    ],
    afterDelete: [
      () => {
        revalidatePath('/calendrier')
      },
    ],
  },
  fields: [
    { name: 'title', label: 'Intitulé', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          label: 'Premier jour',
          type: 'date',
          required: true,
          index: true,
          admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
        },
        {
          name: 'endDate',
          label: 'Dernier jour (inclus)',
          type: 'date',
          admin: {
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
            description: 'Laisser vide pour une date d’un seul jour.',
          },
          validate: (value: unknown, { siblingData }: { siblingData: { startDate?: string } }) =>
            !value || !siblingData.startDate || String(value) >= String(siblingData.startDate)
              ? true
              : 'Le dernier jour doit suivre le premier.',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Type',
          type: 'select',
          required: true,
          defaultValue: 'event',
          options: [
            { label: 'Congés et vacances', value: 'holidays' },
            { label: 'Rentrée et reprises', value: 'school' },
            { label: 'Jour férié', value: 'public' },
            { label: 'Événement de l’école', value: 'event' },
          ],
        },
        {
          name: 'campus',
          label: 'Campus',
          type: 'select',
          required: true,
          defaultValue: 'network',
          options: [
            { label: 'Les deux campus', value: 'network' },
            { label: 'Casablanca', value: 'casablanca' },
            { label: 'Rabat', value: 'rabat' },
          ],
        },
      ],
    },
    {
      name: 'tentative',
      label: 'Date estimée (fête lunaire, à confirmer)',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'note',
      label: 'Précision pour les familles',
      type: 'textarea',
      admin: { description: 'Une phrase courte, affichée sous la date. Facultatif.' },
    },
    {
      name: 'schoolYear',
      label: 'Année scolaire',
      type: 'text',
      required: true,
      defaultValue: '2026-2027',
      index: true,
      admin: { position: 'sidebar', description: 'Par exemple 2026-2027.' },
    },
    {
      name: 'published',
      label: 'Publiée sur le site',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
