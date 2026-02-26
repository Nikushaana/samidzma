"use client";

import React, { useEffect, useState } from "react";

export default function Toggle2value({
  name,
  setAllValues,
  firstValue,
  title1,
  title2,
  render,
}: any) {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (setAllValues && value !== undefined) {
      setAllValues((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, [value]);

  useEffect(() => {
    setValue(firstValue);
  }, [firstValue, render]);

  return (
    <div
      onClick={() => {
        setValue(value === title1 ? title2 : title1);
      }}
      className="cursor-pointer flex items-center gap-[5px] h-[20px]"
    >
      <p
        className={`duration-100 ${
          value === title1 ? "text-[black]" : "text-gray-300"
        }`}
      >
        {title1}
      </p>
      <div className={`flex relative h-full w-[40px] rounded-full ${value === title1 ? "bg-gray-200" : "bg-[green]"}`}>
        <div
          className={`absolute  rounded-full duration-100 top-[3px] w-[15px] h-[15px] ${
            value === title1 ? "left-[4px] bg-[black]" : "left-[21px] bg-[white]"
          }`}
        ></div>
      </div>
      <p
        className={`duration-100 ${
          value === title2 ? "text-[black]" : "text-gray-300"
        }`}
      >
        {title2}
      </p>
    </div>
  );
}
