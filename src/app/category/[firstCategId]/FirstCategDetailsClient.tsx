"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import CategoryComponent from "@/app/components/categoryContent/categoryComponent";

export default function FirstCategDetailsClient({ params }: { params: { firstCategId: string } }) {
  // second level categories data
  const [secondLevelCategoriesData, setSecondLevelCategoriesData] = useState([]);
  const [secondLevelCategoriesLoader, setSecondLevelCategoriesLoader] = useState(true);

  useEffect(() => {
    const id = params.firstCategId.split("_").pop()!; // get the real ID

    setSecondLevelCategoriesData([]);

    setSecondLevelCategoriesLoader(true);
    axiosUser
      .get(`front/secondLevelCategories?IdProdSaxeoba=${id}`)
      .then((res) => {
        setSecondLevelCategoriesData(res.data.data);
        setSecondLevelCategoriesLoader(false);
      })
      .finally(() => {});
  }, [params.firstCategId]);

  return (
    <CategoryComponent passedCategories={secondLevelCategoriesData} passedCategoriesLoader={secondLevelCategoriesLoader}/>
  );
}
