"use client";

import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import useSamidzmaBranches from "../../../../../dataFetchs/samidzmaBranchesContext";

export default function Page() {
  const router = useRouter();
  const {
    allSamidzmaBranchesData,
    allSamidzmaBranchesLoader,
    fetchSamidzmaBranches,
  } = useSamidzmaBranches();
  const { branchStatus } = useContext(ContextForSharingStates);

  const [SamidzmaBranchesDeletePopUp, setSamidzmaBranchesDeletePopUp] =
    useState<string>("");
  const [SamidzmaBranchesLoader, setSamidzmaBranchesLoader] =
    useState<string>("");

  const HandleDeleteSamidzmaBranches = (id: any) => {
    setSamidzmaBranchesLoader(id);
    axiosAdmin
      .delete(`admin/branch/${id}`)
      .then((res) => {
        fetchSamidzmaBranches();
      })
      .catch((err) => {})
      .finally(() => {
        setSamidzmaBranchesLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">სამიძმის ფილიალები</h1>
      {allSamidzmaBranchesLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allSamidzmaBranchesData?.length > 0 ? (
        allSamidzmaBranchesData.map((item: any, index: number) => (
          <div
            key={item.StoreCode}
            className={`border-[1px] flex max-sm:flex-col items-center justify-between gap-[15px] px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              SamidzmaBranchesLoader === item.StoreCode &&
              "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div className="">
              <p className="select-none max-sm:text-center">{item.StoreName}</p>
              <p className="text-[12px] text-gray-500 max-sm:text-center">
                {item.Address}
              </p>
            </div>
            {SamidzmaBranchesLoader === item.StoreCode ? (
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <p className="text-[13px] text-gray-500">
                  {
                    branchStatus.find((item1: any) => item1.id == item.status)
                      ?.name
                  }
                </p>
                <div
                  onClick={() => {
                    router.push(
                      `/admin/panel/samidzma-branches/edit/${item.StoreCode}`
                    );
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setSamidzmaBranchesDeletePopUp(item.StoreCode);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {SamidzmaBranchesDeletePopUp === item.StoreCode && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteSamidzmaBranches(item.StoreCode);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setSamidzmaBranchesDeletePopUp("");
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
          {allSamidzmaBranchesLoader
            ? "სამიძმის ფილიალები იძებნება.."
            : "სამიძმის ფილიალები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
