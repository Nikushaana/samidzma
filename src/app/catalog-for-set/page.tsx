"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import EverySlider from "../components/sliders/EverySlider";
import ProductCard from "../components/CardVariations/ProductCard";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import { usePathname, useRouter } from "next/navigation";
import FirstCatPart from "../components/catalogPage/firstCatPart";
import useBlog from "../../../dataFetchs/blogContext";
import Image from "next/image";
import BlogsBackgroundDesigns from "../components/decorationColumns/BlogsBackgroundDesigns";
import ReactPaginate from "react-paginate";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const pagemounted = useRef(false);

  const { blogData, blogLoader } = useBlog();

  // product filter values
  const [productsCatalogPageData, setProductsCatalogPageData] = useState<any>(
    []
  );
  const [productsCatalogPageLoader, setProductsCatalogPageLoader] =
    useState<boolean>(true);
  const [productsCatalogPagePreLoader, setProductsCatalogPagePreLoader] =
    useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<any>(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  // product filter values

  const [filterValues, setFilterValues] = useState<setFilterType>({
    IdProdSaxeoba: "",

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

    const currentPage = currentPageFromParams
      ? parseInt(currentPageFromParams, 10) - 1
      : 0;

    setCurrentPage(currentPage);

    setFilterValues((prev) => ({
      ...prev,
      IdProdSaxeoba: IdProdSaxeobaFromParams ? IdProdSaxeobaFromParams : "",
    }));
  }, []);

  // get from params

  // set to params
  useEffect(() => {
    const searchParams = new URLSearchParams();

    searchParams.set("currentPage", currentPage + 1);

    searchParams.set("IdProdSaxeoba", filterValues.IdProdSaxeoba.toString());

    if (pathname === "/catalog-for-set") {
      window.history.replaceState(
        null,
        "/catalog-for-set",
        `/catalog-for-set?${searchParams.toString()}`
      );
    }
  }, [
    filterValues,
    pathname,
    router,
    productsCatalogPagePreLoader,
    currentPage,
  ]);
  // set to params

  useEffect(() => {
    if (!productsCatalogPagePreLoader) {
      window.scrollTo({ top: 1050, behavior: "smooth" });
    }
  }, [currentPage]);

  // product filter

  useEffect(() => {
    setProductsCatalogPageLoader(true);

    axiosUser
      .get(
        `front/products?pageNumber=${currentPage + 1}&itemsOnPage=12&${
          filterValues.IdProdSaxeoba
            ? `IdProdSaxeoba=${filterValues.IdProdSaxeoba}`
            : ""
        }`
      )
      .then((res) => {
        setProductsCatalogPagePreLoader(false);
        setProductsCatalogPageData(res.data.products);
        setProdwholenum(res.data.total);
      })
      .catch((err) => {
        setProductsCatalogPagePreLoader(true);
      })
      .finally(() => {
        setProductsCatalogPageLoader(false);
      });
  }, [currentPage, filterValues.IdProdSaxeoba]);

  const pageCount = Math.ceil(prodwholenum / 12);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  // product filter
  return (
    <div className="pb-[100px] flex flex-col gap-y-[50px] relative">
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex flex-col items-center">
          <div className="max-w-[1920px] w-full">
            <FirstCatPart
              filterValues={filterValues}
              setFilterValues={setFilterValues}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px] max-lg:px-0 max-lg:order-last max-tiny:order-none">
            <div className="rounded-[12px] max-lg:rounded-none p-[30px] bg-myBlack  max-lg:px-[90px] max-tiny:px-[25px]">
              <EverySlider
                data={productsCatalogPageData}
                loader={productsCatalogPageLoader}
                title={
                  <h1 className="hidden max-lg:flex text-[28px] max-tiny:text-[22px] text-white">
                    რეკომენდებული ნაკრებები
                  </h1>
                }
                card="KitCard"
                slidesPerView={1}
                spaceBetween={17}
                showButtons={true}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px] max-lg:px-[90px] max-tiny:px-[25px]">
            <div className="w-full flex max-tiny:flex-col max-tiny:gap-y-[10px] items-center justify-between">
              <div className="flex flex-col gap-y-[10px] w-[40%] max-tiny:w-full">
                <h1 className="text-[22px] max-tiny:text-[20px]">
                  {filterValues?.ProdSaxeobaName}
                </h1>
                <p className="text-[14px]">
                  {filterValues?.ProdSaxeobaDescription}
                </p>
              </div>
              <div className="flex flex-col gap-y-[10px] w-[40%] max-tiny:w-full items-end">
                <ul className="grid grid-cols-2 max-lg:text-[12px] gap-[10px] w-full text-[14px] marker:text-myYellow list-inside list-disc">
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                  <li>დაფქული დარიჩინი</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px] max-lg:px-[90px] max-tiny:px-[25px] flex flex-col gap-y-[50px]">
          <div className="flex flex-col gap-y-[20px]">
            <h1 className="text-[28px] max-tiny:text-[22px]">
              The Holiday accessories set includes products:
            </h1>
            {productsCatalogPagePreLoader && (
              <div className="w-full grid grid-cols-4 max-lg:grid-cols-2 max-tiny:grid-cols-1 gap-[24px]">
                {Array.from({ length: 15 }, (_, i) => i + 1).map(
                  (item: any, index: number) => (
                    <div
                      key={item}
                      className="w-full h-[574px] rounded-[12px] overflow-hidden"
                    >
                      <div className="loaderwave"></div>
                    </div>
                  )
                )}
              </div>
            )}
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-tiny:grid-cols-1 gap-[24px]">
              {productsCatalogPageData.length > 0
                ? productsCatalogPageData.map((item: any, index: number) => (
                    <div key={item.ProdCode}>
                      <ProductCard
                        item={item}
                        className={`${
                          productsCatalogPageLoader &&
                          "opacity-[0.5] pointer-events-none"
                        }`}
                      />
                    </div>
                  ))
                : !productsCatalogPagePreLoader && (
                    <p className="col-span-4 max-lg:col-span-2 max-tiny:col-span-1">
                      პროდუქტები არ არსებობს
                    </p>
                  )}
            </div>
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
                forcePage={currentPage}
              />
            </div>
          </div>

          <EverySlider
            data={productsCatalogPageData}
            loader={productsCatalogPageLoader}
            title={
              <h1 className="text-[28px] max-tiny:text-[22px]">
                იყიდე ამ პროდუქტთან
              </h1>
            }
            card="SmallProdCard"
            slidesPerView={8}
            spaceBetween={18}
          />

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
