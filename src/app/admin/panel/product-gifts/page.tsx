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
    allProdGiftsRender,
    setAllProdGiftsRender,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allProdGiftsData, setAllProdGiftsData] = useState<any>([]);
  const [allProdGiftsLoader, setAllProdGiftsLoader] = useState<boolean>(true);

  const [ProdGiftsDeletePopUp, setProdGiftsDeletePopUp] = useState<string>("");
  const [ProdGiftsDeleteLoader, setProdGiftsDeleteLoader] =
    useState<string>("");

  useEffect(() => {
    setAllProdGiftsLoader(true);
    axiosAdmin
      .get("admin/productGift")
      .then((res) => {
        setAllProdGiftsData(res.data.data);
        setAllProdGiftsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allProdGiftsRender]);

  const HandleDeleteProdGifts = (id: any) => {
    setProdGiftsDeleteLoader(id);
    axiosAdmin
      .delete(`admin/productGift/${id}`)
      .then((res) => {
        setAllProdGiftsRender(res);
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
        setProdGiftsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">პროდუქტის საჩუქრები</h1>
      {allProdGiftsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allProdGiftsData?.length > 0 ? (
        allProdGiftsData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex max-sm:flex-col items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              ProdGiftsDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div>
              <p className="text-[12px]">პროდუქტის ID</p>
              <p className="">{item.ProdCode}</p>
            </div>
            <div>
              <p className="text-[12px]">საჩუქრები</p>
              <p className="">{item.gift_prod_code}</p>
            </div>
            {ProdGiftsDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="relative">
                <div
                  onClick={() => {
                    setProdGiftsDeletePopUp(item.id);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                >
                  <FaTrashCan />
                </div>
                {ProdGiftsDeletePopUp === item.id && (
                  <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                    <div
                      onClick={() => {
                        HandleDeleteProdGifts(item.id);
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                    >
                      <FaTrashCan />
                    </div>
                    <div
                      onClick={() => {
                        setProdGiftsDeletePopUp("");
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
          {allProdGiftsLoader
            ? "პროდუქტის საჩუქრები იძებნება.."
            : "პროდუქტის საჩუქრები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
