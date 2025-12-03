"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/translation-context";

type CookieToggleProps = {
  title: string;
  description: string;
  icon: string;
  value: boolean;
  disabled?: boolean;
  onChange: () => void;
};

export default function CookieConsent() {
  const { lang } = useTranslation();
  const t = lang.cookieConsent;

  const [show, setShow] = useState(false);
  const [essential, setEssential] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("cookie_consent");
    const rejected = localStorage.getItem("cookie_consent_rejected"); // 👈 NEW CHECK

    if (!saved && !rejected) {
      // 👈 Show if NO consent AND NO rejection
      setShow(true);
      return;
    }

    if (rejected) {
      // 👈 If rejected, do NOT show the modal immediately, but clear the flag for the next visit
      // We close the modal but remove the rejection flag so the modal shows on the NEXT visit
      localStorage.removeItem("cookie_consent_rejected");
      setShow(false);
      return;
    }

    try {
      const consent = JSON.parse(saved as string);
      setEssential(consent.essential);
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);

      setShow(false); // Consent saved, do not show
    } catch {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleAccept = () => {
    // Keep this: Saving consent on acceptance
    localStorage.setItem(
      "cookie_consent",
      JSON.stringify({ essential: true, analytics, marketing })
    );
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent_rejected", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-8 animate-fadeIn relative">
        <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
          <div className="bg-red-primary h-10 w-10 rounded-full flex items-center justify-center">
            <Image
              src="/assets/home-images/cookies.svg"
              alt="icon"
              width={40}
              height={40}
              className="h-5 w-5"
            />
          </div>
          {t.title}
        </h2>

        <p className="text-gray-600 mt-2 text-[20px]">{t.description}</p>

        <a
          href="/privacy-policy"
          className="text-red-600 font-semibold hover:underline mt-2 text-[20px] inline-block"
        >
          {t.learnMore}
        </a>

        <hr className="my-6 text-gray-200" />

        <CookieToggle
          title={t.sections.essential.title}
          description={t.sections.essential.description}
          icon="/assets/home-images/cookies.svg"
          value={essential}
          disabled
          onChange={() => {}}
        />

        <CookieToggle
          title={t.sections.analytics.title}
          description={t.sections.analytics.description}
          icon="/assets/home-images/cookies.svg"
          value={analytics}
          onChange={() => setAnalytics(!analytics)}
        />

        <CookieToggle
          title={t.sections.marketing.title}
          description={t.sections.marketing.description}
          icon="/assets/home-images/cookies.svg"
          value={marketing}
          onChange={() => setMarketing(!marketing)}
        />

        <hr className="my-6 text-gray-200" />

        <div className="flex justify-between items-center">
          <Image
            src="/assets/home-icon-2.svg"
            alt="TrendForce Logo"
            width={200}
            height={200}
            className="h-10"
          />

          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="px-6 py-2 bg-[#575757] text-white rounded-lg hover:bg-[#575757]/80 transition"
            >
              {t.buttons.reject}
            </button>

            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {t.buttons.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieToggle({
  title,
  description,
  icon,
  value,
  disabled = false,
  onChange,
}: CookieToggleProps) {
  return (
    <div className="flex flex-row items-start gap-3 mb-6">
      <div className="w-full">
        <div className="flex flex-row justify-between items-start w-full">
          <div className="font-bold flex items-center gap-3 text-gray-800">
            <div className="bg-red-primary h-10 w-10 rounded-full flex items-center justify-center">
              <Image
                src={icon}
                alt="icon"
                width={40}
                height={40}
                className="h-5 w-5"
              />
            </div>
            <h3 className="font-bold text-[24px] text-gray-800">{title}</h3>
          </div>

          <label
            className={`ml-auto inline-flex items-center ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              className="hidden peer"
              checked={value}
              disabled={disabled}
              onChange={onChange}
            />

            {value ? (
              <Image
                src="/assets/toggle-on.svg"
                alt="Toggle On"
                width={44}
                height={24}
                style={{ transition: "opacity .2s" }}
              />
            ) : (
              <Image
                src="/assets/toggle-of.svg"
                alt="Toggle Off"
                width={44}
                height={24}
                style={{ transition: "opacity .2s" }}
              />
            )}
          </label>
        </div>

        <p className="text-gray-600  mt-2 text-[20px]">{description}</p>
      </div>
    </div>
  );
}
