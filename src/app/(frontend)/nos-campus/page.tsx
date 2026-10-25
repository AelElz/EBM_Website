import { CampusHub } from '@/components/inner/campuses/campus-pages'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Nos campus',
  description: 'Découvrez les campus des Écoles Belges au Maroc à Casablanca, Dar Bouazza, et à Rabat, Hay Riad : cadre de vie, services et contacts.',
  path: '/nos-campus',
  index: false,
})

export default function Page() {
  return <CampusHub />
}
