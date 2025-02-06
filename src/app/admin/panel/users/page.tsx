"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil, GoPerson } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import ReactPaginate from "react-paginate";
import Image from "next/image";

export default function Page() {
  const {
    allAdminUsersRender,
    setAllAdminUsersRender,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [allAdminUsersData, setAllAdminUsersData] = useState<any>([]);
  const [allAdminUsersLoader, setAllAdminUsersLoader] = useState<boolean>(true);

  const [AdminUsersDeletePopUp, setAdminUsersDeletePopUp] =
    useState<string>("");
  const [AdminUsersDeleteLoader, setAdminUsersDeleteLoader] =
    useState<string>("");

  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  useEffect(() => {
    setAllAdminUsersLoader(true);
    axiosAdmin
      .get(`admin/user?page=${currentPage + 1}&per_page=20`)
      .then((res) => {
        setAllAdminUsersData(res.data.data);
        setAllAdminUsersLoader(false);

        setProdwholenum(res.data.total);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [allAdminUsersRender, currentPage]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const HandleDeleteAdminUsers = (id: any) => {
    setAdminUsersDeleteLoader(id);
    axiosAdmin
      .delete(`admin/user/${id}`)
      .then((res) => {
        setAllAdminUsersRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("მომხმარებელი წაიშალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("მომხმარებელი ვერ წაიშალა!");
      })
      .finally(() => {
        setAdminUsersDeleteLoader("");
      });
  };

  const HandleChangeStatusAdminUsers = (id: any, status: any) => {
    setAdminUsersDeleteLoader(id);
    axiosAdmin
      .post(`admin/user/${id}`, {
        status: status ? 0 : 1,
      })
      .then((res) => {
        setAllAdminUsersRender(res);
      })
      .catch((err) => {})
      .finally(() => {
        setAdminUsersDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">მომხმარებლები</h1>
      {allAdminUsersLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}{" "}
      {allAdminUsersData?.length > 0 ? (
        allAdminUsersData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full ${
              AdminUsersDeleteLoader === item.id && "opacity-[0.5] mx-[20px]"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <div className="relative w-[40px] h-[40px] flex items-center justify-center rounded-full overflow-hidden shadow">
                {item?.img ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.img}`}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <GoPerson />
                )}
              </div>

              <p className="select-none">{item.name + " " + item.surname}</p>
            </div>

            {AdminUsersDeleteLoader === item.id ? (
              <div className="w-[50px] h-[50px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    HandleChangeStatusAdminUsers(item.id, item.status);
                  }}
                  className={`px-[30px] h-[40px] rounded-full flex gap-[15px] items-center justify-center text-gray-600 text-[18px] group hover:bg-white cursor-pointer shadow duration-100 ${
                    item.status
                      ? "hover:shadow-md shadow-[red]"
                      : "hover:shadow-md shadow-myGreen"
                  }`}
                >
                  <p>{item.status ? "დაბლოკვა" : "გააქტიურება"}</p>
                </div>
                <div
                  onClick={() => {
                    router.push(`/admin/panel/users/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setAdminUsersDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {AdminUsersDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteAdminUsers(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setAdminUsersDeletePopUp("");
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
          {allAdminUsersLoader
            ? "მომხმარებლები იძებნება.."
            : "მომხმარებლები არ არსებობს"}
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
