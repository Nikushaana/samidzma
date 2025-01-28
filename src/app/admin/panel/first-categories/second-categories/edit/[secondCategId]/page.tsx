/* eslint-disable react/no-unescaped-entities */
"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import { ContextForSharingStates } from "../../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { GoPencil } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import { BsXLg } from "react-icons/bs";
import useFirstCategories from "../../../../../../../../dataFetchs/firstCategoriesContext";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import useSecondCategories from "../../../../../../../../dataFetchs/secondCategoriesContext";

export default function Page({
  params,
}: {
  params: { secondCategId: string };
}) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { allFirstCategsData } = useFirstCategories();
  const { fetchSecondCategories } = useSecondCategories();

  const [loaderEditSecondCateg, setLoaderEditSecondCateg] =
    useState<boolean>(true);
  const [oneSecondCategsRender, setOneSecondCategsRender] = useState<any>();

  const [oneSecondCategValues, setOneSecondCategValues] = useState<any>({});
  const [editSecondCategValues, setEditSecondCategValues] = useState({
    image: "",
    IdProdSaxeoba: "",
    sort: "",
  });

  useEffect(() => {
    setLoaderEditSecondCateg(true);
    axiosAdmin
      .get(`admin/category/productTypeGroupe/${params.secondCategId}`)
      .then((res) => {
        setOneSecondCategValues(res.data);
        setLoaderEditSecondCateg(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.secondCategId, oneSecondCategsRender]);

  const HandleEditSecondCateg = (e: any) => {
    e.preventDefault();
    setLoaderEditSecondCateg(true);

    if (true) {
      const form = e.target;
      const formData = new FormData(form);

      formData.append(
        "IdProdSaxeoba",
        allFirstCategsData.find(
          (item: any) =>
            item.ProdSaxeobaName === editSecondCategValues.IdProdSaxeoba
        )?.IdProdSaxeoba || ""
      );

      axiosAdmin
        .post(
          `admin/category/productTypeGroupe/${params.secondCategId}`,
          formData
        )
        .then((res) => {
          router.push("/admin/panel/first-categories/second-categories");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          fetchSecondCategories();
        })
        .catch((err) => {
          setLoaderEditSecondCateg(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ რედაქტირდა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditSecondCateg(false);
    }
  };

  const [ThirdCategsDeletePopUp, setThirdCategsDeletePopUp] =
    useState<string>("");
  const [ThirdCategsDeleteLoader, setThirdCategsDeleteLoader] =
    useState<string>("");

  const HandleDeleteThirdCategs = (id: any) => {
    setThirdCategsDeleteLoader(id);
    axiosAdmin
      .delete(`admin/category/productType/${id}`)
      .then((res) => {
        setOneSecondCategsRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setThirdCategsDeleteLoader("");
      });
  };

  return (
    <div className={`flex flex-col gap-y-[20px]`}>
      <h1 className="w-full">მეორე რიგის კატეგორიის რედაქტირება</h1>
      <form
        onSubmit={HandleEditSecondCateg}
        encType="multipart/form-data"
        className={`w-full flex flex-col gap-y-[20px] items-end  duration-100 ${
          loaderEditSecondCateg && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <div className="grid grid-cols-1 gap-[20px] w-full">
          <h1>{oneSecondCategValues?.ProdSaxeobaName}</h1>
          {oneSecondCategValues?.image?.length > 0 && (
            <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
              <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${oneSecondCategValues?.image}`}
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
            setAllValues={setEditSecondCategValues}
          />
          <div className="w-[310px] max-sm:w-full">
            <Input1
              title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
              digit={true}
              name="sort"
              firstValue={oneSecondCategValues?.sort}
              type="text"
              setAllValues={setEditSecondCategValues}
              error={false}
            />
          </div>
          <div className="w-[310px] max-sm:w-full">
            <DropDown1value
              title="პირველი რიგის კატეგორიები"
              data={allFirstCategsData}
              firstValue={
                allFirstCategsData.find(
                  (item: any) =>
                    item.IdProdSaxeoba === oneSecondCategValues?.IdProdSaxeoba
                )?.ProdSaxeobaName
              }
              searchable={true}
              name="IdProdSaxeoba"
              setAllValues={setEditSecondCategValues}
              error={false}
            />
          </div>
        </div>
        <div className="w-[200px]">
          <GreenButton
            name="რედაქტირება"
            loader={loaderEditSecondCateg}
            style="h-[50px] text-[18px]"
            button={true}
          />
        </div>
      </form>

      <hr className="w-full" />

      <h1>მესამე რიგის კატეგორიები</h1>

      <div className="flex flex-col gap-y-[10px] items-center">
        {oneSecondCategValues?.productTypes?.length > 0 ? (
          oneSecondCategValues?.productTypes?.map(
            (item: any, index: number) => (
              <div
                key={item.IdProdType}
                className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
                  ThirdCategsDeleteLoader === item.IdProdType &&
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
                  <p className="select-none">{item.ProdTypeName}</p>
                </div>
                {ThirdCategsDeleteLoader === item.IdProdType ? (
                  <div className="w-[50px] h-[50px] flex items-center justify-center">
                    <DotsLoader />
                  </div>
                ) : (
                  <div className="flex items-center gap-[10px]">
                    <div
                      onClick={() => {
                        router.push(
                          `/admin/panel/first-categories/second-categories/third-category/edit/${item.IdProdType}`
                        );
                      }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                    >
                      <GoPencil />
                    </div>

                    <div className="relative">
                      <div
                        onClick={() => {
                          setThirdCategsDeletePopUp(item.IdProdType);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      {ThirdCategsDeletePopUp === item.IdProdType && (
                        <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                          <div
                            onClick={() => {
                              HandleDeleteThirdCategs(item.IdProdType);
                            }}
                            className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                          >
                            <FaTrashCan />
                          </div>
                          <div
                            onClick={() => {
                              setThirdCategsDeletePopUp("");
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
          <p>მესამე რიგის კატეგორიები არ არსებობს</p>
        )}
      </div>
    </div>
  );
}
