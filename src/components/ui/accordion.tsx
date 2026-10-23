'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/*
 * Accordion: shadcn/ui's Radix wrapper, restyled with EBM tokens. Hairline separators, Avenir
 * 600 triggers at least 56px tall, a 1.5px chevron that flips with the state (no animated
 * control movement); the panel height animates (tw-animate-css accordion-down/up), instant
 * with prefers-reduced-motion. Keyboard: Enter/Space toggle, ArrowUp/ArrowDown/Home/End move
 * between triggers (Radix).
 */

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b border-hairline', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-4 py-3 text-left',
          'font-sans text-[17px] leading-snug font-semibold text-charcoal',
          'transition-colors duration-200 hover:text-terracotta-ink',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-ink-soft" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
