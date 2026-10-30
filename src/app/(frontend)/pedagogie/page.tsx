import { PedagogyPage } from '@/components/inner/school/pedagogy-page'
import { pedagogie } from '@/content/pedagogie'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Notre pédagogie',
  description: pedagogie.description,
  path: '/pedagogie',
  index: false,
})

export default function Page() {
  return <PedagogyPage />
}
