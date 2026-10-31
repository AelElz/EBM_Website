import { CmsAnchor } from '@/cms/link'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from '@/cms/link'
import type { ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/*
 * EBM buttons. Since 30 Oct 2026 (Ayoub: the whole site "like Apple style", design kept): pills,
 * semibold, heights 44 / 52px, the same colours. The colour eases on hover and a press dims the
 * button for a moment, as on apple.com. Static controls: no movement, no scale, no lift
 * (Ayoub wants motion in scenes, never in controls).
 * Server-safe: no hooks, no 'use client'.
 */
export const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full',
    'font-sans font-semibold leading-none no-underline select-none',
    'transition-[background-color,border-color,color,opacity] duration-200 ease-apple',
    'active:opacity-80 active:duration-75',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-[1.125em]',
  ],
  {
    variants: {
      variant: {
        /** Terracotta: the main action (Candidater, Réserver une visite). */
        primary: 'bg-terracotta text-white hover:bg-terracotta-ink',
        /** Charcoal block. */
        dark: 'bg-charcoal text-white hover:bg-ink-soft',
        /** Charcoal outline on light grounds (Visiter in the header). */
        'outline-dark':
          'border-[1.5px] border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-white',
        /** White outline on photos and dark grounds. */
        'outline-light':
          'border-[1.5px] border-white/85 bg-transparent text-white hover:border-white hover:bg-white hover:text-charcoal focus-visible:outline-white',
        /** White block on photos and dark grounds. */
        light: 'bg-white text-charcoal hover:bg-cream focus-visible:outline-white',
        /** Text-only control (icon buttons in bars). */
        ghost: 'bg-transparent text-charcoal hover:bg-paper',
      },
      size: {
        /** 44px: header, bars, compact contexts. */
        md: 'h-11 px-[22px] text-[15px]',
        /** 52px: hero, CTA band, page actions. */
        lg: 'h-[52px] px-[30px] text-base',
        /** 44 x 44 icon-only button (always give it an aria-label). */
        icon: 'size-11 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>

export type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export type ButtonLinkProps = Omit<ComponentProps<'a'>, 'href'> &
  ButtonVariantProps & {
    href: string
    /** External URL: new tab, rel="noopener noreferrer", screen-reader hint. Add the
     *  ArrowUpRight icon yourself where the design shows it. */
    external?: boolean
    /** Forwarded to next/link for internal routes. */
    prefetch?: boolean | null
    children: ReactNode
  }

/** A link styled as a button. Internal routes use next/link; external ones a plain <a>. */
export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  prefetch,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (external) {
    return (
      <CmsAnchor href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
        <span className="sr-only"> (nouvel onglet)</span>
      </CmsAnchor>
    )
  }

  return (
    <Link href={href} prefetch={prefetch} className={classes} {...props}>
      {children}
    </Link>
  )
}
