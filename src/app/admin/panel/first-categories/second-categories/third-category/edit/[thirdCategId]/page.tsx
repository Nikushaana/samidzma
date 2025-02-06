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
import Toggle2value from "@/app/components/buttons/toggle2value";

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
  const [editThirdCategValues, setEditThirdCategValues] = useState<any>({
    image: "",
    sort: "",

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
  });

  const [filters, setFilters] = useState<any>([]);

  useEffect(() => {
    setLoaderEditThirdCateg(true);
    axiosAdmin
      .get(`admin/category/productType/${params.thirdCategId}`)
      .then((res) => {
        setOneThirdCategValues(res.data);
        setLoaderEditThirdCateg(false);
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
  }, [params.thirdCategId]);

  const HandleEditThirdCateg = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setLoaderEditThirdCateg(true);

    formData.append("forma", editThirdCategValues.forma == "კი" ? "1" : "0");
    formData.append("zoma", editThirdCategValues.zoma == "კი" ? "1" : "0");
    formData.append(
      "saxeoba1",
      editThirdCategValues.saxeoba1 == "კი" ? "1" : "0"
    );
    formData.append("masala", editThirdCategValues.masala == "კი" ? "1" : "0");
    formData.append(
      "moculoba",
      editThirdCategValues.moculoba == "კი" ? "1" : "0"
    );
    formData.append("tipi", editThirdCategValues.tipi == "კი" ? "1" : "0");
    formData.append("feri", editThirdCategValues.feri == "კი" ? "1" : "0");
    formData.append(
      "xangrdzlivoba",
      editThirdCategValues.xangrdzlivoba == "კი" ? "1" : "0"
    );
    formData.append("tema", editThirdCategValues.tema == "კი" ? "1" : "0");
    formData.append("sqesi", editThirdCategValues.sqesi == "კი" ? "1" : "0");
    formData.append(
      "raodenoba_shefutvashi",
      editThirdCategValues.raodenoba_shefutvashi == "კი" ? "1" : "0"
    );

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
                setAllValues={setEditThirdCategValues}
              />
            </div>
          ))}
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
