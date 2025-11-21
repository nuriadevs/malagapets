// src/api/newsletter-subscriber/services/email.ts
/*
import { Resend } from 'resend';
import { render } from '@react-email/components';
import WelcomeEmail from '../../../emails/welcome-email';
import ConfirmationEmail from '../../../emails/confirmation-email';
import UnsubscribeEmail from '../../../emails/unsubscribe-email';

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔧 Helper para manejar emails en desarrollo
const getRecipientEmail = (email: string): string => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const testEmail = process.env.CONTACT_EMAIL || 'nuriavazblog@gmail.com';
  
  if (isDevelopment) {
    strapi.log.warn(`🧪 MODO DESARROLLO: Email redirigido de ${email} → ${testEmail}`);
    return testEmail;
  }
  
  return email;
};

export default () => ({
  /**
   * 📧 Email de confirmación
   
  async sendConfirmationEmail(email: string, name: string, token: string) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const locale = process.env.FRONTEND_LOCALE || 'es';
      
      const confirmationUrl = `${frontendUrl}/${locale}/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`;
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de confirmación a: ${recipientEmail}`);
      strapi.log.info(`🔗 URL de confirmación: ${confirmationUrl}`);

      const htmlContent = await render(
        ConfirmationEmail({ 
          name,
          email,
          confirmationUrl,
        })
      );

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'MálagaPets <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: '¡Confirma tu suscripción a MálagaPets! 🐾',
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendConfirmationEmail:', error);
      return { success: false, error };
    }
  },

  /**
   * 🎉 Email de bienvenida
   
  async sendWelcomeEmail(email: string, name: string) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const locale = process.env.FRONTEND_LOCALE || 'es';
      const unsubscribeUrl = `${frontendUrl}/${locale}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de bienvenida a: ${recipientEmail}`);

      const htmlContent = await render(
        WelcomeEmail({ 
          name,
          email,
          frontendUrl,
          unsubscribeUrl,
        })
      );

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'MálagaPets <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: '¡Bienvenido a MálagaPets! 🐾',
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email de bienvenida:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email de bienvenida enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendWelcomeEmail:', error);
      return { success: false, error };
    }
  },

  /**
   * 👋 Email de baja
   
  async sendUnsubscribeEmail(email: string, name: string) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de baja a: ${recipientEmail}`);

      const htmlContent = await render(
        UnsubscribeEmail({ 
          name,
          email,
          frontendUrl,
        })
      );

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'MálagaPets <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: 'Confirmación de baja - MálagaPets',
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email de baja:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email de baja enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendUnsubscribeEmail:', error);
      return { success: false, error };
    }
  },
});
*/





// src/api/newsletter-subscriber/services/email.ts

import { Resend } from 'resend';
import { render } from '@react-email/components';
import WelcomeEmail from '../../../emails/templates/welcome-email';
import ConfirmationEmail from '../../../emails/templates/confirmation-email';
import UnsubscribeEmail from '../../../emails/templates/unsubscribe-email';
import { getEmailSubject } from '../../../emails/utils/i18n';

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔧 Helper para manejar emails en desarrollo
const getRecipientEmail = (email: string): string => {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const testEmail = process.env.CONTACT_EMAIL || 'holamalagapets@gmail.com';
  
  if (isDevelopment) {
    strapi.log.warn(`🧪 MODO DESARROLLO: Email redirigido de ${email} → ${testEmail}`);
    return testEmail;
  }
  
  return email;
};

// 🌍 Helper para obtener el locale desde diferentes fuentes
const getEmailLocale = (explicitLocale?: string): string => {
  if (explicitLocale) return explicitLocale;
  
  // Intentar obtener desde variable de entorno
  const envLocale = process.env.FRONTEND_LOCALE || process.env.DEFAULT_LOCALE;
  if (envLocale) return envLocale;
  
  // Default a español
  return 'es';
};

// 🎨 Helper para obtener el remitente según el idioma
const getFromEmail = (locale: string): string => {
  const baseEmail = process.env.RESEND_FROM_EMAIL || 'MálagaPets <onboarding@resend.dev>';
  
  // Puedes personalizar el nombre del remitente según el idioma si lo deseas
  const senderNames: Record<string, string> = {
    es: 'MálagaPets',
    en: 'MálagaPets',
    de: 'MálagaPets',
    fr: 'MálagaPets',
  };
  
  const senderName = senderNames[locale] || senderNames.es;
  
  // Si el email base ya tiene formato "Nombre <email>", extraer solo el email
  const emailMatch = baseEmail.match(/<(.+)>/);
  const emailAddress = emailMatch ? emailMatch[1] : baseEmail;
  
  return `${senderName} <${emailAddress}>`;
};

export default () => ({
  /**
   * 📧 Email de confirmación (multiidioma)
   */
  async sendConfirmationEmail(
    email: string, 
    name: string, 
    token: string, 
    locale?: string
  ) {
    try {
      const emailLocale = getEmailLocale(locale);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      
      const confirmationUrl = `${frontendUrl}/${emailLocale}/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`;
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de confirmación a: ${recipientEmail} (idioma: ${emailLocale})`);
      strapi.log.info(`🔗 URL de confirmación: ${confirmationUrl}`);

      const htmlContent = await render(
        ConfirmationEmail({ 
          name,
          email,
          confirmationUrl,
          locale: emailLocale,
        })
      );

      const subject = getEmailSubject('confirmation', emailLocale);

      const { data, error } = await resend.emails.send({
        from: getFromEmail(emailLocale),
        to: [recipientEmail],
        subject,
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendConfirmationEmail:', error);
      return { success: false, error };
    }
  },

  /**
   * 🎉 Email de bienvenida (multiidioma)
   */
  async sendWelcomeEmail(email: string, name: string, locale?: string) {
    try {
      const emailLocale = getEmailLocale(locale);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const unsubscribeUrl = `${frontendUrl}/${emailLocale}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`;
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de bienvenida a: ${recipientEmail} (idioma: ${emailLocale})`);

      const htmlContent = await render(
        WelcomeEmail({ 
          name,
          email,
          frontendUrl,
          unsubscribeUrl,
          locale: emailLocale,
        })
      );

      const subject = getEmailSubject('welcome', emailLocale);

      const { data, error } = await resend.emails.send({
        from: getFromEmail(emailLocale),
        to: [recipientEmail],
        subject,
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email de bienvenida:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email de bienvenida enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendWelcomeEmail:', error);
      return { success: false, error };
    }
  },

  /**
   * 👋 Email de baja (multiidioma)
   */
  async sendUnsubscribeEmail(email: string, name: string, locale?: string) {
    try {
      const emailLocale = getEmailLocale(locale);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const recipientEmail = getRecipientEmail(email);

      strapi.log.info(`📧 Enviando email de baja a: ${recipientEmail} (idioma: ${emailLocale})`);

      const htmlContent = await render(
        UnsubscribeEmail({ 
          name,
          email,
          frontendUrl,
          locale: emailLocale,
        })
      );

      const subject = getEmailSubject('unsubscribe', emailLocale);

      const { data, error } = await resend.emails.send({
        from: getFromEmail(emailLocale),
        to: [recipientEmail],
        subject,
        html: htmlContent,
      });

      if (error) {
        strapi.log.error('❌ Error enviando email de baja:', error);
        return { success: false, error };
      }

      strapi.log.info(`✅ Email de baja enviado - ID: ${data?.id}`);
      return { success: true, data };
    } catch (error) {
      strapi.log.error('❌ Error en sendUnsubscribeEmail:', error);
      return { success: false, error };
    }
  },
});