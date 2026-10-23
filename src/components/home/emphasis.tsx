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
