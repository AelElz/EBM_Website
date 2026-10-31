'use client'

import { Search, X } from 'lucide-react'
import { useId } from 'react'

/** The iOS search field: a grey rounded well, a magnifier, and a clear button once typed in. */
export function SearchField({
  value,
  onChange,
  label,
  placeholder = 'Rechercher',
}: {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder?: string
}) {
  const id = useId()
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search aria-hidden="true" strokeWidth={2} className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-secondary" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-9 w-full rounded-[10px] bg-fill pr-9 pl-8 text-[17px] outline-none placeholder:text-secondary focus-visible:ring-2 focus-visible:ring-accent/40 lg:text-[15px] [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-1/2 right-1 grid size-8 -translate-y-1/2 place-items-center rounded-full text-secondary"
          aria-label="Effacer la recherche"
        >
          <span className="grid size-4 place-items-center rounded-full bg-[#8e8e93] text-white">
            <X aria-hidden="true" strokeWidth={3} className="size-2.5" />
          </span>
        </button>
      ) : null}
    </div>
  )
}

/** Accents and case ignored: "eleve" finds "Élève". */
export function fold(text: string) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}
