import type { Metadata } from 'next'

import { getBreadcrumb, type PlaceholderPageContent } from '@/content/pages'
import { pageMetadata } from '@/lib/metadata'
import { CtaBand } from '@/components/site/cta-band'
import { PageHero } from '@/components/site/page-hero'
import { PlaceholderNotice } from '@/components/site/placeholder-notice'

/** Metadata for a placeholder page: title, intro as description, canonical, noindex. */
export function placeholderMetadata(page: PlaceholderPageContent): Metadata {
  return pageMetadata({ title: page.title, description: page.intro, path: page.route, index: false })
}

export interface PlaceholderPageProps {
  page: PlaceholderPageContent
  /** Optional id on the notice section (e.g. "faq"). */
  noticeId?: string
}

/** Page hero + "Page en préparation" notice + CTA band (header/footer come from the layout). */
export function PlaceholderPage({ page, noticeId }: PlaceholderPageProps) {
  return (
    <>
      <PageHero title={page.title} intro={page.intro} breadcrumb={getBreadcrumb(page)} />
      <PlaceholderNotice planned={page.planned} links={page.links} id={noticeId} />
      <CtaBand />
    </>
  )
}
