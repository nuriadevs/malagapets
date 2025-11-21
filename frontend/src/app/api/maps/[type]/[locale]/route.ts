// src/app/api/maps/[type]/[locale]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import { mapsRateLimiter, getClientIP } from "@/lib/security/rate-limiter";
import {
  getHTMLSecurityHeaders,
  getRateLimitHeaders,
  getErrorHeaders,
} from "@/lib/security/headers";

const VALID_TYPES = ["parks", "vets", "beaches"] as const;
const VALID_LOCALES = ["es", "en", "de", "fr"] as const;

type MapType = (typeof VALID_TYPES)[number];
type Locale = (typeof VALID_LOCALES)[number];

function logSuspiciousActivity(ip: string, reason: string, details?: string) {
  console.warn(`🚨 SECURITY: ${reason}`, {
    ip,
    timestamp: new Date().toISOString(),
    details,
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; locale: string }> }
) {
  try {
    const headersList = await headers();
    const ip = getClientIP(headersList);
    const rateLimit = mapsRateLimiter.check(ip);

    if (!rateLimit.allowed) {
      logSuspiciousActivity(
        ip,
        "Rate limit exceeded for maps",
        `Limit: 60 req/min`
      );
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            ...getErrorHeaders(),
            ...getRateLimitHeaders(
              60,
              rateLimit.remaining,
              rateLimit.resetTime
            ),
          },
        }
      );
    }

    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ].filter((url): url is string => Boolean(url));

    const isAllowedOrigin =
      origin &&
      allowedOrigins.some(
        (allowed) => origin === allowed || origin.startsWith(allowed + "/")
      );

    const isAllowedReferer =
      referer && allowedOrigins.some((allowed) => referer.startsWith(allowed));

    const isDevelopment = process.env.NODE_ENV !== "production";

    if (!isDevelopment && !isAllowedOrigin && !isAllowedReferer) {
      logSuspiciousActivity(
        ip,
        "Unauthorized map access attempt",
        `Origin: ${origin || "none"}, Referer: ${referer || "none"}`
      );

      return NextResponse.json(
        {
          error:
            "Forbidden - Maps can only be accessed from authorized domains",
        },
        { status: 403, headers: getErrorHeaders() }
      );
    }

    const { type, locale } = await params;
    const normalizedType = type.toLowerCase().trim();
    const normalizedLocale = locale.toLowerCase().trim();

    // Validaciones de seguridad
    if (
      normalizedType.includes("..") ||
      normalizedType.includes("/") ||
      normalizedType.includes("\\")
    ) {
      logSuspiciousActivity(
        ip,
        "Path traversal attempt detected",
        `Type: ${type}`
      );
      return NextResponse.json(
        { error: "Invalid map type" },
        { status: 400, headers: getErrorHeaders() }
      );
    }

    if (!VALID_TYPES.includes(normalizedType as MapType)) {
      logSuspiciousActivity(ip, "Invalid map type requested", `Type: ${type}`);
      return NextResponse.json(
        { error: "Invalid map type" },
        { status: 400, headers: getErrorHeaders() }
      );
    }

    if (!VALID_LOCALES.includes(normalizedLocale as Locale)) {
      logSuspiciousActivity(
        ip,
        "Invalid locale requested",
        `Locale: ${locale}`
      );
      return NextResponse.json(
        { error: "Invalid locale" },
        { status: 400, headers: getErrorHeaders() }
      );
    }

    const fileName = `${normalizedType}_${normalizedLocale}.html`;

    if (!/^[a-z]+_[a-z]{2}\.html$/.test(fileName)) {
      logSuspiciousActivity(
        ip,
        "Invalid filename pattern",
        `Filename: ${fileName}`
      );
      return NextResponse.json(
        { error: "Invalid file name" },
        { status: 400, headers: getErrorHeaders() }
      );
    }

    const filePath = path.resolve(
      process.cwd(),
      "src",
      "data",
      "maps",
      normalizedType,
      fileName
    );

    const allowedDir = path.resolve(process.cwd(), "src", "data", "maps");
    if (!filePath.startsWith(allowedDir)) {
      logSuspiciousActivity(
        ip,
        "Path traversal attempt detected",
        `Path: ${filePath}`
      );
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403, headers: getErrorHeaders() }
      );
    }

    // Leer archivo
    let fileContent = await readFile(filePath, "utf-8");

    // ✅ FIXES COMPLETOS para OpenStreetMap tiles
    fileContent = fileContent
      // Fix 1: URL sin {s} con comillas dobles
      .replace(
        /"https:\/\/tile\.openstreetmap\.org\//g,
        '"https://{s}.tile.openstreetmap.org/'
      )
      // Fix 2: URL sin {s} con comillas simples
      .replace(
        /'https:\/\/tile\.openstreetmap\.org\//g,
        "'https://{s}.tile.openstreetmap.org/"
      )
      // Fix 3: URLs con subdominios específicos (a, b, c)
      .replace(
        /https:\/\/[abc]\.tile\.openstreetmap\.org\//g,
        "https://{s}.tile.openstreetmap.org/"
      )
      // Fix 4: Awesome Markers URLs incorrectas
      .replace(
        /https:\/\/raw\.githubusercontent\.com\/lvoogdt\/Leaflet\.awesome-markers/g,
        "https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2"
      )
      // Fix 5: Forzar HTTPS en todos los recursos
      .replace(
        /http:\/\/(tile\.openstreetmap\.org|cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)/g,
        "https://$1"
      )
      // Fix 6: Remover source maps problemáticos
      .replace(
        /\/\/# sourceMappingURL=.+\.map/g,
        "// sourceMappingURL removed for security"
      );

    // ✅ NUEVO FIX: Inyectar script para manejar links externos desde iframe
    const externalLinkHandler = `
    <script>
      // Fix para abrir links externos desde iframe
      (function() {
        document.addEventListener('DOMContentLoaded', function() {
          // Interceptar todos los clicks en links
          document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            
            // Si es un link externo con target="_blank"
            if (link && link.target === '_blank' && link.href) {
              e.preventDefault();
              e.stopPropagation();
              
              // Enviar mensaje al parent window para abrir link
              if (window.parent !== window) {
                window.parent.postMessage({
                  type: 'OPEN_EXTERNAL_LINK',
                  url: link.href
                }, '*');
              } else {
                // Si no hay parent, abrir normalmente
                window.open(link.href, '_blank', 'noopener,noreferrer');
              }
            }
          });
        });
      })();
    </script>`;

    // Inyectar antes del cierre de </head>
    fileContent = fileContent.replace('</head>', `${externalLinkHandler}</head>`);

    // ✅ Marca de agua + información de debug
    const watermark = `
    <!-- 
      🗺️ Map Information
      Generated: ${new Date().toISOString()}
      Type: ${normalizedType}
      Locale: ${normalizedLocale}
      IP: ${ip.substring(0, 8)}...
    -->`;

    const watermarkedContent = fileContent.replace(
      "</body>",
      `${watermark}</body>`
    );

    // 📊 Logging para debug (solo en desarrollo)
    if (isDevelopment) {
      console.log("🗺️ Map served:", {
        type: normalizedType,
        locale: normalizedLocale,
        ip: ip.substring(0, 8) + "...",
        origin,
        hasSubdomainTiles: watermarkedContent.includes("{s}.tile.openstreetmap.org"),
        hasExternalLinkHandler: watermarkedContent.includes("OPEN_EXTERNAL_LINK"),
      });
    }

    // ✅ Devolver con headers corregidos
    return new NextResponse(watermarkedContent, {
      status: 200,
      headers: {
        ...getHTMLSecurityHeaders(origin),
        ...getRateLimitHeaders(60, rateLimit.remaining, rateLimit.resetTime),
      },
    });
    
  } catch (error) {
    const headersList = await headers();
    const ip = getClientIP(headersList);

    console.error("🔴 Error loading map:", error);

    if (error instanceof Error && error.message.includes("ENOENT")) {
      logSuspiciousActivity(ip, "Map file not found", error.message);
    }

    return NextResponse.json(
      { error: "Map not found" },
      { status: 404, headers: getErrorHeaders() }
    );
  }
}

// Bloquear otros métodos HTTP
const notAllowedHandler = () =>
  NextResponse.json(
    { error: "Method not allowed" },
    { status: 405, headers: { ...getErrorHeaders(), Allow: "GET" } }
  );

export const POST = notAllowedHandler;
export const PUT = notAllowedHandler;
export const DELETE = notAllowedHandler;
export const PATCH = notAllowedHandler;
export const HEAD = notAllowedHandler;
export const OPTIONS = notAllowedHandler;