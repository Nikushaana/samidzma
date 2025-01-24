"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function BackgroundDesigns() {
  const pathname = usePathname();

  return (
    <div className="">
      <div
        className={`absolute top-0 right-0 max-2xl:right-[-50px] max-2xl:rotate-[5deg] w-[500px] h-[1300px] select-none z-0 ${
          pathname.startsWith("/admin") ? "hidden" : "max-lg:hidden"
        }`}
      >
        <Image
          src="/images/yellTopRigth.png"
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
          className=""
        />
      </div>
      <div
        className={`${
          pathname.split("/")[1] === "admin" ||
          pathname.split("/")[1] === "cart" ||
          pathname.split("/")[1] === "thanku" ||
          pathname.split("/")[1] === "user" ||
          pathname.split("/")[1] === "delivery-services-contract" ||
          pathname.split("/")[1] === "locations" 
            ? "hidden"
            : "max-lg:hidden"
        }`}
      >
        <div
          className={`${
            pathname.split("/")[1] === "contact-us" ||
            pathname.split("/")[1] === "careers" ||
            pathname.split("/")[1] === "signup" ||
            pathname.split("/")[1] === "user-agreement" ||
            pathname.split("/")[1] === "delivery-services-contract"
              ? "top-[30vh]"
              : "top-[160vh] max-2xl:top-[180vh]"
          } absolute left-[-20px] max-2xl:left-[-100px] select-none w-[320px] h-[530px] z-0`}
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
          className={`${
            pathname.split("/")[1] === "contact-us" ||
            pathname.split("/")[1] === "careers" ||
            pathname.split("/")[1] === "signup" ||
            pathname.split("/")[1] === "user-agreement" ||
            pathname.split("/")[1] === "delivery-services-contract"
              ? "top-[45vh]"
              : "top-[175vh] max-2xl:top-[198vh]"
          } absolute select-none left-[0px] max-2xl:left-[-70px] w-[220px] h-[530px] z-0`}
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
