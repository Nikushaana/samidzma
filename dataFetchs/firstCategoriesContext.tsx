"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useFirstCategories = () => {
  const [allFirstCategsData, setAllFirstCategsData] = useState<any[]>([]);
  const [allFirstCategsLoader, setAllFirstCategsLoader] =
    useState<boolean>(true);

  const fetchFirstCategories = () => {
    setAllFirstCategsLoader(true);
    axiosAdmin
      .get("admin/category/saxeobebi")
      .then((res) => {
        setAllFirstCategsData(res.data.data);
        setAllFirstCategsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchFirstCategories();
  }, []);

  return {
    allFirstCategsData,
    allFirstCategsLoader,
    fetchFirstCategories,
  };
};

export default useFirstCategories;
