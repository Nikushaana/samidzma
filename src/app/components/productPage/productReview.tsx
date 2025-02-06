"use client";

import React, { useContext, useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import GreenButton from "../buttons/greenButton";
import Image from "next/image";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import DotsLoader from "../loaders/DotsLoader";

export default function ProductReview({
  productID,
  loaderProdReview,
  prodReviewData,
}: any) {
  const { setProductReviewPopUp, setAlertShow, setAlertStatus, setAlertText } =
    useContext(ContextForSharingStates);
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-y-[20px]">
      <h1 className="text-[28px]">მომხმარებელთა შეფასებები</h1>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] max-lg:gap-[10px]">
        <div className="bg-white p-[30px] max-tiny:p-[20px] rounded-[12px] flex items-center gap-[40px] justify-center">
          <div className="flex flex-col gap-y-[5px]">
            <div className="flex justify-center items-center  gap-[5px] bg-myYellow h-[48px] max-tiny:h-[35px] rounded-full px-[0px]">
              <BiStar className="text-[28px] max-tiny:text-[20px]" />
              <h1 className="text-[26px] max-tiny:text-[18px] mt-[3px]">
                {prodReviewData?.average}
              </h1>
            </div>
            <p className="text-[14px] shrink-0">
              ({prodReviewData?.total} შეფასება)
            </p>
          </div>
          <div className="w-[130px]">
            {prodReviewData?.groupeByRounded_star?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-[10px] w-full"
                >
                  <div className="flex items-center gap-[5px]">
                    {[1, 2, 3, 4, 5].map((item1: any, index: any) => (
                      <BsStarFill
                        key={item1}
                        className={`${
                          index + 1 <= item?.rounded_star
                            ? "text-myYellow"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[14px]">{item?.count}</p>
                </div>
              )
            )}
          </div>
        </div>
        <div className="bg-white p-[30px] max-tiny:p-[20px] rounded-[12px] flex max-tiny:flex-col max-tiny:gap-[10px] items-center gap-[40px] justify-between">
          <h1 className="text-[22px]">
            დატოვე შენი კომენტარი პროდუქტის შესახებ
          </h1>

          <GreenButton
            name="დაწერე შეფასება"
            action={() => {
              if (user?.id) {
                setProductReviewPopUp(productID);
              } else {
                setAlertShow(true);
                setAlertStatus(false);
                setAlertText("გაიარე ავტორიზაცია შეფასების დასაფიქსირებლად!");
              }
            }}
            style="h-[56px] max-tiny:h-[48px] text-[18px]"
          />
        </div>
      </div>
      <div className={`flex flex-col gap-[20px] max-lg:gap-[10px]`}>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px] max-lg:gap-[10px]">
          {loaderProdReview
            ? [1, 2, 3, 4].map((index: any) => (
                <div key={index} className="w-full h-[150px] rounded-[12px] overflow-hidden">
                  <div className="loaderwave"></div>
                </div>
              ))
            : prodReviewData?.data?.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="rounded-[12px] bg-white p-[20px] flex flex-col gap-y-[17px]"
                >
                  <div className="flex items-center justify-between">
                    {item.user_id !== null ? (
                      <div className="flex items-center gap-[10px]">
                        <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden">
                          <Image
                            src="/images/food.png"
                            alt={""}
                            sizes="500px"
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p className="text-[18px]">
                          {item?.user?.name + " " + item?.user?.surname}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[18px]">ადმინის კომენტარი</p>
                    )}
                    {item.user_id !== null && (
                      <div className="flex justify-center items-center gap-[5px] bg-myYellow h-[36px] rounded-full px-[8px]">
                        <BiStar className="text-[20px]" />
                        <h1 className="h-[20px] mb-[2px]">
                          {item?.rounded_star}
                        </h1>
                      </div>
                    )}
                  </div>
                  <p className="text-[14px]">{item?.review}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
