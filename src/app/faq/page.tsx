"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Input1 from "../components/Inputs/Input1";
import TextArea1 from "../components/Inputs/TextArea1";
import { SlArrowDown } from "react-icons/sl";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import DotsLoader from "../components/loaders/DotsLoader";

export default function Page() {
  const dropRef = useRef<HTMLDivElement>(null);

  const [allFAQData, setAllFAQData] = useState<any>([]);
  const [allFAQLoader, setAllFAQLoader] = useState<boolean>(true);

  useEffect(() => {
    setAllFAQLoader(true);
    axiosUser
      .get("front/faq")
      .then((res) => {
        setAllFAQData(res.data.data);
        setAllFAQLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const [activeQuest, setActiveQuest] = useState<number | null>();
  const [dropHeight, setDropHeight] = useState(0);

  useEffect(() => {
    if (activeQuest && dropRef.current) {
      setDropHeight(dropRef.current.clientHeight);
    }
  }, [activeQuest]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[300px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <h1 className="text-[28px]">ხშირად დასმული კითხვები</h1>

        <div className="flex flex-col items-center gap-y-[20px]">
          {allFAQLoader
            ? [1, 2, 3, 4].map((item: any, index: number) => (
                <div
                  key={item}
                  className="w-full h-[75px] rounded-[40px] overflow-hidden"
                >
                  <div className="loaderwave rounded-[40px]"></div>
                </div>
              ))
            : allFAQData.map((item: any, index: number) => (
                <div key={item.id} className="w-full">
                  <div
                    onClick={() => {
                      setActiveQuest((pre) =>
                        pre === item.id ? null : item.id
                      );
                    }}
                    className={`flex items-center justify-between h-[75px] px-[30px] duration-200 cursor-pointer ${
                      activeQuest === item.id
                        ? "bg-myGreen rounded-t-[40px] text-white"
                        : "bg-white rounded-[40px]"
                    }`}
                  >
                    <p className="text-[18px] max-tiny:text-[16px]">
                      {item.title}
                    </p>
                    <SlArrowDown
                      className={`duration-300 ${
                        activeQuest === item.id ? "rotate-[180deg]" : ""
                      }`}
                    />
                  </div>
                  <div
                    style={{
                      height: `${
                        activeQuest === item.id ? dropHeight + 60 : 0
                      }px`,
                      paddingTop: `${activeQuest === item.id ? 30 : 0}px`,
                      paddingBottom: `${activeQuest === item.id ? 30 : 0}px`,
                      marginTop: `${activeQuest === item.id ? 0 : -25}px`,
                      marginBottom: `${activeQuest === item.id ? 0 : 25}px`,
                    }}
                    className={`bg-white rounded-b-[40px] overflow-hidden duration-200 px-[30px] ${
                      activeQuest === item.id ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    <div
                      ref={dropRef}
                      className="ql-editor"
                      dangerouslySetInnerHTML={{
                        __html: item.answer ? item.answer : "",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
        </div>

        <div className="max-lg:hidden">
          <div
            className={`absolute top-0 right-[100px] select-none w-[70px] h-[70px] z-0`}
          >
            <Image
              src="/images/questBig.png"
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
            className={`absolute top-[100px] right-[70px] rotate-[20deg] select-none w-[40px] h-[40px] z-0`}
          >
            <Image
              src="/images/questBig.png"
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
            className={`absolute top-[60px] right-[20px] rotate-[-20deg] select-none w-[30px] h-[30px] z-0`}
          >
            <Image
              src="/images/questBig.png"
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
            className={`absolute top-0 left-[100px] select-none w-[70px] h-[70px] z-0`}
          >
            <Image
              src="/images/questgreen.png"
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
            className={`absolute top-[100px] left-[70px] rotate-[20deg] select-none w-[40px] h-[40px] z-0`}
          >
            <Image
              src="/images/questgreen.png"
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
            className={`absolute top-[60px] left-[20px] rotate-[-20deg] select-none w-[30px] h-[30px] z-0`}
          >
            <Image
              src="/images/questgreen.png"
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
    </div>
  );
}
