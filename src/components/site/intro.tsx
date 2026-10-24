import Image from 'next/image'

import styles from './intro.module.css'

/*
 * Intro curtain on the first page load of a visit (Ayoub's request, 24 Oct 2026): Fired Clay
 * screen, white logo rising into the middle, then the screen slides up out of view. All the
 * motion is CSS (intro.module.css), so it runs from the first paint and needs no client JS.
 *
 * Once per browser session: the inline script runs while the HTML is parsed, before the curtain
 * paints. On the first load it records the visit in sessionStorage; on every later full load in
 * that tab session it marks <html data-intro-seen>, which hides the curtain (layout.tsx sets
 * suppressHydrationWarning on <html> for that attribute). Client-side navigation never shows
 * it again: the layout, and this element, stay mounted. If storage is blocked, the intro simply
 * plays on each load.
 *
 * The logo is the white one-colour version of the stacked logo (public/brand/
 * logo-ebm-stacked-white.svg), the counterpart of EBM's charcoal one-colour logo.
 * Decorative here: the curtain is aria-hidden and gone after 2.3s.
 */

const SEEN_KEY = 'ebm-intro-seen'

const seenScript = `try{if(sessionStorage.getItem('${SEEN_KEY}'))document.documentElement.setAttribute('data-intro-seen','');else sessionStorage.setItem('${SEEN_KEY}','1')}catch(e){}`

export function Intro() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: seenScript }} />
      <div aria-hidden="true" className={styles.intro}>
        <div className={styles.mask}>
          <Image
            src="/brand/logo-ebm-stacked-white.svg"
            alt=""
            width={177}
            height={80}
            unoptimized
            loading="eager"
            className={styles.logo}
          />
        </div>
      </div>
    </>
  )
}
