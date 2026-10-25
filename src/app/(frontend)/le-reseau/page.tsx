import { NetworkPage } from '@/components/inner/school/network-page'
import { networkPage } from '@/content/migration/school'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: networkPage.title,
  description: networkPage.description,
  path: '/le-reseau',
  index: false,
})

export default function Page() {
  return <NetworkPage />
}
