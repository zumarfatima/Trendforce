"use client";

import React from "react";

const TableOfContents = ({ items, active, onSelect }: any) => {
  return (
    <div className="hidden md:block w-auto bg-white rounded-xl   my-5 shadow-sm sticky top-5 h-fit border border-[#fde8e8]">
      <h3 className="font-bold text-2xl my-4 px-4">Table of Content</h3>

      <ul className="space-y-2">
        {items.map((item: any, index: number) => (
          <li
            key={index}
            className={`cursor-pointer px-3 py-2  transition ${
              active === item.id
                ? "bg-red-100 text-red-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
