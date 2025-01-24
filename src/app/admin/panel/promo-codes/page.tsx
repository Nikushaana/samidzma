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
  const {
    allPromoCodesRender,
    setAllPromoCodesRender,
    setOpenPromoCodeInfoPopUp,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allPromoCodesData, setAllPromoCodesData] = useState<any>([]);
  const [allPromoCodesLoader, setAllPromoCodesLoader] = useState<boolean>(true);

  const [PromoCodesDeletePopUp, setPromoCodesDeletePopUp] =
    useState<string>("");
  const [PromoCodesDeleteLoader, setPromoCodesDeleteLoader] =
    useState<string>("");

  useEffect(() => {
    setAllPromoCodesLoader(true);
    axiosAdmin
      .get("admin/promoCode")
      .then((res) => {
        setAllPromoCodesData(res.data.data);
        setAllPromoCodesLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allPromoCodesRender]);

  const HandleDeletePromoCodes = (id: any) => {
    setPromoCodesDeleteLoader(id);
    axiosAdmin
      .delete(`admin/promoCode/${id}`)
      .then((res) => {
        setAllPromoCodesRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setPromoCodesDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center">
      <h1 className="w-full">პრომო კოდები</h1>
      {allPromoCodesLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <DotsLoader />
        </div>
      )}{" "}
      {allPromoCodesData?.length > 0 ? (
        allPromoCodesData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              PromoCodesDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.code}</p>
            {PromoCodesDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    setOpenPromoCodeInfoPopUp(item.id);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <FaInfo />
                </div>

                <div
                  onClick={() => {
                    router.push(`/admin/panel/promo-codes/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setPromoCodesDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {PromoCodesDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeletePromoCodes(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setPromoCodesDeletePopUp("");
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
          {allPromoCodesLoader
            ? "პრომო კოდები იძებნება.."
            : "პრომო კოდები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
