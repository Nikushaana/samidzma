"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function BlogCard({ item, colspan }: any) {
  return (
    <div
      onClick={() => {
        // router.push("/blog/1");
      }}
      className={`rounded-[8px] bg-white grid p-[20px] cursor-pointer h-full ${
        colspan === "all" || colspan === "half"
          ? "grid-cols-2 gap-[40px] "
          : "grid-cols-1 gap-y-[10px] "
      }`}
    >
      <div
        className={`relative w-full aspect-[4/3] h-full max-h-[350px] rounded-[4px] overflow-hidden ${
          colspan === "all" ? "max-h-[245px]" : ""
        }`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_img}`}
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div className="flex flex-col justify-between gap-y-[30px]">
        <div
          className={`flex flex-col ${colspan === "all" ? "gap-y-[20px]" : ""}`}
        >
          <h1 className="text-[22px] max-2xl:text-[18px] line-clamp-2">
            {item?.name}
          </h1>
          <p
            className={`text-[14px] text-[#323434]  ${
              colspan === "all" ? "line-clamp-5" : "line-clamp-2"
            }`}
          >
            {item?.description}
          </p>
        </div>

        <p
          onClick={() => {
            // router.push("/blog/1");
          }}
          className="text-[18px] max-tiny:text-[14px] underline text-myGreen"
        >
          წაიკითხე ვრცლად
        </p>
      </div>
    </div>
  );
}
