"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useProducts = () => {
  const [productsData, setProductsData] = useState<ProductType[]>([]);
  const [productsLoader, setProductsLoader] = useState<boolean>(true);

  const fetchProducts = () => {
    setProductsLoader(true);
    axiosUser
      .get("front/products")
      .then((res) => {
        setProductsData(res.data.products);
      })
      .finally(() => {
        setProductsLoader(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    productsData,
    productsLoader,
    setProductsLoader,
    fetchProducts,
  };
};

export default useProducts;
