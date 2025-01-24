"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import Image from "next/image";

export default function Page() {
  const { allBannerRender, setAllBannerRender } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();

  const [allBannerData, setAllBannerData] = useState<any>([]);
  const [allBannerLoader, setAllBannerLoader] = useState<boolean>(true);

  const [BannerDeletePopUp, setBannerDeletePopUp] = useState<string>("");
  const [BannerDeleteLoader, setBannerDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllBannerLoader(true);
    axiosAdmin
      .get("admin/mainBanner?page=1&per_page=999")
      .then((res) => {
        setAllBannerData(res.data.data);
        setAllBannerLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allBannerRender]);

  const HandleDeleteBanner = (id: any) => {
    setBannerDeleteLoader(id);
    axiosAdmin
      .delete(`admin/mainBanner/${id}`)
      .then((res) => {
        setAllBannerRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setBannerDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center">
      <h1 className="w-full">მთავარი ბანერი</h1>
      {allBannerLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center">
          <DotsLoader />
        </div>
      )}{" "}
      {allBannerData?.length > 0 ? (
        allBannerData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              BannerDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <div>
                <p className="text-[10px]">დიდი ბანერი</p>
                <div className="flex items-center gap-[10px]">
                  {item?.large_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.large_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {item?.large_mobile_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.large_mobile_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              |
              <div>
                <p className="text-[10px]">საშუალო ბანერი</p>
                <div className="flex items-center gap-[10px]">
                  {item?.medium_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.medium_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {item?.medium_mobile_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.medium_mobile_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              |
              <div>
                <p className="text-[10px]">პატარა 1 ბანერი</p>
                <div className="flex items-center gap-[10px]">
                  {item?.small1_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small1_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {item?.small1_mobile_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small1_mobile_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              |
              <div>
                <p className="text-[10px]">პატარა 2 ბანერი</p>
                <div className="flex items-center gap-[10px]">
                  {item?.small2_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small2_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  {item?.small2_mobile_url?.length > 0 && (
                    <div className="relative w-[40px] aspect-square bg-white rounded-[8px] overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.small2_mobile_url}`}
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {BannerDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/main-banners/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setBannerDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {BannerDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteBanner(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setBannerDeletePopUp("");
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
          {allBannerLoader ? "ბანერები იძებნება.." : "ბანერები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
