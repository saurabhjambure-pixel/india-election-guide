import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const isDev = process.env.NODE_ENV === 'development';
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Next.js (especially with Turbopack) requires:
//   - 'unsafe-inline' in script-src: hydration bootstrap is inlined into the HTML
//   - 'unsafe-eval' in script-src: Turbopack HMR uses eval() in dev mode only
// Production-grade nonce-based CSP requires Next.js middleware and is a separate
// investment — 'unsafe-inline' here is the pragmatic baseline for a Next.js app.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const nextConfig: NextConfig = {
  compress: true,
  turbopack: {
    root: projectRoot,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              // Tailwind v4 uses runtime-injected style tags; unsafe-inline required
              "style-src 'self' 'unsafe-inline'",
              // Next.js <Image> optimization endpoint; data: for inline SVGs
              "img-src 'self' data: blob:",
              // Inter is self-hosted via next/font — no external font CDN needed
              "font-src 'self'",
              // Gemini API + Firebase Analytics + Firestore
              [
                "connect-src 'self'",
                "https://generativelanguage.googleapis.com",
                "https://*.googleapis.com",
                "https://*.google-analytics.com",
                "https://*.analytics.google.com",
                "https://*.firebase.com",
                "https://*.firebaseio.com",
                "https://firestore.googleapis.com",
              ].join(' '),
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              // Only send upgrade-insecure-requests in production (dev runs on HTTP)
              ...(isDev ? [] : ["upgrade-insecure-requests"]),
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // HSTS only in production — sending it on localhost causes browser to refuse
          // plain HTTP connections to localhost for 2 years
          ...(isDev ? [] : [{
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }]),
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/flow/timeline',
        destination: '/timeline',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
