import { migratedCampuses } from '@/content/migration/campuses'
import { getCmsContent } from './server'
export const getCampuses = () => getCmsContent('campuses', migratedCampuses)
export function contactRecipients(campuses: typeof migratedCampuses) {
  return campuses.flatMap(campus => campus.contacts.map((service, index) => ({ id: `${campus.slug}-${index}`, campus: campus.slug, label: `${campus.city} — ${service.label}`, email: service.email })))
}
