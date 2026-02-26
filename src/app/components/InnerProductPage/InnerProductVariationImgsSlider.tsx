"use client";

import React, { useContext, useRef } from "react";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useScreenWidth from "../ScreenWidth";
import Image from "next/image";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function InnerProductVariationImgsSlider({
  mainLoader,
  mainId,
  prodVariationImages,
  variation,
  openRecomendedPopUp,
  setVariationProdId,
  isProductNakrebi,
  setActiveNakrebebi,
}: any) {
  const { slugify } = useContext(ContextForSharingStates);
  let SmallSwiperRef = useRef<SwiperClass>(null!);

  const screenWidth = useScreenWidth();

  return (
    <div
      className={`flex relative group bg-myGreen rounded-[12px] p-[10px]  ${
        prodVariationImages.length > 0 ? "" : "hidden"
      }`}
    >
      {mainLoader ? (
        <div
          style={{
            gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
          }}
          className="grid grid-rows-2 gap-[10px] w-full"
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map(
            (item: any, index: number) => (
              <div
                key={index}
                className="w-full shrink-0 rounded-[12px] loaderwave overflow-hidden"
              >
                <div className="h-[87px]"></div>
              </div>
            )
          )}
        </div>
      ) : (
        prodVariationImages?.length > 0 && (
          <div className="relative w-full">
            <Swiper
              modules={[Grid, Pagination]}
              slidesPerView={
                screenWidth >= 600 ? 4 : screenWidth >= 500 ? 3 : 2
              }
              grid={{
                rows: screenWidth >= 500 ? 2 : 1,
              }}
              spaceBetween={10}
              loop={false}
              className={`h-[180px] max-[500px]:h-[80px]`}
              onBeforeInit={(swiper) => {
                SmallSwiperRef.current = swiper;
              }}
              speed={400}
            >
              {prodVariationImages?.map((item: any, index: any) => (
                <SwiperSlide
                  key={item.ID || index}
                  onClick={() => {
                    if (isProductNakrebi) {
                      setActiveNakrebebi({
                        ProdCode: item?.ProdCode,
                        ProdName: item.ProdName,
                        Quantity: item.Quantity,
                      });
                    } else if (openRecomendedPopUp) {
                      setVariationProdId(item?.ProdCode);
                    } else {
                      window.history.replaceState(
                        null,
                        "/products",
                        `/products/${
                          slugify(item.ProductName || item.ProdName) +
                          "_" +
                          mainId
                        }?variation=${item?.ProdCode}`
                      );
                    }
                  }}
                  className={`rounded-[12px] h-full w-full bg-white overflow-hidden cursor-pointer border-[2px] ${
                    variation === item?.ProdCode ? " border-myYellow" : ""
                  }`}
                >
                  <div className="relative h-full w-full flex items-center justify-center ">
                    {item?.main_image || isProductNakrebi ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${
                          isProductNakrebi
                            ? `uploads/productImage/product_${item?.ProdCode}_main.jpg`
                            : item?.main_image
                        }`}
                        alt={
                          item?.ProductNameRUS ||
                          item?.ProductName ||
                          item?.ProdName ||
                          "სამი ძმა"
                        }
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <p className="text-center text-[14px]">
                        ფოტო არ არსებობს
                      </p>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`absolute top-[50%] bg-[white] group-hover:shadow group-hover:shadow-myGreen translate-y-[-50%] left-[10px] max-lg:shadow z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] active:bg-myGreen active:text-white duration-100 rounded-full`}
              onClick={() => SmallSwiperRef.current?.slidePrev()}
            >
              <BiChevronLeft className="" />
            </button>
            <button
              className={`absolute top-[50%] bg-[white] group-hover:shadow group-hover:shadow-myGreen translate-y-[-50%] right-[10px] max-lg:shadow z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] active:bg-myGreen active:text-white duration-100 rounded-full`}
              onClick={() => SmallSwiperRef.current?.slideNext()}
            >
              <BiChevronRight className="" />
            </button>
          </div>
        )
      )}
    </div>
  );
}
