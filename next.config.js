/**
 * Next.js Configuration for Standalone Docker Deployment
 *
 * This configuration enables the standalone output mode which is required
 * for the multi-stage Dockerfile to work properly.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Disable telemetry in production
  experimental: {
    instrumentationHook: false,
  },

  // Configure compression
  compress: true,

  // Optimize images
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },

  // Environment variables exposed to the browser (prefix with NEXT_PUBLIC_)
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    CUSTOM_PORT: process.env.PORT || process.env.APP_PORT || '3000',
  },
}

module.exports = nextConfig
