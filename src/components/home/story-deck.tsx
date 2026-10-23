'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Children,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'

import styles from './alumni.module.css'

/*
 * The alumni card deck (alumni.tsx): the only client part of section 3. The cards are server
 * HTML passed as children; this island only decides where each one sits (alumni.module.css)
 * and handles the controls:
 * - previous / next arrows and one dot per card, under the deck;
 * - a click on a stacked card brings it to the front;
 * - a horizontal drag or swipe of the front card (60px) moves one card; vertical page scroll
 *   stays native (touch-action: pan-y);
 * - left / right arrow keys while focus is on the controls.
 * No loop: the deck stops at both ends, and the arrows say so by turning disabled.
 */

/** Drag distance that turns into a change of card. */
const SWIPE = 60

export function StoryDeck({ label, children }: { label: string; children: ReactNode }) {
  const cards = Children.toArray(children)
  const count = cards.length
  const [index, setIndex] = useState(0)
  /** Horizontal offset of the front card while it is dragged, in px. */
  const [drag, setDrag] = useState(0)
  const start = useRef<number | null>(null)
  /** True once the pointer has moved: the click that ends a drag must not pick a card. */
  const moved = useRef(false)

  const go = (target: number) => setIndex(Math.min(count - 1, Math.max(0, target)))

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    start.current = event.clientX
    moved.current = false
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current === null) return
    const dx = event.clientX - start.current
    if (!moved.current && Math.abs(dx) > 6) {
      moved.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (!moved.current) return
    // Resist at both ends: there is nothing to pull in.
    const atEnd = (dx > 0 && index === 0) || (dx < 0 && index === count - 1)
    setDrag(atEnd ? dx * 0.25 : dx)
  }

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (start.current === null) return
    const dx = event.clientX - start.current
    start.current = null
    setDrag(0)
    if (moved.current && dx <= -SWIPE) go(index + 1)
    else if (moved.current && dx >= SWIPE) go(index - 1)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') go(index + 1)
    else if (event.key === 'ArrowLeft') go(index - 1)
    else return
    event.preventDefault()
  }

  return (
    <div role="region" aria-roledescription="carrousel" aria-label={label}>
      <div
        className={styles.deck}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        {cards.map((card, i) => {
          const d = i - index
          const place = d === 0 ? 'front' : d < 0 ? 'gone' : d <= 2 ? 'behind' : 'waiting'
          const dragging = d === 0 && drag !== 0
          const style = {
            '--d': d,
            zIndex: count - Math.abs(d),
            transform: dragging ? `translateX(${drag}px) rotate(${drag * 0.02}deg)` : undefined,
          } as CSSProperties

          return (
            <div
              key={i}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
              aria-hidden={d === 0 ? undefined : true}
              data-place={place}
              data-dragging={dragging || undefined}
              className={styles.slot}
              style={style}
              onClick={place === 'behind' ? () => !moved.current && go(i) : undefined}
            >
              {card}
            </div>
          )
        })}
      </div>

      <div className="mt-9 flex items-center justify-center gap-3" onKeyDown={onKeyDown}>
        <button
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-ui text-charcoal transition-colors duration-200 hover:bg-paper disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          aria-label="Témoignage précédent"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.5} absoluteStrokeWidth />
        </button>
        <div className="flex items-center">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              className="group inline-flex size-6 cursor-pointer items-center justify-center"
              aria-label={`Témoignage ${i + 1} sur ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => go(i)}
            >
              <span
                className={`size-2 rounded-full transition-colors duration-200 ${i === index ? 'bg-terracotta' : 'bg-charcoal/20 group-hover:bg-charcoal/45'}`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-ui text-charcoal transition-colors duration-200 hover:bg-paper disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent"
          aria-label="Témoignage suivant"
          disabled={index === count - 1}
          onClick={() => go(index + 1)}
        >
          <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.5} absoluteStrokeWidth />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Témoignage ${index + 1} sur ${count}`}
      </p>
    </div>
  )
}
