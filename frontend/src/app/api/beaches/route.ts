// src/app/api/beaches/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  searchBeaches,
  filterBeaches,
  getAllBeaches,
  type Beach,
} from "@/lib/data/beaches";
import { headers } from "next/headers";

// 🔒 SEGURIDAD: Rate limiting mejorado con limpieza automática
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // peticiones por ventana
const RATE_WINDOW = 60000; // 1 minuto en ms

// Limpiar entradas antiguas cada 5 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of requestCounts.entries()) {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  }
}, 300000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// 🔒 SEGURIDAD: Sanitización de inputs
function sanitizeSearchTerm(term: string | null): string | null {
  if (!term) return null;

  // Eliminar caracteres peligrosos y limitar longitud
  return term
    .trim()
    .replace(/[<>'";&$()]/g, "") // Eliminar caracteres peligrosos
    .substring(0, 100); // Máximo 100 caracteres
}

export async function GET(request: NextRequest) {
  try {
    // 🔒 Rate limiting con IP real
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
      headersList.get("x-real-ip") ||
      headersList.get("cf-connecting-ip") || // Cloudflare
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Limit": String(RATE_LIMIT),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 🔒 CORS: Verificación estricta del origen
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    // 🔒 En desarrollo, permitir cualquier localhost
    // 🔒 En producción, CORS estricto
    const isDevelopment = process.env.NODE_ENV !== "production";

    if (!isDevelopment) {
      const allowedOrigins = [process.env.NEXT_PUBLIC_SITE_URL].filter(
        (url): url is string => Boolean(url)
      );

      const isAllowedOrigin =
        origin &&
        allowedOrigins.some(
          (allowed) => origin === allowed || origin.startsWith(allowed)
        );

      const isAllowedReferer =
        referer &&
        allowedOrigins.some((allowed) => referer.startsWith(allowed));

      if (!isAllowedOrigin && !isAllowedReferer) {
        console.warn(
          `🔒 Blocked request from unauthorized origin: ${origin || referer || "unknown"}`
        );
        return NextResponse.json(
          { error: "Forbidden - Invalid origin" },
          { status: 403 }
        );
      }
    }

    // 🔒 Validación y sanitización de parámetros
    const { searchParams } = new URL(request.url);
    const rawName = searchParams.get("name");
    const rawCity = searchParams.get("city");
    const rawQuery = searchParams.get("q"); // Búsqueda general

    // Sanitizar inputs
    const name = sanitizeSearchTerm(rawName);
    const city = sanitizeSearchTerm(rawCity);
    const query = sanitizeSearchTerm(rawQuery);

    let data: Beach[];

    // � Usar funciones helper optimizadas
    if (query) {
      // Búsqueda general (nombre, municipio, localidad, ubicación)
      data = searchBeaches(query);
    } else if (name || city) {
      // Búsqueda con filtros específicos
      data = filterBeaches({
        name: name || undefined,
        municipality: city || undefined,
      });
    } else {
      // Sin filtros, devolver todos
      data = getAllBeaches();
    }

    // 🔒 Limitar resultados para prevenir scraping masivo
    const MAX_RESULTS = 50;
    const limitedData = data.slice(0, MAX_RESULTS);

    // 🔒 Headers de seguridad robustos
    return NextResponse.json(limitedData, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "private, max-age=3600, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-Robots-Tag": "noindex, nofollow",
        "Access-Control-Allow-Origin":
          origin || process.env.NEXT_PUBLIC_SITE_URL || "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Max-Age": "86400",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  } catch (error) {
    console.error("🔴 Error fetching beaches:", error);

    // 🔒 No revelar detalles internos en producción
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }
}

// 🔒 Bloquear otros métodos HTTP
export async function POST() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { Allow: "GET" } }
  );
}
