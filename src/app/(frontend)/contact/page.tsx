import { ContactPage } from '@/components/inner/campuses/campus-pages'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contactez les Écoles Belges au Maroc : sections fondamentale et secondaire de Casablanca, accueil de Rabat, adresses, téléphones et e-mails.',
  path: '/contact',
  index: false,
})

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const campus = params.campus === 'rabat' ? 'rabat' : params.campus === 'casablanca' ? 'casablanca' : undefined
  const subject = params.sujet === 'alumni' ? 'Rejoindre le réseau alumni' : undefined
  return <ContactPage initialCampus={campus} initialSubject={subject} />
}
