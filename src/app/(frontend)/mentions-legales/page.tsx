import { LegalPage } from '@/components/legal/legal-page'
import { legalNotice } from '@/content/legal'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: legalNotice.title, description: legalNotice.intro, path: legalNotice.path, index: false })

export default function Page() {
  return <LegalPage doc={legalNotice} />
}
