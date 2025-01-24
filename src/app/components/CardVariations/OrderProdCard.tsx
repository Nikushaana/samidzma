"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function OrderProdCard({ item }: any) {
  const { CartData } = useContext(CartAxiosContext);
  const { user } = useContext(UserContext);

  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);

  // get image
  useEffect(() => {
    if (!user?.id && item.ProdCode) {
      setProdImagesLoader(true);
      axiosUser
        .get(`front/productPicture?ProdCode=${item.ProdCode}`)
        .then((res) => {
          setProdImages(res.data);
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
    <div className="border-[1px] border-[#E2E2E2] rounded-[8px] p-[6px] flex items-center gap-[10px]">
      <div className="h-[31px] w-[42px] relative rounded-[4px] overflow-hidden">
        {user?.id ? (
          CartData?.product_image.find(
            (img: any) => img.ProductCode === item.ProdCode
          ).ProductPictureByte ? (
            <Image
              src={`data:image/png;base64,${
                CartData?.product_image.find(
                  (img: any) => img.ProductCode === item.ProdCode
                ).ProductPictureByte
              }`}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="bg-gray-200 w-full h-full"></div>
          )
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
          <div className="bg-gray-200 w-full h-full"></div>
        )}
      </div>
      <p className="text-[14px]">{item.ProductName}</p>
    </div>
  );
}
