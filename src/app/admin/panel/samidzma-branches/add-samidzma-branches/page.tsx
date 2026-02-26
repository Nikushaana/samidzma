/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { FaMinus, FaPlus } from "react-icons/fa";
import useSamidzmaBranches from "../../../../../../dataFetchs/samidzmaBranchesContext";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { allSamidzmaBranchesData, fetchSamidzmaBranches } =
    useSamidzmaBranches();

  const [branchFromServerData, setBranchFromServerData] = useState([]);
  const [branchFromServerLoader, setBranchFromServerLoader] = useState(true);

  const [loaderBranchFromServer, setLoaderBranchFromServer] = useState<string>("");

  useEffect(() => {
    setBranchFromServerLoader(true);
    axiosAdmin
      .get(`admin/branchFromServer`)
      .then((res) => {
        setBranchFromServerLoader(false);
        setBranchFromServerData(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const HandleAddSamidzmaBranch = (id: any) => {
    axiosAdmin
      .post("admin/branch", {
        StoreCode: parseInt(id),
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
        fetchSamidzmaBranches();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {
        setLoaderBranchFromServer("");
      });
  };

  const HandleDeleteSamidzmaBranch = (id: any) => {
    axiosAdmin
      .delete(`admin/branch/${id}`)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("ფილიალი გაუქმდა");
        fetchSamidzmaBranches();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ფილიალი ვერ გაუქმდა!");
      })
      .finally(() => {
        setLoaderBranchFromServer("");
      });
  };

  return (
    <div className={`flex flex-col gap-y-[20px] `}>
      <h1>სამიძმის ფილიალების დამატება ბაზიდან</h1>
      <hr />
      {branchFromServerData?.length > 0 ? (
        branchFromServerData?.map((item: any, index: number) => (
          <div
            key={item.StoreCode}
            className={`border-[1px] flex max-sm:flex-col max-sm:gap-y-[10px] items-center justify-between px-[20px] py-[10px] rounded-[10px] w-full duration-100  ${
              loaderBranchFromServer === item.StoreCode &&
              "opacity-[0.5] pointer-events-none"
            } ${
              allSamidzmaBranchesData.find(
                (item1: any) => item1.StoreCode === item.StoreCode
              )
                ? "opacity-[0.5]"
                : ""
            }`}
          >
            <div>
              <p className="select-none max-sm:text-center">{item.StoreName}</p>
              <p className="text-[12px] text-gray-500 max-sm:text-center">{item.Address}</p>
            </div>

            <div className="flex items-center gap-[10px]">
              <div
                onClick={() => {
                  if (
                    allSamidzmaBranchesData.find(
                      (item1: any) => item1.StoreCode === item.StoreCode
                    )
                  ) {
                    HandleDeleteSamidzmaBranch(item.StoreCode);
                  } else {
                    HandleAddSamidzmaBranch(item.StoreCode);
                  }
                }}
                className={`px-[30px] h-[40px] rounded-full flex gap-[15px] items-center justify-center text-gray-600 text-[18px] group hover:bg-white cursor-pointer shadow duration-100 ${
                  allSamidzmaBranchesData.find(
                    (item1: any) => item1.StoreCode === item.StoreCode
                  )
                    ? "hover:shadow-md shadow-[red]"
                    : "hover:shadow-md shadow-myGreen"
                }`}
              >
                <p>
                  {allSamidzmaBranchesData.find(
                    (item1: any) => item1.StoreCode === item.StoreCode
                  )
                    ? "გაუქმება"
                    : "არჩევა"}
                </p>
                <div
                  className={`duration-500 ${
                    loaderBranchFromServer === item.StoreCode && "rotate-[900deg]"
                  }`}
                >
                  {allSamidzmaBranchesData.find(
                    (item1: any) => item1.StoreCode === item.StoreCode
                  ) ? (
                    <FaMinus />
                  ) : (
                    <FaPlus />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>
          {branchFromServerLoader
            ? "სამიძმის ფილიალები ბაზაში იძებნება.."
            : "სამიძმის ფილიალები არ არსებობს"}
        </p>
      )}
    </div>
  );
}
