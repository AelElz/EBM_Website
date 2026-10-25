import { SupportPage } from '@/components/inner/support-page'
import { legalDraft as content } from '@/content/migration/support'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: content.title, description: content.intro, path: content.path, index: false })

export default function Page() { return <SupportPage content={content} /> }
