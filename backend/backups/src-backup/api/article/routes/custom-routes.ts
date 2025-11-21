// backend/src/api/article/routes/article.ts
/*
export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/by-slug/:slug',
      handler: 'article.findBySlug',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/by-category/:categorySlug',
      handler: 'article.findByCategory',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/articles/by-author/:authorDocumentId',
      handler: 'article.findByAuthor',
      config: {
        auth: false,
      },
    },
  ],
};
*/


// backend/src/api/article/routes/article.ts
/**
 * Rutas personalizadas para artículos
 * Estas rutas complementan las rutas CRUD core
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/articles/by-slug/:slug',
      handler: 'article.findBySlug',
      config: {
        auth: false, // Acceso público
        description: 'Obtener artículo por slug',
        tag: {
          plugin: 'api',
          name: 'Article',
        },
      },
    },
    {
      method: 'GET',
      path: '/articles/by-category/:categorySlug',
      handler: 'article.findByCategory',
      config: {
        auth: false,
        description: 'Listar artículos de una categoría',
      },
    },
    {
      method: 'GET',
      path: '/articles/by-author/:authorDocumentId',
      handler: 'article.findByAuthor',
      config: {
        auth: false,
        description: 'Listar artículos de un autor',
      },
    },
  ],
};