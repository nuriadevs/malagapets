// src/components/sections/blog/blog-section.tsx
import { getArticles } from "@/lib/strapi/api";
import { mapPostsToCards } from "@/lib/strapi/mappers";
import type { MappedPost } from "@/types/strapi";
import { BlogSectionContent } from "@/components/sections/blog/blog-section-content";

interface BlogSectionProps {
    locale: string;
}

export default async function BlogSection({ locale }: BlogSectionProps) {
    // Obtener artículos de Strapi en el idioma correcto
    const response = await getArticles({ locale, page: 1, pageSize: 14 });
    const posts: MappedPost[] = mapPostsToCards(response.data);

    console.log("😊 BlogSection - posts:", posts );

    // Pasar datos al Client Component
    return <BlogSectionContent posts={posts} />;
}