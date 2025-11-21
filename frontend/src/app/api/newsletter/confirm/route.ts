// src/app/api/newsletter/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email } = body;

    console.log('\n=== NEWSLETTER CONFIRMATION ===');
    console.log('Token:', token?.substring(0, 10) + '...');
    console.log('Email:', email);

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
  return NextResponse.json(
    { error: 'Email inválido' },
    { status: 400 }
  );
}

    // ✅ CORRECCIÓN: URL correcta según tus rutas de Strapi
    const strapiUrl = `${STRAPI_URL}/api/newsletter/confirm`;
    console.log('🔄 Llamando a:', strapiUrl);

    const strapiResponse = await fetch(strapiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, email }),
    });

    console.log('📊 Status:', strapiResponse.status);

    const strapiData = await strapiResponse.json();
    console.log('📦 Data:', JSON.stringify(strapiData, null, 2));

    return NextResponse.json(strapiData, { status: strapiResponse.status });

  } catch (error) {
    console.error('❌ Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al confirmar la suscripción',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'Newsletter Confirmation API',
    method: 'POST',
    body: { token: 'string' },
  });
}