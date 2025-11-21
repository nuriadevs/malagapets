// src/lib/security/rate-limiter.ts

/**
 * 🔒 Rate Limiter centralizado para todas las APIs
 * En producción, considera usar Upstash Redis o Vercel KV
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private cache = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    private limit: number = 100,
    private windowMs: number = 60000 // 1 minuto
  ) {
    this.startCleanup();
  }

  private startCleanup() {
    // Limpiar entradas expiradas cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, record] of this.cache.entries()) {
        if (now > record.resetTime) {
          this.cache.delete(key);
        }
      }
    }, 300000);
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = this.cache.get(identifier);

    if (!record || now > record.resetTime) {
      const newRecord: RateLimitRecord = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      this.cache.set(identifier, newRecord);
      
      return {
        allowed: true,
        remaining: this.limit - 1,
        resetTime: newRecord.resetTime,
      };
    }

    if (record.count >= this.limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    record.count++;
    
    return {
      allowed: true,
      remaining: this.limit - record.count,
      resetTime: record.resetTime,
    };
  }

  reset(identifier: string) {
    this.cache.delete(identifier);
  }

  cleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.cache.clear();
  }
}

// Instancias para diferentes endpoints
export const apiRateLimiter = new RateLimiter(100, 60000); // 100 req/min
export const mapsRateLimiter = new RateLimiter(60, 60000); // 60 req/min (mapas más restrictivos)
export const searchRateLimiter = new RateLimiter(50, 60000); // 50 req/min (búsquedas)

/**
 * 🔒 Extrae la IP real del request considerando proxies
 */
export function getClientIP(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  
  if (forwardedFor) {
    // x-forwarded-for puede contener múltiples IPs (cliente, proxy1, proxy2...)
    return forwardedFor.split(',')[0].trim();
  }

  return (
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") || // Cloudflare
    headers.get("x-client-ip") ||
    "unknown"
  );
}

/**
 * 🔒 Sanitiza strings para prevenir inyecciones
 */
export function sanitizeString(input: string | null, maxLength: number = 100): string | null {
  if (!input) return null;

  return input
    .trim()
    .replace(/[<>'";&$(){}[\]\\]/g, '') // Eliminar caracteres peligrosos
    .substring(0, maxLength);
}

/**
 * 🔒 Valida que el origen es permitido
 */
export function validateOrigin(headers: Headers, allowedOrigins: string[]): boolean {
  const origin = headers.get("origin");
  const referer = headers.get("referer");

  const isAllowedOrigin = origin && allowedOrigins.some(allowed => 
    origin === allowed || origin.startsWith(allowed + '/')
  );

  const isAllowedReferer = referer && allowedOrigins.some(allowed => 
    referer.startsWith(allowed)
  );

  return Boolean(isAllowedOrigin || isAllowedReferer);
}
