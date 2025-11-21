// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  htmlLimitedBots: /bot|crawl|spider|lighthouse|twitterbot|facebookexternalhit|discordbot|slackbot|linkedinbot|whatsapp|telegram/i,

  // ✅ OPTIMIZACIONES AÑADIDAS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react', 'next-intl'], // ✅ Reduce bundle
  },

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 31536000, // ✅ Cache de 1 año
    deviceSizes: [640, 750, 828, 1080, 1200], // ✅ Optimiza breakpoints
    imageSizes: [16, 32, 48, 64, 96], // ✅ Para iconos pequeños
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      // Localhost para desarrollo
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // Render (para imágenes antiguas que aún no migraste)
      {
        protocol: 'https',
        hostname: 'backend-pets-u2de.onrender.com',
        pathname: '/uploads/**',
      },
      // Placeholders
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ]
  },
  
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === "production"
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production"
  }
};

export default withNextIntl(nextConfig);