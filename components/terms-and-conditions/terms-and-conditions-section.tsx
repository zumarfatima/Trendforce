"use client";

import { useState, useEffect, useRef } from "react";
import PrivacyHeader from "../common/company-pages-heading";
import TableOfContents from "../common/TableOfContents";
import MainContent from "../common/MainContent";
import { useTranslation } from "@/context/translation-context";

const TermsAndConditionsSection = () => {
  const { lang } = useTranslation();

  // Initial section
  const [activeSection, setActiveSection] = useState("section-0");

  // Store references to all content sections
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to selected TOC item
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 120; // adjust if needed

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(id);
    }
  };

  // Detect current active section on scroll
  const handleScroll = () => {
    const offset = 150;
    let currentActive = activeSection;

    sectionRefs.current.forEach((section) => {
      if (section) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= offset && rect.bottom >= offset) {
          currentActive = section.id;
        }
      }
    });

    if (currentActive !== activeSection) {
      setActiveSection(currentActive);
    }
  };

  // Add scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Convert translated sections
  const sections = lang.terms.sections.map((term: any, index: number) => ({
    id: `section-${index}`,
    label: term.title,
    title: term.title,
    content: (
      <>
        <p className="text-[16px]">{term.desc}</p>

        {term.points && (
          <ul className="list-disc pl-6 mt-4">
            {term.points.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}

        {term.note && <p className="mt-2 italic">{term.note}</p>}
        {term.email && <p className="mt-2">{term.email}</p>}
        {term.address && <p>{term.address}</p>}
      </>
    ),
  }));

  return (
    <div className="w-full mt-10">
      <PrivacyHeader
        title={lang.terms.terms}
        highlight={lang.terms.conditions}
        subtitle={lang.terms.desc}
        date2={lang.terms.date2}
        date={lang.terms.date}
        highlightColor="#d62828"
      />

      <div className="container flex w-full mx-auto mt-10">
        <TableOfContents
          items={sections}
          active={activeSection}
          onSelect={scrollToSection}
        />

        {/* Pass refs same as Privacy page */}
        <MainContent sections={sections} sectionRefs={sectionRefs} />
      </div>
    </div>
  );
};

export default TermsAndConditionsSection;
