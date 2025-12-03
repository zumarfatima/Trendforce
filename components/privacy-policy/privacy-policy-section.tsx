"use client";

import { useState } from "react";
import PrivacyHeader from "../common/company-pages-heading";
import TableOfContents from "../common/TableOfContents";
import MainContent from "../common/MainContent";
import { useTranslation } from "@/context/translation-context";

const PrivacyPolicySection = () => {
  const { lang } = useTranslation(); // get translations
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  const sections = lang.privacy.sections.map((sec: any, index: number) => ({
    id: `section-${index}`,
    label: sec.title,
    title: sec.title,
    content: (
      <>
        <p className="text-[16px]">{sec.desc}</p>
        {sec.points && (
          <ul className="list-disc pl-6 mt-4">
            {sec.points.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
        {sec.note && <p className="mt-2 italic">{sec.note}</p>}
        {sec.email && <p className="mt-2">{sec.email}</p>}
        {sec.address && <p>{sec.address}</p>}
      </>
    ),
  }));

  return (
    <div className="w-full">
      <PrivacyHeader
        title={lang.privacy.privacy}
        highlight={lang.privacy.policy}
        subtitle={lang.privacy.desc}
        lastUpdated={lang.privacy.date}
        highlightColor="#d62828"
      />

      <div className="container flex w-full mx-auto mt-10">
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

export default PrivacyPolicySection;
