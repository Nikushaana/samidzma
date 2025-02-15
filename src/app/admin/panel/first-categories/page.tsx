"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import GreenButton from "@/app/components/buttons/greenButton";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import useFirstCategories from "../../../../../dataFetchs/firstCategoriesContext";
import { FaSort } from "react-icons/fa";
import Image from "next/image";
import { IoIosRefresh } from "react-icons/io";

export default function Page() {
  const { allFirstCategsData, allFirstCategsLoader, fetchFirstCategories } =
    useFirstCategories();

  const router = useRouter();

  const [FirstCategsDeletePopUp, setFirstCategsDeletePopUp] =
    useState<string>("");
  const [FirstCategsDeleteLoader, setFirstCategsDeleteLoader] =
    useState<string>("");

  const HandleDeleteFirstCategs = (id: any) => {
    setFirstCategsDeleteLoader(id);
    axiosAdmin
      .delete(`admin/category/saxeobebi/${id}`)
      .then((res) => {
        fetchFirstCategories();
      })
      .catch((err) => {})
      .finally(() => {
        setFirstCategsDeleteLoader("");
      });
  };

  //

  const [FirstCategsSystemRefreshPopUp, setFirstCategsSystemRefreshPopUp] =
    useState<string>("");

  const HandleSystemRefreshFirstCategs = (id: any) => {
    setFirstCategsDeleteLoader(id);
    axiosAdmin
      .get(`admin/category/updateSaxeobaWithSystem/${id}`)
      .then((res) => {
        fetchFirstCategories();
        setFirstCategsSystemRefreshPopUp("")
      })
      .catch((err) => {})
      .finally(() => {
        setFirstCategsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">პირველი რიგის კატეგორიები</h1>
      {allFirstCategsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allFirstCategsData?.length > 0 ? (
        allFirstCategsData.map((item: any, index: number) => (
          <div
            key={item.IdProdSaxeoba}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              FirstCategsDeleteLoader === item.IdProdSaxeoba &&
              "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div className="flex items-center gap-[20px] h-full">
              <p># {item.sort}</p>
              {item?.image?.length > 0 && (
                <div className="relative h-[40px] w-[60px] bg-white rounded-[8px] overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <p className="select-none">{item.ProdSaxeobaName}</p>
            </div>
            {FirstCategsDeleteLoader === item.IdProdSaxeoba ? (
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <div
                    onClick={() => {
                      setFirstCategsSystemRefreshPopUp(item.IdProdSaxeoba);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[green] text-[18px] hover:bg-green-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <IoIosRefresh />
                  </div>
                  {FirstCategsSystemRefreshPopUp === item.IdProdSaxeoba && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleSystemRefreshFirstCategs(item.IdProdSaxeoba);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[green] text-[18px] hover:bg-green-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <IoIosRefresh />
                      </div>
                      <div
                        onClick={() => {
                          setFirstCategsSystemRefreshPopUp("");
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:shadow-md duration-300 cursor-pointer"
                      >
                        <BsXLg />
                      </div>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => {
                    router.push(
                      `/admin/panel/first-categories/edit/${item.IdProdSaxeoba}`
                    );
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setFirstCategsDeletePopUp(item.IdProdSaxeoba);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {FirstCategsDeletePopUp === item.IdProdSaxeoba && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteFirstCategs(item.IdProdSaxeoba);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setFirstCategsDeletePopUp("");
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
          {allFirstCategsLoader
            ? "პირველი რიგის კატეგორიები იძებნება.."
            : "პირველი რიგის კატეგორიები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
