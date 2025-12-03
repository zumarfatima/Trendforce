"use client";

import { useState, useEffect } from "react";
import PrivacyHeader from "../common/company-pages-heading";
import TableOfContents from "../common/TableOfContents";
import MainContent from "../common/MainContent";
import { useTranslation } from "@/context/translation-context";

const TermsAndConditionsSection = () => {
  const { lang } = useTranslation(); // get translations
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

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
    <div className="w-full">
      <PrivacyHeader
        title="Terms &"
        subtitle="Our commitment to transparency and the protection of your data."
        highlight="Conditions"
        lastUpdated="Sep 18, 2025"
        highlightColor="#d62828"
      />

      <div className="container flex  w-full mx-auto mt-10">
        <TableOfContents
          items={sections}
          active={activeSection}
          onSelect={scrollToSection}
        />

        <MainContent sections={sections} />
      </div>
    </div>
  );
};

export default TermsAndConditionsSection;
