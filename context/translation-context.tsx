"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import enTranslations from "../utill/en.json";
import deTranslations from "../utill/de.json";

type Language = "en" | "de";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  lang: any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Read initial language from localStorage or default to 'de'
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language") as Language | null;
      return stored || "de";
    }
    return "de";
  });

  const [lang, setLang] = useState(
    language === "en" ? enTranslations : deTranslations
  );

  // Update translation object when language changes
  useEffect(() => {
    if (language === "en") {
      setLang(enTranslations);
    } else {
      setLang(deTranslations);
    }

    // Save selected language to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, lang }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
