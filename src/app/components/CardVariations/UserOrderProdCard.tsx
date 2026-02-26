"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function UserOrderProdCard({ item }: any) {
  const { slugify } = useContext(ContextForSharingStates);
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`rounded-[12px] bg-white p-[20px] max-sm:p-[10px] flex flex-col justify-between gap-[12px] h-full`}
    >
      <div
        onClick={() => {
          router.push(
            `/products/${slugify(item.ProductName) + "_" + item.product_id}`
          );
        }}
        className="relative cursor-pointer w-full h-[224px] max-sm:h-auto max-sm:aspect-[4/3] flex items-center justify-center rounded-[4px] overflow-hidden"
      >
        {!imageError ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/productImage/product_${item?.product_id}_main.jpg`}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <p className="text-center text-[14px] w-full h-full bg-[white] flex items-center justify-center">
            ფოტო არ არსებობს
          </p>
        )}
      </div>

      <h1 className="text-[22px] pl-[15px] max-2xl:pl-0 h-[70px] max-sm:h-auto line-clamp-2">
        {item.product_name}
      </h1>

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
        <p>ფასდაკლებული ფასი</p>
        <h1 className="text-[20px] pl-[15px]">
          {item.product_discount_price}₾
        </h1>
      </div>
      <div className={`flex items-center justify-between`}>
        <p>რაოდენობა</p>
        <h1 className="text-[20px] pl-[15px]">{item.quantity}</h1>
      </div>
      <div className={`flex items-center justify-between`}>
        <p>საბოლოო ფასი</p>
        <h1 className="text-[20px] pl-[15px]">{item.price}₾</h1>
      </div>
    </div>
  );
}
