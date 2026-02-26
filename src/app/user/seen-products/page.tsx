"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import ReactPaginate from "react-paginate";
import ProductCard from "@/app/components/CardVariations/ProductCard";

export default function Page() {
  const [userLastSeenProductsData, setUserLastSeenProductsData] = useState<any>(
    []
  );
  const [userLastSeenProductsLoader, setUserLastSeenProductsLoader] =
    useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  useEffect(() => {
    setUserLastSeenProductsLoader(true);
    axiosUser
      .get(`user/lastSeenProduct?page=${currentPage + 1}&per_page=10`)
      .then((res) => {
        setUserLastSeenProductsData(res.data);
        setUserLastSeenProductsLoader(false);
        setProdwholenum(res.data.data.length);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [currentPage]);

  const pageCount = Math.ceil(prodwholenum / 10);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col gap-y-[10px] relative w-full">
      {userLastSeenProductsLoader && (
        <div className="flex justify-center my-[60px] w-full absolute top-0 left-[50%] translate-x-[-50%]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}{" "}
      {userLastSeenProductsData?.data?.length > 0 && (
        <div className="grid grid-cols-3 max-2xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
          {userLastSeenProductsData?.data?.map((item: any, index: number) => (
            <div
              key={item.ProdCode}
              className="w-full p-[10px] flex flex-col gap-y-[10px] bg-[#f7f7f7]  rounded-[12px]"
            >
              <div className="text-[14px]">
                <p className="text-[13px]">ნახვის დრო</p>
                <p>
                  {userLastSeenProductsData.dates
                    .find((item1: any) => item1.Prod_code === item.ProdCode)
                    .createdAt.split("T")[0] +
                    "  " +
                    userLastSeenProductsData.dates
                      .find((item1: any) => item1.Prod_code === item.ProdCode)
                      .createdAt.split("T")[1]
                      .split(".")[0]}
                </p>
              </div>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      )}
      {!userLastSeenProductsLoader &&
        userLastSeenProductsData?.data?.length == 0 && (
          <p>ბოლოს ნანახი პროდუქტები არ არსებობს</p>
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
      )}
    </div>
  );
}
