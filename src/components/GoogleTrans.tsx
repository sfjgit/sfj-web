/* eslint-disable @typescript-eslint/no-explicit-any */
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
    google: any;
    googleTranslateElementInit: any;
  }
}

const LANGUAGES: Language[] = [
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

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Simple helper functions
  const findLanguage = (code: string): Language => {
    return LANGUAGES.find((lang) => lang.code === code) || LANGUAGES[0];
  };

  const getCookieLanguage = (): string => {
    if (typeof document === "undefined") return "en";
    const match = document.cookie.match(/googtrans=\/[^\/]*\/([^;]*)/);
    return match?.[1] || "en";
  };

  // Initialize component
  useEffect(() => {
    const urlLang = searchParams.get("lang") || "en";
    const cookieLang = getCookieLanguage();

    // Use URL param, fallback to cookie
    const activeLang = urlLang !== "en" ? urlLang : cookieLang;
    setCurrentLang(findLanguage(activeLang));
    setMounted(true);
  }, [searchParams]);

  // Load Google Translate script
  useEffect(() => {
    if (!mounted) return;

    const initGoogleTranslate = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.map((lang) => lang.code).join(","),
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      window.googleTranslateElementInit = initGoogleTranslate;

      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    } else {
      initGoogleTranslate();
    }
  }, [mounted]);

  // Handle language change
  const handleLanguageChange = useCallback(
    (language: Language) => {
      if (isLoading) return;

      setIsLoading(true);
      setCurrentLang(language);
      setIsOpen(false);

      if (language.code === "en") {
        // Reset to English
        document.cookie = "googtrans=/en/en; path=/";
        toast.success("Switched to English");
        window.location.href = window.location.pathname;
        return;
      }

      // Set language
      document.cookie = `googtrans=/en/${language.code}; path=/`;

      // Update URL
      const params = new URLSearchParams(searchParams);
      params.set("lang", language.code);
      router.replace(`?${params.toString()}`, { scroll: false });

      toast.success(`Switching to ${language.name}...`);

      // Try to trigger translation
      setTimeout(() => {
        const selectElement = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement;

        if (selectElement) {
          selectElement.value = language.code;
          selectElement.dispatchEvent(new Event("change"));
          setIsLoading(false);
          toast.success(`Switched to ${language.name}`);
        } else {
          // Fallback to reload
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }, 500);
    },
    [isLoading, searchParams, router]
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-lg animate-pulse">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <span>--</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          visibility: "hidden",
        }}
      />

      {/* Language Button */}
      <button
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border border-gray-200 rounded-lg transition-colors ${
          isLoading
            ? "text-gray-400 bg-gray-50 cursor-not-allowed"
            : "text-gray-700 bg-white hover:bg-gray-50"
        }`}
      >
        <Image
          src={currentLang.flag}
          alt={currentLang.name}
          width={20}
          height={20}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <span className="font-medium">
          {isLoading ? "..." : currentLang.short}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && !isLoading && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
          <div className="max-h-64 overflow-y-auto">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                  currentLang.code === language.code
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                <Image
                  src={language.flag}
                  alt={language.name}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-sm object-cover"
                />
                <span>{language.name}</span>
                {currentLang.code === language.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
