import type { Metadata } from 'next'

import { documents } from '@/data/sample'
import { DocumentList } from '@/components/lists/document-list'
import { Page } from '@/components/ui/page'

export const metadata: Metadata = { title: 'Documents' }

/** Documents: the school's rules, procedures, evaluation grids and forms, in one searchable list. */
export default function DocumentsPage() {
  return (
    <Page title="Documents" subtitle={`${documents.length} documents partagés`}>
      <DocumentList items={documents} />
    </Page>
  )
}
