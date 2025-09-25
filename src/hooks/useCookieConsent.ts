// // hooks/useCookieConsent.ts
import { useState, useEffect } from "react";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always true, can't be disabled
  analytics: false,
  marketing: false,
  functional: false,
};

export const useCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Check if user has already made a choice
    const savedPreferences = localStorage.getItem("cookiePreferences");
    const consentGiven = localStorage.getItem("cookieConsentGiven");

    if (!consentGiven) {
      setShowBanner(true); // user never decided
    } else if (savedPreferences) {
      // setPreferences(JSON.parse(savedPreferences));
      // setShowBanner(false); // already chosen
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  //   if (consentGiven === "true" && savedPreferences) {
  //     setPreferences(JSON.parse(savedPreferences));
  //     setShowBanner(false); // hide banner if consent already given
  //   } else {
  //     setShowBanner(true); // show banner if no consent
  //   }
  // }, []);

  const acceptAll = () => {
    localStorage.setItem("Rahul", "true");
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };

    setPreferences(allAccepted);
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    localStorage.setItem("cookieConsentGiven", "true");
    setShowBanner(false);

    // Initialize accepted services
    initializeServices(allAccepted);
  };

  const rejectAll = () => {
    setPreferences(defaultPreferences);
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(defaultPreferences)
    );
    localStorage.setItem("cookieConsentGiven", "true");
    setShowBanner(false);
  };

  const savePreferences = (newPreferences: CookiePreferences) => {
    const updatedPreferences = { ...newPreferences, essential: true };
    setPreferences(updatedPreferences);
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(updatedPreferences)
    );
    localStorage.setItem("cookieConsentGiven", "true");
    setShowBanner(false);

    // Initialize accepted services
    initializeServices(updatedPreferences);
  };

  const resetConsent = () => {
    localStorage.removeItem("cookiePreferences");
    localStorage.removeItem("cookieConsentGiven");
    setPreferences(defaultPreferences);
    setShowBanner(true);
  };

  return {
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    resetConsent,
  };
};

// Helper function to initialize third-party services based on preferences
const initializeServices = (preferences: CookiePreferences) => {
  if (preferences.analytics) {
    // Initialize Google Analytics
    console.log("Initializing analytics...");
    // gtag('config', 'GA_MEASUREMENT_ID');
  }

  if (preferences.marketing) {
    // Initialize marketing pixels
    console.log("Initializing marketing cookies...");
  }

  if (preferences.functional) {
    // Initialize functional cookies
    console.log("Initializing functional cookies...");
  }
};
