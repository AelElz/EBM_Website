'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'

import type { Person } from '@/data/sample'
import type { CampusKey } from '@/lib/session'
import { Avatar } from '@/components/shell/avatar'
import { fold, SearchField } from '@/components/ui/search-field'
import { Section } from '@/components/ui/section'
import { Segmented } from '@/components/ui/segmented'

type Filter = 'tous' | CampusKey

const lastName = (name: string) => name.split(/\s+/).slice(1).join(' ') || name

/*
 * The directory, as in Contacts: a search, a campus filter, then everyone under the first letter
 * of their last name. Each row writes an e-mail in one tap.
 */
export function DirectoryList({ people }: { people: Person[] }) {
  const [query, setQuery] = useState('')
  const [campus, setCampus] = useState<Filter>('tous')
  const q = fold(query.trim())
  const found = people
    .filter((p) => campus === 'tous' || p.campus === campus)
    .filter((p) => !q || fold(`${p.name} ${p.role}`).includes(q))
    .sort((a, b) => fold(lastName(a.name)).localeCompare(fold(lastName(b.name))))

  const letters = new Map<string, Person[]>()
  for (const p of found) {
    const letter = fold(lastName(p.name)).charAt(0).toUpperCase()
    letters.set(letter, [...(letters.get(letter) ?? []), p])
  }

  return (
    <>
      <div className="grid gap-3">
        <SearchField value={query} onChange={setQuery} label="Rechercher une personne" placeholder="Nom ou fonction" />
        <Segmented
          label="Campus"
          value={campus}
          onChange={setCampus}
          options={[
            { value: 'tous', label: 'Tous' },
            { value: 'casablanca', label: 'Casablanca' },
            { value: 'rabat', label: 'Rabat' },
          ]}
        />
      </div>

      {found.length === 0 ? (
        <p className="rounded-card bg-card px-4 py-3 text-secondary">Personne ne correspond à cette recherche.</p>
      ) : (
        <div className="grid gap-6">
          {[...letters].map(([letter, group]) => (
            <Section key={letter} id={`lettre-${letter}`} title={letter} separatorInset={64}>
              {group.map((p) => (
                <li key={p.id} className="flex min-h-11 items-center gap-3 px-4 py-2">
                  <Avatar name={p.name} size={36} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{p.name}</span>
                    <span className="block truncate text-sub text-secondary">
                      {p.role}
                      {p.extension ? <span className="num"> · poste {p.extension}</span> : null}
                      {campus === 'tous' && p.campus === 'rabat' ? ' · Rabat' : ''}
                    </span>
                  </span>
                  <a
                    href={`mailto:${p.email}`}
                    className="grid size-11 shrink-0 place-items-center rounded-full text-accent transition-colors hover:bg-hover"
                    aria-label={`Écrire à ${p.name}`}
                    title={p.email}
                  >
                    <Mail aria-hidden="true" strokeWidth={1.75} className="size-5" />
                  </a>
                </li>
              ))}
            </Section>
          ))}
        </div>
      )}
      <p className="-mt-4 px-4 text-foot text-secondary">
        <span className="num">{found.length}</span> personne{found.length > 1 ? 's' : ''}
      </p>
    </>
  )
}
