"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsPlusLg, BsStarFill, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { IoSearchOutline } from "react-icons/io5";
import { BiCheck, BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheck, FaTree } from "react-icons/fa";
import DotsLoader from "../loaders/DotsLoader";
import GreenButton from "../buttons/greenButton";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Input1 from "../Inputs/Input1";
import TextArea1 from "../Inputs/TextArea1";

export default function ProductReviewPopUp() {
  const {
    productReviewPopUp,
    setProductReviewPopUp,
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setRenderProdReview,
  } = useContext(ContextForSharingStates);
  const { user } = useContext(UserContext);
  
  const [loaderAddReview, setLoaderAddReview] = useState<boolean>(false);

  const [addReviewValues, setAddReviewValues] = useState({
    star: 0,
    review: "",
  });

  const HandleAddReview = () => {
    setLoaderAddReview(true);
    if (addReviewValues.review && user?.id) {
      axiosUser
        .post("user/reviews", {
          product_id: productReviewPopUp,
          star: addReviewValues.star,
          review: addReviewValues.review,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("შეფასება დაიწერა");
          setRenderProdReview(res);
          setProductReviewPopUp("");
          setAddReviewValues({
            star: 0,
            review: "",
          });
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("შეფასება ვერ დაიწერა!");
        })
        .finally(() => {
          setLoaderAddReview(false);
        });
    } else {
      setLoaderAddReview(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] ${
        productReviewPopUp
          ? "z-[20] opacity-1 duration-100"
          : "z-[-20] opacity-0 duration-150"
      }`}
    >
      <div
        onClick={() => {
          setProductReviewPopUp("");
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
          productReviewPopUp ? "backdrop-blur-[5px] " : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`bg-white p-[16px] w-[700px] max-sm:w-[calc(100%-32px)] flex flex-col gap-y-[20px] items-end rounded-[12px] ${
          loaderAddReview && "pointer-events-none opacity-[0.8]"
        }`}
      >
        <div className="grid grid-cols-1 gap-[10px] w-full">
          <TextArea1
            title="შეფასება"
            name="review"
            type="text"
            setAllValues={setAddReviewValues}
            error={false}
            render={productReviewPopUp}
          />
          <div className="flex items-center gap-[5px]">
            {[1, 2, 3, 4, 5].map((item1: any, index: any) => (
              <BsStarFill
                key={item1}
                onClick={() => {
                  setAddReviewValues((prev: any) => ({
                    ...prev,
                    star: index + 1,
                  }));
                }}
                className={`cursor-pointer text-[20px] ${
                  index + 1 <= addReviewValues.star
                    ? "text-myYellow"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="w-[200px]">
          <GreenButton
            name="დაწერა"
            action={HandleAddReview}
            loader={loaderAddReview}
            style="h-[50px] text-[18px]"
          />
        </div>
      </div>
    </div>
  );
}
