import { LegalPage } from '@/components/legal/legal-page'
import { termsOfUse } from '@/content/legal'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: termsOfUse.title, description: termsOfUse.intro, path: termsOfUse.path, index: false })

export default function Page() {
  return <LegalPage doc={termsOfUse} />
}
