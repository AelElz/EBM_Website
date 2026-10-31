/*
 * The entities EBM works with (31 Oct 2026, Ayoub: "the entities that EBM worked with and got
 * collaboration with"), shown in the home's partner strip (components/home/partners-marquee.tsx).
 * Only collaborations EBM's own sources document:
 *   Fédération Wallonie-Bruxelles, WBI, AEBE: the institutional partners EBM lists (logos cut
 *     from EBM's own strip, /brand/partners-white.png);
 *   Royaume du Maroc: the cooperation agreement of 21 May 2014 (home band 3);
 *   Ambassade d'Allemagne, Goethe-Institut: the Rabat partnership announced on 9 Oct 2024;
 *   Cambridge English: Rabat is a Cambridge English preparation centre (certificate on EBM's
 *     Rabat page) and the validated pedagogy text cites Cambridge certifications.
 * Partners without a logo file from EBM are set as wordmarks: official logos (the German federal
 * eagle, Cambridge, Goethe) need the partner's permission. To use one, put the file EBM receives
 * in /public/brand/partners and give the entry its `logo`.
 */

export interface Partner {
  /** Optional collaborator destination, editable from the CMS. */
  href?: string
  name: string
  /** Second line of the wordmark, and part of the accessible name. */
  detail: string
  /** White-on-transparent logo in /public/brand/partners, shown in charcoal. */
  logo?: { src: string; width: number; height: number }
}

export const partners: Partner[] = [
  { name: 'Fédération Wallonie-Bruxelles', detail: 'Programmes et diplômes', logo: { src: '/brand/partners/fwb.png', width: 177, height: 168 } },
  { name: 'Royaume du Maroc', detail: 'Accord de coopération de 2014' },
  { name: 'Wallonie-Bruxelles International', detail: 'Partenaire institutionnel', logo: { src: '/brand/partners/wbi.png', width: 305, height: 170 } },
  { name: 'Cambridge English', detail: 'Centre de préparation, Rabat' },
  { name: 'AEBE', detail: 'Association des Écoles Belges à l’Étranger', logo: { src: '/brand/partners/aebe.png', width: 128, height: 169 } },
  { name: 'Goethe-Institut', detail: 'Ateliers d’allemand, Rabat' },
  { name: 'Ambassade d’Allemagne', detail: 'Partenariat linguistique, Rabat' },
]
