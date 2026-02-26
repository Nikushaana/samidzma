"use client";

import React, { useContext, useEffect, useState } from "react";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import Image from "next/image";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import ReactPaginate from "react-paginate";
import GreenButton from "@/app/components/buttons/greenButton";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import useFrontCategories from "../../../../../../dataFetchs/frontCategoriesContext";
import Input1 from "@/app/components/Inputs/Input1";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { FrontCategoriesData } = useFrontCategories();

  const [updateProdMinQuantityValues, setUpdateProdMinQuantityValues] =
    useState({
      ProdSaxeobaName: "",
      ProdTypeGroupName: "",
      ProdTypeName: "",
      min_quantity: "",
      page: 0,
    });

  const [allProductsData, setAllProductsData] = useState<ProductType[]>([]);
  const [allProductsLoader, setAllProductsLoader] = useState<boolean>(true);

  const [prodwholenum, setProdwholenum] = useState<any>();
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event: any) => {
    setUpdateProdMinQuantityValues((prev: any) => ({
      ...prev,
      page: event.selected,
    }));
  };

  useEffect(() => {
    setPageCount(Math.ceil(prodwholenum / 20));
  }, [prodwholenum]);

  useEffect(() => {
    setAllProductsLoader(true);

    const IdProdSaxeobaName = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
    )?.IdProdSaxeoba;

    const IdProdTypeGroup = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
    )?.productTypeGroup.find(
      (item4: any) =>
        item4.ProdTypeGroupName == updateProdMinQuantityValues.ProdTypeGroupName
    )?.IdProdTypeGroup;

    const IdProdType = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
    )
      ?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName ==
          updateProdMinQuantityValues.ProdTypeGroupName
      )
      ?.productTypes.find(
        (item5: any) =>
          item5.ProdTypeName == updateProdMinQuantityValues.ProdTypeName
      )?.IdProdType;

    axiosAdmin
      .get(
        `admin/allProduct?page=${
          updateProdMinQuantityValues.page + 1
        }&per_page=20&${
          updateProdMinQuantityValues.ProdSaxeobaName && IdProdSaxeobaName
            ? `IdProdSaxeoba=${IdProdSaxeobaName}`
            : ""
        }&${
          updateProdMinQuantityValues.ProdTypeGroupName && IdProdTypeGroup
            ? `IdProdTypeGroup=${IdProdTypeGroup}`
            : ""
        }&${
          updateProdMinQuantityValues.ProdTypeName && IdProdType
            ? `IdProdType=${IdProdType}`
            : ""
        }`
      )
      .then((res) => {
        setAllProductsData(res.data.data);
        setAllProductsLoader(false);
        setProdwholenum(res.data.total);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [
    FrontCategoriesData,
    updateProdMinQuantityValues.ProdSaxeobaName,
    updateProdMinQuantityValues.ProdTypeGroupName,
    updateProdMinQuantityValues.ProdTypeName,
    updateProdMinQuantityValues.page,
  ]);

  const [updateProdMinQuantityLoader, setUpdateProdMinQuantityLoader] =
    useState(false);

  const [updateProdMinQuantityRender, setUpdateProdMinQuantityRender] =
    useState<any>();

  const [updateProdMinQuantityCodeValues, setUpdateProdMinQuantityCodeValues] =
    useState({
      ProdCode: "",
      min_quantity: "",
    });

  const [updateProdMinQuantityCodeLoader, setUpdateProdMinQuantityCodeLoader] =
    useState(false);

  const [updateProdMinQuantityCodeRender, setUpdateProdMinQuantityCodeRender] =
    useState<any>();

  const HandleUpdateProdMinQuantity = (key: string) => {
    if (
      updateProdMinQuantityValues.ProdSaxeobaName &&
      updateProdMinQuantityValues.ProdTypeGroupName &&
      updateProdMinQuantityValues.min_quantity
    ) {
      setUpdateProdMinQuantityLoader(true);
      const IdProdSaxeobaName = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
      )?.IdProdSaxeoba;

      const IdProdTypeGroup = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
      )?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName ==
          updateProdMinQuantityValues.ProdTypeGroupName
      )?.IdProdTypeGroup;

      const IdProdType = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == updateProdMinQuantityValues.ProdSaxeobaName
      )
        ?.productTypeGroup.find(
          (item4: any) =>
            item4.ProdTypeGroupName ==
            updateProdMinQuantityValues.ProdTypeGroupName
        )
        ?.productTypes.find(
          (item5: any) =>
            item5.ProdTypeName == updateProdMinQuantityValues.ProdTypeName
        )?.IdProdType;

      axiosAdmin
        .post(`admin/${key}`, {
          IdProdSaxeoba: IdProdSaxeobaName,
          IdProdTypeGroup: IdProdTypeGroup,
          IdProdType: IdProdType,
          min_quantity: updateProdMinQuantityValues.min_quantity,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("კატეგორიით წარმატებით განახლება");
          setUpdateProdMinQuantityRender(res);
          setUpdateProdMinQuantityValues({
            ProdSaxeobaName: "",
            ProdTypeGroupName: "",
            ProdTypeName: "",
            min_quantity: "",
            page: 0,
          });
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("კატეგორიით ვერ განახლდა!");
        })
        .finally(() => {
          setUpdateProdMinQuantityLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("შეავსე ყველა ველი!");
    }
  };

  const HandleUpdateProdMinQuantityCode = (key: string) => {
    if (
      updateProdMinQuantityCodeValues.ProdCode &&
      updateProdMinQuantityCodeValues.min_quantity
    ) {
      setUpdateProdMinQuantityCodeLoader(true);

      axiosAdmin
        .post(`admin/${key}`, {
          ProdCode: updateProdMinQuantityCodeValues.ProdCode,
          min_quantity: updateProdMinQuantityCodeValues.min_quantity,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("პროდუქტი წარმატებით განახლება");
          setUpdateProdMinQuantityCodeRender(res);
          setUpdateProdMinQuantityCodeValues({
            ProdCode: "",
            min_quantity: "",
          });
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("პროდუქტი ვერ განახლდა!");
        })
        .finally(() => {
          setUpdateProdMinQuantityCodeLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("შეავსე ყველა ველი!");
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[10px] items-center relative ${
        updateProdMinQuantityLoader ||
        (updateProdMinQuantityCodeLoader && "pointer-events-none opacity-[0.5]")
      }`}
    >
      <h1 className="mt-[20px] w-full">განახლება კატეგორიით</h1>
      {allProductsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center top-[150px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allProductsData?.length > 0 ? (
        <>
          <div className="w-full grid grid-cols-4 max-lg:grid-cols-1 gap-[30px] max-lg:gap-y-[10px]">
            <DropDown1value
              title="პირველი რიგის კატეგორიები"
              data={FrontCategoriesData}
              name="ProdSaxeobaName"
              setAllValues={setUpdateProdMinQuantityValues}
              placeholder="აირჩიე"
              searchable={true}
              render={updateProdMinQuantityRender}
            />
            <div
              className={`${
                !updateProdMinQuantityValues.ProdSaxeobaName &&
                "pointer-events-none opacity-[0.5]"
              }`}
            >
              <DropDown1value
                title="მეორე რიგის კატეგორიები"
                data={
                  FrontCategoriesData.find(
                    (item1: any) =>
                      updateProdMinQuantityValues.ProdSaxeobaName ==
                      item1.ProdSaxeobaName
                  )?.productTypeGroup
                }
                name="ProdTypeGroupName"
                setAllValues={setUpdateProdMinQuantityValues}
                placeholder="აირჩიე"
                searchable={true}
                render={
                  updateProdMinQuantityValues.ProdSaxeobaName ||
                  updateProdMinQuantityRender
                }
              />
            </div>
            <div
              className={`${
                !updateProdMinQuantityValues.ProdTypeGroupName &&
                "pointer-events-none opacity-[0.5]"
              }`}
            >
              <DropDown1value
                title="მესამე რიგის კატეგორიები"
                data={
                  FrontCategoriesData.find(
                    (item1: any) =>
                      updateProdMinQuantityValues.ProdSaxeobaName ===
                      item1.ProdSaxeobaName
                  )?.productTypeGroup.find(
                    (item2: any) =>
                      updateProdMinQuantityValues.ProdTypeGroupName ===
                      item2.ProdTypeGroupName
                  )?.productTypes
                }
                name="ProdTypeName"
                setAllValues={setUpdateProdMinQuantityValues}
                placeholder="აირჩიე"
                searchable={true}
                render={
                  updateProdMinQuantityValues.ProdTypeGroupName ||
                  updateProdMinQuantityValues.ProdSaxeobaName ||
                  updateProdMinQuantityRender
                }
              />
            </div>

            <Input1
              title="მინიმალური რაოდენობა"
              name="min_quantity"
              type="text"
              digit={true}
              setAllValues={setUpdateProdMinQuantityValues}
              render={updateProdMinQuantityRender}
            />
          </div>
          <hr className="h-[1px] w-full" />
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0">
              პროდუქტის მინიმალური რაოდენობა (ნაშთები)
            </h1>
            <GreenButton
              name="განახლება"
              action={() => {
                HandleUpdateProdMinQuantity(
                  "updateProductMinQuantityByCategory"
                );
              }}
              loader={updateProdMinQuantityLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0">პროდუქტის მინიმალური მნიშვნელობა</h1>
            <GreenButton
              name="განახლება"
              action={() => {
                HandleUpdateProdMinQuantity("updateProductMinValueByCategory");
              }}
              loader={updateProdMinQuantityLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>

          <hr className="h-[1px] w-full" />
          <h1 className="mt-[20px] w-full">განახლება კოდით</h1>
          <div className="w-full grid grid-cols-2 max-lg:grid-cols-1 gap-[30px] max-lg:gap-y-[10px]">
            <Input1
              title="პროდუქტის კოდი"
              name="ProdCode"
              type="text"
              digit={true}
              setAllValues={setUpdateProdMinQuantityCodeValues}
              render={updateProdMinQuantityCodeRender}
            />
            <Input1
              title="მინიმალური რაოდენობა"
              name="min_quantity"
              type="text"
              digit={true}
              setAllValues={setUpdateProdMinQuantityCodeValues}
              render={updateProdMinQuantityCodeRender}
            />
          </div>
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0">
              პროდუქტის მინიმალური რაოდენობა (ნაშთები)
            </h1>
            <GreenButton
              name="განახლება"
              action={() => {
                HandleUpdateProdMinQuantityCode(
                  "updateProductMinQuantityByProdCode"
                );
              }}
              loader={updateProdMinQuantityCodeLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0">პროდუქტის მინიმალური მნიშვნელობა</h1>
            <GreenButton
              name="განახლება"
              action={() => {
                HandleUpdateProdMinQuantityCode(
                  "updateProductMinValueByProdCode"
                );
              }}
              loader={updateProdMinQuantityCodeLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>

          <hr className="h-[1px] w-full" />

          {allProductsData.map((item: ProductType, index: number) => (
            <div
              key={item.ProdCode}
              className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] w-full hover:shadow-sm hover:px-[23px] duration-100 `}
            >
              <div className="flex max-md:flex-col items-center gap-[20px]">
                <div className="relative h-[120px] aspect-square rounded-[4px] shrink-0 flex items-center justify-center overflow-hidden bg-white">
                  {item.main_image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_image}`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
                  )}
                </div>
                <div>
                  <h1 className="select-none text-[18px]">
                    {item.ProductName}
                  </h1>

                  <div className="flex items-end">
                    <h1 className="">
                      {item.Fasi_dic !== item.Fasi18
                        ? item.Fasi_dic.toFixed(2)
                        : item.Fasi18.toFixed(2)}
                      ₾
                    </h1>
                    {item.Fasi_dic !== item.Fasi18 && (
                      <p className="pl-[8px] text-gray-400 line-through">
                        {item.Fasi18.toFixed(2)}₾
                      </p>
                    )}
                  </div>
                  <h1 className="text-[15px]">კოდი: {item.ProdCode}</h1>
                  <p className="text-[15px]">
                    მინიმალური რაოდენობა (ნაშთი): {item.min_quantity}
                  </p>
                  <p className="text-[15px]">
                    მინიმალური მნიშვნელობა: {item.min_value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>
          {allProductsLoader
            ? "პროდუქტები იძებნება.."
            : "პროდუქტები არ არსებობს"}
        </p>
      )}
      <div className="pt-[20px] flex justify-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          breakLinkClassName={""}
          breakClassName={"w-8 h-8 flex items-center justify-center"}
          //main container
          containerClassName={`flex items-center gap-1`}
          //single page number
          pageLinkClassName={`w-[40px] h-[40px] text-md bg-white font-forh
               flex items-center justify-center rounded-full`}
          //previous page number
          previousLinkClassName={`hidden`}
          //next page number
          nextLinkClassName={`hidden`}
          //active page
          activeLinkClassName={"!important text-[#CACACA] font-forh"}
          forcePage={updateProdMinQuantityValues.page}
        />
      </div>
    </div>
  );
}
