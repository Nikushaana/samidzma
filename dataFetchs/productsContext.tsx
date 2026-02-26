"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useProducts = (filter?: string) => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [productsLoader, setProductsLoader] = useState<boolean>(true);

  const fetchProducts = () => {
    setProductsLoader(true);
    axiosUser
      .get(`front/ourProduct${filter ? `?${filter}` : ""}`)
      .then((res) => {
        setProductsData(res.data.data);
        
      })
      .finally(() => {
        setProductsLoader(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  return {
    productsData,
    productsLoader,
    setProductsLoader,
    fetchProducts,
  };
};

export default useProducts;
