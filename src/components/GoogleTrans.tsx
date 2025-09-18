"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface Language {
  code: string;
  name: string;
  flag: string;
  short: string;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    googleTranslateElementInit: any;
  }
}

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flag: "https://flagcdn.com/us.svg",
    short: "EN",
  },
  {
    code: "ar",
    name: "العربية",
    flag: "https://flagcdn.com/ar.svg",
    short: "AR",
  },
  {
    code: "es",
    name: "Español",
    flag: "https://flagcdn.com/es.svg",
    short: "ES",
  },
  {
    code: "fr",
    name: "Français",
    flag: "https://flagcdn.com/fr.svg",
    short: "FR",
  },
  {
    code: "zh-CN",
    name: "中文",
    flag: "https://flagcdn.com/cn.svg",
    short: "CN",
  },
  {
    code: "ru",
    name: "Русский",
    flag: "https://flagcdn.com/ru.svg",
    short: "RU",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "https://flagcdn.com/de.svg",
    short: "DE",
  },
  {
    code: "hi",
    name: "हिन्दी",
    flag: "https://flagcdn.com/in.svg",
    short: "HI",
  },
  {
    code: "ja",
    name: "日本語",
    flag: "https://flagcdn.com/jp.svg",
    short: "JP",
  },
  {
    code: "pt",
    name: "Português",
    flag: "https://flagcdn.com/br.svg",
    short: "PT",
  },
];

const findLanguageByCode = (code: string): Language => {
  return languages.find((lang) => lang.code === code) || languages[0];
};

// Helper function to clear all Google Translate related data
const clearAllGoogleTranslateData = (): void => {
  try {
    // Clear all cookies (including Google Translate)
    const cookies = document.cookie.split(";");
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      // Clear for all possible paths and domains
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

    // Clear hash
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    // Clear session storage
    try {
      sessionStorage.clear();
    } catch (e) {
      console.warn("Could not clear sessionStorage:", e);
    }

    // Clear local storage
    try {
      localStorage.clear();
    } catch (e) {
      console.warn("Could not clear localStorage:", e);
    }

    // Remove any Google Translate elements
    const gtElements = document.querySelectorAll(
      '[id*="google"], [class*="goog"], [class*="gt-"], .skiptranslate'
    );
    gtElements.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    // Remove Google Translate scripts
    const scripts = document.querySelectorAll(
      'script[src*="translate"], script[src*="google"]'
    );
    scripts.forEach((script) => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    // Remove Google Translate styles
    const styles = document.querySelectorAll(
      'link[href*="translate"], style[id*="google"]'
    );
    styles.forEach((style) => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    });

    // Reset any translate attributes on body/html
    const body = document.body;
    const html = document.documentElement;

    if (body) {
      body.removeAttribute("class");
      body.style.top = "";
    }
    if (html) {
      html.removeAttribute("class");
      html.removeAttribute("translate");
    }
  } catch (error) {
    console.warn("Error clearing Google Translate data:", error);
  }
};

export default function GoogleTrans() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]); // Default to English
  const [isClient, setIsClient] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Force clean initialization
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Always start fresh - clear everything on component mount
    clearAllGoogleTranslateData();

    // Simple language detection from URL only (no cookies)
    const urlLang = searchParams.get("lang") || "en";
    const language = findLanguageByCode(urlLang);

    setSelectedLang(language);
    setIsClient(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove dependencies to prevent re-initialization

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isClient) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isClient]);

  // Initialize Google Translate cleanly
  useEffect(() => {
    if (!isClient || googleInitialized.current) return;

    // Clean any existing Google Translate before initializing
    clearAllGoogleTranslateData();

    const initializeGoogleTranslate = () => {
      try {
        if (!window.google?.translate) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((lang) => lang.code).join(","),
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element_hidden"
        );
        googleInitialized.current = true;
      } catch (error) {
        console.warn("Error initializing Google Translate:", error);
      }
    };

    const loadGoogleTranslateScript = () => {
      // Remove any existing script first
      const existingScript = document.querySelector(
        'script[src*="translate_a/element.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      window.googleTranslateElementInit = initializeGoogleTranslate;

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => console.warn("Failed to load Google Translate");

      // Add timestamp to prevent caching
      script.src += `&_t=${Date.now()}`;

      document.head.appendChild(script);
    };

    // Delay initialization to ensure DOM is ready
    setTimeout(loadGoogleTranslateScript, 100);
  }, [isClient]);

  const updateURLWithLanguage = useCallback(
    (languageCode: string) => {
      const params = new URLSearchParams(searchParams);

      if (languageCode === "en") {
        params.delete("lang");
      } else {
        params.set("lang", languageCode);
      }

      const newUrl = params.toString() ? `?${params.toString()}` : "";
      router.replace(newUrl, { scroll: false });
    },
    [searchParams, router]
  );

  const triggerGoogleTranslate = useCallback(
    (languageCode: string) => {
      setIsChangingLanguage(true);

      if (languageCode === "en") {
        console.log(
          "================== Resetting to English =================="
        );
        toast.success("Switched to English");

        // Clear everything and hard reload for English
        clearAllGoogleTranslateData();

        // Force navigation to clean URL
        window.location.href = window.location.pathname;
        return;
      }

      // For non-English languages
      try {
        // Clear first, then set new language
        clearAllGoogleTranslateData();

        // Set minimal cookie for Google Translate
        document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=3600`; // Only 1 hour expiry

        // Update URL
        updateURLWithLanguage(languageCode);

        // Small delay to ensure cookie is set
        setTimeout(() => {
          // Force reload to apply translation
          window.location.reload();
        }, 100);
      } catch (error) {
        console.warn("Error applying translation:", error);
        // Fallback: hard reload
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
    [updateURLWithLanguage]
  );

  const handleLanguageSelect = useCallback(
    (language: Language) => {
      if (isChangingLanguage) return;

      setSelectedLang(language);
      setIsOpen(false);
      triggerGoogleTranslate(language.code);
    },
    [triggerGoogleTranslate, isChangingLanguage]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up on component unmount
      if (typeof window !== "undefined") {
        clearAllGoogleTranslateData();
      }
    };
  }, []);

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg">
        <div className="w-5 h-5 bg-gray-200 rounded-sm animate-pulse"></div>
        <span className="font-semibold">--</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div
        id="google_translate_element_hidden"
        className="absolute -left-[9999px] -top-[9999px] invisible w-px h-px"
        aria-hidden="true"
      />

      {/* Custom Translate Button */}
      <button
        onClick={() => !isChangingLanguage && setIsOpen(!isOpen)}
        disabled={isChangingLanguage}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isChangingLanguage
            ? "text-gray-400 bg-gray-100 cursor-not-allowed"
            : "text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300"
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Image
          src={selectedLang.flag}
          width={20}
          height={20}
          alt={`${selectedLang.name} flag`}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <span className="font-semibold">
          {isChangingLanguage ? "..." : selectedLang.short}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Custom Dropdown */}
      {isOpen && !isChangingLanguage && (
        <div
          className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1"
          role="listbox"
        >
          <div className="max-h-64 overflow-y-auto">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 focus:outline-none focus:bg-blue-50 focus:text-blue-600 ${
                  selectedLang.code === language.code
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
                role="option"
                aria-selected={selectedLang.code === language.code}
              >
                <Image
                  src={language.flag}
                  alt={`${language.name} flag`}
                  className="w-5 h-5 rounded-sm object-cover flex-shrink-0"
                  width={20}
                  height={20}
                />
                <span className="truncate">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
