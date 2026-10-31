'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { StaffUser } from '@/lib/session'

import { isActive, screens, type NavCounts } from './screens'
import { UserRow } from './user-row'

/*
 * From 1024px: a Mac-style sidebar. White, one hairline against the page, rows of 34px with a
 * 16px outline icon. The selected screen is a grey rounded fill with its icon in the tint; counts
 * are plain grey numbers, as in Mail.
 */
const row = 'flex h-[34px] items-center gap-2.5 rounded-lg px-2 text-[15px] transition-colors duration-150'

export function Sidebar({
  counts,
  tools,
  user,
}: {
  counts: NavCounts
  tools: { label: string; href: string }[]
  user: StaffUser
}) {
  const pathname = usePathname()

  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-separator bg-card px-3 pt-6 pb-4 lg:flex">
      <Link href="/" className="mx-2 block w-fit rounded-lg" aria-label="Espace personnel, accueil">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-ebm-horizontal.svg" alt="" width={148} height={30} className="h-[30px] w-auto" />
      </Link>

      <nav aria-label="Espace personnel" className="mt-7">
        <ul role="list" className="grid gap-px">
          {screens.map(({ href, label, icon: Icon, count, noun }) => {
            const active = isActive(href, pathname)
            const value = count ? counts[count] : 0
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`${row} ${active ? 'bg-fill font-medium' : 'hover:bg-hover'}`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className={`size-4 shrink-0 ${active ? 'text-accent' : 'text-secondary'}`}
                  />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  {value > 0 ? (
                    <span className="num text-foot text-secondary">
                      {value}
                      <span className="sr-only"> {noun}</span>
                    </span>
                  ) : null}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <p id="sidebar-tools" className="mt-7 px-2 text-[11px] leading-[14px] font-semibold text-secondary">
        Outils
      </p>
      <ul role="list" aria-labelledby="sidebar-tools" className="mt-1.5 grid gap-px">
        {tools.map((tool) => (
          <li key={tool.href}>
            <a href={tool.href} target="_blank" rel="noopener noreferrer" className={`${row} group hover:bg-hover`}>
              <span className="min-w-0 flex-1 truncate">{tool.label}</span>
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-3.5 shrink-0 text-secondary opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <UserRow user={user} />
      </div>
    </aside>
  )
}
