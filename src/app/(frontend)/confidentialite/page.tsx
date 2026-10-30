import { LegalPage } from '@/components/legal/legal-page'
import { privacyAndSecurity } from '@/content/legal'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: privacyAndSecurity.title, description: privacyAndSecurity.intro, path: privacyAndSecurity.path, index: false })

export default function Page() {
  return <LegalPage doc={privacyAndSecurity} />
}
