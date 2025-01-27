"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import DropDown1value from "../components/DropDowns/DropDown1value";
import { PiRowsFill } from "react-icons/pi";
import { BsCheck, BsGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BiArrowToTop } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import ReactSlider from "react-slider";
import FirstCatPart from "../components/catalogPage/firstCatPart";
import CustLoader from "../components/loaders/CustLoader";
import CheckBox from "../components/Inputs/CheckBox";
import Input1 from "../components/Inputs/Input1";
import ProductCard from "../components/CardVariations/ProductCard";
import HorizontalCard from "../components/CardVariations/HorizontalCard";
import EverySlider from "../components/sliders/EverySlider";
import BlogCard from "../components/CardVariations/BlogCard";
import { RiFilter2Fill } from "react-icons/ri";
import useScreenWidth from "../components/ScreenWidth";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";
import useBlog from "../../../dataFetchs/blogContext";
import BlogsBackgroundDesigns from "../components/decorationColumns/BlogsBackgroundDesigns";
import ReactPaginate from "react-paginate";

export default function Page() {
  const targetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pagemounted = useRef(false);
  const { blogData, blogLoader } = useBlog();
  const { sizes, gender, style, color, fetchAllData } = useContext(
    ContextForSharingStates
  );

  useEffect(() => {
    fetchAllData();
  }, []);

  const screenWidth = useScreenWidth();

  const [filterStatus, setFilterStatus] = useState(true);

  useEffect(() => {
    setFilterStatus(screenWidth >= 1025 ? true : false);
  }, [screenWidth]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
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

  const [activeVar, setactiveVar] = useState(1);

  // product filter values
  const [productsPageData, setProductsPageData] = useState<any>([]);
  const [productsPagePreLoader, setProductsPagePreLoader] =
    useState<boolean>(true);
  const [productsPageLoader, setProductsPageLoader] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<any>(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const [filterValues, setFilterValues] = useState<prodFilterType>({
    IdProdSaxeoba: "",
    IdProdTypeGroup: "",
    IdProdType: "",
    FeriCode: "",
    StyleCode: "",
    SqesiCode: "",
    SizeCode: "",
    salaryValue: [0, 199999],

    ProdSaxeobaName: "",
    ProdSaxeobaDescription: "",
  });

  // get from params

  useEffect(() => {
    if (pagemounted.current) return;
    pagemounted.current = true;

    const searchParams = new URLSearchParams(window.location.search);
    const currentPageFromParams = searchParams.get("currentPage");

    const IdProdSaxeobaFromParams = searchParams.get("IdProdSaxeoba");
    const IdProdTypeGroupFromParams = searchParams.get("IdProdTypeGroup");
    const IdProdTypeFromParams = searchParams.get("IdProdType");

    const StyleCodeFromParams = searchParams.get("StyleCode");
    const SqesiCodeFromParams = searchParams.get("SqesiCode");
    const FeriCodeFromParams = searchParams.get("FeriCode");
    const SizeCodeFromParams = searchParams.get("SizeCode");

    const currentPage = currentPageFromParams ? parseInt(currentPageFromParams, 10) - 1 : 0;

    setCurrentPage(currentPage);

    setFilterValues((prev) => ({
      ...prev,
      IdProdSaxeoba: IdProdSaxeobaFromParams ? IdProdSaxeobaFromParams : "",
      IdProdTypeGroup: IdProdTypeGroupFromParams
        ? IdProdTypeGroupFromParams
        : "",
      IdProdType: IdProdTypeFromParams ? IdProdTypeFromParams : "",

      StyleCode: StyleCodeFromParams ? StyleCodeFromParams : "",
      SqesiCode: SqesiCodeFromParams ? SqesiCodeFromParams : "",
      FeriCode: FeriCodeFromParams ? FeriCodeFromParams : "",
      SizeCode: SizeCodeFromParams ? SizeCodeFromParams : "",
    }));
  }, []);

  // get from params

  // set to params
  useEffect(() => {
    const searchParams = new URLSearchParams();

    searchParams.set("currentPage", currentPage + 1);

    searchParams.set("IdProdSaxeoba", filterValues.IdProdSaxeoba?.toString());
    searchParams.set(
      "IdProdTypeGroup",
      filterValues.IdProdTypeGroup.toString()
    );
    searchParams.set("IdProdType", filterValues.IdProdType.toString());
    searchParams.set("StyleCode", filterValues.StyleCode.toString());
    searchParams.set("SqesiCode", filterValues.SqesiCode.toString());
    searchParams.set("FeriCode", filterValues.FeriCode.toString());
    searchParams.set("SizeCode", filterValues.SizeCode.toString());

    if (pathname === "/products") {
      window.history.replaceState(
        null,
        "/products",
        `/products?${searchParams.toString()}`
      );
    }
  }, [filterValues, pathname, router, productsPagePreLoader, currentPage]);
  // set to params

  const [dropedFilter, setDropedFilter] = useState<any>("");

  // product filter values

  useEffect(() => {
    if (!productsPagePreLoader) {
      window.scrollTo({ top: 600, behavior: "smooth" });
    }
  }, [currentPage]);

  // product filter

  useEffect(() => {
    setProductsPageLoader(true);

    axiosUser
      .get(
        `front/product?pageNumber=${currentPage + 1}&itemsOnPage=12&${
          filterValues.StyleCode ? `StyleCode=${filterValues.StyleCode}` : ""
        }&${
          filterValues.SqesiCode ? `SqesiCode=${filterValues.SqesiCode}` : ""
        }&${filterValues.FeriCode ? `FeriCode=${filterValues.FeriCode}` : ""}&${
          filterValues.SizeCode ? `SizeCode=${filterValues.SizeCode}` : ""
        }&${
          filterValues.IdProdSaxeoba
            ? `IdProdSaxeoba=${filterValues.IdProdSaxeoba}`
            : ""
        }&${
          filterValues.IdProdTypeGroup
            ? `IdProdTypeGroup=${filterValues.IdProdTypeGroup}`
            : ""
        }&${
          filterValues.IdProdType ? `IdProdType=${filterValues.IdProdType}` : ""
        }`
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
  }, [
    filterValues.IdProdSaxeoba,
    filterValues.IdProdTypeGroup,
    filterValues.IdProdType,
    filterValues.StyleCode,
    filterValues.SqesiCode,
    filterValues.FeriCode,
    filterValues.SizeCode,
    currentPage,
  ]);

  const pageCount = Math.ceil(prodwholenum / 12);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  // product filter

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full pb-[100px] flex flex-col gap-y-[48px] relative">
        <FirstCatPart
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          isProducts={true}
          setCurrentPage={setCurrentPage}
        />

        <div className="px-[264px] max-2xl:px-[90px] max-tiny:px-[25px] flex flex-col gap-y-[48px] relative">
          <div className="flex items-start justify-between max-tiny:flex-col gap-[20px]">
            <div className="flex flex-col gap-y-[10px] w-[40%] max-lg:w-[50%] max-tiny:w-full">
              <h1 className="text-[28px] max-lg:text-[24px]">
                {filterValues?.ProdSaxeobaName}
              </h1>
              <p className="text-[14px]">
                {filterValues?.ProdSaxeobaDescription}
              </p>
            </div>
            <div className="flex flex-col max-tiny:flex-col-reverse gap-y-[20px] w-[40%]  max-lg:w-[50%] max-tiny:w-full items-end">
              <div className="flex max-lg:flex-col-reverse max-tiny:flex-row max-lg:items-end items-center gap-[20px] w-full">
                <div className=" w-[calc(100%-146px)] max-lg:w-full max-tiny:w-[calc(100%-146px)]">
                  <DropDown1value placeholder="დალაგება ფასით" />
                </div>

                <div className="flex items-center rounded-[12px] bg-white overflow-hidden ">
                  {displayVar.map((item: any, index: number) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setactiveVar(item.id);
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
              <ul className="grid grid-cols-2 max-lg:grid-cols-1 max-tiny:grid-cols-2 w-full gap-[10px] text-[14px] max-tiny:text-[13px] list-inside list-disc">
                <li>დაფქული დარიჩნი</li>
                <li>დაფქული დარიჩნი</li>
                <li>დაფქული დარიჩნი</li>
                <li>დაფქული დარიჩნი</li>
                <li>დაფქული დარიჩნი</li>
                <li>დაფქული დარიჩნი</li>
              </ul>
            </div>
          </div>

          <div className="flex max-lg:flex-col mt-[-30px] gap-[20px]">
            <div ref={targetRef} className="max-lg:relative max-lg:w-full">
              <div
                onClick={() => {
                  setFilterStatus((pre: any) => !pre);
                }}
                className="w-[53px] aspect-square hidden max-lg:flex items-center text-[25px] justify-center bg-myGreen text-white rounded-[12px] cursor-pointer"
              >
                <RiFilter2Fill />
              </div>
              <div
                className={`w-[330px] max-2xl:w-[300px] max-tiny:w-full max-lg:absolute max-lg:top-[45px] ${
                  filterStatus ? "ml-0" : "ml-[-450px]"
                } duration-200 max-lg:z-[2] max-lg:shadow rounded-[12px] self-start bg-white p-[20px] flex flex-col gap-y-[10px] sticky top-[20px]`}
              >
                <div
                  className={`flex flex-col gap-y-[10px]  duration-100  ${
                    dropedFilter === "style" ? "pb-[20px]" : " pb-0"
                  }`}
                >
                  <div
                    onClick={() => {
                      setDropedFilter((prev: any) =>
                        prev === "style" ? "" : "style"
                      );
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h1 className="text-[28px] max-lg:text-[24px] max-tiny:text-[22px]">
                      სტილი
                    </h1>
                    <IoIosArrowUp
                      className={`duration-200 ${
                        dropedFilter === "style" ? "rotate-[180deg]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-y-[10px] duration-200 ${
                      dropedFilter === "style"
                        ? "h-auto opacity-1"
                        : "h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {style.map((item: any, index: any) => (
                      <div
                        key={item.StyleCode}
                        onClick={() => {
                          setFilterValues((prev: any) => ({
                            ...prev,
                            StyleCode:
                              prev.StyleCode === item.StyleCode
                                ? ""
                                : item.StyleCode,
                          }));
                          setCurrentPage(0);
                        }}
                        className="flex items-center gap-[5px] cursor-pointer"
                      >
                        <CheckBox
                          active={filterValues.StyleCode === item.StyleCode}
                        />
                        <p className="text-[14px]">{item.StyleName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-col gap-y-[10px]  duration-100  ${
                    dropedFilter === "gender" ? "pb-[20px]" : " pb-0"
                  }`}
                >
                  <div
                    onClick={() => {
                      setDropedFilter((prev: any) =>
                        prev === "gender" ? "" : "gender"
                      );
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h1 className="text-[28px] max-lg:text-[24px] max-tiny:text-[22px]">
                      სქესი
                    </h1>
                    <IoIosArrowUp
                      className={`duration-200 ${
                        dropedFilter === "gender" ? "rotate-[180deg]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-y-[10px] duration-200 ${
                      dropedFilter === "gender"
                        ? "h-auto opacity-1"
                        : "h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {gender.map((item: any, index: any) => (
                      <div
                        key={item.SqesiCode}
                        onClick={() => {
                          setFilterValues((prev: any) => ({
                            ...prev,
                            SqesiCode:
                              prev.SqesiCode === item.SqesiCode
                                ? ""
                                : item.SqesiCode,
                          }));
                          setCurrentPage(0);
                        }}
                        className="flex items-center gap-[5px] cursor-pointer"
                      >
                        <CheckBox
                          active={filterValues.SqesiCode === item.SqesiCode}
                        />
                        <p className="text-[14px]">{item.SqesiName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-col gap-y-[10px]  duration-100  ${
                    dropedFilter === "color" ? "pb-[20px]" : " pb-0"
                  }`}
                >
                  <div
                    onClick={() => {
                      setDropedFilter((prev: any) =>
                        prev === "color" ? "" : "color"
                      );
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h1 className="text-[28px] max-lg:text-[24px] max-tiny:text-[22px]">
                      ფერი
                    </h1>
                    <IoIosArrowUp
                      className={`duration-200 ${
                        dropedFilter === "color" ? "rotate-[180deg]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-y-[10px] duration-200 ${
                      dropedFilter === "color"
                        ? "h-[300px] overflow-y-scroll showScrollVert opacity-1"
                        : "h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {color.map((item: any, index: any) => (
                      <div
                        key={item.FeriCode}
                        onClick={() => {
                          setFilterValues((prev: any) => ({
                            ...prev,
                            FeriCode:
                              prev.FeriCode === item.FeriCode
                                ? ""
                                : item.FeriCode,
                          }));
                          setCurrentPage(0);
                        }}
                        className="flex items-center gap-[5px] cursor-pointer"
                      >
                        <CheckBox
                          active={filterValues.FeriCode === item.FeriCode}
                        />
                        <p className="text-[14px]">{item.FeriName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`flex flex-col gap-y-[10px]  duration-100  ${
                    dropedFilter === "sizes" ? "pb-[20px]" : " pb-0"
                  }`}
                >
                  <div
                    onClick={() => {
                      setDropedFilter((prev: any) =>
                        prev === "sizes" ? "" : "sizes"
                      );
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <h1 className="text-[28px] max-lg:text-[24px] max-tiny:text-[22px]">
                      ზომები
                    </h1>
                    <IoIosArrowUp
                      className={`duration-200 ${
                        dropedFilter === "sizes" ? "rotate-[180deg]" : ""
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-y-[10px] duration-200 ${
                      dropedFilter === "sizes"
                        ? "h-[300px] overflow-y-scroll showScrollVert opacity-1"
                        : "h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    {sizes.map((item: any, index: any) => (
                      <div
                        key={item.SizeCode}
                        onClick={() => {
                          setFilterValues((prev: any) => ({
                            ...prev,
                            SizeCode:
                              prev.SizeCode === item.SizeCode
                                ? ""
                                : item.SizeCode,
                          }));
                          setCurrentPage(0);
                        }}
                        className="flex items-center gap-[5px] cursor-pointer"
                      >
                        <CheckBox
                          active={filterValues.SizeCode === item.SizeCode}
                        />
                        <p className="text-[14px]">{item.SizeName}</p>
                      </div>
                    ))}
                  </div>
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
                    <h1 className="text-[28px] max-lg:text-[24px] max-tiny:text-[22px]">
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
                        <div className="w-[50%] ">
                          <Input1
                            placeholder="დან"
                            firstValue={filterValues.salaryValue[0]}
                            type="text"
                          />
                        </div>
                        <p>-</p>
                        <div className="w-[50%] ">
                          <Input1
                            placeholder="მდე"
                            firstValue={filterValues.salaryValue[1]}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <ReactSlider
                          className="horizontal-slider w-full h-[22px] flex items-center  "
                          thumbClassName="w-[22px] h-[22px] bg-myGreen rounded-full outline-none text-[0px] text-myGreen flex items-center justify-center cursor-pointer"
                          trackClassName="example-track bg-myGreen"
                          value={filterValues.salaryValue}
                          max={199999}
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
                          onChange={(value: any, index: any) => {
                            setFilterValues((prev: any) => ({
                              ...prev,
                              salaryValue: value,
                            }));
                            setCurrentPage(0);
                          }}
                          pearling
                          minDistance={6}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[calc(100%-350px)] max-2xl:w-[calc(100%-320px)] max-lg:w-full flex flex-col justify-between gap-y-[100px]">
              {productsPagePreLoader && (
                <div className="w-full grid gap-[20px] grid-cols-3 max-xl:grid-cols-2 max-tiny:grid-cols-1">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(
                    (item: any, index: number) => (
                      <div
                        key={item}
                        className={`w-full rounded-[12px] ${
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
                      ? "grid-cols-3 max-xl:grid-cols-2 max-tiny:grid-cols-1"
                      : activeVar === 2
                      ? "grid-cols-4 max-xl:grid-cols-2 max-tiny:grid-cols-1"
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
                        <ProductCard item={item} narrow={activeVar === 2} />
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
                  breakClassName={"w-8 h-8 flex items-center justify-center"}
                  //main container
                  containerClassName={`flex items-center gap-1`}
                  //single page number
                  pageLinkClassName={`w-[40px] h-[40px] text-md bg-gray-100 font-forh
               flex items-center justify-center rounded-full`}
                  //previous page number
                  previousLinkClassName={`hidden`}
                  //next page number
                  nextLinkClassName={`hidden`}
                  //active page
                  activeLinkClassName={"!important text-[#CACACA] font-forh"}
                  forcePage={currentPage}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[12px] bg-[#EAEDEE] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0 relative">
            <BlogsBackgroundDesigns />
            <EverySlider
              data={blogData}
              loader={blogLoader}
              title={
                <h1 className="text-[28px] max-tiny:text-[22px]">ბლოგი</h1>
              }
              card="BlogCard"
              slidesPerView={4}
              spaceBetween={20}
              showButtons={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
