import { normalizePath } from '@/lib/routes'

/*
 * Small helpers shared by the header's server and client parts. No React, no data imports, so
 * importing this file never pulls content modules into a client bundle (lib/routes.ts is a
 * plain route table).
 */

/** id of the mobile sheet (aria-controls of the menu button while the sheet is open). */
export const MOBILE_MENU_ID = 'menu-mobile'

/**
 * True when `href` is the page being viewed (for aria-current="page"). An anchor link such as
 * `/admissions/comprendre#faq` is a place inside a page, not the page, so it never matches.
 */
export function isCurrentPage(pathname: string | null | undefined, href: string): boolean {
  if (!pathname || href.includes('#') || /^[a-z]+:/i.test(href)) return false
  return normalizePath(pathname) === normalizePath(href)
}
