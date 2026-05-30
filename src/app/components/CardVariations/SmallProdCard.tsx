"use client";

import React, { useContext } from "react";
import Image from "next/image";
import GreenButton from "../buttons/greenButton";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function SmallProdCard({ item }: any) {
  const router = useRouter();
  const { slugify } = useContext(ContextForSharingStates);

  return (
    <div className="rounded-[8px] bg-white p-[10px] flex flex-col gap-y-[10px]">
      <div
        onClick={() => {
          router.push(
            `/products/${
              item.ProdAdditionalCode
                ? `${
                    (item.slug || slugify(item.ProductName)) +
                    "_" +
                    item.ProdAdditionalCode
                  }?variation=${item.ProdCode}`
                : (item.slug || slugify(item.ProductName)) + "_" + item.ProdCode
            }`,
          );
        }}
        className="relative cursor-pointer w-full max-h-[150px] flex items-center justify-center aspect-[4/3] rounded-[4px] overflow-hidden"
      >
        {item.main_image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_image}`}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <p className="text-center text-[14px] ">ფოტო არ არსებობს</p>
        )}
      </div>

      <h1 className="text-[14px] truncate ">{item?.ProductName}</h1>

      <GreenButton
        name={"დეტალურად"}
        style="h-[40px] text-[18px]"
        action={() => {
          router.push(
            `/products/${
              item.ProdAdditionalCode
                ? `${
                    (item.slug || slugify(item.ProductName)) +
                    "_" +
                    item.ProdAdditionalCode
                  }?variation=${item.ProdCode}`
                : (item.slug || slugify(item.ProductName)) + "_" + item.ProdCode
            }`,
          );
        }}
      />
    </div>
  );
}
