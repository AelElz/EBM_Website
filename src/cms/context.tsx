"use client"
import { createContext, useContext, type ReactNode } from 'react'
import type { MediaOverride, LinkOverride } from './server'
interface CmsContextValue { mediaOverrides: MediaOverride[]; linkOverrides: LinkOverride[]; site?: unknown; navigation?: unknown }
const Context = createContext<CmsContextValue>({ mediaOverrides: [], linkOverrides: [] })
export function CmsProvider({ value, children }: { value: CmsContextValue; children: ReactNode }) { return <Context.Provider value={value}>{children}</Context.Provider> }
export const useCmsContext = () => useContext(Context)
export const safeHref = (href: string) => /^(?:\/(?!\/)|#|https?:\/\/|mailto:|tel:)/i.test(href.trim()) ? href : '#'
export function useCmsHref(href: string) { const { linkOverrides } = useCmsContext(); return safeHref(linkOverrides.find(item => item.source === href)?.replacement ?? href) }
