// src/api/newsletter-subscriber/routes/newsletter-subscriber.ts

export default {
  routes: [
    // ========================================
    // RUTAS PÚBLICAS
    // ========================================
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'newsletter-subscriber.subscribe',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter/confirm',
      handler: 'newsletter-subscriber.confirm',
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletter/unsubscribe',
      handler: 'newsletter-subscriber.unsubscribe',
      config: {
        auth: false,
        policies: [],
      },
    },

    // ========================================
    // RUTAS PROTEGIDAS (Solo Admin)
    // ========================================
    {
      method: 'GET',
      path: '/newsletter-subscribers/stats',
      handler: 'newsletter-subscriber.stats',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers',
      handler: 'newsletter-subscriber.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers/:id',
      handler: 'newsletter-subscriber.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'DELETE',
      path: '/newsletter-subscribers/:id',
      handler: 'newsletter-subscriber.delete',
      config: {
        policies: [],
      },
    },
  ],
};