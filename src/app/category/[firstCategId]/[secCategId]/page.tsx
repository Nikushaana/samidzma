"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../../dataFetchs/AxiosToken";
import { CategoryContent } from "@/app/components/categoryContent/CategoryContent";

export default function Page({ params }: { params: { secCategId: string } }) {
  // third categ data
  const [thirdCategsData, setThirdCategsData] = useState([]);
  const [thirdCategsLoader, setThirdCategsLoader] = useState(true);

  useEffect(() => {
    setThirdCategsLoader(true);
    axiosUser
      .get(`front/threeLevelCategories?IdProdTypeGroup=${params.secCategId}`)
      .then((res) => {
        setThirdCategsData(res.data.data);
        setThirdCategsLoader(false);
      })
      .finally(() => {});
  }, [params.secCategId]);
  // third categ data
  return <CategoryContent childCategsloader={thirdCategsLoader} childCategsData={thirdCategsData} />;
}