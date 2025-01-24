"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { UserContext } from "./UserAxios";

export const WishListAxiosContext = createContext<any>(null);

const WishListContext = ({ children }: any) => {
  const { user } = useContext(UserContext);
  const [WishListData, setWishListData] = useState<any>([]);
  const [WishListCounter, setWishListCounter] = useState<number>(0);
  const [WishListLoader, setWishListLoader] = useState<boolean>(true);
  const [renderWishList, setRenderWishList] = useState(null);

  const [WishListLocalStorageData, setWishListLocalStorageData] = useState<any>(
    []
  );

  const [prodwholenum, setProdwholenum] = useState<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(prodwholenum / 9);

  useEffect(() => {
    setWishListLoader(true);

    if (user?.id) {
      localStorage.setItem("SamiDzma-favorites", "[]");

      axiosUser
        .get(`user/wishlist?page=${currentPage + 1}&per_page=9`)
        .then((res) => {
          setWishListData(res.data);
          setWishListCounter(res.data.total);
          setProdwholenum(res.data.total);
        })
        .catch((err) => {
          setWishListCounter(0);
          setWishListData([]);
        })
        .finally(() => {
          setWishListLoader(false);
        });
    } else {
      // localstorage favorites data
      const getFavorites = localStorage.getItem("SamiDzma-favorites");
      setWishListLocalStorageData(getFavorites ? JSON.parse(getFavorites) : []);
      // localstorage favorites data

      axiosUser
        .post(`front/someProduct?page=${currentPage + 1}&per_page=9`, {
          ids: getFavorites && JSON.parse(getFavorites),
        })
        .then((res) => {
          setWishListData(res);
          setProdwholenum(res.data.length);
        })
        .catch((err) => {
          setWishListData([]);
        })
        .finally(() => {
          setWishListLoader(false);
        });
    }
  }, [renderWishList, user, currentPage]);

  return (
    <WishListAxiosContext.Provider
      value={{
        WishListData,
        WishListLoader,
        setWishListLoader,
        setRenderWishList,
        WishListCounter,
        setWishListCounter,
        WishListLocalStorageData,

        currentPage,
        setCurrentPage,
        pageCount,
        prodwholenum,
      }}
    >
      {children}
    </WishListAxiosContext.Provider>
  );
};

export default WishListContext;
