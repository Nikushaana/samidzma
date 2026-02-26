"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useThirdCategories = () => {
  const [allThirdCategsData, setAllThirdCategsData] = useState<any[]>([]);
  const [allThirdCategsLoader, setAllThirdCategsLoader] =
    useState<boolean>(true);

  const fetchThirdCategories = () => {
    setAllThirdCategsLoader(true);
    axiosAdmin
      .get("admin/category/productType")
      .then((res) => {
        setAllThirdCategsData(res.data.data);
        setAllThirdCategsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchThirdCategories();
  }, []);

  return {
    allThirdCategsData,
    allThirdCategsLoader,
    fetchThirdCategories,
  };
};

export default useThirdCategories;
