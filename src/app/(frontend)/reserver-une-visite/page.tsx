import { permanentRedirect } from 'next/navigation'

import { routes, visitFor } from '@/lib/routes'

/*
 * 30 Oct 2026: the visit request moved to the calendar page (/calendrier#visite), where families
 * see the dates of the year next to it. This address stays as a permanent redirect that keeps
 * the campus chosen in the link (?campus=casablanca or ?campus=rabat).
 */
export default async function VisitRedirect({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { campus } = await searchParams
  permanentRedirect(campus === 'casablanca' || campus === 'rabat' ? visitFor(campus) : routes.reserverVisite)
}
