//src/api/article/routes/article.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::article.article", {
  // Configuración específica para cada endpoint
  config: {
    find: {
      middlewares: ["api::article.blog-articles"], // Middleware personalizado
      policies: [], // Políticas de acceso
    },
    findOne: {
      // Permitir acceso público para lectura
      auth: false,
    },
    create: {
      // Solo usuarios autenticados pueden crear
      policies: ["admin::isAuthenticatedAdmin"],
    },
    update: {
      policies: ["admin::isAuthenticatedAdmin"],
    },
    delete: {
      policies: ["admin::isAuthenticatedAdmin"],
    },
  },
});
