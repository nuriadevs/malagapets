// src/lib/blog/author-service.ts
import {
  getAuthors,
  getAuthorBySlug,
  getAuthorLocalizations,
} from "@/lib/strapi/api";
import { getStrapiImageUrl } from "@/lib/strapi/helpers";
import { SITE_URL } from "@/config/constants";

const siteUrl = SITE_URL;

export type AuthorParams = {
  locale: string;
  slug: string;
};

/**
 * Genera los parámetros estáticos para todas las páginas de autor
 * Crea rutas para TODOS los idiomas con sus slugs localizados
 */
export async function generateAuthorStaticParams() {
  const params: Array<AuthorParams> = [];
  const processedDocumentIds = new Set<string>();

  try {
    console.log("\n🔄 Generando rutas de autor...\n");

    // Obtener autores del idioma por defecto
    const authorsResponse = await getAuthors("es");

    for (const author of authorsResponse.data) {
      if (processedDocumentIds.has(author.documentId)) {
        continue;
      }

      processedDocumentIds.add(author.documentId);

      console.log(`📝 Procesando autor: ${author.name} (${author.documentId})`);

      // Obtener todas las localizaciones
      const localizations = await getAuthorLocalizations(author.documentId);

      localizations.forEach((loc) => {
        params.push({
          locale: loc.locale,
          slug: loc.slug,
        });

        console.log(`   ✅ /${loc.locale}/blog/author/${loc.slug}`);
      });

      console.log("");
    }

    console.log(`✅ Total de rutas generadas: ${params.length}\n`);
  } catch (e) {
    console.error("❌ Error generando rutas de autor:", e);
  }

  return params;
}

/**
 * Obtiene las localizaciones alternativas de un autor
 */
export async function getAuthorAlternateLocales(documentId: string) {
  try {
    const localizations = await getAuthorLocalizations(documentId);
    console.log(`📍 Localizaciones para ${documentId}:`, localizations);
    return localizations;
  } catch (e) {
    console.error(`❌ Error getting author localizations:`, e);
    return [];
  }
}

/**
 * Obtiene los datos del autor para metadata y JSON-LD
 * ✅ VERSIÓN MEJORADA - Busca primero en el idioma correcto
 */
export async function fetchAuthorData(locale: string, slug: string) {
  try {
    console.log(`\n${"=".repeat(70)}`);
    console.log(`🔍 fetchAuthorData`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Locale: ${locale}`);
    console.log(`${"=".repeat(70)}`);

    // 1️⃣ Buscar el autor directamente en el idioma solicitado
    const authorInLocale = await getAuthorBySlug(slug, locale);

    if (authorInLocale) {
      console.log(`✅ Autor encontrado en locale ${locale}:`, {
        name: authorInLocale.name,
        slug: authorInLocale.slug,
        documentId: authorInLocale.documentId,
      });

      // 2️⃣ Obtener localizaciones
      const alternateLocales = await getAuthorLocalizations(authorInLocale.documentId);

      // 3️⃣ Obtener URL del avatar
      const avatarUrl = authorInLocale.avatar
        ? getStrapiImageUrl(authorInLocale.avatar, "medium")
        : null;

      // 4️⃣ Generar URLs alternativas
      const alternates = {
        canonical: `${siteUrl}/${locale}/blog/author/${authorInLocale.slug}`,
        languages: {} as Record<string, string>,
      };

      alternateLocales.forEach((loc) => {
        alternates.languages[loc.locale] = `${siteUrl}/${loc.locale}/blog/author/${loc.slug}`;
      });

      console.log(`🌍 URLs alternativas:`, alternates);
      console.log(`${"=".repeat(70)}\n`);

      return {
        author: authorInLocale,
        alternateLocales,
        alternates,
        jsonLdData: {
          name: authorInLocale.name,
          slug: authorInLocale.slug,
          bio: authorInLocale.bio,
          url: `${siteUrl}/${locale}/blog/author/${authorInLocale.slug}`,
          avatar: avatarUrl
            ? {
                url: avatarUrl.startsWith("http") ? avatarUrl : `${siteUrl}${avatarUrl}`,
                alt: authorInLocale.name,
              }
            : undefined,
        },
      };
    }

    // 2️⃣ Si no se encuentra en el idioma actual, buscar en otros idiomas
    console.log(`⚠️ Autor no encontrado en ${locale}, buscando en otros idiomas...`);

    const locales = ["es", "en", "de", "fr"];
    let foundAuthor = null;
    let authorDocumentId = null;

    for (const loc of locales) {
      if (loc === locale) continue; // Ya lo intentamos

      const authorsInOtherLocale = await getAuthors(loc);
      foundAuthor = authorsInOtherLocale.data.find((a) => a.slug === slug);

      if (foundAuthor) {
        authorDocumentId = foundAuthor.documentId;
        console.log(`✅ Autor encontrado en ${loc}:`, foundAuthor.name);
        break;
      }
    }

    if (!foundAuthor || !authorDocumentId) {
      console.warn(`❌ Autor no encontrado: ${slug}`);
      console.log(`${"=".repeat(70)}\n`);
      return null;
    }

    // 3️⃣ Obtener el autor en el locale solicitado usando el documentId
    const authorsInRequestedLocale = await getAuthors(locale);
    const authorInRequestedLocale = authorsInRequestedLocale.data.find(
      (a) => a.documentId === authorDocumentId
    );

    if (!authorInRequestedLocale) {
      console.warn(`❌ Autor no tiene versión en ${locale}`);
      console.log(`${"=".repeat(70)}\n`);
      return null;
    }

    console.log(`✅ Autor en locale ${locale}:`, authorInRequestedLocale.name);

    // 4️⃣ Obtener localizaciones
    const alternateLocales = await getAuthorLocalizations(authorDocumentId);

    // 5️⃣ Obtener URL del avatar
    const avatarUrl = authorInRequestedLocale.avatar
      ? getStrapiImageUrl(authorInRequestedLocale.avatar, "medium")
      : null;

    // 6️⃣ Generar URLs alternativas
    const alternates = {
      canonical: `${siteUrl}/${locale}/blog/author/${authorInRequestedLocale.slug}`,
      languages: {} as Record<string, string>,
    };

    alternateLocales.forEach((loc) => {
      alternates.languages[loc.locale] = `${siteUrl}/${loc.locale}/blog/author/${loc.slug}`;
    });

    console.log(`🌍 URLs alternativas:`, alternates);
    console.log(`${"=".repeat(70)}\n`);

    return {
      author: authorInRequestedLocale,
      alternateLocales,
      alternates,
      jsonLdData: {
        name: authorInRequestedLocale.name,
        slug: authorInRequestedLocale.slug,
        bio: authorInRequestedLocale.bio,
        url: `${siteUrl}/${locale}/blog/author/${authorInRequestedLocale.slug}`,
        avatar: avatarUrl
          ? {
              url: avatarUrl.startsWith("http") ? avatarUrl : `${siteUrl}${avatarUrl}`,
              alt: authorInRequestedLocale.name,
            }
          : undefined,
      },
    };
  } catch (e) {
    console.error(`❌ Error obteniendo datos del autor ${slug}:`, e);
    console.log(`${"=".repeat(70)}\n`);
    return null;
  }
}