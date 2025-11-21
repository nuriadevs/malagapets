// src/app/[locale]/blog/post/[slug]/page.tsx
import { Main } from "@/components/layouts/main";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";
import JsonLd, {
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
  combineSchemas
} from "@/components/JsonLd";
import PostSection from "@/components/sections/blog/post-section";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";
import {
  generatePostStaticParams,
  fetchPostData,
  getPostBreadcrumbs,
  PostParams
} from "@/lib/blog/post-service";
import { SITE_URL } from "@/config/constants";

export const generateStaticParams = generatePostStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<PostParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return generateBlogPostMetadata({ locale, slug });
}

export default async function Post({
  params,
}: {
  params: Promise<PostParams>;
}) {
  const { locale, slug } = await params;
  const data = await fetchPostData(locale, slug);

  if (!data) {
    notFound();
  }

    // ✅ Construir la URL completa del post
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const postUrl = `${protocol}://${host}/${locale}/blog/post/${slug}`;

  // ✅ Usar el helper para breadcrumbs
  const breadcrumbs = getPostBreadcrumbs(locale, slug, data.post.title);

  // ✅ Combinar schemas
  const schema = combineSchemas(
    generateBreadcrumbJsonLd(breadcrumbs),
    generateArticleJsonLd(data.jsonLdData, SITE_URL)
  );

  return (
    <Main ariaLabelKey="main.postSingle" className="min-h-screen">
      <JsonLd data={schema} />
      <PostSection slug={slug} locale={locale} postUrl={postUrl}  /> {/* ✅ PASAR LOCALE */}
    </Main>
  );
}

export const revalidate = 3600; // 1 hora en segundos
export const dynamicParams = true;