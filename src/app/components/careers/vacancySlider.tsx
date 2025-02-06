"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Grid, Pagination } from "swiper/modules";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import ProductCard from "../CardVariations/ProductCard";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import useVacancies from "../../../../dataFetchs/vacanciesContext";

export default function VacancySlider() {
  const { vacancyData, vacancyLoader } = useVacancies();

  return (
    <div className="w-full h-full relative">
      {vacancyLoader ? (
        <p className="text-white">ვაკანსიები იძებნება..</p>
      ) : vacancyData.length > 0 ?
        <Swiper
          modules={[Autoplay, EffectFade, Grid, Pagination]}
          slidesPerView={1}
          grid={{
            rows: 4,
          }}
          spaceBetween={20}
          loop={true}
          className="w-full h-full BannerSlider "
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1200}
        >
          {vacancyData?.map((item: any, index: number) => (
            <SwiperSlide key={item.id} className="">
              <div className="bg-[#434545] w-full h-full rounded-[12px] flex flex-col gap-y-[10px] px-[40px] py-[15px]">
                <ul className="list-outside marker:text-myYellow list-disc ">
                  <li>
                    <h1 className="text-[22px] text-white ">{item.position}</h1>
                  </li>
                </ul>
                <p className="text-[14px] text-gray-200 line-clamp-2 ">
                  {item?.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      : <p className="text-white">ვაკანსიები არ არსებობს</p>}
    </div>
  );
}
