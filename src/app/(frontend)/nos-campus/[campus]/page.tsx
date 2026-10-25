import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CampusDetail } from '@/components/inner/campuses/campus-views'
import { getMigratedCampus, migratedCampuses } from '@/content/migration/campuses'
import { pageMetadata } from '@/lib/metadata'

export const dynamicParams = false

export function generateStaticParams() {
  return migratedCampuses.map((campus) => ({ campus: campus.slug }))
}

interface CampusPageProps { params: Promise<{ campus: string }> }

export async function generateMetadata({ params }: CampusPageProps): Promise<Metadata> {
  const campus = getMigratedCampus((await params).campus)
  return campus ? pageMetadata({ title: campus.title, description: campus.intro, path: campus.route, index: false }) : {}
}

export default async function CampusPage({ params }: CampusPageProps) {
  const campus = getMigratedCampus((await params).campus)
  if (!campus) notFound()
  return <CampusDetail campus={campus} />
}
