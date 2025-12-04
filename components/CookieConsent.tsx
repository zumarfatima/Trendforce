"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useTranslation } from "@/context/translation-context";

// Note: I am assuming 'bg-primary' and 'text-secondary' are defined in your Tailwind config.

const CookieModal = () => {
  const { lang } = useTranslation();
  // CORRECTED: 't' must point to 'lang.cookieConsent' as per your provided JSON structure
  const t = lang.cookieConsent ?? {};

  const [showModal, setShowModal] = useState(false);
  const [thirdPartyConsent, setThirdPartyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [strictlyNecessaryConsent, setStrictlyNecessaryConsent] =
    useState(true);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // --- Cookie Initialization Logic (Reading Cookies) ---
  useEffect(() => {
    // ... (rest of the useEffect logic remains the same)
    const consent = Cookies.get("cookie_consent");
    const thirdParty = Cookies.get("third_party_consent");
    const strict = Cookies.get("strictly_necessary_consent");
    const marketing = Cookies.get("marketing_consent");

    if (!consent) {
      setShowModal(true);
    }

    if (thirdParty === "true") {
      setThirdPartyConsent(true);
    }

    if (strict === "false") {
      setStrictlyNecessaryConsent(false);
    }

    if (marketing === "true") {
      setMarketingConsent(true);
    }
  }, []);

  // --- Side Effect: Navbar and Body Scroll Lock (Unchanged logic) ---
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.style.display = showModal ? "none" : "";
    }
  }, [showModal]);

  useEffect(() => {
    if (!showModal) return;

    const scrollY = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    if (modalRef.current) {
      (modalRef.current!.style as any).webkitOverflowScrolling = "touch";
    }

    const shouldBlock = (target: EventTarget | null) =>
      modalRef.current ? !modalRef.current.contains(target as Node) : true;

    const onTouchMove = (e: TouchEvent) => {
      if (shouldBlock(e.target)) e.preventDefault();
    };
    const onWheel = (e: WheelEvent) => {
      if (shouldBlock(e.target)) e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("wheel", onWheel);

      const y = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, y ? -parseInt(y) : 0);
    };
  }, [showModal]);

  // --- Handlers ---
  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365, path: "/" });
    Cookies.set(
      "strictly_necessary_consent",
      strictlyNecessaryConsent.toString(),
      { expires: 365, path: "/" }
    );
    Cookies.set("third_party_consent", thirdPartyConsent.toString(), {
      expires: 365,
      path: "/",
    });
    Cookies.set("marketing_consent", marketingConsent.toString(), {
      expires: 365,
      path: "/",
    });
    setShowModal(false);
  };

  const handleDecline = () => {
    // Note: The new design uses 'handleDecline' for the 'Reject' button.
    // The previous implementation used it to remove ALL cookies.
    // I am retaining the logic from the old design's 'handleReject',
    // which sets a single rejection cookie.

    // Setting a rejection cookie (or clearing all cookies, depending on policy)
    // Based on the 'handleDecline' logic you provided in the second code block,
    // it removes all cookies. We will keep that logic for now.

    setStrictlyNecessaryConsent(false);
    setThirdPartyConsent(false);
    setMarketingConsent(false);

    Cookies.remove("cookie_consent", { path: "/" });
    Cookies.remove("strictly_necessary_consent", { path: "/" });
    Cookies.remove("third_party_consent", { path: "/" });
    Cookies.remove("marketing_consent", { path: "/" });

    setShowModal(false);
  };

  if (!showModal) return null;

  // --- Component Render (Mapping keys to your JSON) ---
  return (
    <div className="fixed inset-0 z-100 backdrop-blur-md bg-black/30 flex items-center justify-center px-3 sm:px-6">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl p-6 md:p-8 max-w-5xl w-full relative shadow-lg text-black overflow-y-auto max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Title and Description */}
        <h2 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2 text-secondary">
          <span className="bg-red-primary rounded-full p-2 text-sm">
            <Image
              src="/assets/home-images/cookies.svg"
              alt="icon"
              width={15}
              height={15}
            />
          </span>
          {t.title} {/* Changed from t.heading1 */}
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-secondary">
          {t.description} {/* Changed from t.desc1 */}
        </p>

        <a
          href="/privacy-policy"
          className="hidden  text-primary font-bold mt-3 md:inline-block"
        >
          {t.learnMore}
        </a>

        {/* 1st point (Essential/Strictly Necessary) */}
        <div className="mt-2 md:mt-3 border-t border-[#E6E6E6] pt-4">
          <div className="flex justify-between items-center mb-1 text-[#575757]">
            <h2 className="text-base text-[16px] md:text-lg font-bold flex items-center gap-2 text-secondary mb-2">
              <span className="bg-red-primary p-2 rounded-full inline-flex items-center justify-center">
                <Image
                  src="/assets/home-images/cookies.svg"
                  alt="icon"
                  width={14}
                  height={14}
                />
              </span>
              {t.sections.essential.title} {/* Changed from t.heading2 */}
            </h2>

            <label className="relative inline-flex items-center cursor-not-allowed">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={strictlyNecessaryConsent}
                readOnly
              />
              <div className="w-8 h-4 bg-red-primary rounded-full peer peer-checked:bg-primary transition" />
              <div className="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4" />
            </label>
          </div>
          <p className="text-xs sm:text-sm text-secondary">
            {t.sections.essential.description}
          </p>{" "}
          {/* Changed from t.desc2 */}
        </div>

        {/* 2nd point (Analytics/Third Party) */}
        <div className="mt-2 md:mt-3 pt-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-base  md:text-lg font-bold flex items-center gap-2 text-secondary mb-2">
              <span className="bg-red-primary p-2 rounded-full inline-flex items-center justify-center">
                <Image
                  src="/assets/home-images/cookies.svg"
                  alt="icon"
                  width={14}
                  height={14}
                />
              </span>
              {t.sections.analytics.title} {/* Changed from t.heading3 */}
            </h3>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={thirdPartyConsent}
                onChange={() => {
                  setThirdPartyConsent((prev) => !prev);
                }}
              />
              <div
                className={`w-8 h-4  rounded-full peer peer-checked:bg-primary transition ${
                  thirdPartyConsent ? "bg-red-primary" : "bg-gray-300"
                }`}
              />
              <div className="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4" />
            </label>
          </div>
          <p className="text-xs sm:text-sm text-secondary">
            {t.sections.analytics.description}
          </p>{" "}
          {/* Changed from t.desc3 */}
        </div>

        <div className="hidden md:block mt-3 pt-3">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-base sm:text-lg font-bold flex items-center gap-2 text-secondary mb-2">
              <span className="bg-red-primary p-2 rounded-full inline-flex items-center justify-center">
                <Image
                  src="/assets/home-images/cookies.svg"
                  alt="icon"
                  width={14}
                  height={14}
                />
              </span>
              {t.sections.marketing.title}
            </h3>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={marketingConsent}
                onChange={() => {
                  setMarketingConsent((prev) => !prev);
                }}
              />
              <div
                className={`w-8 h-4  rounded-full peer peer-checked:bg-primary transition ${
                  marketingConsent ? "bg-red-primary" : "bg-gray-300"
                }`}
              />
              <div className="dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-all peer-checked:translate-x-4" />
            </label>
          </div>
          <p className="text-xs sm:text-sm text-secondary">
            {t.sections.marketing.description}
          </p>{" "}
          {/* Changed from t.desc4 */}
        </div>

        {/* footer */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-center border-t border-[#E6E6E6] pt-4">
          {/* Left Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/assets/home-icon-2.svg"
              alt="logo"
              width={200}
              height={52}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-xs rounded-lg bg-black font-bold text-white transition cursor-pointer"
              onClick={handleDecline} // This button performs decline/reject action
            >
              {t.buttons.reject}{" "}
              {/* Using 'reject' key as this is the reject button */}
            </button>

            <button
              className={`px-4 py-2 text-xs rounded-lg font-bold ${
                strictlyNecessaryConsent
                  ? "bg-red-primary text-white hover:bg-red-400 cursor-pointer"
                  : "bg-primary opacity-30 text-white cursor-not-allowed"
              } transition`}
              disabled={!strictlyNecessaryConsent}
              onClick={handleAccept} // This button performs accept action
            >
              {t.buttons.accept} {/* Using 'accept' key */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
