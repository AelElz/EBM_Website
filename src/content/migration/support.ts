export interface SupportSection { id: string; title: string; paragraphs: string[]; review?: string }
export interface SupportContent { title: string; intro: string; path: string; notice?: string; sections: SupportSection[] }

export const recruitmentContent: SupportContent = {
  title: 'Rejoindre nos équipes', path: '/recrutement',
  intro: 'Participer au projet éducatif des Écoles Belges au Maroc, à Casablanca ou à Rabat.',
  sections: [
    { id: 'projet', title: 'Un projet éducatif commun', paragraphs: ['Les EBM réunissent des équipes autour de l’enseignement belge francophone, de la progression des élèves et du dialogue avec les familles. Découvrez le réseau et son projet pédagogique avant de prendre contact.'] },
    { id: 'opportunites', title: 'Connaître les opportunités', paragraphs: ['Cette version ne présente pas de catalogue d’offres validées. Pour connaître les postes ouverts et la procédure de candidature actuelle, demandez au secrétariat du campus de vous orienter vers le bon interlocuteur.'], review: 'EBM doit fournir les offres actualisées, leur date, le campus, les critères et le canal de candidature. Les anciennes annonces génériques ne sont pas reprises.' },
    { id: 'candidature', title: 'Prendre contact', paragraphs: ['Aucun dossier professionnel n’est déposé sur ce site. Contactez l’établissement pour connaître les pièces à préparer et l’adresse de candidature appropriée. Aucun délai de réponse ou poste disponible n’est présumé.'] },
  ],
}
