"use client";

import React, { useEffect, useRef, useState } from "react";
import { BsXLg } from "react-icons/bs";

import "react-time-picker/dist/TimePicker.css";

export default function InputTime({
  title,
  placeholder,
  firstValue,
  name,
  setAllValues,
  error,
  render,
}: any) {
  const timeRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (render) {
      setInputText("");
    }
  }, [render]);

  useEffect(() => {
    if (firstValue) {
      setInputText(firstValue);
    }
  }, [firstValue]);

  useEffect(() => {
      if (setAllValues) {
        setAllValues((prev: any) => ({
          ...prev,
          [name]: inputText,
        }));
      }
    }, [inputText]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFormat = (date: Date | any) => {
    setInputText(date);
    // setAllValues((prev: any) => ({ ...prev, [name]: date }));
  };

  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}

      <div ref={timeRef} className="relative">
        <div
          onClick={() => setIsFocused((prev) => !prev)}
          className={`rounded-full w-full h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] ${
            error
              ? "border-myPink"
              : isFocused
              ? "border-[#E2E2E2]"
              : "bg-[#EEEEEE] border-[#E2E2E2]"
          }`}
        >
          <p
            className={`truncate text-start px-[5px] text-[14px] w-[calc(100%-20px)] ${
              inputText ? "" : "text-gray-400"
            }
              `}
          >
            {inputText || placeholder}
            {inputText && ":00"}
          </p>
          {inputText && (
            <div
              onClick={() => {
                setInputText("");
              }}
              className="flex items-center justify-center text-[#010125]"
            >
              <BsXLg className="cursor-pointer" />
            </div>
          )}
        </div>

        {isFocused && (
          <div className="absolute z-10 bg-white shadow-lg mt-2 rounded-xl max-h-[200px] overflow-y-auto w-full p-2 grid grid-cols-4 gap-2 text-sm showScrollVert">
            {hours.map((h) => (
              <div
                key={h}
                onClick={() => handleFormat(h)}
                className="hover:bg-[#e0e0e0] p-2 rounded-lg text-center cursor-pointer"
              >
                {h}:00
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
