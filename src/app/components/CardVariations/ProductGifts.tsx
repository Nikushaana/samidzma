"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { BsGift } from "react-icons/bs";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";

export default function ProductGifts({ item, ProdGiftsData }: any) {
  const { orderPlacementValues, setOrderPlacementValues } =
    useContext(CartAxiosContext);
  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);
  // get image
  useEffect(() => {
    if (item.ProdCode) {
      setProdImagesLoader(true);
      axiosUser
        .get(`front/productPicture?ProdCode=${item.ProdCode}`)
        .then((res) => {
          setProdImages(res.data[0]);
        })
        .catch((err) => {
          setProdImages({});
        })
        .finally(() => {
          setProdImagesLoader(false);
        });
    }
  }, [item]);
  // get image

  return (
    <div
      onClick={() => {
        setOrderPlacementValues((prev: any) => ({
          ...prev,
          product_gift_id:
            orderPlacementValues.product_gift_id ===
            ProdGiftsData.giftProducts.find(
              (item1: any) => item1.gift_prod_code === item.ProdCode
            )?.id
              ? ""
              : ProdGiftsData.giftProducts.find(
                  (item1: any) => item1.gift_prod_code === item.ProdCode
                )?.id,
        }));
      }}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-[20px] w-[75%]">
        <div className="w-[62px] h-[62px] shrink-0 rounded-[4px] overflow-hidden relative">
          {prodImagesLoader ? (
            <div className="w-full h-full rounded-[12px] loaderwave"></div>
          ) : prodImages?.ProductPictureByte ? (
            <Image
              src={`data:image/png;base64,${prodImages?.ProductPictureByte}`}
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
        <p className="text-[14px]">{item?.ProductName}</p>
      </div>
      <div
        className={`duration-300 ${
          orderPlacementValues.product_gift_id ===
          ProdGiftsData.giftProducts.find(
            (item1: any) => item1.gift_prod_code === item.ProdCode
          )?.id
            ? "text-[20px] "
            : "text-[8px] text-transparent rotate-[360deg]"
        }`}
      >
        <BsGift />
      </div>
    </div>
  );
}
