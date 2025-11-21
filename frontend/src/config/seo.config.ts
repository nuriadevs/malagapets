// src/config/seo.config.ts
/**
 * Configuración centralizada de SEO
 */

import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from './constants';

export const SEO_CONFIG = {
  // Información del sitio
  site: {
    name: SITE_NAME,
    url: SITE_URL,
    tagline: SITE_DESCRIPTION,
  },

  // Social media
  social: {
    twitter: '@malagapets',
    facebook: 'malagapets',
    instagram: '@malagapets',
  },

  // Configuración de imágenes OG/Twitter
  images: {
    default: {
      url: '/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'MálagaPets - Blog de mascotas',
    },
    defaultAuthor: '/images/default-author.jpg',
    defaultCategory: '/images/default-category.jpg',
    defaultPost: '/images/default-blog-cover.jpg',
  },

  // Tamaños de imagen para Strapi
  strapiImageSizes: {
    thumbnail: { width: 150, height: 150, label: '150x150' },
    small: { width: 500, height: 500, label: '500x500' },
    medium: { width: 750, height: 750, label: '750x750' },
    large: { width: 1000, height: 1000, label: '1000x1000' },
    original: { width: 1200, height: 800, label: '1200x800' },
  } as const,

  // Configuración de robots
  robots: {
    default: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    noindex: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  },

  // Plantillas de descripción
  templates: {
    post: (title: string) => `Lee "${title}" en el blog de MálagaPets`,
    category: (name: string) => `Descubre todos los artículos sobre ${name} en el blog de MálagaPets`,
    author: (name: string) => `Artículos escritos por ${name} en el blog de MálagaPets`,
    fallback: 'Blog de MálagaPets - Guía completa para el cuidado de tus mascotas',
  },

  // Configuración de lectura
  reading: {
    wordsPerMinute: 200,
    minReadTime: 1, // minutos mínimos
  },
} as const;

/**
 * Tipos de contenido soportados para SEO
 */
export type SeoContentType = 'post' | 'category' | 'author' | 'page';

/**
 * Prioridades de fallback para imágenes
 */
export const IMAGE_FALLBACK_PRIORITY = {
  post: ['seoShareImage', 'coverImage', 'default'] as const,
  category: ['seoShareImage', 'coverImage', 'default'] as const,
  author: ['seoShareImage', 'avatar', 'default'] as const,
} as const;


