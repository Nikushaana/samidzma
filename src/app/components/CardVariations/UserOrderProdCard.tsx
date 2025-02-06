"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaTree } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import DotsLoader from "../loaders/DotsLoader";
import Counter from "../counter/counter";
import { BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import GreenButton from "../buttons/greenButton";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";

export default function UserOrderProdCard({
  item,
  productName,
  Description,
}: any) {
  const router = useRouter();

  // used states
  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);

  // get image
  useEffect(() => {
    if (item.product_id) {
      setProdImagesLoader(true);
      axiosUser
        .get(`front/productPicture?ProdCode=${item.product_id}`)
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
    <div
      className={`rounded-[12px] bg-white p-[20px] max-tiny:p-[10px] flex flex-col justify-between gap-[12px] h-full`}
    >
      <div
        onClick={() => {
          router.push(
            `/products/${
              item.ProdAdditionalCode
                ? `${item.ProdAdditionalCode}?variation=${item.ProdCode}`
                : item.ProdCode
            }`
          );
        }}
        className="relative cursor-pointer w-full h-[224px] max-tiny:h-auto max-tiny:aspect-[4/3] flex items-center justify-center rounded-[4px] overflow-hidden"
      >
        {prodImagesLoader ? (
          <div className="w-full h-full rounded-[12px] loaderwave overflow-hidden"></div>
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
        <div className="absolute bottom-[20px] max-tiny:bottom-[10px] left-[20px] max-tiny:left-[10px] z-[1] bg-myGreen text-white shrink-0 flex items-center justify-center text-[18px] w-[53px] max-tiny:w-[36px] aspect-square rounded-full">
          <FaTree />
        </div>
      </div>

      <h1 className="text-[22px] pl-[15px] max-2xl:pl-0 h-[70px] max-tiny:h-auto line-clamp-2">
        {productName}
      </h1>
      <p className="text-[14px] pl-[15px] line-clamp-2">{Description}</p>

      <p
        className={`px-[10px] bg-myGreen text-white items-center justify-center rounded-full text-[14px] h-[36px] ${
          item.is_gift ? "flex" : "hidden"
        }`}
      >
        საჩუქარი
      </p>

      <div className={`flex items-center justify-between`}>
        <p>{item.isComplete ? "კომპლექტი" : "ცალი"}</p>
        <h1 className="text-[20px] pl-[15px]">{item.product_price}₾</h1>
      </div>
      <div className={`flex items-center justify-between`}>
        <p>რაოდენობა</p>
        <h1 className="text-[20px] pl-[15px]">{item.quantity}</h1>
      </div>
      <div className={`flex items-center justify-between`}>
        <p>ფასი სულ</p>
        <h1 className="text-[20px] pl-[15px]">{item.price}₾</h1>
      </div>
      <div className={`flex items-center justify-between`}>
        <p>ფასდაკლებული</p>
        <h1 className="text-[20px] pl-[15px]">
          {item.product_discount_price}₾
        </h1>
      </div>
    </div>
  );
}
