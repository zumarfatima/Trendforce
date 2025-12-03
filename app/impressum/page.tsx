"use client";

import { useTranslation } from "@/context/translation-context";
import React, { useState } from "react";

const LegalNoticePage = () => {
  // Simple language state: "en" or "de"

  const { lang } = useTranslation();

  return (
    <div className="container mx-auto p-8 space-y-10">
      <h1 className="text-6xl font-extrabold mb-6">{lang.legalNotice.title}</h1>

      <section className="mb-6">
        <h2 className="text-4xl font-bold mb-2">
          {lang.legalNotice.company.name}
        </h2>
        <p className="text-xl">{lang.legalNotice.company.registration}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-bold mb-2">
          {lang.legalNotice.address.title}
        </h3>
        <p className="text-xl">{lang.legalNotice.address.line1}</p>
        <p className="text-xl">{lang.legalNotice.address.line2}</p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-bold mb-2">
          {lang.legalNotice.vat.title}{" "}
          <span className="font-bold text-xl">
            {lang.legalNotice.vat.number}
          </span>
        </h3>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-bold mb-2">
          {lang.legalNotice.contact.title}
        </h3>
        <p className="text-xl">{lang.legalNotice.contact.phone}</p>
        <p className="text-xl">{lang.legalNotice.contact.email}</p>
      </section>
    </div>
  );
};

export default LegalNoticePage;
