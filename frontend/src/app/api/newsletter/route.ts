/**
 * API Route: Newsletter Subscription (PROXY CON LOCALE)
 * src/app/api/newsletter/route.ts
 */

import { NextRequest, NextResponse } from 'next/server';
import { STRAPI_URL } from '@/config/constants';

/**
 * POST /api/newsletter
 * Suscribirse al newsletter
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, locale } = body; // 🌍 Capturar locale

    console.log('\n=== NEWSLETTER SUBSCRIPTION (PROXY) ===');
    console.log('Email:', email);
    console.log('Nombre:', name);
    console.log('Locale:', locale); // 🌍 Log del locale

    // Validación básica
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Validar locale (opcional pero recomendado)
    const validLocales = ['es', 'en', 'de', 'fr'];
    const finalLocale = locale && validLocales.includes(locale) ? locale : 'es';

    console.log('🌍 Locale final a enviar:', finalLocale);

    // ============================================
    // LLAMADA AL BACKEND (enviar locale)
    // ============================================
    console.log('🔄 Llamando a Strapi:', `${STRAPI_URL}/api/newsletter/subscribe`);

    const strapiResponse = await fetch(`${STRAPI_URL}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        name,
        locale: finalLocale // 🌍 PASAR LOCALE A STRAPI
      }),
    });

    console.log('📊 Respuesta de Strapi:', strapiResponse.status);

    const strapiData = await strapiResponse.json();
    console.log('📦 Data:', JSON.stringify(strapiData, null, 2));

    return NextResponse.json(strapiData, { status: strapiResponse.status });

  } catch (error) {
    console.error('❌ Error en newsletter proxy:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al procesar la suscripción',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/newsletter
 * Health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'Newsletter API Proxy',
    strapiUrl: STRAPI_URL,
    supportedLocales: ['es', 'en', 'de', 'fr'],
    timestamp: new Date().toISOString(),
  });
}