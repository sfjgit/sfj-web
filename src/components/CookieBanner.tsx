/* eslint-disable react/no-unescaped-entities */
// components/CookieBanner.tsx
"use client";

import React, { useState } from "react";
import { useCookieConsent, CookiePreferences } from "../hooks/useCookieConsent";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";

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
    localStorage.setItem("Rahul", "true");
    savePreferences(tempPreferences);
    setShowPreferences(false);
  };

  return (
    <>
      <Drawer open={showBanner && !showPreferences} modal={false}>
        <DrawerContent className="h-auto min-h-[120px] lg:h-[120px] mx-0 rounded-none border-t-2 border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3 lg:py-2">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <DrawerTitle asChild>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    We use cookies
                  </h3>
                </DrawerTitle>
                <p className="text-gray-600 text-sm">
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking
                  "Accept All", you consent to our use of cookies.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 min-w-fit w-full sm:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Preferences
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={showPreferences} onOpenChange={setShowPreferences}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cookie Preferences</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 space-y-4 mb-6">
            {/* Essential Cookies */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Essential Cookies</h4>
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
                <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
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
                <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
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

          <DrawerFooter>
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CookieBanner;
