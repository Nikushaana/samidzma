"use client";

import { useContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { UserContext } from "./UserAxios";
import { CartAxiosContext } from "./cartContext";

const useIsInCart = (ProdCode: string | number) => {
  const { user } = useContext(UserContext);
  const { CartData, CartLocalStorageData } = useContext(CartAxiosContext);

  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    const isItemInCart = user?.id
      ? CartData?.some((cart: any) => cart.product_id === ProdCode) ?? false
      : CartLocalStorageData?.some((cartData: any) => cartData.product_id === ProdCode) ?? false;

    setIsInCart(isItemInCart);
  }, [CartData, CartLocalStorageData, ProdCode, user?.id]);

  return { isInCart, setIsInCart };
};

export default useIsInCart;