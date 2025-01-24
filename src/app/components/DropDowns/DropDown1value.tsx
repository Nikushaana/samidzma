"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDown1value({
  data,
  icon,
  placeholder,
  title,
  error,
  name,
  setAllValues,
  firstValue,
  searchable,
  render,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [value, setValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (setAllValues && value !== undefined) {
      setAllValues((prev: any) => ({ ...prev, [name]: value }));
    }
  }, [value]);

  useEffect(() => {
    setValue(firstValue);
  }, [firstValue]);

  useEffect(() => {
    if (render) {
      setValue("");
    }
  }, [render]);

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

  useEffect(() => {
    if (drop) {
      inputRef.current?.focus();
    }
  }, [drop]);

  // search

  useEffect(() => {
    if (searchable) {
      if (value) {
        setFilteredData(
          data.filter((item: any) =>
            item.name || item.ProdSaxeobaName.toLowerCase().startsWith(value?.toLowerCase())
          )
        );
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData(data);
    }
  }, [data, searchable, value]);

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div ref={targetRef} className="relative w-full text-custgray h-full">
        <div
          onClick={() => {
            setDrop((pre) => !pre);
          }}
          className={`rounded-full w-full h-[42px] py-[6px] px-[20px] flex bg-white duration-100 border-[1px] ${
            error ? "border-myPink" : drop ? " " : "bg-[#EEEEEE] "
          } w-full flex gap-[10px] items-center cursor-pointer justify-between`}
        >
          <div className="flex items-center gap-[10px] w-[calc(100%-30px)] h-full">
            {icon && (
              <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
                {icon}
              </div>
            )}
            {searchable ? (
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={`text-[14px] truncate select-none outline-none h-full bg-transparent ${
                  icon ? "w-[calc(100%-40px)]" : "w-full"
                }`}
              />
            ) : value ? (
              <p
                className={`text-[14px] truncate text-start ${
                  icon ? "w-[calc(100%-40px)]" : "w-full"
                }`}
              >
                {value}
              </p>
            ) : (
              <p
                className={` truncate text-start text-gray-400 ${
                  icon ? "w-[calc(100%-40px)]" : "w-full"
                }`}
              >
                {placeholder}
              </p>
            )}
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
              drop
                ? filteredData?.length > 6
                  ? 250
                  : filteredData?.length * 40 + 10
                : 0
            }px`,
          }}
          className={`absolute rounded-[8px] w-full bg-[white] shadow border-[1px] duration-100 overflow-hidden ${
            filteredData?.length > 6 && "overflow-y-scroll showScrollVert"
          } ${drop ? `top-[50px] z-[1] py-[5px]` : "top-[40px] z-[-2] py-0"}`}
        >
          {filteredData?.map((item: any, index: any) => (
            <p
              key={index}
              onClick={() => {
                setValue(item.name || item.ProdSaxeobaName);
                setDrop(false);
              }}
              className={`px-[10px] flex items-center w-full h-[40px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
                (item.name == value || item.ProdSaxeobaName && item.ProdSaxeobaName == value) ? "bg-gray-200" : "hover:bg-gray-300"
              } ${index % 2 === 0 ? "bg-[#F5F7FC]" : ""}`}
            >
              {item.name || item.ProdSaxeobaName}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
