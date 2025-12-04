// "use client";

// import { useState } from "react";
// import PrivacyHeader from "../common/company-pages-heading";
// import TableOfContents from "../common/TableOfContents";
// import MainContent from "../common/MainContent";
// import { useTranslation } from "@/context/translation-context";

// const PrivacyPolicySection = () => {
//   const { lang } = useTranslation(); // get translations
//   const [activeSection, setActiveSection] = useState("introduction");

//   const scrollToSection = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     setActiveSection(id);
//   };

//   const sections = lang.privacy.sections.map((sec: any, index: number) => ({
//     id: `section-${index}`,
//     label: sec.title,
//     title: sec.title,
//     content: (
//       <>
//         <p className="text-[16px]">{sec.desc}</p>
//         {sec.points && (
//           <ul className="list-disc pl-6 mt-4">
//             {sec.points.map((point: string, i: number) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         )}
//         {sec.note && <p className="mt-2 italic">{sec.note}</p>}
//         {sec.email && <p className="mt-2">{sec.email}</p>}
//         {sec.address && <p>{sec.address}</p>}
//       </>
//     ),
//   }));

//   return (
//     <div className="w-full">
//       <PrivacyHeader
//         title={lang.privacy.privacy}
//         highlight={lang.privacy.policy}
//         subtitle={lang.privacy.desc}
//         lastUpdated={lang.privacy.date}
//         highlightColor="#d62828"
//       />

//       <div className="container flex w-full mx-auto mt-10">
//         <TableOfContents
//           items={sections}
//           active={activeSection}
//           onSelect={scrollToSection}
//         />

//         <MainContent sections={sections} />
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicySection;

"use client";

import { useState, useEffect, useRef } from "react"; // 👈 Import useEffect and useRef
import PrivacyHeader from "../common/company-pages-heading";
import TableOfContents from "../common/TableOfContents";
import MainContent from "../common/MainContent";
import { useTranslation } from "@/context/translation-context";

const PrivacyPolicySection = () => {
  const { lang } = useTranslation();
  // Set initial active section to the ID of the first section
  const [activeSection, setActiveSection] = useState("section-0");
  // Ref to hold all the section DOM elements
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // 🧭 Function to handle scroll and update active section
  const handleScroll = () => {
    // Define an offset (e.g., 150px from the top) for when a section should be considered "active"
    const offset = 150;
    let currentActive = activeSection;

    // Iterate through all section references
    sectionRefs.current.forEach((section) => {
      if (section) {
        // Get section position relative to the viewport
        const rect = section.getBoundingClientRect();

        // Check if the section top is above the offset line AND its bottom is below the offset line
        if (rect.top <= offset && rect.bottom >= offset) {
          currentActive = section.id;
        }
      }
    });

    if (currentActive !== activeSection) {
      setActiveSection(currentActive);
    }
  };

  // 🖱️ Set up and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]); // Dependency array: Re-run effect if activeSection changes (for closure scope)

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
    <div className="w-full mt-10">
      <PrivacyHeader
        title={lang.privacy.privacy}
        highlight={lang.privacy.policy}
        subtitle={lang.privacy.desc}
        date2={lang.privacy.date2}
        date={lang.privacy.date}
        highlightColor="#d62828"
      />

      <div className="container flex w-full mx-auto mt-10">
        <TableOfContents
          items={sections}
          active={activeSection}
          onSelect={scrollToSection}
        />

        {/* 🔑 Pass the sectionRefs to MainContent */}
        <MainContent sections={sections} sectionRefs={sectionRefs} />
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
