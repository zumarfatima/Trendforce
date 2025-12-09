"use client";
import { useTranslation } from "@/context/translation-context";
import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  image?: string;
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterData {
  description: string;
  columns: FooterColumn[];
  copyright: string;
  copyright2?: string;
}

const Footer = () => {
  const { lang } = useTranslation();
  const t: FooterData = lang.footer;

  return (
    <section className=" sm:px-15  pt-15 pb-2 -mb-6 bg-black">
      <div className="container mx-auto px-5 lg:px-15">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 ">
          <div className="flex flex-col gap-4 text-start  lg:items-start mb-4 lg:mb-0">
            <Link href="/">
              <Image
                src="/assets/home-icon.svg"
                alt="icon"
                width={200}
                height={200}
              />
            </Link>
            <p className="text-sm max-w-[400px] sm:text-base  text-white">
              {t.description}
            </p>
          </div>
          {/* Right lists */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-3 text-white">
            {t.columns.map((col: FooterColumn, index: number) => {
              return (
                <div key={index} className="text-start">
                  <h3 className="text-[#e41c34] font-semibold mb-4">
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2 max-w-[200px]">
                    {col.links.map((link: FooterLink, idx: number) => (
                      <li key={idx} className="flex justify-start gap-2">
                        {link.image && (
                          <Image
                            src={link.image}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                        )}
                        <Link
                          href={link.href}
                          className="text-white hover:text-red-600 transition-colors text-[16px] sm:text-base"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="border-spacing-0.5 border-gray-50 p-0 mt-1" />
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 ">
          <p className="text-white text-center md:text-start text-[16px] sm:text-base">
            {t.copyright}
          </p>
          {t.copyright2 && (
            <p
              className="text-white text-center md:text-start text-xs sm:text-base"
              dangerouslySetInnerHTML={{ __html: t.copyright2 }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Footer;
