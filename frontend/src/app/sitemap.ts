// ============================================
// OPCIÓN 1: SITEMAP ÚNICO (Simple)
// src/app/sitemap.ts
// ============================================

import { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/strapi/api";
import type { MappedPost } from "@/types/strapi";
import { SITE_URL } from "@/config/constants";

const LOCALES = ["es", "en", "de", "fr"] as const;

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/blog/categories", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/maps/parks", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/maps/vets", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/guides/parks", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/guides/vets", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const entries = await generateMultilingualSitemap();
    return entries.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  } catch (error) {
    console.warn("⚠️ Error generando sitemap:", error);
    return generateFallbackSitemap();
  }
}

async function generateMultilingualSitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // 1. Páginas estáticas
  for (const { path, priority, changeFrequency } of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(l => [l, `${SITE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  // 2. Posts del blog
  const blogEntries = await generateBlogEntries();
  entries.push(...blogEntries);

  return entries;
}

async function generateBlogEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Obtener posts por locale
  const postsByLocale = await Promise.all(
    LOCALES.map(async (locale) => {
      try {
        const { data } = await getAllArticles(locale);
        return { locale, posts: data };
      } catch {
        return { locale, posts: [] };
      }
    })
  );

  // Agrupar por slug
  const postMap = new Map<string, Array<{ locale: string; post: MappedPost }>>();
  
  for (const { locale, posts } of postsByLocale) {
    for (const post of posts) {
      if (!postMap.has(post.slug)) {
        postMap.set(post.slug, []);
      }
      postMap.get(post.slug)!.push({ locale, post });
    }
  }

  // Generar entradas
  for (const [slug, versions] of postMap) {
    for (const { locale, post } of versions) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/post/${slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            versions.map(v => [v.locale, `${SITE_URL}/${v.locale}/blog/post/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}

function generateFallbackSitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap(locale => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ]);
}