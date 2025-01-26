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

export default function Page({ params }: { params: { firstCategId: string } }) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const { fetchFirstCategories } = useFirstCategories();

  const [loaderEditFirstCateg, setLoaderEditFirstCateg] =
    useState<boolean>(true);

  const [oneFirstCategValues, setOneFirstCategValues] = useState<any>({});
  const [editFirstCategValues, setEditFirstCategValues] = useState({
    image: "",
    sort: 0,
  });

  useEffect(() => {
    setLoaderEditFirstCateg(true);
    axiosAdmin
      .get(`admin/category/saxeobebi/${params.firstCategId}`)
      .then((res) => {
        setOneFirstCategValues(res.data);
        setLoaderEditFirstCateg(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.firstCategId]);

  const HandleEditFirstCateg = (e: any) => {
    e.preventDefault();
    if (true) {
      const form = e.target;
      const formData = new FormData(form);

      setLoaderEditFirstCateg(true);
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
    } else {
      setLoaderEditFirstCateg(false);
    }
  };

  return (
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
  );
}
