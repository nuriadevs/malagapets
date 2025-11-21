// lib/blog/post-service.ts
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/strapi/api";
import { getCoverImageUrl, extractTagNames } from "@/lib/strapi/helpers";
import { SITE_URL } from "@/config/constants";
import type { MappedPostDetail } from "@/types/strapi"; // ✅ AÑADIDO

const siteUrl = SITE_URL;

// ============================================
// TYPES
// ============================================
export type PostParams = {
  locale: string;
  slug: string;
};

export type PostJsonLdData = {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: {
    name: string;
    url?: string;
  };
  cover?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  category?: string;
};

// ✅ AÑADIDO: Tipo para el resultado de fetchPostData
export type PostData = {
  post: MappedPostDetail;
  jsonLdData: PostJsonLdData;
};

// ============================================
// GENERATE STATIC PARAMS
// ============================================
export async function generatePostStaticParams() {
  const locales = ["es", "en", "de", "fr"];
  const params: Array<PostParams> = [];

  await Promise.all(
    locales.map(async (locale) => {
      try {
        const slugs = await getAllArticleSlugs(locale);
        slugs.forEach((slug) => params.push({ locale, slug }));
      } catch (e) {
        console.warn(`⚠️ Failed to fetch slugs for locale ${locale}:`, e);
      }
    })
  );

  return params;
}

// ============================================
// FETCH POST DATA
// ============================================
export async function fetchPostData(
  locale: string, 
  slug: string
): Promise<PostData | null> {
  // ✅ CORRECCIÓN: Tipo de retorno explícito
  try {
   const post = await getArticleBySlug(slug, locale);
    if (!post) {
      console.warn(`⚠️ Post not found: ${slug} (${locale})`);
      return null;
    }

    const coverImageUrl = getCoverImageUrl(post);
    const tags = extractTagNames(post);

    // Preparar datos para JSON-LD
    const jsonLdData: PostJsonLdData = {
      title: post.title,
      description: post.description,
      slug: post.slug,
      publishedAt: post.publishedAt,
      modifiedAt: post.updatedAt || post.publishedAt,

      // Author con fallback
      author: post.author
        ? {
            name: post.author.name,
            url: `${siteUrl}/${locale}/author/${post.author.slug}`,
          }
        : {
            name: "MálagaPets",
            url: siteUrl,
          },

      // Cover image
      cover: post.coverImage
        ? {
            url: coverImageUrl,
            alt: post.mainImage?.alt || post.title, // ✅ CORRECCIÓN: usar mainImage.alt
          }
        : undefined,

      // Tags (solo si existen)
      ...(tags && tags.length > 0 && { tags }),

      // Category
      ...(post.category?.name && { category: post.category.name }),
    };

    return {
      post, // ← Post completo para usar en breadcrumbs
      jsonLdData, // ← Datos preparados para JSON-LD
    };
  } catch (e) {
    console.error(`❌ Post fetch failed for ${slug} (${locale}):`, e);
    return null;
  }
}

// ============================================
// HELPER: Get post URL
// ============================================
export function getPostUrl(locale: string, slug: string): string {
  return `${siteUrl}/${locale}/blog/post/${slug}`;
}

// ============================================
// HELPER: Get breadcrumbs for post
// ============================================
export function getPostBreadcrumbs(
  locale: string,
  slug: string,
  postTitle: string
) {
  return [
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${siteUrl}/${locale}`,
    },
    {
      name: "Blog",
      url: `${siteUrl}/${locale}/blog`,
    },
    {
      name: postTitle,
      url: getPostUrl(locale, slug),
    },
  ];
}

// ============================================
// OPTIONAL: Get category breadcrumbs
// ============================================
export function getCategoryBreadcrumbs(
  locale: string,
  categorySlug: string,
  categoryName: string
) {
  return [
    {
      name: locale === "es" ? "Inicio" : "Home",
      url: `${siteUrl}/${locale}`,
    },
    {
      name: "Blog",
      url: `${siteUrl}/${locale}/blog`,
    },
    {
      name: categoryName,
      url: `${siteUrl}/${locale}/blog/category/${categorySlug}`,
    },
  ];
}

// ============================================
// DEBUGGING (Opcional - solo development)
// ============================================
export function debugPostData(
  slug: string,
  locale: string,
  data: PostData // ✅ CORRECCIÓN: Tipo específico en lugar de any
): void {
  if (process.env.NODE_ENV !== "development") return;

  console.log("========================================");
  console.log("📝 POST DEBUG");
  console.log("========================================");
  console.log("Slug:", slug);
  console.log("Locale:", locale);
  console.log("Title:", data.jsonLdData.title);
  console.log("Published:", data.jsonLdData.publishedAt);
  console.log("Modified:", data.jsonLdData.modifiedAt);
  console.log("Author:", data.jsonLdData.author?.name);
  console.log("Cover:", data.jsonLdData.cover ? "✅" : "❌");
  console.log("Tags:", data.jsonLdData.tags?.length || 0);
  console.log("Category:", data.jsonLdData.category || "None");
  console.log("========================================");
}

// ============================================
// NOTAS DE IMPLEMENTACIÓN
// ============================================
/*
🎯 MEJORAS IMPLEMENTADAS:

1. ✅ Tipos TypeScript explícitos (PostJsonLdData, PostData)
2. ✅ Helper getPostBreadcrumbs() para reusar
3. ✅ Helper getCategoryBreadcrumbs() para categorías
4. ✅ Mejor manejo de valores opcionales
5. ✅ Logging mejorado para debugging
6. ✅ Usa mainImage.alt (que existe en MappedPostDetail)

📝 USO EN TUS PÁGINAS:

// En post/[slug]/page.tsx
import { 
  fetchPostData, 
  getPostBreadcrumbs,
  debugPostData 
} from "@/lib/blog/post-service";

export default async function Post({ params }) {
  const { locale, slug } = await params;
  const data = await fetchPostData(locale, slug);
  
  if (!data) notFound();
  
  // Debug (opcional)
  debugPostData(slug, locale, data);
  
  // Breadcrumbs
  const breadcrumbs = getPostBreadcrumbs(locale, slug, data.post.title);
  
  // Schema
  const schema = combineSchemas(
    generateBreadcrumbJsonLd(breadcrumbs),
    generateArticleJsonLd(data.jsonLdData, env.siteUrl)
  );
  
  return (
    <Main>
      <JsonLd data={schema} />
      <PostSection slug={slug} />
    </Main>
  );
}

⚠️ IMPORTANTE:
- Usa mainImage.alt en lugar de coverAlt (que no existe en el tipo)
- Si mainImage.alt es undefined, se usa post.title como fallback
- Los tags solo se incluyen si existen y tienen elementos
*/
