// src/config/api.config.ts
/**
 * Configuración de la API
 * @module config/api
 */

import { STRAPI_URL, STRAPI_API_TOKEN, STRAPI_ENDPOINTS, STRAPI_CONFIG } from './constants';

export const API_CONFIG = {
  strapi: {
    url: STRAPI_URL,
    endpoints: STRAPI_ENDPOINTS,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`
    }
  },
  
  maps: {
    baseUrl: "/maps",
    types: ["parks", "vets"] as const
  }
} as const;

/**
 * Configuración de llamadas a la API
 */
export const API_SETTINGS = STRAPI_CONFIG;
