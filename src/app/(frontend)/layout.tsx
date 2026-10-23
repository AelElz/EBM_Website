import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { site } from '@/content/site'
import { fontVariables } from '@/lib/fonts'
import { baseOpenGraph } from '@/lib/metadata'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header/header'
import { MobileActionBar } from '@/components/site/mobile-action-bar'

import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: baseOpenGraph,
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  // Phone numbers are linked explicitly (tel:); stop iOS from auto-linking other digits.
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  // Lets env(safe-area-inset-bottom) report the iPhone home-indicator inset (mobile action
  // bar, menu sheet); without it the inset is always 0.
  viewportFit: 'cover',
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  )
}
