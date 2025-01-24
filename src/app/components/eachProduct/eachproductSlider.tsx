"use client";

import React, { useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { EffectFade } from "swiper/modules";

import Image from "next/image";
import useScreenWidth from "../ScreenWidth";
import { usePathname, useRouter } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function EachProductSlider({
  prodMainImages,
  prodVariationImages,
  variation,
  mainId,
  mainLoader,
  activeImagessLoader,
  openRecomendedPopUp,
  setVariationProdId,
}: any) {
  let MainSwiperRef = useRef<SwiperClass>(null!);
  let SmallSwiperRef = useRef<SwiperClass>(null!);

  const screenWidth = useScreenWidth();

  return (
    <div className="w-full h-full max-tiny:h-[400px] ">
      <div className="flex flex-col w-full h-full  gap-[10px] group">
        <div className="w-full flex items-center justify-center h-[calc(100%-97px)] ">
          {mainLoader ? (
            <div className="h-full w-full">
              <div className="w-full h-full rounded-[12px] loaderwave"></div>
            </div>
          ) : prodMainImages.length > 0 ? (
            <Swiper
              modules={[EffectFade]}
              slidesPerView={1}
              loop={true}
              pagination={false}
              className={`w-full h-full ${
                activeImagessLoader && "opacity-[0.7]"
              }`}
              onBeforeInit={(swiper) => {
                MainSwiperRef.current = swiper;
              }}
              speed={1200}
            >
              {prodMainImages?.map((item: any, index: any) => (
                <SwiperSlide key={item.ID}>
                  <div className="rounded-[20px] w-full h-full bg-white overflow-hidden">
                    <Image
                      src={`data:image/png;base64,${item?.ProductPictureByte}`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
          )}
        </div>
        <div className="flex relative group h-[87px]">
          {mainLoader ? (
            <div
              style={{
                gridTemplateColumns: `repeat(${
                  screenWidth >= 500 ? 5 : 4
                }, minmax(0, 1fr))`,
              }}
              className="grid gap-[10px] h-full w-full"
            >
              {Array.from(
                { length: screenWidth >= 500 ? 5 : 4 },
                (_, i) => i + 1
              ).map((item: any, index: number) => (
                <div
                  key={item}
                  className="w-full h-full rounded-[12px] loaderwave"
                ></div>
              ))}
            </div>
          ) : (
            <div className="relative w-full h-full ">
              <Swiper
                modules={[EffectFade]}
                slidesPerView={screenWidth >= 500 ? 5 : 4}
                direction="horizontal"
                spaceBetween={10}
                loop={true}
                pagination={false}
                className="w-full h-full"
                onBeforeInit={(swiper) => {
                  SmallSwiperRef.current = swiper;
                }}
                speed={400}
              >
                {prodVariationImages?.map((item: any, index: any) => (
                  <SwiperSlide key={item.ID}>
                    <div
                      onClick={() => {
                        if (openRecomendedPopUp) {
                          setVariationProdId(item?.ProductCode);
                        } else {
                          window.history.replaceState(
                            null,
                            "/products",
                            `/products/${mainId}?variation=${item?.ProductCode}`
                          );
                        }
                      }}
                      className={`rounded-[12px] w-full h-full p-[10px] bg-white overflow-hidden cursor-pointer ${
                        variation === item?.ProductCode
                          ? "border-[1px] border-myGreen"
                          : ""
                      }`}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        {item?.ProductPictureByte ? (
                          <Image
                            src={`data:image/png;base64,${item?.ProductPictureByte}`}
                            alt={""}
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
          )}
        </div>
      </div>
    </div>
  );
}
