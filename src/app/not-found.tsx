"use client";

import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import WhatUSearch from "./components/Inputs/WhatUSearch";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div
      className={`px-[200px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] relative flex flex-col gap-y-[30px] ${
        pathname.split("/")[1] == "admin" &&
        "min-h-[100vh] items-center justify-center"
      }`}
    >
      {pathname.split("/")[1] !== "admin" && <WhatUSearch />}

      <div className="flex flex-col items-center w-full">
        <div className="relative h-[443px] w-[603px] max-lg:h-auto max-lg:w-[80%] max-tiny:w-full max-lg:aspect-[4/2]">
          <Image
            src="/images/404.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h1 className="text-[48px] max-lg:text-[28px] max-tiny:text-[18px]">
          გვერდი არ მოიძებნა
        </h1>
      </div>

      <div className={`max-lg:hidden`}>
        <div
          className={`top-[5vh] absolute left-[-20px] select-none w-[320px] h-[530px] z-0`}
        >
          <Image
            src="/images/greenColSmall.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
            className=""
          />
        </div>
        <div
          className={`top-[15vh] absolute select-none left-[-50px] w-[220px] h-[530px] z-0`}
        >
          <Image
            src="/images/yellowColBig.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
