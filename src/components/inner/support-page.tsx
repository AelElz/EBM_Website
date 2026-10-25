import { InnerHero, LinkList, PageActions, PageSection, ReviewNote, TextBlock } from '@/components/inner/blocks'
import type { SupportContent } from '@/content/migration/support'

export function SupportPage({ content }: { content: SupportContent }) {
  return <>
    <InnerHero title={content.title} intro={content.intro} />
    {content.notice && <PageSection><ReviewNote title="Version de revue">{content.notice}</ReviewNote></PageSection>}
    {content.sections.map((section, index) => <PageSection key={section.id} id={section.id} title={section.title} tone={index % 2 ? 'paper' : 'white'}><TextBlock paragraphs={section.paragraphs} />{section.review && <ReviewNote>{section.review}</ReviewNote>}</PageSection>)}
    {content.path === '/recrutement' && <PageSection title="Découvrir les EBM"><LinkList items={[{label:'Le réseau et ses valeurs',href:'/le-reseau'},{label:'Notre pédagogie',href:'/pedagogie'},{label:'Nos campus',href:'/nos-campus'}]} /></PageSection>}
    <PageActions title="Trouver le bon interlocuteur" text="Les coordonnées des services de Casablanca et de Rabat sont réunies sur la page Contact." primary={{label:'Contacter les EBM',href:'/contact'}} secondary={{label:'Plan du site',href:'/plan-du-site'}} />
  </>
}
