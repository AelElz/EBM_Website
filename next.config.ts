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
