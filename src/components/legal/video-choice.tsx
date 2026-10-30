'use client'

import { useEffect, useState } from 'react'

import { VIDEO_CHOICE_KEY, readVideoChoice } from '@/lib/video-choice'

import styles from './legal.module.css'

/*
 * On /cookies: whether the home video's YouTube player loads by itself when it appears, or only
 * when the visitor presses play. Kept in localStorage (`ebm-videos`), read by video-facade.tsx.
 * Without storage (private mode, blocked site data) the choice simply is not remembered.
 */
export function VideoChoice() {
  const [choice, setChoice] = useState<'auto' | 'click' | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => setChoice(readVideoChoice()), [])

  function choose(next: 'auto' | 'click') {
    setChoice(next)
    try {
      if (next === 'click') window.localStorage.setItem(VIDEO_CHOICE_KEY, 'click')
      else window.localStorage.removeItem(VIDEO_CHOICE_KEY)
      setSaved(true)
    } catch {
      setSaved(false)
    }
  }

  const options = [
    { value: 'auto' as const, label: 'Quand elle apparaît' },
    { value: 'click' as const, label: 'Seulement quand je clique' },
  ]

  return (
    <div className={styles.choice}>
      <p id="video-choice-label" className={styles.choiceLabel}>
        Charger la vidéo YouTube
      </p>
      <div role="radiogroup" aria-labelledby="video-choice-label" className={styles.choiceGroup}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={choice === option.value}
            className={styles.choiceOption}
            onClick={() => choose(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className={styles.choiceStatus} role="status">
        {saved ? 'C’est enregistré sur cet appareil.' : ' '}
      </p>
    </div>
  )
}
