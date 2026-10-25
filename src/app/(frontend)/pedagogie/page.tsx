import { PedagogyPage } from '@/components/inner/school/pedagogy-page'
import { pedagogyPage } from '@/content/migration/school'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Pédagogie',
  description: pedagogyPage.description,
  path: '/pedagogie',
  index: false,
})

export default function Page() {
  return <PedagogyPage />
}
