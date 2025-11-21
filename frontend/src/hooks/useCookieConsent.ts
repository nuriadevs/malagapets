import { useState, useEffect, useCallback } from "react";
import { 
  CookiePreferences, 
  cookieUtils, 
  applyCookiePreferences,
  dispatchCookieEvent,
  resetCookiePreferences as resetPrefs
} from "@/utils/cookieUtils";

/**
 * Custom hook for managing cookie consent.
 */
export const useCookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Verify support and existence of saved preferences
    if (typeof window !== "undefined") {
      try {
        // Try to get preferences from localStorage first
        const localStoragePrefs = localStorage.getItem('cookiePreferences');

        // If not in localStorage, check cookies
        const cookiePrefs = cookieUtils.get('cookiePreferences');
        
        if (localStoragePrefs) {
          const storedPrefs = JSON.parse(localStoragePrefs);
          setPrefs(storedPrefs);
          // Synchronize with cookies if they don't exist
          if (!cookiePrefs) {
            cookieUtils.set('cookiePreferences', localStoragePrefs);
          }
        } else if (cookiePrefs) {
          const storedPrefs = JSON.parse(cookiePrefs);
          setPrefs(storedPrefs);
          // Synchronize with localStorage
          localStorage.setItem('cookiePreferences', cookiePrefs);
        } else {
          // No preferences found, show banner
          setVisible(true);
        }
      } catch (error) {
        console.error("Error loading cookie preferences:", error);
        // If there's an error, show the banner for safety
        setVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (showConfig && visible) {
      const firstButton = document.querySelector(
        "[data-cookie-save]"
      ) as HTMLButtonElement;
      firstButton?.focus();
    }
  }, [showConfig, visible]);

  const savePreferences = (newPrefs: CookiePreferences) => {
    try {
      console.log("Saving preferences:", newPrefs);

      // Save to localStorage
      localStorage.setItem('cookiePreferences', JSON.stringify(newPrefs));

      // Save to cookies (for server-side compatibility)
      cookieUtils.set('cookiePreferences', JSON.stringify(newPrefs));

      // Save timestamp of when they were accepted
      const timestamp = new Date().toISOString();
      localStorage.setItem('cookieConsentDate', timestamp);
      cookieUtils.set('cookieConsentDate', timestamp);

      // Apply cookie preferences
      applyCookiePreferences(newPrefs);

      // Dispatch custom event
      dispatchCookieEvent(newPrefs, timestamp);

      // Update local state
      setPrefs(newPrefs);
      setVisible(false);
      setShowConfig(false);

    } catch (error) {
      console.error("Error saving cookie preferences:", error);
      // Show some kind of error to the user
      alert("Error saving cookie preferences. Please try again.");
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const rejectOptional = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const saveConfig = () => {
    savePreferences(prefs);
  };

  // Function for resetting preferences with useCallback to stabilize the reference
  const resetPreferences = useCallback(() => {
    resetPrefs();
    setPrefs({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
    setVisible(true);
    setShowConfig(false);
  }, []); 

  // Change 'any' to specific type
  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === 'development') {
      // Define specific type for window instead of 'any'
      interface WindowWithDebugger extends Window {
        resetCookiePreferences?: () => void;
      }
      
      (window as WindowWithDebugger).resetCookiePreferences = resetPreferences;
      console.log("🍪 Cookie debugging: Use resetCookiePreferences() in console to reset");
    }
  }, [resetPreferences]);

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return {
    visible,
    showConfig,
    prefs,
    setShowConfig,
    setPrefs,
    acceptAll,
    rejectOptional,
    saveConfig,
    handleKeyDown
  };
};