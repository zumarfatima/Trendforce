"use client";
import { useTranslation } from "@/context/translation-context";
import { AdvantageCard } from "@/types";
import Image from "next/image";

export default function TrendforceAdvantage() {
  const { lang } = useTranslation();
  const t = lang.advantageSection;

  const cards: AdvantageCard[] = t.cards;

  return (
    <section className="bg-[#FCECEC] py-16 my-10">
      <div className="container mx-auto px-5 flex flex-col lg:flex-row items-center gap-14">
        {/* LEFT Illustration */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/assets/home-images/advantage.svg"
            alt="Team Illustration"
            height={400}
            width={400}
            className="w-full max-w-md xl:max-w-xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 xl:w-auto flex flex-col justify-center items-center lg:justify-start lg:items-start">
          <div className="flex flex-col items-center justify-center md:items-start">
            <p className="text-red-primary mb-3 bg-[#ED1C2414] font-bold py-2 px-6 rounded-sm w-auto whitespace-nowrap">
              {t.badge}
            </p>

            <h2 className="text-2xl mt-3 sm:text-3xl lg:text-4xl text-center sm:text-left font-extrabold leading-tight max-w-lg">
              {t.title}{" "}
              <span className="bg-linear-to-br from-red-secondary to-red-primary bg-clip-text text-transparent border-b-3 border-red-primary">
                {t.highlight}
              </span>
            </h2>
          </div>

          {/* CARD LIST */}
          <div className="mt-10 flex flex-col gap-6">
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-white py-6 px-4 rounded-2xl shadow-md flex flex-col gap-2 items-start max-w-[600px] xl:max-w-[750px]"
              >
                <div className="flex flex-row items-center gap-2 md:gap-2">
                  <div className="bg-[#FFE3E6A1] h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full">
                    <Image
                      src={
                        i === 0
                          ? "/assets/home-images/idea.svg"
                          : i === 1
                          ? "/assets/home-images/bars.svg"
                          : "/assets/home-images/results.svg"
                      }
                      alt="service-icon"
                      width={40}
                      height={40}
                      className="h-5 w-5"
                    />
                  </div>

                  <h4 className="text-[18px] font-bold">{card.title}</h4>
                </div>

                <p className="text-gray-600 text-[16px] md:text-lg">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
