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

const getLangFromCookie = (): string => {
  if (typeof document === "undefined") return "en";
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("googtrans="));
  if (!cookie) return "en";
  const match = cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : "en";
};

export default function GoogleTrans() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const googleInitialized = useRef(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize client-side only to prevent hydration mismatch
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get language from URL params first, then fallback to cookie
    const urlLang = searchParams.get("lang") || "en";
    const cookieLang = getLangFromCookie();

    // Use URL param if it exists, otherwise use cookie language
    const currentLang = urlLang !== "en" ? urlLang : cookieLang;
    const language = findLanguageByCode(currentLang);

    setSelectedLang(language);
    setIsClient(true);

    // If URL doesn't have lang param but cookie has a different language, sync URL
    if (!searchParams.get("lang") && cookieLang !== "en") {
      const params = new URLSearchParams(searchParams);
      params.set("lang", cookieLang);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, router]);

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
        // For English: Clear everything and reload with clean URL
        document.cookie = `googtrans=/en/en; path=/; max-age=31536000`;
        window.location.hash = "";
        window.location.href = "/";
        // router.replace("/");
        // Update URL to remove lang param
        // updateURLWithLanguage(languageCode);

        // Force reload to ensure English is applied
        // setTimeout(() => {
        //   window.location.reload();
        // }, 100);
        return;
      }

      // Update cookie for Google Translate (non-English languages)
      document.cookie = `googtrans=/en/${languageCode}; path=/; max-age=31536000`;

      // Update URL with search params
      updateURLWithLanguage(languageCode);

      // Set hash for Google Translate
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

      // Attempt translation with retry mechanism
      setTimeout(() => {
        if (!attemptTranslation()) {
          // If translation doesn't work, force reload to ensure it takes effect
          setTimeout(() => {
            window.location.reload();
          }, 500);
        } else {
          // Reset the changing state after successful translation
          setTimeout(() => {
            setIsChangingLanguage(false);
          }, 1000);
        }
      }, 100);
    },
    [updateURLWithLanguage]
  );

  const handleLanguageSelect = useCallback(
    (language: Language) => {
      if (isChangingLanguage) return; // Prevent multiple rapid changes

      setSelectedLang(language);
      setIsOpen(false);
      triggerGoogleTranslate(language.code);
    },
    [triggerGoogleTranslate, isChangingLanguage]
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
