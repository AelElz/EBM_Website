'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from 'react'

import { fold, queryWords, searchSite, searchSuggestions, type SearchEntry } from '@/content/search'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { SectionLabel } from '@/components/home/emphasis'
import { Container } from '@/components/ui/container'

import styles from './search-overlay.module.css'

/*
 * Search overlay, opened by "Rechercher" in the header (search-trigger.tsx loads this chunk on
 * demand, so none of it is in the first-load JavaScript). A Radix Dialog: focus moves to the
 * field, stays inside, Escape / the close button / the dimmed page close it, focus returns to
 * the trigger. Animations: search-overlay.module.css.
 *
 * Live results come from src/content/search.ts (page titles, purposes and common words; no
 * full-text search yet). Enter opens the first result, or the search page when nothing
 * matches; ArrowDown goes from the field into the results, ArrowUp/ArrowDown move through them.
 */

export interface SearchOverlayProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** The header link: focus returns to it when the overlay closes. */
  triggerRef: RefObject<HTMLAnchorElement | null>
}

/** The title with the query's words underlined where a word of the title starts with them. */
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = queryWords(query)
  const folded = fold(text)
  const marked: boolean[] = Array.from(text, () => false)
  for (const word of folded.matchAll(/[a-z0-9]+/g)) {
    for (const term of terms) {
      if (!word[0].startsWith(term)) continue
      for (let i = word.index; i < word.index + term.length; i++) marked[i] = true
    }
  }

  const parts = []
  let start = 0
  for (let i = 1; i <= text.length; i++) {
    if (i < text.length && marked[i] === marked[start]) continue
    const part = text.slice(start, i)
    parts.push(
      marked[start] ? (
        <mark key={start} className={styles.hit}>
          {part}
        </mark>
      ) : (
        part
      ),
    )
    start = i
  }
  return parts
}

const rowClass =
  'flex items-center gap-4 border-b border-white/25 px-2 py-4 transition-colors duration-200 hover:bg-white/10 ' +
  'focus-visible:bg-white/10 focus-visible:outline-white focus-visible:-outline-offset-2 sm:px-3'

function ResultLink({ entry, query, onNavigate }: { entry: SearchEntry; query: string; onNavigate: () => void }) {
  const content = (
    <>
      <span className="min-w-0 flex-1">
        {entry.section ? <span className="block text-[13px] font-medium">{entry.section}</span> : null}
        <span className="block text-[clamp(1.25rem,2vw,1.625rem)] leading-snug font-semibold">
          <Highlight text={entry.title} query={query} />
        </span>
        <span className="mt-0.5 block text-[15px] leading-[1.45]">{entry.text}</span>
      </span>
      {entry.external ? (
        <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0" />
      ) : (
        <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0" />
      )}
    </>
  )

  return entry.external ? (
    <a href={entry.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={rowClass}>
      {content}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  ) : (
    <Link href={entry.href} onClick={onNavigate} className={rowClass}>
      {content}
    </Link>
  )
}

export function SearchOverlay({ open, onOpenChange, triggerRef }: SearchOverlayProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const results = useMemo(() => searchSite(query), [query])
  const typed = query.trim()
  const close = () => onOpenChange(false)

  // Every opening starts fresh, on the frequent searches.
  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!typed) return
    const [first] = results
    close()
    if (first?.external) window.open(first.href, '_blank', 'noopener,noreferrer')
    else router.push(first ? first.href : `${routes.recherche}?q=${encodeURIComponent(typed)}`)
  }

  const links = () => Array.from(listRef.current?.querySelectorAll('a') ?? [])

  const onFieldKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowDown' || !results.length) return
    event.preventDefault()
    links()[0]?.focus()
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const all = links()
    const at = all.indexOf(document.activeElement as HTMLAnchorElement)
    const next = at + (event.key === 'ArrowDown' ? 1 : -1)
    if (next < 0) inputRef.current?.focus()
    else all[Math.min(next, all.length - 1)]?.focus()
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.scrim} />
        <Dialog.Content
          className={styles.panel}
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            inputRef.current?.focus()
          }}
          onCloseAutoFocus={(event) => {
            // No Radix Trigger (the link lives outside this lazy chunk): restore focus by hand.
            event.preventDefault()
            triggerRef.current?.focus()
          }}
        >
          <Dialog.Title className="sr-only">Rechercher sur le site</Dialog.Title>

          <Container size="wide" className="flex h-16 shrink-0 items-center justify-between gap-4 lg:h-header">
            <SectionLabel tone="light">Rechercher sur le site</SectionLabel>
            <Dialog.Close
              className={cn(
                styles.close,
                'grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border border-white/70 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-terracotta-ink focus-visible:outline-white',
              )}
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
              <span className="sr-only">Fermer la recherche</span>
            </Dialog.Close>
          </Container>

          <Container size="wide" className="flex-1 pt-[clamp(24px,6vh,72px)] pb-14">
            <form role="search" action={routes.recherche} method="get" onSubmit={onSubmit} className="max-w-[64rem]">
              <label htmlFor="search-overlay-q" className="sr-only">
                Rechercher une page du site
              </label>
              <div className="flex items-center gap-2.5 sm:gap-6">
                <span className={cn(styles.icon, 'shrink-0')}>
                  <span key={query} className={cn(styles.nudge, 'block')}>
                    <Search aria-hidden="true" strokeWidth={1.75} className="size-8 sm:size-11" />
                  </span>
                </span>
                <input
                  ref={inputRef}
                  id="search-overlay-q"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={onFieldKeyDown}
                  placeholder="Que cherchez-vous ?"
                  autoComplete="off"
                  enterKeyHint="search"
                  className={cn(
                    styles.field,
                    'h-[1.3em] min-w-0 flex-1 appearance-none bg-transparent text-[clamp(1.375rem,5.4vw,4.5rem)] leading-none font-semibold tracking-[-0.02em] text-white caret-white outline-none placeholder:text-white/80 [&::-webkit-search-cancel-button]:appearance-none',
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    styles.icon,
                    'grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-white/70 transition-colors duration-200 hover:border-white hover:bg-white hover:text-terracotta-ink focus-visible:outline-white sm:size-12',
                  )}
                >
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-6" />
                  <span className="sr-only">Lancer la recherche</span>
                </button>
              </div>
              <div aria-hidden="true" className={cn(styles.line, 'mt-3 sm:mt-4')} />
            </form>

            {typed ? (
              <div className="mt-8 max-w-[64rem]">
                <p aria-live="polite" className="text-sm font-semibold">
                  {results.length
                    ? `${results.length} ${results.length > 1 ? 'pages trouvées' : 'page trouvée'}`
                    : `Aucune page ne correspond à « ${typed} ».`}
                </p>
                {results.length ? (
                  <>
                    <ul ref={listRef} role="list" onKeyDown={onListKeyDown} className="mt-4 border-t border-white/25">
                      {results.map((entry, i) => (
                        <li key={entry.href} className={styles.result} style={{ '--i': i } as CSSProperties}>
                          <ResultLink entry={entry} query={query} onNavigate={close} />
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 hidden text-sm sm:block">
                      Entrée pour ouvrir « {results[0].title} »
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-[15px] leading-[1.5]">
                    Essayez « admissions », « frais » ou « calendrier », ou{' '}
                    <Link
                      href={`${routes.recherche}?q=${encodeURIComponent(typed)}`}
                      onClick={close}
                      className="font-semibold underline underline-offset-4 focus-visible:outline-white"
                    >
                      ouvrez la page de recherche
                    </Link>
                    .
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-10">
                <p className={cn(styles.suggestion, 'text-sm font-semibold')}>Recherches fréquentes</p>
                <ul role="list" className="mt-4 flex flex-wrap gap-2.5">
                  {searchSuggestions.map((suggestion, i) => (
                    <li key={suggestion} className={styles.suggestion} style={{ '--i': i + 1 } as CSSProperties}>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(suggestion)
                          inputRef.current?.focus()
                        }}
                        className="h-11 cursor-pointer rounded-ui border border-white/70 px-4 text-[15px] font-semibold transition-colors duration-200 hover:border-white hover:bg-white hover:text-terracotta-ink focus-visible:outline-white"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
