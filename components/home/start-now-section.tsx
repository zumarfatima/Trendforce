// import React from "react";
// import MainHeading from "../common/main-heading";

// const StartNowSection = () => {
//   return (
//     <div className="bg-black flex flex-col items-center py-4 rounded-3xl px-5 my-10">
//       <MainHeading
//         button="Start Now"
//         center={true}
//         textWhite={true}
//         heading1="Ready to Transform Your "
//         heading2="Business?"
//         subheading="Partner with Trendforce Consulting to navigate the future of business
// with confidence and innovation."
//       />
//       <button className="text-white bg-linear-to-b from-red-secondary to-red-primary max-w-fit px-5 md:px-10 md:py-2 rounded-lg font-medium cursor-pointer transition hover:bg-red-400  ">
//         Schedule a Consultation
//       </button>
//     </div>
//   );
// };

// export default StartNowSection;

"use client";
import { useTranslation } from "@/context/translation-context";
import MainHeading from "../common/main-heading";
// import { useTranslation } from "@/context/translation-context";

const StartNowSection = () => {
  const { lang } = useTranslation();
  const t = lang.startNowSection;

  return (
    <div className="bg-black flex flex-col items-center py-4 rounded-3xl px-5 mx-5 my-10">
      <MainHeading
        button={t.button}
        center={true}
        textWhite={true}
        heading1={t.heading1}
        heading2={t.heading2}
        subheading={t.subheading}
      />
      <button className="text-white bg-linear-to-b from-red-secondary to-red-primary max-w-fit px-5 md:px-10 md:py-2 rounded-lg font-medium cursor-pointer transition hover:bg-red-400">
        {t.cta}
      </button>
    </div>
  );
};

export default StartNowSection;
