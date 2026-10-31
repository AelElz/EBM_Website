import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

/*
 * Every screen's frame: the large title (34px bold) and one grey line under it, as at the top of
 * an iOS screen. A detail screen gets a back link in the tint above its title instead, like a
 * navigation bar's back button. Lists keep a readable width (760px) on a computer.
 */
export function Page({
  title,
  subtitle,
  back,
  wide = false,
  children,
}: {
  title: string
  subtitle?: ReactNode
  back?: { label: string; href: string }
  /** The home uses the full 1040px for its two columns; lists stay at 760px. */
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className="mx-auto max-w-[1040px] px-4 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+49px+40px)] sm:px-6 lg:px-10 lg:pt-14 lg:pb-16">
      <div className={wide ? '' : 'max-w-[760px]'}>
        {back ? (
          <Link
            href={back.href}
            className="-ml-1.5 mb-2 inline-flex h-11 items-center gap-0.5 text-[17px] text-accent-text hover:opacity-80 lg:h-8 lg:text-[15px]"
          >
            <ChevronLeft aria-hidden="true" strokeWidth={2.25} className="size-5" />
            {back.label}
          </Link>
        ) : null}
        <header>
          <h1 className={back ? 'text-[28px] leading-[34px] font-bold' : 'text-large-title font-bold'}>{title}</h1>
          {subtitle ? <p className="mt-0.5 text-[17px] leading-[22px] text-secondary">{subtitle}</p> : null}
        </header>
        <div className="mt-8 grid grid-cols-1 gap-8">{children}</div>
      </div>
    </div>
  )
}
