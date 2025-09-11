/* eslint-disable react/no-unescaped-entities */
// components/CookieBanner.tsx
"use client";

import React, { useState } from "react";
import { useCookieConsent, CookiePreferences } from "../hooks/useCookieConsent";

const CookieBanner: React.FC = () => {
  const { showBanner, preferences, acceptAll, rejectAll, savePreferences } =
    useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [tempPreferences, setTempPreferences] =
    useState<CookiePreferences>(preferences);

  if (!showBanner) return null;

  const handlePreferenceChange = (
    category: keyof CookiePreferences,
    value: boolean
  ) => {
    if (category === "essential") return; // Essential cookies can't be disabled
    setTempPreferences((prev) => ({ ...prev, [category]: value }));
  };

  const handleSavePreferences = () => {
    savePreferences(tempPreferences);
    setShowPreferences(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-6xl mx-auto">
        {!showPreferences ? (
          // Main banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We use cookies
              </h3>
              <p className="text-gray-600 text-sm">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                "Accept All", you consent to our use of cookies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Preferences
              </button>
              <button
                onClick={rejectAll}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Reject All
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Preferences panel
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Essential Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Required for the website to function properly
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="h-4 w-4 text-blue-600"
                />
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our website
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={tempPreferences.analytics}
                  onChange={(e) =>
                    handlePreferenceChange("analytics", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600"
                />
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Used to deliver personalized advertisements
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={tempPreferences.marketing}
                  onChange={(e) =>
                    handlePreferenceChange("marketing", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600"
                />
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Functional Cookies
                  </h4>
                  <p className="text-sm text-gray-600">
                    Enable enhanced functionality and personalization
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={tempPreferences.functional}
                  onChange={(e) =>
                    handlePreferenceChange("functional", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
