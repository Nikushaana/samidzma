"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import BlogsBackgroundDesigns from "../decorationColumns/BlogsBackgroundDesigns";
import EverySlider from "../sliders/EverySlider";
import useBlog from "../../../../dataFetchs/blogContext";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import PathRouterCategoryComponent from "./PathRouterCategoryComponent";
import useScreenWidth from "../ScreenWidth";
import { RiFilter2Fill } from "react-icons/ri";
import GreenButton from "../buttons/greenButton";
import CheckBox from "../Inputs/CheckBox";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { IoIosArrowUp } from "react-icons/io";
import ReactSlider from "react-slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useFilter from "../../../../dataFetchs/filtersContext";
import ReactPaginate from "react-paginate";
import HorizontalCard from "../CardVariations/HorizontalCard";
import ProductCard from "../CardVariations/ProductCard";
import DropDown1value from "../DropDowns/DropDown1value";
import Image from "next/image";
import WhatUSearch from "../Inputs/WhatUSearch";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { PiRowsFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/category.api";

export default function CategoryComponent({
  passedCategories,
  passedCategoriesLoader,
}: {
  passedCategories?: any[];
  passedCategoriesLoader?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);
  const pagemounted = useRef(false);
  const key = searchParams.get("key");

  const screenWidth = useScreenWidth();
  const {
    filterValues,
    setFilterValues,
    currentPage,
    setCurrentPage,
    pathnameItems,
    slugify,
  } = useContext(ContextForSharingStates);
  const {
    forma,
    zoma,
    saxeoba,
    masala,
    moculoba,
    type,
    feri,
    xangrdzlivoba,
    tema,
    sqesi,
    raodenobaShefutvashi,
  } = useFilter();
  
  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const [filterStatus, setFilterStatus] = useState(true);
  const [FilterComponents, setFilterComponents] = useState<any>([]);
  const [dropedFilter, setDropedFilter] = useState<any>("");
  const [childCategoriesData, setChildCategoriesData] = useState<any>([]);
  const [moreCategoriesData, setMoreCategoriesData] = useState<any>([]);

  // get filter values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev: any) => ({
      ...prev,
      [name]:
        name === "minPrice" || name === "maxPrice"
          ? value.replace(/[^0-9.]/g, "")
          : value,
    }));
  };

  // side bar toggle
  useEffect(() => {
    setFilterStatus(screenWidth >= 1025 ? true : false);
  }, [screenWidth]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !(filterRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      if (screenWidth <= 1025) {
        setFilterStatus(false);
      }
    }
  };

  useEffect(() => {
    if (screenWidth <= 1025) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, []);

  // card variation style
  const [displayVar, setdisplayVar] = useState([
    {
      id: 1,
      icon: <BsGrid3X3GapFill />,
    },
    {
      id: 2,
      icon: <TfiLayoutGrid4Alt />,
    },
    {
      id: 3,
      icon: <PiRowsFill />,
    },
  ]);

  const [activeVar, setActiveVar] = useState(1);

  // find status of filter components
  useEffect(() => {
    const attributesConfig = [
      {
        id: 1,
        name: "ფორმა",
        key: "forma",
        data: forma,
        code: "FeriCode",
        nameEng: "FeriName",
        status: 0,
      },
      {
        id: 2,
        name: "ზომა",
        key: "zoma",
        data: zoma,
        code: "FormaCode",
        nameEng: "FormaName",
        status: 0,
      },
      {
        id: 3,
        name: "სახეობა",
        key: "saxeoba1",
        data: saxeoba,
        code: "StyleCode",
        nameEng: "StyleName",
        status: 0,
      },
      {
        id: 4,
        name: "მასალა",
        key: "masala",
        data: masala,
        code: "SqesiCode",
        nameEng: "SqesiName",
        status: 0,
      },
      {
        id: 5,
        name: "მოცულობა",
        key: "moculoba",
        data: moculoba,
        code: "SizeCode",
        nameEng: "SizeName",
        status: 0,
      },
      {
        id: 6,
        name: "ტიპი",
        key: "tipi",
        data: type,
        code: "IdAttribute1",
        nameEng: "Attribute1",
        status: 0,
      },
      {
        id: 7,
        name: "ფერი",
        key: "feri",
        data: feri,
        code: "IdAttribute2",
        nameEng: "Attribute2",
        status: 0,
      },
      {
        id: 8,
        name: "ხანგრძლივობა",
        key: "xangrdzlivoba",
        data: xangrdzlivoba,
        code: "IdAttribute3",
        nameEng: "Attribute3",
        status: 0,
      },
      {
        id: 9,
        name: "თემა",
        key: "tema",
        data: tema,
        code: "IdAttribute4",
        nameEng: "Attribute4",
        status: 0,
      },
      {
        id: 10,
        name: "სქესი",
        key: "sqesi",
        data: sqesi,
        code: "IdAttribute5",
        nameEng: "Attribute5",
        status: 0,
      },
      {
        id: 11,
        name: "რაოდენობა შეფუთვაში",
        key: "raodenoba_shefutvashi",
        data: raodenobaShefutvashi,
        code: "IdAttribute6",
        nameEng: "Attribute6",
        status: 0,
      },
    ];

    const getStatus = (attrKey: string) => {
      const firstLevel = FrontCategoriesData.find(
        (item: any) =>
          item.IdProdSaxeoba == pathnameItems[0]?.pathCode?.split("_").pop()
      );

      if (!firstLevel) return 0;

      if (pathnameItems.length === 1) {
        return firstLevel[attrKey] || 0;
      } else if (pathnameItems.length === 2) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) =>
            item.IdProdTypeGroup == pathnameItems[1]?.pathCode?.split("_").pop()
        );

        return secondLevel?.[attrKey] || 0;
      } else if (pathnameItems.length === 3) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) =>
            item.IdProdTypeGroup == pathnameItems[1]?.pathCode?.split("_").pop()
        );
        const thirdLevel = secondLevel?.productTypes.find(
          (item: any) =>
            item.IdProdType == pathnameItems[2]?.pathCode?.split("_").pop()
        );
        return thirdLevel?.[attrKey] || 0;
      }
      return 0;
    };

    const updatedComponents = attributesConfig.map((attr) => ({
      ...attr,
      status: getStatus(attr.key),
    }));

    setFilterComponents(updatedComponents);
  }, [
    forma,
    zoma,
    saxeoba,
    masala,
    moculoba,
    type,
    feri,
    xangrdzlivoba,
    tema,
    sqesi,
    raodenobaShefutvashi,
    pathnameItems,
    FrontCategoriesData,
    key,
  ]);

  // blogs data
  const { blogData, blogLoader } = useBlog();

  // first level categories data
  const [firstLevelCategoriesData, setFirstLevelCategoriesData] = useState<any>(
    []
  );
  const [firstLevelCategoriesLoader, setFirstLevelCategoriesLoader] =
    useState(true);

  useEffect(() => {
    setFirstLevelCategoriesLoader(true);
    axiosUser
      .get(`front/firstLevelCategories`)
      .then((res) => {
        setFirstLevelCategoriesData(res.data.data);
        setFirstLevelCategoriesLoader(false);
      })
      .finally(() => {});
  }, []);

  // fetch correct categories in categories boxes and sidebar
  useEffect(() => {
    if (filterValues.key) {
      if (pathname.split("/").length == 2) {
        axiosUser
          .get(
            `ourfilter/getProdTypeGroupsKey?${
              filterValues.key ? `key=${filterValues.key}` : ""
            }`
          )
          .then((res) => {
            setChildCategoriesData(res.data);
          })
          .catch((err) => {})
          .finally(() => {});
      } else {
        axiosUser
          .get(
            `ourFilter/getProdTypesKey?key=${
              filterValues.key
            }&IdProdGroupType=${pathname.split("/")[3]?.split("_").pop()}`
          )
          .then((res) => {
            setChildCategoriesData(res.data);
          })
          .catch((err) => {})
          .finally(() => {});
      }
    } else {
      setChildCategoriesData(passedCategories);
    }
  }, [passedCategories, filterValues, pathname]);

  useEffect(() => {
    let moreCategories: any = [];

    if (!filterValues.key) {
      if (pathnameItems.length == 1) {
        moreCategories = FrontCategoriesData.find(
          (category: any) =>
            category.IdProdSaxeoba == pathnameItems[0].pathCode.split("_")[1]
        )?.add_category;
      } else if (pathnameItems.length == 2) {
        moreCategories = FrontCategoriesData.find(
          (category: any) =>
            category.IdProdSaxeoba == pathnameItems[0].pathCode.split("_")[1]
        )?.productTypeGroup.find(
          (category1: any) =>
            category1.IdProdTypeGroup == pathnameItems[1].pathCode.split("_")[1]
        )?.add_category;
      }
    }

    setMoreCategoriesData(moreCategories);
  }, [pathnameItems, FrontCategoriesData, filterValues]);

  // product filter
  const [productsPageData, setProductsPageData] = useState<any>([]);
  const [productsPagePreLoader, setProductsPagePreLoader] =
    useState<boolean>(true);
  const [productsPageLoader, setProductsPageLoader] = useState<boolean>(true);

  const [prodwholenum, setProdwholenum] = useState<any>();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(prodwholenum / 12));
  }, [prodwholenum]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    if (!productsPagePreLoader) {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  }, [currentPage]);

  // get from params
  useEffect(() => {
    if (pagemounted.current) return;
    pagemounted.current = true;

    const searchParams = new URLSearchParams(window.location.search);
    const keyFromParams = searchParams.get("key");

    const currentPageFromParams = searchParams.get("currentPage");

    const FeriCodeFromParams = searchParams.get("FeriCode");
    const FormaCodeFromParams = searchParams.get("FormaCode");
    const StyleCodeFromParams = searchParams.get("StyleCode");
    const SqesiCodeFromParams = searchParams.get("SqesiCode");
    const SizeCodeFromParams = searchParams.get("SizeCode");
    const IdAttribute1FromParams = searchParams.get("IdAttribute1");
    const IdAttribute2FromParams = searchParams.get("IdAttribute2");
    const IdAttribute3FromParams = searchParams.get("IdAttribute3");
    const IdAttribute4FromParams = searchParams.get("IdAttribute4");
    const IdAttribute5FromParams = searchParams.get("IdAttribute5");
    const IdAttribute6FromParams = searchParams.get("IdAttribute6");

    const minPriceFromParams = searchParams.get("minPrice");
    const maxPriceFromParams = searchParams.get("maxPrice");
    const saleFromParams = searchParams.get("sale");
    const aqciaFromParams = searchParams.get("aqcia");

    const currentPage = currentPageFromParams
      ? parseInt(currentPageFromParams, 10) - 1
      : 0;

    setCurrentPage(currentPage);

    setFilterValues((prev: any) => ({
      ...prev,

      key: keyFromParams ? keyFromParams : "",

      FeriCode: FeriCodeFromParams
        ? FeriCodeFromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      FormaCode: FormaCodeFromParams
        ? FormaCodeFromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      StyleCode: StyleCodeFromParams
        ? StyleCodeFromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      SqesiCode: SqesiCodeFromParams
        ? SqesiCodeFromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      SizeCode: SizeCodeFromParams
        ? SizeCodeFromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute1: IdAttribute1FromParams
        ? IdAttribute1FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute2: IdAttribute2FromParams
        ? IdAttribute2FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute3: IdAttribute3FromParams
        ? IdAttribute3FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute4: IdAttribute4FromParams
        ? IdAttribute4FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute5: IdAttribute5FromParams
        ? IdAttribute5FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      IdAttribute6: IdAttribute6FromParams
        ? IdAttribute6FromParams.split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],

      minPrice: minPriceFromParams
        ? parseInt(minPriceFromParams)
        : parseInt("0"),
      maxPrice: maxPriceFromParams
        ? parseInt(maxPriceFromParams)
        : parseInt("10000"),
      sale: saleFromParams ? parseInt(saleFromParams) : parseInt("0"),
      aqcia: aqciaFromParams ? parseInt(aqciaFromParams) : parseInt("0"),
    }));
  }, []);
  // get from params

  // set to params
  useEffect(() => {
    const searchParams = new URLSearchParams();

    searchParams.set("currentPage", currentPage + 1);

    if (pathname.split("/")[1] === "category") {
      searchParams.set("key", filterValues.key.toString());
    } else {
      searchParams.set("key", "");
    }
    searchParams.set("FeriCode", filterValues.FeriCode.toString());
    searchParams.set("FormaCode", filterValues.FormaCode.toString());
    searchParams.set("StyleCode", filterValues.StyleCode.toString());
    searchParams.set("SqesiCode", filterValues.SqesiCode.toString());
    searchParams.set("SizeCode", filterValues.SizeCode.toString());
    searchParams.set("IdAttribute1", filterValues.IdAttribute1.toString());
    searchParams.set("IdAttribute2", filterValues.IdAttribute2.toString());
    searchParams.set("IdAttribute3", filterValues.IdAttribute3.toString());
    searchParams.set("IdAttribute4", filterValues.IdAttribute4.toString());
    searchParams.set("IdAttribute5", filterValues.IdAttribute5.toString());
    searchParams.set("IdAttribute6", filterValues.IdAttribute6.toString());

    searchParams.set("minPrice", filterValues.minPrice.toString());
    searchParams.set("maxPrice", filterValues.maxPrice.toString());
    searchParams.set("sale", filterValues.sale.toString());
    searchParams.set("aqcia", filterValues.aqcia?.toString());

    if (pathname.startsWith("/category")) {
      window.history.replaceState(
        null,
        "",
        `${pathname}?${searchParams.toString()}`
      );
    }
  }, [filterValues, pathname, productsPagePreLoader, currentPage]);
  // set to params

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setProductsPageLoader(true);

    axiosUser
      .get(
        `front/ourProduct?
        pageNumber=${currentPage + 1}&
        itemsOnPage=12&${  filterValues.key ? `key=${filterValues.key}` : ""}&
        ${filterValues.FeriCode.length > 0
            ? `FeriCode=${JSON.stringify(filterValues.FeriCode)}`
            : ""}&
            ${filterValues.FormaCode.length > 0
            ? `FormaCode=${JSON.stringify(filterValues.FormaCode)}`
            : ""}&
            ${filterValues.StyleCode.length > 0
            ? `StyleCode=${JSON.stringify(filterValues.StyleCode)}`
            : ""}&
            ${filterValues.SqesiCode.length > 0
            ? `SqesiCode=${JSON.stringify(filterValues.SqesiCode)}`
            : ""}&
            ${filterValues.SizeCode.length > 0
            ? `SizeCode=${JSON.stringify(filterValues.SizeCode)}`
            : ""}&
            ${filterValues.IdAttribute1.length > 0
            ? `IdAttribute1=${JSON.stringify(filterValues.IdAttribute1)}`
            : ""}&
            ${filterValues.IdAttribute2.length > 0
            ? `IdAttribute2=${JSON.stringify(filterValues.IdAttribute2)}`
            : ""}&
            ${filterValues.IdAttribute3.length > 0
            ? `IdAttribute3=${JSON.stringify(filterValues.IdAttribute3)}`
            : ""}&
            ${filterValues.IdAttribute4.length > 0
            ? `IdAttribute4=${JSON.stringify(filterValues.IdAttribute4)}`
            : ""}&
            ${filterValues.IdAttribute5.length > 0
            ? `IdAttribute5=${JSON.stringify(filterValues.IdAttribute5)}`
            : ""}&
            ${filterValues.IdAttribute6.length > 0
            ? `IdAttribute6=${JSON.stringify(filterValues.IdAttribute6)}`
            : ""}&
            ${pathnameItems[0]?.pathCode
            ? `IdProdSaxeoba=${pathnameItems[0]?.pathCode?.split("_").pop()}`
            : ""}&
            ${pathnameItems[1]?.pathCode
            ? `IdProdTypeGroup=${pathnameItems[1]?.pathCode?.split("_").pop()}`
            : ""}&
            ${pathnameItems[2]?.pathCode
            ? `IdProdType=${pathnameItems[2]?.pathCode?.split("_").pop()}`
            : ""}&
            ${filterValues.minPrice ? `minPrice=${filterValues.minPrice}` : ""}&
            ${filterValues.maxPrice ? `maxPrice=${filterValues.maxPrice}` : ""}&
            sale=${filterValues.sale}&
            aqcia=${filterValues.aqcia}
          `,
        { signal }
      )
      .then((res) => {
        setProductsPagePreLoader(false);

        setProductsPageData(res.data.data);
        setProdwholenum(res.data.total);
      })
      .catch((err) => {
        setProductsPagePreLoader(true);
      })
      .finally(() => {
        setProductsPageLoader(false);
      });
    return () => controller.abort();
  }, [
    currentPage,
    filterValues.FeriCode,
    filterValues.FormaCode,
    filterValues.IdAttribute1,
    filterValues.IdAttribute2,
    filterValues.IdAttribute3,
    filterValues.IdAttribute4,
    filterValues.IdAttribute5,
    filterValues.IdAttribute6,
    filterValues.SizeCode,
    filterValues.SqesiCode,
    filterValues.StyleCode,
    filterValues.key,
    filterValues.maxPrice,
    filterValues.minPrice,
    filterValues.sale,
    filterValues.aqcia,
    pathnameItems,
  ]);

  return (
    <div className="flex flex-col gap-y-[20px] items-center min-h-[calc(100vh-748px)] relative">
      <div className="max-w-[1920px] px-[264px] max-2xl:px-[90px] max-sm:px-[25px] w-full pb-[100px] flex flex-col gap-y-[48px]">
        {/* category component */}
        <div className="flex flex-col gap-y-[20px] w-full">
          {/* first level categories slider */}
          <div className="bg-[#eaedee] w-full p-[20px] max-lg:p-0 flex flex-col items-center rounded-[12px]">
            <div className="w-full rounded-[8px] overflow-hidden">
              <EverySlider
                data={firstLevelCategoriesData}
                loader={firstLevelCategoriesLoader}
                card="FirstCategoriesCard"
                slidesPerView={5}
                spaceBetween={15}
              />
            </div>
          </div>

          {/* path router */}
          <PathRouterCategoryComponent />

          <div className="flex max-lg:flex-col gap-[20px] ">
            {/* side bar */}
            <div ref={filterRef} className="max-lg:relative max-lg:w-full">
              <div
                onClick={() => {
                  setFilterStatus((pre: any) => !pre);
                }}
                className="w-[53px] aspect-square hidden max-lg:flex items-center text-[25px] justify-center bg-myGreen text-white rounded-[12px] cursor-pointer"
              >
                <RiFilter2Fill />
              </div>
              <div
                className={`w-[330px] max-2xl:w-[300px] max-sm:w-full max-lg:absolute max-lg:top-[45px] flex flex-col gap-y-[10px] ${
                  filterStatus ? "ml-0" : "ml-[-700px]"
                } duration-200 max-lg:z-[2] max-lg:shadow rounded-[12px] self-start bg-white p-[20px] flex flex-col gap-y-[10px] sticky top-[20px]`}
              >
                {firstLevelCategoriesLoader ? (
                  Array.from({ length: 5 }, (_, i) => i + 1).map(
                    (item: any, index: number) => (
                      <div
                        key={item}
                        className={`w-full rounded-[8px] overflow-hidden h-[30px]`}
                      >
                        <div className="loaderwave"></div>
                      </div>
                    )
                  )
                ) : // !key &&
                FilterComponents.find((item: any) => item.status == 1) ? (
                  <div>
                    <div
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          sale: filterValues.sale ? 0 : 1,
                        }));
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        ფასდაკლება
                      </h1>
                      <CheckBox active={filterValues.sale ? true : false} />
                    </div>
                    <div
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          aqcia: filterValues.aqcia ? 0 : 1,
                        }));
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        აქცია
                      </h1>
                      <CheckBox active={filterValues.aqcia ? true : false} />
                    </div>

                    <div
                      className={`flex flex-col gap-y-[10px]  duration-100  ${
                        dropedFilter === "price" ? "pb-[20px]" : " pb-0"
                      }`}
                    >
                      <div
                        onClick={() => {
                          setDropedFilter((prev: any) =>
                            prev === "price" ? "" : "price"
                          );
                        }}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                          ფასი
                        </h1>
                        <IoIosArrowUp
                          className={`duration-200 ${
                            dropedFilter === "price" ? "rotate-[180deg]" : ""
                          }`}
                        />
                      </div>

                      <div
                        className={`flex flex-col gap-y-[20px] duration-200 ${
                          dropedFilter === "price"
                            ? "h-auto opacity-1"
                            : "h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-[10px]">
                          <div className="flex items-center justify-between gap-[5px]">
                            <div
                              className={`rounded-full w-[50%] h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] bg-[#EEEEEE] border-[#E2E2E2]`}
                            >
                              <input
                                onChange={handleInputChange}
                                value={filterValues.minPrice}
                                type="text"
                                name="minPrice"
                                placeholder="დან"
                                className={`select-none outline-none rounded-[4px] px-[5px] text-[14px] h-full w-full bg-transparent`}
                              />
                              ₾
                            </div>
                            <p>-</p>
                            <div
                              className={`rounded-full w-[50%] h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] bg-[#EEEEEE] border-[#E2E2E2]`}
                            >
                              <input
                                onChange={handleInputChange}
                                value={filterValues.maxPrice}
                                type="text"
                                name="maxPrice"
                                placeholder="მდე"
                                className={`select-none outline-none rounded-[4px] px-[5px] text-[14px] h-full w-full bg-transparent`}
                              />
                              ₾
                            </div>
                          </div>
                          <div className="w-full flex flex-col items-center">
                            <ReactSlider
                              className="horizontal-slider w-full h-[22px] flex items-center  "
                              thumbClassName="w-[22px] h-[22px] bg-myGreen rounded-full outline-none text-[0px] text-myGreen flex items-center justify-center cursor-pointer"
                              trackClassName="example-track bg-myGreen"
                              value={[
                                filterValues.minPrice,
                                filterValues.maxPrice,
                              ]}
                              max={10000}
                              min={0}
                              ariaLabel={["Lower thumb", "Upper thumb"]}
                              ariaValuetext={(state: any) =>
                                `Thumb value ${state.valueNow}`
                              }
                              renderThumb={(props: any, state: any) => (
                                <div {...props} key={state.index}>
                                  {state.valueNow}
                                </div>
                              )}
                              onChange={(value: [number, number]) => {
                                setFilterValues((prev: any) => ({
                                  ...prev,
                                  minPrice: value[0],
                                  maxPrice: value[1],
                                }));
                                setCurrentPage(0);
                              }}
                              pearling
                              minDistance={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {FilterComponents.map((filter: any) => (
                      <div
                        key={filter.id}
                        className={`flex-col gap-y-[10px] duration-100 ${
                          filter.status ? "flex" : "hidden"
                        } ${
                          dropedFilter === filter.name ? "pb-[20px]" : " pb-0"
                        }`}
                      >
                        <div
                          onClick={() => {
                            setDropedFilter((prev: any) =>
                              prev === filter.name ? "" : filter.name
                            );
                          }}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                            {filter.name}
                          </h1>
                          <IoIosArrowUp
                            className={`duration-200 shrink-0 ${
                              dropedFilter === filter.name
                                ? "rotate-[180deg]"
                                : ""
                            }`}
                          />
                        </div>

                        <div
                          className={`flex flex-col gap-y-[10px] duration-200 ${
                            dropedFilter === filter.name
                              ? "h-auto opacity-1"
                              : "h-0 overflow-hidden opacity-0"
                          }`}
                        >
                          {filter?.data?.length > 0 &&
                            filter?.data?.map((item: any, index: any) => (
                              <div
                                key={`${item[filter.code]}-${index}`}
                                onClick={() => {
                                  setFilterValues((prev: any) => ({
                                    ...prev,
                                    [filter.code]: prev[filter.code]?.find(
                                      (item1: any) =>
                                        item1 == parseInt(item[filter.code])
                                    )
                                      ? prev[filter.code].filter(
                                          (item2: any) =>
                                            item2 != item[filter.code]
                                        )
                                      : [
                                          ...(prev[filter.code] || []),
                                          parseInt(item[filter.code]),
                                        ],
                                  }));
                                  setCurrentPage(0);
                                }}
                                className="flex items-center gap-[5px] cursor-pointer"
                              >
                                <div className="select-none">
                                  <CheckBox
                                    active={filterValues[filter.code]?.find(
                                      (filteredItem: any) =>
                                        filteredItem == item[filter.code]
                                    )}
                                  />
                                </div>
                                <p className="text-[14px]">
                                  {item[filter.nameEng]}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {((pathname.split("/").length !== 5 && filterValues.key) ||
                      !filterValues.key) &&
                      childCategoriesData?.map((item: any, index: number) => (
                        <p
                          key={`group-${item.IdProdTypeGroup || ""}-type-${
                            item.IdProdType || ""
                          }`}
                          onClick={() => {
                            if (pathname.split("/").length >= 3) {
                              router.push(
                                `${pathname}/${
                                  pathname.split("/").length === 3
                                    ? slugify(item.ProdTypeGroupName) +
                                      "_" +
                                      item.IdProdTypeGroup
                                    : pathname.split("/").length === 4 &&
                                      slugify(item.ProdTypeName) +
                                        "_" +
                                        item.IdProdType
                                }?${
                                  filterValues.key && `key=${filterValues.key}`
                                }`
                              );
                            } else {
                              router.push(
                                `/category/${
                                  slugify(item.saxeoba.ProdSaxeobaName) +
                                  "_" +
                                  item.IdProdSaxeoba
                                }/${
                                  slugify(item.ProdTypeGroupName) +
                                  "_" +
                                  item.IdProdTypeGroup
                                }?key=${filterValues.key}`
                              );
                            }
                          }}
                          className="text-[15px] cursor-pointer"
                        >
                          {pathname.split("/").length <= 3
                            ? item.ProdTypeGroupName
                            : pathname.split("/").length === 4 &&
                              item.ProdTypeName}
                        </p>
                      ))}
                    {pathname.split("/").length >= 3 &&
                      !filterValues.key &&
                      moreCategoriesData?.map((item2: any) => (
                        <p
                          key={item2.id}
                          onClick={() =>
                            router.push(
                              `/category/${
                                item2.level === 2
                                  ? slugify(
                                      item2?.product_type_groupe?.saxeoba
                                        ?.ProdSaxeobaName
                                    ) +
                                    "_" +
                                    item2.product_type_groupe?.IdProdSaxeoba +
                                    "/" +
                                    slugify(
                                      item2?.product_type_groupe
                                        ?.ProdTypeGroupName
                                    ) +
                                    "_" +
                                    item2.product_type_groupe_id
                                  : item2.level === 3 &&
                                    slugify(
                                      item2?.product_type?.productTypeGroup
                                        ?.saxeoba?.ProdSaxeobaName
                                    ) +
                                      "_" +
                                      item2?.product_type?.productTypeGroup
                                        ?.IdProdSaxeoba +
                                      "/" +
                                      slugify(
                                        item2?.product_type?.ProdTypeGroupName
                                      ) +
                                      "_" +
                                      item2?.product_type?.IdProdTypeGroup +
                                      "/" +
                                      slugify(
                                        item2?.product_type?.ProdTypeName
                                      ) +
                                      "_" +
                                      item2?.product_type_id
                              }`
                            )
                          }
                          className="text-[15px] cursor-pointer"
                        >
                          {item2.level === 2
                            ? item2.product_type_groupe?.ProdTypeGroupName
                            : item2.level === 3 &&
                              item2.product_type?.ProdTypeName}
                        </p>
                      ))}
                  </>
                )}
              </div>
              {FilterComponents.find((item: any) => item.status == 1) && (
                <div
                  className={`fixed hidden z-[4] left-0 w-full max-lg:flex px-[25px] py-[10px] backdrop-blur-[2px] duration-300 ${
                    filterStatus ? "bottom-0 " : "bottom-[-200px]"
                  }`}
                >
                  <GreenButton
                    name="ძიების დასრულება"
                    loader={productsPageLoader}
                    style="h-[56px] max-sm:h-[48px] text-[18px]"
                    action={() => {
                      setFilterStatus((pre: any) => !pre);
                    }}
                  />
                </div>
              )}
            </div>

            {/* content */}
            <div
              className={`flex flex-col gap-y-[48px] w-[calc(100%-350px)] max-2xl:w-[calc(100%-320px)] max-lg:w-full`}
            >
              {/* search input */}
              <WhatUSearch/>

              {/* categories */}
              {((pathname.split("/").length !== 5 && filterValues.key) ||
                !filterValues.key) && (
                <div
                  className={`w-full grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 max-tiny:grid-cols-2 gap-[30px] gap-y-[20px] max-sm:gap-[15px] ${
                    !passedCategoriesLoader && childCategoriesData?.length === 0
                      ? "hidden"
                      : ""
                  }`}
                >
                  {passedCategoriesLoader ? (
                    Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="w-full aspect-square rounded-[4px] overflow-hidden"
                      >
                        <div className="loaderwave"></div>
                      </div>
                    ))
                  ) : (
                    <>
                      {childCategoriesData?.map((item1: any) => (
                        <div
                          key={`group-${item1.IdProdTypeGroup || ""}-type-${
                            item1.IdProdType || ""
                          }`}
                          onClick={() => {
                            if (pathname.split("/").length >= 3) {
                              router.push(
                                `${pathname}/${
                                  pathname.split("/").length === 3
                                    ? slugify(item1.ProdTypeGroupName) +
                                      "_" +
                                      item1.IdProdTypeGroup
                                    : pathname.split("/").length === 4 &&
                                      slugify(item1.ProdTypeName) +
                                        "_" +
                                        item1.IdProdType
                                }?${
                                  filterValues.key && `key=${filterValues.key}`
                                }`
                              );
                            } else {
                              router.push(
                                `/category/${
                                  slugify(item1.saxeoba.ProdSaxeobaName) +
                                  "_" +
                                  item1.IdProdSaxeoba
                                }/${
                                  slugify(item1.ProdTypeGroupName) +
                                  "_" +
                                  item1.IdProdTypeGroup
                                }?key=${filterValues.key}`
                              );
                            }
                          }}
                          className={` flex flex-col w-full cursor-pointer items-center bg-white rounded-[4px] overflow-hidden border-white `}
                        >
                          <div className="relative w-full aspect-square shrink-0 overflow-hidden">
                            {item1?.image ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${item1?.image}`}
                                alt={""}
                                sizes="500px"
                                fill
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full relative">
                                <div className="w-[90%] h-[90%] relative">
                                  <Image
                                    src="/images/siteLogo.png"
                                    alt={""}
                                    sizes="500px"
                                    fill
                                    style={{
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <h1 className="text-[14px] p-[10px] max-sm:p-[5px] w-full h-full flex items-center justify-center text-center">
                            {pathname.split("/").length <= 3
                              ? item1.ProdTypeGroupName
                              : pathname.split("/").length === 4 &&
                                item1.ProdTypeName}
                          </h1>
                        </div>
                      ))}
                      {pathname.split("/").length >= 3 &&
                        !filterValues.key &&
                        moreCategoriesData?.map((item2: any) => (
                          <div
                            key={item2.id}
                            onClick={() =>
                              router.push(
                                `/category/${
                                  item2.level === 2
                                    ? slugify(
                                        item2?.product_type_groupe?.saxeoba
                                          ?.ProdSaxeobaName
                                      ) +
                                      "_" +
                                      item2.product_type_groupe?.IdProdSaxeoba +
                                      "/" +
                                      slugify(
                                        item2?.product_type_groupe
                                          ?.ProdTypeGroupName
                                      ) +
                                      "_" +
                                      item2.product_type_groupe_id
                                    : item2.level === 3 &&
                                      slugify(
                                        item2?.product_type?.productTypeGroup
                                          ?.saxeoba?.ProdSaxeobaName
                                      ) +
                                        "_" +
                                        item2?.product_type?.productTypeGroup
                                          ?.IdProdSaxeoba +
                                        "/" +
                                        slugify(
                                          item2?.product_type?.ProdTypeGroupName
                                        ) +
                                        "_" +
                                        item2?.product_type?.IdProdTypeGroup +
                                        "/" +
                                        slugify(
                                          item2?.product_type?.ProdTypeName
                                        ) +
                                        "_" +
                                        item2?.product_type_id
                                }`
                              )
                            }
                            className={` flex flex-col w-full cursor-pointer items-center bg-white rounded-[4px] overflow-hidden border-white `}
                          >
                            <div className="relative w-full aspect-square shrink-0 overflow-hidden">
                              {(
                                item2.level === 2
                                  ? item2?.product_type_groupe?.image
                                  : item2?.product_type?.image
                              ) ? (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/${
                                    item2.level === 2
                                      ? item2?.product_type_groupe?.image
                                      : item2?.product_type?.image
                                  }`}
                                  alt={""}
                                  sizes="500px"
                                  fill
                                  style={{
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full relative">
                                  <div className="w-[90%] h-[90%] relative">
                                    <Image
                                      src="/images/siteLogo.png"
                                      alt={""}
                                      sizes="500px"
                                      fill
                                      style={{
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <h1 className="text-[14px] p-[10px] max-sm:p-[5px] w-full h-full flex items-center justify-center text-center">
                              {item2.level === 2
                                ? item2.product_type_groupe?.ProdTypeGroupName
                                : item2.level === 3 &&
                                  item2.product_type?.ProdTypeName}
                            </h1>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}

              {/* products */}
              {(FilterComponents.find((item: any) => item.status === 1) ||
                !pathname.split("/")[2]) && (
                <div className="flex flex-col gap-y-[20px]">
                  <div className="flex justify-between gap-[20px] max-sm:flex-col">
                    <div className="flex flex-col gap-y-[10px] w-[40%] max-sm:w-full">
                      <h1 className="text-[28px]">
                        {!pathname.split("/")[2]
                          ? filterValues.key
                          : pathnameItems[pathnameItems.length - 1]
                              ?.pathCategName}
                      </h1>
                      {pathname.split("/")[2] && (
                        <p className="text-[14px]">
                          {
                            pathnameItems[pathnameItems.length - 1]
                              ?.pathCategDescr
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex max-lg:flex-col-reverse max-sm:flex-row max-lg:items-end items-center gap-[20px] w-[40%]  max-lg:w-[50%] max-sm:w-full">
                      <div className=" w-[calc(100%-146px)] max-lg:w-full">
                        <DropDown1value
                          placeholder="დალაგება ფასით"
                          notInputStyle={true}
                        />
                      </div>
                      {screenWidth >= 600 && (
                        <div className="flex items-center rounded-[12px] bg-white overflow-hidden ">
                          {displayVar.map((item: any, index: number) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                setActiveVar(item.id);
                              }}
                              className={`h-[42px] w-[42px] text-[20px] flex items-center justify-center cursor-pointer duration-200 ${
                                activeVar === item.id
                                  ? "bg-myGreen text-white"
                                  : "text-myGreen"
                              }`}
                            >
                              {item.icon}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-[100px]">
                    {productsPagePreLoader && (
                      <div className="w-full grid gap-[20px] grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (item: any, index: number) => (
                            <div
                              key={item}
                              className={`w-full rounded-[12px] overflow-hidden ${
                                activeVar === 1 ? "h-[618px]" : "h-[227px] "
                              }`}
                            >
                              <div className="loaderwave"></div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {productsPageData?.length > 0 ? (
                      <div
                        className={`w-full grid gap-[20px] duration-100  ${
                          activeVar === 1
                            ? "grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1"
                            : activeVar === 2
                            ? "grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1"
                            : activeVar === 3 && "grid-cols-1"
                        }`}
                      >
                        {productsPageData.map((item: any, index: number) => (
                          <div
                            key={item.ProdCode}
                            className={`${
                              productsPageLoader &&
                              "opacity-[0.5] pointer-events-none"
                            }`}
                          >
                            {(activeVar === 1 || activeVar === 2) && (
                              <ProductCard
                                item={item}
                                narrow={activeVar === 2}
                              />
                            )}
                            {activeVar === 3 && <HorizontalCard item={item} />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      !productsPagePreLoader && (
                        <p className="text-gray-500 text-center">
                          პროდუქტი არ მოიძებნა
                        </p>
                      )
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
                        breakClassName={
                          "w-8 h-8 flex items-center justify-center"
                        }
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
                        activeLinkClassName={
                          "!important text-[#CACACA] font-forh"
                        }
                        forcePage={currentPage}
                      />
                    </div>
                  </div>

                  {/* asda */}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* blog component */}
        <div className="rounded-[12px] bg-[#EAEDEE] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0 relative">
          <BlogsBackgroundDesigns />
          <EverySlider
            data={blogData}
            loader={blogLoader}
            title={<h1 className="text-[28px] max-sm:text-[22px]">ბლოგი</h1>}
            card="BlogCard"
            slidesPerView={4}
            spaceBetween={20}
            showButtons={true}
          />
        </div>
      </div>
    </div>
  );
}




// //////////////////////////////////////////////////////////

{/* <div className="flex max-lg:flex-col gap-[20px] ">
            <div ref={filterRef} className="max-lg:relative max-lg:w-full">
              <div
                onClick={() => {
                  setFilterStatus((pre: any) => !pre);
                }}
                className="w-[53px] aspect-square hidden max-lg:flex items-center text-[25px] justify-center bg-myGreen text-white rounded-[12px] cursor-pointer"
              >
                <RiFilter2Fill />
              </div>
              <div
                className={`w-[330px] max-2xl:w-[300px] max-sm:w-full max-lg:absolute max-lg:top-[45px] flex flex-col gap-y-[10px] ${
                  filterStatus ? "ml-0" : "ml-[-700px]"
                } duration-200 max-lg:z-[2] max-lg:shadow rounded-[12px] self-start bg-white p-[20px] flex flex-col gap-y-[10px] sticky top-[20px]`}
              >
                {firstLevelCategoriesLoader ? (
                  Array.from({ length: 5 }, (_, i) => i + 1).map(
                    (item: any, index: number) => (
                      <div
                        key={item}
                        className={`w-full rounded-[8px] overflow-hidden h-[30px]`}
                      >
                        <div className="loaderwave"></div>
                      </div>
                    ),
                  )
                ) : // !key &&
                FilterComponents.find((item: any) => item.status == 1) ? (
                  <div>
                    <div
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          sale: filterValues.sale ? 0 : 1,
                        }));
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        ფასდაკლება
                      </h1>
                      <CheckBox active={filterValues.sale ? true : false} />
                    </div>
                    <div
                      onClick={() => {
                        setFilterValues((prev: any) => ({
                          ...prev,
                          aqcia: filterValues.aqcia ? 0 : 1,
                        }));
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        აქცია
                      </h1>
                      <CheckBox active={filterValues.aqcia ? true : false} />
                    </div>

                    <div
                      className={`flex flex-col gap-y-[10px]  duration-100  ${
                        dropedFilter === "price" ? "pb-[20px]" : " pb-0"
                      }`}
                    >
                      <div
                        onClick={() => {
                          setDropedFilter((prev: any) =>
                            prev === "price" ? "" : "price",
                          );
                        }}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                          ფასი
                        </h1>
                        <IoIosArrowUp
                          className={`duration-200 ${
                            dropedFilter === "price" ? "rotate-[180deg]" : ""
                          }`}
                        />
                      </div>

                      <div
                        className={`flex flex-col gap-y-[20px] duration-200 ${
                          dropedFilter === "price"
                            ? "h-auto opacity-1"
                            : "h-0 overflow-hidden opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-[10px]">
                          <div className="flex items-center justify-between gap-[5px]">
                            <div
                              className={`rounded-full w-[50%] h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] bg-[#EEEEEE] border-[#E2E2E2]`}
                            >
                              <input
                                onChange={handleInputChange}
                                value={filterValues.minPrice}
                                type="text"
                                name="minPrice"
                                placeholder="დან"
                                className={`select-none outline-none rounded-[4px] px-[5px] text-[14px] h-full w-full bg-transparent`}
                              />
                              ₾
                            </div>
                            <p>-</p>
                            <div
                              className={`rounded-full w-[50%] h-[52px] max-sm:h-[42px] outline-none py-[6px] px-[15px] flex items-center duration-100 border-[1px] bg-[#EEEEEE] border-[#E2E2E2]`}
                            >
                              <input
                                onChange={handleInputChange}
                                value={filterValues.maxPrice}
                                type="text"
                                name="maxPrice"
                                placeholder="მდე"
                                className={`select-none outline-none rounded-[4px] px-[5px] text-[14px] h-full w-full bg-transparent`}
                              />
                              ₾
                            </div>
                          </div>
                          <div className="w-full flex flex-col items-center">
                            <ReactSlider
                              className="horizontal-slider w-full h-[22px] flex items-center  "
                              thumbClassName="w-[22px] h-[22px] bg-myGreen rounded-full outline-none text-[0px] text-myGreen flex items-center justify-center cursor-pointer"
                              trackClassName="example-track bg-myGreen"
                              value={[
                                filterValues.minPrice,
                                filterValues.maxPrice,
                              ]}
                              max={10000}
                              min={0}
                              ariaLabel={["Lower thumb", "Upper thumb"]}
                              ariaValuetext={(state: any) =>
                                `Thumb value ${state.valueNow}`
                              }
                              renderThumb={(props: any, state: any) => (
                                <div {...props} key={state.index}>
                                  {state.valueNow}
                                </div>
                              )}
                              onChange={(value: [number, number]) => {
                                setFilterValues((prev: any) => ({
                                  ...prev,
                                  minPrice: value[0],
                                  maxPrice: value[1],
                                }));
                                setCurrentPage(0);
                              }}
                              pearling
                              minDistance={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {FilterComponents.map((filter: any) => (
                      <div
                        key={filter.id}
                        className={`flex-col gap-y-[10px] duration-100 ${
                          filter.status ? "flex" : "hidden"
                        } ${
                          dropedFilter === filter.name ? "pb-[20px]" : " pb-0"
                        }`}
                      >
                        <div
                          onClick={() => {
                            setDropedFilter((prev: any) =>
                              prev === filter.name ? "" : filter.name,
                            );
                          }}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                            {filter.name}
                          </h1>
                          <IoIosArrowUp
                            className={`duration-200 shrink-0 ${
                              dropedFilter === filter.name
                                ? "rotate-[180deg]"
                                : ""
                            }`}
                          />
                        </div>

                        <div
                          className={`flex flex-col gap-y-[10px] duration-200 ${
                            dropedFilter === filter.name
                              ? "h-auto opacity-1"
                              : "h-0 overflow-hidden opacity-0"
                          }`}
                        >
                          {filter?.data?.length > 0 &&
                            filter?.data?.map((item: any, index: any) => (
                              <div
                                key={`${item[filter.code]}-${index}`}
                                onClick={() => {
                                  setFilterValues((prev: any) => ({
                                    ...prev,
                                    [filter.code]: prev[filter.code]?.find(
                                      (item1: any) =>
                                        item1 == parseInt(item[filter.code]),
                                    )
                                      ? prev[filter.code].filter(
                                          (item2: any) =>
                                            item2 != item[filter.code],
                                        )
                                      : [
                                          ...(prev[filter.code] || []),
                                          parseInt(item[filter.code]),
                                        ],
                                  }));
                                  setCurrentPage(0);
                                }}
                                className="flex items-center gap-[5px] cursor-pointer"
                              >
                                <div className="select-none">
                                  <CheckBox
                                    active={filterValues[filter.code]?.find(
                                      (filteredItem: any) =>
                                        filteredItem == item[filter.code],
                                    )}
                                  />
                                </div>
                                <p className="text-[14px]">
                                  {item[filter.nameEng]}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {((pathname.split("/").length !== 5 && filterValues.key) ||
                      !filterValues.key) &&
                      childCategoriesData?.map((item: any, index: number) => (
                        <p
                          key={`group-${item.IdProdTypeGroup || ""}-type-${
                            item.IdProdType || ""
                          }`}
                          onClick={() => {
                            if (pathname.split("/").length >= 3) {
                              router.push(
                                `${pathname}/${
                                  pathname.split("/").length === 3
                                    ? slugify(item.ProdTypeGroupName) +
                                      "_" +
                                      item.IdProdTypeGroup
                                    : pathname.split("/").length === 4 &&
                                      slugify(item.ProdTypeName) +
                                        "_" +
                                        item.IdProdType
                                }?${
                                  filterValues.key && `key=${filterValues.key}`
                                }`,
                              );
                            } else {
                              router.push(
                                `/category/${
                                  slugify(item.saxeoba.ProdSaxeobaName) +
                                  "_" +
                                  item.IdProdSaxeoba
                                }/${
                                  slugify(item.ProdTypeGroupName) +
                                  "_" +
                                  item.IdProdTypeGroup
                                }?key=${filterValues.key}`,
                              );
                            }
                          }}
                          className="text-[15px] cursor-pointer"
                        >
                          {pathname.split("/").length <= 3
                            ? item.ProdTypeGroupName
                            : pathname.split("/").length === 4 &&
                              item.ProdTypeName}
                        </p>
                      ))}
                    {pathname.split("/").length >= 3 &&
                      !filterValues.key &&
                      moreCategoriesData?.map((item2: any) => (
                        <p
                          key={item2.id}
                          onClick={() =>
                            router.push(
                              `/category/${
                                item2.level === 2
                                  ? slugify(
                                      item2?.product_type_groupe?.saxeoba
                                        ?.ProdSaxeobaName,
                                    ) +
                                    "_" +
                                    item2.product_type_groupe?.IdProdSaxeoba +
                                    "/" +
                                    slugify(
                                      item2?.product_type_groupe
                                        ?.ProdTypeGroupName,
                                    ) +
                                    "_" +
                                    item2.product_type_groupe_id
                                  : item2.level === 3 &&
                                    slugify(
                                      item2?.product_type?.productTypeGroup
                                        ?.saxeoba?.ProdSaxeobaName,
                                    ) +
                                      "_" +
                                      item2?.product_type?.productTypeGroup
                                        ?.IdProdSaxeoba +
                                      "/" +
                                      slugify(
                                        item2?.product_type?.ProdTypeGroupName,
                                      ) +
                                      "_" +
                                      item2?.product_type?.IdProdTypeGroup +
                                      "/" +
                                      slugify(
                                        item2?.product_type?.ProdTypeName,
                                      ) +
                                      "_" +
                                      item2?.product_type_id
                              }`,
                            )
                          }
                          className="text-[15px] cursor-pointer"
                        >
                          {item2.level === 2
                            ? item2.product_type_groupe?.ProdTypeGroupName
                            : item2.level === 3 &&
                              item2.product_type?.ProdTypeName}
                        </p>
                      ))}
                  </>
                )}
              </div>
              {FilterComponents.find((item: any) => item.status == 1) && (
                <div
                  className={`fixed hidden z-[4] left-0 w-full max-lg:flex px-[25px] py-[10px] backdrop-blur-[2px] duration-300 ${
                    filterStatus ? "bottom-0 " : "bottom-[-200px]"
                  }`}
                >
                  <GreenButton
                    name="ძიების დასრულება"
                    loader={productsPageLoader}
                    style="h-[56px] max-sm:h-[48px] text-[18px]"
                    action={() => {
                      setFilterStatus((pre: any) => !pre);
                    }}
                  />
                </div>
              )}
            </div>

            <div
              className={`flex flex-col gap-y-[48px] w-[calc(100%-350px)] max-2xl:w-[calc(100%-320px)] max-lg:w-full`}
            >
              <WhatUSearch />

              {((pathname.split("/").length !== 5 && filterValues.key) ||
                !filterValues.key) && (
                <div
                  className={`w-full grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 max-tiny:grid-cols-2 gap-[30px] gap-y-[20px] max-sm:gap-[15px] ${
                    !passedCategoriesLoader && childCategoriesData?.length === 0
                      ? "hidden"
                      : ""
                  }`}
                >
                  {passedCategoriesLoader ? (
                    Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="w-full aspect-square rounded-[4px] overflow-hidden"
                      >
                        <div className="loaderwave"></div>
                      </div>
                    ))
                  ) : (
                    <>
                      {childCategoriesData?.map((item1: any) => (
                        <div
                          key={`group-${item1.IdProdTypeGroup || ""}-type-${
                            item1.IdProdType || ""
                          }`}
                          onClick={() => {
                            if (pathname.split("/").length >= 3) {
                              router.push(
                                `${pathname}/${
                                  pathname.split("/").length === 3
                                    ? slugify(item1.ProdTypeGroupName) +
                                      "_" +
                                      item1.IdProdTypeGroup
                                    : pathname.split("/").length === 4 &&
                                      slugify(item1.ProdTypeName) +
                                        "_" +
                                        item1.IdProdType
                                }?${
                                  filterValues.key && `key=${filterValues.key}`
                                }`,
                              );
                            } else {
                              router.push(
                                `/category/${
                                  slugify(item1.saxeoba.ProdSaxeobaName) +
                                  "_" +
                                  item1.IdProdSaxeoba
                                }/${
                                  slugify(item1.ProdTypeGroupName) +
                                  "_" +
                                  item1.IdProdTypeGroup
                                }?key=${filterValues.key}`,
                              );
                            }
                          }}
                          className={` flex flex-col w-full cursor-pointer items-center bg-white rounded-[4px] overflow-hidden border-white `}
                        >
                          <div className="relative w-full aspect-square shrink-0 overflow-hidden">
                            {item1?.image ? (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/${item1?.image}`}
                                alt={""}
                                sizes="500px"
                                fill
                                style={{
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full relative">
                                <div className="w-[90%] h-[90%] relative">
                                  <Image
                                    src="/images/siteLogo.png"
                                    alt={""}
                                    sizes="500px"
                                    fill
                                    style={{
                                      objectFit: "contain",
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <h1 className="text-[14px] p-[10px] max-sm:p-[5px] w-full h-full flex items-center justify-center text-center">
                            {pathname.split("/").length <= 3
                              ? item1.ProdTypeGroupName
                              : pathname.split("/").length === 4 &&
                                item1.ProdTypeName}
                          </h1>
                        </div>
                      ))}
                      {pathname.split("/").length >= 3 &&
                        !filterValues.key &&
                        moreCategoriesData?.map((item2: any) => (
                          <div
                            key={item2.id}
                            onClick={() =>
                              router.push(
                                `/category/${
                                  item2.level === 2
                                    ? slugify(
                                        item2?.product_type_groupe?.saxeoba
                                          ?.ProdSaxeobaName,
                                      ) +
                                      "_" +
                                      item2.product_type_groupe?.IdProdSaxeoba +
                                      "/" +
                                      slugify(
                                        item2?.product_type_groupe
                                          ?.ProdTypeGroupName,
                                      ) +
                                      "_" +
                                      item2.product_type_groupe_id
                                    : item2.level === 3 &&
                                      slugify(
                                        item2?.product_type?.productTypeGroup
                                          ?.saxeoba?.ProdSaxeobaName,
                                      ) +
                                        "_" +
                                        item2?.product_type?.productTypeGroup
                                          ?.IdProdSaxeoba +
                                        "/" +
                                        slugify(
                                          item2?.product_type
                                            ?.ProdTypeGroupName,
                                        ) +
                                        "_" +
                                        item2?.product_type?.IdProdTypeGroup +
                                        "/" +
                                        slugify(
                                          item2?.product_type?.ProdTypeName,
                                        ) +
                                        "_" +
                                        item2?.product_type_id
                                }`,
                              )
                            }
                            className={` flex flex-col w-full cursor-pointer items-center bg-white rounded-[4px] overflow-hidden border-white `}
                          >
                            <div className="relative w-full aspect-square shrink-0 overflow-hidden">
                              {(
                                item2.level === 2
                                  ? item2?.product_type_groupe?.image
                                  : item2?.product_type?.image
                              ) ? (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/${
                                    item2.level === 2
                                      ? item2?.product_type_groupe?.image
                                      : item2?.product_type?.image
                                  }`}
                                  alt={""}
                                  sizes="500px"
                                  fill
                                  style={{
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full relative">
                                  <div className="w-[90%] h-[90%] relative">
                                    <Image
                                      src="/images/siteLogo.png"
                                      alt={""}
                                      sizes="500px"
                                      fill
                                      style={{
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>

                            <h1 className="text-[14px] p-[10px] max-sm:p-[5px] w-full h-full flex items-center justify-center text-center">
                              {item2.level === 2
                                ? item2.product_type_groupe?.ProdTypeGroupName
                                : item2.level === 3 &&
                                  item2.product_type?.ProdTypeName}
                            </h1>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}

              {(FilterComponents.find((item: any) => item.status === 1) ||
                !pathname.split("/")[2]) && (
                <div className="flex flex-col gap-y-[20px]">
                  <div className="flex justify-between gap-[20px] max-sm:flex-col">
                    <div className="flex flex-col gap-y-[10px] w-[40%] max-sm:w-full">
                      <h1 className="text-[28px]">
                        {!pathname.split("/")[2]
                          ? filterValues.key
                          : pathnameItems[pathnameItems.length - 1]
                              ?.pathCategName}
                      </h1>
                      {pathname.split("/")[2] && (
                        <p className="text-[14px]">
                          {
                            pathnameItems[pathnameItems.length - 1]
                              ?.pathCategDescr
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex max-lg:flex-col-reverse max-sm:flex-row max-lg:items-end items-center gap-[20px] w-[40%]  max-lg:w-[50%] max-sm:w-full">
                      <div className=" w-[calc(100%-146px)] max-lg:w-full">
                        <DropDown1value
                          placeholder="დალაგება ფასით"
                          notInputStyle={true}
                        />
                      </div>
                      {screenWidth >= 600 && (
                        <div className="flex items-center rounded-[12px] bg-white overflow-hidden ">
                          {displayVar.map((item: any, index: number) => (
                            <div
                              key={item.id}
                              onClick={() => {
                                setActiveVar(item.id);
                              }}
                              className={`h-[42px] w-[42px] text-[20px] flex items-center justify-center cursor-pointer duration-200 ${
                                activeVar === item.id
                                  ? "bg-myGreen text-white"
                                  : "text-myGreen"
                              }`}
                            >
                              {item.icon}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-y-[100px]">
                    {productsPagePreLoader && (
                      <div className="w-full grid gap-[20px] grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (item: any, index: number) => (
                            <div
                              key={item}
                              className={`w-full rounded-[12px] overflow-hidden ${
                                activeVar === 1 ? "h-[618px]" : "h-[227px] "
                              }`}
                            >
                              <div className="loaderwave"></div>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                    {productsPageData?.length > 0 ? (
                      <div
                        className={`w-full grid gap-[20px] duration-100  ${
                          activeVar === 1
                            ? "grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1"
                            : activeVar === 2
                              ? "grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1"
                              : activeVar === 3 && "grid-cols-1"
                        }`}
                      >
                        {productsPageData.map((item: any, index: number) => (
                          <div
                            key={item.ProdCode}
                            className={`${
                              productsPageLoader &&
                              "opacity-[0.5] pointer-events-none"
                            }`}
                          >
                            {(activeVar === 1 || activeVar === 2) && (
                              <ProductCard
                                item={item}
                                narrow={activeVar === 2}
                              />
                            )}
                            {activeVar === 3 && <HorizontalCard item={item} />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      !productsPagePreLoader && (
                        <p className="text-gray-500 text-center">
                          პროდუქტი არ მოიძებნა
                        </p>
                      )
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
                        breakClassName={
                          "w-8 h-8 flex items-center justify-center"
                        }
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
                        activeLinkClassName={
                          "!important text-[#CACACA] font-forh"
                        }
                        forcePage={currentPage}
                      />
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div> */}