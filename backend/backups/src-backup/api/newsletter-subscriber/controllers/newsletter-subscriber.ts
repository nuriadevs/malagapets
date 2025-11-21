// src/api/newsletter-subscriber/controllers/newsletter-subscriber.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::newsletter-subscriber.newsletter-subscriber',
  ({ strapi }) => ({
    /**
     * PASO 1: Suscripción inicial (crea registro en pending)
     */
    async subscribe(ctx) {
      try {
        const body = ctx.request.body as { email?: string; name?: string };
        const { email, name } = body;

        // Validaciones
        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return ctx.badRequest('El formato del email no es válido');
        }

        const normalizedEmail = email.toLowerCase().trim();

        strapi.log.info(`📧 Nueva solicitud de suscripción: ${normalizedEmail}`);

        // Verificar si ya existe
        const existingSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (existingSubscriber) {
          if (existingSubscriber.estado === 'subscribed') {
            return ctx.badRequest('Este email ya está suscrito a la newsletter');
          }
          
          if (existingSubscriber.estado === 'pending') {
            // Reenviar email de confirmación
            strapi.log.info('🔄 Reenviando email de confirmación...');
            const emailService = strapi.service('api::newsletter-subscriber.email');
            await emailService.sendConfirmationEmail(
              normalizedEmail,
              existingSubscriber.name || name,
              existingSubscriber.id
            );
            
            return ctx.send({
              message: 'Te hemos reenviado el email de confirmación. Revisa tu bandeja de entrada.',
              data: {
                id: existingSubscriber.id,
                email: existingSubscriber.email,
                estado: 'pending',
              },
            });
          }
        }

        // Crear nuevo suscriptor en estado pending
        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .create({
            data: {
              email: normalizedEmail,
              name: name?.trim() || null,
              estado: 'pending',
              publishedAt: new Date(), // Publicar inmediatamente
            },
          });

        strapi.log.info(`✅ Suscriptor creado (pending): ${subscriber.id}`);

        // Enviar email de confirmación
        const emailService = strapi.service('api::newsletter-subscriber.email');
        const emailResult = await emailService.sendConfirmationEmail(
          normalizedEmail,
          name || '',
          subscriber.id
        );

        if (!emailResult.success) {
          strapi.log.error('❌ Error al enviar email de confirmación');
          // Nota: No eliminamos el registro, el usuario puede intentar de nuevo
        }

        return ctx.send({
          message: '¡Gracias! Te hemos enviado un email de confirmación. Revisa tu bandeja de entrada.',
          data: {
            id: subscriber.id,
            email: subscriber.email,
            estado: subscriber.estado,
          },
        }, 201);

      } catch (error) {
        strapi.log.error('❌ Error en suscripción:', error);
        return ctx.internalServerError('Error al procesar la suscripción');
      }
    },

    /**
     * PASO 2: Confirmar suscripción (cambia a subscribed y envía bienvenida)
     */
    async confirm(ctx) {
      try {
        const query = ctx.query as { id?: string; email?: string };
        const { id, email } = query;

        if (!id || !email || typeof email !== 'string') {
          return ctx.badRequest('Parámetros inválidos');
        }

        const normalizedEmail = email.toLowerCase().trim();

        strapi.log.info(`🔍 Confirmando suscripción: ID=${id}, Email=${normalizedEmail}`);

        // Buscar suscriptor
        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: {
              id: parseInt(id),
              email: normalizedEmail,
            },
          });

        if (!subscriber) {
          return ctx.notFound('Suscripción no encontrada');
        }

        if (subscriber.estado === 'subscribed') {
          return ctx.send({
            message: 'Tu suscripción ya estaba confirmada',
            data: {
              email: subscriber.email,
              estado: 'subscribed',
            },
          });
        }

        // Actualizar a subscribed
        const updatedSubscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: {
              estado: 'subscribed',
              subscribedAt: new Date(),
            },
          });

        strapi.log.info(`✅ Suscripción confirmada: ${updatedSubscriber.email}`);

        // Enviar email de bienvenida
        const emailService = strapi.service('api::newsletter-subscriber.email');
        await emailService.sendWelcomeEmail(
          updatedSubscriber.email,
          updatedSubscriber.name || ''
        );

        return ctx.send({
          message: '¡Suscripción confirmada! Te hemos enviado un email de bienvenida.',
          data: {
            email: updatedSubscriber.email,
            estado: updatedSubscriber.estado,
          },
        });

      } catch (error) {
        strapi.log.error('❌ Error confirmando suscripción:', error);
        return ctx.internalServerError('Error al confirmar la suscripción');
      }
    },

    /**
     * Cancelar suscripción
     */
    async unsubscribe(ctx) {
      try {
        const body = ctx.request.body as { email?: string };
        const { email } = body;

        if (!email || typeof email !== 'string') {
          return ctx.badRequest('El email es obligatorio');
        }

        const normalizedEmail = email.toLowerCase().trim();

        const subscriber = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .findOne({
            where: { email: normalizedEmail },
          });

        if (!subscriber) {
          return ctx.notFound('Email no encontrado');
        }

        await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .update({
            where: { id: subscriber.id },
            data: { estado: 'unsubscribed' },
          });

        strapi.log.info(`📧 Usuario dado de baja: ${normalizedEmail}`);

        return ctx.send({
          message: 'Te has dado de baja correctamente. Lamentamos verte partir.',
        });

      } catch (error) {
        strapi.log.error('Error al cancelar suscripción:', error);
        return ctx.internalServerError('Error al procesar la cancelación');
      }
    },

    /**
     * Estadísticas
     */
    async stats(ctx) {
      try {
        const total = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count();

        const subscribed = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'subscribed' } });

        const pending = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'pending' } });

        const unsubscribed = await strapi.db
          .query('api::newsletter-subscriber.newsletter-subscriber')
          .count({ where: { estado: 'unsubscribed' } });

        return ctx.send({
          data: {
            total,
            subscribed,
            pending,
            unsubscribed,
          },
        });
      } catch (error) {
        strapi.log.error('Error obteniendo estadísticas:', error);
        return ctx.internalServerError('Error al obtener estadísticas');
      }
    },
  })
);