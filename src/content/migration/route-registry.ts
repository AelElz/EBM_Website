/** Review content is complete enough to inspect, not implicitly approved for publication. */
export const migrationPages = [
  {slug:'le-reseau',route:'/le-reseau',title:'Le réseau EBM',description:'L’histoire, les valeurs et le cadre belge des écoles de Casablanca et de Rabat.'},
  {slug:'pedagogie',route:'/pedagogie',title:'Pédagogie',description:'Les apprentissages, les langues et les diplômes, de la maternelle au secondaire.'},
  {slug:'ecole-du-dehors',route:'/ecole-du-dehors',title:'L’école du dehors',description:'Apprendre au contact de la nature sur le campus de Casablanca.'},
  {slug:'grandir-aux-ebm',route:'/grandir-aux-ebm',title:'Grandir aux EBM',description:'Les activités, projets, services et repères de la vie scolaire.'},
  {slug:'nos-campus',route:'/nos-campus',title:'Nos campus',description:'Comparer Casablanca à Dar Bouazza et Rabat à Hay Riad, leurs services et leurs accès.'},
  {slug:'campus-casablanca',route:'/nos-campus/casablanca',title:'Campus de Casablanca',description:'Le campus de Dar Bouazza, ses espaces, ses services et ses contacts.'},
  {slug:'campus-rabat',route:'/nos-campus/rabat',title:'Campus de Rabat',description:'Le campus de Hay Riad, son histoire, ses espaces et ses contacts.'},
  {slug:'apres-les-ebm',route:'/apres-les-ebm',title:'Après les EBM',description:'CESS, orientation et poursuite d’études, avec des repères d’archives clairement datés.'},
  {slug:'admissions',route:'/admissions',title:'Admissions',description:'Les étapes, les conditions selon le niveau et les réponses aux questions des familles.'},
  {slug:'admissions-documents-et-frais',route:'/admissions/documents-et-frais',title:'Documents & frais',description:'Préparer les pièces du dossier et consulter les barèmes publiés, dont l’année reste à confirmer.'},
  {slug:'calendrier',route:'/calendrier',title:'Calendrier & visites',description:'Le calendrier scolaire 2026–2027 et la demande de visite auprès du campus.'},
  {slug:'admissions-candidater',route:'/admissions/candidater',title:'Candidater en ligne',description:'Préparer le dossier et poursuivre la candidature dans le formulaire officiel Eduka.'},
  {slug:'contact',route:'/contact',title:'Contact',description:'Les téléphones, e-mails et adresses des bons services à Casablanca et à Rabat.'},
] as const

export const contentReadiness = migrationPages.map(page => ({ ...page, status: 'review' as const, index: false }))
