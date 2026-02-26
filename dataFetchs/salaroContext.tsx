"use client";

import { useEffect, useState } from "react";
import { axiosAdmin } from "./AxiosToken";

const useSalaro = () => {
  const [SalaroData, setSalaroData] = useState<any[]>([]);
  const [SalaroLoader, setSalaroLoader] = useState<boolean>(true);

  const fetchSalaro = () => {
    setSalaroLoader(true);
    axiosAdmin
      .get("admin/getSalaro")
      .then(({ data }) => {
        setSalaroData(data);
      })
      .finally(() => {
        setSalaroLoader(false);
      });
  };

  useEffect(() => {
    fetchSalaro();
  }, []);

  return {
    SalaroData,
    SalaroLoader,
    fetchSalaro,
  };
};

export default useSalaro;
