"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { PiRowsFill } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import Image from "next/image";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import ReactPaginate from "react-paginate";
import BlogsBackgroundDesigns from "../decorationColumns/BlogsBackgroundDesigns";
import EverySlider from "../sliders/EverySlider";
import useBlog from "../../../../dataFetchs/blogContext";
import DropDown1value from "../DropDowns/DropDown1value";
import useScreenWidth from "../ScreenWidth";
import { RiFilter2Fill } from "react-icons/ri";
import ProductCard from "../CardVariations/ProductCard";
import HorizontalCard from "../CardVariations/HorizontalCard";
import ReactSlider from "react-slider";
import { IoIosArrowUp } from "react-icons/io";
import CheckBox from "../Inputs/CheckBox";
import useFilter from "../../../../dataFetchs/filtersContext";
import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";
import WhatUSearch from "../Inputs/WhatUSearch";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export const CategoryContent = ({
  childCategsloader,
  childCategsData,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const screenWidth = useScreenWidth();
  const filterRef = useRef<HTMLDivElement>(null);
  const pagemounted = useRef(false);

  const { blogData, blogLoader } = useBlog();
  const {
    pathnameItems,
    setPathnameItems,

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
  const { FrontCategoriesData } = useFrontCategories();
  const { filterValues, setFilterValues, currentPage, setCurrentPage } =
    useContext(ContextForSharingStates);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.movementX * -1;
    }
  };

  const [filterStatus, setFilterStatus] = useState(true);

  useEffect(() => {
    setFilterStatus(screenWidth >= 1025 ? true : false);
  }, [screenWidth]);

  useEffect(() => {
    if (pathname) {
      const extractedNumbers = pathname
        .split("/")
        .filter((segment) => segment && !isNaN(Number(segment)))
        .map(Number);

      if (!extractedNumbers.length) return;

      // Extract data for each category
      const firstCategory = FrontCategoriesData.find(
        (item: any) => item.IdProdSaxeoba === extractedNumbers[0]
      );

      const secondCategory = firstCategory?.productTypeGroup?.find(
        (item: any) => item.IdProdTypeGroup === extractedNumbers[1]
      );

      const thirdCategory = secondCategory?.productTypes?.find(
        (item: any) => item.IdProdType === extractedNumbers[2]
      );

      // Create updated pathnameItems
      const updatedItems = extractedNumbers.map((number, index) => {
        let categoryData: any = {};
        if (index === 0) categoryData = firstCategory || {};
        else if (index === 1) categoryData = secondCategory || {};
        else if (index === 2) categoryData = thirdCategory || {};

        return {
          id: index + 1,
          pathCode: number,
          pathCategName:
            index === 0
              ? categoryData.ProdSaxeobaName
              : index === 1
              ? categoryData.ProdTypeGroupName
              : categoryData.ProdTypeName,
          pathCategDescr: categoryData.description || "",
        };
      });

      setPathnameItems(updatedItems);
    }
  }, [pathname, FrontCategoriesData]);

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

  // variation style
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
  // variation style

  // first category data
  const [firstCategsData, setFirstCategsData] = useState<any>([]);
  const [firstCategsLoader, setFirstCategsLoader] = useState(true);

  useEffect(() => {
    setFirstCategsLoader(true);
    axiosUser
      .get(`front/firstLevelCategories`)
      .then((res) => {
        setFirstCategsData(res.data.data);
        setFirstCategsLoader(false);
      })
      .finally(() => {});
  }, []);
  // first category data

  // product filter
  const [productsPageData, setProductsPageData] = useState<any>([]);
  const [productsPagePreLoader, setProductsPagePreLoader] =
    useState<boolean>(true);
  const [productsPageLoader, setProductsPageLoader] = useState<boolean>(true);

  const [dropedFilter, setDropedFilter] = useState<any>("");

  const [prodwholenum, setProdwholenum] = useState<any>();
  const [pageCount, setPageCount] = useState(0);

  const [FilterComponents, setFilterComponents] = useState<any>([]);

  // find status

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
        nameEng: "Attribute1Name",
        status: 0,
      },
      {
        id: 7,
        name: "ფერი",
        key: "feri",
        data: feri,
        code: "IdAttribute2",
        nameEng: "Attribute2Name",
        status: 0,
      },
      {
        id: 8,
        name: "ხანგრძლივობა",
        key: "xangrdzlivoba",
        data: xangrdzlivoba,
        code: "IdAttribute3",
        nameEng: "Attribute3Name",
        status: 0,
      },
      {
        id: 9,
        name: "თემა",
        key: "tema",
        data: tema,
        code: "IdAttribute4",
        nameEng: "Attribute4Name",
        status: 0,
      },
      {
        id: 10,
        name: "სქესი",
        key: "sqesi",
        data: sqesi,
        code: "IdAttribute5",
        nameEng: "Attribute5Name",
        status: 0,
      },
      {
        id: 11,
        name: "რაოდენობა შეფუთვაში",
        key: "raodenoba_shefutvashi",
        data: raodenobaShefutvashi,
        code: "IdAttribute6",
        nameEng: "Attribute6Name",
        status: 0,
      },
    ];

    const getStatus = (attrKey: string) => {
      const firstLevel = FrontCategoriesData.find(
        (item: any) => item.IdProdSaxeoba === pathnameItems[0]?.pathCode
      );

      if (!firstLevel) return 0;

      if (pathnameItems.length === 1) {
        return firstLevel[attrKey] || 0;
      } else if (pathnameItems.length === 2) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) => item.IdProdTypeGroup === pathnameItems[1]?.pathCode
        );
        return secondLevel?.[attrKey] || 0;
      } else if (pathnameItems.length === 3) {
        const secondLevel = firstLevel.productTypeGroup.find(
          (item: any) => item.IdProdTypeGroup === pathnameItems[1]?.pathCode
        );
        const thirdLevel = secondLevel?.productTypes.find(
          (item: any) => item.IdProdType === pathnameItems[2]?.pathCode
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
  ]);

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
        : parseInt("200000"),
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

    if (pathname.split("/")[1] === "category") {
      window.history.replaceState(
        null,
        "/category",
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
        `front/products?pageNumber=${currentPage + 1}&itemsOnPage=12&${
          filterValues.key ? `key=${filterValues.key}` : ""
        }&${
          filterValues.FeriCode.length > 0
            ? `FeriCode=${filterValues.FeriCode}`
            : ""
        }&${
          filterValues.FormaCode.length > 0
            ? `FormaCode=${filterValues.FormaCode}`
            : ""
        }&${
          filterValues.StyleCode.length > 0
            ? `StyleCode=${filterValues.StyleCode}`
            : ""
        }&${
          filterValues.SqesiCode.length > 0
            ? `SqesiCode=${filterValues.SqesiCode}`
            : ""
        }&${
          filterValues.SizeCode.length > 0
            ? `SizeCode=${filterValues.SizeCode}`
            : ""
        }&${
          filterValues.IdAttribute1.length > 0
            ? `IdAttribute1=${filterValues.IdAttribute1}`
            : ""
        }&${
          filterValues.IdAttribute2.length > 0
            ? `IdAttribute2=${filterValues.IdAttribute2}`
            : ""
        }&${
          filterValues.IdAttribute3.length > 0
            ? `IdAttribute3=${filterValues.IdAttribute3}`
            : ""
        }&${
          filterValues.IdAttribute4.length > 0
            ? `IdAttribute4=${filterValues.IdAttribute4}`
            : ""
        }&${
          filterValues.IdAttribute5.length > 0
            ? `IdAttribute5=${filterValues.IdAttribute5}`
            : ""
        }&${
          filterValues.IdAttribute6.length > 0
            ? `IdAttribute6=${filterValues.IdAttribute6}`
            : ""
        }&${
          pathnameItems[0]?.pathCode
            ? `IdProdSaxeoba=${pathnameItems[0]?.pathCode}`
            : ""
        }&${
          pathnameItems[1]?.pathCode
            ? `IdProdTypeGroup=${pathnameItems[1]?.pathCode}`
            : ""
        }&${
          pathnameItems[2]?.pathCode
            ? `IdProdType=${pathnameItems[2]?.pathCode}`
            : ""
        }&${filterValues.minPrice ? `minPrice=${filterValues.minPrice}` : ""}&${
          filterValues.maxPrice ? `maxPrice=${filterValues.maxPrice}` : ""
        }`,
        { signal }
      )
      .then((res) => {
        setProductsPagePreLoader(false);
        setProductsPageData(res.data.products);
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
    pathnameItems,
  ]);

  // key categs
  const [allChildCategsData, setAllChildCategsData] = useState<any>([]);

  useEffect(() => {
    if (filterValues.key) {
      axiosUser
        .get(
          `filter/getProdTypeGroupsKey?${
            filterValues.key ? `key=${filterValues.key}` : ""
          }`
        )
        .then((res) => {
          setAllChildCategsData(res.data);
        })
        .catch((err) => {})
        .finally(() => {});
    } else {
      setAllChildCategsData(childCategsData);
    }
  }, [filterValues.key, childCategsData]);

  // product filter

  const HandleRouteFromKeyCateg = (id: any) => {
    axiosUser
      .get(`front/secondLevelCategories/${id}`)
      .then((res) => {
        window.history.replaceState(
          null,
          "/category",
          `${pathname}/${res.data.IdProdSaxeoba}/${id}?${
            filterValues.key ? `key=${filterValues.key}` : ""
          }`
        );
      })
      .catch((err) => {})
      .finally(() => {});
  };

  return (
    <div className="flex flex-col gap-y-[20px] items-center min-h-[calc(100vh-748px)] relative">
      <div className="bg-white w-full flex flex-col items-center">
        <div className="max-w-[1920px] py-[20px] w-full ">
          <div
            ref={scrollRef}
            onMouseMove={handleDrag}
            className="flex items-center gap-[15px] overflow-x-scroll notShowScrollHor w-full h-[50px] px-[264px] max-2xl:px-[90px] max-sm:px-[25px]"
          >
            {firstCategsLoader
              ? Array.from({ length: 6 }, (_, i) => (
                  <div
                    key={i}
                    className="h-full w-[250px] rounded-[8px] overflow-hidden shrink-0"
                  >
                    <div className="loaderwave"></div>
                  </div>
                ))
              : firstCategsData.map((item: any) => (
                  <div
                    key={item?.IdProdSaxeoba}
                    onClick={() => {
                      setFilterValues((prev: any) => ({
                        ...prev,
                        key: "",
                      }));

                      setTimeout(() => {
                        router.push(`/category/${item?.IdProdSaxeoba}?key=`);
                      }, 0);
                    }}
                    className={`flex h-full cursor-pointer items-center text-[14px] shrink-0 bg-[#f7f7f7] rounded-[8px] shadow relative overflow-hidden`}
                  >
                    {item?.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
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
                    <p className="z-[1] text-white bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-center px-[30px]">
                      {item.ProdSaxeobaName}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] px-[264px] max-2xl:px-[90px] max-sm:px-[25px] w-full pb-[100px] flex flex-col gap-y-[48px]">
        <div className="flex flex-col gap-y-[20px]">
          {pathname.split("/")[2] && (
            <div className="flex flex-wrap items-center gap-[5px]">
              <p
                onClick={() => {
                  router.push("/");
                }}
                className="text-[14px] cursor-pointer"
              >
                მთავარი
              </p>
              <IoChevronForward className="text-[13px]" />
              {pathnameItems.map((item: any, index: number) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setFilterValues((prev: any) => ({
                      ...prev,
                      key: "",
                    }));

                    setTimeout(() => {
                      router.push(
                        `/category/${pathnameItems
                          .slice(0, index + 1)
                          .map((i: any) => i.pathCode)
                          .join("/")}?key=`
                      );
                    }, 0);
                  }}
                >
                  {index + 1 === pathnameItems.length && item.pathCategName ? (
                    <p
                      key={index}
                      className="text-[14px] cursor-pointer font-semibold"
                    >
                      {item.pathCategName}
                    </p>
                  ) : (
                    <div key={index} className="flex items-center gap-[5px]">
                      <p className="text-[14px] cursor-pointer">
                        {item.pathCategName}
                      </p>{" "}
                      <IoChevronForward className="text-[13px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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
                {FilterComponents.find((item: any) => item.status === 1) ? (
                  <div>
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
                        className={`flex flex-col gap-y-[10px] duration-200 ${
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
                              max={200000}
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
                                key={item[filter.code]}
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
                                <CheckBox
                                  active={filterValues[filter.code]?.find(
                                    (filteredItem: any) =>
                                      filteredItem == item[filter.code]
                                  )}
                                />
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
                  allChildCategsData?.map((item: any) => (
                    <p
                      key={
                        pathnameItems.length <= 1
                          ? item.IdProdTypeGroup
                          : pathnameItems.length === 2 && item.IdProdType
                      }
                      onClick={() => {
                        if (pathnameItems.length >= 1) {
                          router.push(
                            `${pathname}/${
                              pathnameItems.length === 1
                                ? item.IdProdTypeGroup
                                : pathnameItems.length === 2 && item.IdProdType
                            }`
                          );
                        } else {
                          HandleRouteFromKeyCateg(item.IdProdTypeGroup);
                        }
                      }}
                      className="text-[15px] cursor-pointer"
                    >
                      {pathnameItems.length <= 1
                        ? item.ProdTypeGroupName
                        : pathnameItems.length === 2 && item.ProdTypeName}
                    </p>
                  ))
                )}
              </div>
            </div>

            <div
              className={`flex flex-col gap-y-[48px] w-[calc(100%-350px)] max-2xl:w-[calc(100%-320px)] max-lg:w-full`}
            >
              <div
                className={`w-full grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-4 max-sm:grid-cols-3 gap-[30px] gap-y-[20px] max-sm:gap-[15px] ${
                  !childCategsloader && childCategsData.length === 0
                    ? "hidden"
                    : ""
                }`}
              >
                {childCategsloader
                  ? Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className="w-full aspect-square rounded-[4px] overflow-hidden"
                      >
                        <div className="loaderwave"></div>
                      </div>
                    ))
                  : childCategsData?.map((item1: any) => (
                      <div
                        key={
                          pathnameItems.length === 1
                            ? item1.IdProdTypeGroup
                            : pathnameItems.length === 2 && item1.IdProdType
                        }
                        onClick={() =>
                          router.push(
                            `${pathname}/${
                              pathnameItems.length === 1
                                ? item1.IdProdTypeGroup
                                : pathnameItems.length === 2 && item1.IdProdType
                            }`
                          )
                        }
                        className={`relative flex flex-col w-full aspect-square cursor-pointer items-center gap-y-[10px] bg-white p-[10px] rounded-[4px] overflow-hidden border-white `}
                      >
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
                        <div className="absolute p-[10px] max-sm:p-[5px] top-0 left-0 bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-end">
                          <p className="text-white text-[11px]">
                            {pathnameItems.length === 1
                              ? item1.ProdTypeGroupName
                              : pathnameItems.length === 2 &&
                                item1.ProdTypeName}
                          </p>
                        </div>
                      </div>
                    ))}
              </div>

              {!pathname.split("/")[2] && <WhatUSearch />}

              {(FilterComponents.find((item: any) => item.status === 1) ||
                !pathname.split("/")[2]) && (
                <div className="flex flex-col gap-y-[20px]">
                  <div className="flex justify-between gap-[20px] max-sm:flex-col">
                    <div className="flex flex-col gap-y-[10px] w-[40%]">
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
                    <div className="flex flex-col max-sm:flex-col-reverse gap-y-[20px] w-[40%]  max-lg:w-[50%] max-sm:w-full items-end">
                      <div className="flex max-lg:flex-col-reverse max-sm:flex-row max-lg:items-end items-center gap-[20px] w-full">
                        <div className=" w-[calc(100%-146px)] max-lg:w-full max-sm:w-[calc(100%-146px)]">
                          <DropDown1value
                            placeholder="დალაგება ფასით"
                            notInputStyle={true}
                          />
                        </div>

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
                      </div>
                      {pathname.split("/")[2] && (
                        <ul className="grid grid-cols-2 max-lg:grid-cols-1 max-sm:grid-cols-2 w-full gap-[10px] text-[14px] max-sm:text-[13px] list-inside list-disc">
                          <li>დაფქული დარიჩნი</li>
                          <li>დაფქული დარიჩნი</li>
                          <li>დაფქული დარიჩნი</li>
                          <li>დაფქული დარიჩნი</li>
                          <li>დაფქული დარიჩნი</li>
                          <li>დაფქული დარიჩნი</li>
                        </ul>
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
                      !productsPagePreLoader && <p>პროდუქტები არ არსებობს</p>
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
          </div>
        </div>

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
};
