"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function DropDownMultipleValue({
  data,
  title,
  name,
  setAllValues,
  firstValue,
  searchable,
  placeholder,
  render,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [drop, setDrop] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (setAllValues && values.length > 0) {
      const ids = values.map((item: any) => item.IdProdSaxeoba);
      setAllValues((prev: any) => ({ ...prev, [name]: ids }));
    }
  }, [values]);

  // useEffect(() => {
  //   setValue(firstValue);
  // }, [firstValue]);

  // useEffect(() => {
  //   if (render) {
  //     setValue("");
  //   }
  // }, [render]);

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
          data.filter(
            (item: any) =>
              item.ProdSaxeobaName &&
              item.ProdSaxeobaName.toLowerCase().startsWith(
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
      <div ref={targetRef} className="relative w-full h-full">
        <div
          onClick={() => {
            setDrop((pre) => !pre);
          }}
          className={`w-full py-[6px] px-[15px] flex duration-100 border-[1px] ${
            drop
              ? "rounded-t-[25px] bg-white"
              : `rounded-[33px] bg-[#EEEEEE] border-[#E2E2E2]`
          } h-[52px] max-sm:h-[42px] w-full flex gap-[10px] items-center cursor-pointer justify-between`}
        >
          <div className="flex items-center w-[calc(100%-30px)] h-full text-[14px] truncate">
            {values.length > 0 ? (
              values.map((item: any, index: number) => (
                <p
                  key={item.IdProdSaxeoba}
                  className={`text-[12px] ${
                    values.length - 1 !== index && "pr-[5px]"
                  }`}
                >
                  {item.ProdSaxeobaName}
                  {values.length - 1 !== index && ","}
                </p>
              ))
            ) : (
              <p className={`truncate text-start text-gray-400`}>
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
          } ${drop ? `z-[5] py-[10px] top-[45px]` : "top-[40px] z-[-2] py-0"}`}
        >
          {searchable && (
            <div className="h-[40px] shrink-0 shadow mx-[5px] px-[8px] rounded-[5px] bg-white sticky top-0">
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="ძებნა.."
                className={`truncate select-none outline-none h-full text-[13px] bg-transparent w-full`}
              />
            </div>
          )}
          <div>
            {filteredData?.map((item2: any, index: any) => (
              <p
                key={item2.IdProdSaxeoba}
                onClick={() => {
                  setValues((prev: any) =>
                    prev.includes(item2)
                      ? prev.filter((item3: any) => item3 !== item2)
                      : [...prev, item2]
                  );
                }}
                className={`px-[10px] flex items-center w-full h-[40px] text-[13px] truncate  cursor-pointer duration-100 select-none ${
                  values.length > 0 && values.includes(item2)
                    ? "bg-gray-400"
                    : "hover:bg-gray-300"
                } ${index % 2 === 0 ? "bg-[#F5F7FC]" : ""}`}
              >
                {item2.ProdSaxeobaName}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
