import { cn } from '@/lib/utils'

/*
 * Mixed headings of the home scroll sections (Ayoub's 23 Oct mock-ups, after korowa.vic.edu.au):
 * Avenir Next semibold for the sentence, Playfair Display italic for a few accent words.
 *
 * Content marks the accent words with asterisks ("Apprendre *ici*, réussir *partout*"), so the
 * copy stays one plain string, ready for a Payload text field. Splitting on "*" puts every
 * accent word at an odd index. Server-safe, no hooks.
 */
export function Emphasis({ text, accentClassName }: { text: string; accentClassName?: string }) {
  return text.split('*').map((part, index) =>
    index % 2 === 1 ? (
      <em
        key={index}
        className={cn('font-accent text-[1.06em] font-normal tracking-[-0.01em] italic', accentClassName)}
      >
        {part}
      </em>
    ) : (
      part
    ),
  )
}

/*
 * The small line above those headings: three touching dots (the rhythm of the E-B-M logo
 * circles, in one colour: the logo colours stay inside the logo) and a short uppercase label.
 * `light` on Fired Clay or photos (white), `dark` on white (clay dots, charcoal text).
 */
export function SectionLabel({ children, tone }: { children: string; tone: 'light' | 'dark' }) {
  const dot = cn('size-[0.8em] rounded-full', tone === 'light' ? 'bg-white' : 'bg-terracotta')

  return (
    <p
      className={cn(
        'inline-flex items-center gap-2.5 text-[clamp(0.8125rem,1.1vw,1rem)] leading-none font-medium tracking-[0.02em] uppercase',
        tone === 'light' ? 'text-white' : 'text-charcoal',
      )}
    >
      <span aria-hidden="true" className="inline-flex [&>span+span]:-ml-[0.12em]">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
      </span>
      {children}
    </p>
  )
}

/*
 * Every section title of the home (25 Oct 2026, the polish pass): one voice for the whole page,
 * Ayoub's mixed style extended from sections 2 to 5 to all of them. Avenir Next semibold at one
 * size (36 to 56px), with the accent words in Playfair italic. The hero and the closing CTA band
 * keep their large Playfair display: they open and close the page.
 *
 * `text` is one string, or one string per line when the break matters.
 */
export const sectionHeadingClass =
  'font-sans text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.04] font-semibold tracking-[-0.025em] text-balance'

export function SectionHeading({
  id,
  text,
  accentClassName = 'text-terracotta',
  className,
}: {
  id: string
  text: string | string[]
  /** Clay on light grounds; a light tint on dark ones. */
  accentClassName?: string
  className?: string
}) {
  return (
    <h2 id={id} className={cn(sectionHeadingClass, className)}>
      {Array.isArray(text)
        ? text.map((line) => (
            <span key={line} className="block">
              <Emphasis text={line} accentClassName={accentClassName} />
            </span>
          ))
        : <Emphasis text={text} accentClassName={accentClassName} />}
    </h2>
  )
}
