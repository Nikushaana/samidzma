import React, { useContext } from "react";
import TopBannerSlider from "./TopBannerSlider";
import WhatUSearch from "../Inputs/WhatUSearch";
import EverySlider from "../sliders/EverySlider";
import CategoriesCard from "../CardVariations/CategoriesCard";
import { getServerSideBanner, getServerSideCategories } from "../../../../dataFetchs/getServerSide/getData";

export default async function TopBanner() {
  const FrontCategoriesData = await getServerSideCategories();
  const BannersData = await getServerSideBanner();
  return (
    <div className="rounded-[12px] max-lg:rounded-0 bg-[#EAEDEE] p-[30px] max-lg:p-0 flex flex-col gap-y-[20px]">
      <TopBannerSlider BannersData={BannersData.data}/>
      <div className="max-lg:order-first">
        <WhatUSearch />
      </div>
      <EverySlider
        data={FrontCategoriesData.data}
        card="CategoriesCard"
        slidesPerView={4}
        spaceBetween={20}
        showButtons={true}
      />
    </div>
  );
}
