import { MainHeadingProps } from "@/types";
import React from "react";

const MainHeading = ({
  button,
  center,
  heading1,
  heading2,
  subheading,
  textWhite,
}: MainHeadingProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 w-full my-3  ${
        center
          ? " items-center"
          : "text-center lg:text-left lg:justify-start lg:items-start mx-auto"
      }`}
    >
      {button && (
        <div className="bg-[rgba(240,28,36,0.15)] text-red-primary font-bold py-2 text-center px-10 rounded-sm w-auto whitespace-nowrap">
          {button}
        </div>
      )}

      <h1 className="text-2xl md:text-5xl font-bold uppercase mb-3 text-center">
        <span className={`${textWhite ? "text-white" : "text-black"}`}>
          {heading1}
        </span>
        <span className="bg-linear-to-br from-red-secondary to-red-primary bg-clip-text text-transparent border-b-3 border-red-primary">
          {heading2}
        </span>
      </h1>

      {subheading && (
        <p
          className={`text-[20px] text-[#575757] leading-8 ${
            center ? "text-center max-w-2xl px-2" : ""
          }`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
};

export default MainHeading;
