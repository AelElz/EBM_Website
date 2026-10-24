import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import { site } from './site'
import type { ImageAsset, LinkItem } from './types'

/*
 * Espace Eduka page (/espace-eduka), Ayoub's request of 24 Oct 2026: a login page in the EBM
 * design, reached from the header's person icon.
 *
 * Families sign in on Eduka itself. The page has no e-mail or password field on purpose: Eduka's
 * sign-in (ecolebelge.eduka.school/login) is protected by its own anti-forgery token, so a form
 * here could not log anyone in, and the brief forbids handling Eduka credentials or inventing
 * Eduka authentication (docs/BRIEF.md, sections 4 and 5). The button hands off to Eduka's page.
 * The help texts repeat what Eduka's own sign-in page offers (checked 24 Oct 2026).
 */

export interface EdukaHelp {
  icon: 'password' | 'family' | 'help'
  title: string
  text: string
  link?: LinkItem
}

export const espaceEduka = {
  seo: {
    title: 'Espace Eduka',
    description: `Connexion à l’Espace Eduka, le portail des familles des ${site.name}.`,
  },

  label: 'Espace Eduka',
  /** Mixed heading: words between asterisks are set in Playfair italic. */
  title: 'Connexion à votre *espace famille*',
  text: `Le portail des familles des ${site.name}. Connectez-vous avec l’adresse e-mail et le mot de passe de votre compte Eduka.`,
  login: { label: 'Se connecter', href: site.eduka.loginUrl },
  /** Under the button, with the address to check before typing a password. */
  secureNote: `Vous allez être dirigé vers la page de connexion sécurisée d’Eduka${NNBSP}:`,

  help: [
    {
      icon: 'password',
      title: 'Mot de passe oublié ou nouvelle adresse e-mail',
      text: `Sur la page de connexion Eduka, suivez le lien «${NNBSP}Cliquez ici${NNBSP}» pour récupérer l’accès à votre compte.`,
    },
    {
      icon: 'family',
      title: 'Nouvelle famille',
      text: `Vous n’avez pas encore de compte et souhaitez inscrire vos enfants${NNBSP}?`,
      link: { label: 'Candidater en ligne', href: routes.candidater },
    },
    {
      icon: 'help',
      title: 'Besoin d’aide',
      text: 'Le secrétariat de votre campus vous répond.',
      link: { label: 'Nous contacter', href: routes.contact },
    },
  ] satisfies EdukaHelp[],

  /** The photo side: what families follow in Eduka (docs/BRIEF.md, "Keep ... in Eduka"). */
  side: {
    label: site.name,
    title: 'Toute la scolarité, *au même endroit.*',
    points: [
      'Le dossier de candidature et son suivi',
      'Les décisions d’admission et l’inscription',
      'La facturation',
    ],
    image: {
      src: '/images/hero-rabat-entree.jpg',
      alt: '',
      width: 2400,
      height: 1600,
      position: '50% 50%',
    } satisfies ImageAsset,
  },
}
