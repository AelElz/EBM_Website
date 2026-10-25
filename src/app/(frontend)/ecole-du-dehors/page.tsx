import { OutdoorsPage } from '@/components/inner/school/outdoor-page'
import { outdoorsPage } from '@/content/migration/school'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: outdoorsPage.title,
  description: outdoorsPage.description,
  path: '/ecole-du-dehors',
  index: false,
})

export default function Page() {
  return <OutdoorsPage />
}
