'use client'

import { useState } from 'react'

/*
 * The screen's one job: take the open cover. One filled capsule, the only one on the screen. In
 * this sample the tap only turns it into a confirmation; once connected, it sends the offer to the
 * coordinator (README.md, "Actions to wire").
 */
export function CoverOffer({ coordinator }: { coordinator: string }) {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <p role="status" className="flex shrink-0 items-center gap-3 text-sub text-secondary sm:flex-col sm:items-end sm:gap-0">
        <span className="whitespace-nowrap">Envoyé à {coordinator}</span>
        <button type="button" onClick={() => setSent(false)} className="h-11 text-accent-text hover:underline sm:h-auto">
          Annuler
        </button>
      </p>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setSent(true)}
      className="h-11 shrink-0 rounded-full bg-accent px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-75"
    >
      Je le prends
    </button>
  )
}
