import { PedagogyPage } from '@/components/inner/school/school-pages'
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
