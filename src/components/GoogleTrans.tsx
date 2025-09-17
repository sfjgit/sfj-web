/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useEffect } from "react";
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function GoogleTrans() {
  useEffect(() => {
    const addScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    addScript();

    // 🔥 Cleanup unwanted Google UI
    const hideGoogleTranslateUI = () => {
      const banner = document.querySelector(".goog-te-banner-frame");
      if (banner) banner.remove();

      const tooltip = document.querySelector("#goog-gt-tt");
      if (tooltip) tooltip.remove();

      document.body.style.top = "0px";
    };

    // Run immediately + keep checking
    hideGoogleTranslateUI();
    const interval = setInterval(hideGoogleTranslateUI, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    const select = document.querySelector(
      "#google_translate_element select"
    ) as HTMLSelectElement | null;

    if (select && lang) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  useEffect(() => {
    const removeGoogleBar = () => {
      const bannerFrame = document.querySelector(".goog-te-banner-frame");
      if (bannerFrame) bannerFrame.remove();

      const tooltip = document.querySelector("#goog-gt-tt");
      if (tooltip) tooltip.remove();

      // Reset any pushed body styles
      document.body.style.top = "0px";
    };

    const observer = new MutationObserver(() => removeGoogleBar());
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial cleanup
    removeGoogleBar();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="translate-wrapper ml-3">
      <div className="relative flex items-center">
        {/* <img
          src="https://www.google.com/images/branding/product/ico/googleg_lodp.ico"
          alt="Google"
          className="translate-logo"
        /> */}
        <select
          className="translate-select"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
          <option value="de">German</option>
          <option value="zh-CN">Chinese</option>
          <option value="ar">Arabic</option>
          <option value="ru">Russian</option>
          <option value="pt">Portuguese</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
        </select>
        <span className="absolute right-5 pointer-events-none text-gray-600 text-[10px] top-2.5">
          ▼
        </span>
      </div>
      <div id="google_translate_element" style={{ display: "none" }}></div>

      <style jsx>{`
        .goog-te-banner-frame {
          display: none !important;
        }
        .translate-wrapper {
          display: flex;
          align-items: center;
          height: 40px;
          background: transparent;
          border-radius: 8px;
          padding: 0 10px;
          box-shadow: none;
          width: auto;
          transition: all 0.3s ease;
        }
        .translate-wrapper:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .translate-logo {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }

        .translate-select {
          height: 32px;
          padding: 0 10px;
          font-size: 14px;
          border: none; /* no border */
          outline: none; /* no focus outline */
          background: transparent; /* transparent background */
          appearance: none;
          cursor: pointer;
          transition: color 0.3s ease;
          color: inherit; /* inherits text color from navbar */
        }
      `}</style>
    </div>
  );
}
