"use client";

import Image from "next/image";
import React from "react";

export default function OrderProdCard({ item }: any) {
  return (
    <div className="border-[1px] border-[#E2E2E2] rounded-[8px] p-[6px] flex items-center gap-[10px]">
      <div className="h-[31px] w-[42px] relative rounded-[4px] overflow-hidden">
        {item.main_image || item.product?.main_image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${
              item.main_image || item.product?.main_image
            }`}
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
      <p className="text-[14px]">{item.ProductName || item.product_name}</p>
    </div>
  );
}
