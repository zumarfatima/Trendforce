"use client";
import { useState, useRef, useEffect } from "react";
import MainHeading from "../common/main-heading";

type faqItemType = {
  question: string;
  answer: string;
};

const FAQs = ({
  faqItem,
  title1,
  title2,
  desc,
}: {
  faqItem: faqItemType[];
  title1: string;
  title2: string;
  desc: string;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-white my-10">
      <div className="container mx-auto text-left px-5">
        <MainHeading
          button="FAQs"
          center={true}
          textWhite={false}
          heading1={title1}
          heading2={title2}
          subheading={desc}
        />
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqItem.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className={`w-full px-2 md:px-6 py-4 text-left flex justify-between items-center transition-colors duration-300 cursor-pointer
                  ${isOpen ? "bg-[#FFE3E699] " : "bg-gray-50"}
                `}
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className={`text-[16px] md:text-xl  ${
                    isOpen
                      ? "text-black font-bold" // Extra bold for open
                      : "text-gray-900 font-semibold" // normal for closed
                  }`}
                >
                  {item.question}
                </span>

                <span className="text-2xl text-foreground font-bold transition-transform duration-300">
                  {isOpen ? "×" : "+"}
                </span>
              </button>

              <div
                ref={(el: HTMLDivElement | null) => {
                  contentRefs.current[index] = el; // assign ref
                }}
                className="overflow-hidden transition-all duration-500 ease-in-out bg-[#FFE3E699]"
                style={{
                  maxHeight: isOpen
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-5 py-2 text-gray-700 text-[16px] leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQs;
