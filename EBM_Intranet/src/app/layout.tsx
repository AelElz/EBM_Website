import type { Metadata, Viewport } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Espace personnel', template: '%s · Espace personnel EBM' },
  description: 'L’espace des équipes des Écoles Belges au Maroc.',
  robots: { index: false, follow: false },
  icons: { icon: '/brand/favicon.svg', apple: '/brand/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#f5f5f7',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
