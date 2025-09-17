"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";

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

const getLangFromHash = (): string => {
  const hash = window.location.hash;
  const match = hash.match(/#googtrans\(en\|([^)]+)\)/);
  return match ? match[1] : "en";
};

const getLangFromCookie = (): string => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("googtrans="));
  if (!cookie) return "en";
  const match = cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "en";
};

const findLanguageByCode = (code: string): Language => {
  return languages.find((lang) => lang.code === code) || languages[0];
};

export default function GoogleTrans() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null); // Start with null
  const [isClient, setIsClient] = useState(false); // Track client hydration
  const dropdownRef = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);

  // Initialize client-side only to prevent hydration mismatch
  useEffect(() => {
    // This runs only on client side after hydration
    const hashLang = getLangFromHash();
    const cookieLang = getLangFromCookie();
    const currentLang = hashLang !== "en" ? hashLang : cookieLang;
    const language = findLanguageByCode(currentLang);

    setSelectedLang(language);
    setIsClient(true);
  }, []);

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

  // Initialize Google Translate only once after client is ready
  useEffect(() => {
    if (!isClient || googleInitialized.current) return;

    const initializeGoogleTranslate = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((lang) => lang.code).join(","),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element_hidden"
      );
      googleInitialized.current = true;
    };

    const loadGoogleTranslateScript = () => {
      if (document.querySelector('script[src*="translate_a/element.js"]')) {
        initializeGoogleTranslate();
        return;
      }

      window.googleTranslateElementInit = initializeGoogleTranslate;

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => console.warn("Failed to load Google Translate");
      document.head.appendChild(script);
    };

    loadGoogleTranslateScript();
  }, [isClient]);

  const triggerGoogleTranslate = useCallback((languageCode: string) => {
    document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000`;

    if (languageCode === "en") {
      window.location.hash = "";
      window.location.reload();
      return;
    }

    window.location.hash = `#googtrans(en|${languageCode})`;

    const attemptTranslation = () => {
      const selectElement = document.querySelector(
        "#google_translate_element_hidden select"
      ) as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }

      const comboBox = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;
      if (comboBox) {
        comboBox.value = languageCode;
        comboBox.dispatchEvent(new Event("change", { bubbles: true }));
        return true;
      }

      return false;
    };

    setTimeout(() => {
      if (!attemptTranslation()) {
        window.location.reload();
      }
    }, 100);
  }, []);

  const handleLanguageSelect = useCallback(
    (language: Language) => {
      setSelectedLang(language);
      setIsOpen(false);
      triggerGoogleTranslate(language.code);
    },
    [triggerGoogleTranslate]
  );

  // Don't render anything until we know the actual selected language
  if (!isClient || !selectedLang) {
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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <img
          src={selectedLang.flag}
          alt={`${selectedLang.name} flag`}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <span className="font-semibold">{selectedLang.short}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Custom Dropdown */}
      {isOpen && (
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
                <img
                  src={language.flag}
                  alt={`${language.name} flag`}
                  className="w-5 h-5 rounded-sm object-cover flex-shrink-0"
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
