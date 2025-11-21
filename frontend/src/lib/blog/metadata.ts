// src/lib/blog/metadata.ts
import { Metadata } from "next";
import { getArticleBySlug, getAuthors, getCategories } from "@/lib/strapi/api";
import { 
    generatePostMetadata, 
    getAuthorSeoTitle,
    getAuthorSeoDescription,
    getAuthorCoverImageUrl,
    getCategorySeoTitle,
    getCategorySeoDescription,
    getCategoryCoverImageUrl
} from "@/lib/strapi/helpers";
import { SITE_URL } from "@/config/constants";

const siteUrl = SITE_URL;

/**
 * Genera metadata para páginas de post
 */
export async function generateBlogPostMetadata({
    locale,
    slug,
}: {
    locale: string;
    slug: string;
}): Promise<Metadata> {
    try {
        const post = await getArticleBySlug(slug, locale);

        if (!post) {
            return {
                title: "Post no encontrado | MálagaPets",
                description: "El artículo que buscas no está disponible",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        const metadata = generatePostMetadata(post, locale, slug);
        
        return {
            ...metadata,
        };
    } catch (e) {
        console.error("generateMetadata error:", e);
        return {
            title: "Error cargando artículo | MálagaPets",
            description: "Este artículo no está disponible en este momento",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

/**
 * Genera metadata para páginas de autor
 * Usa las funciones helper específicas para autor
 */
export async function generateAuthorMetadata({
    locale,
    slug,
}: {
    locale: string;
    slug: string;
}): Promise<Metadata> {
    try {
        const authorsResponse = await getAuthors(locale);
        const author = authorsResponse.data.find(auth => auth.slug === slug);

        if (!author) {
            return {
                title: "Autor no encontrado | MálagaPets",
                description: "El autor que buscas no está disponible",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        // ✅ Usar las funciones helper existentes en helpers.ts
        const title = getAuthorSeoTitle(author, "MálagaPets");
        const description = getAuthorSeoDescription(author);
        const imageUrl = getAuthorCoverImageUrl(author);
        const authorUrl = `${siteUrl}/${locale}/author/${author.slug}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: authorUrl,
                type: "profile",
                images: [
                    {
                        url: imageUrl,
                        width: 800,
                        height: 800,
                        alt: author.name,
                    },
                ],
            },
            twitter: {
                card: "summary",
                title,
                description,
                images: [imageUrl],
            },
            alternates: {
                canonical: authorUrl,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (e) {
        console.error("generateAuthorMetadata error:", e);
        return {
            title: "Error cargando autor | MálagaPets",
            description: "Este autor no está disponible en este momento",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}

/**
 * Genera metadata para páginas de categoría
 * Usa las funciones helper específicas para categoría
 */
export async function generateCategoryMetadata({
    locale,
    slug,
}: {
    locale: string;
    slug: string;
}): Promise<Metadata> {
    try {
        const categoriesResponse = await getCategories(locale);
        const category = categoriesResponse.data.find(cat => cat.slug === slug);

        if (!category) {
            return {
                title: "Categoría no encontrada | MálagaPets",
                description: "La categoría que buscas no está disponible",
                robots: {
                    index: false,
                    follow: false,
                },
            };
        }

        // ✅ Usar las funciones helper existentes en helpers.ts
        const title = getCategorySeoTitle(category, "MálagaPets");
        const description = getCategorySeoDescription(category);
        const imageUrl = getCategoryCoverImageUrl(category);
        const categoryUrl = `${siteUrl}/${locale}/blog/categories/${category.slug}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url: categoryUrl,
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: category.name,
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [imageUrl],
            },
            alternates: {
                canonical: categoryUrl,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (e) {
        console.error("generateCategoryMetadata error:", e);
        return {
            title: "Error cargando categoría | MálagaPets",
            description: "Esta categoría no está disponible en este momento",
            robots: {
                index: false,
                follow: false,
            },
        };
    }
}