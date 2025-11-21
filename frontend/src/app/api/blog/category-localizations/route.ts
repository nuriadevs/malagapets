// src/app/api/blog/category-localizations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCategoryBySlug, getCategoryLocalizations } from '@/lib/strapi/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  if (!slug || !locale) {
    return NextResponse.json(
      { error: 'Missing slug or locale parameter' },
      { status: 400 }
    );
  }

  try {
    // Buscar la categoría en el idioma actual
    let category = await getCategoryBySlug(slug, locale);
    // Si no se encuentra, buscar en todos los idiomas
    if (!category) {
      const locales = ['es', 'en', 'de', 'fr'];
      for (const searchLocale of locales) {
        category = await getCategoryBySlug(slug, searchLocale);
        if (category) {
          break;
        }
      }
    }
    // Si aún no se encuentra, devolver vacío
    if (!category) {
      return NextResponse.json({ localizations: [] });
    }
    // Buscar todas las localizaciones usando el document_id encontrado
    const allLocalizations = await getCategoryLocalizations(category.documentId);
    const response = {
      localizations: allLocalizations,
      currentLocale: category.locale || locale,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching category localizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category localizations' },
      { status: 500 }
    );
  }
}
