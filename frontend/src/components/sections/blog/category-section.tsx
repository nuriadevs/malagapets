// components/sections/blog/category-section.tsx
import { notFound } from "next/navigation";
import { CategorySectionProps } from "@/types/components";
import { getCategories, getAllArticles } from "@/lib/strapi/api";
import CategorySectionContent from "./category-section-content";

interface CategorySectionWithLocaleProps extends CategorySectionProps {
    locale: string;
}

export default async function CategorySection({ searchParams, locale }: CategorySectionWithLocaleProps) {
    const resolvedSearchParams = await searchParams;
    const selectedCategory = resolvedSearchParams.category || "All";
    const currentPage = parseInt(resolvedSearchParams.page || "1");

    // Obtener todas las categorías y artículos en el idioma correcto
    const [categoriesResponse, articlesResponse] = await Promise.all([
        getCategories(locale),
        getAllArticles(locale),
    ]);

    // Validar que existan categorías
    if (!categoriesResponse.data || categoriesResponse.data.length === 0) {
        notFound();
    }

    // Validar que la categoría seleccionada existe (si no es "All")
    if (selectedCategory !== "All") {
        const categoryExists = categoriesResponse.data.some(
            cat => cat.slug === selectedCategory
        );
        if (!categoryExists) {
            notFound();
        }
    }

    const allPosts = articlesResponse.data;
    const categories = categoriesResponse.data.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug
    }));

    // Filtrar posts por categoría seleccionada
    const filteredPosts = selectedCategory === "All"
        ? allPosts
        : allPosts.filter(post => post.category?.slug === selectedCategory);

    // Paginación
    const postsPerPage = 6;
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Calcular contadores por categoría
    const categoryCounts: Record<string, number> = {};
    categoriesResponse.data.forEach(cat => {
        categoryCounts[cat.slug] = allPosts.filter(
            post => post.category?.slug === cat.slug
        ).length;
    });

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <CategorySectionContent
            categories={categories}
            posts={paginatedPosts}
            selectedCategory={selectedCategory}
            currentPage={currentPage}
            totalPages={totalPages}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            categoryCounts={categoryCounts}
            totalCount={allPosts.length}
        />
    );
}