"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import useSecondCategories from "../../../../../../dataFetchs/secondCategoriesContext";

export default function Page() {
  const { fetchSecondCategories, allSecondCategsData, allSecondCategsLoader } = useSecondCategories();

  const router = useRouter();

  const [SecondCategsDeletePopUp, setSecondCategsDeletePopUp] =
    useState<string>("");
  const [SecondCategsDeleteLoader, setSecondCategsDeleteLoader] =
    useState<string>("");

  const HandleDeleteSecondCategs = (id: any) => {
    setSecondCategsDeleteLoader(id);
    axiosAdmin
      .delete(`admin/category/productTypeGroupe/${id}`)
      .then((res) => {
        fetchSecondCategories();
      })
      .catch((err) => {})
      .finally(() => {
        setSecondCategsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">მეორე რიგის კატეგორიები</h1>
      {allSecondCategsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allSecondCategsData?.length > 0 ? (
        allSecondCategsData.map((item: any, index: number) => (
          <div
            key={item.IdProdTypeGroup}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              SecondCategsDeleteLoader === item.IdProdTypeGroup &&
              "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.ProdTypeGroupName}</p>
            {SecondCategsDeleteLoader === item.IdProdTypeGroup ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(
                      `/admin/panel/first-categories/second-categories/edit/${item.IdProdTypeGroup}`
                    );
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setSecondCategsDeletePopUp(item.IdProdTypeGroup);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {SecondCategsDeletePopUp === item.IdProdTypeGroup && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteSecondCategs(item.IdProdTypeGroup);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setSecondCategsDeletePopUp("");
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
          {allSecondCategsLoader
            ? "მეორე რიგის კატეგორიები იძებნება.."
            : "მეორე რიგის კატეგორიები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
