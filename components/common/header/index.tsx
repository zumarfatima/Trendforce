"use client";
import Image from "next/image";
import HeaderMenu from "./header-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/translation-context";

export default function NavBarIndex() {
  const { lang } = useTranslation();
  const pathname = usePathname();
  const links = [
    { href: "/#home", label: lang.header.home },
    { href: "/#services", label: lang.header.services },
    { href: "/#about-us", label: lang.header.aboutUs },
    { href: "/#faqs", label: lang.header.faqs },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-background shadow-sm border-b border-gray-200 ">
      <div className="container mx-auto flex items-center justify-between py-4 px-5">
        {/* ---- Left: Logo ---- */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link href="/">
            {" "}
            <Image
              src="/assets/home-icon.svg"
              alt="Omega Shop Logo"
              width={147}
              height={31}
              className="w-[147px] h-[31px]"
            />
          </Link>
        </div>

        <ul className="hidden lg:flex justify-center items-center text-[16px] font-medium text-white w-auto gap-5  xl:gap-20 mx-auto">
          {links.map((link, index) => (
            <li
              key={link.href}
              className={` text-center w-auto ${
                pathname === link.href ? "text-red-primary font-semibold" : ""
              }`}
            >
              <Link
                href={link.href}
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
