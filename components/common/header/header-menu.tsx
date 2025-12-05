"use client";

import { useState } from "react";
import { X } from "lucide-react";
import LanguageSelector from "../language-selector";
import { useTranslation } from "@/context/translation-context";
import { redirect } from "next/navigation";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { t } = useTranslation();
  const { lang } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 relative">
        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector variant="compact" />
          <button
            onClick={() => redirect("/#contact-us")}
            className="bg-linear-to-b from-red-secondary to-red-primary text-white py-2 px-2 rounded-lg whitespace-nowrap cursor-pointer text-[14px] xl:text-[16px] "
          >
            {lang.header.getFreeConsultation}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex lg:hidden items-center  rounded-lg "
        >
          {menuOpen ? (
            <X className="w-8 h-8  text-white" />
          ) : (
            <span className="text-3xl text-white">☰</span>
          )}
        </button>
      </div>

      {/* ---- Mobile Dropdown Menu ---- */}
      <div
        className={` lg:hidden absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-100 z-20 transition-all duration-200 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-4 py-4 px-6 font-medium text-gray-800">
          <li
            className="hover:text-foreground cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              redirect("/");
            }}
          >
            {lang.header.home}
          </li>

          <li
            className="hover:text-foreground cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              redirect("/#services");
            }}
          >
            {lang.header.services}
          </li>

          <li
            className="hover:text-foreground cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              redirect("/#about-us");
            }}
          >
            {lang.header.aboutUs}
          </li>

          <li
            className="hover:text-foreground cursor-pointer"
            onClick={() => {
              setMenuOpen(false);
              redirect("/#faqs");
            }}
          >
            {lang.header.faqs}
          </li>

          <hr className="border-gray-200" />

          <div className="flex flex-col md:hidden gap-3">
            <LanguageSelector variant="compact" />
            <button
              onClick={() => {
                setMenuOpen(false);
                redirect("/#contact-us");
              }}
              className="md:hidden bg-linear-to-b from-red-secondary to-red-primary text-white py-2 px-4 rounded-lg whitespace-nowrap cursor-pointer"
            >
              {lang.header.getFreeConsultation}
            </button>
          </div>
        </ul>
      </div>
    </>
  );
}
