import { ArrowRight, ArrowUpRight, CircleDashed } from 'lucide-react'

import { contactLinks } from '@/content/site'
import type { LinkItem } from '@/content/types'
import { Container } from '@/components/ui/container'
import { SmartLink } from '@/components/ui/smart-link'

export interface PlaceholderNoticeProps {
  /** Sections the finished page will hold. */
  planned: string[]
  /** Real, working links under "En attendant" (defaults to the two campus phone numbers + Instagram). */
  links?: LinkItem[]
  /** Heading of the notice (h2). */
  title?: string
  /** Sentence under the heading. */
  text?: string
  /** Heading of the planned-sections panel (h3). */
  plannedTitle?: string
  /** Optional id on the section, e.g. "faq" so /admissions/comprendre#faq lands here. */
  id?: string
}

/**
 * Honest placeholder: says clearly that the page is being prepared and lists what it will
 * contain. Never presents planned content as available.
 */
export function PlaceholderNotice({
  planned,
  links = contactLinks,
  title = 'Page en préparation',
  text = 'Nous rédigeons cette page avec les équipes des Écoles Belges au Maroc. Elle sera publiée dès que son contenu aura été validé.',
  plannedTitle = 'Sections prévues',
  id,
}: PlaceholderNoticeProps) {
  return (
    <section id={id} aria-labelledby="placeholder-title" className="py-[clamp(64px,8vw,112px)]">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <h2 id="placeholder-title" className="font-display text-h2 font-semibold">
            {title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-lead text-ink-soft">{text}</p>

          {links.length > 0 ? (
            <div className="mt-10">
              <h3 className="text-base font-bold">En attendant</h3>
              <ul className="mt-3 grid gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      external={link.external}
                      className="inline-flex min-h-11 items-center gap-2 font-semibold text-terracotta-ink underline decoration-terracotta-ink/40 transition-colors hover:decoration-terracotta-ink"
                    >
                      {link.label}
                      {link.external ? (
                        <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                      ) : (
                        <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                      )}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="self-start bg-white p-[clamp(24px,4vw,48px)] shadow-card">
          <h3 className="text-[17px] font-bold">{plannedTitle}</h3>
          <ul className="mt-4 divide-y divide-hairline">
            {planned.map((item) => (
              <li key={item} className="flex items-start gap-4 py-4 text-[17px] leading-snug">
                <CircleDashed
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-terracotta"
                  strokeWidth={1.5}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
