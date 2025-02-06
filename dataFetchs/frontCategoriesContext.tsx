"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useFrontCategories = () => {
  // SaxeobebiCategType[]
  const [FrontCategoriesData, setFrontCategoriesData] = useState<any>([]);
  const [FrontCategoriesLoader, setFrontCategoriesLoader] =
    useState<boolean>(true);

  const fetchFrontCategories = () => {
    setFrontCategoriesLoader(true);
    axiosUser
      .get("front/categories")
      .then((res) => {
        setFrontCategoriesData(res.data.data);
      })
      .finally(() => {
        setFrontCategoriesLoader(false);
      });
  };

  useEffect(() => {
    fetchFrontCategories();
  }, []);

  return {
    FrontCategoriesData,
    FrontCategoriesLoader,
    setFrontCategoriesLoader,
    fetchFrontCategories,
  };
};

export default useFrontCategories;
