"use client";

import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { GoPencil } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import { BsEye, BsXLg } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Page() {
  const router = useRouter();
  const [userOrdersData, setUserOrdersData] = useState<any>([]);
  const [userOrdersLoader, setUserOrdersLoader] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  useEffect(() => {
    setUserOrdersLoader(true);
    axiosUser
      .get(`user/order?page=${currentPage + 1}&per_page=10`)
      .then((res) => {
        setUserOrdersData(res.data.data);
        setUserOrdersLoader(false);
        setProdwholenum(res.data.total);
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
      <p>შეკვეთბი</p>
      {userOrdersLoader && (
        <div className="flex justify-center my-[60px] absolute top-0 left-[50%] translate-x-[-50%]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}
      {userOrdersData?.length > 0 &&
        userOrdersData.map((item: any, index: any) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full max-lg:bg-white`}
          >
            <div className="">
              <p className="select-none">N {item.id}</p>
              <p className="select-none text-[10px] text-gray-400">
                შეკვეთის თარიღი: {item.createdAt.split("T")[0]}
              </p>
            </div>
            <p className="select-none text-[13px]">{item.order_status}</p>

            <div
              onClick={() => {
                router.push(`/user/orders/${item.id}`);
              }}
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
            >
              <BsEye />
            </div>
          </div>
        ))}
      {!userOrdersLoader && userOrdersData?.length == 0 && (
        <p>შეკვეთები არ არსებობს</p>
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
            pageLinkClassName={`w-[40px] h-[40px] text-md  bg-gray-100 font-forh
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
