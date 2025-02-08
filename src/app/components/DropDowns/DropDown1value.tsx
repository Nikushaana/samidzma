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
  notInputStyle,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [value, setValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
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
      if (searchValue) {
        setFilteredData(
          data.filter((item: any) =>
            item.name
              ? item.name.toLowerCase().startsWith(searchValue?.toLowerCase())
              : item.ProdSaxeobaName.toLowerCase().startsWith(
                  searchValue?.toLowerCase()
                )
          )
        );
      } else {
        setFilteredData(data);
      }
    } else {
      setFilteredData(data);
    }
  }, [data, searchable, searchValue]);

  return (
    <div className="flex flex-col gap-y-[5px] w-full">
      {title && <p className="text-[12px] mx-[20px]">{title}</p>}
      <div ref={targetRef} className="relative w-full text-custgray h-full">
        <div
          onClick={() => {
            setDrop((pre) => !pre);
          }}
          className={`w-full py-[6px] px-[20px] flex duration-100 border-[1px] ${
            drop
              ? `${error && "border-myPink"} ${
                  notInputStyle
                    ? "rounded-t-[25px]"
                    : "rounded-t-[25px] max-sm:rounded-t-[22px]"
                }`
              : `rounded-[33px] bg-[#EEEEEE] ${
                  notInputStyle
                    ? ""
                    : `${error ? "border-myPink" : "border-[#E2E2E2]"}`
                }`
          } ${
            notInputStyle ? "h-[42px] bg-white" : "h-[52px] max-sm:h-[42px]"
          } w-full flex gap-[10px] items-center cursor-pointer justify-between`}
        >
          <div className="flex items-center gap-[10px] w-[calc(100%-30px)] h-full text-[14px]">
            {icon && (
              <div className="w-[20px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer">
                {icon}
              </div>
            )}
            {value ? (
              <p
                className={`truncate text-start ${
                  icon ? "w-[calc(100%-40px)]" : "w-full"
                }`}
              >
                {value}
              </p>
            ) : (
              <p
                className={`truncate text-start text-gray-400 ${
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
                ? filteredData?.length >= 6
                  ? 260
                  : searchable
                  ? filteredData?.length * 40 + 70
                  : filteredData?.length * 40 + 20
                : 0
            }px`,
          }}
          className={`absolute w-full bg-[white] shadow border-[1px] flex flex-col ${
            searchable && "gap-y-[10px]"
          } duration-100 overflow-hidden ${
            filteredData?.length >= 6 && "overflow-y-scroll showScrollVert"
          } ${
            drop
              ? `z-[1] py-[10px] ${
                  notInputStyle
                    ? "top-[45px]"
                    : "top-[55px] max-sm:top-[45px] rounded-b-[8px]"
                }`
              : "top-[40px] z-[-2] py-0"
          }`}
        >
          {searchable && (
            <div className="h-[40px] shrink-0 shadow mx-[5px] px-[8px] rounded-[5px] bg-white sticky top-0">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="ძებნა.."
                className={`truncate select-none outline-none h-full text-[13px] bg-transparent ${
                  icon ? "w-[calc(100%-40px)]" : "w-full"
                }`}
              />
            </div>
          )}
          <div>
            {filteredData?.map((item: any, index: any) => (
              <p
                key={index}
                onClick={() => {
                  setValue((prev: any) =>
                    item.name
                      ? prev === item.name
                        ? ""
                        : item.name
                      : prev === item.ProdSaxeobaName
                      ? ""
                      : item.ProdSaxeobaName
                  );
                  setSearchValue("");
                  setDrop(false);
                }}
                className={`px-[10px] flex items-center w-full h-[40px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
                  item.name == value ||
                  (item.ProdSaxeobaName && item.ProdSaxeobaName == value)
                    ? "bg-gray-400"
                    : "hover:bg-gray-300"
                } ${index % 2 === 0 ? "bg-[#F5F7FC]" : ""}`}
              >
                {item.name || item.ProdSaxeobaName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
