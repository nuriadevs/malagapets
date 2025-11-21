// src/lib/strapi/api.ts

import { fetchAPI } from "./client";
import { defaultLocale } from "./config";
import { mapSinglePost, mapPostsToCards } from "./mappers";

import type {
  Article,
  Author,
  Category,
  StrapiResponse,
  MappedPost,
  MappedPostDetail,
  BlogPost,
} from "@/types/strapi";

/**
 * Parámetros para paginación de artículos
 */
interface PaginationParams {
  locale?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Respuesta paginada de artículos
 */
interface PaginatedResponse {
  posts: MappedPost[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

type PostsResponse = StrapiResponse<BlogPost[]>;

/**
 * Tipo para valores de query parameters
 */
type QueryValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | null
  | undefined;

function buildQueryString(params: Record<string, QueryValue>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "object") {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  return searchParams.toString();
}

/**
 * Busca posts por título con coincidencia exacta de palabras
 * A diferencia de searchArticles de api.ts, esta hace búsqueda exacta palabra por palabra
 */
export async function searchPostsByTitle(
  query: string,
  locale = "es",
  page = 1,
  pageSize = 9
): Promise<PostsResponse> {
  const allParams = {
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "sort[0]": "publishedAt:desc",
    populate: "*",
    "pagination[page]": "1",
    "pagination[pageSize]": "100",
  };

  const response = await fetchAPI<PostsResponse>(
    `/articles?${buildQueryString(allParams)}`
  );

  if (!query.trim()) {
    return { data: [], meta: response.meta };
  }

  const searchWords = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);

  const filteredPosts = response.data.filter((post) => {
    const title = post.title.toLowerCase();
    const titleWords = title
      .split(/[\s\-_.,;:!?()[\]{}'"]+/)
      .filter((w) => w.length > 0);
    return searchWords.every((searchWord) =>
      titleWords.some((titleWord) => titleWord === searchWord)
    );
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    data: paginatedPosts,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(filteredPosts.length / pageSize),
        total: filteredPosts.length,
      },
    },
  };
}

/**
 * Construye un query string para las peticiones a Strapi
 * @param params - Objeto con parámetros de consulta
 * @returns Query string formateado
 * @example
 * buildQuery({ locale: 'es', 'populate[cover]': '*' })
 */
function buildQuery(params: Record<string, QueryValue>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

// ==============================================
// ARTÍCULOS - Funciones principales
// ==============================================

/**
 * Obtiene todas las versiones localizadas de un artículo por documentId
 * @param documentId - ID del documento en Strapi
 * @returns Array de artículos en diferentes idiomas
 */
export async function getArticleLocalizations(
  documentId: string
): Promise<Array<{ locale: string; slug: string }>> {
  // ✅ Para obtener todas las localizaciones, NO incluimos el parámetro locale
  const query = buildQuery({
    "filters[document_id][$eq]": documentId,
    "fields[0]": "slug",
    "fields[1]": "locale",
    "fields[2]": "document_id",
  });

  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>(
      `/articles?${query}`
    );

    return response.data.map((article) => ({
      locale: article.locale || "es",
      slug: article.slug,
    }));
  } catch (error) {
    console.error("❌ Error fetching localizations by documentId:", error);
    return [];
  }
}

/**
 * Obtiene todas las versiones localizadas de una categoría por documentId
 * @param documentId - ID del documento en Strapi
 * @returns Array de categorías en diferentes idiomas
 */
export async function getCategoryLocalizations(
  documentId: string
): Promise<Array<{ locale: string; slug: string }>> {
  // ✅ Buscar la categoría base y poblar SOLO los campos necesarios de localizations
  const query = buildQuery({
    "filters[documentId][$eq]": documentId,
    "populate[localizations][fields][0]": "locale",
    "populate[localizations][fields][1]": "slug",
    "populate[localizations][fields][2]": "name",
    "populate[localizations][fields][3]": "documentId",
  });

  console.log('🔍 Query URL para localizaciones:', `/categories?${query}`);

  try {
    const response = await fetchAPI<StrapiResponse<Category[]>>(
      `/categories?${query}`
    );

    if (!response.data || response.data.length === 0) {
      console.log('⚠️ No se encontró categoría con documentId:', documentId);
      return [];
    }

    const category = response.data[0];
    const result: Array<{ locale: string; slug: string }> = [];

    // ✅ Agregar la categoría base (versión actual)
    result.push({
      locale: category.locale || "es",
      slug: category.slug,
    });

    console.log('📦 Categoría base:', { locale: category.locale, slug: category.slug });

    // ✅ Agregar todas las localizaciones (otras versiones de idioma)
    if (category.localizations && Array.isArray(category.localizations)) {
      category.localizations.forEach((loc) => {
        result.push({
          locale: loc.locale,
          slug: loc.slug,
        });
        console.log('📦 Localización encontrada:', { locale: loc.locale, slug: loc.slug });
      });
    } else {
      console.log('⚠️ No hay localizaciones adicionales');
    }

    console.log('📦 Total de localizaciones:', result.length);
    console.log('📍 Localizaciones completas:', result);

    return result;
  } catch (error) {
    console.error("❌ Error fetching category localizations by documentId:", error);
    return [];
  }
}

/**
 * Obtiene todos los artículos con información completa
 * Incluye: portada, autor con avatar, categoría, tags
 * @param locale - Código de idioma (por defecto: español)
 * @returns Artículos mapeados con metadatos de paginación
 */
export async function getAllArticles(
  locale = defaultLocale
): Promise<{ data: MappedPost[]; meta: StrapiResponse<Article[]>["meta"] }> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[author][populate][localizations][fields][0]": "locale",
    "populate[author][populate][localizations][fields][1]": "name",
    "populate[author][populate][localizations][fields][2]": "slug",
    "populate[category]": "*",
    "populate[tags]": "*",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": 100,
  });

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  return {
    data: mapPostsToCards(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene artículos con paginación
 * Útil para páginas de archivo/blog con navegación por páginas
 * @param params - Parámetros de paginación y localización
 * @returns Respuesta con artículos y metadatos de paginación
 */
export async function getArticles(
  params: PaginationParams = {}
): Promise<StrapiResponse<Article[]>> {
  const { locale = defaultLocale, page = 1, pageSize = 10 } = params;

  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[author][populate][localizations][fields][0]": "locale",
    "populate[author][populate][localizations][fields][1]": "name",
    "populate[author][populate][localizations][fields][2]": "slug",
    "populate[category]": "*",
    "populate[tags]": "*",
    "sort[0]": "publishedAt:desc",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  });

  return fetchAPI<StrapiResponse<Article[]>>(`/articles?${query}`);
}

/**
 * Obtiene un artículo específico por su slug
 * Incluye todos los bloques de contenido (rich-text, quote, media, slider)
 * @param slug - Identificador único del artículo en URL
 * @param locale - Código de idioma
 * @returns Artículo completo mapeado o null si no existe
 * @throws Error si el artículo no se encuentra
 */
export async function getArticleBySlug(
  slug: string,
  locale = defaultLocale
): Promise<MappedPostDetail | null> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "filters[slug][$eq]": slug,
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",

    // Populate de categoría con todos los campos incluyendo color
    "populate[category][fields][0]": "name",
    "populate[category][fields][1]": "slug",
    "populate[category][fields][2]": "description",
    "populate[category][fields][3]": "color",

    "populate[tags]": "*",
    
    // ✅ Populate de localizaciones - usar populate simple con *
    "populate[localizations]": "*",

    // Dynamic Zone: especificar componentes individuales
    "populate[blocks][on][shared.rich-text][populate]": "*",
    "populate[blocks][on][shared.quote][populate]": "*",
    "populate[blocks][on][shared.media][populate][file]": "*",
    "populate[blocks][on][shared.slider][populate][files": "*",
    "populate[blocks][on][shared.seo][populate]": "*",
  });

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  if (!response.data || response.data.length === 0) {
    throw new Error(`Article with slug "${slug}" not found`);
  }

  // Cast seguro: sabemos que Article tiene la estructura de BlogPost
  return mapSinglePost(response.data[0] as BlogPost);
}

/**
 * Obtiene todos los slugs de artículos
 * Útil para generar páginas estáticas (generateStaticParams en Next.js)
 * @param locale - Código de idioma
 * @returns Array de slugs
 */
export async function getAllArticleSlugs(
  locale = defaultLocale
): Promise<string[]> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "fields[0]": "slug",
    "pagination[pageSize]": 100,
  });

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  return response.data.map((article) => article.slug);
}

/**
 * Obtiene artículos para el archivo/blog con paginación
 * Optimizado para la página principal del blog
 * @param params - Parámetros de paginación
 * @returns Posts mapeados con información de paginación
 */
export async function getPaginatedPostsForArchive(
  params: PaginationParams = {}
): Promise<PaginatedResponse> {
  const { page = 1, pageSize = 10, locale = defaultLocale } = params;

  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "sort[0]": "publishedAt:desc",
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[category]": "*",
    "populate[tags]": "*",
  });

  console.log("📡 Fetching from Strapi with query:", query);

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  console.log("✅ Strapi response:", {
    totalArticles: response.data.length,
    meta: response.meta,
  });

  const mappedPosts = mapPostsToCards(response.data);

  return {
    posts: mappedPosts,
    pagination: response.meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: 1,
      total: mappedPosts.length,
    },
  };
}

/**
 * Obtiene todos los artículos con sus categorías (sin límite de paginación)
 * Útil para generar índices o páginas de categorías
 * @param locale - Código de idioma
 * @returns Array completo de artículos
 */
export async function getAllArticlesWithCategories(
  locale = defaultLocale
): Promise<Article[]> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[category]": "*",
    "sort[0]": "publishedAt:desc",
    "pagination[pageSize]": 100,
  });

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  return response.data;
}

// ==============================================
// CATEGORÍAS - Gestión de categorías del blog
// ==============================================

/**
 * Obtiene artículos filtrados por categoría
 * Utiliza endpoint personalizado de Strapi
 * @param categorySlug - Slug de la categoría
 * @param params - Parámetros de paginación
 * @returns Artículos de la categoría con información de la categoría
 */
export async function getArticlesByCategory(
  categorySlug: string,
  params: PaginationParams = {}
): Promise<StrapiResponse<Article[]> & { category: Category }> {
  const { locale = defaultLocale, page = 1, pageSize = 10 } = params;
  const query = buildQuery({ locale, page, pageSize });

  return fetchAPI<StrapiResponse<Article[]> & { category: Category }>(
    `/articles/by-category/${categorySlug}?${query}`
  );
}

/**
 * Obtiene artículos paginados de una categoría específica
 * @param categorySlug - Slug de la categoría
 * @param params - Parámetros de paginación
 * @returns Posts mapeados con información de paginación
 */
export async function getPaginatedPostsByCategory(
  categorySlug: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse> {
  const { page = 1, pageSize = 6, locale = defaultLocale } = params;

  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "filters[category][slug][$eq]": categorySlug,
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "sort[0]": "publishedAt:desc",
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[category]": "*",
    "populate[tags]": "*",
  });

  //console.log("📡 Fetching category posts from Strapi with query:", query);

  const response = await fetchAPI<StrapiResponse<Article[]>>(
    `/articles?${query}`
  );

  console.log("✅ Strapi category response:", {
    totalArticles: response.data.length,
    meta: response.meta,
  });

  const mappedPosts = mapPostsToCards(response.data);

  return {
    posts: mappedPosts,
    pagination: response.meta?.pagination || {
      page: 1,
      pageSize: pageSize,
      pageCount: 1,
      total: mappedPosts.length,
    },
  };
}

/**
 * Obtiene todas las categorías disponibles
 * @param locale - Código de idioma
 * @returns Lista de categorías ordenadas alfabéticamente
 */
export async function getCategories(
  locale = defaultLocale
): Promise<StrapiResponse<Category[]>> {
  const query = buildQuery({
    locale,
    "sort[0]": "name:asc",
    "pagination[pageSize]": 100,
  });

  return fetchAPI<StrapiResponse<Category[]>>(`/categories?${query}`);
}

/**
 * Obtiene slugs de todas las categorías
 * Para generación de páginas estáticas
 * @param locale - Código de idioma
 * @returns Array de slugs de categorías
 */
export async function getCategorySlugs(
  locale = defaultLocale
): Promise<string[]> {
  try {
    const { data } = await getCategories(locale);

    // ✅ Validar explícitamente que cada slug es un string válido
    return data
      .map((cat) => cat.slug)
      .filter((slug): slug is string => {
        const isValid = typeof slug === "string" && slug.trim().length > 0;
        if (!isValid) {
          console.warn(
            `⚠️ Invalid category slug detected in locale ${locale}:`,
            slug
          );
        }
        return isValid;
      })
      .map((slug) => slug.trim()); // ✅ Limpiar espacios
  } catch (error) {
    console.error(
      `❌ Error fetching category slugs for locale ${locale}:`,
      error
    );
    return []; // ✅ Devolver array vacío en caso de error
  }
}

/**
 * Obtiene una categoría específica por su slug
 * @param slug - Identificador único de la categoría en URL
 * @param locale - Código de idioma
 * @returns Categoría encontrada o null
 */
export async function getCategoryBySlug(
  slug: string,
  locale = defaultLocale
): Promise<Category | null> {
  const query = buildQuery({
  locale,
  "filters[locale][$eq]": locale,
  "filters[slug][$eq]": slug,
  "populate": "*", // ✅ Cambiar de fields a populate
});

  const response = await fetchAPI<StrapiResponse<Category[]>>(
    `/categories?${query}`
  );

  return response.data[0] || null;
}



/**
 * Busca una categoría por slug en TODOS los idiomas
 * Útil para encontrar el document_id cuando se tiene un slug pero no se sabe el idioma
 * @param slug - Slug de la categoría a buscar
 * @returns Categoría encontrada con su document_id o null
 */
export async function getCategoryByDocumentId(
  slug: string
): Promise<Category | null> {
  // ✅ NO incluir filtro de locale para buscar en todos los idiomas
  // ✅ Usar populate: "*" para forzar que Strapi devuelva document_id
  const query = buildQuery({
    "filters[slug][$eq]": slug,
    "populate": "*", // Esto fuerza a Strapi a incluir document_id
    "pagination[pageSize]": 1,
  });

  console.log(`🔍 Buscando categoría con slug: "${slug}"`);
  console.log(`📡 Query: /categories?${query}`);

  try {
    const response = await fetchAPI<StrapiResponse<Category[]>>(
      `/categories?${query}`
    );

    console.log(`📦 Respuesta de Strapi:`, {
      count: response.data.length,
      firstCategory: response.data[0] || null
    });

    if (response.data && response.data.length > 0) {
      const category = response.data[0];
      console.log(`✅ Categoría encontrada: ${category.name} (${category.locale})`);
      console.log(`📄 documentId:`, category.documentId);
      
      return category;
    }

    console.log(`⚠️ No se encontró categoría con slug: ${slug}`);
    return null;
  } catch (error) {
    console.error(`❌ Error buscando categoría por slug "${slug}":`, error);
    return null;
  }
}


// ==============================================
// AUTORES - Gestión de autores del blog
// ==============================================

/**
 * Obtiene artículos escritos por un autor específico
 * @param authorDocumentId - ID único del autor en Strapi
 * @param params - Parámetros de paginación
 * @returns Artículos del autor
 */
export async function getArticlesByAuthor(
  authorDocumentId: string,
  params: PaginationParams = {}
): Promise<StrapiResponse<Article[]>> {
  const { locale = defaultLocale, page = 1, pageSize = 10 } = params;
  const query = buildQuery({ locale, page, pageSize });

  return fetchAPI<StrapiResponse<Article[]>>(
    `/articles/by-author/${authorDocumentId}?${query}`
  );
}

/**
 * Obtiene todos los autores con sus avatares
 * @param locale - Código de idioma
 * @returns Lista de autores ordenados alfabéticamente
 
export async function getAuthors(
  locale = defaultLocale
): Promise<StrapiResponse<Author[]>> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // ✅ Filtro explícito por idioma
    "populate": "avatar", // ✅ Sintaxis simple para Strapi v5
    "sort[0]": "name:asc",
    "pagination[pageSize]": 100,
  });

  console.log(`📡 Fetching all authors for locale: ${locale}`);

  const response = await fetchAPI<StrapiResponse<Author[]>>(`/authors?${query}`);
  
  console.log(`✅ Found ${response.data.length} authors`);
  
  return response;
}
*/


// ============================================
// 🔍 REEMPLAZA estas dos funciones en src/lib/strapi/api.ts
// ============================================

/**
 * Obtiene todos los autores con sus avatares Y LOCALIZACIONES
 * 🎯 VERSIÓN LIMPIA (sin debug excesivo)
 */
export async function getAuthors(
  locale = defaultLocale
): Promise<StrapiResponse<Author[]>> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale,
    // ✅ Populate para Strapi v5
    "populate[0]": "avatar",
    "populate[1]": "localizations",
    "sort[0]": "name:asc",
    "pagination[pageSize]": 100,
  });

  console.log(`🔍 Fetching authors for locale: ${locale}`);

  const response = await fetchAPI<StrapiResponse<Author[]>>(`/authors?${query}`);
  
  console.log(`✅ Found ${response.data.length} authors in ${locale}`);
  
  return response;
}



/**
 * Obtiene IDs de documentos de todos los autores
 * Para generación de páginas estáticas
 * @param locale - Código de idioma
 * @returns Array de documentIds de autores
 */
export async function getAuthorIds(locale = defaultLocale): Promise<string[]> {
  const { data } = await getAuthors(locale);
  return data.map((author) => author.documentId);
}


/**
 * Obtiene las localizaciones de un autor por documentId
 * Similar a getArticleLocalizations pero para autores
 * @param documentId - ID del documento en Strapi
 * @returns Array de autores en diferentes idiomas
 
export async function getAuthorLocalizations(
  documentId: string
): Promise<Array<{ locale: string; slug: string }>> {
  const query = buildQuery({
    "filters[documentId][$eq]": documentId,
    "fields[0]": "slug",
    "fields[1]": "locale",
    "fields[2]": "documentId",
  });

  console.log(`🔍 Fetching author localizations for documentId: ${documentId}`);
  console.log(`📡 Query: /authors?${query}`);

  try {
    const response = await fetchAPI<StrapiResponse<Author[]>>(
      `/authors?${query}`
    );

    console.log(`📦 Found ${response.data.length} localizations for author ${documentId}`);

    const result = response.data.map((author) => ({
      locale: author.locale || "es",
      slug: author.slug,
    }));

    console.log(`📍 Localizations:`, result);

    return result;
  } catch (error) {
    console.error("❌ Error fetching author localizations:", error);
    return [];
  }
}
*/


/**
 * Obtiene todas las versiones localizadas de un autor por documentId
 * 🎯 MISMO PATRÓN QUE getCategoryLocalizations
 */
export async function getAuthorLocalizations(
  documentId: string
): Promise<Array<{ locale: string; slug: string }>> {
  const query = buildQuery({
    "filters[documentId][$eq]": documentId,
    "populate[localizations][fields][0]": "locale",
    "populate[localizations][fields][1]": "slug",
    "populate[localizations][fields][2]": "name",
    "populate[localizations][fields][3]": "documentId",
  });

  console.log(`\n${"=".repeat(70)}`);
  console.log(`🔍 DEBUG getAuthorLocalizations`);
  console.log(`   documentId: ${documentId}`);
  console.log(`📡 Query URL: /authors?${query}`);

  try {
    const response = await fetchAPI<StrapiResponse<Author[]>>(
      `/authors?${query}`
    );

    if (!response.data || response.data.length === 0) {
      console.log(`⚠️ No se encontró autor con documentId: ${documentId}`);
      return [];
    }

    const author = response.data[0];
    const result: Array<{ locale: string; slug: string }> = [];

    // ✅ Agregar el autor base (versión actual)
    result.push({
      locale: author.locale || "es",
      slug: author.slug,
    });

    console.log(`📦 Autor base:`, { 
      locale: author.locale, 
      slug: author.slug,
      name: author.name 
    });

    // ✅ Agregar todas las localizaciones
    if (author.localizations && Array.isArray(author.localizations)) {
      author.localizations.forEach((loc) => {
        result.push({
          locale: loc.locale,
          slug: loc.slug,
        });
        console.log(`📦 Localización:`, { 
          locale: loc.locale, 
          slug: loc.slug 
        });
      });
    } else {
      console.log(`⚠️ No hay localizaciones adicionales`);
    }

    console.log(`📍 Total localizaciones: ${result.length}`);
    console.log(`${"=".repeat(70)}\n`);

    return result;
  } catch (error) {
    console.error(`❌ Error fetching author localizations:`, error);
    console.log(`${"=".repeat(70)}\n`);
    return [];
  }
}


/**
 * Obtiene un autor específico por su slug
 * @param slug - Identificador único del autor en URL
 * @param locale - Código de idioma
 * @returns Autor encontrado o null
 */
export async function getAuthorBySlug(
  slug: string,
  locale = defaultLocale
): Promise<Author | null> {
  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "filters[slug][$eq]": slug,
    "populate": "avatar", // ✅ Sintaxis correcta para Strapi v5
  });

  console.log(`🔍 Fetching author by slug: ${slug} in locale: ${locale}`);
  console.log(`📡 Query: /authors?${query}`);

  try {
    const response = await fetchAPI<StrapiResponse<Author[]>>(
      `/authors?${query}`
    );

    if (response.data && response.data.length > 0) {
      const author = response.data[0];
      console.log(`✅ Author found: ${author.name} (documentId: ${author.documentId})`);
      return author;
    }

    console.log(`⚠️ Author not found: ${slug} in locale: ${locale}`);
    return null;
  } catch (error) {
    console.error(`❌ Error fetching author by slug "${slug}":`, error);
    return null;
  }
}

// ==============================================
// BÚSQUEDA - Funcionalidad de búsqueda
// ==============================================

/**
 * Busca artículos por título o descripción
 * Búsqueda case-insensitive en título y descripción
 * @param searchQuery - Término de búsqueda
 * @param params - Parámetros de paginación
 * @returns Artículos que coinciden con la búsqueda
 */
export async function searchArticles(
  searchQuery: string,
  params: PaginationParams = {}
): Promise<StrapiResponse<Article[]>> {
  const { locale = defaultLocale, page = 1, pageSize = 10 } = params;

  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "filters[$or][0][title][$containsi]": searchQuery,
    "filters[$or][1][description][$containsi]": searchQuery,
    "populate[cover]": "*",
    "populate[author][populate][avatar]": "*",
    "populate[category]": "*",
    "sort[0]": "publishedAt:desc",
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  });

  return fetchAPI<StrapiResponse<Article[]>>(`/articles?${query}`);
}

/**
 * Obtiene artículos paginados de un autor específico
 * @param authorDocumentId - ID único del autor en Strapi
 * @param params - Parámetros de paginación
 * @returns Posts mapeados con información de paginación
 */
export async function getPaginatedPostsByAuthor(
  authorDocumentId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse> {
  const { page = 1, pageSize = 6, locale = defaultLocale } = params;

  const query = buildQuery({
    locale,
    "filters[locale][$eq]": locale, // Filtro explícito por idioma
    "filters[author][documentId][$eq]": authorDocumentId,
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "sort[0]": "publishedAt:desc",
    // ✅ Sintaxis corregida para Strapi v5
    "populate[0]": "cover",
    "populate[1]": "author",
    "populate[2]": "author.avatar",
    "populate[3]": "category",
    "populate[4]": "tags",
  });

  console.log(`📡 Fetching author posts from Strapi with query:`, query);

  try {
    const response = await fetchAPI<StrapiResponse<Article[]>>(
      `/articles?${query}`
    );

    console.log(`✅ Strapi author response:`, {
      totalArticles: response.data.length,
      meta: response.meta,
    });

    const mappedPosts = mapPostsToCards(response.data);

    return {
      posts: mappedPosts,
      pagination: response.meta?.pagination || {
        page: 1,
        pageSize: pageSize,
        pageCount: 1,
        total: mappedPosts.length,
      },
    };
  } catch (error) {
    console.error(`❌ Error fetching posts for author ${authorDocumentId}:`, error);
    
    // Retornar respuesta vacía en caso de error
    return {
      posts: [],
      pagination: {
        page: 1,
        pageSize: pageSize,
        pageCount: 0,
        total: 0,
      },
    };
  }
}