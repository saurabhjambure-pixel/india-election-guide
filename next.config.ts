import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self'; connect-src 'self' https://generativelanguage.googleapis.com; frame-ancestors 'none';"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
