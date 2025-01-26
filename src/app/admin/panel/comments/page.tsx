"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { FaInfo } from "react-icons/fa";

export default function Page() {
  const { allCommentsRender, setAllCommentsRender } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();

  const [allCommentsData, setAllCommentsData] = useState<any>([]);
  const [allCommentsLoader, setAllCommentsLoader] = useState<boolean>(true);

  const [commentsDeletePopUp, setCommentsDeletePopUp] = useState<string>("");
  const [commentsDeleteLoader, setCommentsDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllCommentsLoader(true);
    axiosAdmin
      .get("admin/reviews?page=1&per_page=999")
      .then((res) => {
        setAllCommentsData(res.data.data);
        setAllCommentsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allCommentsRender]);

  const HandleDeleteComments = (id: any) => {
    setCommentsDeleteLoader(id);
    axiosAdmin
      .delete(`admin/reviews/${id}`)
      .then((res) => {
        setAllCommentsRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setCommentsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">კომენტარები</h1>
      {allCommentsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allCommentsData?.length > 0 ? (
        allCommentsData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              commentsDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div>
              {item.user_id === null && (
                <p className="select-none text-[13px] text-gray-500">ადმინის პასუხი</p>
              )}
              <p className="select-none truncate">{item.review}</p>
            </div>
            {commentsDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/comments/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setCommentsDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {commentsDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteComments(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setCommentsDeletePopUp("");
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
          {allCommentsLoader
            ? "კომენტარები იძებნება.."
            : "კომენტარები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
