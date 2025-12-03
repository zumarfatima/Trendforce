"use client";

import React, { useState } from "react";
import FAQs from "../shared/faqs";
import { useTranslation } from "@/context/translation-context";

const FAQsSection = () => {
  const { lang } = useTranslation();

  const faqData = lang.faqs;

  return (
    <section id="faqs" className="py-16 bg-white my-10">
      <div className="container mx-auto px-10">
        <FAQs
          title1={faqData.title1}
          title2={faqData.title2}
          desc={faqData.desc}
          faqItem={faqData.items}
        />
      </div>
    </section>
  );
};

export default FAQsSection;
