// src/lib/strapi/mappers.ts

import type {
  BlogPost,
  MappedPost,
  MappedPostDetail,
  Author,
  MappedAuthor,
} from "@/types/strapi";

import {
  getStrapiImageUrl,
  calculateReadingTime,
  extractPlainText,
} from "./helpers";

/**
 * Mapea un BlogPost de Strapi al formato MappedPost para tarjetas/listados
 * Convierte la estructura compleja de Strapi en un formato simplificado
 * para usar en componentes de UI como tarjetas de blog
 *
 * @param post - Artículo completo desde Strapi
 * @returns Objeto simplificado con los datos esenciales del post
 *
 * @example
 * const strapiPost = await getArticleBySlug('mi-articulo');
 * const cardData = mapPostToCard(strapiPost);
 * // cardData ahora tiene: { id, slug, title, cover, category, author, ... }
 */
export function mapPostToCard(post: BlogPost): MappedPost {
    // LOG: Ver estructura del autor y sus localizaciones
    if (post.author) {
      console.log('[mapPostToCard] Autor recibido:', post.author);
      if (post.author.localizations) {
        console.log('[mapPostToCard] Localizaciones del autor:', post.author.localizations);
      }
    }
  // Calcular tiempo de lectura si no existe
  let readingTime = post.readingTime;

  if (!readingTime && post.blocks) {
    // Extraer texto de todos los bloques rich-text
    const allText = post.blocks
      .filter((block) => block.__component.includes("rich-text"))
      .map((block) => ("body" in block ? block.body : ""))
      .join(" ");

    readingTime = calculateReadingTime(extractPlainText(allText));
  }

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    updatedAt: post.updatedAt,

    // Obtener URL de la imagen de portada (tamaño medium)
    cover: getStrapiImageUrl(post.cover, "medium"),

    // Usar publishedAt o createdAt como fallback
    publishedAt: post.publishedAt || post.createdAt,
    readingTime: readingTime || 5,

    // Mapear categoría con valores por defecto
    category: {
      id: post.category?.id || 0,
      name: post.category?.name || "uncategorized",
      slug: post.category?.slug || "uncategorized",
      color: post.category?.color || "blue",
    },

    // Mapear autor con localización correcta (name y slug traducidos)
    author: (() => {
      if (!post.author) {
        console.log('[mapPostToCard] Autor no existe, devolviendo Anonymous');
        return {
          id: 0,
          documentId: "",
          name: "Anonymous",
          slug: "",
          avatar: null,
          email: ""
        };
      }
      let name = post.author.name;
      let slug = post.author.slug;
      let localizationUsed = null;
      if (post.author.localizations && Array.isArray(post.author.localizations)) {
        const match = post.author.localizations.find(l => l.locale === post.locale);
        if (match) {
          name = match.name || name;
          slug = match.slug || slug;
          localizationUsed = match;
        }
      }
      console.log('[mapPostToCard] Autor final:', {
        id: post.author.id || 0,
        documentId: post.author.documentId || "",
        name,
        slug,
        avatar: post.author.avatar?.url ? getStrapiImageUrl(post.author.avatar, "thumbnail") : null,
        email: post.author.email || "",
        localizationUsed
      });
      return {
        id: post.author.id || 0,
        documentId: post.author.documentId || "",
        name,
        slug,
        avatar: post.author.avatar?.url ? getStrapiImageUrl(post.author.avatar, "thumbnail") : null,
        email: post.author.email || ""
      };
    })(),
  };
}

/**
 * Mapea múltiples posts a formato de tarjeta
 * Útil para listados de artículos
 *
 * @param posts - Array de artículos desde Strapi
 * @returns Array de posts simplificados
 */
export function mapPostsToCards(posts: BlogPost[]): MappedPost[] {
  // console.log("🔄 Mapeando posts a tarjetas. Total:", posts.length);

  const mapped = posts.map(mapPostToCard);

  // console.log("✅ Posts mapeados exitosamente:", mapped.length);
  return mapped;
}

/**
 * Mapea un post individual completo para la página de detalle
 * Incluye todos los campos necesarios para renderizar un artículo completo:
 * - Contenido (blocks)
 * - Imágenes en múltiples formatos
 * - Información completa del autor (con bio)
 * - Metadatos y SEO
 *
 * @param post - Artículo completo desde Strapi
 * @returns Objeto completo con todos los datos del post o null si no existe
 */
export function mapSinglePost(post: BlogPost | null): MappedPostDetail | null {
  if (!post) return null;

  // Calcular tiempo de lectura
  let readingTime = post.readingTime;

  if (!readingTime && post.blocks) {
    const allText = post.blocks
      .filter((block) => block.__component.includes("rich-text"))
      .map((block) => ("body" in block ? block.body : ""))
      .join(" ");

    readingTime = calculateReadingTime(extractPlainText(allText));
  }

  // Asegurar fechas válidas
  const publishedAt =
    post.publishedAt || post.createdAt || new Date().toISOString();
  const createdAt = post.createdAt || publishedAt;

  // Procesar imagen de portada
  const coverImageUrl = getStrapiImageUrl(post.cover, "large");
  const hasCoverImage = coverImageUrl !== "/placeholder.jpg";

  // Procesar avatar del autor
  let name = post.author?.name || "Anonymous";
  let slug = post.author?.slug || "";
  let localizationUsed = null;
  if (post.author && post.author.localizations && Array.isArray(post.author.localizations)) {
    const match = post.author.localizations.find(l => l.locale === post.locale);
    if (match) {
      name = match.name || name;
      slug = match.slug || slug;
      localizationUsed = match;
    }
  }
  const avatarUrl = post.author
    ? getStrapiImageUrl(post.author.avatar, "thumbnail")
    : null;
  const hasAvatar = avatarUrl && avatarUrl !== "/placeholder.jpg";

  console.log('[mapSinglePost] Autor recibido:', post.author);
  if (post.author && post.author.localizations) {
    console.log('[mapSinglePost] Localizaciones del autor:', post.author.localizations);
  }
  console.log('[mapSinglePost] Autor final:', {
    id: post.author?.id || 0,
    documentId: post.author?.documentId || "",
    name,
    slug,
    avatar: avatarUrl,
    email: post.author?.email || "",
    bio: post.author?.bio || "",
    localizationUsed
  });

  return {
    // Identificadores
    id: post.id,
    documentId: post.documentId,

    // Contenido principal
    title: post.title || "No Title",
    slug: post.slug,
    locale: post.locale,
    description: post.description || "",
    body: post.blocks || [], // Bloques de contenido dinámico

    // Sistema de fechas
    publishedAt: publishedAt,
    _createdAt: createdAt,
    updatedAt: post.updatedAt || createdAt,

    // Imágenes - Formato legacy (compatibilidad)
    coverImage: hasCoverImage ? coverImageUrl : null,

    // Imágenes - Formato completo con metadatos
    mainImage: hasCoverImage
      ? {
          src: coverImageUrl,
          alt:
            post.cover?.alternativeText || post.title || "Image cover",
          width: post.cover?.width || 800,
          height: post.cover?.height || 600,
        }
      : null,

    // Categoría con toda la información
    category: post.category
      ? {
          id: post.category.id,
          name: post.category.name,
          slug: post.category.slug,
          color: post.category.color,
        }
      : null,

    // Autor con información completa incluyendo bio y traducción
    author: post.author
      ? {
          id: post.author.id,
          documentId: post.author.documentId,
          name,
          email: post.author.email || "",
          bio: post.author.bio || "",
          slug,
          image: hasAvatar
            ? {
                src: avatarUrl!,
                alt: name || "Author's avatar",
              }
            : null,
        }
      : null,

    // Tiempo de lectura estimado (como string para compatibilidad)
    estReadingTime: (readingTime || 5).toString(),

    // Categorías en formato array (para componentes que esperan múltiples)
    categories: post.category
      ? [
          {
            title: post.category.name,
            slug: { current: post.category.slug },
            color: post.category.color,
          },
        ]
      : [],

    // Tags del artículo
    tags: post.tags || [],
    
    // ✅ Localizaciones para cambio de idioma
    localizations: post.localizations?.map(loc => ({
      locale: loc.locale,
      slug: loc.slug,
    })) || [],
  };
}

// ==============================================
// UTILIDADES DE EXTRACCIÓN DE CONTENIDO
// ==============================================

/**
 * Extrae el contenido de texto plano de los bloques de un post
 * Útil para generar descripciones, calcular tiempo de lectura, etc.
 *
 * @param post - Artículo con bloques de contenido
 * @returns Texto plano extraído de todos los bloques rich-text
 */
export function extractPostContent(post: BlogPost): string {
  if (!post.blocks) return "";

  return post.blocks
    .filter((block) => block.__component.includes("rich-text"))
    .map((block) => {
      if ("body" in block) {
        return extractPlainText(block.body);
      }
      return "";
    })
    .join("\n\n");
}

/**
 * Calcula el tiempo de lectura estimado de un post
 * Si el post ya tiene readingTime, lo usa, sino lo calcula
 *
 * @param post - Artículo del blog
 * @returns Tiempo de lectura en minutos
 */
export function calculatePostReadingTime(post: BlogPost): number {
  if (post.readingTime) return post.readingTime;

  const content = extractPostContent(post);
  return calculateReadingTime(content);
}

// ==============================================
// MAPPERS PARA AUTORES
// ==============================================

/**
 * Mapea un autor de Strapi al formato usado en componentes
 *
 * @param author - Autor desde Strapi
 * @param postsCount - Número de posts del autor (opcional)
 * @returns Autor simplificado con contador de posts
 */
// ✅ DESPUÉS (correcto)
export function mapAuthor(
  author: Author,
): MappedAuthor {
  const avatarUrl = getStrapiImageUrl(author.avatar, "thumbnail");
  const hasAvatar = avatarUrl && avatarUrl !== "/placeholder.jpg";

  return {
    id: author.id,
    documentId: author.documentId,
    name: author.name,
    email: author.email || "",
    bio: author.bio,
    slug: author.slug || author.documentId || "anonymous", // ✅ CORREGIDO - slug como string
    image: hasAvatar
      ? {
          src: avatarUrl,
          alt: author.name || "Author's avatar",
        }
      : null,
  };
}

/**
 * Mapea múltiples autores calculando el número de posts de cada uno
 *
 * @param authors - Lista de autores
 * @param articles - Lista de artículos para contar por autor
 * @returns Autores con contador de posts

export function mapAuthorsWithPostCount(
  authors: Author[],
  articles: Article[] | BlogPost[]
): MappedAuthor[] {
  return authors.map((author) => {
    // Contar artículos de este autor
    const postsCount = articles.filter(
      (article) => article.author?.documentId === author.documentId
    ).length;

    return mapAuthor(author, postsCount);
  });
}

 */