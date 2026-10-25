import { journey } from '@/content/journey'
import { Container } from '@/components/ui/container'

import { JourneyPicker } from './journey-picker'
import styles from './journey.module.css'
import { SectionHeading } from './emphasis'

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <SectionHeading id="journey-title" text={journey.title} />
          <p className="max-w-[24ch] text-lead">{journey.text}</p>
        </div>
        <JourneyPicker />
      </Container>
    </section>
  )
}
