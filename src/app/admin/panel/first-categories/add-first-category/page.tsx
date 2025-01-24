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
import useFirstCategories from "../../../../../../dataFetchs/firstCategoriesContext";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { fetchFirstCategories, allFirstCategsData } = useFirstCategories();

  const [firstCategsServerData, setfirstCategsServerData] = useState([]);
  const [firstCategsServerLoader, setfirstCategsServerLoader] = useState(true);

  const [loaderAddFirstCategs, setLoaderAddFirstCategs] = useState<string>("");

  useEffect(() => {
    setfirstCategsServerLoader(true);
    axiosAdmin
      .get(`admin/category/saxeobebiFromServer?IdProdSaxeoba=0`)
      .then((res) => {
        setfirstCategsServerLoader(false);
        setfirstCategsServerData(res.data);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const HandleAddFirstCategs = (id: any) => {
    axiosAdmin
      .post("admin/category/saxeobebi", {
        IdProdSaxeoba: parseInt(id),
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
        fetchFirstCategories();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {
        setLoaderAddFirstCategs("");
      });
  };

  const HandleDeleteFirstCategs = (id: any) => {
    axiosAdmin
      .delete(`admin/category/saxeobebi/${id}`)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კატეგორია გაუქმდა");
        fetchFirstCategories();
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("კატეგორია ვერ გაუქმდა!");
      })
      .finally(() => {
        setLoaderAddFirstCategs("");
      });
  };

  return (
    <div className={`flex flex-col gap-y-[20px] `}>
      <h1>პირველი რიგის კატეგორიის დამატება ბაზიდან</h1>
      <hr />
      {firstCategsServerData?.length > 0 ? (
        firstCategsServerData?.map((item: any, index: number) => (
          <div
            key={item.IdProdSaxeoba}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] w-full duration-100  ${
              loaderAddFirstCategs === item.IdProdSaxeoba &&
              "opacity-[0.5] pointer-events-none"
            } ${
              allFirstCategsData.find(
                (item1: any) => item1.IdProdSaxeoba === item.IdProdSaxeoba
              )
                ? "opacity-[0.5]"
                : ""
            }`}
          >
            <p className="select-none">{item.ProdSaxeobaName}</p>

            <div className="flex items-center gap-[10px]">
              <div
                onClick={() => {
                  if (
                    allFirstCategsData.find(
                      (item1: any) => item1.IdProdSaxeoba === item.IdProdSaxeoba
                    )
                  ) {
                    HandleDeleteFirstCategs(item.IdProdSaxeoba);
                  } else {
                    HandleAddFirstCategs(item.IdProdSaxeoba);
                  }
                }}
                className={`px-[30px] h-[40px] rounded-full flex gap-[15px] items-center justify-center text-gray-600 text-[18px] group hover:bg-white cursor-pointer shadow duration-100 ${allFirstCategsData.find(
                  (item1: any) => item1.IdProdSaxeoba === item.IdProdSaxeoba
                ) ? "hover:shadow-md shadow-[red]" : "hover:shadow-md shadow-myGreen"}`}
              >
                <p>
                  {allFirstCategsData.find(
                    (item1: any) => item1.IdProdSaxeoba === item.IdProdSaxeoba
                  )
                    ? "გაუქმება"
                    : "არჩევა"}
                </p>
                <div
                  className={`duration-500 ${
                    loaderAddFirstCategs === item.IdProdSaxeoba &&
                    "rotate-[900deg]"
                  }`}
                >
                  {allFirstCategsData.find(
                    (item1: any) => item1.IdProdSaxeoba === item.IdProdSaxeoba
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
          {firstCategsServerLoader
            ? "პირველი რიგის კატეგორიები ბაზაში იძებნება.."
            : "პირველი რიგის კატეგორიები ბაზაში არ არსებობს"}
        </p>
      )}
    </div>
  );
}
