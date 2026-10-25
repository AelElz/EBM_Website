/** Review-build FAQ migration. Source provenance is retained; no FAQ JSON-LD is emitted. */
export interface AdmissionsFaq {
  id: string
  category: string
  question: string
  answer: string
  href?: string | null
  sourceUrl: string
  sourceAnchor?: string
  fetchedAt: string
  status: 'published-source' | 'needs-confirmation'
  notes: string[]
}
export const admissionsFaqs: AdmissionsFaq[] = [
  {
    "id": "faq-01",
    "category": "Pédagogie et diplômes",
    "question": "Qu’est-ce que l’enseignement belge francophone ?",
    "answer": "L’enseignement belge francophone est un système éducatif public officiel, défini et structuré par la Fédération Wallonie-Bruxelles (Autorité belge francophone). Il s’inscrit dans le paysage des grands systèmes éducatifs européens. Il représente un système international reconnu, qui forme depuis des générations, des élèves poursuivant des études supérieures en Belgique et à l’international. Comme tout système d’enseignement, il repose sur deux piliers fondamentaux : des programmes d’enseignement officiels, définissant les contenus à apprendre à chaque niveau une méthodologie pédagogique, c’est-à-dire la manière dont ces contenus sont transmis et construits avec les élèves. Les contenus sont communs à tous les grands systèmes éducatifs, la différence se situe dans la manière d’enseigner.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab326676_1",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-02",
    "category": "Pédagogie et diplômes",
    "question": "En quoi le système belge est-il différent des autres systèmes internationaux ?",
    "answer": "Les grands systèmes éducatifs internationaux partagent des fondements communs : ils transmettent les mêmes savoirs essentiels et préparent les élèves à poursuivre des études supérieures. Les connaissances enseignées, les compétences attendues et les objectifs de fin de cycle sont comparables entre systèmes éducatifs européens et internationaux. Les références académiques sont similaires. La différence entre les systèmes ne porte pas sur ce qui est enseigné, mais sur la manière dont les apprentissages sont organisés et transmis. La singularité du système belge se situe davantage dans son approche pédagogique. Le système belge francophone privilégie : la compréhension des notions plutôt que leur simple restitution, le raisonnement et la capacité à expliquer, la progression structurée des apprentissages dans la durée. Les notions sont construites, consolidées et réinvesties à travers une approche spiralaire.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab326676_2",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-03",
    "category": "Pédagogie et diplômes",
    "question": "Comment est le niveau académique à l’école belge ?",
    "answer": "Le niveau académique est pensé en lien direct avec les exigences des études supérieures. L’exigence académique s’inscrit dans une progression cohérente : les bases sont solidement construites dès les premières années, les notions sont approfondies progressivement, les exigences augmentent avec l’âge et la maturité des élèves. Dans nos écoles, nous maintenons un haut niveau d’attente en vue de préparer nos élèves non seulement à réussir leurs examens, mais surtout à réussir avec aisance leur parcours d’enseignement supérieur.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab326676_3",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-04",
    "category": "Pédagogie et diplômes",
    "question": "Le CESS est-il reconnu au Maroc ?",
    "answer": "Oui, le CESS est reconnu au Maroc. Le CESS (Certificat d’Enseignement Secondaire Supérieur) est le diplôme officiel de fin d’études secondaires de l’enseignement belge francophone. Il atteste que l’élève a achevé avec succès un parcours complet d’enseignement secondaire. Le CESS est délivré par nos écoles dans le cadre : d’un système éducatif officiel, encadré par une autorité éducative reconnue, d’établissements scolaires ouverts au Maroc et régis par un Accord bilatéral de coopération. Il ne s’agit ni d’un diplôme privé, ni d’un certificat interne à un établissement. Concrètement, cela signifie que le CESS délivré par nos écoles permet de poursuivre des études supérieures au Maroc, aussi bien dans l’enseignement public que privé. Comme pour tout diplôme étranger, certaines institutions peuvent demander une procédure administrative d’équivalence. Dans ce cas, nos services accompagnent nos lauréats dans la réalisation de cette démarche administrative.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231040",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-05",
    "category": "Pédagogie et diplômes",
    "question": "Le CESS est-il reconnu à l’international ?",
    "answer": "Oui. Le CESS offre des possibilités de poursuite d’études comparables à celles des autres diplômes officiels européens de fin d’enseignement secondaire. Comme pour les autres diplômes de fin de secondaire : certains établissements examinent les dossiers, certains imposent des conditions particulières, certaines filières sont sélectives. Le CESS s’inscrit pleinement dans ce fonctionnement international standard. Concrètement, le choix de l’enseignement belge ne ferme aucune porte. Il permet aux élèves de candidater en Belgique, au Maroc, au Canada, en France, au Royaume uni et plus largement à l’international, selon les règles propres à chaque établissement d’enseignement supérieur.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231042",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-06",
    "category": "Pédagogie et diplômes",
    "question": "Vers quels types d’études supérieures les élèves peuvent-ils s’orienter après le CESS ?",
    "answer": "Les élèves titulaires du CESS s’orientent vers des études supérieures variées, en fonction de leur projet personnel, de leur profil académique et des exigences des établissements choisis. Le diplôme ouvre les portes ; le projet et le parcours de l’élève déterminent ensuite les choix possibles.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231044",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-07",
    "category": "Pédagogie et diplômes",
    "question": "Le CESS permet-il l’accès aux grandes écoles et aux universités sélectives ?",
    "answer": "Oui. Le système belge francophone prépare les élèves à accéder à des filières sélectives, à condition que leur parcours académique, leurs résultats et leur projet personnel correspondent aux exigences de ces formations. Les filières sélectives attendent des élèves qu’ils disposent : de bases académiques solides, d’une grande capacité de raisonnement, d’autonomie dans le travail, de rigueur intellectuelle, et d’une méthodologie efficace.",
    "href": "/apres-les-ebm",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231046",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Unconfirmed medicine preparation announcement excluded."
    ]
  },
  {
    "id": "faq-08",
    "category": "Pédagogie et diplômes",
    "question": "Que se passe-t-il si un élève change de système scolaire en cours de parcours ?",
    "answer": "Changer de système scolaire en cours de parcours est une situation possible et vécue dans nos écoles avec plusieurs familles internationales. Les transitions entre systèmes éducatifs européens se font sans rupture. Un élève qui change de système ne découvre pas des apprentissages totalement nouveaux, mais retrouve des notions déjà abordées, parfois organisées différemment. Les éventuelles différences concernent surtout : l’ordre dans lequel certaines notions sont abordées, la manière de les approfondir, les méthodes pédagogiques utilisées. Ces écarts peuvent nécessiter un temps d’adaptation, mais ils ne constituent pas un obstacle structurel à la poursuite du parcours.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231048",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-09",
    "category": "Pédagogie et diplômes",
    "question": "Quelle est la philosophie pédagogique des écoles belges ?",
    "answer": "La pédagogie de l’enseignement belge francophone repose sur un principe central : apprendre en comprenant. Les programmes officiels définissent précisément ce que les élèves doivent maîtriser (connaissances, compétences, savoir-faire), tout en laissant aux enseignants la responsabilité de choisir les méthodes pédagogiques les plus adaptées pour y parvenir. La pédagogie dans nos écoles n’est pas une approche unique imposée mais un cadre méthodologique cohérent et réfléchi, fondé sur l’expérience de terrain et sur les sciences de l’éducation.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767953338447",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-10",
    "category": "Pédagogie et diplômes",
    "question": "Qu’entend-on par pédagogie active ?",
    "answer": "Par pédagogie active, on entend une manière d’enseigner dans laquelle l’élève n’est pas seulement récepteur, mais acteur de ses apprentissages. Concrètement, cela signifie que les élèves apprennent : en manipulant, en expérimentant et en observant, en résolvant des situations-problèmes, en mettant en lien ce qu’ils font avec ce qu’ils comprennent, en verbalisant leur raisonnement. La pédagogie active ne consiste pas à « faire à la place de l’élève », ni à laisser l’élève seul face à ses apprentissages. Elle repose sur des situations construites par l’enseignant avec des objectifs précis et un guidage progressif.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231053",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-11",
    "category": "Pédagogie et diplômes",
    "question": "Comment apprend-on concrètement dans les classes ?",
    "answer": "Dans nos écoles, les apprentissages s’appuient sur : des situations concrètes, proches du réel, des manipulations, expérimentations et mises en action, un travail progressif qui mène du concret vers l’abstrait. Concrètement en classe, les notions sont introduites par l’observation, l’expérience ou la résolution de problèmes et le raisonnement est construit étape par étape. Cette démarche permet aux élèves de comprendre ce qu’ils apprennent, de mieux mémoriser sur le long terme et de développer des compétences transférables (raisonner, analyser, structurer sa pensée).",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231055",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-12",
    "category": "Pédagogie et diplômes",
    "question": "Comment sont évalués les élèves ?",
    "answer": "Dans l’enseignement belge francophone, l’évaluation poursuit deux objectifs distincts, selon les moments du parcours scolaire. 1. Les évaluations formatives : elles servent à apprendre et progresser. Elles permettent à l’enseignant d’identifier ce qui est compris ou non. Les points de cette évaluation ne sont pas pris en compte dans le bulletin. Elles donnent des repères clairs à l’élève pour corriger, consolider et avancer. Ces évaluations sont fréquentes, surtout aux premières étapes de l’apprentissage. 2. Les évaluations certificatives : elles servent à valider officiellement les acquis. Elles portent sur des compétences et des connaissances déjà travaillées en classe. Elles comptent dans l’évaluation globale et sont prises en compte dans la décision de passage ou de certification. Elles sont organisées à des moments précis du parcours. L’évaluation prend en compte : la compréhension des notions, la capacité à raisonner, l’aptitude à appliquer les apprentissages dans des situations variées.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231057",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-13",
    "category": "Pédagogie et diplômes",
    "question": "Y a-t-il des devoirs à la maison ?",
    "answer": "À l’école fondamentale, les devoirs : sont limités en quantité, ont pour objectif de consolider ce qui a été compris en classe, ne visent pas à introduire de nouvelles notions. L’essentiel des apprentissages se fait en classe, avec l’accompagnement de l’enseignant. Les devoirs servent surtout à développer l’autonomie, installer des habitudes de travail et renforcer les acquis, sans surcharge. Au secondaire, le travail personnel augmente progressivement, afin de préparer les élèves : à organiser leur travail, à gérer leur temps, à répondre aux exigences de l’enseignement supérieur.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231059",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-14",
    "category": "Pédagogie et diplômes",
    "question": "L’exigence académique est-elle compatible avec un cadre bienveillant ?",
    "answer": "Exigence académique et bienveillance ne s’opposent pas : elles se complètent. L’exigence porte sur la maîtrise des apprentissages, la solidité des bases, la progression de chaque élève et le respect d’un cadre éducatif structuré. La bienveillance, quant à elle, se traduit par une attention portée à chaque enfant et des actions exclusivement fondées sur l’intérêt de l’enfant. Pour nous la bienveillance va de pair avec l’exigence académique permettant de former des élèves sérieux, confiants, solides, capables de s’engager durablement dans leurs apprentissages.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767181231061",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-15",
    "category": "Pédagogie et diplômes",
    "question": "Est-ce que tous vos enseignants sont diplômés et certifiés ?",
    "answer": "Oui. La qualification de nos enseignants n’est pas une option ni une promesse : c’est une obligation réglementaire qui s’applique à toutes les écoles d’enseignement belge francophone. Cette exigence s’applique à l’ensemble des niveaux, de la maternelle au secondaire, et concerne également les fonctions de coordination et de direction pédagogique. Nos enseignants sont formés en Belgique, au sein de l’enseignement supérieur belge, dans les filières qui préparent spécifiquement au métier d’enseignant. De ce fait, nos équipes pédagogiques sont expatriées de Belgique (hors professeurs de LCA, native speakers…). Ils maîtrisent les programmes officiels belges, mais aussi les méthodes pédagogiques qui y sont associées. Cette formation initiale est déterminante : elle ne porte pas uniquement sur ce qu’il faut enseigner, mais aussi sur comment les élèves apprennent, comment structurer les apprentissages, évaluer, accompagner et ajuster les pratiques.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845339",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-16",
    "category": "Pédagogie et diplômes",
    "question": "Qu’est-ce qui garantit le niveau de qualification des enseignants dans le temps ?",
    "answer": "Le niveau de qualification de nos enseignants ne repose pas sur un choix interne ou une promesse d’établissement. Il est encadré par un cadre réglementaire précis, propre à l’enseignement belge francophone. Concrètement : les titres et diplômes requis pour enseigner sont définis officiellement, ils sont vérifiés pour chaque enseignant, le respect de ces exigences est contrôlé.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845341",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-18",
    "category": "Pédagogie et diplômes",
    "question": "Quel est concrètement le rôle de la direction pédagogique au quotidien ?",
    "answer": "La direction pédagogique joue un rôle central dans le fonctionnement quotidien de l’école. Elle est responsable : de la cohérence pédagogique sur l’ensemble du parcours scolaire, du pilotage des pratiques d’enseignement, de l’accompagnement et du suivi des équipes enseignantes. Concrètement, la direction pédagogique : veille au respect des programmes officiels et du cadre éducatif, observe et évalue les pratiques de classe, accompagne les enseignants dans leur travail, assure une continuité pédagogique entre les niveaux et les sections. Elle constitue un point de référence pour les enseignants, mais aussi pour les familles, lorsqu’une question concerne le parcours scolaire ou l’organisation pédagogique.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845345",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-19",
    "category": "Vie scolaire et bien-être",
    "question": "Quel est le climat éducatif dans les écoles ?",
    "answer": "Dans nos écoles nous ciblons un climat rassurant et stimulant, propice aux apprentissages et au développement de la personne de chacun des élèves. Le climat éducatif de nos écoles repose sur un équilibre clair entre exigence, bienveillance et sécurité. Les équipes éducatives veillent à instaurer une atmosphère de confiance et de sérénité, tout en maintenant un cadre éducatif solide qui permet à chaque élève de se construire avec repères, exigence et stabilité.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098008",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-20",
    "category": "Vie scolaire et bien-être",
    "question": "Quelle place est donnée au respect, au cadre et aux règles ?",
    "answer": "Le respect, le cadre et les règles occupent une place centrale dans le fonctionnement de nos écoles. Les règles ne sont pas posées comme des contraintes arbitraires, mais comme des repères éducatifs qui permettent de sécuriser les élèves, de favoriser le vivre-ensemble, de créer des conditions propices aux apprentissages. Le respect concerne à la fois : le respect des adultes, le respect entre élèves, le respect de soi et du travail scolaire.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098010",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-21",
    "category": "Vie scolaire et bien-être",
    "question": "Comment sont gérées les situations de conflit ?",
    "answer": "La priorité est toujours de comprendre les faits, d’écouter les élèves concernés, de rétablir un climat serein et sécurisant. Selon la nature de la situation, la gestion du conflit reposera sur un dialogue encadré par un membre de l’équipe éducative ou sur des mesures éducatives en conformité avec notre règlement d’ordre intérieur. Lorsque la situation l’exige, les familles sont associées afin d’assurer une cohérence éducative entre l’école et le cadre familial.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098012",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-22",
    "category": "Vie scolaire et bien-être",
    "question": "Quelle relation entretenez-vous avec les parents ?",
    "answer": "Nous portons la conviction que la réussite scolaire d’un enfant repose sur une cohérence éducative entre l’école et la famille. Les parents sont donc considérés comme des partenaires essentiels du parcours scolaire de leur enfant. Notre relation avec les parents s’appuie sur : une communication régulière et transparente, des échanges formalisés avec les équipes éducatives, un cadre de collaboration respectueux des rôles de chacun. Les enseignants et les directions sont disponibles pour échanger lorsque cela est nécessaire, dans un esprit de dialogue constructif et centré sur l’intérêt de l’élève.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098014",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-25",
    "category": "Transport et cantine",
    "question": "Proposez-vous un service de restauration scolaire ?",
    "answer": "Oui. Chacune de nos écoles dispose d’un service de restauration scolaire opérationnel tous les jours de classe, à l’exception du mercredi, jour où les élèves n’ont pas cours l’après-midi. La restauration est assurée par un prestataire externe spécialisé, la société ProxyRest, qui prépare et sert des repas chauds. Les menus sont communiqués mensuellement aux parents. La cantine est un service facultatif, proposé sur inscription et payant directement auprès du prestataire. L’élève peut sinon apporter son repas de midi qu’il prendra au restaurant scolaire avec ses camarades, sous la surveillance de l’équipe éducative.",
    "href": "/grandir-aux-ebm#cantine",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098021",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-26",
    "category": "Transport et cantine",
    "question": "Proposez-vous un service de transport scolaire ?",
    "answer": "Oui, un service de transport scolaire peut être organisé dans nos écoles en réponse à la demande des familles. Actuellement, un service de transport scolaire est opérationnel à l’École belge de Casablanca. Il est assuré par un prestataire externe spécialisé, la société RUN RUN, qui traite directement avec les parents souhaitant y souscrire. Ce service est payant et contractualisé directement entre les familles et le prestataire. À l’École belge de Rabat, le transport scolaire n’est pas encore proposé, à la suite d’une consultation des familles indiquant qu’une majorité de parents n’y était pas intéressée.",
    "href": "/grandir-aux-ebm#transport",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098023",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-27",
    "category": "Transport et cantine",
    "question": "Proposez-vous des activités extrascolaires ?",
    "answer": "Oui. Nos écoles proposent un panel varié d’activités extrascolaires, destiné aux élèves de tous les âges, dés la maternelle. Les activités couvrent les domaines sportifs, artistiques et culturels. Cette diversité permet à chaque élève de trouver une activité en lien avec ses centres d’intérêt. Les activités extrascolaires ont lieu en fin de journée après les cours, ainsi que le mercredi après-midi. Elles sont animées aussi bien par des membres de l’équipe éducative que par des intervenants externes spécialisés. La participation aux activités extrascolaires est facultative, payante et se fait sur inscription, selon les modalités communiquées aux familles en début d’année scolaire.",
    "href": "/grandir-aux-ebm#activites",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098025",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-28",
    "category": "Vie scolaire et bien-être",
    "question": "Quels sont les horaires de la journée scolaire ?",
    "answer": "Les horaires dépendent du campus et du niveau. Les pages publiques présentent des heures de début différentes (8 h 20 ou 8 h 25, et 8 h 50 pour certaines classes de maternelle à Casablanca). Demandez à votre campus l’horaire exact de votre enfant, notamment le mercredi. Aucun horaire unique n’est garanti sur cette page.",
    "href": "/contact",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098027",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": [
      "Conflicting schedules retained as explicit confirmation requirement."
    ]
  },
  {
    "id": "faq-29",
    "category": "Vie scolaire et bien-être",
    "question": "Existe-t-il une garderie ou une étude encadrée avant ou après la classe ?",
    "answer": "Il n’existe pas d’étude encadrée au sens académique du terme. Une surveillance est prévue autour des heures de classe et une garderie payante peut la prolonger. Les horaires publiés diffèrent selon les sources : à Casablanca, la page du campus indique une garderie de 16 h à 17 h, tandis que la FAQ générale mentionne 18 h. Le campus confirme les horaires et les modalités applicables.",
    "href": "/contact",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098029",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": [
      "No generalised 18:00 childcare promise."
    ]
  },
  {
    "id": "faq-30",
    "category": "Vie scolaire et bien-être",
    "question": "Quel est le calendrier des vacances scolaires ?",
    "answer": "Le calendrier scolaire de nos écoles est aligné sur le calendrier officiel de l’enseignement belge francophone. Il est toutefois adapté au contexte local, en tenant compte des jours fériés au Maroc. Le calendrier détaillé est communiqué aux familles en début d’année scolaire, afin de leur permettre d’anticiper l’organisation familiale et les périodes de congés.",
    "href": "/calendrier",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767182098031",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-31",
    "category": "Admissions",
    "question": "À partir de quel âge peut-on inscrire un enfant ?",
    "answer": "Nos écoles accueillent les enfants à partir de 2 ans révolus, en classe d’accueil. Les admissions sont possibles ensuite à tous les niveaux jusqu’en 1ère secondaire (S1), sous réserve des places disponibles.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845352",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-32",
    "category": "Admissions",
    "question": "Les places sont-elles limitées ?",
    "answer": "Oui. Les places sont limitées et l’accueil dépend du niveau demandé. Le service admissions confirme les disponibilités de chaque campus ; une candidature ne garantit pas une place.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845354",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-33",
    "category": "Admissions",
    "question": "Quelle est la procédure d’admission ?",
    "answer": "L’admission dans nos écoles s’inscrit dans une démarche structurée et progressive. Elle se déroule en plusieurs étapes : Premier contact et prise d’information Les familles sont invitées à s’informer sur nos écoles via notre site web puis peuvent échanger avec notre service admissions en guise de premier contact. Dépôt d’un dossier de candidature La candidature est introduite via notre plateforme EduKa. Entretien individuel avec la famille Cet échange permet de mieux comprendre le profil de l’enfant et de s’assurer d’une adhésion des familles au projet éducatif de l’école. Évaluation ou observation pédagogique de l’élève Selon l’âge et le niveau, l’élève fait l’objet d’une observation en situation de classe ou d’une analyse pédagogique. Décision d’admission La décision est communiquée par écrit aux familles. Feedback pédagogique et échange avec l’école (pour les élèves admis) Un retour pédagogique est proposé afin d’accompagner l’intégration de l’élève. Confirmation de l’inscription Les familles confirment ensuite l’inscription selon les modalités communiquées.",
    "href": "/admissions/comprendre#parcours",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845356",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-34",
    "category": "Admissions",
    "question": "Y a-t-il des tests d’admission ?",
    "answer": "L’objectif est de comprendre le profil de l’enfant et les acquis nécessaires à son intégration, sans compétition entre candidats. Selon le processus détaillé publié : rencontre famille-enfant en accueil/M0 et M1 ; observation en classe de M2 à P1 ; analyse pédagogique de P2 à S1, selon les places disponibles. Pour les élèves venant d’une école officielle à programme de la Fédération Wallonie-Bruxelles, le dossier scolaire sert de base à l’analyse.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845358",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Detailed current process resolves general FAQ level shorthand."
    ]
  },
  {
    "id": "faq-35",
    "category": "Admissions",
    "question": "Comment se déroule un entretien avec la famille ?",
    "answer": "L’entretien est un temps d’échange individuel entre la famille et l’école. Il permet de mieux comprendre le profil et les besoins de l’enfant, de présenter clairement notre projet éducatif et d’échanger sur les attentes de la famille ainsi que sur sa vision de l’éducation. Cet entretien est avant tout un moment de dialogue et de clarification mutuelle. Il permet à l’école de s’assurer que le projet éducatif proposé correspond aux attentes de la famille, et à la famille de vérifier que l’école répond pleinement à ce qu’elle recherche pour le parcours scolaire de son enfant. Il constitue une étape essentielle pour poser les bases d’une relation de confiance, fondée sur une compréhension partagée et un engagement réciproque sur la durée.",
    "href": null,
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845360",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faq-36",
    "category": "Visites",
    "question": "Est-il possible de visiter l’école ?",
    "answer": "Oui. Les visites s’inscrivent dans le cadre de la procédure d’admission et sont proposées aux familles ayant engagé une démarche de candidature. Ce choix permet de privilégier des échanges de qualité, dans un cadre respectueux du fonctionnement de l’école et des élèves. Il n’y a pas de visites « libres » ou de journées portes ouvertes au grand public.",
    "href": "/reserver-une-visite",
    "sourceUrl": "https://www.ecolebelge.org/faq",
    "sourceAnchor": "myCollapseTab1767629845364",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": []
  },
  {
    "id": "faqs-41",
    "category": "Pédagogie et diplômes",
    "question": "Qu’est-ce qui inscrit les EBM dans la durée ?",
    "answer": "Les EBM s’appuient sur l’accord de coopération entre le Royaume du Maroc et la Fédération Wallonie-Bruxelles ainsi que sur leurs liens avec l’Association des Écoles Belges à l’Étranger (AEBE).",
    "href": "/le-reseau",
    "sourceUrl": "https://www.ecolebelge.org/faqs",
    "sourceAnchor": "myCollapseTab1704124850824",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "faqs-43",
    "category": "Pédagogie et diplômes",
    "question": "Quelle place pour la langue et la culture arabes ?",
    "answer": "L’enseignement de la langue et de la culture arabes (LCA) complète le programme belge à partir de M3. Le parcours comprend aussi l’histoire et la géographie du Maroc au secondaire. Le campus précise les volumes horaires et l’organisation de l’année en cours.",
    "href": "/pedagogie#langues",
    "sourceUrl": "https://www.ecolebelge.org/faqs",
    "sourceAnchor": "myCollapseTab1704124851321",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "faqs-44",
    "category": "Pédagogie et diplômes",
    "question": "Quelles langues étrangères sont proposées ?",
    "answer": "L’apprentissage d’une langue étrangère commence en première primaire : anglais à Casablanca ; anglais ou néerlandais à Rabat. L’ancienne FAQ évoque Cambridge English et IELTS pour valider le niveau d’anglais. Ces certifications, ainsi que les options proposées ensuite, sont à confirmer auprès du campus pour l’année et le niveau concernés.",
    "href": "/pedagogie#langues",
    "sourceUrl": "https://www.ecolebelge.org/faqs",
    "sourceAnchor": "myCollapseTab1704124851488",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "faqs-45",
    "category": "Pédagogie et diplômes",
    "question": "Quelle place pour les outils numériques ?",
    "answer": "Les élèves apprennent progressivement à rechercher et traiter l’information, utiliser les outils informatiques et protéger leur sécurité en ligne. Le parcours développe aussi un regard critique et une réflexion éthique sur les usages du numérique.",
    "href": "/pedagogie",
    "sourceUrl": "https://www.ecolebelge.org/faqs",
    "sourceAnchor": "myCollapseTab1704124851657",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "faqs-49",
    "category": "Admissions",
    "question": "Faut-il préparer son enfant à l’analyse pédagogique ?",
    "answer": "L’ancienne FAQ précise qu’aucune préparation spécifique n’est nécessaire. L’échange et les activités proposées servent à comprendre les acquis et le profil de l’enfant. Le service admissions transmet les consignes pratiques du rendez-vous.",
    "href": "/admissions/comprendre#niveaux",
    "sourceUrl": "https://www.ecolebelge.org/faqs",
    "sourceAnchor": "myCollapseTab1704124852320",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "classe-d-accueil-52",
    "category": "Pédagogie et diplômes",
    "question": "Pourquoi commencer par la classe d’accueil ?",
    "answer": "La classe d’accueil aide l’enfant à découvrir un autre environnement, prendre ses premiers repères dans l’école, rencontrer les adultes qui l’accompagnent et construire des relations avec les autres enfants.",
    "href": "/grandir-aux-ebm",
    "sourceUrl": "https://www.ecolebelge.org/classe-d-accueil",
    "sourceAnchor": "myCollapseTab341572_1",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "classe-d-accueil-53",
    "category": "Pédagogie et diplômes",
    "question": "Que découvre-t-on en classe d’accueil ?",
    "answer": "Le langage et la vie en communauté occupent une place centrale. Les découvertes, observations et manipulations, en groupe ou individuellement, développent les relations sociales, le partage et l’expression.",
    "href": "/grandir-aux-ebm",
    "sourceUrl": "https://www.ecolebelge.org/classe-d-accueil",
    "sourceAnchor": "myCollapseTab341572_2",
    "fetchedAt": "2026-10-24",
    "status": "published-source",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "classe-d-accueil-54",
    "category": "Admissions",
    "question": "La propreté est-elle nécessaire en classe d’accueil ?",
    "answer": "La page consacrée à l’accueil indique que la propreté peut s’acquérir pendant cette année avec l’accompagnement de l’école et de la famille, et qu’elle est attendue pour l’entrée en M1. Confirmez cette condition auprès du campus pour la candidature de votre enfant.",
    "href": "/contact",
    "sourceUrl": "https://www.ecolebelge.org/classe-d-accueil",
    "sourceAnchor": "myCollapseTab341572_3",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "classe-d-accueil-56",
    "category": "Admissions",
    "question": "Peut-on rejoindre la classe d’accueil en cours d’année ?",
    "answer": "La page d’accueil publiée décrit une inscription pour une année scolaire complète. Le service admissions doit confirmer les dates et les possibilités de la campagne en cours ; aucune entrée immédiate n’est promise.",
    "href": "/contact",
    "sourceUrl": "https://www.ecolebelge.org/classe-d-accueil",
    "sourceAnchor": "myCollapseTab1704044695758",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": [
      "Paraphrased from secondary source; stale dates and unsourced current capacity omitted."
    ]
  },
  {
    "id": "fees-overview",
    "category": "Frais et paiement",
    "question": "Où trouver les frais de scolarité ?",
    "answer": "La page Documents & frais réunit le barème public retrouvé, les catégories tarifaires et les conditions. Ce barème n’indique pas d’année scolaire : les montants et leur application à votre campus doivent être confirmés par EBM.",
    "href": "/admissions/documents-et-frais",
    "sourceUrl": "https://www.ecolebelge.org/frais-scolaire",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": []
  },
  {
    "id": "fees-payment",
    "category": "Frais et paiement",
    "question": "Comment les frais sont-ils échelonnés ?",
    "answer": "Le barème public prévoit trois versements trimestriels pour les frais annuels de scolarité. Les dates précises, les moyens de paiement et les modalités applicables à la campagne en cours sont communiqués par l’école.",
    "href": "/admissions/documents-et-frais#paiement",
    "sourceUrl": "https://www.ecolebelge.org/frais-scolaire",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": []
  },
  {
    "id": "fees-reduced",
    "category": "Frais et paiement",
    "question": "Comment demander le tarif réduit ?",
    "answer": "La demande se fait dans le dossier d’admission. Le tarif réduit est soumis à un quota de places et à des justificatifs de capacité financière, dont la liste est transmise par les services EBM. Ce n’est pas une réduction automatique.",
    "href": "/admissions/documents-et-frais#conditions",
    "sourceUrl": "https://www.ecolebelge.org/frais-scolaire",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": []
  },
  {
    "id": "documents-prepare",
    "category": "Documents",
    "question": "Quelles pièces préparer pour la candidature ?",
    "answer": "Préparez une photo d’identité récente de l’élève et la pièce d’identité du tuteur légal. Un certificat de scolarité est indiqué à partir de M3 dans la source la plus récente ; les deux dernières années de bulletins sont demandées à partir de P2. La pièce d’identité de l’enfant belge est demandée le cas échéant. Les conditions et formats sont à confirmer dans Eduka.",
    "href": "/admissions/documents-et-frais#documents",
    "sourceUrl": "https://www.ecolebelge.org/comment-inscrire-mon-enfant",
    "fetchedAt": "2026-10-24",
    "status": "needs-confirmation",
    "notes": []
  }
]

export const faqCategories = ['Admissions', 'Visites', 'Frais et paiement', 'Pédagogie et diplômes', 'Vie scolaire et bien-être', 'Transport et cantine', 'Documents'] as const
