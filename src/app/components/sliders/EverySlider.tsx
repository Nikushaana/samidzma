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
import ProductCard from "../CardVariations/ProductCard";
import CategoriesCard from "../CardVariations/CategoriesCard";
import SmallProdCard from "../CardVariations/SmallProdCard";
import BlogCard from "../CardVariations/BlogCard";
import KitCard from "../CardVariations/KitCard";
import CatalogSetCard from "../CardVariations/CatalogSetCard";
import BuySameCard from "../CardVariations/BuySameCard";
import useScreenWidth from "../ScreenWidth";
import CommentsCard from "../CardVariations/CommentsCard";

export default function EverySlider({
  data,
  title,
  card,
  slidesPerView,
  spaceBetween,
  showButtons,
  loader,
}: any) {
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = useScreenWidth();

  const [sldsPerView, setSldsPerView] = useState<number>(slidesPerView);

  useEffect(() => {
    if (screenWidth > 1900) {
      setSldsPerView(slidesPerView);
    } else if (screenWidth <= 1550 && screenWidth > 1025) {
      setSldsPerView(card === "SmallProdCard" ? 6 : slidesPerView);
    } else if (screenWidth <= 1025 && screenWidth > 500) {
      setSldsPerView(
        card === "SmallProdCard" ? 4 : card === "buySameCardFour" ? 1 : 2
      );
    } else if (screenWidth <= 500 && screenWidth > 0) {
      setSldsPerView(
        card === "SmallProdCard"
          ? 2
          : card === "buySameCardThree" || card === "buySameCardFour"
          ? 1
          : 2
      );
    }
  }, [screenWidth, card]);

  return (
    <div className="flex flex-col gap-y-[20px]">
      {title && title}
      <div className="h-full flex flex-col justify-between  relative">
        <div className="w-full">
          {loader ? (
            <div
              style={{
                gridTemplateColumns: `repeat(${sldsPerView}, minmax(0, 1fr))`,
              }}
              className={`grid grid-row-1 overflow-hidden gap-[16px] w-full ${
                card === "buySameCardThree" || card === "buySameCardFour"
                  ? ""
                  : "max-[500px]:w-[170vw]"
              } h-full`}
            >
              {Array.from({ length: sldsPerView }, (_, i) => i + 1).map(
                (index: any) => (
                  <div key={index} className="w-full h-[450px] rounded-[12px] overflow-hidden">
                    <div className="loaderwave"></div>
                  </div>
                )
              )}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              slidesPerView={sldsPerView}
              spaceBetween={spaceBetween}
              loop={true}
              pagination={false}
              className={`w-full ${
                card === "buySameCardThree" || card === "buySameCardFour"
                  ? ""
                  : "max-[500px]:w-[170vw]"
              } h-full flex items-stretch BannerSlider`}
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
              {data?.map((item: any, index: any) => (
                <SwiperSlide
                  key={item.id || item.ProdCode || item.IdProdSaxeoba || index}
                  className={`h-full  ${
                    card !== "SmallProdCard" && "max-lg:pb-[57px]"
                  }`}
                >
                  {card === "ProductCard" && <ProductCard item={item} />}
                  {card === "CategoriesCard" && <CategoriesCard item={item} />}
                  {card === "SmallProdCard" && <SmallProdCard item={item} />}
                  {card === "BlogCard" && <BlogCard item={item} />}
                  {card === "KitCard" && (
                    <KitCard slidesPerView={slidesPerView} />
                  )}
                  {card === "CatalogSetCard" && <CatalogSetCard />}
                  {card === "CommentsCard" && <CommentsCard item={item} />}
                  {card === "buySameCardThree" && (
                    <BuySameCard FourCol={false} title="დაასრულე ყიდვა" />
                  )}
                  {card === "buySameCardFour" && (
                    <BuySameCard FourCol={true} title="ისევ იყიდე" />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {showButtons && (
          <button
            className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] left-[-50px] max-lg:left-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <BiChevronLeft className="" />
          </button>
        )}
        {showButtons && (
          <button
            className={`absolute top-[50%] max-lg:top-[calc(100%-20px)] translate-y-[-50%] right-[-50px] max-lg:right-0 z-[2] w-[37px] h-[37px] flex items-center justify-center text-[30px] bg-white active:bg-myGreen active:text-white duration-100 rounded-full`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <BiChevronRight className="" />
          </button>
        )}
      </div>
    </div>
  );
}
