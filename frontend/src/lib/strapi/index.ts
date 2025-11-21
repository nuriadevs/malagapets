// src/lib/strapi/index.ts
/**
 * Punto de entrada centralizado para todas las funciones de Strapi
 * 
 * ESTRUCTURA:
 * - api.ts: Funciones principales de la API (RECOMENDADO para nuevo código)
 * - queries.ts: Funciones legacy con formatos específicos (mantener por compatibilidad)
 * - helpers.ts: Utilidades para procesamiento de datos
 * - mappers.ts: Transformación de datos de Strapi a formatos del frontend
 * - client.ts: Cliente HTTP para comunicación con Strapi
 * - config.ts: Configuración de conexión
 */

// ========================================
// EXPORTACIONES PRINCIPALES (API)
// ========================================
export * from './api';

// ========================================
// HELPERS Y UTILIDADES
// ========================================
export * from './helpers';
export * from './mappers';

// ========================================
// CONFIGURACIÓN
// ========================================
export * from './config';

// ========================================
// TIPOS
// ========================================
export type * from '@/types/strapi';
