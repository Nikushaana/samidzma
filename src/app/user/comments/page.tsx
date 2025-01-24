"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { GoPencil } from "react-icons/go";
import { FaTrashCan } from "react-icons/fa6";
import { BsXLg } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function Page() {
  const {
    allUserCommentsRender,
    setAllUserCommentsRender,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  } = useContext(ContextForSharingStates);
  const router = useRouter();

  const [userCommentsData, setUserCommentsData] = useState<any>([]);
  const [userCommentsLoader, setUserCommentsLoader] = useState<boolean>(true);

  const [commentsDeletePopUp, setCommentsDeletePopUp] = useState<string>("");
  const [commentsDeleteLoader, setCommentsDeleteLoader] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  useEffect(() => {
    setUserCommentsLoader(true);
    axiosUser
      .get(`user/reviews?page=${currentPage + 1}&per_page=10`)
      .then((res) => {
        setUserCommentsData(res.data.data);
        setUserCommentsLoader(false);
        setProdwholenum(res.data.total);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [currentPage, allUserCommentsRender]);

  const pageCount = Math.ceil(prodwholenum / 10);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  const HandleDeleteComments = (id: any) => {
    setCommentsDeleteLoader(id);
    axiosUser
      .delete(`user/reviews/${id}`)
      .then((res) => {
        setAllUserCommentsRender(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კომენტარი წაიშალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("კომენტარი ვერ წაიშალა!");
      })
      .finally(() => {
        setCommentsDeleteLoader("");
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] relative">
      {userCommentsLoader && (
        <div className="flex justify-center my-[60px] absolute top-0 left-[50%] translate-x-[-50%]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}{" "}
      {userCommentsData?.length > 0 &&
        userCommentsData.map((item: any, index: number) => (
          <div
            key={item.id}
            className={`border-[1px] flex items-center justify-between px-[20px] py-[10px] rounded-[10px] duration-100 w-full max-lg:bg-white ${
              commentsDeleteLoader === item.id && "opacity-[0.5]"
            }`}
          >
            <p
              onClick={() => {
                router.push(`/products/${item.product_id}`);
              }}
              className="select-none truncate hover:underline cursor-pointer"
            >
              {item.review}
            </p>
            {commentsDeleteLoader === item.id ? (
              <div className="w-[40px] h-[40px] flex items-center justify-center">
                <DotsLoader />
              </div>
            ) : (
              <div className="flex items-center gap-[10px]">
                <div
                  onClick={() => {
                    router.push(`/user/comments/edit/${item.id}`);
                  }}
                  className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-gray-600 text-[18px] group hover:bg-white hover:shadow-md duration-300 cursor-pointer"
                >
                  <GoPencil />
                </div>

                <div className="relative">
                  <div
                    onClick={() => {
                      setCommentsDeletePopUp(item.id);
                    }}
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                  >
                    <FaTrashCan />
                  </div>
                  {commentsDeletePopUp === item.id && (
                    <div className="absolute top-[-5px] right-[0px] flex items-center gap-[10px] p-[10px] h-[50px] bg-[#f4f6f9] shadow-md rounded-[8px]">
                      <div
                        onClick={() => {
                          HandleDeleteComments(item.id);
                        }}
                        className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-[red] text-[18px] hover:bg-red-200 hover:shadow-md duration-300 cursor-pointer"
                      >
                        <FaTrashCan />
                      </div>
                      <div
                        onClick={() => {
                          setCommentsDeletePopUp("");
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
        ))}
      {!userCommentsLoader && userCommentsData?.length == 0 && (
        <p>კომენტარები არ არსებობს</p>
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
