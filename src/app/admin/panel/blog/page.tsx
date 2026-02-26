"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";

export default function Page() {
  const { allBlogRender, setAllBlogRender } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();

  const [allBlogData, setAllBlogData] = useState<BlogType[]>([]);
  const [allBlogLoader, setAllBlogLoader] = useState<boolean>(true);

  const [BlogDeletePopUp, setBlogDeletePopUp] = useState<number | null>();
  const [BlogDeleteLoader, setBlogDeleteLoader] = useState<number | null>();

  useEffect(() => {
    setAllBlogLoader(true);
    axiosAdmin
      .get("admin/blog")
      .then((res) => {
        setAllBlogData(res.data.data);
        setAllBlogLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allBlogRender]);

  const HandleDeleteBlog = (id: number) => {
    setBlogDeleteLoader(id);
    axiosAdmin
      .delete(`admin/blog/${id}`)
      .then((res) => {
        setAllBlogRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setBlogDeleteLoader(null);
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">ბლოგები</h1>
      {allBlogLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center top-[150px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allBlogData?.length > 0 ? (
        allBlogData.map((item: BlogType, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              BlogDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none line-clamp-2">{item.name}</p>
            {BlogDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/blog/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setBlogDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {BlogDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteBlog(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setBlogDeletePopUp(null);
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
        <p>{allBlogLoader ? "ბლოგები იძებნება.." : "ბლოგები არ არსებობს"}</p>
      )}
    </div>
  );
}
