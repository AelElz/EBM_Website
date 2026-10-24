/*
 * Geometry of the admissions diagram (admissions-path.tsx, taste skill "Many into one"): small
 * squares scattered in two pale tones (families finding out), pulled into a tight ribbon three
 * squares wide (the meetings), then set out in even rows in Fired Clay (the pupils who join).
 * Computed on the server from a fixed seed, so every render draws the same picture.
 *
 * The layout is computed along the flow (u, from first to last phase) and across it (v), then
 * mapped to x/y: horizontal from 768px, vertical on phones (each phase's third is then shown
 * beside its text).
 */

export type SquareTone = 'cream' | 'sand' | 'terracotta'

export interface Square {
  x: number
  y: number
  tone: SquareTone
}

export interface DiagramSpec {
  /** Length along the flow and width across it, in SVG units. */
  length: number
  width: number
  size: number
  gap: number
  /** Margin kept inside each third. */
  pad: number
  scattered: number
  /** The ordered rows: squares across the flow, and along it. */
  across: number
  along: number
  vertical: boolean
}

/** Small deterministic PRNG (mulberry32). */
function random(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function admissionsDiagram(spec: DiagramSpec, seed = 2014): Square[] {
  const { length, width, size, gap, pad, scattered, across, along, vertical } = spec
  const rand = random(seed)
  const third = length / 3
  const step = size + gap
  const squares: { u: number; v: number; tone: SquareTone }[] = []

  // 1. Scattered, loosely, narrowing towards the ribbon.
  const minDistance = size * 1.7
  for (let attempts = 0; squares.length < scattered && attempts < 6000; attempts++) {
    const u = rand() * (third - size - pad)
    const t = u / third
    const half = (width / 2 - size) * (1 - t ** 1.3) + width * 0.08 * t ** 1.3
    const v = width / 2 - size / 2 + (rand() * 2 - 1) * half
    if (squares.some((s) => Math.hypot(s.u - u, s.v - v) < minDistance)) continue
    squares.push({ u, v, tone: rand() < 0.5 ? 'cream' : 'sand' })
  }

  // 2. The ribbon, three squares wide, turning from sand to Fired Clay.
  const ribbonStart = third + pad
  const ribbonLength = third - pad * 2
  const columns = Math.floor((ribbonLength + gap) / step)
  const ribbonOffset = ribbonStart + (ribbonLength - (columns * step - gap)) / 2
  const ribbonTop = width / 2 - (3 * step - gap) / 2
  for (let c = 0; c < columns; c++) {
    const t = c / (columns - 1)
    for (let k = 0; k < 3; k++) {
      squares.push({
        u: ribbonOffset + c * step,
        v: ribbonTop + k * step,
        tone: rand() < t ** 1.2 ? 'terracotta' : 'sand',
      })
    }
  }

  // 3. Even rows in Fired Clay.
  const rowsStart = third * 2 + pad
  const rowsLength = third - pad * 2 - size
  for (let a = 0; a < along; a++) {
    for (let k = 0; k < across; k++) {
      squares.push({
        u: rowsStart + (a * rowsLength) / (along - 1),
        v: pad + (k * (width - pad * 2 - size)) / (across - 1),
        tone: 'terracotta',
      })
    }
  }

  return squares.map(({ u, v, tone }) => ({
    x: Math.round((vertical ? v : u) * 10) / 10,
    y: Math.round((vertical ? u : v) * 10) / 10,
    tone,
  }))
}
