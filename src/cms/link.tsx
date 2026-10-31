"use client"
import NextLink from 'next/link'
import { forwardRef, type ComponentProps } from 'react'
import { useCmsHref } from './context'
const CmsLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function CmsLink({ href, ...props }, ref) {
  const resolved = useCmsHref(typeof href === 'string' ? href : String(href.pathname || '/'))
  return <NextLink {...props} href={typeof href === 'string' ? resolved : href} ref={ref} />
})
export default CmsLink
export const CmsAnchor = forwardRef<HTMLAnchorElement, ComponentProps<'a'>>(function CmsAnchor({ href = '#', ...props }, ref) {
  const resolved = useCmsHref(href)
  return <a {...props} href={resolved} ref={ref} />
})
