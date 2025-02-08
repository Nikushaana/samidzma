"use client";

import React, { useContext, useEffect } from "react";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import ProductCard from "@/app/components/CardVariations/ProductCard";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import ReactPaginate from "react-paginate";

export default function Page() {
  const {
    WishListData,
    WishListLoader,
    currentPage,
    setCurrentPage,
    pageCount,
    prodwholenum,
  } = useContext(WishListAxiosContext);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="relative">
      {WishListLoader && (
        <div className="flex justify-center my-[60px] absolute z-[1] top-0 left-[50%] translate-x-[-50%]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}
      {WishListData?.data?.length > 0 && (
        <div className="grid grid-cols-3 max-2xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
          {WishListData?.data?.map((item: any, index: number) => (
            <div key={item.ProdCode} className={`${WishListLoader && "opacity-[0.5] pointer-events-none"}`}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      )}
      {!WishListLoader && WishListData?.data?.length == 0 && (
        <p>რჩეული პროდუქტები არ არსებობს</p>
      )}
      {prodwholenum > 10 && (
        <div className="pt-[20px] flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakLinkClassName={""}
            breakClassName={
              "w-8 h-8 flex items-center font-forh justify-center"
            }
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
      )}
    </div>
  );
}