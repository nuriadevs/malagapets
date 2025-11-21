// config/admin.ts
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Las sesiones usan milisegundos, no formato de días
    // 30 días = 30 * 24 * 60 * 60 * 1000 = 2592000000 ms
    // 7 días = 7 * 24 * 60 * 60 * 1000 = 604800000 ms
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  }
});