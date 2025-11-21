// src/app/[locale]/page.tsx
import { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { generatePageMetadata } from "@/lib/metadata";
import { getAllArticles } from "@/lib/strapi/api";
import JsonLd, { 
  generateBlogJsonLd,
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  combineSchemas 
} from "@/components/JsonLd";
import { Main } from "@/components/layouts/main";
import { HeroSection } from "@/components/sections/hero-section";
import { SITE_URL } from "@/config/constants";

// ============================================
// ⚡ PERFORMANCE: ISR - Revalidación cada 1 hora
// ============================================
export const revalidate = 3600; // 1 hora en segundos

// ============================================
// METADATA GENERATION
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
    canonical: `${SITE_URL}/${locale}`,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // ✅ Obtener traducciones SEO
  const t = await getTranslations({ locale, namespace: 'seo' });

  // ⚡ OPTIMIZACIÓN: Fetch de artículos solo para schema (no bloquea UI)
  // Usamos Promise.race con timeout para no bloquear el renderizado
  const getArticlesWithTimeout = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 2000)
      );
      
      const articlesPromise = getAllArticles(locale);
      
      const articlesResponse = await Promise.race([
        articlesPromise,
        timeoutPromise
      ]) as Awaited<ReturnType<typeof getAllArticles>>;
      
      return articlesResponse.data || [];
    } catch (error) {
      // Si falla o timeout, devolver array vacío (no bloquea renderizado)
      console.warn('Articles fetch timeout or error:', error);
      return [];
    }
  };

  const latestPosts = await getArticlesWithTimeout();

  // ============================================
  // 🎯 MEJORADO: Múltiples schemas combinados con i18n
  // ============================================
  const schema = combineSchemas(
    // Schema de la organización
    generateOrganizationJsonLd({ 
      siteUrl: SITE_URL,
      name: t('ogSiteName'), // ✅ "MálagaPets"
      description: t('defaultDescription') // ✅ Descripción traducida
    }),
    
    // Schema del sitio web (habilita búsqueda)
    generateWebsiteJsonLd(SITE_URL),
    
    // Schema del blog con posts recientes
    generateBlogJsonLd(
      latestPosts.slice(0, 10).map((post) => ({
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
    <Main 
      ariaLabelKey="main.homeContent" 
      className="min-h-screen flex items-center justify-center"
      backgroundImage="/images/background.jpg"
    >
      <JsonLd data={schema} />
      <HeroSection />
    </Main>
  );
}