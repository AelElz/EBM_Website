import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * tailwind-merge must know the custom theme keys from globals.css, otherwise it mistakes
 * `text-h2` for a text colour (and drops `text-white`), `shadow-card` for a shadow colour, etc.
 * Keep this list in sync with the @theme block.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'h1', 'h2', 'h3', 'lead'],
      radius: ['ui'],
      shadow: ['card'],
      container: ['site', 'narrow'],
      spacing: ['gutter', 'section', 'header'],
      ease: ['out-expo'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
