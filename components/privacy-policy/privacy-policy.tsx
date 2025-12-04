import React from "react";
import PrivacyPolicySection from "./privacy-policy-section";
import StartNowSection from "../home/start-now-section";
import ContactUs from "../home/contact-us";

const MainPrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-5 md:px-15">
      <PrivacyPolicySection />
      <StartNowSection />
      <ContactUs />
    </div>
  );
};

export default MainPrivacyPolicy;
