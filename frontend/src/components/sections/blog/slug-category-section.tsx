// components/sections/blog/slug-category-section.tsx
import { notFound } from "next/navigation";
import {SlugCategorySectionProps} from "@/types/blog";
import { getCategories, getPaginatedPostsByCategory } from "@/lib/strapi/api";
import { getPaginationParams } from "@/hooks/use-pagination";
import SlugCategorySectionContent from "@/components/sections/blog/slug-category-section-content";



export default async function SlugCategorySection({ 
  slug, 
  locale,
  searchParams 
}: SlugCategorySectionProps) {
  // Obtener parámetros de paginación
  const paginationParams = await getPaginationParams(searchParams, 6);

  // Obtener la categoría en el idioma correcto
  const categoriesResponse = await getCategories(locale);
  const category = categoriesResponse.data.find(cat => cat.slug === slug);

  // Si no existe la categoría, mostrar not-found.tsx
  if (!category) {
    notFound();
  }

  // Obtener posts paginados de esta categoría en el idioma correcto
  const { posts, pagination } = await getPaginatedPostsByCategory(
    slug,
    {
      locale,
      page: paginationParams.currentPage,
      pageSize: paginationParams.limit
    }
  );

  const isFirstPage = paginationParams.isFirstPage;
  const isLastPage = paginationParams.currentPage >= pagination.pageCount;

  return (
    <SlugCategorySectionContent
      category={{
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description
      }}
      posts={posts}
      currentPage={paginationParams.currentPage}
      totalArticles={pagination.total}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      locale={locale}
    />
  );
}