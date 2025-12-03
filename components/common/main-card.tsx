import { MainCardProps } from "@/types";
import Image from "next/image";

const MainCard = ({ src, heading, subheading }: MainCardProps) => {
  return (
    <div className="relative bg-white shadow-lg flex flex-col items-center p-5 pt-16 rounded-lg border border-gray-100">
      {/* Floating icon */}
      <div className="absolute -top-8 bg-red-primary w-16 h-16 flex items-center justify-center rounded-full shadow-lg">
        <Image
          src={src}
          alt="service-icon"
          width={40}
          height={40}
          className="h-10 w-10"
        />
      </div>

      {/* Content */}
      <h1 className="font-bold text-center">{heading}</h1>
      <p className="text-center mt-2">{subheading}</p>
    </div>
  );
};

export default MainCard;
