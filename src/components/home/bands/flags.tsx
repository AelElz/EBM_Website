import Image from '@/cms/image'

import styles from './bands.module.css'

/*
 * The three flags of the cooperation (band 3). Belgium and Morocco are drawn (official colours);
 * the Wallonia-Brussels rooster is the board's own artwork, exported at 4x
 * (public/images/drapeau-wallonie-bruxelles.png). Decorative: the name is printed under each.
 */
export function Flag({ id }: { id: 'belgique' | 'fwb' | 'maroc' }) {
  if (id === 'fwb') {
    return (
      <Image
        src="/images/drapeau-wallonie-bruxelles.png"
        alt=""
        width={372}
        height={246}
        sizes="72px"
        className={styles.flag}
      />
    )
  }

  if (id === 'belgique') {
    return (
      <svg viewBox="0 0 60 40" aria-hidden="true" className={styles.flag}>
        <rect width="20" height="40" fill="#000" />
        <rect x="20" width="20" height="40" fill="#FDDA24" />
        <rect x="40" width="20" height="40" fill="#EF3340" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" className={styles.flag}>
      <rect width="60" height="40" fill="#C1272D" />
      <path
        d="M30 10.5 35.6 27.7 21 17.1h18L24.4 27.7Z"
        fill="none"
        stroke="#006233"
        strokeWidth="1.7"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
