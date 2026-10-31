import { getCmsContent } from '@/cms/server'
import { homeBands as defaultHomeBands } from '@/content/home-bands'
import { Container } from '@/components/ui/container'

import { AnchorageGallery } from './anchorage-gallery'
import { BandHeading } from './band-heading'
import { Flag } from './flags'
import styles from './bands.module.css'

/*
 * Band 3 of Ayoub's board: the institutional cooperation, on white. The photo mosaic on the left
 * and the arrows at the lower right belong to a small client gallery (anchorage-gallery.tsx);
 * the text column, centred as on the board, is server-rendered and passed in: heading, the
 * three flags (they unfold as they enter; their names are for screen readers) and the 2014
 * agreement. The partner logos moved to the strip right below (partners-marquee.tsx, 31 Oct
 * 2026), so they are not shown twice in a row.
 */
export async function AnchorageBand() {
  const homeBands = await getCmsContent('homeBands', defaultHomeBands)
  const { label, title, text, agreement, flags, photos } = homeBands.anchorage

  return (
    <section aria-labelledby="anchorage-title" className="py-[clamp(72px,8vw,112px)]">
      <Container>
        <AnchorageGallery photos={photos}>
          <div className={styles.anchorageText}>
            <BandHeading id="anchorage-title" label={label} title={title} className="reveal" />
            <p className="reveal-2 mx-auto mt-5 max-w-[44ch] text-base leading-[1.6]">{text}</p>

            <ul role="list" className={styles.flags}>
              {flags.map((flag) => (
                <li key={flag.id} className={styles.flagItem}>
                  <Flag id={flag.id as 'belgique' | 'fwb' | 'maroc'} />
                  <span className="sr-only">{flag.name}</span>
                </li>
              ))}
            </ul>

            <p className="reveal mx-auto mt-8 max-w-[46ch] text-base leading-[1.6]">
              {agreement.before}
              <strong className="font-bold">{agreement.strong}</strong>
              {agreement.after}
            </p>

          </div>
        </AnchorageGallery>
      </Container>
    </section>
  )
}
