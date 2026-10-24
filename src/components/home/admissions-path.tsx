import Link from 'next/link'

import { admissionsPath } from '@/content/home-details'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

import { admissionsDiagram, type DiagramSpec, type Square } from './admissions-diagram'
import styles from './admissions-path.module.css'

/*
 * Home section "Rejoindre les EBM, pas à pas" (taste skill, "Many into one"): the seven
 * admission steps from EBM's "Processus d'admission" page, told in three phases under a diagram
 * drawn with one repeated square (admissions-diagram.ts). From 768px the diagram runs left to
 * right across the page with the phases under its thirds; on phones it runs top to bottom, each
 * third beside its phase. The diagram is decorative: the phases carry the content.
 * Server Component, no client JS.
 */

const wide: DiagramSpec = {
  length: 1200,
  width: 264,
  size: 12,
  gap: 3,
  pad: 24,
  scattered: 44,
  across: 4,
  along: 9,
  vertical: false,
}

const tall: DiagramSpec = {
  length: 540,
  width: 96,
  size: 8,
  gap: 2,
  pad: 10,
  scattered: 26,
  across: 4,
  along: 6,
  vertical: true,
}

const wideSquares = admissionsDiagram(wide)
const tallSquares = admissionsDiagram(tall)

const toneClass = {
  cream: 'fill-cream',
  sand: 'fill-sand',
  terracotta: 'fill-terracotta',
} as const

function Squares({ squares, size }: { squares: Square[]; size: number }) {
  return squares.map((square, index) => (
    <rect
      key={index}
      x={square.x}
      y={square.y}
      width={size}
      height={size}
      className={toneClass[square.tone]}
    />
  ))
}

export function AdmissionsPath() {
  const { title, text, phases, apply, more } = admissionsPath
  const [first, second] = title

  return (
    <section aria-labelledby="admissions-title" className="py-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-8">
          <h2
            id="admissions-title"
            className="reveal font-sans text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.025em] lg:col-span-6"
          >
            <span className="block">{first}</span>
            <span className="block">{second}</span>
          </h2>
          <p className="reveal-2 max-w-[36em] self-end text-lead lg:col-span-6 lg:col-start-7">{text}</p>
        </div>

        {/* From 768px: one wide diagram, the phases under its thirds. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${wide.length} ${wide.width}`}
          className={`${styles.diagram} mt-14 hidden w-full md:block lg:mt-[72px]`}
        >
          <Squares squares={wideSquares} size={wide.size} />
        </svg>
        <ol role="list" className="mt-10 hidden gap-x-8 md:grid md:grid-cols-3">
          {phases.map((phase, index) => (
            <li key={phase.name} className={index === 0 ? 'reveal' : index === 1 ? 'reveal-2' : 'reveal-3'}>
              <h3 className="text-xl font-bold">{phase.name}</h3>
              <p className="mt-2 max-w-[34ch] text-base leading-[1.5]">{phase.text}</p>
            </li>
          ))}
        </ol>

        {/* Phones: the diagram runs downwards, each third beside its phase. */}
        <ol role="list" className="mt-12 grid gap-8 md:hidden">
          {phases.map((phase, index) => (
            <li key={phase.name} className="reveal grid grid-cols-[72px_minmax(0,1fr)] items-start gap-5">
              <svg
                aria-hidden="true"
                viewBox={`0 ${(index * tall.length) / 3} ${tall.width} ${tall.length / 3}`}
                className="w-full"
              >
                <Squares squares={tallSquares} size={tall.size} />
              </svg>
              <div>
                <h3 className="text-xl font-bold">{phase.name}</h3>
                <p className="mt-2 text-base leading-[1.5]">{phase.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-14">
          <ButtonLink href={apply.href} size="lg">
            {apply.label}
          </ButtonLink>
          <Link
            href={more.href}
            className="inline-flex min-h-11 items-center text-[15px] font-bold text-terracotta-ink underline underline-offset-4 transition-colors duration-200 hover:text-charcoal"
          >
            {more.label}
          </Link>
        </div>
      </Container>
    </section>
  )
}
