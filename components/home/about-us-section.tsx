"use client";
import MainHeading from "../common/main-heading";
import Image from "next/image";
import { AboutUSCard } from "../common/aboutUs/about-us-card";
import { useTranslation } from "@/context/translation-context";

const AboutUs = () => {
  const { lang } = useTranslation();

  return (
    <div id="about-us" className=" my-10 scroll-mt-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="md:w-[50%] mt-5 lg:mt-0">
          <MainHeading
            button={lang.aboutUsSection.button}
            center={false}
            textWhite={false}
            heading1={lang.aboutUsSection.heading1}
            heading2={lang.aboutUsSection.heading2}
            subheading={lang.aboutUsSection.subheading}
          />
        </div>

        <div className="flex items-center justify-center max-w-[600px]">
          <Image
            src="/assets/about-us/about-us.svg"
            alt="about-us"
            width={600}
            height={600}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 my-15 md:mx-20">
        {lang.aboutUsCards.map((card: any, idx: number) => (
          <AboutUSCard
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

export default AboutUs;
