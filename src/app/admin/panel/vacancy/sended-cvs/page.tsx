"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import useVacancies from "../../../../../../dataFetchs/vacanciesContext";
import { FaInfo } from "react-icons/fa";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";

export default function Page() {
  const { vacancyData } = useVacancies();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    seen,
    allVacancyCvRender,
    setAllVacancyCvRender,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allVacancyCvData, setAllVacancyCvData] = useState<any>([]);
  const [allVacancyCvLoader, setAllVacancyCvLoader] = useState<boolean>(true);

  const [VacancyCvDeletePopUp, setVacancyCvDeletePopUp] = useState<string>("");
  const [VacancyCvDeleteLoader, setVacancyCvDeleteLoader] =
    useState<string>("");

  useEffect(() => {
    setAllVacancyCvLoader(true);
    axiosAdmin
      .get("admin/vacancyCv")
      .then((res) => {
        setAllVacancyCvData(res.data.data);
        setAllVacancyCvLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allVacancyCvRender]);

  const HandleDeleteVacancyCv = (id: any) => {
    setVacancyCvDeleteLoader(id);
    axiosAdmin
      .delete(`admin/vacancyCv/${id}`)
      .then((res) => {
        setAllVacancyCvRender(res);
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
        setVacancyCvDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">შემოსული CV-ები</h1>
      {allVacancyCvLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allVacancyCvData?.length > 0 ? (
        allVacancyCvData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              VacancyCvDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div>
              <p className="select-none">
                {
                  vacancyData.find((item1: any) => item1.id === item.vacancy_id)
                    ?.position
                }
              </p>

              <p className="select-none text-[14px] text-gray-500">
                {item.name + " " + item.last_name}
              </p>
              <p className="select-none text-[14px] text-gray-400 underline">{seen.find((item1: any) => item1.id === item.status)?.name}</p>
            </div>
            {VacancyCvDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(
                      `/admin/panel/vacancy/sended-cvs/info/${item.id}`
                    );
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <FaInfo />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setVacancyCvDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {VacancyCvDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteVacancyCv(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setVacancyCvDeletePopUp("");
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
          {allVacancyCvLoader ? "CV-ები იძებნება..." : "CV-ები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
