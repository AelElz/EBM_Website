'use client'

import { Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import type { ImageAsset } from '@/content/types'

import styles from './faq.module.css'

interface Player {
  mute(): void
  unMute(): void
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
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

/** Muted preview on arrival; one click seeks to zero, unmutes and shows native controls.
 * Reduced motion leaves a still image until clicked. A normal YouTube link survives failures.
 */
export function VideoFacade({ id, title, poster }: { id: string; title: string; poster: ImageAsset }) {
  const viewport = useRef<HTMLDivElement>(null)
  const mount = useRef<HTMLDivElement>(null)
  const player = useRef<Player | null>(null)
  const activeRef = useRef(false)
  const visible = useRef(false)
  const pausedRef = useRef(false)
  const reduced = useRef(false)
  const [load, setLoad] = useState(false)
  const [active, setActive] = useState(false)
  const [started, setStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)')
    reduced.current = preference.matches
    const onPreference = () => {
      reduced.current = preference.matches
      if (preference.matches && !activeRef.current) player.current?.pauseVideo()
    }
    preference.addEventListener('change', onPreference)
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting
      if (entry.isIntersecting) {
        if (!reduced.current || activeRef.current) setLoad(true)
        if (!pausedRef.current && (!reduced.current || activeRef.current)) player.current?.playVideo()
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
        playerVars: { autoplay: 0, playsinline: 1, rel: 0, loop: 1, playlist: id, origin: window.location.origin, hl: 'fr' },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return
            player.current = target
            const iframe = mount.current?.querySelector('iframe')
            if (iframe) { iframe.title = title; iframe.tabIndex = activeRef.current ? 0 : -1 }
            if (activeRef.current) {
              target.seekTo(0, true); target.unMute(); target.playVideo(); iframe?.focus()
            } else {
              target.mute()
              if (visible.current && !reduced.current && !pausedRef.current) target.playVideo()
            }
          },
          onStateChange: ({ data }) => { if (!cancelled && data === 1) setStarted(true) },
          onError: () => { if (!cancelled) { setError(true); setActive(false); activeRef.current = false } },
        },
      })
    }).catch(() => { if (!cancelled) { setError(true); setActive(false); activeRef.current = false } })
    return () => { cancelled = true; instance?.destroy(); player.current = null }
  }, [load, id, title])

  return (
    <div>
      <div ref={viewport} className={styles.video} data-video-mode={active ? 'watch' : 'preview'}>
        <Image src={poster.src} alt="" fill sizes="(min-width: 1280px) 1240px, 100vw" className="object-cover" style={{ objectPosition: poster.position }} />
        <div ref={mount} className={styles.player} aria-hidden={!active} style={{ opacity: started || active ? 1 : 0, pointerEvents: active ? 'auto' : 'none' }} />
        {!active && (
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank" rel="noopener noreferrer"
            className={styles.watch}
            onClick={(event) => {
              if (error) return
              event.preventDefault()
              activeRef.current = true
              pausedRef.current = false
              setPaused(false); setActive(true); setLoad(true)
              player.current?.seekTo(0, true)
              player.current?.unMute()
              player.current?.playVideo()
              const iframe = mount.current?.querySelector('iframe')
              if (iframe) { iframe.tabIndex = 0; iframe.focus() }
            }}
          >
            <span className={styles.playButton}>
              <Play aria-hidden="true" size={26} strokeWidth={0} fill="currentColor" />
              <span>Regarder depuis le début<span className="block text-[13px] font-medium">Avec le son</span></span>
            </span>
          </a>
        )}
        {!active && !error && started && (
          <button type="button" className={styles.pause} aria-label={paused ? 'Reprendre l’aperçu sans son' : 'Mettre l’aperçu en pause'} onClick={() => {
            pausedRef.current = !paused
            setPaused(!paused)
            if (paused) player.current?.playVideo()
            else player.current?.pauseVideo()
          }}>
            {paused ? <Play aria-hidden="true" size={17} /> : <Pause aria-hidden="true" size={17} />}
            <span>{paused ? 'Reprendre l’aperçu' : 'Pause'}</span>
          </button>
        )}
      </div>
      <div className={styles.videoNote}>
        <p role="status">{error ? 'Le lecteur est indisponible. La vidéo reste accessible sur YouTube.' : active ? 'Vidéo complète · son activé' : 'Aperçu sans son · cliquez pour regarder depuis le début'}</p>
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer">Voir sur YouTube<span className="sr-only"> (nouvel onglet)</span></a>
      </div>
    </div>
  )
}
