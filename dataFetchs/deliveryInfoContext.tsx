"use client";

import { createContext, useEffect, useState } from "react";
import { axiosAdmin, axiosUser } from "./AxiosToken";
import { useRouter } from "next/navigation";

export const DeiveryInfoContext = createContext<any>(null);

const DeiveryInfoAxiosContext = ({ children }: any) => {
  const [deiveryInfoData, setDeiveryInfoData] = useState<any[]>([]);
  const [deiveryInfoLoader, setDeiveryInfoLoader] = useState<boolean>(true);

  useEffect(() => {
    setDeiveryInfoLoader(true);
    axiosUser
      .get("front/info/deliveryInfo")
      .then(({ data }) => {
        setDeiveryInfoData(data);
      })
      .finally(() => {
        setDeiveryInfoLoader(false);
      });
  }, []);

  return (
    <DeiveryInfoContext.Provider value={{ deiveryInfoData, deiveryInfoLoader }}>
      {children}
    </DeiveryInfoContext.Provider>
  );
};

export default DeiveryInfoAxiosContext;
