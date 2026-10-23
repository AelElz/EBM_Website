import type { Metadata } from 'next'

import { NotFoundContent } from '@/components/site/not-found-content'

/*
 * 404 for notFound() calls inside the public site (e.g. /nos-campus/<unknown>), rendered in the
 * (frontend) layout. Unmatched URLs are handled by src/app/global-not-found.tsx (same content).
 * Next.js adds <meta name="robots" content="noindex"> to 404 responses itself.
 */
export const metadata: Metadata = {
  title: 'Page introuvable',
}

export default function NotFound() {
  return <NotFoundContent />
}
