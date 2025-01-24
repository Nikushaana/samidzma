"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { FaInfo } from "react-icons/fa";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";

export default function Page() {
  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    allMessagesRender,
    setAllMessagesRender,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allMessagesData, setAllMessagesData] = useState<any>([]);
  const [allMessagesLoader, setAllMessagesLoader] = useState<boolean>(true);

  const [MessagesDeletePopUp, setMessagesDeletePopUp] = useState<string>("");
  const [MessagesDeleteLoader, setMessagesDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllMessagesLoader(true);
    axiosAdmin
      .get("admin/customerQuestion")
      .then((res) => {
        setAllMessagesData(res.data.data);
        setAllMessagesLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allMessagesRender]);

  const HandleDeleteMessages = (id: any) => {
    setMessagesDeleteLoader(id);
    axiosAdmin
      .delete(`admin/customerQuestion/${id}`)
      .then((res) => {
        setAllMessagesRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით წაიშალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ წაიშალა!");
      })
      .finally(() => {
        setMessagesDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">მონაწერები</h1>
      {allMessagesLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allMessagesData?.length > 0 ? (
        allMessagesData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              MessagesDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.title}</p>

            <p className="select-none">{item.name + " " + item.last_name}</p>
            {MessagesDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/messages/info/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <FaInfo />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setMessagesDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {MessagesDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteMessages(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setMessagesDeletePopUp("");
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
          {allMessagesLoader
            ? "მონაწერები იძებნება.."
            : "მონაწერები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
