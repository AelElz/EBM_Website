import { getCmsContent } from '@/cms/server'
import { homeBands as defaultHomeBands } from '@/content/home-bands'
import { Container } from '@/components/ui/container'

import styles from './bands.module.css'

/*
 * Band 1 of Ayoub's board (Bandeaux_website.ai, 29 Oct 2026), replacing the statement band: the
 * board's three dots, the centred Fired Clay statement, then the three values in
 * columns. Server Component, no client JS.
 *
 * Every word is its own span so the statement lights up line by line as it rises through the
 * screen (scroll-driven, CSS only, bands.module.css). Words start at 30% and never hide: without
 * scroll-driven animations, or with reduced motion, the sentence is simply at full strength.
 *
 * Contrast on Fired Clay: the statement is Riad Paper (4.3:1, large text), the values white (4.8:1).
 */
function LitWords({ text }: { text: string }) {
  return text.split('*').map((part, index) => {
    const words = part.split(/(\s+)/).map((token, i) =>
      /^\s+$/.test(token) || token === '' ? token : (
        <span key={i} className={styles.word}>
          {token}
        </span>
      ),
    )
    return index % 2 === 1 ? (
      <em key={index} className="font-accent text-[1.06em] font-normal tracking-[-0.01em] italic">
        {words}
      </em>
    ) : (
      <span key={index}>{words}</span>
    )
  })
}

export async function ValuesBand() {
  const homeBands = await getCmsContent('homeBands', defaultHomeBands)
  const { title, statement, items } = homeBands.values

  return (
    // White room under the highlights panel, then the band.
    <section aria-labelledby="values-title" className="pt-[clamp(56px,7vw,104px)]">
      <div className="bg-terracotta py-[clamp(64px,6.5vw,96px)] text-white">
        <Container>
          <h2 id="values-title" className="sr-only">
            {title}
          </h2>
          <span aria-hidden="true" className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <p className={styles.statement}>
            <LitWords text={statement} />
          </p>

          <ul role="list" className={styles.values}>
            {items.map((item, index) => (
              <li key={item.title} className={['reveal', 'reveal-2', 'reveal-3'][index]}>
                <h3 className="font-display text-[clamp(1.625rem,2.2vw,2rem)] leading-[1.15] font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-base leading-[1.6]">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
