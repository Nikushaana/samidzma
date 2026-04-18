"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import Image from "next/image";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import ReactPaginate from "react-paginate";
import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import { fetchCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const pagemounted = useRef(false);

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );

  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const [allProductsData, setAllProductsData] = useState<ProductType[]>([]);
  const [allProductsLoader, setAllProductsLoader] = useState<boolean>(true);

  const [refreshImagesLoader, setRefreshImagesLoader] =
    useState<boolean>(false);
  const [refreshProductsCategsLoader, setRefreshProductsCategsLoader] =
    useState<boolean>(false);
  const [refreshProductImgsCategsLoader, setRefreshProductImgsCategsLoader] =
    useState<boolean>(false);

  const [refreshSalesLoader, setRefreshSalesLoader] = useState<boolean>(false);

  const [restoreProdImgCode, setRestoreProdImgCode] = useState<any>({
    prodCode: "",
  });

  const [prodwholenum, setProdwholenum] = useState<any>();
  const [pageCount, setPageCount] = useState(0);

  const [categoriesFilterValues, setCategoriesFilterValues] = useState({
    ProdSaxeobaName: "",
    ProdTypeGroupName: "",
    ProdTypeName: "",
    page: 0,
  });

  const handlePageClick = (event: any) => {
    setCategoriesFilterValues((prev: any) => ({
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
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )?.IdProdSaxeoba;

    const IdProdTypeGroup = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )?.productTypeGroup.find(
      (item4: any) =>
        item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
    )?.IdProdTypeGroup;

    const IdProdType = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )
      ?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
      )
      ?.productTypes.find(
        (item5: any) =>
          item5.ProdTypeName == categoriesFilterValues.ProdTypeName,
      )?.IdProdType;

    axiosAdmin
      .get(
        `admin/allProduct?page=${categoriesFilterValues.page + 1}&per_page=20&${
          categoriesFilterValues.ProdSaxeobaName && IdProdSaxeobaName
            ? `IdProdSaxeoba=${IdProdSaxeobaName}`
            : ""
        }&${
          categoriesFilterValues.ProdTypeGroupName && IdProdTypeGroup
            ? `IdProdTypeGroup=${IdProdTypeGroup}`
            : ""
        }&${
          categoriesFilterValues.ProdTypeName && IdProdType
            ? `IdProdType=${IdProdType}`
            : ""
        }`,
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
    categoriesFilterValues.ProdSaxeobaName,
    categoriesFilterValues.ProdTypeGroupName,
    categoriesFilterValues.ProdTypeName,
    categoriesFilterValues.page,
  ]);

  const HandleRefreshProductsCategs = () => {
    setRefreshProductsCategsLoader(true);

    const IdProdSaxeobaName = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )?.IdProdSaxeoba;

    const IdProdTypeGroup = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )?.productTypeGroup.find(
      (item4: any) =>
        item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
    )?.IdProdTypeGroup;

    const IdProdType = FrontCategoriesData.find(
      (item3: any) =>
        item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
    )
      ?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
      )
      ?.productTypes.find(
        (item5: any) =>
          item5.ProdTypeName == categoriesFilterValues.ProdTypeName,
      )?.IdProdType;

    axiosAdmin
      .post("admin/updateProductByCategory", {
        IdProdSaxeoba: IdProdSaxeobaName,
        IdProdTypeGroup: IdProdTypeGroup,
        IdProdType: IdProdType,
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("პროდუქტები წარმატებით განახლდა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("პროდუქტები ვერ განახლდა!");
      })
      .finally(() => {
        setRefreshProductsCategsLoader(false);
      });
  };

  const HandleRefreshProductImgsCategs = () => {
    if (
      (categoriesFilterValues.ProdSaxeobaName,
      categoriesFilterValues.ProdTypeGroupName)
    ) {
      setRefreshProductImgsCategsLoader(true);

      const IdProdSaxeobaName = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
      )?.IdProdSaxeoba;

      const IdProdTypeGroup = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
      )?.productTypeGroup.find(
        (item4: any) =>
          item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
      )?.IdProdTypeGroup;

      const IdProdType = FrontCategoriesData.find(
        (item3: any) =>
          item3.ProdSaxeobaName == categoriesFilterValues.ProdSaxeobaName,
      )
        ?.productTypeGroup.find(
          (item4: any) =>
            item4.ProdTypeGroupName == categoriesFilterValues.ProdTypeGroupName,
        )
        ?.productTypes.find(
          (item5: any) =>
            item5.ProdTypeName == categoriesFilterValues.ProdTypeName,
        )?.IdProdType;

      axiosAdmin
        .post("admin/updateProductPictureByCategory", {
          IdProdSaxeoba: IdProdSaxeobaName,
          IdProdTypeGroup: IdProdTypeGroup,
          IdProdType: IdProdType,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("კატეგორიის სურათები წარმატებით განახლდა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("კატეგორიის სურათები ვერ განახლდა!");
        })
        .finally(() => {
          setRefreshProductImgsCategsLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("აირჩიე პირველი და მეორე კატეგორია!");
    }
  };

  const HandleRefreshImgs = () => {
    if (restoreProdImgCode.prodCode.length > 0) {
      setRefreshImagesLoader(true);
      axiosAdmin
        .post("admin/updateProductPictureByCode", {
          prodCodes: restoreProdImgCode.prodCode,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("ფოტოები წარმატებით განახლდა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ფოტოები ვერ განახლდა!");
        })
        .finally(() => {
          setRefreshImagesLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("ჩაწერე პროდუქტის კოდი");
    }
  };

  const HandleRefreshSales = () => {
    setRefreshSalesLoader(true);
    axiosAdmin
      .get("admin/getAqciaChecking")
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("ფასდაკლება წარმატებით განახლდა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ფასდაკლება ვერ განახლდა!");
      })
      .finally(() => {
        setRefreshSalesLoader(false);
      });
  };

  return (
    <div
      className={`flex flex-col gap-y-[10px] items-center relative ${
        (refreshImagesLoader ||
          refreshProductsCategsLoader ||
          refreshProductImgsCategsLoader ||
          refreshSalesLoader) &&
        "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">პროდუქტების განახლება</h1>
      <div className="self-end">
        <GreenButton
          name="ფასდაკლების განახლება"
          action={HandleRefreshSales}
          loader={refreshSalesLoader}
          style="h-[50px] text-[18px] max-sm:text-[16px]"
        />
      </div>
      {allProductsLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center top-[150px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allProductsData?.length > 0 ? (
        <div className="w-full flex flex-col gap-y-[20px]">
          <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[30px] max-lg:gap-y-[10px]">
            <DropDown1value
              title="პირველი რიგის კატეგორიები"
              data={FrontCategoriesData}
              name="ProdSaxeobaName"
              setAllValues={setCategoriesFilterValues}
              placeholder="აირჩიე"
              searchable={true}
              firstValue={
                pagemounted.current && categoriesFilterValues.ProdSaxeobaName
              }
            />
            <div
              className={`${
                !categoriesFilterValues.ProdSaxeobaName &&
                "pointer-events-none opacity-[0.5]"
              }`}
            >
              <DropDown1value
                title="მეორე რიგის კატეგორიები"
                data={
                  FrontCategoriesData.find(
                    (item1: any) =>
                      categoriesFilterValues.ProdSaxeobaName ==
                      item1.ProdSaxeobaName,
                  )?.productTypeGroup
                }
                name="ProdTypeGroupName"
                setAllValues={setCategoriesFilterValues}
                placeholder="აირჩიე"
                searchable={true}
                render={categoriesFilterValues.ProdSaxeobaName}
                firstValue={
                  pagemounted.current &&
                  categoriesFilterValues.ProdTypeGroupName
                }
              />
            </div>
            <div
              className={`${
                !categoriesFilterValues.ProdTypeGroupName &&
                "pointer-events-none opacity-[0.5]"
              }`}
            >
              <DropDown1value
                title="მესამე რიგის კატეგორიები"
                data={
                  FrontCategoriesData.find(
                    (item1: any) =>
                      categoriesFilterValues.ProdSaxeobaName ===
                      item1.ProdSaxeobaName,
                  )?.productTypeGroup.find(
                    (item2: any) =>
                      categoriesFilterValues.ProdTypeGroupName ===
                      item2.ProdTypeGroupName,
                  )?.productTypes
                }
                name="ProdTypeName"
                setAllValues={setCategoriesFilterValues}
                placeholder="აირჩიე"
                searchable={true}
                render={
                  categoriesFilterValues.ProdTypeGroupName ||
                  categoriesFilterValues.ProdSaxeobaName
                }
                firstValue={
                  pagemounted.current && categoriesFilterValues.ProdTypeName
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0 max-md:shrink">
              პროდუქტის კატეგორიების მიხედვით განახლება
            </h1>
            <GreenButton
              name="განახლება"
              action={HandleRefreshProductsCategs}
              loader={refreshProductsCategsLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>
          <hr className="h-[1px] w-full" />
          <div className="flex items-center gap-[10px] self-start">
            <h1 className="shrink-0 max-md:shrink">
              კატეგორიების მიხედვით პროდუქტის სურათის განახლება
            </h1>
            <GreenButton
              name="განახლება"
              action={HandleRefreshProductImgsCategs}
              loader={refreshProductImgsCategsLoader}
              style="h-[50px] text-[18px] max-sm:text-[16px]"
            />
          </div>
          <hr className="h-[1px] w-full" />
          <div className="flex flex-col gap-[10px]">
            <h1 className="">ჩაწერე პროდუქტის კოდი სურათების გასანახლებლად</h1>

            <div className="flex gap-[10px] max-sm:flex-col">
              <div className="w-[300px] max-sm:w-full">
                <Input1
                  digit={true}
                  name="prodCode"
                  type="text"
                  setAllValues={setRestoreProdImgCode}
                  error={false}
                />
              </div>
              <div className="w-[300px] max-sm:w-full">
                <GreenButton
                  name="განახლება"
                  action={HandleRefreshImgs}
                  loader={refreshImagesLoader}
                  style="h-[50px] text-[18px] max-sm:text-[16px]"
                />
              </div>
            </div>
          </div>
          <hr className="h-[1px] w-full" />
          {allProductsData.map((item: ProductType, index: number) => (
            <div
              key={item.ProdCode}
              className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] w-full hover:shadow-sm hover:px-[23px]
                
                
                  `}
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
                </div>
              </div>
            </div>
          ))}
        </div>
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
          forcePage={categoriesFilterValues.page}
        />
      </div>
    </div>
  );
}
