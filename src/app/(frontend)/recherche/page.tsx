import type { Metadata } from 'next'
import { Search } from 'lucide-react'

import { navigation, site } from '@/content/site'
import type { LinkItem } from '@/content/types'
import { routes } from '@/lib/routes'
import { PageHero } from '@/components/site/page-hero'
import { PlaceholderNotice } from '@/components/site/placeholder-notice'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

/*
 * Search results page (placeholder). The header search field submits here (?q=).
 * Real search comes with Payload's Search plugin (published pages + FAQ answers, docs/BRIEF.md).
 * Reading searchParams makes this route dynamic; it renders no client JS.
 */
export const metadata: Metadata = {
  title: 'Recherche',
  description: 'Rechercher une page du site des Écoles Belges au Maroc.',
  alternates: { canonical: routes.recherche },
  robots: { index: false, follow: true },
}

interface RecherchePageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const mainLinks: LinkItem[] = [
  ...navigation.map((group) => ({ label: group.items[0].label, href: group.href })),
  { label: 'Calendrier & visites', href: routes.calendrier },
  { label: 'Contact', href: routes.contact },
]

export default async function RecherchePage({ searchParams }: RecherchePageProps) {
  const params = await searchParams
  const raw = Array.isArray(params.q) ? params.q[0] : params.q
  const query = (raw ?? '').trim().slice(0, 120)

  return (
    <>
      <PageHero
        title="Recherche"
        intro={
          query
            ? `Vous avez cherché « ${query} ».`
            : `Rechercher une page du site des ${site.name}.`
        }
      />

      <section aria-label="Formulaire de recherche" className="pt-[clamp(48px,6vw,72px)]">
        <Container>
          <form action={routes.recherche} method="get" role="search" className="flex max-w-[600px] gap-3">
            <label htmlFor="recherche-q" className="sr-only">
              Rechercher sur le site
            </label>
            <div className="flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-ui bg-paper px-4">
              <Search aria-hidden="true" className="size-5 shrink-0 text-ink-soft" strokeWidth={1.5} />
              <input
                id="recherche-q"
                name="q"
                type="search"
                defaultValue={query}
                placeholder={site.actions.search.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                className="h-full min-w-0 flex-1 bg-transparent text-base outline-none"
              />
            </div>
            <Button type="submit" size="lg">
              Rechercher
            </Button>
          </form>
        </Container>
      </section>

      <PlaceholderNotice
        title="Recherche en préparation"
        text="La recherche dans les pages du site et les questions fréquentes arrivera avec la publication des contenus. En attendant, voici les pages principales."
        plannedTitle="Ce que la recherche couvrira"
        planned={['Toutes les pages publiées du site', 'Les réponses aux questions fréquentes']}
        links={mainLinks}
      />
    </>
  )
}
