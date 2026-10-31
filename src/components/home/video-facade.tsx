'use client'
import { CmsAnchor } from '@/cms/link'


import { Play } from 'lucide-react'
import Image from '@/cms/image'
import { useEffect, useRef, useState } from 'react'

import type { ImageAsset } from '@/content/types'
import { readVideoChoice } from '@/lib/video-choice'

import styles from './faq.module.css'

interface Player {
  mute(): void
  unMute(): void
  playVideo(): void
  pauseVideo(): void
  destroy(): void
}
interface YouTube {
  Player: new (element: HTMLElement, options: {
    host: string
    videoId: string
    width: string
    height: string
    playerVars: Record<string, string | number>
    events: {
      onReady(event: { target: Player }): void
      onStateChange(event: { data: number }): void
      onError(): void
    }
  }) => Player
}
type PlayerWindow = Window & { YT?: YouTube; onYouTubeIframeAPIReady?: () => void }
let apiPromise: Promise<YouTube> | undefined

function loadPlayer(): Promise<YouTube> {
  const playerWindow = window as PlayerWindow
  if (playerWindow.YT?.Player) return Promise.resolve(playerWindow.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise<YouTube>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error('YouTube unavailable')), 15000)
    const previous = playerWindow.onYouTubeIframeAPIReady
    playerWindow.onYouTubeIframeAPIReady = () => {
      previous?.()
      window.clearTimeout(timeout)
      if (playerWindow.YT?.Player) resolve(playerWindow.YT)
    }
    if (!document.getElementById('ebm-youtube-api')) {
      const script = document.createElement('script')
      script.id = 'ebm-youtube-api'
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      script.onerror = () => { window.clearTimeout(timeout); reject(new Error('YouTube unavailable')) }
      document.head.append(script)
    }
  }).catch((error: unknown) => { apiPromise = undefined; throw error })
  return apiPromise
}

/** Autoplay once, muted; the running iframe owns playback and sound controls.
 * Reduced motion, or "Seulement quand je clique" on /cookies, keeps a poster with a labelled play
 * control. A YouTube link survives failures.
 */
export function VideoFacade({ id, title, poster }: { id: string; title: string; poster: ImageAsset }) {
  const viewport = useRef<HTMLDivElement>(null)
  const mount = useRef<HTMLDivElement>(null)
  const player = useRef<Player | null>(null)
  const requestedRef = useRef(false)
  const hasPlayed = useRef(false)
  const visible = useRef(false)
  const reduced = useRef(false)
  const [load, setLoad] = useState(false)
  const [requested, setRequested] = useState(false)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    // "Seulement quand je clique" on /cookies behaves like reduced motion: poster and play.
    const clickOnly = readVideoChoice() === 'click'
    reduced.current = preference.matches || clickOnly
    const onPreference = () => {
      reduced.current = preference.matches || clickOnly
      if (preference.matches && !requestedRef.current) player.current?.pauseVideo()
      if (!reduced.current && visible.current && !hasPlayed.current) {
        setLoad(true)
        player.current?.playVideo()
      }
    }
    preference.addEventListener('change', onPreference)
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (!reduced.current || requestedRef.current) setLoad(true)
        // After first playback, resuming belongs to the visitor's native controls.
        if (!hasPlayed.current && !reduced.current) player.current?.playVideo()
      } else {
        player.current?.pauseVideo()
      }
    }, { threshold: 0.15 })
    if (viewport.current) observer.observe(viewport.current)
    return () => { observer.disconnect(); preference.removeEventListener('change', onPreference) }
  }, [])

  useEffect(() => {
    if (!load || !mount.current) return
    let cancelled = false
    let instance: Player | null = null
    loadPlayer().then((api) => {
      if (cancelled || !mount.current) return
      const host = document.createElement('div')
      mount.current.replaceChildren(host)
      instance = new api.Player(host, {
        host: 'https://www.youtube-nocookie.com',
        videoId: id,
        width: '100%', height: '100%',
        playerVars: { autoplay: 0, controls: 1, playsinline: 1, rel: 0, loop: 1, playlist: id, origin: window.location.origin, hl: 'fr' },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return
            player.current = target
            const iframe = mount.current?.querySelector('iframe')
            if (iframe) { iframe.title = title; iframe.tabIndex = requestedRef.current ? 0 : -1 }
            if (requestedRef.current && visible.current) {
              target.unMute(); target.playVideo(); iframe?.focus()
            } else {
              target.mute()
              if (visible.current && !reduced.current) target.playVideo()
            }
          },
          onStateChange: ({ data }) => {
            if (cancelled || data !== 1) return
            hasPlayed.current = true
            setStarted(true)
            const iframe = mount.current?.querySelector('iframe')
            if (iframe) iframe.tabIndex = 0
          },
          onError: () => { if (!cancelled) setError(true) },
        },
      })
    }).catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true; instance?.destroy(); player.current = null }
  }, [load, id, title])

  return (
    <div>
      <div ref={viewport} className={styles.video} data-video-mode={started || requested ? 'native' : 'poster'}>
        <Image src={poster.src} alt="" fill sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" style={{ objectPosition: poster.position }} />
        <div ref={mount} className={styles.player} aria-hidden={!started && !requested} style={{ opacity: started || requested ? 1 : 0, pointerEvents: started || requested ? 'auto' : 'none' }} />
        {!started && !requested && (
          <CmsAnchor
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank" rel="noopener noreferrer"
            aria-label={error ? 'Voir la vidéo sur YouTube (nouvel onglet)' : 'Lire la vidéo'}
            className={styles.watch}
            onClick={(event) => {
              if (error) return
              event.preventDefault()
              requestedRef.current = true
              setRequested(true); setLoad(true)
              player.current?.unMute()
              player.current?.playVideo()
              const iframe = mount.current?.querySelector('iframe')
              if (iframe) { iframe.tabIndex = 0; iframe.focus() }
            }}
          >
            <span className={styles.playButton}>
              <Play aria-hidden="true" size={26} strokeWidth={0} fill="currentColor" />
            </span>
          </CmsAnchor>
        )}
      </div>
      <div className={styles.videoNote}>
        {error && <p role="status">Le lecteur est indisponible. La vidéo reste accessible sur YouTube.</p>}
        <CmsAnchor href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Voir sur YouTube<span className="sr-only"> (nouvel onglet)</span></CmsAnchor>
      </div>
    </div>
  )
}
