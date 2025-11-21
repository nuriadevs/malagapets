// config/plugins.ts
//export default () => ({});
/*
// config/plugins.ts - Configurar GraphQL si lo usas
// ---------------------------------------------
export default {
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
};
*/

// config/plugins.ts
export default ({ env }) => ({
  // NO necesitamos configurar email provider porque usamos Resend directamente
  // La configuración de Resend se maneja en src/api/newsletter-subscriber/services/email.ts

  // Configuración de Upload (si usas Cloudinary o similar) 
  // ---------------------------------------------
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {
          folder: "malagapets",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        uploadStream: {
          folder: "malagapets",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        delete: {},
      },
    },
  },

  // GraphQL (si lo usas)
  /*
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 10,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  */
});
