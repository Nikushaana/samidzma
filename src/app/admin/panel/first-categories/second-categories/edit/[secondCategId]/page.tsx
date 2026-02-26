/* eslint-disable react/no-unescaped-entities */
"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
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
import Toggle2value from "@/app/components/buttons/toggle2value";
import useThirdCategories from "../../../../../../../../dataFetchs/thirdCategoriesContext";

export default function Page({
  params,
}: {
  params: { secondCategId: string };
}) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText, status } = useContext(
    ContextForSharingStates
  );
  const { allFirstCategsData } = useFirstCategories();
  const { allSecondCategsData } = useSecondCategories();
  const { allThirdCategsData } = useThirdCategories();

  const [loaderEditSecondCateg, setLoaderEditSecondCateg] =
    useState<boolean>(true);
  const [oneSecondCategsRender, setOneSecondCategsRender] = useState<any>();

  const [oneSecondCategValues, setOneSecondCategValues] = useState<any>({});
  const [editSecondCategValues, setEditSecondCategValues] = useState<any>({
    image: "",
    IdProdSaxeoba: "",
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

    meta_title: "",
    meta_description: "",

    status: 0,

    third_level_categories: [],
  });

  const [filters, setFilters] = useState<any>([]);

  useEffect(() => {
    setLoaderEditSecondCateg(true);
    axiosAdmin
      .get(`admin/category/productTypeGroupe/${params.secondCategId}`)
      .then((res) => {
        setOneSecondCategValues(res.data);
        setLoaderEditSecondCateg(false);
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
  }, [params.secondCategId, oneSecondCategsRender]);

  const HandleEditSecondCateg = (e: any) => {
    e.preventDefault();
    setLoaderEditSecondCateg(true);

    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "IdProdSaxeoba",
      allFirstCategsData.find(
        (item: any) =>
          item.ProdSaxeobaName === editSecondCategValues.IdProdSaxeoba
      )?.IdProdSaxeoba || ""
    );

    formData.append("forma", editSecondCategValues.forma == "კი" ? "1" : "0");
    formData.append("zoma", editSecondCategValues.zoma == "კი" ? "1" : "0");
    formData.append(
      "saxeoba1",
      editSecondCategValues.saxeoba1 == "კი" ? "1" : "0"
    );
    formData.append("masala", editSecondCategValues.masala == "კი" ? "1" : "0");
    formData.append(
      "moculoba",
      editSecondCategValues.moculoba == "კი" ? "1" : "0"
    );
    formData.append("tipi", editSecondCategValues.tipi == "კი" ? "1" : "0");
    formData.append("feri", editSecondCategValues.feri == "კი" ? "1" : "0");
    formData.append(
      "xangrdzlivoba",
      editSecondCategValues.xangrdzlivoba == "კი" ? "1" : "0"
    );
    formData.append("tema", editSecondCategValues.tema == "კი" ? "1" : "0");
    formData.append("sqesi", editSecondCategValues.sqesi == "კი" ? "1" : "0");
    formData.append(
      "raodenoba_shefutvashi",
      editSecondCategValues.raodenoba_shefutvashi == "კი" ? "1" : "0"
    );

    formData.append(
      "status",
      status.find((item: any) => item.name === editSecondCategValues.status)?.id
    );

    formData.append(
      "third_level_categories",
      JSON.stringify(editSecondCategValues.third_level_categories)
    );

    axiosAdmin
      .post(
        `admin/category/productTypeGroupe/${params.secondCategId}`,
        formData
      )
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        setOneSecondCategsRender(res);
      })
      .catch((err) => {
        setLoaderEditSecondCateg(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  // third categs

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

  const HandleDeleteAllAddCategs = (id: any) => {
    if (!id) return;
    setLoaderEditSecondCateg(true);
    axiosAdmin
      .delete(`admin/category/deleteSaxeobebiConnectionAddCategory/${id}`)
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით გაუქმდა!");
        setOneSecondCategsRender(res);
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ გაუქმდა!");
      })
      .finally(() => {
        setLoaderEditSecondCateg(false);
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
          <h1>{oneSecondCategValues?.ProdTypeGroupName}</h1>
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
                  setAllValues={setEditSecondCategValues}
                />
              </div>
            ))}
          </div>
          <h1 className="text-[17px">ყველა მესამე რიგის კატეგორია</h1>
          <div className="w-[400px] flex flex-col gap-y-[5px]">
            {allThirdCategsData.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-[20px] "
              >
                <h4 className="text-[14px]">{item.ProdTypeName}</h4>
                <div className="flex items-center gap-[10px]">
                  <div
                    className={`${
                      oneSecondCategValues.add_category?.find(
                        (categ: any) =>
                          categ.level == 3 &&
                          categ.product_type_id == item.IdProdType
                      ) && "pointer-events-none opacity-[0.5]"
                    }`}
                  >
                    <Toggle2value
                      name="third_level_categories"
                      title1="არა"
                      title2="კი"
                      firstValue={
                        oneSecondCategValues.add_category?.find(
                          (categ: any) =>
                            categ.level == 3 &&
                            categ.product_type_id == item.IdProdType
                        )
                          ? "კი"
                          : "არა"
                      }
                      setAllValues={(updater: any) => {
                        setEditSecondCategValues((prev: any) => {
                          const next =
                            typeof updater === "function"
                              ? updater(prev)
                              : updater;

                          let updated = [...prev.third_level_categories];

                          if (next.third_level_categories === "კი") {
                            if (!updated.includes(item.IdProdType)) {
                              updated.push(item.IdProdType);
                            }
                          } else {
                            updated = updated.filter(
                              (id) => id !== item.IdProdType
                            );
                          }

                          return {
                            ...prev,
                            third_level_categories: updated,
                          };
                        });
                      }}
                    />
                  </div>
                  {oneSecondCategValues.add_category?.find(
                    (categ: any) =>
                      categ.level == 3 &&
                      categ.product_type_id == item.IdProdType
                  ) && (
                    <BsXLg
                      onClick={() => {
                        HandleDeleteAllAddCategs(
                          oneSecondCategValues.add_category?.find(
                            (categ: any) =>
                              categ.level == 3 &&
                              categ.product_type_id == item.IdProdType
                          )?.id
                        );
                      }}
                      className="text-[red] cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Input1
            title="მეტა სათაური"
            name="meta_title"
            type="text"
            firstValue={oneSecondCategValues.meta_title}
            setAllValues={setEditSecondCategValues}
            error={false}
          />
          <Input1
            title="მეტა აღწერა"
            name="meta_description"
            type="text"
            firstValue={oneSecondCategValues.meta_description}
            setAllValues={setEditSecondCategValues}
            error={false}
          />
          <div className="w-[200px] pb-[50px]">
            <DropDown1value
              title="სტატუსი"
              data={status}
              name="status"
              firstValue={
                status.find(
                  (item: any) => item.id === oneSecondCategValues.status
                )?.name
              }
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
