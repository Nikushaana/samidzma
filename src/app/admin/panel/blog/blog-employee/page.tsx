"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";

export default function Page() {
  const { allBlogAuthorRender, setAllBlogAuthorRender } = useContext(
    ContextForSharingStates,
  );
  const router = useRouter();

  const [allBlogAuthorData, setAllBlogAuthorData] = useState<BlogType[]>([]);
  const [allBlogAuthorLoader, setAllBlogAuthorLoader] = useState<boolean>(true);

  const [BlogAuthorDeletePopUp, setBlogAuthorDeletePopUp] = useState<number | null>();
  const [BlogAuthorDeleteLoader, setBlogAuthorDeleteLoader] = useState<number | null>();

  useEffect(() => {
    setAllBlogAuthorLoader(true);
    axiosAdmin
      .get("admin/employee")
      .then((res) => {
        setAllBlogAuthorData(res.data.data);
        setAllBlogAuthorLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allBlogAuthorRender]);

  const HandleDeleteBlogAuthor = (id: number) => {
    setBlogAuthorDeleteLoader(id);
    axiosAdmin
      .delete(`admin/employee/${id}`)
      .then((res) => {
        setAllBlogAuthorRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setBlogAuthorDeleteLoader(null);
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">ბლოგის ავტორები</h1>
      {allBlogAuthorLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center top-[150px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allBlogAuthorData?.length > 0 ? (
        allBlogAuthorData.map((item: BlogType, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              BlogAuthorDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none line-clamp-2">{item.name}</p>
            {BlogAuthorDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/blog/blog-employee/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setBlogAuthorDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {BlogAuthorDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteBlogAuthor(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setBlogAuthorDeletePopUp(null);
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
          {allBlogAuthorLoader
            ? "ბლოგის ავტორები იძებნება.."
            : "ბლოგის ავტორები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
