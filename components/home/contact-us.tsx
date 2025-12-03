"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MainHeading from "../common/main-heading";
import Image from "next/image";
import { useTranslation } from "@/context/translation-context";
import { toast } from "react-hot-toast";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactUs = () => {
  const { lang } = useTranslation();
  const t = lang.contactUsSection;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // API function to submit form
  const submitContactForm = async (formData: FormValues) => {
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await submitContactForm(data);
      toast.success("Form submitted successfully!");
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div id="contact-us" className="scroll-mt-10">
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
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("name", {
                  required: t.form.name + " is required",
                })}
                className={`peer w-full border rounded-lg px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600">
                {t.form.name} <span className="text-red-500">*</span>
              </label>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                {...register("email", {
                  required: t.form.email + " is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`peer w-full border rounded-lg px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600">
                {t.form.email} <span className="text-red-500">*</span>
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("phone", {
                  required: t.form.phone + " is required",
                })}
                className={`peer w-full border rounded-lg px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600">
                {t.form.phone} <span className="text-red-500">*</span>
              </label>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                {...register("subject", {
                  required: t.form.subject + " is required",
                })}
                className={`peer w-full border rounded-lg px-4 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600">
                {t.form.subject} <span className="text-red-500">*</span>
              </label>
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows={6}
                placeholder=" "
                {...register("message", {
                  required: t.form.message + " is required",
                })}
                className={`peer w-full border rounded-lg px-4 pt-5 pb-2 placeholder-transparent resize-none focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              <label className="absolute left-4 top-2.5 text-gray-500 text-sm transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-red-600">
                {t.form.message} <span className="text-red-500">*</span>
              </label>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : t.form.submit}
            </button>
          </form>
        </div>

        {/* RIGHT — Contact Details Box */}
        <div className="bg-red-50 py-8 px-3 sm:px-20 md:px-15 rounded-xl flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-red-primary mb-3">
            {t.contactDetails.title}
          </h2>

          {/* Address */}
          <div className="mb-6 flex gap-3 md:gap-5">
            <Image
              src="/assets/home-images/location.svg"
              alt="map"
              height={100}
              width={100}
              className="w-8 h-8"
            />
            <div>
              <p className="text-black font-semibold text-[20px]">
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

          {/* Email */}
          <div className="mb-6 flex gap-3 md:gap-5">
            <Image
              src="/assets/home-images/email.svg"
              alt="map"
              height={100}
              width={100}
              className="w-8 h-8"
            />
            <div>
              <p className="text-black font-semibold text-[20px]">
                {t.contactDetails.email.label}
              </p>
              <p className="text-[#19191980] mt-1 leading-relaxed text-[16px]">
                {t.contactDetails.email.value}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6 flex gap-3 md:gap-5">
            <Image
              src="/assets/home-images/calling.svg"
              alt="map"
              height={100}
              width={100}
              className="w-8 h-8"
            />
            <div>
              <p className="text-black font-semibold text-[20px]">
                {t.contactDetails.phone.label}
              </p>
              <p className="text-[#19191980] mt-1 leading-relaxed text-[16px]">
                {t.contactDetails.phone.value}
              </p>
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
    </div>
  );
};

export default ContactUs;
