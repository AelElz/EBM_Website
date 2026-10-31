
import { CmsAnchor } from '@/cms/link'
import { getCampuses } from '@/cms/campuses'
import { getCmsContent } from '@/cms/server'
import { ArrowUpRight } from 'lucide-react'
import Image from '@/cms/image'
import type { ReactNode, SVGProps } from 'react'

import { footerNav as defaultFooterNav, legalLinks as defaultLegalLinks, site as defaultSite, type Email } from '@/content/site'
import { Container } from '@/components/ui/container'
import { SmartLink } from '@/components/ui/smart-link'

/*
 * Shared footer (docs/HOME-SPEC.md, home section 9). Server Component, no props.
 * Paper ground: brand column, two link columns (footerNav), two campus columns (campusList),
 * then a charcoal bar with the partners' logos, copyright and legal links.
 * Grid: 1 column on phones, 2 from 640px (brand spans both), 4 from 1024px (brand on its own
 * row: five columns squeezed the links and broke the e-mails at 1024px), 5 from 1280px. The
 * 5-column template gives the campus columns a little more room, and e-mail addresses may
 * still break before "@" (<wbr>) so nothing can overflow.
 */

/** Footer headings are h2 for structure but set in Avenir 700 15px, not Playfair. */
const headingClass = 'font-sans text-[15px] leading-snug font-bold tracking-normal text-charcoal'

/** Footer list links: no underline at rest (clearly a link list), terracotta-ink on hover. */
const navLinkClass =
  'underline-offset-[3px] transition-colors hover:text-terracotta-ink hover:underline'

/** Inline contact links (tel:, mailto:): a quiet underline so they read as links. */
const contactLinkClass =
  'underline decoration-charcoal/30 underline-offset-[3px] transition-colors hover:text-terracotta-ink hover:decoration-current'

/** Instagram glyph drawn in the site's 1.5px stroke style (lucide v1 ships no brand icons). */
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Keeps the trailing icon on the same line as the label's last word. */
function withTrailingIcon(label: string, icon: ReactNode) {
  const cut = label.lastIndexOf(' ') + 1
  return (
    <>
      {label.slice(0, cut)}
      <span className="whitespace-nowrap">
        {label.slice(cut)}
        {icon}
      </span>
    </>
  )
}

/** mailto: link that may wrap before the "@" in narrow columns. */
function EmailLink({ email }: { email: Email }) {
  const at = email.address.indexOf('@')
  return (
    <CmsAnchor href={email.href} className={contactLinkClass}>
      {email.address.slice(0, at)}
      <wbr />
      {email.address.slice(at)}
    </CmsAnchor>
  )
}

export async function Footer() {
  const site = await getCmsContent('site', defaultSite)
  const [footerNav, legalLinks, campuses] = await Promise.all([getCmsContent('footerNav', defaultFooterNav), getCmsContent('legalLinks', defaultLegalLinks), getCampuses()])
  const cmsCampusList = campuses.map(campus => ({ slug: campus.slug, name: campus.title, address: { lines: campus.address }, phone: campus.contacts[0]?.phones[0], emails: campus.contacts.map(service => ({ address: service.email, href: `mailto:${service.email}` })) }))
  const logo = site.logos.stacked

  return (
    <footer className="bg-paper text-charcoal">
      <Container className="grid grid-cols-1 gap-x-8 gap-y-10 pt-[clamp(64px,7vw,88px)] pb-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)_minmax(0,0.95fr)_minmax(0,1.2fr)_minmax(0,1.05fr)] xl:gap-x-10">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4 xl:col-span-1">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            unoptimized
            className="block h-16 w-auto"
          />
          <p className="mt-[18px] max-w-[34ch] text-sm text-ink-soft">{site.statement}</p>
          <SmartLink
            href={site.instagram.url}
            external
            className="mt-[18px] inline-flex min-h-6 items-center gap-2 text-sm font-bold underline-offset-[3px] transition-colors hover:text-terracotta-ink hover:underline"
          >
            <InstagramIcon className="size-[18px] shrink-0" />
            <span className="sr-only">Instagram </span>
            {site.instagram.handle}
          </SmartLink>
        </div>

        {/* Accès rapides, L’école */}
        {footerNav.map((column, index) => {
          const headingId = `footer-nav-${index}`
          return (
            <nav key={column.title} aria-labelledby={headingId}>
              <h2 id={headingId} className={headingClass}>
                {column.title}
              </h2>
              <ul className="mt-3.5 grid gap-2 text-[15px] leading-6">
                {column.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <SmartLink href={link.href} external={link.external} className={navLinkClass}>
                      {link.external
                        ? withTrailingIcon(
                            link.label,
                            <ArrowUpRight
                              aria-hidden="true"
                              className="ml-1 inline size-3.5 align-[-0.1em]"
                              strokeWidth={1.5}
                            />,
                          )
                        : link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          )
        })}

        {/* Campus de Casablanca, Campus de Rabat */}
        {cmsCampusList.map((campus) => (
          <div key={campus.slug}>
            <h2 className={headingClass}>{campus.name}</h2>
            <address className="mt-3.5 text-sm leading-6 not-italic">
              <p className="text-ink-soft">
                {campus.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <ul className="mt-2.5 grid gap-1">
                <li>
                  {campus.phone && <CmsAnchor href={campus.phone.href} className={`${contactLinkClass} whitespace-nowrap`}>
                    <span className="sr-only">Téléphone{' '}: </span>
                    {campus.phone.display}
                  </CmsAnchor>}
                </li>
                {campus.emails.map((email) => (
                  <li key={email.address}>
                    <EmailLink email={email} />
                  </li>
                ))}
              </ul>
            </address>
          </div>
        ))}
      </Container>

      {/* Bottom bar */}
      <div className="bg-charcoal text-[13px] leading-5 text-white/82">
        <Container className="flex flex-col items-start gap-x-10 gap-y-5 py-[26px] md:flex-row md:flex-wrap md:items-center md:justify-between">
          <Image
            src={site.partners.src}
            alt={site.partners.alt}
            width={site.partners.width}
            height={site.partners.height}
            sizes="222px"
            className="block h-11 w-auto"
          />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© 2026 {site.name}</p>
            <nav aria-label="Informations légales">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <SmartLink
                      href={link.href}
                      className="inline-flex min-h-6 items-center underline decoration-white/40 underline-offset-[3px] transition-colors hover:text-white hover:decoration-white focus-visible:outline-white"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </footer>
  )
}
