import Image from "next/image";
import React, { Suspense } from "react";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import { getServerSideSiteInfo } from "../../../dataFetchs/getServerSide/getData";

export default async function Page() {
  const whoWeAreSiteInfoData = await getServerSideSiteInfo(7);
  const ourHistorySiteInfoData = await getServerSideSiteInfo(8);
  const ourTeamSiteInfoData = await getServerSideSiteInfo(9);
  const ourViewSiteInfoData = await getServerSideSiteInfo(10);
  const animInfo = [
    {
      id: 1,
      value: "2.4K+",
      name: "პროდუქტი",
    },
    {
      id: 2,
      value: "82",
      name: "კატეგორია",
    },
    {
      id: 3,
      value: "200K+",
      name: "კმაყოფილი მომხმარებელი",
    },
    {
      id: 4,
      value: "100+",
      name: "პარტნიორი",
    },
    {
      id: 5,
      value: "82",
      name: "კატეგორია",
    },
    {
      id: 6,
      value: "2.4K+",
      name: "",
    },
  ];
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <Suspense fallback={<div className="h-[50px]" />}>
          <WhatUSearch />
        </Suspense>

        {whoWeAreSiteInfoData.description && (
          <div
            className="ql-editor max-w-full"
            dangerouslySetInnerHTML={{
              __html: whoWeAreSiteInfoData.description,
            }}
          />
        )}

        <div className="w-full grid grid-cols-6 max-lg:grid-cols-3 gap-[15px] max-lg:gap-[30px] max-sm:gap-[10px]">
          {animInfo.map((item: AnimInfoType, index: number) => (
            <div
              key={item.id}
              className={`w-full aspect-square rounded-full flex flex-col
                 items-center justify-center gap-y-[10px] max-sm:gap-y-0 ${
                   index % 2 === 1
                     ? `bg-myGreen text-white ${
                         index == 3 || index == 5
                           ? "mt-[70px] max-lg:mt-[-70px] max-sm:mt-[-30px]"
                           : "mt-[70px] max-sm:mt-[30px]"
                       }`
                     : "bg-myYellow"
                 }`}
            >
              <h1 className="text-[42px] max-sm:text-[21px]">{item.value}</h1>
              <h1 className="text-[18px] max-sm:text-[9px] text-center">
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        <div className="relative w-full aspect-[6/2] max-lg:aspect-[5/4] rounded-[12px] overflow-hidden">
          <Image
            src="/images/shopimg.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>

        {ourHistorySiteInfoData.description && (
          <div
            className="ql-editor max-w-full"
            dangerouslySetInnerHTML={{
              __html: ourHistorySiteInfoData.description,
            }}
          />
        )}

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[60px]">
          <div className="relative w-full aspect-[7/4] max-lg:aspect-[5/4] rounded-[12px] overflow-hidden">
            <Image
              src="/images/shopimgin.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          {ourTeamSiteInfoData.description && (
            <div
              className="ql-editor max-w-full"
              dangerouslySetInnerHTML={{
                __html: ourTeamSiteInfoData.description,
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[60px]">
          {ourViewSiteInfoData.description && (
            <div
              className="ql-editor max-w-full"
              dangerouslySetInnerHTML={{
                __html: ourViewSiteInfoData.description,
              }}
            />
          )}
          <div className="relative w-full aspect-[7/4] max-lg:aspect-[5/4] max-lg:order-first rounded-[12px] overflow-hidden">
            <Image
              src="/images/happyman.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
