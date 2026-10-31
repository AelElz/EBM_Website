
import { CmsAnchor } from '@/cms/link'
import { getCmsSnapshot } from '@/cms/server'
import { CmsProvider } from '@/cms/context'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { site } from '@/content/site'
import { fontVariables } from '@/lib/fonts'
import { baseOpenGraph } from '@/lib/metadata'
import { Footer } from '@/components/site/footer'
import { Header } from '@/components/site/header/header'
import { Intro } from '@/components/site/intro'
import { MobileActionBar } from '@/components/site/mobile-action-bar'
import { PageTransition } from '@/components/site/page-transition'

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

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const cms = await getCmsSnapshot()
  return (
    // suppressHydrationWarning: the intro's inline script may add data-intro-seen to <html>
    // before hydration (src/components/site/intro.tsx). It only covers this element's attributes.
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <body>
        <CmsProvider value={{ mediaOverrides: cms.mediaOverrides, linkOverrides: cms.linkOverrides, site: cms.content.site, navigation: cms.content.navigation }}>
        {/* First in <body>: the curtain paints before anything else on the first load. */}
        <Intro />
        <CmsAnchor href="#contenu" className="skip-link">
          Aller au contenu
        </CmsAnchor>
        <Header />
        <main id="contenu" tabIndex={-1}>
          {/* Page changes fade and rise in, Apple style; the header and footer stay put. */}
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <MobileActionBar />
        </CmsProvider>
      </body>
    </html>
  )
}
