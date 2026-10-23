import type { Metadata } from 'next'

import { home } from '@/content/home'
import { site } from '@/content/site'

/** Default Open Graph image: hero slide 1 (2400 x 1600). */
export const ogImage = {
  url: home.hero.slides[0].src,
  width: home.hero.slides[0].width,
  height: home.hero.slides[0].height,
  alt: home.hero.slides[0].alt,
}

/** Shared Open Graph fields. A page's `openGraph` replaces the layout's, so always spread this. */
export const baseOpenGraph = {
  type: 'website',
  locale: site.locale,
  siteName: site.name,
  images: [ogImage],
} satisfies NonNullable<Metadata['openGraph']>

interface PageMetadataInput {
  /** Page title; the layout template adds " · Écoles Belges au Maroc". */
  title: string
  description: string
  /** Route path, used for the canonical URL (resolved against metadataBase). */
  path: string
  /** false for placeholder pages (noindex, follow) until their content is real. */
  index?: boolean
}

export function pageMetadata({ title, description, path, index = true }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      ...baseOpenGraph,
      title: `${title} · ${site.name}`,
      description,
      url: path,
    },
  }
}
