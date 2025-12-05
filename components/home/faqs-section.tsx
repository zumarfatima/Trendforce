"use client";

import React, { useState } from "react";
import FAQs from "../shared/faqs";
import { useTranslation } from "@/context/translation-context";

const FAQsSection = () => {
  const { lang } = useTranslation();

  const faqData = lang.faqs;

  return (
    <section id="faqs" className="scroll-mt-10">
      <FAQs
        title1={faqData.title1}
        title2={faqData.title2}
        desc={faqData.desc}
        faqItem={faqData.items}
      />
    </section>
  );
};

export default FAQsSection;
