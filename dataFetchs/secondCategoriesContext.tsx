"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useSecondCategories = () => {
  const [allSecondCategsData, setAllSecondCategsData] = useState<any[]>([]);
  const [allSecondCategsLoader, setAllSecondCategsLoader] =
    useState<boolean>(true);

  const fetchSecondCategories = () => {
    setAllSecondCategsLoader(true);
    axiosAdmin
      .get("admin/category/productTypeGroupe")
      .then((res) => {
        setAllSecondCategsData(res.data.data);
        setAllSecondCategsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchSecondCategories();
  }, []);

  return {
    allSecondCategsData,
    allSecondCategsLoader,
    fetchSecondCategories,
  };
};

export default useSecondCategories;
