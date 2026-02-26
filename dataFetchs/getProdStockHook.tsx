"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserAxios";
import { WishListAxiosContext } from "./wishListContext";
import { axiosUser } from "./AxiosToken";
import { CartAxiosContext } from "./cartContext";

const useGetProdStock = ({ item, deiveryInfoData }: any) => {
  const { orderPlacementValues } = useContext(CartAxiosContext);
  const [prodStock, setProdStock] = useState<any>();

  useEffect(() => {
    if (item.ProdCode && orderPlacementValues.is_delivery !== null) {
      axiosUser
        .get(
          `front/productNashti?ProdCode=${item.ProdCode}&StoreCode=${
            orderPlacementValues.is_delivery == 1
              ? deiveryInfoData?.system_id
              : orderPlacementValues.store?.StoreCode
          }`
        )
        .then((res) => {
          setProdStock(res.data.StoreProdNashtebi[0].ProdNashtebi[0].Nashti);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [
    deiveryInfoData?.system_id,
    item.ProdCode,
    orderPlacementValues.is_delivery,
    orderPlacementValues.store?.StoreCode,
  ]);

  return { prodStock };
};

export default useGetProdStock;
