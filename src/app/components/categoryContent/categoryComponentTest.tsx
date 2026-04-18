"use client";

import PathRouterCategoryComponent from "./PathRouterCategoryComponent";
import EverySlider from "../sliders/EverySlider";
import BlogsBackgroundDesigns from "../decorationColumns/BlogsBackgroundDesigns";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "@/api/blog.api";
import { fetchFirstLevelCategories } from "@/api/firstLevelCategory.api";
import WhatUSearch from "../Inputs/WhatUSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { fetchFilters } from "@/api/filters.api";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { fetchCategories } from "@/api/category.api";
import DropDown1value from "../DropDowns/DropDown1value";
import useScreenWidth from "../ScreenWidth";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { PiRowsFill } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import ProductCard from "../CardVariations/ProductCard";
import HorizontalCard from "../CardVariations/HorizontalCard";
import Image from "next/image";
import { fetchChildCategories } from "@/api/childCategories.api";
import GreenButton from "../buttons/greenButton";
import CheckBox from "../Inputs/CheckBox";
import { IoIosArrowUp } from "react-icons/io";
import ReactSlider from "react-slider";
import { RiFilter2Fill } from "react-icons/ri";
import { fetchOurProducts } from "@/api/ourProducts.api";

export default function CategoryComponentTest({
  passedCategories,
  passedCategoriesLoader,
}: {
  passedCategories?: any[];
  passedCategoriesLoader?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("currentPage") ?? 1;

  const key = searchParams.get("key");

  const sale = searchParams.get("sale") ?? 0;
  const aqcia = searchParams.get("aqcia") ?? 0;
  const minPrice = searchParams.get("minPrice") ?? 0;
  const maxPrice = searchParams.get("maxPrice") ?? 10000;

  const FeriCode = searchParams.get("FeriCode")?.split(",") ?? [];
  const FormaCode = searchParams.get("FormaCode")?.split(",") ?? [];
  const StyleCode = searchParams.get("StyleCode")?.split(",") ?? [];
  const SqesiCode = searchParams.get("SqesiCode")?.split(",") ?? [];
  const SizeCode = searchParams.get("SizeCode")?.split(",") ?? [];

  const IdAttribute1 = searchParams.get("IdAttribute1")?.split(",") ?? [];
  const IdAttribute2 = searchParams.get("IdAttribute2")?.split(",") ?? [];
  const IdAttribute3 = searchParams.get("IdAttribute3")?.split(",") ?? [];
  const IdAttribute4 = searchParams.get("IdAttribute4")?.split(",") ?? [];
  const IdAttribute5 = searchParams.get("IdAttribute5")?.split(",") ?? [];
  const IdAttribute6 = searchParams.get("IdAttribute6")?.split(",") ?? [];

  const screenWidth = useScreenWidth();

  const { pathnameItems, slugify } = useContext(ContextForSharingStates);

  const { data: filters } = useQuery({
    queryKey: ["filters", pathnameItems],
    queryFn: () => fetchFilters(pathnameItems),
    enabled: pathnameItems.length > 0,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

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

  // blogs data
  const { data: blogData = [], isLoading: blogLoader } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5,
  });

  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  // first level categories data
  const {
    data: firstLevelCategoriesData = [],
    isLoading: firstLevelCategoriesLoader,
  } = useQuery({
    queryKey: ["firstLevelCategories"],
    queryFn: fetchFirstLevelCategories,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const [FilterComponents, setFilterComponents] = useState<any>([]);

  // find status of filter components
  useEffect(() => {
    const attributesConfig = [
      {
        id: 1,
        name: "ფორმა",
        key: "forma",
        data: filters?.forma,
        code: "FeriCode",
        nameEng: "FeriName",
        status: 0,
      },
      {
        id: 2,
        name: "ზომა",
        key: "zoma",
        data: filters?.zoma,
        code: "FormaCode",
        nameEng: "FormaName",
        status: 0,
      },
      {
        id: 3,
        name: "სახეობა",
        key: "saxeoba1",
        data: filters?.saxeoba,
        code: "StyleCode",
        nameEng: "StyleName",
        status: 0,
      },
      {
        id: 4,
        name: "მასალა",
        key: "masala",
        data: filters?.masala,
        code: "SqesiCode",
        nameEng: "SqesiName",
        status: 0,
      },
      {
        id: 5,
        name: "მოცულობა",
        key: "moculoba",
        data: filters?.moculoba,
        code: "SizeCode",
        nameEng: "SizeName",
        status: 0,
      },
      {
        id: 6,
        name: "ტიპი",
        key: "tipi",
        data: filters?.type,
        code: "IdAttribute1",
        nameEng: "Attribute1",
        status: 0,
      },
      {
        id: 7,
        name: "ფერი",
        key: "feri",
        data: filters?.feri,
        code: "IdAttribute2",
        nameEng: "Attribute2",
        status: 0,
      },
      {
        id: 8,
        name: "ხანგრძლივობა",
        key: "xangrdzlivoba",
        data: filters?.xangrdzlivoba,
        code: "IdAttribute3",
        nameEng: "Attribute3",
        status: 0,
      },
      {
        id: 9,
        name: "თემა",
        key: "tema",
        data: filters?.tema,
        code: "IdAttribute4",
        nameEng: "Attribute4",
        status: 0,
      },
      {
        id: 10,
        name: "სქესი",
        key: "sqesi",
        data: filters?.sqesi,
        code: "IdAttribute5",
        nameEng: "Attribute5",
        status: 0,
      },
      {
        id: 11,
        name: "რაოდენობა შეფუთვაში",
        key: "raodenoba_shefutvashi",
        data: filters?.raodenobaShefutvashi,
        code: "IdAttribute6",
        nameEng: "Attribute6",
        status: 0,
      },
    ];

    const getStatus = (attrKey: string) => {
      const firstLevel = FrontCategoriesData.find(
        (item: any) =>
          item.IdProdSaxeoba == pathnameItems[0]?.pathCode?.split("_").pop(),
      );

      if (!firstLevel) return 0;

      if (pathnameItems.length === 1) {
        return firstLevel[attrKey] || 0;
      } else if (pathnameItems.length === 2) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) =>
            item.IdProdTypeGroup ==
            pathnameItems[1]?.pathCode?.split("_").pop(),
        );

        return secondLevel?.[attrKey] || 0;
      } else if (pathnameItems.length === 3) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) =>
            item.IdProdTypeGroup ==
            pathnameItems[1]?.pathCode?.split("_").pop(),
        );
        const thirdLevel = secondLevel?.productTypes.find(
          (item: any) =>
            item.IdProdType == pathnameItems[2]?.pathCode?.split("_").pop(),
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
  }, [filters, pathnameItems, FrontCategoriesData, key]);

  // fetch correct categories in categories boxes and sidebar
  const { data: childCategoriesData = [] } = useQuery({
    queryKey: ["childCategories", pathname, key],
    queryFn: () =>
      fetchChildCategories({
        pathname,
        key,
        passedCategories,
      }),
    enabled: !!key,
    placeholderData: passedCategories ?? [],
    staleTime: 1000 * 60 * 5,
  });

  const moreCategoriesData = useMemo(() => {
    if (key) return [];

    const id1 = pathnameItems?.[0]?.pathCode?.split("_")?.[1];
    const id2 = pathnameItems?.[1]?.pathCode?.split("_")?.[1];

    const firstLevel = FrontCategoriesData.find(
      (c: any) => c.IdProdSaxeoba == id1,
    );

    if (pathnameItems.length === 1) {
      return firstLevel?.add_category ?? [];
    }

    if (pathnameItems.length === 2) {
      const secondLevel = firstLevel?.productTypeGroup?.find(
        (c: any) => c.IdProdTypeGroup == id2,
      );

      return secondLevel?.add_category ?? [];
    }

    return [];
  }, [key, pathnameItems, FrontCategoriesData]);

  // side bar toggle
  const [filterStatus, setFilterStatus] = useState(true);

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

  const [dropedFilter, setDropedFilter] = useState<any>("");

  // get filter values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const params = new URLSearchParams(searchParams.toString());

    params.set(
      name,
      name === "minPrice" || name === "maxPrice"
        ? value.replace(/[^0-9.]/g, "")
        : value.toString(),
    );

    params.set("currentPage", "1");

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const {
    data: productData,
    isLoading: productsPageLoader,
    isFetching: productsPagePreLoader,
  } = useQuery({
    queryKey: [
      "products",
      {
        currentPage,

        key,

        sale,
        aqcia,
        minPrice,
        maxPrice,

        FeriCode,
        FormaCode,
        StyleCode,
        SqesiCode,
        SizeCode,

        IdAttribute1,
        IdAttribute2,
        IdAttribute3,
        IdAttribute4,
        IdAttribute5,
        IdAttribute6,

        pathnameItems,
      },
    ],
    queryFn: () =>
      fetchOurProducts({
        pageNumber: +currentPage,

        key: key ?? undefined,

        sale: +sale,
        aqcia: +aqcia,
        minPrice: +minPrice,
        maxPrice: +maxPrice,

        FeriCode,
        FormaCode,
        StyleCode,
        SqesiCode,
        SizeCode,

        IdAttribute1,
        IdAttribute2,
        IdAttribute3,
        IdAttribute4,
        IdAttribute5,
        IdAttribute6,

        pathnameItems,
      }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });

  const productsPageData = productData?.data ?? [];
  const prodwholenum = productData?.total ?? 0;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(prodwholenum / 12));
  }, [prodwholenum]);

  const handlePageClick = (event: any) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("currentPage", String(event.selected + 1));

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    window.scrollTo({ top: 300, behavior: "smooth" });
  };

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
                ) : FilterComponents.find((item: any) => item.status == 1) ? (
                  <div>
                    <div
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );

                        const current = params.get("sale");
                        params.set("sale", current === "1" ? "0" : "1");
                        params.set("currentPage", "1");

                        router.replace(`${pathname}?${params.toString()}`, {
                          scroll: false,
                        });
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        ფასდაკლება
                      </h1>
                      <CheckBox active={+sale ? true : false} />
                    </div>
                    <div
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );

                        const current = params.get("aqcia");
                        params.set("aqcia", current === "1" ? "0" : "1");
                        params.set("currentPage", "1");

                        router.replace(`${pathname}?${params.toString()}`, {
                          scroll: false,
                        });
                      }}
                      className="flex items-center justify-between cursor-pointer mb-[10px]"
                    >
                      <h1 className="text-[28px] max-lg:text-[24px] max-sm:text-[22px]">
                        აქცია
                      </h1>
                      <CheckBox active={+aqcia ? true : false} />
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
                                value={minPrice}
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
                                value={maxPrice}
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
                              value={[+minPrice, +maxPrice]}
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
                                const params = new URLSearchParams(
                                  searchParams.toString(),
                                );

                                params.set("minPrice", value[0].toString());
                                params.set("maxPrice", value[1].toString());
                                params.set("currentPage", "1");

                                router.replace(
                                  `${pathname}?${params.toString()}`,
                                  {
                                    scroll: false,
                                  },
                                );
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
                            (() => {
                              const selectedValues =
                                searchParams.get(filter.code)?.split(",") || [];

                              return filter.data.map(
                                (item: any, index: any) => (
                                  <div
                                    key={`${item[filter.code]}-${index}`}
                                    onClick={() => {
                                      const params = new URLSearchParams(
                                        searchParams.toString(),
                                      );

                                      const key = filter.code;
                                      const value = String(item[filter.code]);

                                      const currentValues = params.get(key)
                                        ? params.get(key)!.split(",")
                                        : [];

                                      let newValues: string[];

                                      if (currentValues.includes(value)) {
                                        newValues = currentValues.filter(
                                          (v) => v !== value,
                                        );
                                      } else {
                                        newValues = [...currentValues, value];
                                      }

                                      if (newValues.length > 0) {
                                        params.set(key, newValues.join(","));
                                      } else {
                                        params.delete(key);
                                      }

                                      params.set("currentPage", "1");

                                      router.replace(
                                        `${pathname}?${params.toString()}`,
                                        {
                                          scroll: false,
                                        },
                                      );
                                    }}
                                    className="flex items-center gap-[5px] cursor-pointer"
                                  >
                                    <div className="select-none">
                                      <CheckBox
                                        active={selectedValues.includes(
                                          String(item[filter.code]),
                                        )}
                                      />
                                    </div>
                                    <p className="text-[14px]">
                                      {item[filter.nameEng]}
                                    </p>
                                  </div>
                                ),
                              );
                            })()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {((pathname.split("/").length !== 5 && key) || !key) &&
                      childCategoriesData?.map((item: any, index: number) => (
                        <p
                          key={`group-${item.IdProdTypeGroup || ""}-type-${
                            item.IdProdType || ""
                          }`}
                          onClick={() => {
                            const segments = pathname.split("/");
                            const length = segments.length;

                            let nextPath = "";

                            if (length >= 3) {
                              if (length === 3) {
                                nextPath = `${pathname}/${slugify(item.ProdTypeGroupName)}_${item.IdProdTypeGroup}`;
                              } else if (length === 4) {
                                nextPath = `${pathname}/${slugify(item.ProdTypeName)}_${item.IdProdType}`;
                              }
                            } else {
                              nextPath = `/category/${slugify(item.saxeoba.ProdSaxeobaName)}_${item.IdProdSaxeoba}/${slugify(item.ProdTypeGroupName)}_${item.IdProdTypeGroup}`;
                            }

                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );

                            if (key) {
                              params.set("key", key);
                            } else {
                              params.delete("key");
                            }

                            router.replace(`${nextPath}?${params.toString()}`);
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
                      !key &&
                      moreCategoriesData?.map((item2: any) => (
                        <p
                          key={item2.id}
                          onClick={() => {
                            let path = "/category";

                            if (item2.level === 2) {
                              const saxeobaName =
                                item2?.product_type_groupe?.saxeoba
                                  ?.ProdSaxeobaName;
                              const saxeobaId =
                                item2?.product_type_groupe?.IdProdSaxeoba;

                              const groupName =
                                item2?.product_type_groupe?.ProdTypeGroupName;
                              const groupId = item2?.product_type_groupe_id;

                              path = `/category/${slugify(saxeobaName)}_${saxeobaId}/${slugify(
                                groupName,
                              )}_${groupId}`;
                            }

                            if (item2.level === 3) {
                              const saxeobaName =
                                item2?.product_type?.productTypeGroup?.saxeoba
                                  ?.ProdSaxeobaName;
                              const saxeobaId =
                                item2?.product_type?.productTypeGroup
                                  ?.IdProdSaxeoba;

                              const groupName =
                                item2?.product_type?.ProdTypeGroupName;
                              const groupId =
                                item2?.product_type?.IdProdTypeGroup;

                              const typeName =
                                item2?.product_type?.ProdTypeName;
                              const typeId = item2?.product_type_id;

                              path = `/category/${slugify(saxeobaName)}_${saxeobaId}/${slugify(
                                groupName,
                              )}_${groupId}/${slugify(typeName)}_${typeId}`;
                            }

                            router.replace(path);
                          }}
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
                    // loader={productsPageLoader}
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

              {((pathname.split("/").length !== 5 && key) || !key) && (
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
                            const segments = pathname.split("/");
                            const length = segments.length;

                            let nextPath = "";

                            if (length >= 3) {
                              if (length === 3) {
                                nextPath = `${pathname}/${slugify(item1.ProdTypeGroupName)}_${item1.IdProdTypeGroup}`;
                              } else if (length === 4) {
                                nextPath = `${pathname}/${slugify(item1.ProdTypeName)}_${item1.IdProdType}`;
                              }
                            } else {
                              nextPath = `/category/${slugify(
                                item1.saxeoba.ProdSaxeobaName,
                              )}_${item1.IdProdSaxeoba}/${slugify(
                                item1.ProdTypeGroupName,
                              )}_${item1.IdProdTypeGroup}`;
                            }

                            const query = key ? `?key=${key}` : "";

                            router.replace(`${nextPath}${query}`);
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
                        !key &&
                        moreCategoriesData?.map((item2: any) => (
                          <div
                            key={item2.id}
                            onClick={() => {
                              let path = "/category";

                              if (item2.level === 2) {
                                const saxeobaName =
                                  item2?.product_type_groupe?.saxeoba
                                    ?.ProdSaxeobaName;
                                const saxeobaId =
                                  item2?.product_type_groupe?.IdProdSaxeoba;

                                const groupName =
                                  item2?.product_type_groupe?.ProdTypeGroupName;
                                const groupId = item2?.product_type_groupe_id;

                                path = `/category/${slugify(saxeobaName)}_${saxeobaId}/${slugify(
                                  groupName,
                                )}_${groupId}`;
                              }

                              if (item2.level === 3) {
                                const saxeobaName =
                                  item2?.product_type?.productTypeGroup?.saxeoba
                                    ?.ProdSaxeobaName;
                                const saxeobaId =
                                  item2?.product_type?.productTypeGroup
                                    ?.IdProdSaxeoba;

                                const groupName =
                                  item2?.product_type?.ProdTypeGroupName;
                                const groupId =
                                  item2?.product_type?.IdProdTypeGroup;

                                const typeName =
                                  item2?.product_type?.ProdTypeName;
                                const typeId = item2?.product_type_id;

                                path = `/category/${slugify(saxeobaName)}_${saxeobaId}/${slugify(
                                  groupName,
                                )}_${groupId}/${slugify(typeName)}_${typeId}`;
                              }

                              router.replace(path);
                            }}
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
                          ? key
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
                        forcePage={+currentPage - 1}
                      />
                    </div>
                  </div>
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
