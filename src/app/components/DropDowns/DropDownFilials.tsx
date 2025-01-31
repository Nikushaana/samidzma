"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function DropDownFilials({ stock }: any) {
  const [droped, setDroped] = useState(false);

  return (
    <div className="border-y-[1px] self-start max-lg:w-full px-[10px] max-tiny:px-0">
      <div
        onClick={() => {
          setDroped((prev: any) => !prev);
        }}
        className="flex items-center justify-between gap-[50px] max-tiny:gap-[10px] h-[56px] cursor-pointer"
      >
        <div className="flex items-center gap-[10px]">
          <CiLocationOn />
          <p className="text-[14px] max-tiny:text-[13px]">
            ხელმისაწვდომია{" "}
            <span className="font-semibold">{stock.length || 0}</span> ფილიალში
          </p>
        </div>
        <FiChevronDown
          className={`text-[17px] duration-200 ${
            droped ? "" : "rotate-[-180deg]"
          }`}
        />
      </div>
      <div
        className={`flex flex-col gap-y-[10px] duration-200 ${
          droped ? "pb-[5px] showScrollVert" : "py-0"
        }`}
        style={{
          height:
            stock.length > 0
              ? stock.length > 4
                ? droped
                  ? 120
                  : 0
                : droped
                ? stock.length * 30
                : 0
              : droped
              ? 40
              : 0,
          overflowY: stock.length > 4 ? "scroll" : "hidden",
        }}
      >
        {stock.length > 0 ? (
          stock?.map((item: any, index: any) => (
            <div
              key={index}
              className="pr-[10px] text-[14px] max-tiny:text-[13px] flex items-center justify-between h-[20px]"
            >
              <p className="text-myGreen ">{item.StoreName}</p>{" "}
              <p className="text-[12px]">{item.ProdNashtebi[0].Nashti} ცალი</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-[13px]">
            ფილიალებში მარაგი ამოიწურა
          </p>
        )}
      </div>
    </div>
  );
}
