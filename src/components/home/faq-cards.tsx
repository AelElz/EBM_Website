'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

import styles from './faq.module.css'

export function FaqCards({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className={styles.cards}>
      {items.map((item, index) => (
        <Accordion.Item key={item.q} value={`question-${index}`} className={styles.card}>
          <Accordion.Header>
            <Accordion.Trigger className={styles.question}>
              <span>{item.q}</span>
              <Plus aria-hidden="true" size={22} strokeWidth={1.75} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.answer}>
            <p>{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
