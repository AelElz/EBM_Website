/*
 * Shared content types. The static modules in src/content/ are shaped like the future Payload
 * collections/globals (docs/ARCHITECTURE.md, section 4) so components keep the same props when
 * the data source switches to Payload.
 */

export interface LinkItem {
  label: string
  href: string
  /** Opens in a new tab with rel="noopener noreferrer" and an arrow-up-right icon. */
  external?: boolean
}

/** A photo or logo in /public with its real pixel size (for next/image width/height). */
export interface ImageAsset {
  src: string
  /** French alt text. An empty string marks the image as decorative. */
  alt: string
  width: number
  height: number
  /** CSS object-position for object-fit: cover crops, e.g. "50% 40%". */
  position?: string
}
