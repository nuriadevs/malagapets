// src/types/strapi.ts
import { STRAPI_URL } from '@/config/constants';

// ============================================
// TIPOS BASE DE STRAPI
// ============================================

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  slug: string; // ✅ AÑADIDO: Campo slug del backend
  email?: string;
  bio?: string;
  avatar?: StrapiImage;
  locale?: string;
  url?: string;
  blocks?: BlogBlock[]; // ✅ AÑADIR: Dynamic Zone
  seo?: SeoBlock;
    // ✅ AÑADIR: Campo localizations para obtener otras versiones del idioma
  localizations?: Array<{
    id: number;
    documentId: string;
    locale: string;
    slug: string;
    name?: string;
  }>;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  locale?: string;
  description?: string;
  color?: string;
  blocks?: BlogBlock[]; // ✅ AÑADIR: Dynamic Zone
  seo?: SeoBlock;
  // ✅ AÑADIR: Campo localizations para obtener otras versiones del idioma
  localizations?: Array<{
    id: number;
    documentId: string;
    locale: string;
    slug: string;
    name?: string;
  }>;
}
export interface Tag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

// ============================================
// BLOQUES DE CONTENIDO DINÁMICO
// ============================================

export interface RichTextBlock {
  __component: "shared.rich-text" | "blocks.rich-text";
  id?: number;
  body: string;
}

export interface QuoteBlock {
  __component: "shared.quote" | "blocks.quote";
  id?: number;
  body: string;
  title?: string;
  author?: string;
}

export interface MediaBlock {
  __component: "shared.media" | "blocks.media";
  id?: number;
  file: StrapiImage;
}

export interface SliderBlock {
  __component: "shared.slider" | "blocks.slider";
  id?: number;
  files: StrapiImage[];
}

export interface SeoBlock {
  __component: "shared.seo";
  id: number;
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImage | StrapiImage[];
}

export type BlogBlock =
  | RichTextBlock
  | QuoteBlock
  | MediaBlock
  | SliderBlock
  | SeoBlock;

// ============================================
// ARTICLE (Estructura completa de Strapi)
// ============================================

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  locale?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: number;
  cover?: StrapiImage;
  author?: Author;
  category?: Category;
  tags?: Tag[];
  blocks?: BlogBlock[];
  excerpt?: string;
  keywords?: string[];
  localizations?: Array<{
    id: number;
    documentId: string;
    locale: string;
    slug: string;
  }>;
}

export type BlogPost = Article;

// ============================================
// RESPUESTAS DE LA API DE STRAPI
// ============================================

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ============================================
// TIPOS PARA EL FRONTEND
// ============================================

export interface MappedAuthor {
  id: number;
  documentId: string;
  name: string;
  slug: string; // ✅ AÑADIDO
  email: string;
  bio: string | undefined;
  url?: string;
  image: {
    src: string;
    alt: string;
  } | null;
}

export interface MappedPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  cover: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  excerpt?: string;
  category: {
    id: number;
    name: string;
    slug: string;
    color?: string;
  };
  author: {
    id: number;
    documentId: string;
    name: string;
    slug: string; // ✅ AÑADIDO
    email: string;
    avatar: string | null;
  };
  tags?: Tag[];
}

export interface MappedPostDetail {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  locale?: string;
  description: string;
  excerpt?: string;
  body: BlogBlock[];
  publishedAt: string;
  _createdAt: string;
  updatedAt: string;
  coverImage: string | null;
  mainImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  category: {
    id: number;
    name: string;
    slug: string;
    color?: string;
  } | null;
  author: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    email: string;
    bio: string;
    url?: string;
    image: {
      src: string;
      alt: string;
    } | null;
  } | null;
  estReadingTime: string;
  categories: Array<{
    title: string;
    slug: { current: string };
    color: string | undefined;
  }>;
  tags: Tag[];
  keywords?: string[];
  localizations?: Array<{
    locale: string;
    slug: string;
  }>;
}

export function getStrapiMedia(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export function toMappedPost(article: Article): MappedPost | null {
  if (!article.cover?.url || !article.author || !article.category) return null;

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    description: article.description,
    excerpt: article.excerpt,
    cover: getStrapiMedia(article.cover.url),
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    readingTime: article.readingTime || 5,
    category: {
      id: article.category.id,
      name: article.category.name,
      slug: article.category.slug,
      color: article.category.color,
    },
    author: {
      id: article.author.id,
      documentId: article.author.documentId,
      name: article.author.name,
      slug: article.author.slug, // ✅ AÑADIDO
      email: article.author.email || "",
      avatar: article.author.avatar?.url
        ? getStrapiMedia(article.author.avatar.url)
        : null,
    },
  };
}

export function toMappedPostDetail(article: Article): MappedPostDetail | null {
  if (!article.cover?.url) return null;

  const coverUrl = getStrapiMedia(article.cover.url);
  const avatarUrl = article.author?.avatar?.url
    ? getStrapiMedia(article.author.avatar.url)
    : null;

  const authorUrl =
    article.author?.url ||
    (article.author?.slug ? `/blog/author/${article.author.slug}` : undefined);

  return {
    id: article.id,
    documentId: article.documentId,
    slug: article.slug,
    title: article.title,
    description: article.description,
    excerpt: article.excerpt,
    body: article.blocks || [],
    publishedAt: article.publishedAt,
    _createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    coverImage: coverUrl,
    mainImage: {
      src: coverUrl,
      alt: article.cover.alternativeText || article.title,
      width: article.cover.width || 1200,
      height: article.cover.height || 630,
    },
    category: article.category
      ? {
          id: article.category.id,
          name: article.category.name,
          slug: article.category.slug,
          color: article.category.color,
        }
      : null,
    author: article.author
      ? {
          id: article.author.id,
          documentId: article.author.documentId,
          name: article.author.name,
          slug: article.author.slug, // ✅ AÑADIDO
          email: article.author.email || "",
          bio: article.author.bio || "",
          url: authorUrl,
          image: avatarUrl
            ? {
                src: avatarUrl,
                alt: article.author.name,
              }
            : null,
        }
      : null,
    estReadingTime: `${article.readingTime || 5}`,
    categories: article.category
      ? [
          {
            title: article.category.name,
            slug: { current: article.category.slug },
            color: article.category.color,
          },
        ]
      : [],
    tags: article.tags || [],
    keywords: article.keywords,
  };
}
