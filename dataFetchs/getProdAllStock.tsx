"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserAxios";
import { WishListAxiosContext } from "./wishListContext";
import { axiosUser } from "./AxiosToken";
import { CartAxiosContext } from "./cartContext";

const useGetProdAllStock = ({ code }: any) => {
  const [prodAllStock, setProdAllStock] = useState<boolean>(false);

  useEffect(() => {
    if (code) {
      axiosUser
        .get(`front/productNashti?ProdCode=${code}`)
        .then((res) => {
          setProdAllStock(
            res.data.StoreProdNashtebi.find(
              (item: any) => item.ProdNashtebi[0].Nashti > 0
            )
              ? true
              : false
          );
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [code]);

  return { prodAllStock };
};

export default useGetProdAllStock;
