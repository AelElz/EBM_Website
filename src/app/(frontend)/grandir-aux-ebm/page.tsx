import { SchoolLifePage } from '@/components/inner/school/school-pages'
import { schoolLifePage } from '@/content/migration/school'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: schoolLifePage.title,
  description: schoolLifePage.description,
  path: '/grandir-aux-ebm',
  index: false,
})

export default function Page() {
  return <SchoolLifePage />
}
