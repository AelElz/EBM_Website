'use client'

import { ArrowUpRight, FileSpreadsheet, FileText, ListChecks, type LucideIcon } from 'lucide-react'
import { useState } from 'react'

import type { DocumentCategory, DocumentKind, StaffDocument } from '@/data/sample'
import { shortFullDate } from '@/lib/format'
import { fold, SearchField } from '@/components/ui/search-field'
import { Section } from '@/components/ui/section'

const kinds: Record<DocumentKind, { label: string; icon: LucideIcon }> = {
  pdf: { label: 'PDF', icon: FileText },
  docs: { label: 'Google Docs', icon: FileText },
  sheets: { label: 'Google Sheets', icon: FileSpreadsheet },
  forms: { label: 'Google Forms', icon: ListChecks },
}

const order: DocumentCategory[] = ['Règlements et calendrier', 'Procédures', 'Évaluation', 'Formulaires']

/** The school's documents by kind of use, searchable by title (accents ignored). */
export function DocumentList({ items }: { items: StaffDocument[] }) {
  const [query, setQuery] = useState('')
  const q = fold(query.trim())
  const found = q ? items.filter((d) => fold(`${d.title} ${d.category}`).includes(q)) : items

  return (
    <>
      <SearchField value={query} onChange={setQuery} label="Rechercher un document" placeholder="Rechercher un document" />
      {found.length === 0 ? (
        <p className="rounded-card bg-card px-4 py-3 text-secondary">Aucun document ne correspond à «{' '}{query.trim()}{' '}».</p>
      ) : (
        order
          .map((category) => [category, found.filter((d) => d.category === category)] as const)
          .filter(([, docs]) => docs.length)
          .map(([category, docs], index) => (
            <Section key={category} id={`categorie-${index}`} title={category} separatorInset={52}>
              {docs.map((doc) => {
                const { label, icon: Icon } = kinds[doc.kind]
                return (
                  <li key={doc.title}>
                    <a href={doc.href} className="group flex min-h-11 items-center gap-3 px-4 py-2.5 transition-colors hover:bg-hover active:bg-fill">
                      <Icon aria-hidden="true" strokeWidth={1.75} className="size-6 shrink-0 text-accent" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{doc.title}</span>
                        <span className="block truncate text-sub text-secondary">
                          {label} · <span className="num">{shortFullDate(new Date(doc.updated))}</span>
                        </span>
                      </span>
                      <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-chevron group-hover:text-secondary" />
                    </a>
                  </li>
                )
              })}
            </Section>
          ))
      )}
    </>
  )
}
