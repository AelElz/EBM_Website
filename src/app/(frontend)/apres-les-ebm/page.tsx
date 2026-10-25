import { AfterEbmPage } from '@/components/inner/school/school-pages'
import { alumniPage } from '@/content/migration/school'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: alumniPage.title,
  description: alumniPage.description,
  path: '/apres-les-ebm',
  index: false,
})

export default function Page() {
  return <AfterEbmPage />
}
