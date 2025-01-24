"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useStores = () => {
  const [StoresData, setStoresData] = useState<any[]>([]);
  const [StoresLoader, setStoresLoader] = useState<boolean>(true);

  const fetchStores = () => {
    setStoresLoader(true);
    axiosUser
      .get("front/store")
      .then(({ data }) => {
        setStoresData(data.data);
      })
      .finally(() => {
        setStoresLoader(false);
      });
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    StoresData,
    StoresLoader,
    fetchStores,
  };
};

export default useStores;
