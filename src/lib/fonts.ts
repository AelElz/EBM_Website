import { Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'

/*
 * Typefaces: exactly two families (docs/HOME-SPEC.md).
 *
 * AVENIR NEXT is self-hosted from EBM's own font files (src/fonts/).
 * LICENCE: the Avenir Next *web* licence has not been verified yet (docs/ARCHITECTURE.md,
 * section 6). Confirm EBM holds a web font licence before launch, or switch to an approved face.
 *
 * Only the 400 file is preloaded. next/font preloads every file of one call, so the family is
 * declared in two calls that share one explicit font-family name, "Avenir Next EBM" (set through
 * `declarations`; literal values only, options are read at compile time). The browser merges
 * both sets of @font-face rules into one family with four weights; only the 400 file gets a
 * preload. Because the bundler names the CSS variables after the JS constants (not after the
 * declared family), globals.css references "Avenir Next EBM" directly in --font-sans, together
 * with a size-adjusted Arial fallback ("Avenir Next EBM Fallback") to avoid layout shift.
 * The `variable` classes below are applied to <html> only so the @font-face CSS is always
 * bundled; their values are not used.
 */
export const avenir = localFont({
  src: [{ path: '../fonts/avenir-next-400.woff2', weight: '400', style: 'normal' }],
  declarations: [{ prop: 'font-family', value: 'Avenir Next EBM' }],
  variable: '--font-avenir-400',
  display: 'swap',
  preload: true,
  // Fallback metrics live in globals.css (@font-face "Avenir Next EBM Fallback").
  adjustFontFallback: false,
})

export const avenirStrong = localFont({
  src: [
    { path: '../fonts/avenir-next-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/avenir-next-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/avenir-next-700.woff2', weight: '700', style: 'normal' },
  ],
  declarations: [{ prop: 'font-family', value: 'Avenir Next EBM' }],
  variable: '--font-avenir-500-700',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
})

/* PLAYFAIR DISPLAY: h1, h2, large h3 and display headings only (weights 500 + 600).
 * Its CSS variable (--font-playfair) includes next/font's size-adjusted serif fallback.
 * `subsets` only chooses what is *preloaded*: the @font-face rules of every subset (latin-ext
 * included) are still emitted with their unicode-range, so rarer characters still render.
 * Preloading `latin` alone (it covers French, ’ and U+202F) saves a 21 KB preload. Playfair is
 * a variable font: one file per subset serves both weights. */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
})

/* PLAYFAIR DISPLAY ITALIC 400: the accent words of the mixed Avenir + serif-italic headings in
 * the home scroll sections (Ayoub's 23 Oct mock-ups: "Apprendre *ici*, ..."). A separate call so
 * its file is never preloaded: it loads when the first accent word renders, below the fold. */
export const playfairItalic = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-playfair-italic',
  display: 'swap',
  preload: false,
})

/** Class names for <html>: Playfair's variables + the Avenir @font-face anchors. */
export const fontVariables = [
  avenir.variable,
  avenirStrong.variable,
  playfair.variable,
  playfairItalic.variable,
].join(' ')
