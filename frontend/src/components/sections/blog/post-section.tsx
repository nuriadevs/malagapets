// components/sections/blog/post-section.tsx
import { getArticleBySlug } from "@/lib/strapi/api";
import { notFound } from "next/navigation";
import PostSectionContent from "./post-section-content";

interface PostSectionProps {
    slug: string;
    locale: string;
    postUrl: string; // ✅ Añadir postUrl
}

export default async function PostSection({ 
    slug, 
    locale, 
    postUrl 
}: PostSectionProps) {
    const post = await getArticleBySlug(slug, locale);

    if (!post) {
        notFound();
    }

    return (
        <PostSectionContent 
            post={post} 
            postUrl={postUrl}
        />
    );
}