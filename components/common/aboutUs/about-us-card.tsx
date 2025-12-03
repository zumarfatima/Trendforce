import { aboutUsCardProps } from "@/types";
import Image from "next/image";

export const AboutUSCard = ({ src, heading, subheading }: aboutUsCardProps) => {
  return (
    <div className=" bg-white border border-gray-100 shadow-lg p-5 space-y-3 rounded-xl">
      <div className="bg-[#FFE3E6A1] h-18 w-18 flex items-center justify-center rounded-full">
        <Image
          src={src}
          alt="about-us"
          width={100}
          height={100}
          className="h-10 w-10 "
        />
      </div>
      <h1 className="text-3xl font-bold">{heading}</h1>
      <p className="text-[#575757] text-[16px]">{subheading}</p>
    </div>
  );
};
