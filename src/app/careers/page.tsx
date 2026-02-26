import Image from "next/image";
import React from "react";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import VacancySlider from "../components/careers/vacancySlider";
import CareersForm from "../components/careers/careersForm";
import { getServerSideSiteInfo } from "../../../dataFetchs/getServerSide/getData";

export default async function Page() {
  const siteInfoData = await getServerSideSiteInfo(6);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="grid grid-cols-2 max-lg:grid-cols-1 items-end gap-[20px]">
          <div className="relative w-full h-full max-lg:aspect-[2/1] rounded-[12px] overflow-hidden max-sm:hidden">
            <Image
              src="/images/careerpht.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          {siteInfoData.description && (
            <div
              className="ql-editor max-w-full"
              dangerouslySetInnerHTML={{ __html: siteInfoData.description }}
            />
          )}
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div className="rounded-[12px] h-full bg-white p-[30px] max-sm:px-[20px] flex flex-col gap-y-[20px]">
            <div className="flex flex-col">
              <h1 className="text-[28px]">საკონტაქტო ფორმა</h1>
              <p className="text-[14px]">შეავსე ფორმა, რათა დაგიკავშირდეთ</p>
            </div>

            <CareersForm />
          </div>
          <div className="w-full h-[700px] rounded-[12px] overflow-hidden bg-myBlack p-[30px] max-sm:px-[20px] flex flex-col gap-y-[20px]">
            <VacancySlider />
          </div>
        </div>
      </div>
    </div>
  );
}
