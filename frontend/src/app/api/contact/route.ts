// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { render } from '@react-email/components';
import ContactOwner from '@/emails/contact-owner';
import ContactConfirmation from '@/emails/contact-confirmation';
import { Resend } from "resend";
import { z } from "zod";
import { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_EMAIL } from '@/config/constants';

// ============================================
// CONFIGURACIÓN
// ============================================

const resend = new Resend(RESEND_API_KEY);

// Validación con Zod
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(254, "Email demasiado largo"),
  subject: z
    .string()
    .min(3, "El asunto debe tener al menos 3 caracteres")
    .max(200, "El asunto no puede exceder 200 caracteres"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
  website: z.string().optional(), // Campo honeypot
});

type ContactFormData = Omit<z.infer<typeof contactSchema>, 'website'>;

// ============================================
// RATE LIMITING
// ============================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS = 5;

function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Limpiar registros expirados
  if (record && now > record.resetTime) {
    rateLimitMap.delete(identifier);
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    resetAt: record.resetTime,
  };
}

// ============================================
// UTILIDADES
// ============================================

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  return "unknown";
}

function sanitizeInput(input: string): string {
  return input
    .trim()
    // Eliminar caracteres peligrosos para XSS
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    // Normalizar espacios y saltos de línea
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    // Limitar caracteres especiales problemáticos
    .replace(/[^\w\s@.,!?¿¡\-áéíóúñüÁÉÍÓÚÑÜ]/g, "");
}

// ============================================
// GENERADORES DE EMAIL CON REACT EMAIL
// ============================================

async function generateOwnerEmail(data: ContactFormData, ip: string): Promise<string> {
  return await render(
    ContactOwner({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip: ip,
      timestamp: new Date().toLocaleString("es-ES", {
        dateStyle: "long",
        timeStyle: "short",
      }),
    })
  );
}

async function generateConfirmationEmail(data: ContactFormData): Promise<string> {
  return await render(
    ContactConfirmation({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
  );
}

// ============================================
// HANDLER PRINCIPAL
// ============================================

export async function POST(request: NextRequest) {
  try {
    // 🔒 CSRF Protection: Verificar origen del request
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ].filter((url): url is string => Boolean(url));

    const isAllowedOrigin = origin && allowedOrigins.some(allowed => 
      origin === allowed || origin.startsWith(allowed)
    );
    
    const isAllowedReferer = referer && allowedOrigins.some(allowed => 
      referer.startsWith(allowed)
    );

    // Bloquear requests de orígenes no autorizados
    if (!isAllowedOrigin && !isAllowedReferer) {
      console.warn(`🚨 CSRF attempt from origin: ${origin || 'none'}, referer: ${referer || 'none'}`);
      return NextResponse.json(
        { error: "Forbidden", code: "INVALID_ORIGIN" },
        { status: 403 }
      );
    }

    // 1. Obtener IP y verificar rate limit
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      const retryAfter = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);

      console.warn(`⚠️ Rate limit excedido para IP: ${clientIP}`);

      return NextResponse.json(
        {
          error:
            "Demasiadas solicitudes. Por favor, intenta de nuevo más tarde.",
          code: "RATE_LIMIT_EXCEEDED",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.floor(rateLimit.resetAt / 1000)),
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    // 2. Parsear body
    let body: unknown;
    try {
      body = await request.json();
    } catch (error) {
      console.error("❌ Error parseando JSON:", error);
      return NextResponse.json(
        {
          error: "Formato de datos inválido",
          code: "INVALID_JSON",
        },
        { status: 400 }
      );
    }

    // 3. Validar con Zod (incluye honeypot)
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      console.error("❌ Error de validación:", result.error.issues);
      return NextResponse.json(
        {
          error: "Error de validación",
          code: "VALIDATION_ERROR",
          details: result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    // 4. Verificar honeypot (anti-bot)
    if (result.data.website) {
      console.warn(`🤖 Bot detectado desde IP: ${clientIP}`);
      // Devolver éxito falso para no revelar el honeypot
      return NextResponse.json(
        { success: true, message: "Mensaje recibido" },
        { status: 200 }
      );
    }

    // 5. Sanitizar datos
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(result.data.name),
      email: sanitizeInput(result.data.email).toLowerCase(),
      subject: sanitizeInput(result.data.subject),
      message: sanitizeInput(result.data.message),
    };


    // 7. Generar HTML de los emails
    const ownerEmailHTML = await generateOwnerEmail(sanitizedData, clientIP);
    const confirmationEmailHTML = await generateConfirmationEmail(sanitizedData);

    // 8. Enviar email al propietario (tú)
    const ownerEmailResult = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: sanitizedData.email,
      subject: `[MálagaPets] ${sanitizedData.subject}`,
      html: ownerEmailHTML,
    });

    if (ownerEmailResult.error) {
      console.error("❌ Error enviando email al propietario:", ownerEmailResult.error);
      throw new Error("Failed to send owner email");
    }

    // 9. Enviar email de confirmación al usuario
    const confirmationResult = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [sanitizedData.email],
      subject: `Hemos recibido tu mensaje - MálagaPets`,
      html: confirmationEmailHTML,
    });

    if (confirmationResult.error) {
      console.error("⚠️ Error enviando confirmación al usuario:", confirmationResult.error);
      // No lanzar error aquí, es menos crítico que el email al propietario
    }

    // 10. Log de éxito
    console.log("✅ Emails enviados correctamente:", {
      ownerEmailId: ownerEmailResult.data?.id,
      confirmationEmailId: confirmationResult.data?.id,
      from: sanitizedData.email,
      subject: sanitizedData.subject,
      ip: clientIP,
      timestamp: new Date().toISOString(),
    });

    // 11. Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado correctamente",
        emailId: ownerEmailResult.data?.id,
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(MAX_REQUESTS),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": String(Math.floor(rateLimit.resetAt / 1000)),
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "default-src 'none'",
        },
      }
    );
  } catch (error) {
    console.error("❌ Error en endpoint de contacto:", error);

    return NextResponse.json(
      {
        error:
          "Error interno del servidor. Por favor, intenta de nuevo más tarde.",
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// ============================================
// CORS - SOLO TU DOMINIO
// ============================================

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter((url): url is string => Boolean(url));

  const isAllowed = origin && allowedOrigins.some(allowed => 
    origin === allowed || origin.startsWith(allowed)
  );

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": isAllowed ? origin : "null",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    },
  });
}