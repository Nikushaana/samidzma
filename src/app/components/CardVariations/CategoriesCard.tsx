"use client";

import React, { useEffect, useState } from "react";
import DotsLoader from "../loaders/DotsLoader";
import { FaTree } from "react-icons/fa";
import Image from "next/image";
import GreenButton from "../buttons/greenButton";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade, Grid, Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function CategoriesCard({ item }: any) {
  const router = useRouter();

  const [groupedItems, setGroupedItems] = useState<any>([]);

  useEffect(() => {
    const groupedArray: any = [];

    if (item?.productTypeGroup.length > 0) {
      for (let i = 0; i < item?.productTypeGroup.length; i += 4) {
        groupedArray.push(item?.productTypeGroup.slice(i, i + 4));
      }
    }

    setGroupedItems(groupedArray);
  }, [item]);
  
  return (
    <div className="rounded-[8px] bg-white p-[18px] flex flex-col gap-y-[10px] self-stretch h-full">
      <div className="flex items-center justify-between h-[60px]">
        <h1 className="text-[20px]">{item?.ProdSaxeobaName}</h1>
        <div className="bg-myGreen text-white shrink-0 flex items-center justify-center text-[18px] w-[45px] h-[45px] rounded-full">
          <FaTree />
        </div>
      </div>

      <div className="w-full">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          slidesPerView={1}
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
          {groupedItems?.map((item1: any, index: any) => (
            <SwiperSlide key={index} className="w-full">
              <div className="grid grid-cols-2 gap-[20px]">
                {item1.map((item3: any, index: any) => (
                  <div
                    key={index}
                    className="w-full aspect-square relative rounded-[5px] overflow-hidden"
                  >
                    <Image
                      src={`${
                        item3?.image
                          ? `${process.env.NEXT_PUBLIC_API_URL}/${item3?.image}`
                          : "/images/siteLogo.png"
                      }`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="absolute w-full h-full flex items-end z-[1] p-[10px]
              bg-gradient-to-t from-[#1D1F1FD6] from-0% to-[#32343400] to-84%"
                    >
                      <p className="break-words hyphens-manual text-white text-[12px] w-full">
                        {item3.ProdTypeGroupName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <GreenButton
        name="მეტის ნახვა"
        action={() => {
          router.push(`/products?IdProdSaxeoba=${item.IdProdSaxeoba}`);
        }}
        style="h-[56px] max-tiny:h-[48px] text-[18px]"
      />
    </div>
  );
}
