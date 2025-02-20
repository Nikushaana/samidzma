"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import WhatUSearch from "../Inputs/WhatUSearch";
import { FaTree } from "react-icons/fa";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import useScreenWidth from "../ScreenWidth";
import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";

export default function FirstCatPart({
  filterValues,
  setFilterValues,
  setCurrentPage,
}: any) {
  const { FrontCategoriesData, FrontCategoriesLoader } = useFrontCategories();

  const [sldsPerView, setSldsPerView] = useState<number>(7);

  const screenWidth = useScreenWidth();

  useEffect(() => {
    if (screenWidth > 1025) {
      setSldsPerView(5);
    } else if (screenWidth <= 1025 && screenWidth > 500) {
      setSldsPerView(4);
    } else if (screenWidth <= 500 && screenWidth > 0) {
      setSldsPerView(3);
    }
  }, [screenWidth]);

  return (
    <div className="mx-[264px] max-2xl:mx-[90px] max-lg:mx-[0px] rounded-[12px] bg-[#EAEDEE] p-[30px] max-lg:px-[0px] max-lg:py-[10px] flex flex-col gap-y-[10px]">
      <div className="max-lg:mx-[90px] max-md:mx-[25px]">
        <WhatUSearch />
      </div>

      <div className="w-full flex flex-col gap-y-[10px]">
        <div className="max-lg:mx-[90px] max-md:mx-[25px] overflow-hidden">
          {FrontCategoriesLoader ? (
            <div
              style={{
                gridTemplateColumns: `repeat(${sldsPerView}, minmax(0, 1fr))`,
              }}
              className={`grid  gap-[20px] max-lg:gap-[12px] w-[calc(100%+5vw)] max-md:w-[calc(100%+20vw)] h-[250px] max-md:h-[180px] `}
            >
              {Array.from({ length: sldsPerView }, (_, i) => i + 1).map(
                (item: any, index: number) => (
                  <div
                    key={item}
                    className="w-full h-full rounded-[12px] loaderwave overflow-hidden"
                  ></div>
                )
              )}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              slidesPerView={sldsPerView}
              spaceBetween={screenWidth <= 1025 ? 12 : 20}
              loop={true}
              pagination={false}
              className="h-full w-[calc(100%+5vw)] max-md:w-[calc(100%+20vw)] "
              speed={1200}
            >
              {FrontCategoriesData.map((item: any, index: any) => (
                <SwiperSlide
                  onClick={() => {
                    setFilterValues((prev: any) => ({
                      ...prev,
                      IdProdSaxeoba:
                        prev.IdProdSaxeoba == item?.IdProdSaxeoba
                          ? ""
                          : item?.IdProdSaxeoba,
                      
                      IdProdTypeGroup: "",
                      IdProdType: "",
                    }));
                    setCurrentPage(0);
                  }}
                  key={item?.IdProdSaxeoba}
                  className={`flex flex-col items-center duration-200 cursor-pointer rounded-[12px] overflow-hidden ${
                    filterValues?.IdProdSaxeoba == item?.IdProdSaxeoba
                      ? "bg-myGreen "
                      : " bg-white"
                  }`}
                >
                  <div className="relative w-full h-[100px] shrink-0 overflow-hidden">
                    {/* <div className="absolute z-[1] top-[10px] overflow-hidden right-[10px] bg-myGreen text-white text-[27px] max-lg:text-[22px] w-[45px] max-lg:w-[36px] aspect-square rounded-full flex items-center justify-center">
                      <FaTree />
                    </div> */}
                    {item?.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full relative">
                        <div className="w-[80%] h-[80%] relative">
                          <Image
                            src="/images/siteLogo.png"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <h1
                    className={`w-full h-[80px] flex items-center justify-center text-center p-[10px] max-md:p-[5px] max-tiny:text-[14px] ${
                      filterValues?.IdProdSaxeoba == item?.IdProdSaxeoba
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {item?.ProdSaxeobaName}
                  </h1>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
