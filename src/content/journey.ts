import type { ImageAsset } from './types'

export type CampusKey = 'casablanca' | 'rabat'

/** Ages at the start of the school year, grouped from the existing EBM class mapping.
 * Sources: Parcours scolaire and Projet pédagogique. These are orientation, not placement rules.
 * Detailed timetables and services are archived in docs/content-archive/home-detailed-copy.md.
 */
export const journey = {
  title: ['À chaque âge,', '*son parcours*'],
  text: 'Choisissez son âge. Découvrez l’essentiel.',
  note: 'Âges indicatifs à la rentrée.',
  admission: 'Admissions jusqu’en 1re secondaire, selon les places disponibles.',
  link: { label: 'Voir les étapes d’admission', href: '#admissions-title' },
  stages: [
    {
      id: 'maternelle',
      ages: '2–5',
      name: 'Maternelle',
      title: 'Jouer pour apprendre',
      facts: [
        'Une classe d’accueil dès 2 ans.',
        'Apprendre par le jeu et l’exploration.',
        'Français, puis arabe en 3e maternelle.',
      ],
      image: {
        src: '/images/collage-dessin.jpg',
        alt: 'Un enfant découvre le dessin en classe aux Écoles Belges au Maroc.',
        width: 1600, height: 1067, position: '22% 50%',
      } satisfies ImageAsset,
    },
    {
      id: 'primaire',
      ages: '6–11',
      name: 'Primaire',
      title: 'Prendre confiance',
      facts: [
        'Lire, écrire, compter et découvrir.',
        'Anglais, ou néerlandais à Rabat, dès la 1re primaire.',
        'Le CEB à la fin du primaire.',
      ],
      image: {
        src: '/images/collage-sciences.jpg',
        alt: 'Des élèves réalisent une activité de sciences aux Écoles Belges au Maroc.',
        width: 1600, height: 1067, position: '50% 50%',
      } satisfies ImageAsset,
    },
    {
      id: 'secondaire',
      ages: '12–18',
      name: 'Secondaire',
      title: 'Préparer son avenir',
      facts: [
        'Approfondir les sciences et les langues.',
        'Espagnol dès la 4e secondaire.',
        'Le CESS pour accéder aux études supérieures.',
      ],
      image: {
        src: '/images/parcours-secondaire.jpg',
        alt: 'Des élèves du secondaire dans leur école belge au Maroc.',
        width: 1600, height: 1066, position: '30% 60%',
      } satisfies ImageAsset,
    },
  ],
}
