"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import GreenButton from "@/app/components/buttons/greenButton";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import useFrontCategories from "../../../../../../dataFetchs/frontCategoriesContext";
import InputTime from "@/app/components/Inputs/InputTime";
import InputCalendar from "@/app/components/Inputs/InputCalendar";

export default function Page() {
  const router = useRouter();
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { FrontCategoriesData } = useFrontCategories();

  const [addCronJobValues, setAddCronJobValues] = useState({
    ProdSaxeobaName: "",
    ProdTypeGroupName: "",
    ProdTypeName: "",
    day: "",
    clock: "",
  });

  const [editCronJobValues, setEditCronJobValues] = useState({
    day: "",
    clock: "",
  });

  const [addCronJobLoader, setAddCronJobLoader] = useState(false);

  const [allConProductData, setAllCronProductData] = useState<any[]>([]);
  const [allCronProductLoader, setAllCronProductLoader] =
    useState<boolean>(true);

  const [cronProductDeletePopUp, setCronProductDeletePopUp] =
    useState<string>("");
  const [cronProductDeleteLoader, setCronProductDeleteLoader] =
    useState<string>("");
  const [cronProductEditLoader, setCronProductEditLoader] =
    useState<string>("");

  const [cronProductRender, setAllCronProductRender] = useState<any>();

  const HandleAddCronJobs = () => {
    if (
      addCronJobValues.ProdSaxeobaName &&
      addCronJobValues.ProdTypeGroupName &&
      addCronJobValues.clock &&
      addCronJobValues.day
    ) {
      setAddCronJobLoader(true);
      const IdProdSaxeobaName = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == addCronJobValues.ProdSaxeobaName
      )?.IdProdSaxeoba;

      const IdProdTypeGroup = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == addCronJobValues.ProdSaxeobaName
      )?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName == addCronJobValues.ProdTypeGroupName
      )?.IdProdTypeGroup;

      const IdProdType = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == addCronJobValues.ProdSaxeobaName
      )
        ?.productTypeGroup.find(
          (item4: any) =>
            item4.ProdTypeGroupName == addCronJobValues.ProdTypeGroupName
        )
        ?.productTypes.find(
          (item5: any) => item5.ProdTypeName == addCronJobValues.ProdTypeName
        )?.IdProdType;

      axiosAdmin
        .post("admin/cronProduct", {
          IdProdSaxeoba: IdProdSaxeobaName,
          IdProdTypeGroup: IdProdTypeGroup,
          IdProdType: IdProdType,
          day: addCronJobValues.day,
          clock: addCronJobValues.clock,
        })
        .then((res) => {
          setAllCronProductRender(res);
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("განახლება წარმატებით დაიგეგმა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("განახლება ვერ დაიგეგმა!");
        })
        .finally(() => {
          setAddCronJobLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("შეავსე ყველა ველი!");
    }
  };

  useEffect(() => {
    setAllCronProductLoader(true);
    axiosAdmin
      .get(`admin/cronProduct`)
      .then((res) => {
        setAllCronProductData(res.data.data);
        setAllCronProductLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [cronProductRender]);

  const HandleDeleteCronProduct = (id: any) => {
    setCronProductDeleteLoader(id);
    axiosAdmin
      .delete(`admin/cronProduct/${id}`)
      .then((res) => {
        setAllCronProductRender(res);
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
        setCronProductDeleteLoader("");
      });
  };

  const HandleEditCronJobTime = (id: any) => {
    if (editCronJobValues.clock && editCronJobValues.day) {
      setCronProductEditLoader(id);

      axiosAdmin
        .post(`admin/cronProduct/${id}`, {
          day: editCronJobValues.day,
          clock: editCronJobValues.clock,
        })
        .then((res) => {
          setAllCronProductRender(res);
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("განახლების თარიღი შეიცვალა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("განახლების თარიღი ვერ შეიცვალა!");
        })
        .finally(() => {
          setCronProductEditLoader("");
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("შეავსე ყველა ველი!");
    }
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div
        className={`flex flex-col gap-y-[10px] items-center relative ${
          addCronJobLoader && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <h1 className="w-full">განახლებების დაგეგმვა</h1>

        <div className="w-full grid grid-cols-3 max-lg:grid-cols-1 gap-[30px] max-lg:gap-y-[10px]">
          <DropDown1value
            title="პირველი რიგის კატეგორიები"
            data={FrontCategoriesData}
            name="ProdSaxeobaName"
            setAllValues={setAddCronJobValues}
            placeholder="აირჩიე"
            searchable={true}
          />
          <div
            className={`${
              !addCronJobValues.ProdSaxeobaName &&
              "pointer-events-none opacity-[0.5]"
            }`}
          >
            <DropDown1value
              title="მეორე რიგის კატეგორიები"
              data={
                FrontCategoriesData.find(
                  (item1: any) =>
                    addCronJobValues.ProdSaxeobaName == item1.ProdSaxeobaName
                )?.productTypeGroup
              }
              name="ProdTypeGroupName"
              setAllValues={setAddCronJobValues}
              placeholder="აირჩიე"
              searchable={true}
              render={addCronJobValues.ProdSaxeobaName}
            />
          </div>
          <div
            className={`${
              !addCronJobValues.ProdTypeGroupName &&
              "pointer-events-none opacity-[0.5]"
            }`}
          >
            <DropDown1value
              title="მესამე რიგის კატეგორიები"
              data={
                FrontCategoriesData.find(
                  (item1: any) =>
                    addCronJobValues.ProdSaxeobaName === item1.ProdSaxeobaName
                )?.productTypeGroup.find(
                  (item2: any) =>
                    addCronJobValues.ProdTypeGroupName ===
                    item2.ProdTypeGroupName
                )?.productTypes
              }
              name="ProdTypeName"
              setAllValues={setAddCronJobValues}
              placeholder="აირჩიე"
              searchable={true}
              render={
                addCronJobValues.ProdTypeGroupName ||
                addCronJobValues.ProdSaxeobaName
              }
            />
          </div>
        </div>
        <div
          className={`w-full grid grid-cols-2 max-sm:grid-cols-1 gap-[10px]`}
        >
          <InputCalendar
            title="განახლების თარიღი"
            placeholder="აირჩიე.."
            name="day"
            setAllValues={setAddCronJobValues}
            minDate="today"
          />
          <InputTime
            title="განახლების დრო"
            placeholder="აირჩიე.."
            name="clock"
            setAllValues={setAddCronJobValues}
          />
        </div>
        <div className="w-[260px] self-end mt-[20px]">
          <GreenButton
            name="სურათების განახლება"
            action={HandleAddCronJobs}
            loader={addCronJobLoader}
            style="h-[50px] text-[18px] max-sm:text-[16px]"
          />
        </div>
      </div>

      <hr />

      <div className={`flex flex-col gap-y-[10px] items-center relative `}>
        <h1 className="w-full">დაგეგმილი განახლებები</h1>
        {allCronProductLoader && (
          <div className="w-[60px] h-[60px] flex items-center justify-center top-[150px] absolute left-[50%] translate-x-[-50%] z-[1]">
            <DotsLoader />
          </div>
        )}{" "}
        {allConProductData?.length > 0 ? (
          <div className="w-full flex flex-col gap-y-[10px]">
            {allConProductData.map((item: any, index: number) => (
              <div
                key={item.id}
                className={`border-[1px] flex max-sm:flex-col items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
                  cronProductDeleteLoader === item.id &&
                  "opacity-[0.5] mx-[20px]"
                }`}
              >
                <div className="flex flex-col gap-[10px]">
                  <p className="">
                    {
                      FrontCategoriesData.find(
                        (item3: any) =>
                          item3.IdProdSaxeoba == item.IdProdSaxeoba
                      )?.ProdSaxeobaName
                    }
                  </p>
                  <p className="">
                    {
                      FrontCategoriesData.find(
                        (item3: any) =>
                          item3.IdProdSaxeoba == item.IdProdSaxeoba
                      )?.productTypeGroup.find(
                        (item4: any) =>
                          item4.IdProdTypeGroup == item.IdProdTypeGroup
                      )?.ProdTypeGroupName
                    }
                  </p>
                  <p className="">
                    {
                      FrontCategoriesData.find(
                        (item3: any) =>
                          item3.IdProdSaxeoba == item.IdProdSaxeoba
                      )
                        ?.productTypeGroup.find(
                          (item4: any) =>
                            item4.IdProdTypeGroup == item.IdProdTypeGroup
                        )
                        ?.productTypes.find(
                          (item5: any) => item5.IdProdType == item.IdProdType
                        )?.ProdTypeName
                    }
                  </p>
                </div>
                <div className="w-[270px] max-sm:w-full flex flex-col gap-y-[10px]">
                  <InputCalendar
                    title="განახლების თარიღი"
                    placeholder="აირჩიე.."
                    firstValue={item.day}
                    name="day"
                    setAllValues={setEditCronJobValues}
                    minDate="today"
                  />
                  <InputTime
                    title="განახლების დრო"
                    firstValue={item.clock}
                    placeholder="აირჩიე.."
                    name="clock"
                    setAllValues={setEditCronJobValues}
                  />
                  <GreenButton
                    name="ცვლილება"
                    action={() => {
                      HandleEditCronJobTime(item.id);
                    }}
                    loader={cronProductEditLoader === item.id}
                    style="h-[50px] text-[18px] max-sm:text-[16px]"
                  />
                </div>

                <div className="flex items-center gap-[10px]">
                  <p>
                    {item.status == "0"
                      ? "ჯერ არ შესრულებულა"
                      : item.status == "1"
                      ? "აქტიური"
                      : item.status == "2"
                      ? "შეცდომა მოხდა!"
                      : item.status == "3" && "შესრულდა"}
                  </p>
                  {cronProductDeleteLoader === item.id ? (
                    <div className="w-[50px] h-[50px] flex items-center justify-center">
                      <DotsLoader />
                    </div>
                  ) : (
                    <div className="relative">
                      <div
                        onClick={() => {
                          setCronProductDeletePopUp(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      {cronProductDeletePopUp === item.id && (
                        <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                          <div
                            onClick={() => {
                              HandleDeleteCronProduct(item.id);
                            }}
                            className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                          >
                            <FaTrashCan />
                          </div>
                          <div
                            onClick={() => {
                              setCronProductDeletePopUp("");
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
              </div>
            ))}
          </div>
        ) : (
          <p>
            {allCronProductLoader
              ? "დაგეგმილი განახლებები იძებნება.."
              : "დაგეგმილი განახლებები არ არსებობს"}
          </p>
        )}
      </div>
    </div>
  );
}
