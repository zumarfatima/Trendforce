import HeroSection from "./hero-section";
import ServicesSection from "./services-section";
import AboutUs from "./about-us-section";
import TrendforceAdvantage from "./trend-force-advantage";
import FAQsSection from "./faqs-section";
import StartNowSection from "./start-now-section";
import ContactUs from "./contact-us";

const HomePage = () => {
  return (
    <>
      <div className="container mx-auto px-5 md:px-15">
        <HeroSection />
        <ServicesSection />
        <AboutUs />
      </div>
      <div className="">
        <TrendforceAdvantage />
      </div>
      <div className="container mx-auto px-5 md:px-15">
        <FAQsSection />
        <StartNowSection />
        <ContactUs />
      </div>
    </>
  );
};

export default HomePage;
