// src/app/api/blog/author-localizations/route.ts
import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface LocalizationResult {
  success: boolean;
  currentLocale: string;
  currentSlug: string;
  documentId: string;
  localizations: Array<{
    locale: string;
    slug: string;
    name: string;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const locale = searchParams.get("locale");

    console.log("\n" + "=".repeat(70));
    console.log("🔍 API: Author Localizations Request");
    console.log("   • Slug:", slug);
    console.log("   • Locale:", locale);
    console.log("=".repeat(70));

    if (!slug || !locale) {
      console.error("❌ Missing required parameters");
      return NextResponse.json(
        {
          error: "Missing required parameters",
          required: ["slug", "locale"],
        },
        { status: 400 }
      );
    }

    // 1️⃣ Buscar el autor en el idioma actual
    const currentQuery = new URLSearchParams({
      "filters[slug][$eq]": slug,
      "filters[locale][$eq]": locale,
      "populate[localizations][fields][0]": "slug",
      "populate[localizations][fields][1]": "locale",
      "populate[localizations][fields][2]": "name",
      "populate[localizations][fields][3]": "documentId",
      "fields[0]": "slug",
      "fields[1]": "locale",
      "fields[2]": "name",
      "fields[3]": "documentId",
    });

    const strapiUrl = `${STRAPI_URL}/api/authors?${currentQuery}`;
    console.log("📡 Strapi URL:", strapiUrl);

    let response = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    console.log("📦 Strapi Response Status:", response.status);

    if (!response.ok) {
      console.error(`❌ Strapi error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return NextResponse.json(
        { error: "Strapi API error", details: errorText },
        { status: response.status }
      );
    }

    let data = await response.json();
    console.log("📦 Strapi Response Data:", JSON.stringify(data, null, 2));

    // 2️⃣ Si no se encuentra en el idioma actual, buscar en TODOS los idiomas
    if (!data.data || data.data.length === 0) {
      console.log(`⚠️ Autor no encontrado en ${locale}, buscando en otros idiomas...`);

      const globalQuery = new URLSearchParams({
        "filters[slug][$eq]": slug,
        "populate[localizations][fields][0]": "slug",
        "populate[localizations][fields][1]": "locale",
        "populate[localizations][fields][2]": "name",
        "populate[localizations][fields][3]": "documentId",
        "fields[0]": "slug",
        "fields[1]": "locale",
        "fields[2]": "name",
        "fields[3]": "documentId",
      });

      const globalUrl = `${STRAPI_URL}/api/authors?${globalQuery}`;
      console.log("📡 Global Search URL:", globalUrl);

      response = await fetch(globalUrl, {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 },
      });

      if (!response.ok) {
        console.error("❌ Global search failed");
        return NextResponse.json(
          { error: "Author not found in any locale" },
          { status: 404 }
        );
      }

      data = await response.json();
      console.log("📦 Global Search Response:", JSON.stringify(data, null, 2));
    }

    if (!data.data || data.data.length === 0) {
      console.warn(`⚠️ Autor no encontrado: ${slug}`);
      return NextResponse.json(
        { error: "Author not found" },
        { status: 404 }
      );
    }

    const author = data.data[0];

    console.log("✅ Autor encontrado:", {
      name: author.name,
      slug: author.slug,
      locale: author.locale,
      documentId: author.documentId,
    });

    // 3️⃣ Verificar localizaciones
    console.log("📍 Localizaciones recibidas:", author.localizations);

    if (!author.localizations || author.localizations.length === 0) {
      console.warn("⚠️ Este autor NO tiene localizaciones en otros idiomas");
      console.warn("   → Debes crear versiones en otros idiomas en Strapi");
    }

    // 4️⃣ Construir array completo de localizaciones
    const allLocalizations: Array<{ locale: string; slug: string; name: string }> = [
      {
        locale: author.locale,
        slug: author.slug,
        name: author.name,
      },
    ];

    if (author.localizations && Array.isArray(author.localizations)) {
      author.localizations.forEach((loc: { locale: string; slug: string; name: string }) => {
        allLocalizations.push({
          locale: loc.locale,
          slug: loc.slug,
          name: loc.name,
        });
      });
    }

    const result: LocalizationResult = {
      success: true,
      currentLocale: author.locale,
      currentSlug: author.slug,
      documentId: author.documentId,
      localizations: allLocalizations,
    };

    console.log("✅ Resultado final:", result);
    console.log("=".repeat(70) + "\n");

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("❌ Error en API de localización de autor:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}