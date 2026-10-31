"use client"
import NextImage, { type ImageProps } from 'next/image'
import { useCmsContext } from './context'
/** Existing source paths remain stable editor keys across every public page. */
export default function CmsImage(props: ImageProps) {
  const { mediaOverrides } = useCmsContext()
  const replacement = typeof props.src === 'string' ? mediaOverrides.find(item => item.source === props.src)?.replacement : undefined
  if (!replacement || (replacement.mimeType && !replacement.mimeType.startsWith('image/')) || !/^(?:\/(?!\/)|https?:\/\/)/i.test(replacement.url)) return <NextImage {...props} unoptimized={props.unoptimized || (typeof props.src === 'string' && /^https?:\/\//i.test(props.src))} />
  return <NextImage {...props} src={replacement.url} alt={replacement.alt ?? props.alt} {...(!props.fill ? { width: replacement.width ?? props.width, height: replacement.height ?? props.height } : {})} unoptimized />
}
