"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import DotsLoader from "../loaders/DotsLoader";
import GreenButton from "../buttons/greenButton";

export default function KitCard({ item, slidesPerView }: any) {
  const router = useRouter();

  return (
    <div
      className={`rounded-[12px] ${
        slidesPerView === 1
          ? "grid grid-cols-2 max-lg:grid-cols-1 max-lg:p-[20px] max-lg:bg-white"
          : "flex flex-col p-[20px] bg-white"
      } justify-between gap-[40px] max-2xl:gap-y-[20px]`}
    >
      <div className="flex flex-col gap-y-[12px]">
        <div
          onClick={() => {
            router.push(`/catalog-for-set`);
          }}
          className={`relative cursor-pointer w-full max-h-[350px] ${
            slidesPerView === 1
              ? "h-full rounded-[10px] max-lg:rounded-[4px] max-lg:aspect-[4/3]  bg-white"
              : "aspect-[4/3] rounded-[4px]"
          } overflow-hidden`}
        >
          <Image
            src="/images/forslider5.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        <h1
          className={`text-[22px] max-2xl:text-[20px] ${
            slidesPerView === 1 ? "hidden max-lg:flex" : ""
          }`}
        >
          დაფქული დარიჩინი
        </h1>
        <p
          className={`text-[14px] px-[10px] max-2xl:px-0 ${
            slidesPerView === 1 ? "hidden max-lg:flex" : ""
          }`}
        >
          დარიჩინის არომატული ფხვნილი იდეალურია ცხობისთვის და ცხელი
          სასმელებისთვის
        </p>
      </div>

      <div
        className={`flex flex-col gap-y-[12px] ${
          slidesPerView === 1 ? "justify-between max-lg:justify-normal" : ""
        }`}
      >
        <h1
          className={`text-[28px] text-white ${
            slidesPerView === 1 ? "max-lg:hidden" : "hidden"
          }`}
        >
          დაფქული დარიჩინი
        </h1>
        <div className={`${slidesPerView === 1 ? "max-lg:hidden" : "hidden"} bg-[#D3D3D3] h-[5px] rounded-full`}>
          <div className="w-[45%] bg-myGreen h-full rounded-full">
            
          </div>
        </div>
        <div className={`${slidesPerView === 1 ? "max-lg:hidden" : "hidden"}`}>
          <ul className="grid grid-cols-3 gap-[20px]">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item1: any, index: number) => (
              <li
                key={item1}
                className="list-inside list-disc marker:text-myYellow text-[#F7F7F7] text-[14px]"
              >
                Product #{item1}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between pl-[10px]  max-2xl:pl-0">
          <h1
            className={`${
              slidesPerView === 1 ? "text-[34px] max-lg:text-[20px] max-lg:text-[black] text-white" : "text-[20px]"
            }`}
          >
            15₾
          </h1>
          <div
            className={`items-center gap-[12px] ${
              slidesPerView === 1 ? "hidden max-lg:flex" : "flex"
            }`}
          >
            <div className="relative bg-myGreen text-white shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer">
              <BsCart3 />
            </div>
            <div className="relative bg-myYellow text-black shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer">
              <FaRegHeart />
            </div>
            <div
              onClick={() => {}}
              className="relative bg-myGray text-black shrink-0 flex items-center justify-center text-[23px] w-[38px] h-[38px] rounded-full cursor-pointer"
            >
              <PiCornersOutLight />
            </div>
          </div>
        </div>

        <div className={`${slidesPerView === 1 ? "w-[280px] max-lg:w-full" : ""}`}>
          <GreenButton
            name="ყიდვა"
            style="h-[56px] max-sm:h-[48px] text-[18px]"
          />
        </div>
      </div>
    </div>
  );
}
