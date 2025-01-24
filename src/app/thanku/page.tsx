"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import CartCalculator from "../components/CartCalculator/CartCalculator";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import EverySlider from "../components/sliders/EverySlider";
import useProducts from "../../../dataFetchs/productsContext";

export default function Page() {
  const { productsData } = useProducts();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      
    <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[30px] relative">
      <WhatUSearch />

      <div className="h-[50vh] flex items-center justify-center">
        <div className="relative flex flex-col gap-y-[10px] items-center justify-center">
          <div className="absolute top-[30px] left-[50%] translate-x-[-220px] max-tiny:translate-x-[-160px] rotate-[270deg] w-[100px] h-[80px]">
            <Image
              src="/images/starsimg.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="relative w-[100px] h-[80px]">
            <Image
              src="/images/starsimg2.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="absolute top-[30px] right-[50%] translate-x-[220px] max-tiny:translate-x-[160px] w-[100px] h-[80px]">
            <Image
              src="/images/starsimg.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <h1 className="text-[48px] max-tiny:text-[28px]">მადლობა!</h1>
          <h1 className="text-[22px] max-tiny:text-[18px]">
            შენი შეკვეთა მიღებულია.
          </h1>
          <p className="text-[14px]">დაელოდე ზარს კურიერისგან.</p>
        </div>
      </div>

      <div className="p-[30px] max-lg:p-0 ">
        <EverySlider
          data={productsData}
          title={
            <h1 className="text-[28px] max-tiny:text-[22px]">
              შეიძლება ამ პროდუქტებით დაინტერესდე
            </h1>
          }
          card="ProductCard"
          slidesPerView={4}
          spaceBetween={17}
          showButtons={true}
        />
      </div>
    </div>
    </div>

  );
}
