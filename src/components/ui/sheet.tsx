'use client'

import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/*
 * Sheet: shadcn/ui's Radix Dialog wrapper, restyled with EBM tokens (white panel, charcoal
 * scrim, 4px radius controls, 1.5px icons). Modal: focus trap, scroll lock, Escape and the
 * scrim close it, focus returns on close.
 *
 * Motion is a scene transition of the panel (slide + scrim fade, exponential ease-out in,
 * ease-in out); the global reduced-motion guard in globals.css makes it instant.
 * Always render a <SheetTitle> (visually hidden is fine). Pass aria-describedby={undefined}
 * to SheetContent when there is no <SheetDescription>.
 */

function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-charcoal/50',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-500 data-[state=open]:ease-out-expo',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-300 data-[state=closed]:ease-in',
        className,
      )}
      {...props}
    />
  )
}

type SheetSide = 'top' | 'right' | 'bottom' | 'left'

const sideClasses: Record<SheetSide, string> = {
  right:
    'inset-y-0 right-0 h-full w-full border-l border-hairline sm:max-w-[420px] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  left: 'inset-y-0 left-0 h-full w-full border-r border-hairline sm:max-w-[420px] data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  top: 'inset-x-0 top-0 h-auto border-b border-hairline data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom:
    'inset-x-0 bottom-0 h-auto border-t border-hairline data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
}

export interface SheetContentProps extends ComponentProps<typeof SheetPrimitive.Content> {
  side?: SheetSide
  /** Built-in close button in the top-right corner. Turn it off to place a SheetClose yourself. */
  showCloseButton?: boolean
  /** Accessible name of the built-in close button. */
  closeLabel?: string
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  closeLabel = 'Fermer',
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'fixed z-50 flex flex-col bg-white text-charcoal shadow-card outline-none',
          'data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:ease-out-expo',
          'data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:ease-in',
          sideClasses[side],
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton ? (
          <SheetPrimitive.Close className="absolute top-2.5 right-2.5 grid size-11 place-items-center rounded-full text-charcoal transition-colors duration-200 hover:bg-paper">
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        ) : null}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1.5 p-5', className)} {...props} />
}

function SheetFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-3 p-5', className)} {...props} />
}

function SheetTitle({ className, ...props }: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('font-sans text-lg leading-snug font-bold tracking-normal', className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-sm text-ink-soft', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
