export interface SupportSection { id: string; title: string; paragraphs: string[]; review?: string }
export interface SupportContent { title: string; intro: string; path: string; notice?: string; sections: SupportSection[] }

export const legalDraft: SupportContent = {
  title: 'Mentions légales', path: '/mentions-legales',
  intro: 'Les informations sur l’éditeur et les responsables du site des Écoles Belges au Maroc.',
  notice: 'Document de travail à valider par EBM avant publication. Les informations juridiques manquantes sont identifiées ci-dessous.',
  sections: [
    { id: 'editeur', title: 'Éditeur du site', paragraphs: ['Ce site présente les Écoles Belges au Maroc et leurs campus de Casablanca, à Dar Bouazza, et de Rabat, à Hay Riad. Les coordonnées des établissements figurent sur la page Contact.'], review: 'À fournir par EBM : raison sociale de l’entité éditrice, forme juridique, siège, références d’immatriculation et directeur de la publication.' },
    { id: 'hebergement', title: 'Hébergement et exploitation', paragraphs: ['Cette version est une version locale de travail. Les informations de l’hébergeur et du responsable d’exploitation de la future version publique devront correspondre aux contrats effectivement souscrits.'], review: 'À confirmer : hébergeur contractuel, coordonnées, lieu d’hébergement et interlocuteur technique. Le choix prévu de Vercel ne constitue pas une publication effective.' },
    { id: 'contenus', title: 'Textes, images et documents', paragraphs: ['Les textes de présentation ont été adaptés à partir des publications des EBM. Les photographies et les logos proviennent des éléments fournis pour le projet. Les calendriers et documents d’archive sont identifiés dans leur contexte.'], review: 'À valider : droits d’utilisation sur le web, autorisations concernant les photographies d’élèves, licence web Avenir Next et conditions de réutilisation des documents.' },
    { id: 'services', title: 'Services et liens externes', paragraphs: ['La candidature et le suivi du dossier sont orientés vers le portail Eduka. Les liens d’itinéraire, réseaux sociaux et lecteurs vidéo conduisent à des services tiers. Les demandes préparées par e-mail sont envoyées depuis la messagerie du visiteur, après sa vérification.'], review: 'Les conditions de responsabilité, d’accès et de disponibilité restent à approuver par l’éditeur.' },
  ],
}

export const privacyDraft: SupportContent = {
  title: 'Politique de confidentialité', path: '/confidentialite',
  intro: 'Comprendre les usages de données prévus par le site et les informations qui restent à valider.',
  notice: 'Version de revue, non validée comme politique juridique définitive. EBM doit confirmer les responsables, prestataires, finalités et règles applicables avant publication.',
  sections: [
    { id: 'site-public', title: 'La consultation du site', paragraphs: ['Les pages publiques présentent le réseau, ses campus et les admissions. Cette version ne propose pas de formulaire de dépôt de dossier scolaire sur le site. Les filtres, la recherche et les choix de campus servent à consulter les informations disponibles.'], review: 'À confirmer avant mise en ligne : journaux techniques, mesures de fréquentation, durées de conservation et éventuels prestataires d’analyse.' },
    { id: 'messages', title: 'Préparer un message', paragraphs: ['L’outil de contact prépare un lien vers votre messagerie. Le texte saisi n’est pas envoyé par le site ni enregistré dans une base du site. Vous choisissez de l’envoyer dans votre application de messagerie. Évitez les documents d’identité et les pièces scolaires dans une première demande de renseignements.'], review: 'EBM doit préciser les conditions de traitement, destinataires et durées de conservation des messages ensuite reçus par ses services.' },
    { id: 'eduka', title: 'Candidatures et espace famille', paragraphs: ['La candidature se poursuit sur le service Eduka, dans un espace distinct. Les identifiants et documents ne sont pas demandés dans les pages publiques de ce site. Consultez les informations de protection des données présentées par EBM et Eduka dans le parcours concerné.'], review: 'À valider avec EBM : responsable du traitement, sous-traitants, accès aux dossiers, hébergement et règles de conservation.' },
    { id: 'tiers', title: 'Vidéos et services tiers', paragraphs: ['Le lecteur vidéo de la page d’accueil peut charger YouTube lorsque sa section entre dans l’écran. Les liens vers les réseaux sociaux, Google Maps et Eduka ouvrent des services qui disposent de leurs propres règles. Le chargement de contenus tiers doit être pris en compte dans le dispositif de consentement de la version publique.'], review: 'Inventaire final des traceurs, règles de consentement et modalités de refus à établir avec EBM. Aucun dispositif de conformité ne doit être déduit de ce document de travail.' },
    { id: 'droits', title: 'Vos demandes et vos droits', paragraphs: ['Pour identifier le bon interlocuteur au sein du réseau, utilisez les coordonnées des campus sur la page Contact. La version définitive indiquera la procédure et le contact dédiés aux demandes concernant les données personnelles.'], review: 'À fournir : contact du responsable, procédure d’exercice des droits, mentions requises par la loi 09-08 et références CNDP applicables, après validation compétente.' },
  ],
}

export const recruitmentContent: SupportContent = {
  title: 'Rejoindre nos équipes', path: '/recrutement',
  intro: 'Participer au projet éducatif des Écoles Belges au Maroc, à Casablanca ou à Rabat.',
  sections: [
    { id: 'projet', title: 'Un projet éducatif commun', paragraphs: ['Les EBM réunissent des équipes autour de l’enseignement belge francophone, de la progression des élèves et du dialogue avec les familles. Découvrez le réseau et son projet pédagogique avant de prendre contact.'] },
    { id: 'opportunites', title: 'Connaître les opportunités', paragraphs: ['Cette version ne présente pas de catalogue d’offres validées. Pour connaître les postes ouverts et la procédure de candidature actuelle, demandez au secrétariat du campus de vous orienter vers le bon interlocuteur.'], review: 'EBM doit fournir les offres actualisées, leur date, le campus, les critères et le canal de candidature. Les anciennes annonces génériques ne sont pas reprises.' },
    { id: 'candidature', title: 'Prendre contact', paragraphs: ['Aucun dossier professionnel n’est déposé sur ce site. Contactez l’établissement pour connaître les pièces à préparer et l’adresse de candidature appropriée. Aucun délai de réponse ou poste disponible n’est présumé.'] },
  ],
}
