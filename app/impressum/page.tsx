"use client";

import { useTranslation } from "@/context/translation-context";
const LegalNoticePage = () => {
  const { lang } = useTranslation();

  return (
    <div className="w-full container mx-auto px-5 md:px-15  py-15 space-y-5 md:space-y-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
        {lang.legalNotice.title}
      </h1>

      {/* Company Section */}
      <section className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {lang.legalNotice.company.name}
        </h2>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.company.registration}
        </p>
      </section>

      {/* Address Section */}
      <section className="space-y-1">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {lang.legalNotice.address.title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.address.line1}
        </p>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.address.line2}
        </p>
      </section>

      {/* VAT Section */}
      <section className="space-y-1">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {lang.legalNotice.vat.title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.vat.number}
        </p>
      </section>

      {/* Contact Section */}
      <section className="space-y-1">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {lang.legalNotice.contact.title}
        </h3>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.contact.phone}
        </p>
        <p className="text-base sm:text-lg md:text-xl">
          {lang.legalNotice.contact.email}
        </p>
      </section>
    </div>
  );
};

export default LegalNoticePage;
