"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserAxios";
import { WishListAxiosContext } from "./wishListContext";

const useIsInFavorite = (ProdCode: string | number) => {
  const { user } = useContext(UserContext);
  const { WishListData, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  const [isInFavorite, setIsInFavorite] = useState<boolean>(false);

  useEffect(() => {
    const isItemInFavorites = user?.id
      ? WishListData.data?.find((fav: any) => fav.product_id == ProdCode) ??
        false
      : WishListLocalStorageData.includes(ProdCode) ?? false;

    setIsInFavorite(isItemInFavorites);
  }, [ProdCode, WishListData.data, WishListLocalStorageData, user?.id]);

  return { isInFavorite, setIsInFavorite };
};

export default useIsInFavorite;
