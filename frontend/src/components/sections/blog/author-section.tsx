// src/components/sections/blog/author-section.tsx
import { notFound } from "next/navigation";
import type { AuthorSectionProps } from "@/types/components";
import { getAuthorBySlug, getPaginatedPostsByAuthor } from "@/lib/strapi/api";
import { getPaginationParams } from "@/hooks/use-pagination";
import AuthorSectionContent from "@/components/sections/blog/author-section-content";
import { getStrapiMedia } from "@/types/strapi";
import type { MappedAuthor } from "@/types/strapi";

export default async function AuthorSection({
  slug,
  locale,
  searchParams 
}: AuthorSectionProps) {
  console.log(`\n🔍 AuthorSection - Buscando autor: ${slug} en idioma: ${locale}`);

  // 1️⃣ Obtener parámetros de paginación
  const paginationParams = await getPaginationParams(searchParams, 6);

  // 2️⃣ Buscar el autor por slug en el idioma actual
  // Esto nos dará el autor con su documentId
  const author = await getAuthorBySlug(slug, locale);

  if (!author) {
    console.log(`❌ Autor no encontrado: ${slug} en ${locale}`);
    notFound();
  }

  console.log(`✅ Autor encontrado: ${author.name}`);
  console.log(`   • documentId: ${author.documentId}`);
  console.log(`   • locale actual: ${author.locale || locale}`);

  // 3️⃣ Obtener posts paginados de este autor (usando documentId)
  // El documentId es único para el autor en TODOS los idiomas
  const { posts, pagination } = await getPaginatedPostsByAuthor(
    author.documentId,
    {
      page: paginationParams.currentPage,
      pageSize: paginationParams.limit,
      locale // ✅ Filtrar posts por el idioma actual
    }
  );

  console.log(`📚 Posts encontrados: ${posts.length} de ${pagination.total} total`);

  const isFirstPage = paginationParams.isFirstPage;
  const isLastPage = paginationParams.currentPage >= pagination.pageCount;

  // 4️⃣ Mapear autor al tipo MappedAuthor
  const mappedAuthor: MappedAuthor = {
    id: author.id,
    documentId: author.documentId,
    name: author.name,
    slug: author.slug || "",
    email: author.email || "",
    bio: author.bio,
    url: author.url,
    image: author.avatar?.url
      ? {
          src: getStrapiMedia(author.avatar.url),
          alt: author.avatar.alternativeText || author.name,
        }
      : null,
  };

  return (
    <AuthorSectionContent
      author={mappedAuthor}
      posts={posts}
      currentPage={paginationParams.currentPage}
      totalArticles={pagination.total}
      isFirstPage={isFirstPage}
      isLastPage={isLastPage}
      locale={locale}
    />
  );
}