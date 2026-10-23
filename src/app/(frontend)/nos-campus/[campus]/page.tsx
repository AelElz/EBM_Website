import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { campusList, getCampus } from '@/content/campuses'
import { pages, type PageSlug } from '@/content/pages'
import { PlaceholderPage, placeholderMetadata } from '@/components/site/placeholder-page'

/*
 * Shared campus template (Casablanca, Rabat). Data: src/content/campuses.ts; the placeholder
 * copy comes from pages['campus-<slug>']. Only the listed campuses exist (404 otherwise).
 */
export const dynamicParams = false

export function generateStaticParams() {
  return campusList.map((campus) => ({ campus: campus.slug }))
}

interface CampusPageProps {
  params: Promise<{ campus: string }>
}

function getCampusPage(slug: string) {
  const campus = getCampus(slug)
  if (!campus) return undefined
  return pages[`campus-${campus.slug}` as PageSlug]
}

export async function generateMetadata({ params }: CampusPageProps): Promise<Metadata> {
  const page = getCampusPage((await params).campus)
  return page ? placeholderMetadata(page) : {}
}

export default async function CampusPage({ params }: CampusPageProps) {
  const page = getCampusPage((await params).campus)
  if (!page) notFound()
  return <PlaceholderPage page={page} />
}
