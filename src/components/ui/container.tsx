import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ContainerElement = 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article' | 'aside'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /** Rendered element (default div). */
  as?: ContainerElement
  /** site: 1240px incl. gutters (default). narrow: ~832px reading column (legal pages). */
  size?: 'site' | 'narrow'
}

/** Centred page column: max-width 1240px, side padding clamp(20px, 4vw, 40px). */
export function Container({ as: Tag = 'div', size = 'site', className, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-gutter',
        size === 'narrow' ? 'max-w-narrow' : 'max-w-site',
        className,
      )}
      {...props}
    />
  )
}
