"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { GoPencil } from "react-icons/go";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    allSiteInfoRender,
    setAllSiteInfoRender,
    siteInfoPages,
  } = useContext(ContextForSharingStates);

  const [allSiteInfoData, setAllSiteInfoData] = useState<any>([]);
  const [allSiteInfoLoader, setAllSiteInfoLoader] = useState<boolean>(true);

  const [SiteInfoDeletePopUp, setSiteInfoDeletePopUp] = useState<string>("");
  const [SiteInfoDeleteLoader, setSiteInfoDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllSiteInfoLoader(true);
    axiosAdmin
      .get("admin/siteInfo")
      .then((res) => {
        setAllSiteInfoData(res.data.data);
        setAllSiteInfoLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allSiteInfoRender]);

  const HandleDeleteSiteInfo = (id: any) => {
    setSiteInfoDeleteLoader(id);
    axiosAdmin
      .delete(`admin/siteInfo/${id}`)
      .then((res) => {
        setAllSiteInfoRender(res);
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
        setSiteInfoDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">საიტის ინფორმაცია</h1>
      {allSiteInfoLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allSiteInfoData?.length > 0 ? (
        allSiteInfoData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex max-sm:flex-col items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              SiteInfoDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div>
              <p className="text-[12px]">სექცია</p>
              <p className="">
                {
                  siteInfoPages.find((item1: any) => item1.id == item.type)
                    ?.name
                }
              </p>
            </div>

            {SiteInfoDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="relative flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/site-info/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>
                <div
                  onClick={() => {
                    setSiteInfoDeletePopUp(item.id);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                >
                  <FaTrashCan />
                </div>
                {SiteInfoDeletePopUp === item.id && (
                  <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                    <div
                      onClick={() => {
                        HandleDeleteSiteInfo(item.id);
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                    >
                      <FaTrashCan />
                    </div>
                    <div
                      onClick={() => {
                        setSiteInfoDeletePopUp("");
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:shadow-md duration-300 cursor-pointer"
                    >
                      <BsXLg />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>
          {allSiteInfoLoader
            ? "საიტის ინფორმაცია იძებნება.."
            : "საიტის ინფორმაცია არ არსებობს"}
        </p>
      )}
    </div>
  );
}
