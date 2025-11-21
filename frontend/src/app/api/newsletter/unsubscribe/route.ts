// src/app/api/newsletter/unsubscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log('\n=== NEWSLETTER UNSUBSCRIBE ===');
    console.log('Email:', email);

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: { message: 'Email inválido' } },
        { status: 400 }
      );
    }

    // ✅ Llamar al endpoint de Strapi
    const strapiUrl = `${STRAPI_URL}/api/newsletter/unsubscribe`;
    console.log('🔄 Llamando a:', strapiUrl);

    const strapiResponse = await fetch(strapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    console.log('📊 Status:', strapiResponse.status);
    const strapiData = await strapiResponse.json();
    console.log('📦 Data:', JSON.stringify(strapiData, null, 2));

    return NextResponse.json(strapiData, { status: strapiResponse.status });
    
  } catch (error) {
    console.error('❌ Error en unsubscribe:', error);
    return NextResponse.json(
      { error: { message: 'Error interno del servidor' } },
      { status: 500 }
    );
  }
}
