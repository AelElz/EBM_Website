import { cn } from '@/lib/utils'

import styles from './bands.module.css'

/*
 * The heading of bands 2 to 5, as on Ayoub's board (Bandeaux_website.ai): an uppercase label in
 * Avenir 500 (clay on white, a light clay on charcoal, white on olive), then a plain Playfair
 * title ending with a full stop. His own exception to the home's mixed SectionHeading.
 */
const labelTones = {
  clay: 'text-terracotta-ink',
  ember: styles.labelEmber,
  white: 'text-white',
} as const

export function BandHeading({
  id,
  label,
  title,
  tone = 'clay',
  className,
}: {
  id: string
  label: string
  title: string
  tone?: keyof typeof labelTones
  className?: string
}) {
  return (
    <div className={className}>
      <p className={cn(styles.label, labelTones[tone])}>{label}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
    </div>
  )
}
