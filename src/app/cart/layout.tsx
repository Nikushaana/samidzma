"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import CartCalculator from "../components/CartCalculator/CartCalculator";
import { usePathname, useRouter } from "next/navigation";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import { CartAxiosContext } from "../../../dataFetchs/cartContext";
import DotsLoader from "../components/loaders/DotsLoader";
import EverySlider from "../components/sliders/EverySlider";
import useProducts from "../../../dataFetchs/productsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { productsData, productsLoader } = useProducts();

  const { makeOrderLoader } = useContext(CartAxiosContext);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[100px] relative">
        <div className="flex flex-col gap-y-[20px]">
          <WhatUSearch />
          <div
            onClick={() => {
              if (
                pathname.split("/")[3] === "order-completed-successfully" ||
                pathname.split("/")[2] !== "order-placement"
              ) {
                router.push("/");
              } else {
                router.push("/cart");
              }
            }}
            className="flex  items-center gap-[10px] cursor-pointer"
          >
            <MdArrowBackIos className="text-[28px]  max-lg:text-[16px]" />
            <h1 className="text-[28px]  max-lg:text-[14px]">
              {pathname.split("/")[3] === "order-completed-successfully" ||
              pathname.split("/")[2] !== "order-placement"
                ? "მთავარი"
                : "ჩემი კალათა"}
            </h1>
          </div>
          <div
            className={`flex max-lg:flex-col max-lg:w-full gap-[20px] ${
              makeOrderLoader && "pointer-events-none opacity-[0.5]"
            }`}
          >
            <div
              className={`flex flex-col gap-y-[20px] overflow-hidden ${
                pathname.split("/")[3] === "order-completed-successfully"
                  ? "w-full"
                  : "w-[calc(100%-470px)] max-lg:w-full "
              }`}
            >
              {children}
            </div>
            {pathname.split("/")[3] !== "order-completed-successfully" && (
              <CartCalculator />
            )}
          </div>
        </div>

        {(pathname.split("/")[3] === "order-completed-successfully" ||
          (pathname.split("/")[1] === "cart" &&
            pathname.split("/")[2] !== "order-placement")) && (
          <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
            <EverySlider
              data={productsData}
              loader={productsLoader}
              title={<h1 className="text-[28px]">შენთვის რეკომენდებული</h1>}
              card="ProductCard"
              slidesPerView={4}
              spaceBetween={17}
              showButtons={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
