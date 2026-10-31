import 'server-only'
import { cache } from 'react'

export interface MediaOverride { source: string; replacement: { url: string; alt?: string; width?: number; height?: number; mimeType?: string } }
export interface LinkOverride { source: string; replacement: string }
export interface CmsSnapshot { initialized: boolean; content: Record<string, unknown>; mediaOverrides: MediaOverride[]; linkOverrides: LinkOverride[] }
const empty: CmsSnapshot = { initialized: false, content: {}, mediaOverrides: [], linkOverrides: [] }

/** Per-render memoization: edits appear on the next request; an offline CMS keeps the website readable. */
export const getCmsSnapshot = cache(async (): Promise<CmsSnapshot> => {
  try {
    const origin = process.env.EBM_CMS_URL || 'http://localhost:3200'
    const response = await fetch(`${origin.replace(/\/$/, '')}/api/site`, { cache: 'no-store', signal: AbortSignal.timeout(1200) })
    if (!response.ok) return empty
    const data: unknown = await response.json()
    if (!data || typeof data !== 'object' || !('content' in data)) return empty
    const value = data as Partial<CmsSnapshot>
    return { initialized: value.initialized === true, content: value.content && typeof value.content === 'object' ? value.content : {}, mediaOverrides: Array.isArray(value.mediaOverrides) ? value.mediaOverrides : [], linkOverrides: Array.isArray(value.linkOverrides) ? value.linkOverrides : [] }
  } catch { return empty }
})

/** Merge known fields only. Arrays replace wholesale, including deliberate empty lists. */
export function mergeContent<T>(fallback: T, value: unknown): T {
  if (value === undefined) return fallback
  if (fallback === null) return (value === null || typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean' ? value : fallback) as T
  if (Array.isArray(fallback)) return (Array.isArray(value) ? value : fallback) as T
  if (fallback && typeof fallback === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return fallback
    const record = value as Record<string, unknown>
    return Object.fromEntries(Object.entries(fallback).map(([key, item]) => [key, mergeContent(item, record[key])])) as T
  }
  return (typeof value === typeof fallback ? value : fallback) as T
}
export async function getCmsContent<T>(key: string, fallback: T): Promise<T> {
  const snapshot = await getCmsSnapshot()
  return mergeContent(fallback, snapshot.content[key])
}
