import type { Metadata } from 'next'
import { Search } from 'lucide-react'

import { InnerHero, LinkList, PageSection, TextBlock } from '@/components/inner/blocks'
import { Button } from '@/components/ui/button'
import { migrationPages } from '@/content/migration/route-registry'
import { searchSite } from '@/content/search'

export const metadata: Metadata = { title: 'Recherche', description: 'Rechercher dans les pages et questions fréquentes des Écoles Belges au Maroc.', alternates: { canonical: '/recherche' }, robots: { index: false, follow: true } }

export default async function RecherchePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const raw = Array.isArray(params.q) ? params.q[0] : params.q
  const query = (raw ?? '').trim().slice(0, 120)
  const results = query ? searchSite(query, 24) : []
  return <>
    <InnerHero title="Recherche" intro={query ? `Résultats pour « ${query} ».` : 'Retrouvez une page, une démarche ou la réponse à une question.'} />
    <PageSection title="Rechercher sur le site">
      <form action="/recherche" method="get" role="search" className="mb-10 flex max-w-[44rem] flex-wrap gap-3">
        <label htmlFor="search-page-query" className="sr-only">Votre recherche</label>
        <div className="flex min-w-0 flex-1 items-center gap-3 bg-paper px-4">
          <Search aria-hidden="true" size={20} strokeWidth={1.5} />
          <input id="search-page-query" name="q" type="search" defaultValue={query} placeholder="Ex. langues, frais, documents…" autoComplete="off" enterKeyHint="search" maxLength={120} className="h-[52px] min-w-0 flex-1 bg-transparent text-base" />
        </div>
        <Button type="submit" size="lg">Rechercher</Button>
      </form>
      {query ? <>
        <p className="mb-6 text-base" role="status">{results.length ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : 'Aucun résultat pour cette recherche.'}</p>
        {results.length ? <LinkList items={results.map(result => ({ label: result.title, href: result.href, description: result.text, external: result.external }))} /> : <><TextBlock paragraphs={['Essayez un mot plus court ou un autre terme. Vous pouvez aussi contacter directement le campus.']} /><LinkList items={[{label:'Questions fréquentes',href:'/admissions#faq'},{label:'Contacter les EBM',href:'/contact'}]} /></>}
      </> : <LinkList items={migrationPages.map(page => ({ label: page.title, href: page.route, description: page.description }))} />}
    </PageSection>
  </>
}
