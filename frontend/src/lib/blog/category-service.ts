// lib/blog/category-service.ts
import {
  getCategorySlugs,
  getCategories,
  getPaginatedPostsByCategory,
} from "@/lib/strapi/api";
import { SITE_URL } from "@/config/constants";
import type { Category, MappedPost } from "@/types/strapi";

const siteUrl = SITE_URL;

// ============================================
// TYPES
// ============================================
export type CategoryParams = {
  locale: string;
  slug: string;
};

export type CategoryJsonLdData = {
  name: string;
  description?: string;
  slug: string;
  image?: string;
};

// ✅ AÑADIDO: Tipo para el resultado de fetchCategoryData
export type CategoryData = {
  category: Category;
  posts: MappedPost[];
  jsonLdData: CategoryJsonLdData;
};

// ============================================
// GENERATE STATIC PARAMS
// ============================================
export async function generateCategoryStaticParams(): Promise<
  CategoryParams[]
> {
  const locales = ["es", "en", "de", "fr"];
  const params: CategoryParams[] = [];

  for (const locale of locales) {
    try {
      const slugs = await getCategorySlugs(locale);

      // ✅ Iterar y validar cada slug
      for (const slug of slugs) {
        if (slug && typeof slug === "string" && slug.trim().length > 0) {
          params.push({
            locale,
            slug: slug.trim(),
          });
        }
      }

      console.log(
        `✅ Generated ${slugs.length} category slugs for locale: ${locale}`
      );
    } catch (e) {
      console.error(
        `❌ Failed to fetch category slugs for locale ${locale}:`,
        e
      );
      // Continuar con otros locales
    }
  }

  console.log(`✅ Total category static params generated: ${params.length}`);
  return params;
}
// ============================================
// FETCH CATEGORY DATA
// ============================================
export async function fetchCategoryData(
  locale: string,
  slug: string
): Promise<CategoryData | null> {
  // ✅ CORRECCIÓN: Tipo de retorno explícito
  try {
    // Obtener todas las categorías y filtrar por slug
    const categoriesResponse = await getCategories(locale);
    const category = categoriesResponse.data.find(
      (cat: Category) => cat.slug === slug
    );

    if (!category) {
      console.warn(`⚠️ Category not found: ${slug} (${locale})`);
      return null;
    }

    // Obtener posts de esta categoría
    let posts: MappedPost[] = [];
    try {
      const postsResponse = await getPaginatedPostsByCategory(slug, {
        locale,
        page: 1,
        pageSize: 100,
      });
      posts = postsResponse.posts || [];
    } catch (e) {
      console.warn(`⚠️ Failed to fetch posts for category ${slug}:`, e);
    }

    // Preparar datos para JSON-LD
    const jsonLdData: CategoryJsonLdData = {
      name: category.name,
      description: category.description,
      slug: category.slug,
      // image: category.image?.url, // Si tienes imagen de categoría
    };

    return {
      category,
      posts,
      jsonLdData,
    };
  } catch (e) {
    console.error(`❌ Category fetch failed for ${slug} (${locale}):`, e);
    return null;
  }
}

// ============================================
// HELPER: Get category URL
// ============================================
export function getCategoryUrl(locale: string, slug: string): string {
  return `${siteUrl}/${locale}/blog/categories/${slug}`;
}

// ============================================
// HELPER: Get breadcrumbs for category
// ============================================
export function getCategoryBreadcrumbs(
  locale: string,
  slug: string,
  categoryName: string
) {
  const homeLabel =
    {
      es: "Inicio",
      en: "Home",
      de: "Startseite",
      fr: "Accueil",
    }[locale] || "Home";

  const categoriesLabel =
    {
      es: "Categorías",
      en: "Categories",
      de: "Kategorien",
      fr: "Catégories",
    }[locale] || "Categories";

  return [
    {
      name: homeLabel,
      url: `${siteUrl}/${locale}`,
    },
    {
      name: "Blog",
      url: `${siteUrl}/${locale}/blog`,
    },
    {
      name: categoriesLabel,
      url: `${siteUrl}/${locale}/blog/categories`,
    },
    {
      name: categoryName,
      url: getCategoryUrl(locale, slug),
    },
  ];
}

// ============================================
// HELPER: Get all categories breadcrumbs
// ============================================
export function getAllCategoriesBreadcrumbs(locale: string) {
  const homeLabel =
    {
      es: "Inicio",
      en: "Home",
      de: "Startseite",
      fr: "Accueil",
    }[locale] || "Home";

  const categoriesLabel =
    {
      es: "Categorías",
      en: "Categories",
      de: "Kategorien",
      fr: "Catégories",
    }[locale] || "Categories";

  return [
    {
      name: homeLabel,
      url: `${siteUrl}/${locale}`,
    },
    {
      name: "Blog",
      url: `${siteUrl}/${locale}/blog`,
    },
    {
      name: categoriesLabel,
      url: `${siteUrl}/${locale}/blog/categories`,
    },
  ];
}

// ============================================
// DEBUGGING (Opcional - solo development)
// ============================================
export function debugCategoryData(
  slug: string,
  locale: string,
  data: CategoryData // ✅ CORRECCIÓN: Tipo específico en lugar de any
): void {
  if (process.env.NODE_ENV !== "development") return;

  console.log("========================================");
  console.log("📂 CATEGORY DEBUG");
  console.log("========================================");
  console.log("Slug:", slug);
  console.log("Locale:", locale);
  console.log("Name:", data.jsonLdData.name);
  console.log("Description:", data.jsonLdData.description || "None");
  console.log("Image:", data.jsonLdData.image ? "✅" : "❌");
  console.log("Posts count:", data.posts.length);
  console.log("========================================");
}
