// src/app/api/blog/localizations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getArticleBySlug, getArticleLocalizations } from '@/lib/strapi/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');

  console.log('🔍 API Localizations - Request:', { slug, locale });

  if (!slug || !locale) {
    return NextResponse.json(
      { error: 'Missing slug or locale parameter' },
      { status: 400 }
    );
  }

  try {
    // ✅ Primero intentar buscar en el locale actual
    let post = await getArticleBySlug(slug, locale);
    
    // ✅ Si no se encuentra, buscar en todos los locales disponibles
    if (!post) {
      const locales = ['es', 'en', 'de', 'fr'];
      for (const searchLocale of locales) {
        if (searchLocale !== locale) {
          post = await getArticleBySlug(slug, searchLocale);
          if (post) {
            console.log(`✅ Artículo encontrado en locale: ${searchLocale}`);
            break;
          }
        }
      }
    }
    
    if (!post) {
      console.log('⚠️ Artículo no encontrado en ningún locale');
      return NextResponse.json({ localizations: [] });
    }

    // ✅ Obtener todas las versiones usando documentId
    const allLocalizations = await getArticleLocalizations(post.documentId);

    const response = {
      localizations: allLocalizations,
      currentLocale: post.locale || locale,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('❌ Error fetching localizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch localizations' },
      { status: 500 }
    );
  }
}
