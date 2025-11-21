// src/api/newsletter-subscriber/services/email.ts
import { Resend } from 'resend';
import { render } from '@react-email/components';
import WelcomeEmail from '../../../emails/welcome-email';
import ConfirmationEmail from '../../../emails/confirmation-email';
import UnsubscribeEmail from '../../../emails/unsubscribe-email';

const resend = new Resend(process.env.RESEND_API_KEY);

// 🎯 Configuración centralizada de emails
const EMAIL_CONFIG = {
  from: 'MálagaPets <noreply@malagapets.com>', // ✅ Tu dominio verificado
  replyTo: 'holamalagapets@gmail.com', // ✅ Email real para respuestas
  frontendUrl: process.env.FRONTEND_URL || 'https://www.malagapets.com',
};

export default {
  /**
   * Enviar email de bienvenida después de confirmar suscripción
   */
  async sendWelcomeEmail(email: string, name: string) {
    try {
      console.log('📧 Enviando email de bienvenida a:', email);

      const htmlContent = await render(
        WelcomeEmail({ 
          name,
          email,
          frontendUrl: EMAIL_CONFIG.frontendUrl
        })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [email],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: '¡Bienvenido a MálagaPets! 🐾',
        html: htmlContent,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        throw new Error(`Error sending email: ${error.message}`);
      }

      console.log('✅ Email de bienvenida enviado a:', email);
      return data;

    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
      throw error;
    }
  },

  /**
   * Enviar email de confirmación (doble opt-in)
   */
  async sendConfirmationEmail(email: string, name: string, subscriberId: number) {
    try {
      console.log('📧 Enviando email de confirmación a:', email);

      // Construir URL de confirmación
      const confirmationUrl = `${EMAIL_CONFIG.frontendUrl}/api/newsletter/confirm?id=${subscriberId}&email=${encodeURIComponent(email)}`;
      
      const htmlContent = await render(
        ConfirmationEmail({ 
          confirmationUrl,
          email
        })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [email],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: 'Confirma tu suscripción a MálagaPets 🐾',
        html: htmlContent,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        throw new Error(`Error sending email: ${error.message}`);
      }

      console.log('✅ Email de confirmación enviado a:', email);
      return data;

    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      throw error;
    }
  },

  /**
   * Enviar email de confirmación de baja
   */
  async sendUnsubscribeEmail(email: string, name: string) {
    try {
      console.log('📧 Enviando email de baja a:', email);

      const htmlContent = await render(
        UnsubscribeEmail({ 
          name: name || 'Amigo',
          email,
          frontendUrl: EMAIL_CONFIG.frontendUrl
        })
      );

      const { data, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [email],
        replyTo: EMAIL_CONFIG.replyTo,
        subject: 'Confirmación de baja de MálagaPets',
        html: htmlContent,
      });

      if (error) {
        console.error('❌ Resend error:', error);
        throw new Error(`Error sending email: ${error.message}`);
      }

      console.log('✅ Email de baja enviado a:', email);
      return data;

    } catch (error) {
      console.error('❌ Error sending unsubscribe email:', error);
      throw error;
    }
  },

  /**
   * Verificar configuración de Resend
   */
  async testConfiguration() {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_CONFIG.from,
        to: [EMAIL_CONFIG.replyTo], // Enviar a ti mismo
        subject: 'Test de configuración MálagaPets',
        html: '<p>Si recibes este email, tu configuración de Resend funciona correctamente ✅</p>',
      });

      if (error) {
        console.error('❌ Test failed:', error);
        return { success: false, error };
      }

      console.log('✅ Test email sent successfully');
      return { success: true, data };

    } catch (error) {
      console.error('❌ Test error:', error);
      return { success: false, error };
    }
  }
};