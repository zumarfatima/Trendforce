// "use client";

// import {
//   createContext,
//   ReactNode,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import enTranslations from "../utill/en.json";
// import deTranslations from "../utill/de.json";

// type Language = "en" | "de";

// interface TranslationContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   lang: any;
// }

// const TranslationContext = createContext<TranslationContextType | undefined>(
//   undefined
// );

// export function TranslationProvider({ children }: { children: ReactNode }) {
//   // Read initial language from localStorage or default to 'de'
//   const [language, setLanguage] = useState<Language>(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("language") as Language | null;
//       return stored || "de";
//     }
//     return "de";
//   });

//   const [lang, setLang] = useState(
//     language === "en" ? enTranslations : deTranslations
//   );

//   // Update translation object when language changes
//   useEffect(() => {
//     if (language === "en") {
//       setLang(enTranslations);
//     } else {
//       setLang(deTranslations);
//     }

//     // Save selected language to localStorage
//     if (typeof window !== "undefined") {
//       localStorage.setItem("language", language);
//     }
//   }, [language]);

//   if (!language) return null;

//   return (
//     <TranslationContext.Provider value={{ language, setLanguage, lang }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// }

// export const useTranslation = () => {
//   const context = useContext(TranslationContext);
//   if (!context) {
//     throw new Error("useTranslation must be used within a TranslationProvider");
//   }
//   return context;
// };

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
  // 🔑 NEW STATE: Tracks if we are running on the client side (mounted)
  const [isClient, setIsClient] = useState(false);

  // 🔑 1. Initialize language to 'de' temporarily, as localStorage isn't available on the server
  const [language, setLanguage] = useState<Language>("de");

  const [lang, setLang] = useState(deTranslations); // Initialize translations to the default ('de') // 🔑 2. useEffect to run only on the client side (after mount)

  useEffect(() => {
    // Read and set language from localStorage
    const stored = localStorage.getItem("language") as Language | null;
    const initialLang = stored || "de";

    setLanguage(initialLang);
    setLang(initialLang === "en" ? enTranslations : deTranslations);

    // Once we have set the language from localStorage, we are on the client
    setIsClient(true);
  }, []); // Empty dependency array means this runs once on mount // 🔑 3. useEffect to update translations and localStorage on language change

  useEffect(() => {
    // Only run this logic if we are already mounted (isClient is true)
    if (isClient) {
      if (language === "en") {
        setLang(enTranslations);
      } else {
        setLang(deTranslations);
      }

      // Save selected language to localStorage
      localStorage.setItem("language", language);
    }
    // Note: Do not include `isClient` in dependencies, as we only want to update on `language` change
  }, [language, isClient]); // 🔑 4. CRUCIAL: Delay rendering children until we are on the client and the language is loaded

  if (!isClient) {
    // Optionally return a loading spinner or null
    return null;
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, lang }}>
            {children}   {" "}
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
