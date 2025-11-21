import { getRequestConfig } from 'next-intl/server';
import { routing, Locale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validar locale
  if (!locale || !routing.locales.includes(locale as Locale)) {
    console.warn('⚠️ Invalid locale, using default:', routing.defaultLocale);
    locale = routing.defaultLocale;
  }

  console.log('✅ Loading messages for locale:', locale);

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    
    return {
      locale,
      messages,
      timeZone: 'Europe/Madrid',
      now: new Date(),
    };
  } catch (error) {
    console.error(`❌ Error loading messages for ${locale}:`, error);
    
    // Fallback
    const fallbackMessages = (await import(`../messages/${routing.defaultLocale}.json`)).default;
    return {
      locale: routing.defaultLocale,
      messages: fallbackMessages,
      timeZone: 'Europe/Madrid',
      now: new Date(),
    };
  }
});