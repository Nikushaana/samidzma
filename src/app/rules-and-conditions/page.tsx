import { Suspense } from "react";
import { getServerSideSiteInfo } from "../../../dataFetchs/getServerSide/getData";
import WhatUSearch from "../components/Inputs/WhatUSearch";

export default async function Page() {
  const siteInfoData = await getServerSideSiteInfo(1);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[30px] relative">
        <Suspense fallback={<div className="h-[50px]" />}>
          <WhatUSearch />
        </Suspense>

        {siteInfoData.description && (
          <div
            className="ql-editor max-w-full"
            dangerouslySetInnerHTML={{ __html: siteInfoData.description }}
          />
        )}
      </div>
    </div>
  );
}
