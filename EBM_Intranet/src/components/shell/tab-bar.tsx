'use client'

import { ArrowUpRight, ChevronRight, Ellipsis, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

import { SIGN_OUT_URL, type StaffUser } from '@/lib/session'

import { Avatar } from './avatar'
import { isActive, screens, type NavCounts } from './screens'

/*
 * Phones and tablets (below 1024px): an iOS tab bar at the bottom, in reach of the thumb. Four
 * screens and "Plus", which opens a sheet with the rest: Documents, Annuaire, the tools and the
 * account. The bar is the one translucent surface of the app (chrome, never content). The sheet
 * is a native <dialog>: focus trap, Escape and the inert page come with it.
 */
export function TabBar({
  counts,
  tools,
  user,
}: {
  counts: NavCounts
  tools: { label: string; href: string }[]
  user: StaffUser
}) {
  const pathname = usePathname()
  const sheet = useRef<HTMLDialogElement>(null)
  const sheetTitle = useRef<HTMLHeadingElement>(null)
  const more = screens.filter((s) => !s.tab)
  const moreActive = more.some((s) => isActive(s.href, pathname))

  return (
    <>
      <nav
        aria-label="Espace personnel"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-separator bg-[#f9f9fb]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 lg:hidden"
      >
        <ul role="list" className="mx-auto grid h-[49px] max-w-xl grid-cols-5">
          {screens
            .filter((s) => s.tab)
            .map(({ href, label, icon: Icon, count, noun }) => {
              const active = isActive(href, pathname)
              const value = count ? counts[count] : 0
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-full flex-col items-center justify-center gap-0.5 ${active ? 'text-accent' : 'text-secondary'}`}
                  >
                    <span className="relative">
                      <Icon aria-hidden="true" strokeWidth={active ? 2 : 1.75} className="size-6" />
                      {value > 0 ? (
                        <span className="num absolute -top-1 -right-2.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[11px] leading-none font-semibold text-white">
                          {value}
                          <span className="sr-only"> {noun}</span>
                        </span>
                      ) : null}
                    </span>
                    <span className="max-w-full truncate px-0.5 text-tab font-medium">{label}</span>
                  </Link>
                </li>
              )
            })}
          <li>
            <button
              type="button"
              onClick={() => {
                sheet.current?.showModal()
                sheetTitle.current?.focus()
              }}
              className={`flex h-full w-full flex-col items-center justify-center gap-0.5 ${moreActive ? 'text-accent' : 'text-secondary'}`}
            >
              <Ellipsis aria-hidden="true" strokeWidth={1.75} className="size-6" />
              <span className="text-tab font-medium">Plus</span>
            </button>
          </li>
        </ul>
      </nav>

      <dialog
        ref={sheet}
        aria-labelledby="sheet-title"
        onClick={(event) => {
          // A link inside closes the sheet; so does a tap on the dimmed page around it.
          if ((event.target as HTMLElement).closest('a') || event.target === sheet.current) sheet.current?.close()
        }}
        className="sheet fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none overflow-y-auto rounded-t-[14px] bg-page p-0 text-label backdrop:bg-black/30 lg:hidden"
      >
        <div className="px-4 pt-2 pb-[calc(env(safe-area-inset-bottom)+24px)]">
          <span aria-hidden="true" className="mx-auto block h-[5px] w-9 rounded-full bg-[#c7c7cc]" />
          <div className="relative mt-2 flex h-11 items-center justify-center">
            <h2 id="sheet-title" ref={sheetTitle} tabIndex={-1} className="text-[17px] font-semibold outline-none">
              Plus
            </h2>
            <button
              type="button"
              onClick={() => sheet.current?.close()}
              className="absolute right-0 h-11 px-1 text-[17px] font-semibold text-accent-text"
            >
              OK
            </button>
          </div>

          <ul role="list" className="rows mt-3 overflow-hidden rounded-card bg-card [--separator-inset:52px]">
            {more.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="flex min-h-11 items-center gap-3 px-4 py-2.5 active:bg-fill">
                  <Icon aria-hidden="true" strokeWidth={1.75} className="size-5 text-accent" />
                  <span className="flex-1 text-[17px]">{label}</span>
                  <ChevronRight aria-hidden="true" strokeWidth={2} className="size-4 text-chevron" />
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 px-4 text-foot text-secondary">Outils</p>
          <ul role="list" className="rows mt-1.5 overflow-hidden rounded-card bg-card">
            {tools.map((tool) => (
              <li key={tool.href}>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 px-4 py-2.5 active:bg-fill"
                >
                  <span className="flex-1 text-[17px]">{tool.label}</span>
                  <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4 text-chevron" />
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>

          <ul role="list" className="rows mt-6 overflow-hidden rounded-card bg-card [--separator-inset:16px]">
            <li className="flex items-center gap-3 px-4 py-3">
              <Avatar name={user.name} image={user.image} size={40} />
              <span className="min-w-0">
                <span className="block truncate text-[17px] font-medium">{user.name}</span>
                <span className="block truncate text-foot text-secondary">{user.email}</span>
              </span>
            </li>
            <li>
              <a href={SIGN_OUT_URL} className="flex min-h-11 items-center gap-3 px-4 py-2.5 text-[17px] text-accent-text active:bg-fill">
                <LogOut aria-hidden="true" strokeWidth={1.75} className="size-5" />
                Se déconnecter
              </a>
            </li>
          </ul>
        </div>
      </dialog>
    </>
  )
}
