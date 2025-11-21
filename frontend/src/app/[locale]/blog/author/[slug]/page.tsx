// src/app/[locale]/blog/author/[slug]/page.tsx
import { Metadata } from "next";
import { Main } from "@/components/layouts/main";
import { notFound } from "next/navigation";
import AuthorSection from "@/components/sections/blog/author-section";
import { generateAuthorMetadata } from "@/lib/blog/metadata";
import { 
    generateAuthorStaticParams, 
    fetchAuthorData, 
    AuthorParams 
} from "@/lib/blog/author-service";
import { AuthorPageProps } from "@/types/blog";

// ============================================
// STATIC PARAMS GENERATION
// ============================================
export const generateStaticParams = generateAuthorStaticParams;

// ============================================
// METADATA GENERATION
// ============================================
export async function generateMetadata({
    params,
}: {
    params: Promise<AuthorParams>;
}): Promise<Metadata> {
    const { locale, slug } = await params;

    console.log("========================================");
    console.log("📄 Generating metadata for author page");
    console.log("   • Slug:", slug);
    console.log("   • Locale:", locale);
    console.log("========================================");

    // Generar metadata con localizaciones alternativas
    return generateAuthorMetadata({ locale, slug });
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function AuthorPage({ 
    params, 
    searchParams 
}: AuthorPageProps) {
    const { locale, slug } = await params;
    
    console.log(`\n🔍 AuthorPage - Rendering for: ${slug} (${locale})`);
    
    // Verificar que el autor existe antes de renderizar
    const data = await fetchAuthorData(locale, slug);

    if (!data) {
        console.log(`❌ Author not found: ${slug} in ${locale}`);
        notFound();
    }

    console.log(`✅ Author page ready: ${data.author.name}`);
    console.log(`   • DocumentId: ${data.author.documentId}`);
    console.log(`   • Available languages: ${data.alternateLocales.map(l => l.locale).join(", ")}`);

    return (
        <Main ariaLabelKey="main.authorContent" className="min-h-screen">
            <AuthorSection 
                slug={slug}
                locale={locale}
                searchParams={searchParams}
            />
        </Main>
    );
}

// ============================================
// PERFORMANCE & SEO CONFIGS
// ============================================

/**
 * Revalidar el contenido cada hora
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = 3600;

/**
 * Permitir parámetros dinámicos
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
 */
export const dynamicParams = true;