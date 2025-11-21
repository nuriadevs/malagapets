/**
 * newsletter-subscriber controller
 * src/api/newsletter-subscriber/controllers/newsletter-subscriber.ts
 */
/*
import { factories } from '@strapi/strapi';
import crypto from 'crypto';

export default factories.createCoreController(
  'api::newsletter-subscriber.newsletter-subscriber',
  ({ strapi }) => ({
    
    /**
     * 📧 PASO 1: Suscripción inicial
     * Crea registro en estado "pending" y envía email de confirmación
     
    async subscribe(ctx) {
      try {
        const { email, name } = ctx.request.body;

        // ============================================
        // 1. VALIDACIONES
        // ============================================
        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
          return ctx.badRequest('El nombre es obligatorio');
        }

        const trimmedName = name.trim();

        // Validar longitud del nombre (mínimo 2, máximo 30 caracteres)
        if (trimmedName.length < 2) {
          return ctx.badRequest('El nombre debe tener al menos 2 caracteres');
        }

        if (trimmedName.length > 30) {
          return ctx.badRequest('El nombre no puede exceder 30 caracteres');
        }

        // Validar que solo contenga letras, espacios, guiones y apóstrofes
        const nameRegex = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+$/;
        if (!nameRegex.test(trimmedName)) {
          return ctx.badRequest('El nombre solo puede contener letras, espacios, guiones y apóstrofes');
        }

        // Evitar nombres con números o caracteres especiales sospechosos
        if (/\d/.test(trimmedName)) {
          return ctx.badRequest('El nombre no puede contener números');
        }

        // Evitar múltiples espacios consecutivos
        if (/\s{2,}/.test(trimmedName)) {
          return ctx.badRequest('El nombre no puede contener espacios múltiples consecutivos');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return ctx.badRequest('El formato del email no es válido');
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedName = trimmedName;

        strapi.log.info(`\n=== NUEVA SUSCRIPCIÓN ===`);
        strapi.log.info(`Email: ${normalizedEmail}`);
        strapi.log.info(`Name: ${normalizedName}`);

        // ============================================
        // 2. VERIFICAR SI YA EXISTE
        // ============================================
        const existingSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (existingSubscriber) {
          strapi.log.info(`⚠️  Email ya existe - Estado: ${existingSubscriber.estado}`);

          // Si ya está activo
          if (existingSubscriber.estado === 'activo') {
            return ctx.badRequest('Este email ya está suscrito al newsletter');
          }

          // Si está pending, regenerar token y reenviar
          if (existingSubscriber.estado === 'pending') {
            strapi.log.info('🔄 Regenerando token y reenviando email...');

            const token = this.generateToken();
            const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

            // Actualizar token
            await strapi.db
              .query('api::newsletter-subscriber.newsletter-subscriber')
              .update({
                where: { id: existingSubscriber.id },
                data: {
                  confirmationToken: token,
                  tokenExpiration: tokenExpiry,
                  name: normalizedName, // Actualizar con el nuevo nombre
                },
              });

            // Reenviar email
            const emailService = strapi.service('api::newsletter-subscriber.email');
            const emailResult = await emailService.sendConfirmationEmail(
              normalizedEmail,
              normalizedName,
              token
            );

            if (!emailResult.success) {
              return ctx.internalServerError('Error al enviar el email de confirmación');
            }

            return ctx.send({
              success: true,
              code: 'PENDING_CONFIRMATION',
              data: {
                email: normalizedEmail,
                estado: 'pending',
                pendingConfirmation: true,
              },
            });
          }

          // Si está inactivo, reactivar
          if (existingSubscriber.estado === 'inactivo') {
            const token = this.generateToken();
            const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

            await strapi.db
              .query('api::newsletter-subscriber.newsletter-subscriber')
              .update({
                where: { id: existingSubscriber.id },
                data: {
                  estado: 'pending',
                  confirmationToken: token,
                  tokenExpiration: tokenExpiry,
                  unsubscribedAt: null,
                  name: normalizedName, // Actualizar nombre
                },
              });

            const emailService = strapi.service('api::newsletter-subscriber.email');
            await emailService.sendConfirmationEmail(normalizedEmail, normalizedName, token);

            return ctx.send({
              success: true,
              code: 'REACTIVATED',
              data: { 
                email: normalizedEmail, 
                estado: 'pending',
                reactivated: true,
              },
            });
          }
        }

        // ============================================
        // 3. CREAR NUEVO SUSCRIPTOR
        // ============================================
        const token = this.generateToken();
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .create({
            data: {
              email: normalizedEmail,
              name: normalizedName,
              estado: 'pending',
              confirmationToken: token,
              tokenExpiration: tokenExpiry,
              publishedAt: new Date(), // Publicar inmediatamente
            },
          });

        strapi.log.info(`✅ Suscriptor creado - ID: ${subscriber.id}`);

        // ============================================
        // 4. ENVIAR EMAIL DE CONFIRMACIÓN
        // ============================================
        const emailService = strapi.service('api::newsletter-subscriber.email');
        const emailResult = await emailService.sendConfirmationEmail(
          normalizedEmail,
          normalizedName,
          token
        );

        if (!emailResult.success) {
          strapi.log.error('❌ Error al enviar email');
          // No eliminamos el registro, el usuario puede intentar de nuevo
          return ctx.internalServerError('Error al enviar el email de confirmación');
        }

        strapi.log.info(`✅ Email de confirmación enviado`);

        return ctx.send(
          {
            success: true,
            code: 'SUBSCRIPTION_CREATED',
            data: {
              email: normalizedEmail,
              estado: 'pending',
            },
          },
          201
        );
      } catch (error) {
        strapi.log.error('❌ Error en suscripción:', error);
        return ctx.internalServerError('Error al procesar la suscripción');
      }
    },

    /**
     * ✅ PASO 2: Confirmar suscripción
     * Cambia estado a "activo" y envía email de bienvenida
     
    async confirm(ctx) {
      try {
        // ✅ Aceptar parámetros desde query (GET) o body (POST)
        const token = ctx.query.token || ctx.request.body?.token;
        const email = ctx.query.email || ctx.request.body?.email;

        strapi.log.info(`\n=== CONFIRMACIÓN DE SUSCRIPCIÓN ===`);
        strapi.log.info(`Token recibido: ${token?.substring(0, 10)}...`);
        strapi.log.info(`Email recibido: ${email}`);

        // ✅ Validación de token y email
        if (!token || typeof token !== 'string') {
          return ctx.badRequest('Token de confirmación inválido');
        }

        if (!email || typeof email !== 'string') {
          return ctx.badRequest('Email es requerido para confirmar la suscripción');
        }

        // Normalizar email
        const normalizedEmail = email.toLowerCase().trim();

        strapi.log.info(`🔍 Buscando con Token: ${token}`);
        strapi.log.info(`🔍 Buscando con Email: ${normalizedEmail}`);

        // ============================================
        // 1. BUSCAR SUSCRIPTOR POR TOKEN Y EMAIL (seguridad adicional)
        // ============================================
        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: {
              confirmationToken: token,
              email: normalizedEmail,
            },
          });

        strapi.log.info(`📊 Resultado búsqueda: ${subscriber ? 'ENCONTRADO' : 'NO ENCONTRADO'}`);
        if (subscriber) {
          strapi.log.info(`📊 Estado del suscriptor: ${subscriber.estado}`);
          strapi.log.info(`📊 Token en BD: ${subscriber.confirmationToken?.substring(0, 10)}...`);
        }

        if (!subscriber) {
          strapi.log.warn(`❌ Token o email no encontrado. Email: ${normalizedEmail}`);
          return ctx.notFound('Token de confirmación inválido o email no coincide');
        }

        strapi.log.info(`✅ Suscriptor encontrado: ${subscriber.email}`);

        // ============================================
        // 2. VERIFICAR SI YA ESTÁ CONFIRMADO
        // ============================================
        if (subscriber.estado === 'activo') {
          strapi.log.info('⚠️  Ya estaba confirmado');
          return ctx.send({
            success: true,
            code: 'ALREADY_CONFIRMED',
            data: {
              email: subscriber.email,
              estado: 'activo',
              alreadyConfirmed: true,
            },
          });
        }

        // ============================================
        // 3. VERIFICAR EXPIRACIÓN DEL TOKEN
        // ============================================
        const now = new Date();
        const tokenExpiry = new Date(subscriber.tokenExpiration);

        if (now > tokenExpiry) {
          strapi.log.warn('❌ Token expirado');
          return ctx.gone({
            error: 'El enlace de confirmación ha expirado. Solicita un nuevo email de confirmación.',
            code: 'TOKEN_EXPIRED',
          });
        }

        // ============================================
        // 4. ACTIVAR SUSCRIPCIÓN
        // ============================================
        const updatedSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: {
              estado: 'activo',
              confirmedAt: now,
              confirmationToken: null, // Limpiar token usado
              tokenExpiration: null,
            },
          });

        strapi.log.info(`✅ Suscripción activada: ${updatedSubscriber.email}`);

        // ============================================
        // 5. ENVIAR EMAIL DE BIENVENIDA
        // ============================================
        const emailService = strapi.service('api::newsletter-subscriber.email');
        await emailService.sendWelcomeEmail(
          updatedSubscriber.email,
          updatedSubscriber.name || ''
        );

        strapi.log.info(`✅ Email de bienvenida enviado`);

        return ctx.send({
          success: true,
          code: 'CONFIRMED',
          data: {
            email: updatedSubscriber.email,
            estado: 'activo',
            confirmedAt: updatedSubscriber.confirmedAt,
          },
        });
      } catch (error) {
        strapi.log.error('❌ Error en confirmación:', error);
        return ctx.internalServerError('Error al confirmar la suscripción');
      }
    },

    /**
     * 🚫 Cancelar suscripción
     
    async unsubscribe(ctx) {
      try {
        const { email } = ctx.request.body;

        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        const normalizedEmail = email.toLowerCase().trim();

        strapi.log.info(`\n=== BAJA DE SUSCRIPCIÓN ===`);
        strapi.log.info(`Email: ${normalizedEmail}`);

        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (!subscriber) {
          return ctx.notFound('Email no encontrado en nuestra base de datos');
        }

        if (subscriber.estado === 'inactivo') {
          return ctx.send({
            success: true,
            code: 'ALREADY_UNSUBSCRIBED',
          });
        }

        await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: {
              estado: 'inactivo',
              unsubscribedAt: new Date(),
            },
          });

        strapi.log.info(`✅ Baja procesada: ${normalizedEmail}`);

        // Enviar email de confirmación de baja
        const emailService = strapi.service('api::newsletter-subscriber.email');
        await emailService.sendUnsubscribeEmail(normalizedEmail, subscriber.name || '');

        return ctx.send({
          success: true,
          code: 'UNSUBSCRIBED',
        });
      } catch (error) {
        strapi.log.error('❌ Error en baja:', error);
        return ctx.internalServerError('Error al procesar la baja');
      }
    },

    /**
     * 📊 Estadísticas
     
    async stats(ctx) {
      try {
        const total = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count();

        const activos = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'activo' } });

        const pendientes = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'pending' } });

        const inactivos = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'inactivo' } });

        return ctx.send({
          success: true,
          data: {
            total,
            activos,
            pendientes,
            inactivos,
            tasaConfirmacion: total > 0 ? ((activos / total) * 100).toFixed(2) + '%' : '0%',
          },
        });
      } catch (error) {
        strapi.log.error('Error obteniendo estadísticas:', error);
        return ctx.internalServerError('Error al obtener estadísticas');
      }
    },

    /**
     * 🔐 Helper: Generar token seguro
     
    generateToken(): string {
      return crypto.randomBytes(32).toString('hex');
    },
  })
);

*/

// src/api/newsletter-subscriber/controllers/newsletter-subscriber.ts

/**
 * newsletter-subscriber controller (con soporte i18n)
 * src/api/newsletter-subscriber/controllers/newsletter-subscriber.ts
 */
/**
 * newsletter-subscriber controller (con soporte i18n)
 * src/api/newsletter-subscriber/controllers/newsletter-subscriber.ts
 */

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

// Idiomas soportados
const SUPPORTED_LOCALES = ['es', 'en', 'de', 'fr'] as const;
type SupportedLocale = typeof SUPPORTED_LOCALES[number];

// 🌍 Helper: Detectar y validar el locale
const detectLocale = (ctx: any): SupportedLocale => {
  // 1. Intentar desde el body
  const bodyLocale = ctx.request.body?.locale || ctx.request.body?.lang;
  
  // 2. Intentar desde query params
  const queryLocale = ctx.query?.locale || ctx.query?.lang;
  
  // 3. Intentar desde headers (Accept-Language)
  const headerLocale = ctx.request.headers['accept-language']?.split(',')[0]?.split('-')[0];
  
  // Prioridad: body > query > headers > default
  const requestedLocale = (bodyLocale || queryLocale || headerLocale || 'es').toLowerCase();
  
  // Validar que sea un locale soportado
  const locale = SUPPORTED_LOCALES.includes(requestedLocale as SupportedLocale) 
    ? requestedLocale as SupportedLocale
    : 'es';
  
  return locale;
};

// 🔐 Helper: Generar token seguro
const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export default factories.createCoreController(
  'api::newsletter-subscriber.newsletter-subscriber',
  ({ strapi }) => ({
    
    /**
     * 📧 PASO 1: Suscripción inicial
     * Crea registro en estado "pending" y envía email de confirmación
     */
    async subscribe(ctx) {
      try {
        const { email, name } = ctx.request.body;
        
        // 🌍 Detectar idioma del usuario
        const locale = detectLocale(ctx);

        // ============================================
        // 1. VALIDACIONES
        // ============================================
        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
          return ctx.badRequest('El nombre es obligatorio');
        }

        const trimmedName = name.trim();

        // Validar longitud del nombre (mínimo 2, máximo 30 caracteres)
        if (trimmedName.length < 2) {
          return ctx.badRequest('El nombre debe tener al menos 2 caracteres');
        }

        if (trimmedName.length > 30) {
          return ctx.badRequest('El nombre no puede exceder 30 caracteres');
        }

        // Validar que solo contenga letras, espacios, guiones y apóstrofes
        const nameRegex = /^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s'-]+$/;
        if (!nameRegex.test(trimmedName)) {
          return ctx.badRequest('El nombre solo puede contener letras, espacios, guiones y apóstrofes');
        }

        // Evitar nombres con números
        if (/\d/.test(trimmedName)) {
          return ctx.badRequest('El nombre no puede contener números');
        }

        // Evitar múltiples espacios consecutivos
        if (/\s{2,}/.test(trimmedName)) {
          return ctx.badRequest('El nombre no puede contener espacios múltiples consecutivos');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return ctx.badRequest('El formato del email no es válido');
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedName = trimmedName;

        strapi.log.info(`\n=== NUEVA SUSCRIPCIÓN ===`);
        strapi.log.info(`Email: ${normalizedEmail}`);
        strapi.log.info(`Name: ${normalizedName}`);
        strapi.log.info(`Locale: ${locale}`);

        // ============================================
        // 2. VERIFICAR SI YA EXISTE
        // ============================================
        const existingSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (existingSubscriber) {
          strapi.log.info(`⚠️  Email ya existe - Estado: ${existingSubscriber.estado}`);

          // Si ya está activo
          if (existingSubscriber.estado === 'activo') {
            return ctx.badRequest('Este email ya está suscrito al newsletter');
          }

          // Si está pending, regenerar token y reenviar
          if (existingSubscriber.estado === 'pending') {
            strapi.log.info('🔄 Regenerando token y reenviando email...');

            const token = generateToken();
            const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

            // Actualizar token Y locale
            await strapi.db
              .query('api::newsletter-subscriber.newsletter-subscriber')
              .update({
                where: { id: existingSubscriber.id },
                data: {
                  confirmationToken: token,
                  tokenExpiration: tokenExpiry,
                  name: normalizedName,
                  locale: locale, // 🌍 Guardar idioma preferido
                },
              });

            // Reenviar email EN EL IDIOMA DEL USUARIO
            const emailService = strapi.service('api::newsletter-subscriber.email');
            const emailResult = await emailService.sendConfirmationEmail(
              normalizedEmail,
              normalizedName,
              token,
              locale // 🌍 Pasar locale al servicio
            );

            if (!emailResult.success) {
              return ctx.internalServerError('Error al enviar el email de confirmación');
            }

            return ctx.send({
              success: true,
              code: 'PENDING_CONFIRMATION',
              data: {
                email: normalizedEmail,
                estado: 'pending',
                locale: locale,
                pendingConfirmation: true,
              },
            });
          }

          // Si está inactivo, reactivar
          if (existingSubscriber.estado === 'inactivo') {
            const token = generateToken();
            const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

            await strapi.db
              .query('api::newsletter-subscriber.newsletter-subscriber')
              .update({
                where: { id: existingSubscriber.id },
                data: {
                  estado: 'pending',
                  confirmationToken: token,
                  tokenExpiration: tokenExpiry,
                  unsubscribedAt: null,
                  name: normalizedName,
                  locale: locale, // 🌍 Actualizar idioma
                },
              });

            const emailService = strapi.service('api::newsletter-subscriber.email');
            await emailService.sendConfirmationEmail(
              normalizedEmail, 
              normalizedName, 
              token,
              locale // 🌍 Pasar locale
            );

            return ctx.send({
              success: true,
              code: 'REACTIVATED',
              data: { 
                email: normalizedEmail, 
                estado: 'pending',
                locale: locale,
                reactivated: true,
              },
            });
          }
        }

        // ============================================
        // 3. CREAR NUEVO SUSCRIPTOR
        // ============================================
        const token = generateToken();
        const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .create({
            data: {
              email: normalizedEmail,
              name: normalizedName,
              estado: 'pending',
              locale: locale, // 🌍 Guardar idioma preferido
              confirmationToken: token,
              tokenExpiration: tokenExpiry,
              publishedAt: new Date(),
            },
          });

        strapi.log.info(`✅ Suscriptor creado - ID: ${subscriber.id}, Locale: ${locale}`);

        // ============================================
        // 4. ENVIAR EMAIL DE CONFIRMACIÓN
        // ============================================
        const emailService = strapi.service('api::newsletter-subscriber.email');
        const emailResult = await emailService.sendConfirmationEmail(
          normalizedEmail,
          normalizedName,
          token,
          locale // 🌍 Pasar locale al servicio
        );

        if (!emailResult.success) {
          strapi.log.error('❌ Error al enviar email');
          return ctx.internalServerError('Error al enviar el email de confirmación');
        }

        strapi.log.info(`✅ Email de confirmación enviado en ${locale}`);

        return ctx.send(
          {
            success: true,
            code: 'SUBSCRIPTION_CREATED',
            data: {
              email: normalizedEmail,
              estado: 'pending',
              locale: locale,
            },
          },
          201
        );
      } catch (error) {
        strapi.log.error('❌ Error en suscripción:', error);
        return ctx.internalServerError('Error al procesar la suscripción');
      }
    },

    /**
     * ✅ PASO 2: Confirmar suscripción
     * Cambia estado a "activo" y envía email de bienvenida
     */
    async confirm(ctx) {
      try {
        const token = ctx.query.token || ctx.request.body?.token;
        const email = ctx.query.email || ctx.request.body?.email;

        strapi.log.info(`\n=== CONFIRMACIÓN DE SUSCRIPCIÓN ===`);
        strapi.log.info(`Token recibido: ${token?.substring(0, 10)}...`);
        strapi.log.info(`Email recibido: ${email}`);

        if (!token || typeof token !== 'string') {
          return ctx.badRequest('Token de confirmación inválido');
        }

        if (!email || typeof email !== 'string') {
          return ctx.badRequest('Email es requerido para confirmar la suscripción');
        }

        const normalizedEmail = email.toLowerCase().trim();

        // ============================================
        // 1. BUSCAR SUSCRIPTOR
        // ============================================
        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: {
              confirmationToken: token,
              email: normalizedEmail,
            },
          });

        if (!subscriber) {
          strapi.log.warn(`❌ Token o email no encontrado. Email: ${normalizedEmail}`);
          return ctx.notFound('Token de confirmación inválido o email no coincide');
        }

        strapi.log.info(`✅ Suscriptor encontrado: ${subscriber.email}`);

        // ============================================
        // 2. VERIFICAR SI YA ESTÁ CONFIRMADO
        // ============================================
        if (subscriber.estado === 'activo') {
          strapi.log.info('⚠️  Ya estaba confirmado');
          return ctx.send({
            success: true,
            code: 'ALREADY_CONFIRMED',
            data: {
              email: subscriber.email,
              estado: 'activo',
              locale: subscriber.locale || 'es',
              alreadyConfirmed: true,
            },
          });
        }

        // ============================================
        // 3. VERIFICAR EXPIRACIÓN DEL TOKEN
        // ============================================
        const now = new Date();
        const tokenExpiry = new Date(subscriber.tokenExpiration);

        if (now > tokenExpiry) {
          strapi.log.warn('❌ Token expirado');
          return ctx.gone({
            error: 'El enlace de confirmación ha expirado. Solicita un nuevo email de confirmación.',
            code: 'TOKEN_EXPIRED',
          });
        }

        // ============================================
        // 4. ACTIVAR SUSCRIPCIÓN
        // ============================================
        const updatedSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: {
              estado: 'activo',
              confirmedAt: now,
              confirmationToken: null,
              tokenExpiration: null,
            },
          });

        strapi.log.info(`✅ Suscripción activada: ${updatedSubscriber.email}`);

        // ============================================
        // 5. ENVIAR EMAIL DE BIENVENIDA EN SU IDIOMA
        // ============================================
        const userLocale = subscriber.locale || 'es'; // Usar locale guardado
        const emailService = strapi.service('api::newsletter-subscriber.email');
        await emailService.sendWelcomeEmail(
          updatedSubscriber.email,
          updatedSubscriber.name || '',
          userLocale // 🌍 Pasar locale
        );

        strapi.log.info(`✅ Email de bienvenida enviado en ${userLocale}`);

        return ctx.send({
          success: true,
          code: 'CONFIRMED',
          data: {
            email: updatedSubscriber.email,
            estado: 'activo',
            locale: userLocale,
            confirmedAt: updatedSubscriber.confirmedAt,
          },
        });
      } catch (error) {
        strapi.log.error('❌ Error en confirmación:', error);
        return ctx.internalServerError('Error al confirmar la suscripción');
      }
    },

    /**
     * 🚫 Cancelar suscripción
     */
    async unsubscribe(ctx) {
      try {
        const { email } = ctx.request.body;

        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        const normalizedEmail = email.toLowerCase().trim();

        strapi.log.info(`\n=== BAJA DE SUSCRIPCIÓN ===`);
        strapi.log.info(`Email: ${normalizedEmail}`);

        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (!subscriber) {
          return ctx.notFound('Email no encontrado en nuestra base de datos');
        }

        if (subscriber.estado === 'inactivo') {
          return ctx.send({
            success: true,
            code: 'ALREADY_UNSUBSCRIBED',
            data: {
              locale: subscriber.locale || 'es',
            },
          });
        }

        await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: {
              estado: 'inactivo',
              unsubscribedAt: new Date(),
            },
          });

        strapi.log.info(`✅ Baja procesada: ${normalizedEmail}`);

        // Enviar email de confirmación de baja EN SU IDIOMA
        const userLocale = subscriber.locale || 'es';
        const emailService = strapi.service('api::newsletter-subscriber.email');
        await emailService.sendUnsubscribeEmail(
          normalizedEmail, 
          subscriber.name || '',
          userLocale // 🌍 Pasar locale
        );

        strapi.log.info(`✅ Email de baja enviado en ${userLocale}`);

        return ctx.send({
          success: true,
          code: 'UNSUBSCRIBED',
          data: {
            locale: userLocale,
          },
        });
      } catch (error) {
        strapi.log.error('❌ Error en baja:', error);
        return ctx.internalServerError('Error al procesar la baja');
      }
    },

    /**
     * 📊 Estadísticas
     */
    async stats(ctx) {
      try {
        const total = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count();

        const activos = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'activo' } });

        const pendientes = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'pending' } });

        const inactivos = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'inactivo' } });

        // 🌍 Estadísticas por idioma
        const porLocale = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findMany({
            select: ['locale'],
            where: { estado: 'activo' },
          });

        const localeStats = porLocale.reduce((acc, sub) => {
          const userLocale = sub.locale || 'es';
          acc[userLocale] = (acc[userLocale] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return ctx.send({
          success: true,
          data: {
            total,
            activos,
            pendientes,
            inactivos,
            tasaConfirmacion: total > 0 ? ((activos / total) * 100).toFixed(2) + '%' : '0%',
            porIdioma: localeStats, // 🌍 Nuevas estadísticas
          },
        });
      } catch (error) {
        strapi.log.error('Error obteniendo estadísticas:', error);
        return ctx.internalServerError('Error al obtener estadísticas');
      }
    },
  })
);