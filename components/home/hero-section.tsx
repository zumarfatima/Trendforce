"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/translation-context";
import Image from "next/image";

const HeroSection = () => {
  const { lang } = useTranslation();

  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row justify-between w-full py-15 my-10 px-5 mx-auto "
    >
      {/* LEFT CONTENT */}
      <div className="gap-7">
        <div className="gap-4">
          <h1 className="text-4xl md:text-6xl lg:text-[86px] font-bold flex flex-wrap mb-5">
            <span className="text-black">
              {lang.heroSection.pioneeringTheFuture}{" "}
            </span>
            <span className="bg-linear-to-br from-red-secondary to-red-primary bg-clip-text text-transparent border-b-4 border-red-primary">
              {lang.heroSection.business}
            </span>
          </h1>

          <p className="text-[#737373] mb-10 text-xl">
            {lang.heroSection.empoweringJourney}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button className="bg-linear-to-b from-red-secondary to-red-primary md:px-10 md:py-5 text-white rounded-lg font-medium cursor-pointer transition hover:bg-red-100">
            {lang.heroSection.exploreServices}
          </Button>
          <Button className="border border-gray-300 md:px-10 md:py-5 rounded-lg font-medium text-white bg-background hover:bg-gray-800 transition cursor-pointer">
            {lang.heroSection.contactUs}
          </Button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full flex justify-end">
        <Image
          src="/assets/home-images/home-banner.svg"
          alt="hero section details"
          width={600}
          height={600}
        />
      </div>
    </section>
  );
};

export default HeroSection;
