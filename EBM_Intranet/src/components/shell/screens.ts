import { ArrowLeftRight, BookUser, CalendarDays, FileText, House, Megaphone, type LucideIcon } from 'lucide-react'

/*
 * The app's screens, shared by the sidebar (from 1024px) and the tab bar (phones). A count shows
 * only on a queue that needs doing, with its noun for screen readers.
 */

export interface NavCounts {
  unread: number
  openCover: number
}

export interface Screen {
  href: string
  label: string
  icon: LucideIcon
  count?: keyof NavCounts
  noun?: string
  /** In the phone tab bar; the others go in the "Plus" sheet. */
  tab: boolean
}

export const screens: Screen[] = [
  { href: '/', label: 'Accueil', icon: House, tab: true },
  { href: '/annonces', label: 'Annonces', icon: Megaphone, count: 'unread', noun: 'non lues', tab: true },
  { href: '/agenda', label: 'Agenda', icon: CalendarDays, tab: true },
  { href: '/absences', label: 'Absences', icon: ArrowLeftRight, count: 'openCover', noun: 'à pourvoir', tab: true },
  { href: '/documents', label: 'Documents', icon: FileText, tab: false },
  { href: '/annuaire', label: 'Annuaire', icon: BookUser, tab: false },
]

export function isActive(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
