import { routes } from '@/lib/routes'
import { NNBSP } from '@/lib/typography'

import { site } from './site'

/*
 * The legal pages (30 Oct 2026, Ayoub: "the big 3: terms and conditions, security and privacy,
 * and cookies"), plus Mentions légales in the same layout (components/legal/legal-page.tsx).
 *
 * Written for Morocco: loi 09-08 on personal data (rights of access, rectification and
 * opposition, articles 7 to 9), the CNDP as the authority, loi 2-00 on copyright. Every
 * statement about the site describes what the code really does (audit of 30 Oct 2026): no
 * visitor cookies of its own, no audience measurement, no advertising; a sessionStorage key for
 * the intro; the home video player from youtube-nocookie.com, loaded when the video enters the
 * screen unless the visitor chose click-to-play (`ebm-videos` in localStorage, set on /cookies);
 * the Payload admin's login cookie for EBM staff only; security headers in next.config.ts.
 * Facts only EBM can give are listed in each page's `missing`, shown in a marked box, never
 * invented. To be reviewed by EBM's legal adviser before going live.
 *
 * Inline markup in paragraphs: **bold** and [label](href).
 */

export type LegalBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } }

export interface LegalSection {
  id: string
  title: string
  blocks: LegalBlock[]
}

export interface LegalDocument {
  slug: 'conditions' | 'confidentialite' | 'cookies' | 'mentions'
  path: string
  /** Name in the tabs between the legal pages and in the footer. */
  short: string
  title: string
  intro: string
  sections: LegalSection[]
  /** Facts EBM must provide before the site goes live. */
  missing?: string[]
}

export const LEGAL_UPDATED = { label: '30 octobre 2026', iso: '2026-10-30' }

const colon = `${NNBSP}:`

export const termsOfUse: LegalDocument = {
  slug: 'conditions',
  path: routes.conditions,
  short: 'Conditions d’utilisation',
  title: 'Conditions d’utilisation',
  intro: 'Les règles d’utilisation du site des Écoles Belges au Maroc : ce que vous y trouvez, ce que nous garantissons et ce que nous vous demandons.',
  sections: [
    {
      id: 'objet',
      title: 'Objet',
      blocks: [
        `Les présentes conditions encadrent l’utilisation du site des Écoles Belges au Maroc (« EBM »), qui présente le réseau et ses deux campus, à Casablanca (Dar Bouazza) et à Rabat (Hay Riad). En naviguant sur le site, vous acceptez ces conditions.`,
        `Les informations sur l’éditeur figurent dans les [mentions légales](${routes.mentionsLegales}).`,
      ],
    },
    {
      id: 'acces',
      title: 'Accès au site',
      blocks: [
        'Le site est accessible gratuitement, sans compte ni inscription. Nous faisons le nécessaire pour qu’il reste disponible, mais il peut être interrompu pour maintenance, mise à jour ou incident technique, sans préavis.',
        'Le matériel, la connexion et les frais d’accès à internet restent à votre charge.',
      ],
    },
    {
      id: 'informations',
      title: 'Les informations publiées',
      blocks: [
        'Les contenus du site (programmes, calendrier scolaire, frais, conditions d’admission) sont fournis à titre d’information. Ils peuvent évoluer d’une année à l’autre.',
        { list: [
          `Le **calendrier scolaire** reprend le document officiel de l’année${colon} les dates des fêtes lunaires sont estimées et confirmées par l’école.`,
          `Les **frais** publiés sont indicatifs${colon} le campus confirme les montants et les modalités applicables à votre situation.`,
          `Une **candidature** ne vaut pas admission${colon} la décision relève de la commission d’admission, après les étapes prévues avec l’école.`,
          `Une **demande de visite** envoyée depuis le site est une demande${colon} seule l’équipe du campus fixe et confirme un rendez-vous.`,
        ] },
        'En cas de différence, les documents remis par l’école et les informations confirmées par le campus font foi.',
      ],
    },
    {
      id: 'services-tiers',
      title: 'Eduka et les autres services',
      blocks: [
        `La candidature en ligne et l’espace famille se trouvent sur **Eduka** (${site.eduka.host}), un service distinct du site, avec ses propres conditions. Le site ne vous demande jamais votre mot de passe Eduka.`,
        'Le site renvoie aussi vers YouTube, Google Maps, Facebook et Instagram. Ces services appliquent leurs propres conditions et leur propre politique de données dès que vous les utilisez.',
      ],
    },
    {
      id: 'usage',
      title: 'Ce que nous vous demandons',
      blocks: [
        'Vous vous engagez à utiliser le site de façon loyale et conforme à la loi. Il est notamment interdit de :',
        { list: [
          'tenter d’accéder sans autorisation à l’espace d’administration ou aux systèmes du site ;',
          'perturber son fonctionnement, par exemple par des requêtes automatisées en grand nombre ;',
          'reproduire ou détourner ses contenus en dehors des cas prévus ci-dessous ;',
          'envoyer aux écoles des contenus illicites, trompeurs ou portant atteinte à des tiers.',
        ] },
      ],
    },
    {
      id: 'propriete',
      title: 'Propriété intellectuelle',
      blocks: [
        'Les textes, photographies, logos, vidéos et documents du site appartiennent aux EBM ou à leurs auteurs, et sont protégés par la loi n° 2-00 relative aux droits d’auteur et droits voisins.',
        'Vous pouvez consulter le site et citer de courts extraits en indiquant la source. Toute autre reproduction ou diffusion demande l’accord préalable des EBM. Les photographies d’élèves ne peuvent en aucun cas être réutilisées.',
        `Pour demander une autorisation ou le retrait d’une photographie, [écrivez au campus concerné](${routes.contact}).`,
      ],
    },
    {
      id: 'liens',
      title: 'Liens',
      blocks: [
        'Vous pouvez créer un lien vers le site, à condition qu’il s’ouvre dans une page distincte et ne laisse pas croire à un partenariat. Les EBM peuvent demander le retrait d’un lien.',
        'Les liens du site vers d’autres sites sont proposés pour vous faciliter la tâche. Les EBM ne sont pas responsables de leurs contenus.',
      ],
    },
    {
      id: 'responsabilite',
      title: 'Responsabilité',
      blocks: [
        'Les EBM veillent à l’exactitude des informations publiées et à la sécurité du site, sans pouvoir garantir l’absence d’erreur ou d’interruption. Leur responsabilité ne peut être engagée pour un dommage indirect lié à l’utilisation du site ou à l’impossibilité d’y accéder.',
        `Si vous constatez une erreur, [signalez-la au campus](${routes.contact})${colon} nous la corrigeons au plus vite.`,
      ],
    },
    {
      id: 'donnees',
      title: 'Données personnelles et cookies',
      blocks: [
        `Ce que le site traite comme données, et comment, est expliqué dans [Confidentialité et sécurité](${routes.confidentialite}). Les traceurs et vos choix sont décrits dans [Cookies](${routes.cookies}).`,
      ],
    },
    {
      id: 'modifications',
      title: 'Modifications et droit applicable',
      blocks: [
        'Ces conditions peuvent être mises à jour. La date de la dernière version figure en haut de la page.',
        'Elles sont soumises au droit marocain. En cas de désaccord, une solution amiable est recherchée en priorité, avant toute action devant les tribunaux compétents du Royaume du Maroc.',
      ],
    },
  ],
  missing: [
    'La raison sociale de l’entité éditrice du site (reprise des mentions légales).',
    'Le tribunal compétent, si EBM souhaite en désigner un précisément.',
  ],
}

export const privacyAndSecurity: LegalDocument = {
  slug: 'confidentialite',
  path: routes.confidentialite,
  short: 'Confidentialité et sécurité',
  title: 'Confidentialité et sécurité',
  intro: 'Ce que le site sait de vous, ce qu’il en fait et comment il est protégé. En bref : le site collecte le moins possible, ne vous suit pas et ne vend rien.',
  sections: [
    {
      id: 'en-bref',
      title: 'L’essentiel',
      blocks: [
        { list: [
          'Pas de compte, pas d’inscription à une lettre d’information, pas de mesure d’audience, pas de publicité.',
          'Les outils de contact et de demande de visite préparent un e-mail dans votre propre messagerie : le site n’envoie et ne conserve rien.',
          'La candidature et l’espace famille sont sur Eduka : le site ne vous demande jamais de mot de passe ni de document.',
          'Le site est protégé par une connexion chiffrée (HTTPS) et des règles de sécurité appliquées à chaque page.',
        ] },
      ],
    },
    {
      id: 'responsable',
      title: 'Qui est responsable',
      blocks: [
        `Le responsable du traitement est l’entité qui édite le site des Écoles Belges au Maroc, présentée dans les [mentions légales](${routes.mentionsLegales}). Le traitement des données est encadré par la loi n° 09-08 relative à la protection des personnes physiques à l’égard du traitement des données à caractère personnel.`,
      ],
    },
    {
      id: 'donnees',
      title: 'Ce que le site traite',
      blocks: [
        { table: {
          head: ['Quand', 'Quelles données', 'Pourquoi'],
          rows: [
            ['Vous consultez une page', 'Adresse IP, date, page demandée, navigateur (journaux techniques de l’hébergeur)', 'Faire fonctionner le site et le protéger contre les abus'],
            ['Vous utilisez la recherche, les filtres ou le calendrier', 'Vos choix, le temps de la page', 'Afficher les bonnes informations ; rien n’est associé à votre identité'],
            ['Vous préparez un message ou une demande de visite', 'Rien n’est envoyé au site', 'Le message part de votre messagerie, après votre vérification'],
            ['Vous écrivez à un campus', 'Votre e-mail et son contenu, reçus par le service choisi', 'Vous répondre et suivre votre demande'],
            ['Vous candidatez ou ouvrez votre espace famille', 'Données saisies sur Eduka, pas sur ce site', 'Instruire la candidature, suivre la scolarité'],
          ],
        } },
        'Le site ne collecte pas de données sensibles. Dans une première demande, n’envoyez ni pièce d’identité ni dossier scolaire : le campus vous dira quoi transmettre, et par quel moyen.',
      ],
    },
    {
      id: 'destinataires',
      title: 'Qui y a accès',
      blocks: [
        'Seuls les services concernés des EBM (secrétariats, admissions, directions) lisent les messages qui leur sont adressés. L’hébergeur du site traite les journaux techniques pour son fonctionnement. Les données de candidature sont traitées par les EBM sur Eduka.',
        'Les EBM ne vendent ni ne louent aucune donnée, et ne les utilisent pas à des fins publicitaires.',
      ],
    },
    {
      id: 'conservation',
      title: 'Combien de temps',
      blocks: [
        'Les journaux techniques sont conservés pour une durée limitée, fixée avec l’hébergeur, puis supprimés. Les messages reçus par les campus sont conservés le temps nécessaire pour répondre et suivre la demande. Les dossiers de candidature suivent les règles de conservation des EBM.',
      ],
    },
    {
      id: 'securite',
      title: 'Comment le site est protégé',
      blocks: [
        { list: [
          `**Connexion chiffrée.** Toutes les pages sont servies en HTTPS ; le navigateur est invité à n’utiliser que cette connexion${colon} HSTS.`,
          '**Pas de mot de passe sur ce site.** Les familles se connectent uniquement sur Eduka ; le site se contente d’y conduire.',
          '**Pages protégées.** Le site ne peut pas être affiché à l’intérieur d’un autre site, les fichiers sont servis avec leur type exact, et les adresses visitées ne sont pas transmises en détail aux sites externes.',
          '**Administration réservée.** Seul le personnel autorisé des EBM accède à l’espace de gestion des contenus, avec un compte personnel.',
          '**Le moins de données possible.** Ce qui n’est pas collecté ne peut pas fuiter : c’est le premier principe du site.',
        ] },
      ],
    },
    {
      id: 'vigilance',
      title: 'Restez vigilant',
      blocks: [
        `Les EBM ne vous demanderont jamais votre mot de passe par e-mail, par téléphone ou par message. Avant de vous connecter, vérifiez l’adresse${colon} **${site.eduka.host}**.`,
        `Un message suspect au nom des EBM ? Ne cliquez pas sur ses liens et [prévenez le campus](${routes.contact}).`,
      ],
    },
    {
      id: 'droits',
      title: 'Vos droits',
      blocks: [
        'Conformément à la loi n° 09-08, vous disposez :',
        { list: [
          'd’un **droit d’accès** aux données qui vous concernent (article 7) ;',
          'd’un **droit de rectification** si elles sont inexactes ou incomplètes (article 8) ;',
          'd’un **droit d’opposition**, pour un motif légitime, et sans frais pour la prospection (article 9).',
        ] },
        `Pour exercer ces droits, [écrivez au campus concerné](${routes.contact}) en précisant votre demande. Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la Commission nationale de contrôle de la protection des données à caractère personnel ([CNDP](https://www.cndp.ma)).`,
      ],
    },
    {
      id: 'enfants',
      title: 'Les enfants',
      blocks: [
        `Le site s’adresse aux parents et aux futurs élèves accompagnés de leurs parents. Pour toute question sur une photographie publiée, ou pour en demander le retrait, [écrivez au campus](${routes.contact})${colon} la demande est traitée rapidement.`,
      ],
    },
    {
      id: 'modifications',
      title: 'Mises à jour',
      blocks: ['Cette page évolue avec le site. La date de la dernière version figure en haut de la page.'],
    },
  ],
  missing: [
    'L’identité complète du responsable du traitement (raison sociale, adresse du siège).',
    'Une adresse dédiée aux demandes sur les données personnelles, si EBM en ouvre une (sinon, les contacts des campus).',
    'Les références de déclaration ou d’autorisation auprès de la CNDP.',
    'Les durées de conservation : journaux de l’hébergeur, messages reçus par les campus, dossiers de candidature.',
    'L’hébergeur retenu pour la version publique et le pays d’hébergement.',
  ],
}

export const cookiesPolicy: LegalDocument = {
  slug: 'cookies',
  path: routes.cookies,
  short: 'Cookies',
  title: 'Cookies',
  intro: 'Le site ne dépose aucun cookie publicitaire ni de mesure d’audience. Voici, en toute transparence, le peu qu’il enregistre dans votre navigateur, et vos choix.',
  sections: [
    {
      id: 'definition',
      title: 'De quoi parle-t-on',
      blocks: [
        'Un cookie est un petit fichier enregistré par votre navigateur quand vous visitez un site. D’autres techniques proches, comme le stockage local, servent au même usage : se souvenir d’une information d’une page à l’autre.',
      ],
    },
    {
      id: 'utilises',
      title: 'Ce que le site enregistre',
      blocks: [
        { table: {
          head: ['Nom', 'À quoi il sert', 'Durée', 'Déposé par'],
          rows: [
            ['ebm-intro-seen', 'Ne montrer l’animation d’ouverture qu’une fois par visite', 'Jusqu’à la fermeture de l’onglet', 'Le site (stockage de session)'],
            ['ebm-videos', 'Retenir votre choix pour les vidéos (ci-dessous), si vous en faites un', 'Jusqu’à ce que vous le changiez', 'Le site (stockage local)'],
            ['Lecteur YouTube', 'Lire la vidéo de la page d’accueil', 'Selon les règles de YouTube', 'YouTube (Google), mode « confidentialité renforcée »'],
          ],
        } },
        'Ces deux enregistrements du site ne contiennent aucune donnée personnelle et ne servent qu’à son fonctionnement. Le site ne dépose aucun cookie de mesure d’audience, de publicité ou de réseau social.',
        'Le personnel des EBM qui se connecte à l’espace d’administration reçoit un cookie de connexion. Il ne concerne pas les visiteurs.',
      ],
    },
    {
      id: 'videos',
      title: 'La vidéo YouTube',
      blocks: [
        'La vidéo de la page d’accueil est lue par YouTube, en mode « confidentialité renforcée » (youtube-nocookie.com). Par défaut, le lecteur se charge quand la vidéo apparaît à l’écran, puis démarre sans le son. YouTube reçoit alors votre adresse IP et des informations techniques, et peut enregistrer des données dans votre navigateur selon ses propres règles.',
        'Si vous préférez, le lecteur peut ne se charger que lorsque vous appuyez sur « Lire » : choisissez-le ci-dessous. Si les animations sont réduites sur votre appareil, c’est déjà le cas.',
      ],
    },
    {
      id: 'liens',
      title: 'Les liens vers d’autres sites',
      blocks: [
        'Les liens vers Eduka, Google Maps, Facebook et Instagram ouvrent ces services. Ils ne déposent rien tant que vous ne cliquez pas ; une fois sur leur site, leurs propres règles s’appliquent.',
      ],
    },
    {
      id: 'navigateur',
      title: 'Gérer depuis votre navigateur',
      blocks: [
        'Vous pouvez aussi consulter et supprimer les cookies et données de site dans les réglages de votre navigateur (rubrique « Confidentialité » ou « Données de navigation »). Le site fonctionne sans eux ; seule l’animation d’ouverture réapparaîtra.',
        `Pour le reste de vos données, voir [Confidentialité et sécurité](${routes.confidentialite}).`,
      ],
    },
  ],
  missing: [
    'La validation, par le conseil juridique d’EBM, du chargement automatique de la vidéo YouTube à l’affichage, ou le choix de ne la charger qu’au clic pour tous les visiteurs.',
  ],
}

export const legalNotice: LegalDocument = {
  slug: 'mentions',
  path: routes.mentionsLegales,
  short: 'Mentions légales',
  title: 'Mentions légales',
  intro: 'Qui édite et héberge le site des Écoles Belges au Maroc.',
  sections: [
    {
      id: 'editeur',
      title: 'Éditeur du site',
      blocks: [
        `Ce site présente les Écoles Belges au Maroc et leurs campus de Casablanca, à Dar Bouazza, et de Rabat, à Hay Riad. Les coordonnées des établissements figurent sur la page [Contact](${routes.contact}).`,
      ],
    },
    {
      id: 'hebergement',
      title: 'Hébergement',
      blocks: ['Les informations sur l’hébergeur de la version publique du site seront indiquées ici à sa mise en ligne.'],
    },
    {
      id: 'contenus',
      title: 'Textes, images et documents',
      blocks: [
        'Les textes de présentation sont adaptés des publications des EBM. Les photographies et les logos proviennent des éléments fournis par les EBM. Les calendriers et documents d’archive sont identifiés dans leur contexte.',
        `Leur réutilisation est encadrée par les [conditions d’utilisation](${routes.conditions}).`,
      ],
    },
    {
      id: 'services',
      title: 'Services et liens externes',
      blocks: [
        'La candidature et le suivi du dossier se font sur le portail Eduka. Les liens d’itinéraire, les réseaux sociaux et le lecteur vidéo conduisent à des services tiers. Les demandes préparées par e-mail partent de la messagerie du visiteur, après sa vérification.',
      ],
    },
  ],
  missing: [
    'La raison sociale de l’entité éditrice, sa forme juridique, son siège et ses références d’immatriculation.',
    'Le nom du directeur de la publication.',
    'L’hébergeur de la version publique : nom, adresse et lieu d’hébergement.',
    'Les droits d’utilisation sur le web des photographies (dont celles d’élèves) et la licence web de la police Avenir Next.',
  ],
}

/** In the tabs and the footer, in this order. */
export const legalDocuments: LegalDocument[] = [termsOfUse, privacyAndSecurity, cookiesPolicy, legalNotice]
