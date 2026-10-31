import type { Metadata } from 'next'

import { people } from '@/data/sample'
import { DirectoryList } from '@/components/lists/directory-list'
import { Page } from '@/components/ui/page'

export const metadata: Metadata = { title: 'Annuaire' }

/** Annuaire: everyone at Casablanca and Rabat, as in Contacts. */
export default function DirectoryPage() {
  return (
    <Page title="Annuaire" subtitle="Les équipes de Casablanca et de Rabat">
      <DirectoryList people={people} />
    </Page>
  )
}
