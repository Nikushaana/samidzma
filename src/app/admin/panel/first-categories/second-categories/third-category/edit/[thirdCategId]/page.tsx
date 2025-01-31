"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";
import { ContextForSharingStates } from "../../../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../../../dataFetchs/AxiosToken";
import useFirstCategories from "../../../../../../../../../dataFetchs/firstCategoriesContext";
import useSecondCategories from "../../../../../../../../../dataFetchs/secondCategoriesContext";

export default function Page({ params }: { params: { thirdCategId: string } }) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const { fetchFirstCategories } = useFirstCategories();
  const { fetchSecondCategories } = useSecondCategories();

  const [loaderEditThirdCateg, setLoaderEditThirdCateg] =
    useState<boolean>(true);

  const [oneThirdCategValues, setOneThirdCategValues] = useState<any>({});
  const [editThirdCategValues, setEditThirdCategValues] = useState({
    image: "",
    sort: "",
  });

  useEffect(() => {
    setLoaderEditThirdCateg(true);
    axiosAdmin
      .get(`admin/category/productType/${params.thirdCategId}`)
      .then((res) => {
        setOneThirdCategValues(res.data);
        setLoaderEditThirdCateg(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.thirdCategId]);

  const HandleEditThirdCateg = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setLoaderEditThirdCateg(true);
    axiosAdmin
      .post(`admin/category/productType/${params.thirdCategId}`, formData)
      .then((res) => {
        router.push(
          `/admin/panel/first-categories/second-categories/edit/${oneThirdCategValues.IdProdTypeGroup}`
        );
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        fetchFirstCategories();
        fetchSecondCategories();
      })
      .catch((err) => {
        setLoaderEditThirdCateg(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <form
      onSubmit={HandleEditThirdCateg}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditThirdCateg && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">მესამე რიგის კატეგორიის რედაქტირება</h1>
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <h1>{oneThirdCategValues?.ProdTypeName}</h1>
        {oneThirdCategValues?.image?.length > 0 && (
          <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
            <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${oneThirdCategValues?.image}`}
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
          setAllValues={setEditThirdCategValues}
        />
        <div className="w-[310px] max-sm:w-full">
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            firstValue={oneThirdCategValues?.sort}
            type="text"
            setAllValues={setEditThirdCategValues}
            error={false}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          loader={loaderEditThirdCateg}
          style="h-[50px] text-[18px]"
          button={true}
        />
      </div>
    </form>
  );
}
