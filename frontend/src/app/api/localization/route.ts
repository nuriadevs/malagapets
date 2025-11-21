// src/app/api/localization/route.ts
import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface LocalizationResult {
    success: boolean;
    currentLocale: string;
    currentSlug: string;
    localizations: Array<{
        locale: string;
        slug: string;
    }>;
}

/**
 * API unificada para obtener localizaciones de cualquier tipo de contenido
 * GET /api/localization?collection=articles&slug=playas-caninas&locale=es
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collection = searchParams.get("collection"); // articles, categories, authors
        const slug = searchParams.get("slug");
        const locale = searchParams.get("locale");

        // Validación de parámetros
        if (!collection || !slug || !locale) {
            return NextResponse.json(
                {
                    error: "Missing required parameters",
                    required: ["collection", "slug", "locale"],
                    received: { collection, slug, locale },
                },
                { status: 400 }
            );
        }

        // Validar colección permitida
        const allowedCollections = ["articles", "categories", "authors"];
        if (!allowedCollections.includes(collection)) {
            return NextResponse.json(
                {
                    error: "Invalid collection",
                    allowed: allowedCollections,
                    received: collection,
                },
                { status: 400 }
            );
        }

        console.log("🔍 Buscando localización:", { collection, slug, locale });

        // Construir query para Strapi v5
        const queryParams = new URLSearchParams({
            "filters[slug][$eq]": slug,
            "filters[locale][$eq]": locale,
            "populate[localizations][fields][0]": "slug",
            "populate[localizations][fields][1]": "locale",
        });

        const response = await fetch(
            `${STRAPI_URL}/api/${collection}?${queryParams}`,
            {
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN}`,
                    "Content-Type": "application/json",
                },
                next: {
                    revalidate: 300, // Cache 5 minutos
                    tags: [`${collection}-${slug}`], // Para revalidación bajo demanda
                },
            }
        );

        if (!response.ok) {
            console.error(
                `❌ Strapi error: ${response.status} ${response.statusText}`
            );
            return NextResponse.json(
                { error: "Strapi API error", status: response.status },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Verificar si se encontró el contenido
        if (!data.data || data.data.length === 0) {
            console.warn(
                `⚠️ Contenido no encontrado: ${collection}/${slug}/${locale}`
            );
            return NextResponse.json(
                { error: "Content not found", collection, slug, locale },
                { status: 404 }
            );
        }

        const content = data.data[0];

        // Extraer localizaciones
        const localizations =
            content.localizations?.map((loc: { locale: string; slug: string }) => ({
                locale: loc.locale,
                slug: loc.slug,
            })) || [];

        // Incluir el contenido actual en las localizaciones
        const allLocalizations = [
            {
                locale: content.locale,
                slug: content.slug,
            },
            ...localizations,
        ];

        const result: LocalizationResult = {
            success: true,
            currentLocale: content.locale,
            currentSlug: content.slug,
            localizations: allLocalizations,
        };

        console.log("✅ Localización encontrada:", result);

        return NextResponse.json(result, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
            },
        });
    } catch (error) {
        console.error("❌ Error en API de localización:", error);

        return NextResponse.json(
            {
                error: "Internal server error",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

/**
 * Permite revalidación manual si es necesario
 * POST /api/localization/revalidate
 */

/*
export async function POST(request: NextRequest) {
    try {
        const { collection, slug } = await request.json();

        // Aquí podrías implementar revalidateTag si usas Next.js 14+
        // revalidateTag(`${collection}-${slug}`);

        return NextResponse.json({
            success: true,
            message: "Cache invalidated",
        });
    } catch (error) {
        return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
    }
}
*/
