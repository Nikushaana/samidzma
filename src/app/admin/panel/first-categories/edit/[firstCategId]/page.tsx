"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import useFirstCategories from "../../../../../../../dataFetchs/firstCategoriesContext";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import useSecondCategories from "../../../../../../../dataFetchs/secondCategoriesContext";
import CheckBox from "@/app/components/Inputs/CheckBox";
import Toggle2value from "@/app/components/buttons/toggle2value";

export default function Page({ params }: { params: { firstCategId: string } }) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, status } = useContext(
    ContextForSharingStates
  );

  const { fetchFirstCategories } = useFirstCategories();
  const { fetchSecondCategories } = useSecondCategories();

  const [loaderEditFirstCateg, setLoaderEditFirstCateg] =
    useState<boolean>(true);

  const [oneFirstCategValues, setOneFirstCategValues] = useState<any>({});
  const [oneFirstCategRender, setOneFirstCategRender] = useState<any>();
  const [editFirstCategValues, setEditFirstCategValues] = useState<any>({
    image: "",
    sort: 0,

    forma: 0,
    zoma: 0,
    saxeoba1: 0,
    masala: 0,
    moculoba: 0,
    tipi: 0,
    feri: 0,
    xangrdzlivoba: 0,
    tema: 0,
    sqesi: 0,
    raodenoba_shefutvashi: 0,

    status: 0
  });

  const [filters, setFilters] = useState<any>([]);

  useEffect(() => {
    setLoaderEditFirstCateg(true);
    axiosAdmin
      .get(`admin/category/saxeobebi/${params.firstCategId}`)
      .then((res) => {
        setOneFirstCategValues(res.data);
        setLoaderEditFirstCateg(false);
        setFilters([
          {
            id: 1,
            title: "ფორმა",
            name: "forma",
            status: res.data.forma,
          },
          {
            id: 2,
            title: "ზომა",
            name: "zoma",
            status: res.data.zoma,
          },
          {
            id: 3,
            title: "სახეობა1",
            name: "saxeoba1",
            status: res.data.saxeoba1,
          },
          {
            id: 4,
            title: "მასალა",
            name: "masala",
            status: res.data.masala,
          },
          {
            id: 5,
            title: "მოცულობა",
            name: "moculoba",
            status: res.data.moculoba,
          },
          {
            id: 6,
            title: "ტიპი",
            name: "tipi",
            status: res.data.tipi,
          },
          {
            id: 7,
            title: "ფერი",
            name: "feri",
            status: res.data.feri,
          },
          {
            id: 8,
            title: "ხანგრძლივობა",
            name: "xangrdzlivoba",
            status: res.data.xangrdzlivoba,
          },
          {
            id: 9,
            title: "თემა",
            name: "tema",
            status: res.data.tema,
          },
          {
            id: 10,
            title: "სქესი",
            name: "sqesi",
            status: res.data.sqesi,
          },
          {
            id: 11,
            title: "რაოდენობა შეფუთვაში",
            name: "raodenoba_shefutvashi",
            status: res.data.raodenoba_shefutvashi,
          },
        ]);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.firstCategId, oneFirstCategRender]);

  const HandleEditFirstCateg = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    setLoaderEditFirstCateg(true);

    formData.append("forma", editFirstCategValues.forma == "კი" ? "1" : "0");
    formData.append("zoma", editFirstCategValues.zoma == "კი" ? "1" : "0");
    formData.append(
      "saxeoba1",
      editFirstCategValues.saxeoba1 == "კი" ? "1" : "0"
    );
    formData.append("masala", editFirstCategValues.masala == "კი" ? "1" : "0");
    formData.append(
      "moculoba",
      editFirstCategValues.moculoba == "კი" ? "1" : "0"
    );
    formData.append("tipi", editFirstCategValues.tipi == "კი" ? "1" : "0");
    formData.append("feri", editFirstCategValues.feri == "კი" ? "1" : "0");
    formData.append(
      "xangrdzlivoba",
      editFirstCategValues.xangrdzlivoba == "კი" ? "1" : "0"
    );
    formData.append("tema", editFirstCategValues.tema == "კი" ? "1" : "0");
    formData.append("sqesi", editFirstCategValues.sqesi == "კი" ? "1" : "0");
    formData.append(
      "raodenoba_shefutvashi",
      editFirstCategValues.raodenoba_shefutvashi == "კი" ? "1" : "0"
    );

    formData.append(
      "status",
      status.find((item: any) => item.name === editFirstCategValues.status)?.id
    );

    axiosAdmin
      .post(`admin/category/saxeobebi/${params.firstCategId}`, formData)
      .then((res) => {
        router.push("/admin/panel/first-categories");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        fetchFirstCategories();
      })
      .catch((err) => {
        setLoaderEditFirstCateg(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  const [SecCategsDeletePopUp, setSecCategsDeletePopUp] = useState<string>("");
  const [SecCategsDeleteLoader, setSecCategsDeleteLoader] =
    useState<string>("");

  const HandleDeleteSecCategs = (id: any) => {
    setSecCategsDeleteLoader(id);
    axiosAdmin
      .post(`admin/category/productTypeGroupe/${id}`, {
        IdProdSaxeoba: "",
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით გაუქმდა!");
        fetchFirstCategories();
        fetchSecondCategories();
        setOneFirstCategRender(res);
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ გაუქმდა!");
      })
      .finally(() => {
        setSecCategsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <form
        onSubmit={HandleEditFirstCateg}
        encType="multipart/form-data"
        className={`flex flex-col gap-y-[20px] items-end duration-100 ${
          loaderEditFirstCateg && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <h1 className="w-full">პირველი რიგის კატეგორიის რედაქტირება</h1>
        <div className="grid grid-cols-1 gap-[20px] w-full">
          <h1>{oneFirstCategValues?.ProdSaxeobaName}</h1>
          {oneFirstCategValues?.image?.length > 0 && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneFirstCategValues?.image}`}
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}
          <ImgUploader
            name="image"
            multiple={false}
            setAllValues={setEditFirstCategValues}
          />
          <div className="w-[310px] max-sm:w-full">
            <Input1
              title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
              digit={true}
              name="sort"
              firstValue={oneFirstCategValues?.sort}
              type="text"
              setAllValues={setEditFirstCategValues}
              error={false}
            />
          </div>
          <h1 className="text-[17px">ფილტრის კონფიგურაცია</h1>
          <div className="w-[300px] flex flex-col gap-y-[5px]">
            {filters.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-[20px] "
              >
                <h4 className="text-[14px]">{item.title}</h4>
                <Toggle2value
                  name={`${item.name}`}
                  title1="არა"
                  title2="კი"
                  firstValue={item.status ? "კი" : "არა"}
                  setAllValues={setEditFirstCategValues}
                />
              </div>
            ))}
          </div>
          <div className="w-[200px] pb-[50px]">
            <DropDown1value
              title="სტატუსი"
              data={status}
              name="status"
              firstValue={
                status.find(
                  (item: any) => item.id === oneFirstCategValues.status
                )?.name
              }
              setAllValues={setEditFirstCategValues}
              error={false}
            />
          </div>
        </div>
        <div className="w-[200px]">
          <GreenButton
            name="რედაქტირება"
            loader={loaderEditFirstCateg}
            style="h-[50px] text-[18px]"
            button={true}
          />
        </div>
      </form>
      <hr className="w-full" />
      <h1>მეორე რიგის კატეგორიები</h1>
      <div className="flex flex-col gap-y-[10px] items-center">
        {oneFirstCategValues?.productTypeGroup?.length > 0 ? (
          oneFirstCategValues?.productTypeGroup?.map(
            (item: any, index: number) => (
              <div
                key={item.IdProdTypeGroup}
                className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
                  SecCategsDeleteLoader === item.IdProdTypeGroup &&
                  "opacity-[0.5] mx-[20px]"
                }`}
              >
                <div className="flex items-center gap-[20px]">
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
                  <p className="select-none">{item.ProdTypeGroupName}</p>
                </div>
                {SecCategsDeleteLoader === item.IdProdTypeGroup ? (
                  <div className="w-[50px] h-[50px] flex items-center justify-center">
                    <DotsLoader />
                  </div>
                ) : (
                  <div className="flex items-center gap-[10px]">
                    <div
                      onClick={() => {
                        router.push(
                          `/admin/panel/first-categories/second-categories/edit/${item.IdProdTypeGroup}`
                        );
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                    >
                      <GoPencil />
                    </div>

                    <div className="relative">
                      <div
                        onClick={() => {
                          setSecCategsDeletePopUp(item.IdProdTypeGroup);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      {SecCategsDeletePopUp === item.IdProdTypeGroup && (
                        <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                          <div
                            onClick={() => {
                              HandleDeleteSecCategs(item.IdProdTypeGroup);
                            }}
                            className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                          >
                            <FaTrashCan />
                          </div>
                          <div
                            onClick={() => {
                              setSecCategsDeletePopUp("");
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
            )
          )
        ) : (
          <p>მეორე რიგის კატეგორიები არ არსებობს</p>
        )}
      </div>
    </div>
  );
}
