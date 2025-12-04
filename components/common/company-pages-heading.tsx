"use client";

interface HeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  date?: string;
  date2: string;
  highlightColor?: string; // optional dynamic color
}

export default function PrivacyHeader({
  title,
  highlight,
  subtitle,
  date2,
  date,
  highlightColor = "#d62828", // default red
}: HeaderProps) {
  return (
    <div className="w-full py-20 bg-[radial-gradient(circle_at_center,#fde8e8,white)] text-center">
      <h1 className="text-4xl md:text-[86px] font-bold text-gray-900">
        {title}{" "}
        <span
          className="underline underline-offset-8 font-bold"
          style={{ color: highlightColor }}
        >
          {highlight}
        </span>
      </h1>

      <p className="mt-5 text-gray-600 text-[20px]">{subtitle}</p>

      <p className="mt-5 text-gray-800 font-bold text-[20px] ">
        <span>{date2}</span>
        <span className="font-normal text-gray-800">{date}</span>
      </p>
    </div>
  );
}
