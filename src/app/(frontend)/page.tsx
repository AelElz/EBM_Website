import { getCmsContent } from '@/cms/server'
import type { Metadata } from 'next'

import { home } from '@/content/home'
import { baseOpenGraph, ogImage } from '@/lib/metadata'
import { homeJsonLd, serializeJsonLd } from '@/lib/structured-data'
import { About } from '@/components/home/about'
import { AdmissionsPath } from '@/components/home/admissions-path'
import { AnchorageBand } from '@/components/home/bands/anchorage-band'
import { PartnersMarquee } from '@/components/home/partners-marquee'
import { NetworkBand } from '@/components/home/bands/network-band'
import { PathBand } from '@/components/home/bands/path-band'
import { PedagogyBand } from '@/components/home/bands/pedagogy-band'
import { ValuesBand } from '@/components/home/bands/values-band'
import { Alumni } from '@/components/home/alumni'
import { CampusChapters } from '@/components/home/campus-chapters'
import { DirectorLetter } from '@/components/home/director-letter'
import { Faq } from '@/components/home/faq'
import { Guarantee } from '@/components/home/guarantee'
import { Hero } from '@/components/home/hero'
import { Highlights } from '@/components/home/highlights'
import { Instagram } from '@/components/home/instagram'
import { CtaBand } from '@/components/site/cta-band'

export async function generateMetadata(): Promise<Metadata> {
  const { seo: { title, description } } = await getCmsContent('home', home)
  return { title: { absolute: title }, description, alternates: { canonical: '/' }, openGraph: { ...baseOpenGraph, title, description, url: '/', images: [ogImage] } }
}

/*
 * Home page (docs/HOME-SPEC.md, "Home page sections"): 1 hero + highlights panel, then the five
 * bands of Ayoub's board (Bandeaux_website.ai, 29 Oct 2026; components/home/bands/): 2 values,
 * 3 the network and its figures, 4 the institutional anchorage, 5 the pedagogy, 6 the school
 * path; then 7 the Belgian certificate path, 8 the "experience" scroll scene, 9 alumni card deck,
 * 10 the two campus chapters, 11 the network director's letter, 12 the admission path, 13 large
 * video then expandable FAQ, 14 actualités, 15 CTA band, then the footer (from the layout, with
 * the header). The scene ends on the diploma ceremony at full screen,
 * which leads into the alumni stories: keep <About /> and <Alumni /> next to each other.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd()) }}
      />
      <Hero />
      <Highlights />
      <ValuesBand />
      <NetworkBand />
      <AnchorageBand />
      <PartnersMarquee />
      <PedagogyBand />
      <PathBand />
      <Guarantee />
      <About />
      <Alumni />
      <CampusChapters />
      <DirectorLetter />
      <AdmissionsPath />
      <Faq />
      <Instagram />
      <CtaBand />
    </>
  )
}
