// src/app/[locale]/blog/page.tsx
import { Metadata } from "next";
import { Locale } from "@/i18n/routing";
import  {BlogPageProps} from "@/types/blog";
import { Main } from "@/components/layouts/main";
import BlogSection from "@/components/sections/blog/blog-section";
import Newsletter from "@/components/blog/newsletter/newsletter";
import CategorySection from "@/components/sections/blog/category-section";
import JsonLd, { 
  generateBlogJsonLd,
  generateBreadcrumbJsonLd,
  combineSchemas 
} from "@/components/JsonLd";
import { getAllArticles } from "@/lib/strapi/api";
import { generatePageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/config/constants";




// ============================================
// METADATA
// ============================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    params,
    type: "website",
    canonical: `${SITE_URL}/${locale}/blog`,
  });
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function BlogPage({ 
  params,
  searchParams 
}: BlogPageProps) {
  const { locale } = await params;
  
  // Fetch posts para JSON-LD
  const articlesResponse = await getAllArticles(locale);
  const posts = articlesResponse.data || [];



  // ============================================
  // JSON-LD SCHEMAS
  // ============================================
  const breadcrumbs = [
    { name: "Inicio", url: `${SITE_URL}/${locale}` },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
  ];

  const schema = combineSchemas(
    generateBreadcrumbJsonLd(breadcrumbs),
    generateBlogJsonLd(
      posts.slice(0, 10).map((post) => ({
        title: post.title,
        description: post.description,
        slug: post.slug,
        publishedAt: post.publishedAt,
        modifiedAt: post.updatedAt,
        cover: post.cover ? { url: post.cover } : undefined,
        tags: post.tags?.map(tag => tag.name) ?? [],
        category: post.category?.name,
      })),
      SITE_URL
    )
  );

  return (
    <Main ariaLabelKey="blog.heroHeading" className="min-h-screen">
      <JsonLd data={schema} />
      <BlogSection locale={locale} />
      <CategorySection searchParams={searchParams} locale={locale} />
      <Newsletter /> 
    </Main>
  );
}