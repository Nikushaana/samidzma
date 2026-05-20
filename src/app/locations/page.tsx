import Image from "next/image";
import React, { Suspense } from "react";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import dynamic from "next/dynamic";
import {
  getServerSideBranchesImages,
  getServerSideSiteInfo,
} from "../../../dataFetchs/getServerSide/getData";
import MappedBranches from "../components/locations page/mappedBranches";
import BranchesImagesSlider from "../components/sliders/branchesImagesSlider";

const BranchesMap = dynamic(() => import("@/app/components/map/branchesMap"), {
  ssr: false,
});

export default async function Page() {
  const siteInfoData = await getServerSideSiteInfo(11);
  const branchesImagesData = await getServerSideBranchesImages();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <Suspense fallback={<div className="h-[50px]" />}>
          <WhatUSearch />
        </Suspense>

        <div className="flex flex-col gap-y-[20px]">
          {siteInfoData.description && (
            <div
              className="ql-editor max-w-full"
              dangerouslySetInnerHTML={{ __html: siteInfoData.description }}
            />
          )}
          <MappedBranches />
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <BranchesImagesSlider data={branchesImagesData.data} />
          <div className="w-full h-full max-lg:aspect-[5/3] rounded-[12px] max-sm:rounded-[4px] overflow-hidden">
            <BranchesMap />
          </div>
        </div>
      </div>
    </div>
  );
}
