import { campusList } from '@/content/campuses'
import { site, type PostalAddress } from '@/content/site'

/*
 * schema.org JSON-LD for the home page (docs/HOME-SPEC.md, SEO): the network as an
 * EducationalOrganization and each campus as a School. Facts come only from src/content/site.ts
 * (names, addresses, phones, e-mails, Instagram); campus names and routes from campuses.ts.
 * Nothing here promises a rich result.
 */

type JsonLdNode = Record<string, unknown>

const absoluteUrl = (path: string) => new URL(path, site.url).toString()

const ORGANIZATION_ID = absoluteUrl('/#organisation')

function postalAddress(address: PostalAddress): JsonLdNode {
  return {
    '@type': 'PostalAddress',
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    ...(address.postalCode ? { postalCode: address.postalCode } : {}),
    addressCountry: address.addressCountry,
  }
}

export function homeJsonLd(): JsonLdNode {
  const schools: JsonLdNode[] = campusList.map((campus) => ({
    '@type': 'School',
    '@id': absoluteUrl(`${campus.route}#ecole`),
    name: `${site.name}, ${campus.name}`,
    url: absoluteUrl(campus.route),
    address: postalAddress(campus.address),
    telephone: campus.phone.display,
    email: campus.emails.map((email) => email.address),
    sameAs: [site.instagram.url],
    parentOrganization: { '@id': ORGANIZATION_ID },
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': ORGANIZATION_ID,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl('/'),
        logo: absoluteUrl(site.logos.stacked.src),
        description: site.statement,
        sameAs: [site.instagram.url],
        subOrganization: schools.map((school) => ({ '@id': school['@id'] })),
      },
      ...schools,
    ],
  }
}

/** JSON for a <script type="application/ld+json">; `<` is escaped so content can never close the tag. */
export function serializeJsonLd(data: JsonLdNode): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
