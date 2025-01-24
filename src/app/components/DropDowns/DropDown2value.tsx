"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDown2value({
  data,
  icon,
  placeholder,
  name,
  setAllValues,
  firstValue,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState(false);
  const [values, setValues] = useState<any>([]);

  const handleAddValueInData = (item: any) => {
    const isSelected = values.includes(item);

    if (isSelected) {
      setValues((prevData: any) =>
        prevData.filter((value: any) => value !== item)
      );
    } else {
      setValues((prevData: any) => [...prevData, item]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={targetRef} className="relative w-full h-full text-custgray">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className="rounded-[8px] w-full h-full flex items-center cursor-pointer justify-between"
      >
        <div className="flex items-center gap-[10px] w-[calc(100%-30px)]">
          {icon && (
            <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
              {icon}
            </div>
          )}

          <div
            className={`flex items-center gap-[10px] truncate ${
              icon ? "w-[calc(100%-30px)]" : "w-full"
            }`}
          >
            {values.length > 0 ? (
              values.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center px-[15px] bg-[#3e7c7f56] text-[#3E7C7F] rounded-full py-[4px] cursor-pointer"
                >
                  <p className="text-[10px]">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-[14px]">{placeholder}</p>
            )}
          </div>
        </div>
        <div
          className={`w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer `}
        >
          <IoIosArrowDown
            className={`duration-200 ${drop ? "rotate-[180deg]" : ""}`}
          />
        </div>
      </div>
      <div
        style={{
          height: `${
            drop ? (data?.length > 6 ? 190 : data?.length * 30 + 10) : 0
          }px`,
        }}
        className={`absolute rounded-[8px] w-full bg-[white] shadow border-[1px] duration-100 ${
          data?.length > 6 && "overflow-y-scroll showScrollVert"
        } ${drop ? `top-[50px] z-[1] py-[5px]` : "top-[40px] z-[-1] py-0 overflow-hidden"}`}
      >
        {data?.map((item: any, index: any) => (
          <div
            key={index}
            onClick={() => {
              handleAddValueInData(item.text);
            }}
            className={`px-[10px] gap-[10px] flex items-center w-full h-[30px] text-[13px] truncate hover:bg-gray-100 cursor-pointer duration-100 select-none ${
              index % 2 === 0 ? "bg-[#F5F7FC]" : ""
            }`}
          >
            <div
              className={`w-[20px] h-[20px] flex items-center justify-center text-[10px] rounded-[8px] border-[1px] shadow text-white duration-100 ${
                values.includes(item.text) ? "bg-[#58c558]" : "bg-white"
              }`}
            >
              <FaCheck />
            </div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
