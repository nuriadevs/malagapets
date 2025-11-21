/**
 * Preferences for cookies
 */
export type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

// Utility functions for managing cookies
export const cookieUtils = {
  set: (name: string, value: string, days: number = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  },

  get: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  delete: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

export const applyCookiePreferences = (newPrefs: CookiePreferences) => {
  // Apply/remove cookies based on preferences
  if (newPrefs.analytics) {
    // Enable Google Analytics, etc.
    cookieUtils.set('analytics_enabled', 'true');
  } else {
    // Disable and clear analytics cookies
    cookieUtils.delete('analytics_enabled');
    cookieUtils.delete('_ga');
    cookieUtils.delete('_ga_*');
    cookieUtils.delete('_gid');
  }

  if (newPrefs.marketing) {
    // Enable marketing cookies
    cookieUtils.set('marketing_enabled', 'true');
  } else {
    // Clear marketing cookies
    cookieUtils.delete('marketing_enabled');
    cookieUtils.delete('_fbp');
    cookieUtils.delete('_fbc');
  }

  if (newPrefs.functional) {
    // Enable functional cookies
    cookieUtils.set('functional_enabled', 'true');
  } else {
    // Clear functional cookies (except necessary ones)
    cookieUtils.delete('functional_enabled');
  }
};

export const dispatchCookieEvent = (preferences: CookiePreferences, timestamp: string) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cookiePreferencesUpdated", {
        detail: { 
          preferences,
          timestamp 
        },
      })
    );
  }
};

export const resetCookiePreferences = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem('cookiePreferences');
    localStorage.removeItem('cookieConsentDate');
    cookieUtils.delete('cookiePreferences');
    cookieUtils.delete('cookieConsentDate');
    cookieUtils.delete('analytics_enabled');
    cookieUtils.delete('marketing_enabled');
    cookieUtils.delete('functional_enabled');
  }
};