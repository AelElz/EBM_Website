import Image from 'next/image'

import { director } from '@/content/home-details'
import { Container } from '@/components/ui/container'

/*
 * Home section "Le mot du directeur" (taste skill, "One long letter"): the network director's
 * message, word for word from EBM's current site, set as a letter on the Riad Sand (cream)
 * ground. His own closing line is the heading; three paragraphs in the full ink; the name and
 * role close it as a signature. His portrait (4:5) takes the first four columns, level with the
 * heading, and stays in view while the letter is read (from 1024px). The blueprint's small
 * square was too slight for the one face that signs for the network. No quotation marks: the
 * letter form says it is his voice. Server Component, no client JS.
 */
export function DirectorLetter() {
  const { image } = director

  return (
    <section aria-labelledby="director-title" className="bg-cream py-section">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="reveal lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--spacing-header)+40px)]">
              <div className="relative aspect-[4/5] w-full max-w-[22rem] lg:max-w-none">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 22rem"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            </div>
          </div>

          <div className="max-w-[40ch] text-[17px] lg:col-span-6 lg:col-start-6 lg:text-[19px]">
            <h2
              id="director-title"
              className="reveal font-sans text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.22] font-medium tracking-[-0.015em]"
            >
              {director.title}
            </h2>
            <div className="reveal-2 mt-8 grid gap-5 leading-[1.55]">
              {director.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <p className="reveal-2 mt-10 text-base leading-[1.5]">
              <span className="block font-bold">{director.name}</span>
              <span className="block">{director.role}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
