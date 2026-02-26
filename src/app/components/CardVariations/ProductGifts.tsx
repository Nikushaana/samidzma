"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { BsGift } from "react-icons/bs";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";

export default function ProductGifts({ item }: any) {
  const { orderPlacementValues, setOrderPlacementValues } =
    useContext(CartAxiosContext);

  return (
    <div
      onClick={() => {
        setOrderPlacementValues((prev: any) => ({
          ...prev,
          product_gift_id:
            orderPlacementValues.product_gift_id === item?.id ? "" : item?.id,
        }));
      }}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-[20px] w-[75%]">
        <div className="w-[62px] h-[62px] shrink-0 rounded-[4px] overflow-hidden relative">
          {item.giftProduct.main_image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.giftProduct.main_image}`}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
          )}
        </div>
        <p className="text-[14px]">{item?.giftProduct.ProductName}</p>
      </div>
      <div
        className={`duration-300 ${
          orderPlacementValues.product_gift_id === item?.id
            ? "text-[20px] "
            : "text-[8px] text-transparent rotate-[360deg]"
        }`}
      >
        <BsGift />
      </div>
    </div>
  );
}
