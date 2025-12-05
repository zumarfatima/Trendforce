"use client";
import React from "react";
import MainHeading from "../common/main-heading";
import MainCard from "../common/main-card";
import { useTranslation } from "@/context/translation-context";
import { ServiceCard, ServicesSectionProps } from "@/types";
// import { MainHeadingProps } from "@/types";
// import { ServiceCard, ServicesSectionProps } from "@/types";

const ServicesSection = () => {
  const { lang } = useTranslation() as { lang: ServicesSectionProps };

  return (
    <div id="services" className=" scroll-mt-20 ">
      <MainHeading
        button={lang.servicesSection.servicesButton || "Services"}
        center={true}
        textWhite={false}
        heading1={lang.servicesSection.heading1}
        heading2={lang.servicesSection.heading2}
        subheading={lang.servicesSection.subheading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 my-15 xl:px-28">
        {lang.mainCards.map((card: ServiceCard, idx) => (
          <MainCard
            key={idx}
            src={card.src}
            heading={card.heading}
            subheading={card.subheading}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
