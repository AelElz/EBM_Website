// WCAG contrast of the hero's white h1 and paragraph over each slide photo + the charcoal overlay
// (src/components/home/hero-slider.tsx), at several viewports. Text rects come from headless
// Chrome; pixels from the source JPEGs (sharp, from the project's node_modules).
// Usage: npm run start (port 3100), then npm run qa:hero-contrast. Keep `slides` in sync with
// src/content/home.ts (hero.slides) and PHONE/WIDE/BASE with the overlay in hero-slider.tsx.
import { createRequire } from 'node:module'
import { join } from 'node:path'

import { launch } from './cdp.mjs'

const root = process.argv[2] || process.cwd()
const url = process.argv[3] || process.env.QA_URL || 'http://localhost:3100/'
const sharp = createRequire(join(root, 'package.json'))('sharp')

// Overlay as built: 50% charcoal, plus a gradient layer (alpha stops). Phones: to top, from the
// bottom edge. md+ (>= 768px): to right, from the left edge.
const PHONE = [[0, 0.45], [0.65, 0.32], [1, 0.15]]
const WIDE = [[0, 0.45], [0.6, 0.3], [1, 0.1]]
const BASE = 0.5
const CHARCOAL = 40

const lerp = (stops, t) => {
  for (let i = 1; i < stops.length; i++) {
    const [t0, a0] = stops[i - 1]
    const [t1, a1] = stops[i]
    if (t <= t1) return a0 + (a1 - a0) * ((t - t0) / (t1 - t0))
  }
  return stops.at(-1)[1]
}
const lin = (v) => {
  v /= 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const lum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)

const slides = [
  ['hero-rabat-entree.jpg', '50% 50%'],
  ['hero-casablanca-entree.jpg', '50% 40%'],
  ['hero-rabat-batiment.jpg', '50% 45%'],
]
const pixels = {}
for (const [file] of slides) {
  const { data, info } = await sharp(join(root, 'public/images', file)).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  pixels[file] = { data, w: info.width, h: info.height }
}

const viewports = [[360, 640], [375, 812], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]]
const browser = await launch()
const rows = []
let fail = false
try {
  for (const [vw, vh] of viewports) {
    await browser.viewport(vw, vh)
    await browser.goto(url, 800)
    const geo = await browser.evaluate(`(() => {
      const hero = document.querySelector('section[aria-roledescription=carrousel]')
      const H = hero.getBoundingClientRect()
      const rel = (el) => { const r = el.getBoundingClientRect(); return { x: r.left - H.left, y: r.top - H.top, w: r.width, h: r.height } }
      return { w: H.width, h: H.height, h1: rel(hero.querySelector('h1')), p: rel(hero.querySelector('h1 + p')),
               h1Lines: Math.round(hero.querySelector('h1').getBoundingClientRect().height / parseFloat(getComputedStyle(hero.querySelector('h1')).lineHeight)) }
    })()`)
    const wide = vw >= 768
    for (const [file, position] of slides) {
      const { data, w: nw, h: nh } = pixels[file]
      const s = Math.max(geo.w / nw, geo.h / nh)
      const [px, py] = position.split(' ').map((v) => parseFloat(v) / 100)
      const ox = (geo.w - nw * s) * px
      const oy = (geo.h - nh * s) * py
      const result = {}
      for (const key of ['h1', 'p']) {
        const r = geo[key]
        let worst = Infinity
        const all = []
        for (let y = r.y; y < r.y + r.h; y += 2) {
          for (let x = r.x; x < r.x + r.w; x += 2) {
            const sx = Math.floor((x - ox) / s)
            const sy = Math.floor((y - oy) / s)
            if (sx < 0 || sy < 0 || sx >= nw || sy >= nh) continue
            const i = (sy * nw + sx) * 3
            const g = wide ? lerp(WIDE, x / geo.w) : lerp(PHONE, (geo.h - y) / geo.h)
            const keep = (1 - BASE) * (1 - g)
            const bg = [0, 1, 2].map((j) => data[i + j] * keep + CHARCOAL * (1 - keep))
            const ratio = 1.05 / (lum(...bg) + 0.05)
            all.push(ratio)
            if (ratio < worst) worst = ratio
          }
        }
        all.sort((a, b) => a - b)
        result[key] = { worst, p1: all[Math.floor(all.length * 0.01)] }
      }
      const okH1 = result.h1.worst >= 3
      const okP = result.p.worst >= 4.5
      if (!okH1 || !okP) fail = true
      rows.push(
        `${`${vw}x${vh}`.padEnd(10)} h1 ${geo.h1Lines} lines  ${file.replace('hero-', '').replace('.jpg', '').padEnd(18)}` +
          ` h1 worst ${result.h1.worst.toFixed(2)} (>=3 ${okH1 ? 'ok' : 'FAIL'})` +
          `  p worst ${result.p.worst.toFixed(2)} p1 ${result.p.p1.toFixed(2)} (>=4.5 ${okP ? 'ok' : 'FAIL'})`,
      )
    }
  }
} finally {
  await browser.close()
}
console.log(rows.join('\n'))
console.log(fail ? '\nSOME TEXT FAILS AA' : '\nAll hero text passes AA on every pixel measured.')
