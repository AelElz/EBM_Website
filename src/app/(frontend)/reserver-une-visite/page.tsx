import { InnerHero, LinkList, PageSection, ReviewNote, TextBlock } from '@/components/inner/blocks'
import { ContactComposer } from '@/components/inner/campuses/contact-composer'
import { campusContactRecipients, migratedCampuses } from '@/content/migration/campuses'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({ title: 'Demander une visite', description: 'Contacter le campus pour organiser une visite dans le cadre d’une candidature.', path: '/reserver-une-visite', index: false })

export default async function VisitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const campus = params.campus === 'rabat' ? 'rabat' : params.campus === 'casablanca' ? 'casablanca' : undefined
  return <>
    <InnerHero title="Demander une visite" intro="Un échange avec l’équipe du campus pour préparer votre rencontre avec l’école." />
    <PageSection title="Une visite organisée avec votre campus">
      <TextBlock paragraphs={['Les informations publiées par les EBM réservent les visites aux familles engagées dans une candidature. L’organisation actuelle est à confirmer directement avec l’établissement.', 'Aucun créneau de réservation n’est publié sur cette version du site. Votre e-mail est une demande : seule l’équipe de l’école peut proposer une date et confirmer le rendez-vous.']} />
      <ReviewNote title="Avant de choisir une date">Les journées portes ouvertes publiques et la réservation en ligne ne sont pas annoncées comme disponibles. Pour commencer votre dossier, consultez le parcours d’admission.</ReviewNote>
      <LinkList items={[{label:'Comprendre les admissions',href:'/admissions/comprendre'},{label:'Candidater en ligne',href:'/admissions/candidater'}]} />
    </PageSection>
    <PageSection title="Préparer votre demande" id="demande" tone="paper">
      <ContactComposer recipients={campusContactRecipients} initialCampus={campus} initialSubject="Demander une visite" context="visit" />
    </PageSection>
    <PageSection title="Joindre directement le campus">
      <LinkList items={migratedCampuses.flatMap(item => item.contacts.map(service => ({ label: `${item.city} — ${service.label}`, href: `mailto:${service.email}?subject=${encodeURIComponent('Demande de visite')}`, description: service.email })))} />
    </PageSection>
  </>
}
