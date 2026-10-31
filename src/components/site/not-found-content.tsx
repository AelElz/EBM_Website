import { ArrowRight } from 'lucide-react'
import Link from '@/cms/link'

import { routes } from '@/lib/routes'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const usefulLinks = [
  { label: 'Nos campus', href: routes.campus },
  { label: 'Calendrier & visites', href: routes.calendrier },
  { label: 'Contact', href: routes.contact },
  { label: 'Plan du site', href: routes.planDuSite },
]

/** Designed French 404 body, shared by (frontend)/not-found.tsx and app/global-not-found.tsx. */
export function NotFoundContent() {
  return (
    <section aria-labelledby="not-found-title" className="relative isolate overflow-hidden bg-paper">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="absolute -right-24 -bottom-40 size-[520px] rounded-full border-[1.5px] border-terracotta/35" />
        <div className="absolute right-48 bottom-24 size-[240px] rounded-full border-[1.5px] border-olive/40" />
      </div>
      <Container className="py-section">
        <h1 id="not-found-title" className="max-w-[13em] font-display text-h1 font-semibold">
          Cette page est introuvable
        </h1>
        <p className="mt-5 max-w-[52ch] text-lead text-ink-soft">
          L’adresse est peut-être incomplète, ou la page a été déplacée. Reprenez depuis l’accueil
          ou consultez les admissions.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={routes.home} size="lg">
            Retour à l’accueil
          </ButtonLink>
          <ButtonLink href={routes.admissions} size="lg" variant="outline-dark">
            Voir les admissions
          </ButtonLink>
        </div>
        <nav aria-label="Pages utiles" className="mt-14">
          <h2 className="font-sans text-base font-bold tracking-normal">Pages utiles</h2>
          <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-1">
            {usefulLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta-ink underline decoration-terracotta-ink/40 transition-colors hover:decoration-terracotta-ink"
                >
                  {link.label}
                  <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
