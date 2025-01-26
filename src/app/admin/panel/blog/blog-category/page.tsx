"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import useBlogCategory from "../../../../../../dataFetchs/blogCategoryGetFetch";

export default function Page() {
  const router = useRouter();
  const {
    fetchBlogCategory,
    allBlogCategLoader,
    allBlogCategData,
  } = useBlogCategory();


  const [BlogCategDeletePopUp, setBlogCategDeletePopUp] = useState<string>("");
  const [BlogCategDeleteLoader, setBlogCategDeleteLoader] =
    useState<string>("");

  const HandleDeleteBlogCateg = (id: any) => {
    setBlogCategDeleteLoader(id);
    axiosAdmin
      .delete(`admin/blogCategory/${id}`)
      .then((res) => {
        fetchBlogCategory();
      })
      .catch((err) => {})
      .finally(() => {
        setBlogCategDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">ბლოგის კატეგორიები</h1>
      {allBlogCategLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allBlogCategData?.length > 0 ? (
        allBlogCategData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              BlogCategDeleteLoader == item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.name}</p>
            {BlogCategDeleteLoader == item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(
                      `/admin/panel/blog/blog-category/edit/${item.id}`
                    );
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setBlogCategDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {BlogCategDeletePopUp == item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteBlogCateg(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setBlogCategDeletePopUp("");
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:shadow-md duration-300 cursor-pointer"
                      >
                        <BsXLg />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>
          {allBlogCategLoader
            ? "ბლოგის კატეგორიები იძებნება.."
            : "ბლოგის კატეგორიები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
