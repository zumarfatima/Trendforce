import HeroSection from "./hero-section";
import ServicesSection from "./services-section";
import AboutUs from "./about-us-section";
import TrendforceAdvantage from "./trend-force-advantage";
import FAQsSection from "./faqs-section";
import StartNowSection from "./start-now-section";
import ContactUs from "./contact-us";
import CookieConsent from "../CookieConsent";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto">
        <HeroSection />
        <ServicesSection />
        <AboutUs />
      </div>
      <div className="">
        <TrendforceAdvantage />
      </div>
      <FAQsSection />
      <div className="container mx-auto">
        <StartNowSection />
        <ContactUs />
      </div>
    </>
  );
};

export default HomePage;
