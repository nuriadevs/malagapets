/**
 * Middleware para establecer valores por defecto en queries de artículos
 * Permite que el cliente sobrescriba estos valores
 */
import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    // Establecer valores por defecto solo si no existen
    ctx.query = {
      locale: ctx.query.locale || 'es',
      sort: ctx.query.sort || ['publishedAt:desc'],
      populate: ctx.query.populate || {
        cover: { fields: ['url', 'alternativeText', 'width', 'height'] },
        author: {
          populate: { 
            avatar: { fields: ['url', 'alternativeText'] } 
          }
        },
        category: { fields: ['name', 'slug'] },
        tags: { fields: ['name', 'slug'] }
      },
      pagination: {
        page: ctx.query.pagination?.page || 1,
        pageSize: ctx.query.pagination?.pageSize || 14
      },
      // Preservar otros parámetros del cliente
      ...ctx.query
    };

    strapi.log.debug('blog-articles middleware applied', { 
      path: ctx.request.url,
      locale: ctx.query.locale 
    });

    await next();
  };
};