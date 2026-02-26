"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../../dataFetchs/AxiosToken";
import CategoryComponent from "@/app/components/categoryContent/categoryComponent";

export default function SecondCategDetailsClient({ params }: { params: { secCategId: string } }) {
  // third level categories data
  const [thirdLevelCategoriesData, setThirdLevelCategoriesData] = useState([]);
  const [thirdLevelCategoriesLoader, setThirdLevelCategoriesLoader] =
    useState(true);

  useEffect(() => {
    const id = params.secCategId.split("_").pop()!;

    setThirdLevelCategoriesData([]);

    setThirdLevelCategoriesLoader(true);
    axiosUser
      .get(`front/threeLevelCategories?IdProdTypeGroup=${id}`)
      .then((res) => {
        setThirdLevelCategoriesData(res.data.data);
        setThirdLevelCategoriesLoader(false);
      })
      .finally(() => {});
  }, [params.secCategId]);

  return (
    <CategoryComponent
      passedCategories={thirdLevelCategoriesData}
      passedCategoriesLoader={thirdLevelCategoriesLoader}
    />
  );
}
