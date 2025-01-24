"use client";

import React, { useContext, useEffect } from "react";
import { CartAxiosContext } from "../../../dataFetchs/cartContext";
import DotsLoader from "../components/loaders/DotsLoader";
import CartCard from "../components/CardVariations/CartCard";

export default function Page() {
  const { CartData, CartLoader } = useContext(CartAxiosContext);

  
  return (
    <div
      className={`w-full flex flex-col gap-y-[20px] relative ${
        CartLoader && "opacity-[0.5] pointer-events-none"
      }
      `}
    >
      {CartLoader && (
        <div className="flex justify-center my-[60px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}
      {CartData?.product?.length > 0
        ? CartData?.product?.map((item: any, index: number) => (
            <CartCard
              key={item.ProdCode}
              productItemData={item}
              cartImg={
                CartData?.product_image?.find(
                  (img: any) => img.ProductCode === item.ProdCode
                )?.ProductPictureByte
              }
              cartItemData={CartData?.data?.find(
                (quant: any) => quant.product_id === item.ProdCode
              )}
            />
          ))
        : !CartLoader && (
            <p className="flex justify-center my-[60px]">
              პროდუქტები არ მოიძებნა
            </p>
          )}
    </div>
  );
}
