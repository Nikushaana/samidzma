"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function Input1({
  firstValue,
  title,
  placeholder,
  name,
  setAllValues,
  error,
  render,
  isNumber,
  type,
  digit,
  firstIcn,
  isPassword,
  handleInputKeyPress,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  const [show, setshow] = useState(false);
  const handleshow = () => {
    setshow((pre) => !pre);
  };

  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({
        ...prev,
        [name]: inputText,
      }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setInputText("");
    }
  }, [render]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newText = event.target.value;

    if (isNumber) {
      newText = newText
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    if (digit) {
      newText = newText.replace(/[^0-9.]/g, "");
    }

    setInputText(newText);
    setAllValues((prev: any) => ({ ...prev, [name]: newText }));
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div
        className={`rounded-full w-full h-[52px] max-tiny:h-[42px] outline-none py-[6px] px-[15px] flex duration-100 border-[1px] ${
          error
            ? "border-myPink"
            : isFocused
            ? "border-[#E2E2E2]"
            : "bg-[#EEEEEE] border-[#E2E2E2]"
        }`}
      >
        {firstIcn && (
          <div className="h-[100%] rounded-l-[16px] flex justify-center items-center text-[20px]">
            {firstIcn}
          </div>
        )}
        <input
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          value={inputText}
          type={isPassword ? (show ? "text" : "password") : type}
          // type={
          //   isPassword
          //     ? show
          //       ? "text"
          //       : "password"
          //     : time
          //     ? "time"
          //     : color
          //     ? "color"
          //     : "text"
          // }
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`select-none outline-none rounded-[4px] px-[5px] text-[14px] h-full ${
            firstIcn
              ? isPassword
                ? "w-[calc(100%-40px)]"
                : "w-[calc(100%-20px)]"
              : isPassword
              ? "w-[calc(100%-20px)]"
              : "w-full"
          } bg-transparent`}
        />
        {isPassword && (
          <div
            onClick={handleshow}
            className="text-[20px] flex items-center justify-center text-[#010125]"
          >
            {show ? (
              <BsEye className="cursor-pointer" />
            ) : (
              <BsEyeSlash className="cursor-pointer" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
