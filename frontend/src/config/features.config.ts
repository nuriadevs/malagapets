// src/config/features.config.ts
/**
 * Configuración de características
 * @module config/features
 */

import { 
  ANALYTICS_ENABLED, 
  GOOGLE_ANALYTICS_ID, 
  MAPS_CONFIG,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES 
} from './constants';

export const FEATURES_CONFIG = {
  analytics: {
    enabled: ANALYTICS_ENABLED,
    googleAnalytics: {
      id: GOOGLE_ANALYTICS_ID
    }
  },

  maps: MAPS_CONFIG,

  blog: {
    postsPerPage: 6,
    featuredPostsLimit: 3,
    showAuthorCards: true
  },

  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES,
    showLanguageSwitcher: true
  },

  ui: {
    theme: {
      darkMode: true,
      allowUserTheme: true
    },
    accessibility: {
      fontSize: {
        min: 14,
        max: 20,
        default: 16
      }
    }
  }
} as const;
