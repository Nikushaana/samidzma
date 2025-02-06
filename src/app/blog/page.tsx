"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import CartCalculator from "../components/CartCalculator/CartCalculator";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import BlogCard from "../components/CardVariations/BlogCard";
import useScreenWidth from "../components/ScreenWidth";
import useBlog from "../../../dataFetchs/blogContext";

export default function Page() {
  const router = useRouter();
  const screenWidth = useScreenWidth();
  const { blogData, blogLoader } = useBlog();

  const [openCalendar, setopenCalendar] = useState(false);

  const [blogCategoriesData, setBlogCategoriesData] = useState<any>([]);
  const [blogCategoriesLoader, setBlogCategoriesLoader] =
    useState<boolean>(true);

  useEffect(() => {
    setBlogCategoriesLoader(true);
    axiosUser
      .get("front/info/blogCategory")
      .then((res) => {
        setBlogCategoriesData(res.data.data);
        setBlogCategoriesLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      
    <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[30px]">
      <div className="relative">
        <div className="rounded-full bg-white flex items-center gap-[5px] justify-between">
          <div className="flex items-center px-[20px] w-[calc(100%-50px)]">
            <input
              type="text"
              name=""
              placeholder="რას ეძებ?"
              className="text-[14px] w-full outline-none"
              id=""
            />
          </div>
          <div
            onClick={() => {
              // setopenCalendar((pre) => !pre);
            }}
            className="text-myGreen shrink-0 cursor-pointer flex items-center justify-center text-[24px] w-[43px] h-[43px]"
          >
            <LuCalendarDays />
          </div>
          <div className="bg-myGreen shrink-0 text-white cursor-pointer flex items-center justify-center text-[18px] w-[43px] h-[43px] rounded-full">
            <IoSearchOutline />
          </div>
        </div>
        <div
          className={`absolute z-[2] rounded-b-[30px] rounded-t-[20px] top-[45px] w-full h-[400px] bg-[#0000003a] backdrop-blur-md ${
            openCalendar ? "flex" : "hidden"
          }`}
        ></div>
      </div>

      <div className="flex items-center gap-[10px]">
        <h1 className="text-[14px] w-[40px]">თეგი: </h1>
        <div className="w-[calc(100%-50px)] flex items-center gap-[10px] overflow-x-auto notShowScrollHor ">
          {blogCategoriesData.map((item: any, index: number) => (
            <h1
              key={item.id}
              style={{
                background: item.color,
              }}
              className={`text-[12px] px-[10px] h-[26px] flex items-center rounded-full cursor-pointer`}
            >
              {item.name}
            </h1>
          ))}
        </div>
      </div>
      <div className="relative rounded-[12px] bg-[#EAEDEE] p-[30px] max-tiny:p-0 overflow-hidden flex flex-col gap-y-[20px]">
        <h1 className="text-[28px]">ბლოგი</h1>
        <div className="grid grid-cols-4 max-lg:grid-cols-2 max-tiny:grid-cols-1 gap-[20px]">
          {blogLoader
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item: any, index: number) => (
                <div key={item} className="w-full h-[450px] rounded-[12px] overflow-hidden">
                  <div className="loaderwave"></div>
                </div>
              ))
            : blogData.map((item: any, index: any) => (
                <div
                  key={item.id}
                  onClick={() => {
                    router.push(`/blog/${item.id}`);
                  }}
                  className={`${
                    screenWidth > 1025
                      ? index == 0 || index == 7
                        ? "col-span-4 max-lg:col-span-1"
                        : index == 1 ||
                          index == 2 ||
                          index == 5 ||
                          index == 6 ||
                          index == 8 ||
                          index == 9 ||
                          index == 10 ||
                          index == 11
                        ? "col-span-1"
                        : (index == 3 || index == 4) && "col-span-2"
                      : screenWidth > 470
                      ? index % 3 == 0
                        ? "col-span-2"
                        : "col-span-1"
                      : "col-span-1"
                  }`}
                >
                  <BlogCard
                    item={item}
                    colspan={`${
                      screenWidth > 1025
                        ? index == 0 || index == 7
                          ? "all"
                          : index == 1 ||
                            index == 2 ||
                            index == 5 ||
                            index == 6 ||
                            index == 8 ||
                            index == 9 ||
                            index == 10 ||
                            index == 11
                          ? "one"
                          : (index == 3 || index == 4) && "half"
                        : screenWidth > 470
                        ? index % 3 == 0
                          ? "all"
                          : "one"
                        : "one"
                    }`}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
    </div>

  );
}
