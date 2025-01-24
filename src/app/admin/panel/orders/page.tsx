"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import ReactPaginate from "react-paginate";

export default function Page() {
  const { allAdminUserOrderRender, setAllAdminUserOrderRender } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();

  const [allAdminUserOrderData, setAllAdminUserOrderData] = useState<any>([]);
  const [allAdminUserOrderLoader, setAllAdminUserOrderLoader] =
    useState<boolean>(true);

  const [AdminUserOrderDeletePopUp, setAdminUserOrderDeletePopUp] =
    useState<string>("");
  const [AdminUserOrderDeleteLoader, setAdminUserOrderDeleteLoader] =
    useState<string>("");

  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  useEffect(() => {
    setAllAdminUserOrderLoader(true);
    axiosAdmin
      .get(`admin/userOrder/orders?page=${currentPage + 1}&per_page=20`)
      .then((res) => {
        setAllAdminUserOrderData(res.data.data);
        setAllAdminUserOrderLoader(false);

        setProdwholenum(res.data.total);

      })
      .catch((err) => {})
      .finally(() => {});
  }, [allAdminUserOrderRender, currentPage]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const HandleDeleteAdminUserOrder = (id: any) => {
    setAdminUserOrderDeleteLoader(id);
    axiosAdmin
      .delete(`admin/userOrder/orders/${id}`)
      .then((res) => {
        setAllAdminUserOrderRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setAdminUserOrderDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center">
      <h1 className="w-full">შეკვეთები</h1>
      {allAdminUserOrderLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute left-[50%] translate-x-[-50%]">
          <DotsLoader />
        </div>
      )}{" "}
      {allAdminUserOrderData?.length > 0 ? (
        allAdminUserOrderData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              AdminUserOrderDeleteLoader === item.id &&
              "opacity-[0.5] mx-[20px]"
            }`}
          >
            <p className="select-none">{item.name}</p>
            {AdminUserOrderDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/admin/panel/orders/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setAdminUserOrderDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {AdminUserOrderDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteAdminUserOrder(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setAdminUserOrderDeletePopUp("");
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[18px] hover:shadow-md duration-300 cursor-pointer"
                      >
                        <BsXLg />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>
          {allAdminUserOrderLoader
            ? "შეკვეთები იძებნება.."
            : "შეკვეთები არ არსებობს"}
        </p>
      )}
      {prodwholenum > 20 && (
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
