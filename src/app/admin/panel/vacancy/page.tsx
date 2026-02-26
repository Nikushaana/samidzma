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
  const { allVacancyRender, setAllVacancyRender } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();

  const [allVacancyData, setAllVacancyData] = useState<any>([]);
  const [allVacancyLoader, setAllVacancyLoader] = useState<boolean>(true);

  const [vacancyDeletePopUp, setVacancyDeletePopUp] = useState<string>("");
  const [vacancyDeleteLoader, setVacancyDeleteLoader] = useState<string>("");

  useEffect(() => {
    setAllVacancyLoader(true);
    axiosAdmin
      .get("admin/vacancy")
      .then((res) => {
        setAllVacancyData(res.data.data);
        setAllVacancyLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allVacancyRender]);

  const HandleDeleteVacancy = (id: any) => {
    setVacancyDeleteLoader(id);
    axiosAdmin
      .delete(`admin/vacancy/${id}`)
      .then((res) => {
        setAllVacancyRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setVacancyDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">ვაკანსიები</h1>
      {allVacancyLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}
      {allVacancyData?.length > 0 ? (
        allVacancyData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] bg-white flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              vacancyDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.position}</p>
            {vacancyDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/vacancy/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setVacancyDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {vacancyDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteVacancy(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setVacancyDeletePopUp("");
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
          {allVacancyLoader ? "ვაკანსიები იძებნება..." : "ვაკანსიები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
