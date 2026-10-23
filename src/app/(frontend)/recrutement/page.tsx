import { pages } from '@/content/pages'
import { PlaceholderPage, placeholderMetadata } from '@/components/site/placeholder-page'

const page = pages['recrutement']

export const metadata = placeholderMetadata(page)

export default function Page() {
  return <PlaceholderPage page={page} />
}
