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

export default function InnerProductMainImgSlider({
  mainLoader,
  prodMainImages,
  activeImagessLoader,
}: any) {
  let MainSwiperRef = useRef<SwiperClass>(null!);

  return (
    <div className={`w-full flex items-center justify-center h-full`}>
      {mainLoader ? (
        <div className="h-full w-full">
          <div className="w-full h-full rounded-[12px] loaderwave overflow-hidden"></div>
        </div>
      ) : prodMainImages?.length > 0 ? (
        <Swiper
          modules={[EffectFade]}
          slidesPerView={1}
          loop={true}
          pagination={false}
          className={`w-full h-full ${activeImagessLoader && "opacity-[0.7]"}`}
          onBeforeInit={(swiper) => {
            MainSwiperRef.current = swiper;
          }}
          speed={1200}
        >
          {prodMainImages?.map((item: any, index: any) => (
            <SwiperSlide key={item.ID}>
              <div className="rounded-[20px] relative w-full h-full bg-white overflow-hidden">
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
  );
}
