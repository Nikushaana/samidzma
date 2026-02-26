"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";

export default function BranchesImagesSlider({ data }: any) {
  let swiperRef = useRef<SwiperClass>(null!);

  const [activeImage, setActiveImage] = useState<any>(data?.[0]);

  useEffect(() => {
    if (data?.length) {
      setActiveImage(data[0]);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-y-[10px] h-[558px] max-lg:h-[538px] max-sm:h-[329px]">
      <div className="relative w-full h-[calc(100%-110px)] max-lg:h-[calc(100%-105px)] max-sm:h-[calc(100%-61px)] rounded-[12px] max-sm:rounded-[3px] overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${activeImage?.url}`}
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="h-[100px] max-lg:h-[95px] max-sm:h-[61px] w-full flex flex-col justify-between  relative">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={5}
          spaceBetween={10}
          pagination={false}
          className={`w-full h-full flex items-stretch BannerSlider`}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveImage(data[swiper.activeIndex]);
          }}
          speed={1200}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                swiperRef.current?.slideTo(index);
                setActiveImage(item);
              }}
              className={`h-full rounded-[4px] overflow-hidden cursor-pointer ${
                activeImage?.id === item.id && "border-2 border-myGreen"
              }`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.url}`}
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {data.length > 5 && (
          <>
            <button
              className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] left-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <BiChevronLeft className="" />
            </button>
            <button
              className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] right-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <BiChevronRight className="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
