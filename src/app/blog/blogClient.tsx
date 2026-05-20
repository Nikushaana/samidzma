"use client";

import React, { Suspense } from "react";
import BlogCard from "../components/CardVariations/BlogCard";
import WhatUSearch from "../components/Inputs/WhatUSearch";

export default function BlogClient({ blogData, blogCategories }: any) {
  function getColspan(index: number) {
    if (index === 0 || index === 7) return "all";
    if ([3, 4].includes(index)) return "half";
    return "one";
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[30px]">
        <Suspense fallback={<div className="h-[50px]" />}>
          <WhatUSearch />
        </Suspense>

        <div className="flex items-start gap-[10px]">
          <h1 className="text-[14px]">თეგი: </h1>
          <div className="flex-1 flex items-center gap-[10px] flex-wrap z-10">
            {blogCategories?.data.map((item: any, index: number) => (
              <h1
                key={item.id}
                style={{
                  background: item.color,
                }}
                className={`text-[12px] px-[10px] h-[26px] flex items-center rounded-full text-white`}
              >
                {item.name}
              </h1>
            ))}
          </div>
        </div>
        <div className="relative rounded-[12px] bg-[#EAEDEE] p-[30px] max-sm:p-0 overflow-hidden flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ბლოგი</h1>
          {blogData?.data && blogData.data.length > 0 ? (
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
              {blogData?.data?.map((item: any, index: any) => (
                <div
                  key={item.id}
                  className={
                    getColspan(index) === "all"
                      ? "col-span-4 max-lg:col-span-1"
                      : getColspan(index) === "half"
                        ? "col-span-2 max-lg:col-span-1"
                        : "col-span-1"
                  }
                >
                  <BlogCard item={item} colspan={getColspan(index)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-[40px] text-gray-500">
              ბლოგი არ არსებობს
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
