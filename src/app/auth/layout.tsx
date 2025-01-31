"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import Input1 from "../components/Inputs/Input1";
import TextArea1 from "../components/Inputs/TextArea1";
import { ImAttachment } from "react-icons/im";
import { BsCheck } from "react-icons/bs";
import CheckBox from "../components/Inputs/CheckBox";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import GreenButton from "../components/buttons/greenButton";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="">
          <h1 className="text-[28px]">
            {pathname.split("/")[2] === "signup"
              ? "რეგისტრაცია"
              : "ავტორიზაცია"}
          </h1>
          <p className="text-[14px]">
            {pathname.split("/")[2] === "signup"
              ? "დარეგისტრირდი, რათა მიიღო ექსკლუზიური შეთავაზებები, თვალი ადევნო შენს შეკვეთებს და დააგროვო ლოიალობის ქულები."
              : "გაიარე ავტორიზაცია, რათა შეხვიდე შენს ანგარიშზე. ადევნე თვალი შენს შეკვეთებს და ისიამოვნე ჩვენი ექსკლუზიური შეთავაზებებით."}
          </p>
        </div>

        <div className="flex justify-center pb-[40px] pt-[100px] max-tiny:py-0">
          <div className="rounded-[12px] overflow-hidden bg-white max-w-[684px] w-full">
            <div className="grid grid-cols-2 h-[75px] max-tiny:h-[40px]">
              <h1
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className={`flex items-center justify-center h-full text-[22px] max-tiny:text-[14px] cursor-pointer duration-200 ${
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
                className={`flex items-center justify-center h-full text-[22px] max-tiny:text-[14px] cursor-pointer duration-200 ${
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
