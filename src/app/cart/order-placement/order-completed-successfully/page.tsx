"use client";

import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="h-[50vh] flex items-center justify-center">
      <div className="relative flex flex-col gap-y-[10px] items-center justify-center">
        <div className="absolute top-[30px] left-[50%] translate-x-[-220px] max-tiny:translate-x-[-160px] rotate-[270deg] w-[100px] h-[80px]">
          <Image
            src="/images/starsimg.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="relative w-[100px] h-[80px]">
          <Image
            src="/images/starsimg2.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="absolute top-[30px] right-[50%] translate-x-[220px] max-tiny:translate-x-[160px] w-[100px] h-[80px]">
          <Image
            src="/images/starsimg.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h1 className="text-[48px] max-tiny:text-[28px]">მადლობა!</h1>
        <h1 className="text-[22px] max-tiny:text-[18px]">
          შენი შეკვეთა მიღებულია.
        </h1>
        <p className="text-[14px]">დაელოდე ზარს კურიერისგან.</p>
      </div>
    </div>
  );
}
