import type { Metadata } from 'next'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  KeyRound,
  LifeBuoy,
  LockKeyhole,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'

import { espaceEduka, type EdukaHelp } from '@/content/espace-eduka'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { AUTH_TEST_PATH } from '@/features/auth-test/contract'
import { Emphasis, SectionLabel } from '@/components/home/emphasis'
import { ButtonLink } from '@/components/ui/button'

import styles from './espace-eduka.module.css'

/*
 * Espace Eduka (/espace-eduka): the login page in the EBM design, reached from the header's
 * person icon, the phone menu and the footer. The sign-in itself happens on Eduka: the button
 * opens Eduka's sign-in page in the same tab. No Eduka password is collected here (see
 * src/content/espace-eduka.ts for why). Server Component, no client JS; CSS entrance only.
 * A small bottom link opens the separate, clearly labelled EBM frontend prototype.
 * noindex, like other sign-in pages.
 */
export const metadata: Metadata = pageMetadata({
  ...espaceEduka.seo,
  path: routes.espaceEduka,
  index: false,
})

const helpIcons: Record<EdukaHelp['icon'], LucideIcon> = {
  password: KeyRound,
  family: UserPlus,
  help: LifeBuoy,
}

/** Staggered entrance step (espace-eduka.module.css, .step). */
const step = (i: number) => ({ '--i': i }) as CSSProperties

export default function EspaceEdukaPage() {
  const { label, title, text, login, secureNote, help, side } = espaceEduka

  return (
    <section aria-labelledby="eduka-title" className={styles.layout}>
      {/* Sign-in card: first in the DOM (and on phones), right-hand half from 1024px. */}
      <div className={cn(styles.cardSide, 'px-gutter py-[clamp(40px,6vw,72px)] lg:order-2')}>
        <div className={cn(styles.card, 'bg-white p-[clamp(24px,3.2vw,44px)] shadow-card')}>
          <div className={styles.step} style={step(0)}>
            <SectionLabel tone="dark">{label}</SectionLabel>
          </div>
          <h1
            id="eduka-title"
            className={cn(
              styles.step,
              'mt-4 font-sans text-[clamp(2.125rem,3.6vw,3.25rem)] leading-[1.04] font-semibold tracking-[-0.025em]',
            )}
            style={step(1)}
          >
            <Emphasis text={title} accentClassName="text-terracotta" />
          </h1>
          <p className={cn(styles.step, 'mt-5 text-lead text-ink-soft')} style={step(2)}>
            {text}
          </p>

          <div className={cn(styles.step, 'mt-8')} style={step(3)}>
            <ButtonLink href={login.href} size="lg" className="w-full">
              {login.label}
              <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
            </ButtonLink>
          </div>
          <p className={cn(styles.step, 'mt-4 flex items-start gap-2.5 text-sm leading-[1.5] text-ink-soft')} style={step(4)}>
            <LockKeyhole aria-hidden="true" strokeWidth={1.75} className="mt-px size-[18px] shrink-0 text-olive" />
            <span>
              {secureNote} <span className="font-semibold whitespace-nowrap text-charcoal">{site.eduka.host}</span>
            </span>
          </p>

          <ul role="list" className={cn(styles.step, 'mt-8 divide-y divide-hairline border-t border-hairline')} style={step(5)}>
            {help.map((item) => {
              const Icon = helpIcons[item.icon]
              return (
                <li key={item.title} className="flex gap-4 py-4 last:pb-0">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-terracotta" />
                  <div className="min-w-0">
                    <h2 className="font-sans text-[15px] leading-snug font-bold tracking-normal">{item.title}</h2>
                    <p className="mt-1 text-[15px] leading-[1.5] text-ink-soft">{item.text}</p>
                    {item.link ? (
                      <Link
                        href={item.link.href}
                        className="mt-2 inline-flex min-h-6 items-center gap-1.5 text-[15px] font-bold text-terracotta-ink underline-offset-4 transition-colors duration-200 hover:text-charcoal hover:underline"
                      >
                        {item.link.label}
                        <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4 shrink-0" />
                      </Link>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className={styles.testEntry}>
            <p>Un aperçu du futur espace EBM.</p>
            <Link href={AUTH_TEST_PATH}>Tester la connexion<ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </div>
      </div>

      {/* Photo side: under the card on phones, left-hand half from 1024px. */}
      <div className={cn(styles.side, 'lg:order-1')}>
        <Image
          src={side.image.src}
          alt={side.image.alt}
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className={cn(styles.photo, 'object-cover')}
          style={side.image.position ? { objectPosition: side.image.position } : undefined}
        />
        <div aria-hidden="true" className={styles.scrim} />
        <div className={cn(styles.sideText, 'w-full max-w-[38rem] px-gutter py-[clamp(40px,6vw,72px)]')}>
          <SectionLabel tone="light">{side.label}</SectionLabel>
          <h2 className="mt-4 font-sans text-[clamp(1.875rem,3vw,2.875rem)] leading-[1.06] font-semibold tracking-[-0.02em]">
            <Emphasis text={side.title} />
          </h2>
          <ul role="list" className="mt-6 grid gap-3 text-base font-semibold">
            {side.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check aria-hidden="true" strokeWidth={2.2} className="mt-[3px] size-5 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
