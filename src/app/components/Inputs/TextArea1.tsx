"use client";

import React, { ChangeEvent, useEffect, useState } from "react";

export default function TextArea1({
  firstValue,
  title,
  placeholder,
  name,
  setAllValues,
  error,
  isNumber,
  digit,
  handleInputKeyPress,
  render,
}: any) {
  const [isFocused, setIsFocused] = useState(false);

  const [inputText, setInputText] = useState<string>();

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: inputText }));
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

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
      newText = newText.replace(/[^0-9]/g, "");
    }

    setInputText(newText);
  };

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div
        className={`rounded-[22px] py-[6px] w-full outline-none px-[15px] flex duration-100 border-[1px] ${
          error
            ? "border-myPink"
            : isFocused
            ? "border-[#E2E2E2]"
            : "bg-[#EEEEEE] border-[#E2E2E2]"
        }`}
      >
        <textarea
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          value={inputText}
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`select-none outline-none rounded-[4px] px-[5px] bg-transparent min-h-[150px] text-[14px] w-full showScrollVert`}
        ></textarea>
      </div>
    </div>
  );
}
