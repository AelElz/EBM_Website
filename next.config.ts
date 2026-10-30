import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Hero photos are exported at <= 2400px, so the 3840 default size is never needed.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2400],
    // When localPatterns is set, next/image only optimises local paths listed here.
    localPatterns: [
      { pathname: '/api/media/file/**' },
      { pathname: '/images/**' },
      { pathname: '/brand/**' },
    ],
  },
  // From Payload's blank template: lets webpack resolve `.js` imports to `.ts` sources
  // (only used with `next build --webpack`; Turbopack is the default bundler in Next 16).
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  // Explicit source-backed legacy aliases; archived campaigns and Odoo modules are excluded.
  /* Security headers on every response (30 Oct 2026, described on /confidentialite#securite):
     HTTPS only (HSTS), no framing by other sites, exact content types, a short referrer to
     external sites, and no camera, microphone or location access. */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
        ],
      },
    ]
  },
  async redirects() {
    return [
    // 30 Oct 2026: "Comprendre les admissions" merged into /admissions (same section ids, so
    // /admissions/comprendre#faq lands on /admissions#faq). /reserver-une-visite redirects in its
    // page, to keep the chosen campus (app/(frontend)/reserver-une-visite/page.tsx).
    {
        "source": "/admissions/candidater",
        "destination": "/admissions#candidater",
        "permanent": true
    },
    {
        "source": "/admissions/comprendre",
        "destination": "/admissions",
        "permanent": true
    },
    {
        "source": "/acceuil",
        "destination": "/",
        "permanent": true
    },
    {
        "source": "/fondamentaux",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/mot-directeur",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/notre-projet-pedagogique",
        "destination": "/pedagogie",
        "permanent": true
    },
    {
        "source": "/approche-valeurs",
        "destination": "/pedagogie",
        "permanent": true
    },
    {
        "source": "/philosophie-d-education",
        "destination": "/pedagogie",
        "permanent": true
    },
    {
        "source": "/maternelle",
        "destination": "/pedagogie#maternelle",
        "permanent": true
    },
    {
        "source": "/classe-d-accueil",
        "destination": "/pedagogie#maternelle",
        "permanent": true
    },
    {
        "source": "/engagement",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/pourquoi-choisir-nos-ecoles",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/pouquoi-choisir-ebm",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/casablanca",
        "destination": "/nos-campus/casablanca",
        "permanent": true
    },
    {
        "source": "/rabat",
        "destination": "/nos-campus/rabat",
        "permanent": true
    },
    {
        "source": "/nos-ecoles",
        "destination": "/nos-campus",
        "permanent": true
    },
    {
        "source": "/processus-admission",
        "destination": "/admissions",
        "permanent": true
    },
    {
        "source": "/regles",
        "destination": "/admissions#conditions",
        "permanent": true
    },
    {
        "source": "/types-admission",
        "destination": "/admissions#conditions",
        "permanent": true
    },
    {
        "source": "/comment-inscrire-mon-enfant",
        "destination": "/admissions#candidater",
        "permanent": true
    },
    {
        "source": "/frais-scolaire",
        "destination": "/admissions/documents-et-frais",
        "permanent": true
    },
    {
        "source": "/faq",
        "destination": "/admissions#faq",
        "permanent": true
    },
    {
        "source": "/faqs",
        "destination": "/admissions#faq",
        "permanent": true
    },
    {
        "source": "/contactez-nous",
        "destination": "/contact",
        "permanent": true
    },
    {
        "source": "/contactez-nous-1",
        "destination": "/contact",
        "permanent": true
    },
    {
        "source": "/contactus",
        "destination": "/contact",
        "permanent": true
    },
    {
        "source": "/brochure-des-ecoles-belges-au-maroc",
        "destination": "/le-reseau",
        "permanent": true
    },
    {
        "source": "/privacy",
        "destination": "/confidentialite",
        "permanent": true
    },
    {
        "source": "/jobs",
        "destination": "/recrutement",
        "permanent": true
    },
    {
        "source": "/blog/actualites-2/l-ecole-belge-de-casablanca-lance-son-ecole-du-dehors-8",
        "destination": "/ecole-du-dehors",
        "permanent": true
    },
    {
        "source": "/blog/actualites-2/le-site-de-la-section-secondaire-de-l-ecole-belge-de-rabat-officiellement-inaugure-9",
        "destination": "/nos-campus/rabat",
        "permanent": true
    },
    {
        "source": "/blog/actualites-2/les-futurs-laureats-de-la-promotion-2024-2025-en-voyage-de-retho-18",
        "destination": "/apres-les-ebm",
        "permanent": true
    },
    {
        "source": "/blog/actualites-2/partenariat-entre-l-ambassade-d-allemagne-l-institut-goethe-et-l-ecole-belge-de-rabat-17",
        "destination": "/grandir-aux-ebm",
        "permanent": true
    },
    {
        "source": "/blog/actualites-2/un-precieux-moment-de-rencontre-et-de-partage-11",
        "destination": "/grandir-aux-ebm",
        "permanent": true
    }
]
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  experimental: {
    // Two root layouts ((frontend) and (payload)) mean there is no app-level not-found for
    // unmatched URLs; src/app/global-not-found.tsx renders the designed French 404 instead.
    globalNotFound: true,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
