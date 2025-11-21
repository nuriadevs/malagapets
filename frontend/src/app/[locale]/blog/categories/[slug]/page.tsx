// src/app/[locale]/blog/categories/[slug]/page.tsx
import { Metadata } from "next";
import { CategoryPageProps } from "@/types/components";
import { Main } from "@/components/layouts/main";
import { notFound, redirect } from "next/navigation";
import SlugCategorySection from "@/components/sections/blog/slug-category-section";
import JsonLd, {
  generateBreadcrumbJsonLd,
  generateBlogJsonLd,
  combineSchemas
} from "@/components/JsonLd";
import { generateCategoryMetadata } from "@/lib/blog/metadata";
import {
  generateCategoryStaticParams,
  fetchCategoryData,
  getCategoryBreadcrumbs,
  CategoryParams
} from "@/lib/blog/category-service";
import { SITE_URL } from "@/config/constants";
import { getCategoryLocalizations, getCategoryByDocumentId } from "@/lib/strapi/api";


// ============================================
// STATIC PARAMS GENERATION
// ============================================
export const generateStaticParams = generateCategoryStaticParams;

// ============================================
// METADATA GENERATION
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  // Debug en development
  if (process.env.NODE_ENV === 'development') {
    const data = await fetchCategoryData(locale, slug);
    console.log("========================================");
    console.log("📂 CATEGORY:", slug);
    console.log("📄 Data:", data?.category?.name || "Not found");
    console.log("========================================");
  }

  return generateCategoryMetadata({ locale, slug });
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps) {
  const { locale, slug } = await params;
  const data = await fetchCategoryData(locale, slug);

  // ✅ Si no existe la categoría en el idioma actual, buscar y redirigir al slug correcto
  if (!data) {
    console.log(`⚠️ Categoría "${slug}" no encontrada en idioma "${locale}"`);
    
    // Buscar la categoría por slug en cualquier idioma
    try {
      const categoryBySlug = await getCategoryByDocumentId(slug);
      
      // ✅ Usar document_id según el tipo Category
      const docId = categoryBySlug?.documentId;
      
      if (categoryBySlug && docId) {
        console.log(`✅ Categoría encontrada con document_id: ${docId}`);
        
        // Obtener todas las localizaciones de esta categoría
        const localizations = await getCategoryLocalizations(docId);
        console.log(`📍 Localizaciones encontradas:`, localizations);
        
        const targetLocalization = localizations.find(l => l.locale === locale);
        
        if (targetLocalization && targetLocalization.slug && targetLocalization.slug !== slug) {
          const correctUrl = `/${locale}/blog/categories/${targetLocalization.slug}`;
          console.log(`🔄 Redirigiendo a: ${correctUrl}`);
          redirect(correctUrl);
        }
      }
    } catch (error) {
      console.error(`❌ Error buscando categoría por slug:`, error);
    }
    
    // Si no se encuentra en ningún idioma o no hay localización válida, mostrar 404
    console.log(`❌ Categoría "${slug}" no encontrada en ningún idioma`);
    notFound();
  }

  const { category, posts, jsonLdData } = data;

  // ============================================
  // JSON-LD SCHEMAS
  // ============================================

  // Breadcrumbs
  const breadcrumbs = getCategoryBreadcrumbs
    ? getCategoryBreadcrumbs(locale, slug, category.name)
    : [
      {
        name: locale === "es" ? "Inicio" : "Home",
        url: `${SITE_URL}/${locale}`
      },
      {
        name: "Blog",
        url: `${SITE_URL}/${locale}/blog`
      },
      {
        name: locale === "es" ? "Categorías" : "Categories",
        url: `${SITE_URL}/${locale}/blog/categories`
      },
      {
        name: category.name,
        url: `${SITE_URL}/${locale}/blog/categories/${slug}`
      },
    ];

  // Schema de la categoría como CollectionPage
  const categorySchema = {
    "@context": "https://schema.org" as const,
    "@type": "CollectionPage" as const,
    name: category.name,
    description: category.description || `Artículos sobre ${category.name}`,
    url: `${SITE_URL}/${locale}/blog/categories/${slug}`,
    ...(jsonLdData?.image && {
      image: {
        "@type": "ImageObject",
        url: jsonLdData.image,
      },
    }),
  };

  // Si hay posts, añadir BlogJsonLd
  const schemas = posts && posts.length > 0
    ? combineSchemas(
      generateBreadcrumbJsonLd(breadcrumbs),
      categorySchema,
      generateBlogJsonLd(
        posts.slice(0, 10).map((post) => ({
          title: post.title,
          description: post.description,
          slug: post.slug,
          publishedAt: post.publishedAt,
          modifiedAt: post.updatedAt,
          cover: post.cover ? { url: post.cover } : undefined,
          tags: post.tags?.map(tag => tag.name) ?? [],
          category: category.name,
        })),
        SITE_URL
      )
    )
    : combineSchemas(
      generateBreadcrumbJsonLd(breadcrumbs),
      categorySchema
    );

  return (
    <Main ariaLabelKey="main.categoryContent" className="min-h-screen">
      <JsonLd data={schemas} />
      <SlugCategorySection
        slug={slug}
        locale={locale}
        searchParams={searchParams}
      />
    </Main>
  );
}

// ============================================
// PERFORMANCE & SEO CONFIGS
// ============================================
export const revalidate = 3600;
export const dynamicParams = true;