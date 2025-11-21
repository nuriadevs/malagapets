// app/[locale]/blog/categories/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server"; // ✅ Importar getTranslations
import { CategoriesPageProps } from "@/types/components";
import { Main } from "@/components/layouts/main";
import CategorySection from "@/components/sections/blog/category-section";
import JsonLd, {
    generateBreadcrumbJsonLd,
    combineSchemas
} from "@/components/JsonLd";
import { SITE_URL } from "@/config/constants";
import { Locale } from "@/i18n/routing";
import ComingSoon from '@/components/blog/coming-soon';
import { getCategories } from "@/lib/strapi/api";

// ============================================
// METADATA
// ============================================
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;

    // ✅ Usar traducciones en lugar de objetos hardcodeados
    const t = await getTranslations({ locale, namespace: 'seo' });
    const tSite = await getTranslations({ locale, namespace: 'seo' });

    

    return {
        title: `${t('categories.titles')} ${tSite('titleSeparator')} ${tSite('ogSiteName')}`,
        description: t('categories.description'),
        openGraph: {
            title: `${t('categories.titles')} ${tSite('titleSeparator')} ${tSite('ogSiteName')}`,
            description: t('categories.description'),
            url: `${SITE_URL}/${locale}/blog/categories`,
        },
    };
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function CategoriesPage({
    params,
    searchParams
}: {
    params: Promise<{ locale: Locale }>;
    searchParams: CategoriesPageProps["searchParams"];
}) {
    const { locale } = await params;

    // ✅ Obtener traducciones para JSON-LD
    const t = await getTranslations({ locale, namespace: 'seo' });
    const tCommon = await getTranslations({ locale, namespace: 'common' });

        // ✅ VALIDAR SI HAY CATEGORÍAS
    const categoriesResponse = await getCategories(locale);
    const categories = categoriesResponse.data || [];

    if (categories.length === 0) {
        return (
            <Main ariaLabelKey="categories.main" className="min-h-screen">
                <ComingSoon />
            </Main>
        );
    }

    // ============================================
    // JSON-LD: Breadcrumbs
    // ============================================
    const breadcrumbs = [
        {
            name: tCommon('home'), // ✅ Traducido
            url: `${SITE_URL}/${locale}`
        },
        {
            name: "Blog",
            url: `${SITE_URL}/${locale}/blog`
        },
        {
            name: t('categories.titles'), // ✅ Traducido
            url: `${SITE_URL}/${locale}/blog/categories`
        },
    ];

    // ✅ Schema con traducciones
    const collectionPageSchema = {
        "@context": "https://schema.org" as const,
        "@type": "CollectionPage" as const,
        name: t('categories.titles'), // ✅ Traducido
        description: t('categories.description'), // ✅ Traducido
        url: `${SITE_URL}/${locale}/blog/categories`,
    };

    const schema = combineSchemas(
        generateBreadcrumbJsonLd(breadcrumbs),
        collectionPageSchema
    );

    return (
        <Main ariaLabelKey="categories.main" className="min-h-screen">
            <JsonLd data={schema} />
            <CategorySection searchParams={searchParams} locale={locale} />
        </Main>
    );
}

export const revalidate = 3600; // 1 hora en segundos