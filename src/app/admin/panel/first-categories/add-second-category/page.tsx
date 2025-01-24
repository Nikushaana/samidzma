/* eslint-disable react/no-unescaped-entities */
"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import { FaMinus, FaPlus } from "react-icons/fa";
import useSecondCategories from "../../../../../../dataFetchs/secondCategoriesContext";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } =
    useContext(ContextForSharingStates);

  const { fetchSecondCategories, allSecondCategsData } = useSecondCategories();

  const [secondCategsServerData, setsecondCategsServerData] = useState([]);
  const [secondCategsServerLoader, setsecondCategsServerLoader] =
    useState(true);

  const [loaderAddsecondCategs, setLoaderAddsecondCategs] =
    useState<string>("");

  useEffect(() => {
    setsecondCategsServerLoader(true);
    axiosAdmin
      .get(`admin/category/productTypeGroupeFromServer?IdProdTypeGroup=0`)
      .then((res) => {
        setsecondCategsServerLoader(false);
        setsecondCategsServerData(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const HandleAddsecondCategs = (id: any) => {
    axiosAdmin
      .post("admin/category/productTypeGroupe", {
        IdProdTypeGroup: parseInt(id),
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
        fetchSecondCategories();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {
        setLoaderAddsecondCategs("");
      });
  };

  const HandleDeletesecondCategs = (id: any) => {
    axiosAdmin
      .delete(`admin/category/productTypeGroupe/${id}`)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კატეგორია გაუქმდა");
        fetchSecondCategories();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("კატეგორია ვერ გაუქმდა!");
      })
      .finally(() => {
        setLoaderAddsecondCategs("");
      });
  };

  return (
    <div className={`flex flex-col gap-y-[20px] `}>
      <h1>მეორე რიგის კატეგორიის დამატება ბაზიდან </h1>
      <hr />
      {secondCategsServerData?.length > 0 ? (
        secondCategsServerData?.map((item: any, index: number) => (
          <div
            key={item.IdProdTypeGroup}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] w-full duration-100  ${
              loaderAddsecondCategs == item.IdProdTypeGroup &&
              "opacity-[0.5] pointer-events-none"
            } ${
              allSecondCategsData.find(
                (item1: any) => item1.IdProdTypeGroup == item.IdProdTypeGroup
              )
                ? "opacity-[0.5]"
                : ""
            }`}
          >
            <p className="select-none">{item.ProdTypeGroupName}</p>

            <div className="flex items-center gap-[10px]">
              <div
                onClick={() => {
                  if (
                    allSecondCategsData.find(
                      (item1: any) =>
                        item1.IdProdTypeGroup == item.IdProdTypeGroup
                    )
                  ) {
                    HandleDeletesecondCategs(item.IdProdTypeGroup);
                  } else {
                    HandleAddsecondCategs(item.IdProdTypeGroup);
                  }
                }}
                className={`px-[30px] h-[40px] rounded-full flex gap-[15px] items-center justify-center text-gray-600 text-[18px] group hover:bg-white cursor-pointer shadow duration-100 ${
                  allSecondCategsData.find(
                    (item1: any) =>
                      item1.IdProdTypeGroup == item.IdProdTypeGroup
                  )
                    ? "hover:shadow-md shadow-[red]"
                    : "hover:shadow-md shadow-myGreen"
                }`}
              >
                <p>
                  {allSecondCategsData.find(
                    (item1: any) =>
                      item1.IdProdTypeGroup == item.IdProdTypeGroup
                  )
                    ? "გაუქმება"
                    : "არჩევა"}
                </p>
                <div
                  className={`duration-500 ${
                    loaderAddsecondCategs == item.IdProdTypeGroup &&
                    "rotate-[900deg]"
                  }`}
                >
                  {allSecondCategsData.find(
                    (item1: any) =>
                      item1.IdProdTypeGroup == item.IdProdTypeGroup
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
          {secondCategsServerLoader
            ? "მეორე რიგის კატეგორიები ბაზაში იძებნება.."
            : "მეორე რიგის კატეგორიები ბაზაში არ არსებობს"}
        </p>
      )}
    </div>
  );
}
