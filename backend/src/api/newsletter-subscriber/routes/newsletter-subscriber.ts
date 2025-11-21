/**
 * newsletter-subscriber routes
 * Archivo: src/api/newsletter-subscriber/routes/newsletter-subscriber.ts
 */
/*
export default {
  routes: [
    // ========================================
    // 📬 RUTAS PÚBLICAS (sin autenticación)
    // ========================================

    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.subscribe',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter/confirm',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.confirm',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletter/unsubscribe',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.unsubscribe',
      config: {
        auth: false,
        policies: [],
      },
    },

    // ========================================
    // 🔐 RUTAS ADMINISTRATIVAS (requieren login Strapi)
    // ========================================

    {
      method: 'GET',
      path: '/newsletter-subscribers/stats',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.stats',
      config: {
        auth: false, // ⚠️ Puedes poner true si quieres restringirla
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.find',
      config: {
        auth: false, // puedes cambiar según tus necesidades
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers/:id',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.findOne',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/newsletter-subscribers/:id',
      handler: 'api::newsletter-subscriber.newsletter-subscriber.delete',
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
*/





/**
 * newsletter-subscriber routes
 * src/api/newsletter-subscriber/routes/newsletter.ts
 */

export default {
  routes: [
    // ========================================
    // 📬 RUTAS PÚBLICAS (sin autenticación)
    // ========================================

    // Suscribirse (crea registro pending y envía email)
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'newsletter-subscriber.subscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },

    // Confirmar suscripción (activa la suscripción)
    {
      method: 'POST',
      path: '/newsletter/confirm',
      handler: 'newsletter-subscriber.confirm',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },

    // Darse de baja
    {
      method: 'POST',
      path: '/newsletter/unsubscribe',
      handler: 'newsletter-subscriber.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },

    // ========================================
    // 🔐 RUTAS ADMINISTRATIVAS
    // ========================================

    // Estadísticas
    {
      method: 'GET',
      path: '/newsletter/stats',
      handler: 'newsletter-subscriber.stats',
      config: {
        auth: false, // Cambiar a true en producción
        policies: [],
      },
    },
  ],
};