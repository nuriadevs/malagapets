// src/lib/strapi/helpers.ts

import { getStrapiMediaUrl } from "@/config/constants";
import type { StrapiImage, MappedPostDetail, SeoBlock, Category, Author } from "@/types/strapi";
import type { Metadata } from "next";
import { SITE_URL } from "@/config/constants";

const siteUrl = SITE_URL;

/**
 * Obtiene la URL base de Strapi
 * @deprecated Use env.strapiUrl from @/lib/env instead
 */
export function getStrapiURL(): string {
  return getStrapiMediaUrl("");
}


/**
 * Obtiene la URL completa de una imagen de Strapi
 * Soporta diferentes tamaños de imagen
 */
export function getStrapiImageUrl(
  image: StrapiImage | null | undefined,
  size: "thumbnail" | "small" | "medium" | "large" | "original"
): string {
  if (!image) {
    // Placeholder con dimensiones según el tamaño
    const dimensions = {
      thumbnail: "150x150",
      small: "500x500",
      medium: "750x750",
      large: "1000x1000",
      original: "1200x800",
    };
    
    const dim = dimensions[size];
    return `https://placehold.co/${dim}/e2e8f0/64748b?text=Sin+Imagen`;
  }

  // Si se solicita un tamaño específico, intentar obtenerlo
  if (size !== "original" && image.formats?.[size]) {
    const formatUrl = image.formats[size].url;
    return formatUrl.startsWith("http")
      ? formatUrl
      : getStrapiMediaUrl(formatUrl);
  }

  // Fallback a la imagen original
  const url = image.url;
  return url.startsWith("http") ? url : getStrapiMediaUrl(url);
}



/**
 * Formatea una fecha en formato corto
 * @example formatDateShort('2024-01-15') // "15 ene 2024"
 */
export function formatDateShort(date?: string): string {
  if (!date) return "";

  const d = new Date(date);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

/**
 * Formatea una fecha en formato largo
 * @example formatDateLong('2024-01-15') // "15 de enero de 2024"
 */
export function formatDateLong(date?: string): string {
  if (!date) return "";

  const d = new Date(date);
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Calcula el tiempo de lectura estimado
 * @param text - Texto del artículo
 * @returns Minutos estimados de lectura
 */
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

/**
 * Extrae texto plano de contenido markdown/html
 * @param content - Contenido con markup
 * @returns Texto limpio sin HTML ni markdown
 */
export function extractPlainText(content: string): string {
  return content
    .replace(/<[^>]*>/g, "") // Eliminar tags HTML
    .replace(/[#*_~`]/g, "") // Eliminar markdown
    .trim();
}

/**
 * Trunca texto a un número específico de caracteres
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado con "..." si es necesario
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Convierte un string a slug (URL-friendly)
 * @example slugify("Hola Mundo Málaga") // "hola-mundo-malaga"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, "") // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/-+/g, "-"); // Eliminar guiones múltiples
}

// ============================================
// FUNCIONES SEO
// ============================================





/**
 * Extrae el componente SEO del dynamic zone blocks
 * @param post - Post mapeado con blocks
 * @returns Objeto con metaTitle, metaDescription y shareImage o null
 */
export function extractSeoFromBlocks(post: MappedPostDetail | null): {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImage;
} | null {
  if (!post?.body || !Array.isArray(post.body)) {
    return null;
  }

  const seoBlock = post.body.find(
    (block): block is SeoBlock => block.__component === "shared.seo"
  );

  if (!seoBlock) {
    return null;
  }

  // ✅ Normalizar shareImage: tomar el primero si es array
  const normalizedShareImage = Array.isArray(seoBlock.shareImage)
    ? seoBlock.shareImage[0]
    : seoBlock.shareImage;

  return {
    metaTitle: seoBlock.metaTitle,
    metaDescription: seoBlock.metaDescription,
    shareImage: normalizedShareImage,
  };
}

/**
 * Obtiene el título SEO con fallbacks
 * Prioridad: SEO metaTitle > Post title
 */
export function getSeoTitle(
  post: MappedPostDetail | null,
  siteName = "MálagaPets"
): string {
  const seo = extractSeoFromBlocks(post);

  if (seo?.metaTitle) {
    return `${seo.metaTitle} | ${siteName}`;
  }

  if (post?.title) {
    return `${post.title} | ${siteName} Blog`;
  }

  return `${siteName} Blog`;
}

/**
 * Obtiene la descripción SEO con fallbacks
 * Prioridad: SEO metaDescription > Post description
 */
export function getSeoDescription(post: MappedPostDetail | null): string {
  const seo = extractSeoFromBlocks(post);

  if (seo?.metaDescription) {
    return seo.metaDescription;
  }

  if (post?.description) {
    return post.description;
  }

  return "Artículo del blog de MálagaPets";
}

// ============================================
// URL BUILDERS PARA POST METADATA
// ============================================

/**
 * Construye la URL completa del post
 */
export function buildPostUrl(locale: string, slug: string): string {
  return `${siteUrl}/${locale}/blog/post/${slug}`;
}

/**
 * Obtiene la URL de la imagen de portada con fallback
 */
/**
 * Obtiene la URL de la imagen de portada con fallback
 * Prioridad: SEO shareImage > Post coverImage > Default
 */
export function getCoverImageUrl(post: MappedPostDetail): string {
  // 1️⃣ Prioridad: shareImage del bloque SEO
  const seo = extractSeoFromBlocks(post);
  if (seo?.shareImage) {
    const shareImageUrl = getStrapiImageUrl(seo.shareImage, "large");
    return shareImageUrl.startsWith("http")
      ? shareImageUrl
      : `${siteUrl}${shareImageUrl}`;
  }

  // 2️⃣ Fallback: coverImage del post
  if (post.coverImage) {
    return post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteUrl}${post.coverImage}`;
  }

  // 3️⃣ Última opción: imagen por defecto
  return `${siteUrl}/images/default-blog-cover.jpg`;
}
/**
 * Genera las URLs alternativas para i18n
 */
export function generateAlternateUrls(slug: string) {
  const locales = ["es", "en", "de", "fr"] as const;

  return {
    canonical: buildPostUrl("es", slug),
    languages: Object.fromEntries(
      locales.map((locale) => [locale, buildPostUrl(locale, slug)])
    ),
  };
}

// ============================================
// DATA EXTRACTORS
// ============================================

/**
 * Extrae nombres de tags del post
 */
export function extractTagNames(post: MappedPostDetail): string[] {
  return post.tags?.map((tag) => tag.name) || [];
}

/**
 * Obtiene el nombre de la categoría con fallback
 */
export function getCategoryName(post: MappedPostDetail): string {
  return post.category?.name || "Blog";
}

// ============================================
// METADATA BUILDERS
// ============================================

/**
 * Construye metadata de Open Graph
 */
export function buildOpenGraphMetadata(
  post: MappedPostDetail,
  postUrl: string,
  coverImageUrl: string,
  locale: string,
  seoDescription: string
) {
  const tagNames = extractTagNames(post);

  return {
    type: "article" as const,
    title: post.title,
    description: seoDescription,
    url: postUrl,
    siteName: "MálagaPets",
    locale: locale,
    images: [
      {
        url: coverImageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: post.author ? [post.author.name] : ["MálagaPets"],
    ...(tagNames.length > 0 && { tags: tagNames }),
  };
}

/**
 * Construye metadata de Twitter Card
 */
export function buildTwitterMetadata(
  post: MappedPostDetail,
  coverImageUrl: string,
  seoDescription: string
) {
  return {
    card: "summary_large_image" as const,
    title: post.title,
    description: seoDescription,
    images: [coverImageUrl],
    creator: "@malagapets",
  };
}

/**
 * Construye metadata adicional del artículo
 */
export function buildArticleMetadata(post: MappedPostDetail) {
  const tagNames = extractTagNames(post);
  const categoryName = getCategoryName(post);

  return {
    "article:published_time": post.publishedAt,
    "article:modified_time": post.updatedAt || post.publishedAt,
    "article:author": post.author?.name || "MálagaPets",
    "article:section": categoryName,
    ...(tagNames.length > 0 && { "article:tag": tagNames.join(", ") }),
  };
}

/**
 * Construye directives de robots/crawlers
 */
export function buildRobotsMetadata() {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  };
}

// ============================================
// METADATA GENERATION - FUNCIÓN PRINCIPAL
// ============================================

/**
 * Genera metadata completa para un post
 * Función principal que orquesta todas las utilidades
 */
export function generatePostMetadata(
  post: MappedPostDetail,
  locale: string,
  slug: string
): Metadata {
  const seoTitle = getSeoTitle(post, "MálagaPets");
  const seoDescription = getSeoDescription(post);
  const postUrl = buildPostUrl(locale, slug);
  const coverImageUrl = getCoverImageUrl(post);
  const tagNames = extractTagNames(post);
  const categoryName = getCategoryName(post);

  return {
    title: seoTitle,
    description: seoDescription,
    
    // ✅ AÑADIR KEYWORDS
    keywords: tagNames.length > 0 ? tagNames.join(", ") : undefined,
    
    // ✅ AÑADIR CATEGORY
    category: categoryName,
    
    // ✅ AÑADIR STRUCTURED AUTHORS
    authors: post.author
      ? [{ name: post.author.name, url: `${siteUrl}/${locale}/author/${post.author.slug ? post.author.slug : ''}` }]
      : [{ name: "MálagaPets" }],
    
    // ✅ AÑADIR CREATOR/PUBLISHER
    creator: post.author?.name || "MálagaPets",
    publisher: "MálagaPets",
    
    alternates: generateAlternateUrls(slug),
    openGraph: buildOpenGraphMetadata(
      post,
      postUrl,
      coverImageUrl,
      locale,
      seoDescription
    ),
    twitter: buildTwitterMetadata(post, coverImageUrl, seoDescription),
    other: buildArticleMetadata(post),
    robots: buildRobotsMetadata(),
  };
}








// ============================================
// FUNCIONES SEO PARA CATEGORY
// ============================================

/**
 * Extrae datos SEO de una categoría desde blocks (Dynamic Zone)
 */
export function extractCategorySeo(category: Category | null): {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImage;
} | null {
  // ✅ Buscar en blocks como en los posts
  if (!category?.blocks || !Array.isArray(category.blocks)) {
    return null;
  }

  const seoBlock = category.blocks.find(
    (block): block is SeoBlock => block.__component === "shared.seo"
  );

  if (!seoBlock) {
    return null;
  }

  // Normalizar shareImage: tomar el primero si es array
  const normalizedShareImage = Array.isArray(seoBlock.shareImage)
    ? seoBlock.shareImage[0]
    : seoBlock.shareImage;

  return {
    metaTitle: seoBlock.metaTitle,
    metaDescription: seoBlock.metaDescription,
    shareImage: normalizedShareImage,
  };
}

/**
 * Obtiene el título SEO de categoría con fallbacks
 * Prioridad: SEO metaTitle > Category name
 */
export function getCategorySeoTitle(
  category: Category | null,
  siteName = "MálagaPets"
): string {
  const seo = extractCategorySeo(category);
  
  if (seo?.metaTitle) {
    return `${seo.metaTitle} | ${siteName}`;
  }
  
  if (category?.name) {
    return `${category.name} | Blog ${siteName}`;
  }
  
  return `Blog | ${siteName}`;
}

/**
 * Obtiene la descripción SEO de categoría con fallbacks
 * Prioridad: SEO metaDescription > Category description
 */
export function getCategorySeoDescription(category: Category | null): string {
  const seo = extractCategorySeo(category);
  
  if (seo?.metaDescription) {
    return seo.metaDescription;
  }
  
  if (category?.description) {
    return category.description;
  }
  
  if (category?.name) {
    return `Descubre todos los artículos sobre ${category.name} en el blog de MálagaPets`;
  }
  
  return "Blog de MálagaPets";
}

/**
 * Obtiene la URL de imagen de categoría con fallbacks
 * Prioridad: SEO shareImage > Default
 */
export function getCategoryCoverImageUrl(category: Category | null): string {
  const seo = extractCategorySeo(category);
  
  // Prioridad: shareImage del SEO
  if (seo?.shareImage) {
    const imageUrl = getStrapiImageUrl(seo.shareImage, "large");
    return imageUrl.startsWith("http")
      ? imageUrl
  : getStrapiMediaUrl(imageUrl);
  }
  
  // Fallback: imagen por defecto
  return `${siteUrl}/images/default-category.jpg`;
}

// ============================================
// FUNCIONES SEO PARA AUTHOR
// ============================================

/**
 * Extrae datos SEO de un autor desde blocks (Dynamic Zone)
 */
export function extractAuthorSeo(author: Author | null): {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: StrapiImage;
} | null {
  // ✅ Buscar en blocks como en los posts
  if (!author?.blocks || !Array.isArray(author.blocks)) {
    return null;
  }

  const seoBlock = author.blocks.find(
    (block): block is SeoBlock => block.__component === "shared.seo"
  );

  if (!seoBlock) {
    return null;
  }

  // Normalizar shareImage: tomar el primero si es array
  const normalizedShareImage = Array.isArray(seoBlock.shareImage)
    ? seoBlock.shareImage[0]
    : seoBlock.shareImage;

  return {
    metaTitle: seoBlock.metaTitle,
    metaDescription: seoBlock.metaDescription,
    shareImage: normalizedShareImage,
  };
}

/**
 * Obtiene el título SEO de autor con fallbacks
 * Prioridad: SEO metaTitle > Author name
 */
export function getAuthorSeoTitle(
  author: Author | null,
  siteName = "MálagaPets"
): string {
  const seo = extractAuthorSeo(author);
  
  if (seo?.metaTitle) {
    return `${seo.metaTitle} | ${siteName}`;
  }
  
  if (author?.name) {
    return `${author.name} - Autor | Blog ${siteName}`;
  }
  
  return `Autores | ${siteName}`;
}

/**
 * Obtiene la descripción SEO de autor con fallbacks
 * Prioridad: SEO metaDescription > Author bio
 */
export function getAuthorSeoDescription(author: Author | null): string {
  const seo = extractAuthorSeo(author);
  
  if (seo?.metaDescription) {
    return seo.metaDescription;
  }
  
  if (author?.bio) {
    return author.bio;
  }
  
  if (author?.name) {
    return `Artículos escritos por ${author.name} en el blog de MálagaPets`;
  }
  
  return "Autores del blog de MálagaPets";
}

/**
 * Obtiene la URL de imagen de autor con fallbacks
 * Prioridad: SEO shareImage > Author avatar > Default
 */
export function getAuthorCoverImageUrl(author: Author | null): string {
  const seo = extractAuthorSeo(author);
  
  // 1️⃣ Prioridad: shareImage del SEO
  if (seo?.shareImage) {
    const imageUrl = getStrapiImageUrl(seo.shareImage, "large");
    return imageUrl.startsWith("http")
      ? imageUrl
  : getStrapiMediaUrl(imageUrl);
  }
  
  // 2️⃣ Fallback: avatar del autor
  if (author?.avatar) {
    const avatarUrl = getStrapiImageUrl(author.avatar, "large");
    return avatarUrl.startsWith("http")
      ? avatarUrl
  : getStrapiMediaUrl(avatarUrl);
  }
  
  // 3️⃣ Última opción: imagen por defecto
  return `${siteUrl}/images/default-author.jpg`;
}