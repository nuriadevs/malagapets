// src/api/services/article.ts
/*
import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::article.article",
  ({ strapi }) => ({
    /**
     * Calcular tiempo de lectura automáticamente
     
    calculateReadingTime(content: string): number {
      const wordsPerMinute = 200;
      const words = content.trim().split(/\s+/).length;
      return Math.ceil(words / wordsPerMinute);
    },

    /**
     * Lifecycle hook: antes de crear/actualizar
     * Calcula readingTime automáticamente
     
    async beforeCreateOrUpdate(data: any) {
      if (data.blocks) {
        const allText = data.blocks
          .filter(
            (block: any) =>
              block.__component.includes("rich-text") && block.body
          )
          .map((block: any) => block.body)
          .join(" ");

        data.readingTime = this.calculateReadingTime(allText);
      }
      return data;
    },
  })
);
*/

import { factories } from "@strapi/strapi";
import type { Core } from '@strapi/strapi';

// Tipos para mejor autocompletado
interface ArticleBlock {
  __component: string;
  body?: string;
}

interface ArticleData {
  blocks?: ArticleBlock[];
  readingTime?: number;
}

export default factories.createCoreService(
  "api::article.article",
  ({ strapi }: { strapi: Core.Strapi }) => ({
    /**
     * Calcula el tiempo de lectura basado en contenido de texto
     * @param content - Texto (puede contener HTML)
     * @returns Tiempo de lectura en minutos
     */
    calculateReadingTime(content: string): number {
      const wordsPerMinute = 200;
      
      // Eliminar etiquetas HTML para contar solo texto real
      const textWithoutHtml = content
        .replace(/<[^>]*>/g, ' ') // Remover tags HTML
        .replace(/\s+/g, ' ')      // Normalizar espacios
        .trim();
      
      const words = textWithoutHtml.split(/\s+/).length;
      const minutes = Math.ceil(words / wordsPerMinute);
      
      return minutes > 0 ? minutes : 1; // Mínimo 1 minuto
    },

    /**
     * Extrae todo el texto de los bloques de contenido
     * @param blocks - Array de bloques dinámicos
     * @returns Texto concatenado
     */
    extractTextFromBlocks(blocks: ArticleBlock[]): string {
      if (!blocks || !Array.isArray(blocks)) return '';

      return blocks
        .filter(block => 
          block.__component?.includes('rich-text') && block.body
        )
        .map(block => block.body)
        .join(' ');
    },

    /**
     * ✅ LIFECYCLE HOOK: Se ejecuta antes de crear
     * Strapi lo llama automáticamente
     */
    async beforeCreate(event) {
      const { data } = event.params;
      
      if (data.blocks) {
        const allText = this.extractTextFromBlocks(data.blocks);
        data.readingTime = this.calculateReadingTime(allText);
        
        strapi.log.debug('Article reading time calculated', {
          readingTime: data.readingTime,
          blocks: data.blocks.length
        });
      }
    },

    /**
     * ✅ LIFECYCLE HOOK: Se ejecuta antes de actualizar
     * Strapi lo llama automáticamente
     */
    async beforeUpdate(event) {
      const { data } = event.params;
      
      if (data.blocks) {
        const allText = this.extractTextFromBlocks(data.blocks);
        data.readingTime = this.calculateReadingTime(allText);
        
        strapi.log.debug('Article reading time recalculated on update', {
          id: event.params.where.id,
          readingTime: data.readingTime
        });
      }
    },

    /**
     * Método personalizado para búsquedas avanzadas
     * Ejemplo de extensión del servicio
     */
    async findPublishedWithAuthor(filters = {}) {
      return await strapi.entityService.findMany(
        'api::article.article',
        {
          filters: {
            ...filters,
            publishedAt: { $notNull: true },
          },
          populate: {
            author: {
              populate: { avatar: true },
            },
            cover: true,
            category: true,
          },
          sort: { publishedAt: 'desc' },
        }
      );
    },
  })
);