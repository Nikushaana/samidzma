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
  isProducts,
}: any) {
  const { FrontCategoriesData, FrontCategoriesLoader } = useFrontCategories();

  const [sldsPerView, setSldsPerView] = useState<number>(7);

  const screenWidth = useScreenWidth();

  const [actSecCategory, setActSecCategory] = useState<any>({});

  useEffect(() => {
    if (FrontCategoriesData[0]?.IdProdSaxeoba) {
      if (filterValues?.IdProdSaxeoba) {
        setActSecCategory(
          FrontCategoriesData.find(
            (item2: any) => item2.IdProdSaxeoba == filterValues.IdProdSaxeoba
          )
        );
      }
    }
  }, [FrontCategoriesData, filterValues?.IdProdSaxeoba]);

  useEffect(() => {
    if (screenWidth > 1025) {
      setSldsPerView(7);
    } else if (screenWidth <= 1025 && screenWidth > 500) {
      setSldsPerView(4);
    } else if (screenWidth <= 500 && screenWidth > 0) {
      setSldsPerView(3);
    }
  }, [screenWidth]);

  return (
    <div className="mx-[264px] max-2xl:mx-[90px] max-lg:mx-[0px] rounded-[12px] bg-[#EAEDEE] p-[30px] max-lg:p-[0px] flex flex-col gap-y-[10px]">
      <div className="max-lg:mx-[90px] max-tiny:mx-[25px]">
        <WhatUSearch />
      </div>

      <div className="w-full flex flex-col gap-y-[10px]">
        <div className="aspect-[10/2] max-lg:aspect-[3/1] max-tiny:aspect-[6/4] max-lg:mx-[90px] max-tiny:mx-[25px]">
          {FrontCategoriesLoader ? (
            <div
              style={{
                gridTemplateColumns: `repeat(${sldsPerView}, minmax(0, 1fr))`,
              }}
              className={`grid  gap-[20px] max-lg:gap-[12px] w-full h-full`}
            >
              {Array.from({ length: sldsPerView }, (_, i) => i + 1).map(
                (item: any, index: number) => (
                  <div
                    key={item}
                    className="w-full h-full rounded-[12px] loaderwave"
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
              className="h-full"
              speed={1200}
            >
              {FrontCategoriesData.map((item: any, index: any) => (
                <SwiperSlide
                  onClick={() => {
                    setFilterValues((prev: any) => ({
                      ...prev,
                      IdProdSaxeoba: item?.IdProdSaxeoba,
                      ProdSaxeobaName: item?.ProdSaxeobaName,
                      ProdSaxeobaDescription: item?.description,
                      IdProdGroup: "",
                      IdProdType: "",
                      currentPage: 1,
                    }));
                  }}
                  key={item?.IdProdSaxeoba}
                  className={`flex flex-col items-center gap-y-[10px] p-[10px] max-lg:p-[8px] duration-200 cursor-pointer rounded-[12px] ${
                    filterValues?.IdProdSaxeoba == item?.IdProdSaxeoba
                      ? "bg-myGreen "
                      : " bg-white"
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[4px]">
                    <div className="absolute z-[1] top-[10px] overflow-hidden right-[10px] bg-myGreen text-white text-[27px] max-lg:text-[22px] w-[45px] max-lg:w-[36px] aspect-square rounded-full flex items-center justify-center">
                      <FaTree />
                    </div>
                    <Image
                      src={`${
                        item?.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`
                          : "/images/food.png"
                      }`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h1
                    className={`text-center text-[18px] max-tiny:text-[15px] line-clamp-3 ${
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
        {isProducts &&
          !FrontCategoriesLoader &&
          actSecCategory?.productTypeGroup?.length > 0 && (
            <div className="bg-myGreen p-[10px] rounded-[12px] max-lg:rounded-none max-h-[150px] overflow-hidden">
              <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                slidesPerView={
                  screenWidth <= 1025 ? (screenWidth <= 500 ? 4 : 9) : 13
                }
                spaceBetween={7}
                loop={true}
                pagination={false}
                className="w-[calc(100%+100px)] items-stretch self-stretch flex BannerSlider"
              >
                {actSecCategory?.productTypeGroup?.map(
                  (item1: any, index: any) => (
                    <SwiperSlide
                      key={item1.IdProdTypeGroup}
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          IdProdGroup:
                            prev.IdProdGroup == item1.IdProdTypeGroup
                              ? ""
                              : item1.IdProdTypeGroup,
                          IdProdType: "",
                          currentPage: 1,
                        }));
                      }}
                      className={`relative flex flex-col w-full aspect-square cursor-pointer items-center gap-y-[10px] bg-white p-[10px] rounded-[4px] overflow-hidden border-myYellow duration-150 ${
                        filterValues.IdProdGroup == item1.IdProdTypeGroup
                          ? "border-[3px]"
                          : ""
                      }`}
                    >
                      <Image
                        src={`${
                          item1?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/${item1?.image}`
                            : "/images/food.png"
                        }`}
                        alt=""
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <div className="absolute p-[10px] top-0 left-0 bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-end">
                        <p className="text-white text-[12px]">
                          {item1.ProdTypeGroupName}
                        </p>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          )}
        {isProducts &&
          !FrontCategoriesLoader &&
          actSecCategory?.productTypeGroup?.find(
            (item2: any) => item2.IdProdTypeGroup == filterValues.IdProdGroup
          )?.productTypes.length > 0 && (
            <div className="bg-myYellow p-[10px] rounded-[12px] max-lg:rounded-none max-h-[150px] overflow-hidden">
              <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                slidesPerView={
                  screenWidth <= 1025 ? (screenWidth <= 500 ? 4 : 9) : 13
                }
                spaceBetween={7}
                loop={true}
                pagination={false}
                className="w-[calc(100%+100px)]  items-stretch self-stretch flex BannerSlider"
              >
                {actSecCategory?.productTypeGroup
                  ?.find(
                    (item3: any) =>
                      item3.IdProdTypeGroup == filterValues.IdProdGroup
                  )
                  ?.productTypes?.map((item4: any, index: any) => (
                    <SwiperSlide
                      key={item4.IdProdType}
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          IdProdType:
                            prev.IdProdType == item4.IdProdType
                              ? ""
                              : item4.IdProdType,
                          currentPage: 1,
                        }));
                      }}
                      className={`relative flex flex-col w-full aspect-square cursor-pointer items-center gap-y-[10px] bg-white p-[10px] rounded-[4px] overflow-hidden border-white duration-150 ${
                        filterValues.IdProdType == item4.IdProdType
                          ? "border-[3px]"
                          : ""
                      }`}
                    >
                      <Image
                        src={`${
                          item4?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/${item4?.image}`
                            : "/images/food.png"
                        }`}
                        alt=""
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <div className="absolute p-[10px] top-0 left-0 bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-end">
                        <p className="text-white text-[12px]">
                          {item4.ProdTypeName}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
      </div>
    </div>
  );
}
