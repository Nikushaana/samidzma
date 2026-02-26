"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import WhatUSearch from "../components/Inputs/WhatUSearch";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="">
          <h1 className="text-[28px]">
            {pathname.split("/")[2] === "signup" && "რეგისტრაცია"}
            {pathname.split("/")[2] === "signin" && "ავტორიზაცია"}
            {pathname.split("/")[2] === "forgot-password" &&
              "დაგავიწყდა პაროლი?"}
            {pathname.split("/")[2] === "restore-password" &&
              "განაახლე პაროლი"}
          </h1>
          <p className="text-[14px]">
            {pathname.split("/")[2] === "signup" && "დარეგისტრირდი, რათა მიიღო ექსკლუზიური შეთავაზებები, თვალი ადევნო შენს შეკვეთებს და დააგროვო ლოიალობის ქულები."}
            {pathname.split("/")[2] === "signin" && "გაიარე ავტორიზაცია, რათა შეხვიდე შენს ანგარიშზე. ადევნე თვალი შენს შეკვეთებს და ისიამოვნე ჩვენი ექსკლუზიური შეთავაზებებით."}
            {pathname.split("/")[2] === "forgot-password" && "ჩაწერე შენი მეილი და თვალი ადევნე მას, რადგან პაროლის აღსადგენ ლინკს მეილზე გამოგიგზავნით."}
            {pathname.split("/")[2] === "restore-password" && "ჩაწერე ახალი პაროლი, შემდეგ კი გაიარე ავტორიზაცია."}
          </p>
        </div>

        <div className="flex justify-center pb-[40px] pt-[100px] max-sm:py-0">
          <div className="rounded-[12px] overflow-hidden bg-white max-w-[684px] w-full">
            <div className="grid grid-cols-2 h-[75px] max-sm:h-[40px]">
              <h1
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className={`border-r-[1px] flex items-center justify-center h-full text-[22px] max-sm:text-[14px] cursor-pointer duration-200 ${
                  pathname.split("/")[2] === "signin"
                    ? "text-[#888889]"
                    : "text-white bg-myBlack"
                }`}
              >
                ავტორიზაცია
              </h1>
              <h1
                onClick={() => {
                  router.push("/auth/signup");
                }}
                className={`flex items-center justify-center h-full text-[22px] max-sm:text-[14px] cursor-pointer duration-200 ${
                  pathname.split("/")[2] === "signup"
                    ? "text-[#888889]"
                    : "text-white bg-myBlack"
                }`}
              >
                რეგისტრაცია
              </h1>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
