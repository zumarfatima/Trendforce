"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/context/translation-context";
// import { useTranslation } from "@/app/context/translation-context";

interface LanguageSelectorProps {
  variant?: "compact" | "full";
}

export default function LanguageSelector({
  variant = "full",
}: LanguageSelectorProps) {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleLanguage = (lang: "en" | "de") => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block w-32 lg:w-full ">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-32 lg:w-full flex flex-row  gap-2 items-center justify-between border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer lg:px-2 ${
          variant === "compact" ? "px-2 py-1 bg-white" : "px-4 "
        } w-full`}
      >
        <p className="flex items-center gap-1 justify-center px-2">
          <Image
            src={
              language === "de" ? "/assets/de-flag.png" : "/assets/uk-flag.png"
            }
            alt={language === "de" ? "Deutsch" : "English"}
            width={40}
            height={40}
            className="rounded-full h-6 w-6"
          />
          <span className="font-semibold text-gray-800 text-[16px] -mt-1">
            {language === "de" ? "Deutsch" : "English"}
          </span>
        </p>
        <ChevronDown className="w-7 h-7 text-gray-700 " />
      </button>

      {open && (
        <div
          className={`absolute w-32 lg:w-full bg-white border border-gray-200 rounded-lg shadow-md z-30
      ${window.innerWidth < 640 ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          <button
            onClick={() => toggleLanguage("en")}
            className={`w-32 lg:w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center space-x-2 ${
              language === "en" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <Image
              src="/assets/uk-flag.png"
              alt="English"
              width={20}
              height={30}
              className="rounded-full h-6 w-6"
            />
            <span>English</span>
          </button>

          <button
            onClick={() => toggleLanguage("de")}
            className={` text-left px-4 w-32 lg:w-full py-2 hover:bg-gray-50 rounded-lg flex items-center space-x-2 ${
              language === "de" ? "bg-gray-100 font-semibold" : ""
            }`}
          >
            <Image
              src="/assets/de-flag.png"
              alt="German"
              width={20}
              height={20}
              className="rounded-full h-6 w-6"
            />
            <span>Deutsch</span>
          </button>
        </div>
      )}
    </div>
  );
}
