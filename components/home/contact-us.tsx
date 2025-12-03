"use client";
import React from "react";
import MainHeading from "../common/main-heading";
import Image from "next/image";
import { useTranslation } from "@/context/translation-context";

const ContactUs = () => {
  const { lang } = useTranslation();
  const t = lang.contactUsSection;

  return (
    <>
      {/* Main Heading */}
      <div>
        <MainHeading
          button={t.button}
          center={true}
          textWhite={false}
          heading1={t.heading1}
          heading2={t.heading2}
          subheading={t.subheading}
        />
      </div>

      <section className="py-12 px-5 flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* LEFT — Contact Form */}
        <div className="w-full max-w-3xl">
          <form className="space-y-3">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder=" "
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600"
              >
                {t.form.name} <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder=" "
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600"
              >
                {t.form.email} <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="text"
                id="phone"
                placeholder=" "
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <label
                htmlFor="phone"
                className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600"
              >
                {t.form.phone} <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                id="subject"
                placeholder=" "
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600"
              >
                {t.form.subject} <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                placeholder=" "
                rows={6}
                required
                className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-gray-900 placeholder-transparent resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 
      peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600"
              >
                {t.form.message} <span className="text-red-500">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition"
            >
              {t.form.submit}
            </button>
          </form>
        </div>

        {/* RIGHT — Contact Details Box */}
        <div className="bg-red-50 py-8 px-3 sm:px-20 md:px-15 rounded-xl flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-red-primary mb-3">
            {t.contactDetails.title}
          </h2>

          {/* Address */}
          <div className="mb-6">
            <div className="flex justify-start gap-5">
              <Image
                src="/assets/home-images/location.svg"
                alt="map"
                height={100}
                width={100}
                className="w-8 h-8"
              />
              <div>
                <p className="text-black font-semibold text-[20px] ">
                  {t.contactDetails.address.label}
                </p>
                <p className="text-[#19191980] mt-1 leading-relaxed text-[16px]">
                  {t.contactDetails.address.line1} <br />
                  {t.contactDetails.address.line2} <br />
                  {t.contactDetails.address.line3} <br />
                  {t.contactDetails.address.line4}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <div className="flex justify-start gap-2 md:gap-5">
              <Image
                src="/assets/home-images/globe.svg"
                alt="map"
                height={100}
                width={100}
                className="w-8 h-8"
              />
              <div>
                <p className="text-black font-semibold text-[20px] ">
                  {t.contactDetails.email.label}
                </p>
                <p className="text-[#19191980] mt-1 leading-relaxed text-[15px] md:text-[16px]">
                  {t.contactDetails.email.value}
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <div className="flex justify-start gap-5">
              <Image
                src="/assets/home-images/calling.svg"
                alt="map"
                height={100}
                width={100}
                className="w-8 h-8"
              />
              <div>
                <p className="text-black font-semibold text-[20px] ">
                  {t.contactDetails.phone.label}
                </p>
                <p className="text-[#19191980] mt-1 leading-relaxed text-[16px]">
                  {t.contactDetails.phone.value}
                </p>
              </div>
            </div>
          </div>

          {/* Tax Info */}
          <div>
            <p className="text-xl font-bold text-red-600 mb-1">
              {t.contactDetails.tax.label}
            </p>
            <p className="text-[#19191980] mt-1 leading-relaxed text-[16px] font-semibold">
              {t.contactDetails.tax.value}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
