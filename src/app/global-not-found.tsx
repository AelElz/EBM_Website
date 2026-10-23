import type { Metadata, Viewport } from 'next'

import { site } from '@/content/site'
import { fontVariables } from '@/lib/fonts'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header/header'
import { MobileActionBar } from '@/components/site/mobile-action-bar'
import { NotFoundContent } from '@/components/site/not-found-content'

import './(frontend)/globals.css'

/*
 * 404 for URLs that match no route at all (experimental.globalNotFound in next.config.ts).
 * Needed because the app has two root layouts ((frontend) and (payload)). It bypasses every
 * layout, so it repeats the (frontend) shell: fonts, global CSS, skip link, header, footer.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `Page introuvable · ${site.name}`,
  description: site.description,
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  // Lets env(safe-area-inset-bottom) report the iPhone home-indicator inset (mobile action
  // bar, menu sheet); without it the inset is always 0.
  viewportFit: 'cover',
}

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          <NotFoundContent />
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  )
}
