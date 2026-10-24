import { navigation, legalLinks, site } from '@/content/site'
import type { LinkItem } from '@/content/types'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import { PageHero } from '@/components/site/page-hero'
import { Container } from '@/components/ui/container'
import { SmartLink } from '@/components/ui/smart-link'

export const metadata = pageMetadata({
  title: 'Plan du site',
  description: 'Toutes les pages du site des Écoles Belges au Maroc, regroupées comme dans le menu.',
  path: routes.planDuSite,
})

interface SitemapGroup {
  title: string
  links: LinkItem[]
}

const groups: SitemapGroup[] = [
  { title: 'Accueil', links: [{ label: 'Page d’accueil', href: routes.home }] },
  ...navigation.map((group) => ({ title: group.label, links: group.items })),
  {
    title: 'Informations',
    links: [
      { label: 'Réserver une visite', href: routes.reserverVisite },
      { label: 'Recrutement', href: routes.recrutement },
      { label: 'Recherche', href: routes.recherche },
      ...legalLinks,
    ],
  },
  {
    title: 'En ligne',
    links: [
      { label: `Parents · ${site.eduka.label}`, href: routes.espaceEduka },
      { label: `Instagram ${site.instagram.handle}`, href: site.instagram.url, external: true },
    ],
  },
]

export default function PlanDuSitePage() {
  return (
    <>
      <PageHero
        title="Plan du site"
        intro="Toutes les pages du site, regroupées comme dans le menu."
      />
      <section aria-label="Pages du site" className="py-[clamp(64px,8vw,112px)]">
        <Container className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-h3 font-semibold">{group.title}</h2>
              <ul className="mt-4 divide-y divide-hairline border-t border-hairline">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.href}`}>
                    <SmartLink
                      href={link.href}
                      external={link.external}
                      className="flex min-h-12 items-center py-2 transition-colors hover:text-terracotta-ink hover:underline"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}
