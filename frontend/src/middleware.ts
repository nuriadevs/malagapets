// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔒 SEGURIDAD: Bloquear acceso directo a archivos JSON
  if (pathname.match(/\.json$/)) {
    console.warn(`Blocked JSON access attempt: ${pathname}`);
    return new NextResponse("Not Found", { status: 404 });
  }

  // 🔒 SEGURIDAD: Bloquear acceso directo a /data/
  if (pathname.startsWith("/data/")) {
    console.warn(`Blocked /data/ access attempt: ${pathname}`);
    return new NextResponse("Not Found", { status: 404 });
  }


  // ✅ Rutas públicas que NO pasan por i18n
  const publicFilePatterns = [
    /^\/manifest\.webmanifest$/,
    /^\/site\.webmanifest$/,
    /^\/robots\.txt$/,
    /^\/sitemap.*\.xml$/,
    /^\/favicon\.ico$/,
    /^\/icon.*\.png$/,
    /^\/apple-touch-icon.*\.png$/,
    /^\/_next\//,
    /^\/api\//,
    /^\/icons\//,
    /^\/screenshots\//,
    /^\/images\//,
    /^\/\.well-known\//,
  ];

  if (publicFilePatterns.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  // 🌐 Ejecutar middleware de i18n (él maneja TODO automáticamente)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Incluye todas las rutas excepto archivos estáticos
   // "/((?!_next|_vercel|.*\\..*).*)",

     "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};