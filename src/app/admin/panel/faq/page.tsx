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
  const { allFAQRender, setAllFAQRender } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allFAQData, setAllFAQData] = useState<any>([]);
  const [allFAQLoader, setAllFAQLoader] = useState<boolean>(true);

  const [FAQDeletePopUp, setFAQDeletePopUp] = useState<string>("");
  const [FAQDeleteLoader, setFAQDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllFAQLoader(true);
    axiosAdmin
      .get("admin/faq")
      .then((res) => {
        setAllFAQData(res.data.data);
        setAllFAQLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allFAQRender]);

  const HandleDeleteFAQ = (id: any) => {
    setFAQDeleteLoader(id);
    axiosAdmin
      .delete(`admin/faq/${id}`)
      .then((res) => {
        setAllFAQRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setFAQDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">FAQ</h1>
      {allFAQLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allFAQData?.length > 0 ? (
        allFAQData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              FAQDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.title}</p>
            {FAQDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/faq/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setFAQDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {FAQDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteFAQ(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setFAQDeletePopUp("");
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
        <p>{allFAQLoader ? "კითხვები იძებნება..." : "კითხვები არ არსებობს"}</p>
      )}
    </div>
  );
}
