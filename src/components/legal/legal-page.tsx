
import { CmsAnchor } from '@/cms/link'
import Link from '@/cms/link'
import { Fragment, type ReactNode } from 'react'

import { Container } from '@/components/ui/container'
import { LEGAL_UPDATED, legalDocuments, type LegalBlock, type LegalDocument } from '@/content/legal'
import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import styles from './legal.module.css'

/*
 * The four legal pages (30 Oct 2026, Apple design skill, apple.com/legal in spirit): a quiet
 * paper head with the date of the last version, pill tabs between the four documents, then a
 * reading column with a sticky table of contents from 1024px. Numbered sections, tables for
 * the data and the cookies, and one marked box listing what EBM still has to provide.
 * Server Component; `extra` places a client piece after a section (the video choice on
 * /cookies).
 */

/* French spacing: a narrow no-break space before : ; ? ! and inside « », so nothing wraps alone. */
const french = (text: string) =>
  text
    .replace(/ ([:;?!»])/g, `${NNBSP}$1`)
    .replace(/« /g, `«${NNBSP}`)

/** **bold** and [label](href); internal links use next/link. */
function Rich({ text }: { text: string }) {
  const parts = french(text).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/)
    if (bold) return <strong key={index}>{bold[1]}</strong>
    const link = part.match(/^\[(.+)\]\((.+)\)$/)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/') ? (
        <Link key={index} href={href}>
          {label}
        </Link>
      ) : (
        <CmsAnchor key={index} href={href} target="_blank" rel="noopener noreferrer">
          {label}
          <span className="sr-only"> (nouvel onglet)</span>
        </CmsAnchor>
      )
    }
    return <Fragment key={index}>{part}</Fragment>
  })
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === 'string') {
    return (
      <p>
        <Rich text={block} />
      </p>
    )
  }
  if ('list' in block) {
    return (
      <ul className={styles.list}>
        {block.list.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {block.table.head.map((cell) => (
              <th key={cell} scope="col">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    <Rich text={cell} />
                  </th>
                ) : (
                  <td key={index} data-label={block.table.head[index]}>
                    <Rich text={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LegalPage({ doc, extra = {} }: { doc: LegalDocument; extra?: Record<string, ReactNode> }) {
  return (
    <>
      <section aria-labelledby="page-title" className={styles.head}>
        <Container>
          <nav aria-label="Fil d’Ariane" className={styles.breadcrumb}>
            <ol>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <span aria-current="page">{doc.title}</span>
              </li>
            </ol>
          </nav>
          <p className={styles.label}>Informations légales</p>
          <h1 id="page-title" className={styles.title}>
            {doc.title}
          </h1>
          <p className={styles.intro}>
            <Rich text={doc.intro} />
          </p>
          <p className={styles.updated}>
            Dernière mise à jour{NNBSP}: <time dateTime={LEGAL_UPDATED.iso}>{LEGAL_UPDATED.label}</time>
          </p>
          <nav aria-label="Les pages d’informations légales" className={styles.tabs}>
            <ul>
              {legalDocuments.map((item) => (
                <li key={item.slug}>
                  <Link href={item.path} aria-current={item.slug === doc.slug ? 'page' : undefined}>
                    {item.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <Container className={styles.body}>
        <nav aria-labelledby="sommaire-title" className={styles.toc}>
          <p id="sommaire-title" className={styles.tocTitle}>
            Sur cette page
          </p>
          <ol>
            {doc.sections.map((section) => (
              <li key={section.id}>
                <CmsAnchor href={`#${section.id}`}>{section.title}</CmsAnchor>
              </li>
            ))}
          </ol>
        </nav>

        <article className={styles.article}>
          {doc.sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className={styles.section}>
              <h2 id={`${section.id}-title`} className={styles.sectionTitle}>
                <span aria-hidden="true" className={styles.number}>
                  {index + 1}
                </span>
                {section.title}
              </h2>
              <div className={styles.prose}>
                {section.blocks.map((block, blockIndex) => (
                  <Block key={blockIndex} block={block} />
                ))}
              </div>
              {extra[section.id]}
            </section>
          ))}

          {doc.missing?.length ? (
            <aside className={styles.missing} aria-labelledby="a-completer-title">
              <p id="a-completer-title" className={styles.missingTitle}>
                À compléter par EBM avant la mise en ligne
              </p>
              <ul>
                {doc.missing.map((item) => (
                  <li key={item}>{french(item)}</li>
                ))}
              </ul>
            </aside>
          ) : null}

          <div className={styles.contact}>
            <p>Une question sur cette page{NNBSP}?</p>
            <Link href={routes.contact}>Écrire au campus concerné</Link>
          </div>
        </article>
      </Container>
    </>
  )
}
