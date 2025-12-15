"use client";
import React, { useEffect } from "react";
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
    clearErrors,
  } = useForm<FormValues>();
  console.log("error>>>>>>>>>", errors);

  // API function to submit form
  const submitContactForm = async (formData: FormValues) => {
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(t.errors.serverError);
      }

      return await response.json();
    } catch (error: any) {
      throw error;
    }
  };
  useEffect(() => {
    clearErrors();
  }, [t, clearErrors]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await submitContactForm(data);
      toast.success(t.errors.successError);
      reset();
    } catch (err: any) {
      toast.error(err?.message || t.errors.serverError);
    }
  };

  return (
    <div id="contact-us" className="scroll-mt-20">
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

      <section className="py-12 flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* LEFT — Contact Form */}
        <div className="w-full max-w-3xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative ">
              <input
                type="text"
                id="name-contactus"
                {...register("name", { required: t.errors.nameRequired })}
                placeholder={t.placeholders.name}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-[#E3DBD8] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent focus:placeholder:text-gray-400"
              />

              <label
                htmlFor="name-contactus"
                className="absolute bg-white mt-1 text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary peer-focus:mt-0 px-2 peer-focus:px-2 peer-focus:text-fg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                {t.form.name} <span className="text-red-500 ">*</span>
              </label>

              {errors.name && (
                <p className="">
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {t.errors.nameRequired}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className="relative ">
              <input
                type="email"
                id="email-contactus"
                {...register("email", {
                  required: t.errors.emailInvalid,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t.errors.emailInvalid,
                  },
                })}
                placeholder={t.placeholders.email}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-[#E3DBD8] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent focus:placeholder:text-gray-400"
              />
              <label
                htmlFor="email-contactus"
                className="absolute bg-white mt-1 peer-focus:mt-0 text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                {t.form.email} <span className="text-red-500">*</span>
              </label>

              {errors.email && (
                <p className="">
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {t.errors.emailInvalid}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className="relative ">
              <input
                type="text"
                id="phone-contactus"
                // {...register("phone", { required: t.errors.phoneRequired })}
                {...register("phone", {
                  required: true,
                  minLength: 10, // <--- Added validation rule
                })}
                placeholder={t.placeholders.phone}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-[#E3DBD8] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent focus:placeholder:text-gray-400"
              />

              <label
                htmlFor="phone-contactus"
                className="absolute bg-white mt-1 peer-focus:mt-0 text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                {t.form.phone} <span className="text-red-500">*</span>
              </label>

              {/* {errors.phone && (
                <p className="">
                  {errors.phone && (
                    <span className="text-red-500 text-sm">
                      {t.errors.phoneRequired}
                    </span>
                  )}
                </p>
              )} */}
              {errors.phone && (
                <p className="mt-1">
                  <span className="text-red-500 text-sm">
                    {
                      errors.phone.type === "required"
                        ? t.errors.phoneRequired
                        : t.errors.phoneMinLength // <--- Check for minLength error
                    }
                  </span>
                </p>
              )}
            </div>

            <div className="relative ">
              <input
                type="text"
                id="subject-contactus"
                {...register("subject", { required: t.errors.subjectRequired })}
                placeholder={t.placeholders.subject}
                className="block px-2.5 pb-2.5  pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-[#E3DBD8] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent focus:placeholder:text-gray-400"
              />
              <label
                htmlFor="subject-contactus"
                className="absolute bg-white mt-1 peer-focus:mt-0 text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                {t.form.subject} <span className="text-red-500">*</span>
              </label>

              {errors.subject && (
                <p className="">
                  {errors.subject && (
                    <span className="text-red-500 text-sm">
                      {t.errors.subjectRequired}
                    </span>
                  )}
                </p>
              )}
            </div>

            <div className="relative">
              <textarea
                id="message-contactus"
                {...register("message", { required: t.errors.messageRequired })}
                placeholder={t.placeholders.message}
                rows={6}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-[#E3DBD8] appearance-none focus:outline-none focus:ring-0 focus:border-primary peer placeholder-transparent focus:placeholder:text-gray-400"
              />

              <label
                htmlFor="message-contactus"
                className="absolute bg-white text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                {t.form.message} <span className="text-red-500">*</span>
              </label>

              {errors.message && (
                <p className="">
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {t.errors.messageRequired}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
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
              src="/assets/home-images/email-filled.svg"
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
