import { pages } from '@/content/pages'
import { PlaceholderPage, placeholderMetadata } from '@/components/site/placeholder-page'

const page = pages['admissions-candidater']

export const metadata = placeholderMetadata(page)

export default function Page() {
  return <PlaceholderPage page={page} />
}
