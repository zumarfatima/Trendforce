"use client";
import Image from "next/image";
import HeaderMenu from "./header-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/translation-context";
import { useState, useEffect } from "react";

export default function NavBarIndex() {
  const { lang } = useTranslation();
  const pathname = usePathname();

  // Initialize activeSection to the Home link href
  const [activeSection, setActiveSection] = useState("/#home");

  const links = [
    { href: "/#home", label: lang.header.home },
    { href: "/#services", label: lang.header.services },
    { href: "/#about-us", label: lang.header.aboutUs },
    { href: "/#faqs", label: lang.header.faqs },
  ];

  // 🔑 REFINED EFFECT: Setup Intersection Observer to track sections
  useEffect(() => {
    const sections = links.map((link) => link.href.replace("/#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If the entry is intersecting, set it as active
            setActiveSection(`/#${entry.target.id}`);
          }
        });

        if (window.scrollY < 100) {
          setActiveSection("/#home");
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // We also need a scroll listener specifically for the Home check
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection("/#home");
      }
    };

    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-background shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between py-4 px-5 md:px-15">
        {/* ---- Left: Logo ---- */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <a href="/" target="_self">
            {" "}
            <Image
              src="/assets/home-icon.svg"
              alt="Omega Shop Logo"
              width={147}
              height={31}
              className="w-[147px] h-[31px]"
            />
          </a>
        </div>

        <ul className="hidden lg:flex justify-center items-center text-[16px] font-medium text-white w-auto gap-5 md:gap-2 lg:gap-3 xl:gap-18 ">
          {links.map((link) => (
            <li
              key={link.href}
              className={`text-center w-auto ${
                activeSection === link.href
                  ? "text-red-primary font-semibold"
                  : ""
              }`}
            >
              <Link
                href={link.href}
                scroll={true}
                // 💡 MANUAL CLICK HANDLER: Instantly updates the active state on click
                onClick={() => setActiveSection(link.href)}
                className="inline-block cursor-pointer transition-colors hover:text-red-secondary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <HeaderMenu />
      </div>
    </nav>
  );
}
