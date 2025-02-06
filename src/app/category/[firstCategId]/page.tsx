"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { CategoryContent } from "@/app/components/categoryContent/CategoryContent";

export default function Page({ params }: { params: { firstCategId: string } }) {
  // sec categ data
  const [secCategsData, setSecCategsData] = useState([]);
  const [secCategsLoader, setSecCategsLoader] = useState(true);

  useEffect(() => {
    setSecCategsLoader(true);
    axiosUser
      .get(`front/secondLevelCategories?IdProdSaxeoba=${params.firstCategId}`)
      .then((res) => {
        setSecCategsData(res.data.data);
        setSecCategsLoader(false);
      })
      .finally(() => {});
  }, [params.firstCategId]);
  // sec categ data

  return (
    <CategoryContent childCategsloader={secCategsLoader} childCategsData={secCategsData}/>
  );
}
