import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import type { BreadcrumbItem } from '@/components/site/page-hero'

import styles from './blocks.module.css'

export interface ContentImage {
  src: string
  alt: string
  width?: number
  height?: number
  position?: string
  caption?: string
}
type Tone = 'white' | 'paper' | 'cream' | 'olive'
type ContentLink = { label: string; href: string; description?: string; external?: boolean }

function Photo({ image, hero = false }: { image: ContentImage; hero?: boolean }) {
  return (
    <figure className={styles.figure}>
      <div className={hero ? styles.heroPhoto : styles.photo}>
        <Image src={image.src} alt={image.alt} fill sizes={hero ? '(min-width: 1240px) 600px, (min-width: 768px) 50vw, 100vw' : '(min-width: 1240px) 560px, (min-width: 768px) 46vw, 100vw'} className="object-cover" style={{ objectPosition: image.position ?? '50% 50%' }} preload={hero} />
      </div>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  )
}

/** Inner-page-only blocks. The approved homepage never imports this module. */
export function InnerHero({ title, intro, breadcrumb = [], image, tone, children }: { title: string; intro: string; breadcrumb?: BreadcrumbItem[]; image?: ContentImage; /** A green hero with white text (Grandir aux EBM). */ tone?: 'olive'; children?: ReactNode }) {
  const trail = [{ label: 'Accueil', href: '/' }, ...(breadcrumb.length ? breadcrumb : [{ label: title }])]
  return (
    <section className={styles.hero} data-tone={tone} aria-labelledby="page-title">
      <Container>
        <nav className={styles.breadcrumb} aria-label="Fil d’Ariane"><ol>{trail.map((item, index) => <li key={`${item.label}-${index}`}>{index < trail.length - 1 && item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></nav>
        <div className={styles.heroLayout} data-photo={image ? '' : undefined}>
          <div className={styles.heroCopy}><h1 id="page-title">{title}</h1><p>{intro}</p>{children && <div className={styles.heroExtra}>{children}</div>}</div>
          {image && <Photo image={image} hero />}
        </div>
      </Container>
    </section>
  )
}

export function PageSection({ id, title, intro, tone = 'white', children }: { id?: string; title?: string; intro?: string; tone?: Tone; children: ReactNode }) {
  return <section id={id} className={styles.section} data-tone={tone} aria-label={title}><Container>{title && <h2 className={styles.sectionTitle}>{title}</h2>}{intro && <p className={styles.sectionIntro}>{intro}</p>}<div className={styles.sectionBody}>{children}</div></Container></section>
}

export function TextBlock({ paragraphs = [], children }: { paragraphs?: string[]; children?: ReactNode }) {
  return <div className={styles.prose}>{paragraphs.map((p,index) => <p key={index}>{p}</p>)}{children}</div>
}

export function SplitSection({ id, title, paragraphs, image, reverse = false, tone = 'white', children }: { id?: string; title: string; paragraphs: string[]; image: ContentImage; reverse?: boolean; tone?: Tone; children?: ReactNode }) {
  return <section id={id} className={styles.section} data-tone={tone} aria-label={title}><Container className={styles.split} data-reverse={reverse ? '' : undefined}><div><h2 className={styles.sectionTitle}>{title}</h2><TextBlock paragraphs={paragraphs}>{children}</TextBlock></div><Photo image={image} /></Container></section>
}

export function PhotoGallery({ images }: { images: ContentImage[] }) {
  return <div className={styles.gallery}>{images.map((image,index) => <Photo image={image} key={`${image.src}-${index}`} />)}</div>
}

export function ReviewNote({ title = 'À confirmer avec EBM', children }: { title?: string; children: ReactNode }) {
  return <aside className={styles.review}><p className={styles.reviewTitle}>{title}</p><div>{children}</div></aside>
}

export function LinkList({ items }: { items: ContentLink[] }) {
  return <ul role="list" className={styles.links}>{items.map(item => <li key={`${item.href}-${item.label}`}><Link href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span>{item.label}{item.external && <span className="sr-only"> (nouvel onglet)</span>}</span>{item.description && <p>{item.description}</p>}</Link></li>)}</ul>
}

export function FactList({ items }: { items: { label: string; value: string }[] }) {
  return <dl className={styles.facts}>{items.map((item,index) => <div key={`${item.label}-${index}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
}

export function SectionNav({ items }: { items: { label: string; href: string }[] }) {
  return <nav aria-label="Dans cette page" className={styles.sectionNav}><Container><ul>{items.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></Container></nav>
}

export function DocumentLink({ href, label, note }: { href: string; label: string; note?: string }) {
  return <div className={styles.document}><a href={href} download>{label}</a>{note && <p>{note}</p>}</div>
}

export function PageActions({ title = 'Votre prochaine étape', text, primary, secondary }: { title?: string; text?: string; primary?: ContentLink; secondary?: ContentLink }) {
  return <section className={styles.actionsSection} aria-label={title}><Container className={styles.actionsLayout}><div><h2 className={styles.sectionTitle}>{title}</h2>{text && <p>{text}</p>}</div><div className={styles.actions}>{primary && <ButtonLink href={primary.href} external={primary.external} size="lg">{primary.label}</ButtonLink>}{secondary && <ButtonLink href={secondary.href} external={secondary.external} variant="outline-dark" size="lg">{secondary.label}</ButtonLink>}</div></Container></section>
}

export function DisclosureList({ items }: { items: { id?: string; question: string; answer: string | string[] }[] }) {
  return <div className={styles.disclosures}>{items.map((item,index) => <details id={item.id} key={item.id ?? index}><summary>{item.question}</summary><TextBlock paragraphs={Array.isArray(item.answer) ? item.answer : [item.answer]} /></details>)}</div>
}
