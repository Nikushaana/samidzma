"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";
import useScreenWidth from "../ScreenWidth";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function TopBannerSlider({ BannersData }: any) {
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = useScreenWidth();

  const [groupedItems, setGroupedItems] = useState<any>([]);

  useEffect(() => {
    const groupedArray: any = [];

    if (BannersData.length > 0) {
      BannersData.forEach((banner: any) => {
        groupedArray.push(
          {
            large_url: banner.large_url,
            large_mobile_url: banner.large_mobile_url,
            large_title: banner.large_title,
            large_redirect_link: banner.large_redirect_link,
          },
          {
            medium_url: banner.medium_url,
            medium_mobile_url: banner.medium_mobile_url,
            medium_title: banner.medium_title,
            medium_redirect_link: banner.medium_redirect_link,
          },
          {
            small1_url: banner.small1_url,
            small1_mobile_url: banner.small1_mobile_url,
            small1_title: banner.small1_title,
            small1_redirect_link: banner.small1_redirect_link,
          },
          {
            small2_url: banner.small2_url,
            small2_mobile_url: banner.small2_mobile_url,
            small2_title: banner.small2_title,
            small2_redirect_link: banner.small2_redirect_link,
          }
        );
      });
    }

    setGroupedItems(screenWidth < 470 ? groupedArray : BannersData);
  }, [BannersData, screenWidth]);

  return (
    <div className="w-full max-lg:mb-[50px] relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        pagination={
          screenWidth < 1025
            ? {
                clickable: true,
              }
            : undefined
        }
        className="w-full items-stretch BannerSlider"
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={1200}
      >
        {groupedItems.map((item: any, index: any) => (
          <SwiperSlide key={index} className="h-full">
            <div className="flex gap-[10px] max-lg:gap-[20px] h-[343px] max-lg:h-[355px] max-lg:pb-[57px]">
              <div
                className={`max-tiny:w-full h-full rounded-[8px] relative overflow-hidden w-[65%] max-lg:w-[50%]`}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${
                    item?.large_url
                      ? item?.large_url
                      : item?.medium_url
                      ? item?.medium_url
                      : item?.small1_url
                      ? item?.small1_url
                      : item?.small2_url
                  }`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                {(item?.large_title ||
                  item?.medium_title ||
                  item?.medium_title ||
                  item?.small1_title ||
                  item?.small1_title ||
                  item?.small2_title) && (
                  <div
                    className="absolute w-full h-full flex items-center z-[1] p-[50px] max-lg:p-[28px]
            "
                  >
                    <p className="text-white text-[40px] max-lg:text-[32px] line-clamp-4 w-full break-all">
                      {item?.large_title
                        ? item?.large_title
                        : item?.medium_title
                        ? item?.medium_title
                        : item?.small1_title
                        ? item?.small1_title
                        : item?.small2_title}
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`flex flex-col gap-[10px] max-lg:gap-[20px] h-full max-tiny:hidden w-[35%] max-lg:w-[50%]`}
              >
                <div
                  className={`w-full rounded-[8px] relative overflow-hidden h-[50%]`}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.medium_url}`}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  {item?.medium_title && (
                    <div className="absolute w-full h-full flex items-center z-[1] p-[30px]">
                      <p className="text-white text-[22px] w-[70%] line-clamp-3 break-all">
                        {item?.medium_title}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={`w-full flex items-center gap-[10px] max-lg:gap-[20px] h-[50%]`}
                >
                  <div
                    className={`h-full rounded-[8px] relative overflow-hidden w-[50%]`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small1_url}`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    {item?.small1_title && (
                      <div className="absolute w-full h-full flex items-center z-[1] p-[20px]">
                        <p className="text-white text-[18px] line-clamp-3 break-all">
                          {item?.small1_title}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className={`h-full rounded-[8px] relative overflow-hidden w-[50%]`}
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small2_url}`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    {item?.small2_title && (
                      <div className="absolute w-full h-full flex items-center z-[1] p-[20px]">
                        <p className="text-white text-[18px] line-clamp-3 break-all">
                          {item?.small2_title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] left-[-50px] max-lg:left-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <BiChevronLeft className="" />
      </button>
      <button
        className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] right-[-50px] max-lg:right-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <BiChevronRight className="" />
      </button>
    </div>
  );
}
