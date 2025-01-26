"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import { BsStarFill } from "react-icons/bs";

export default function Page({ params }: { params: { commentId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllCommentsRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditComments, setLoaderEditComments] = useState<boolean>(true);

  const [oneCommentsValues, setOneCommentsValues] = useState({
    review: "",
    star: 0,
    product_id: "",
  });
  const [editCommentsValues, setEditCommentsValues] = useState({
    review: "",
    star: 0,
  });

  useEffect(() => {
    setLoaderEditComments(true);
    axiosAdmin
      .get(`admin/reviews/${params.commentId}`)
      .then((res) => {
        setOneCommentsValues(res.data);
        setLoaderEditComments(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.commentId]);

  const HandleEditComments = () => {
    setLoaderEditComments(true);
    if (editCommentsValues.review) {
      axiosAdmin
        .post(`admin/reviews/${params.commentId}`, {
          star: editCommentsValues.star,
          review: editCommentsValues.review,
        })
        .then((res) => {
          router.push("/admin/panel/comments");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          setAllCommentsRender(res);
        })
        .catch((err) => {
          setLoaderEditComments(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ რედაქტირდა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditComments(false);
    }
  };

  //

  const [loaderAddReview, setLoaderAddReview] = useState<boolean>(false);

  const [addReviewValues, setAddReviewValues] = useState({
    review: "",
  });

  const HandleAddReview = () => {
    setLoaderAddReview(true);
    if (addReviewValues.review && oneCommentsValues?.product_id) {
      axiosAdmin
        .post("admin/reviews", {
          product_id: oneCommentsValues.product_id,
          star: 5,
          review: addReviewValues.review,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("პასუხი დაიწერა");
          setAllCommentsRender(res);
          router.push("/admin/panel/comments");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("პასუხი ვერ დაიწერა!");
        })
        .finally(() => {
          setLoaderAddReview(false);
        });
    } else {
      setLoaderAddReview(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <div
        className={`flex flex-col gap-y-[20px] items-end duration-100 ${
          loaderEditComments && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <h1 className="w-full">კომენტარის რედაქტირება</h1>
        <div className="flex items-center gap-[5px]">
          {[1, 2, 3, 4, 5].map((item1: any, index: any) => (
            <BsStarFill
              key={item1}
              onClick={() => {
                setEditCommentsValues((prev: any) => ({
                  ...prev,
                  star: index + 1,
                }));
              }}
              className={`cursor-pointer text-[20px] ${
                index + 1 <= (editCommentsValues.star || oneCommentsValues.star)
                  ? "text-myYellow"
                  : "text-gray-200"
              }`}
            />
          ))}
        </div>
        <TextArea1
          title="შეფასება"
          name="review"
          firstValue={oneCommentsValues?.review}
          type="text"
          setAllValues={setEditCommentsValues}
          error={false}
        />
        <div className="w-[200px]">
          <GreenButton
            name="რედაქტირება"
            action={HandleEditComments}
            loader={loaderEditComments}
            style="h-[50px] text-[18px]"
          />
        </div>
      </div>

      <hr className="h-[1px bg-black w-full" />
      <div
        className={`flex flex-col gap-y-[20px] items-end duration-100 ${
          (loaderAddReview || loaderEditComments) &&
          "pointer-events-none opacity-[0.5]"
        }`}
      >
        <h1 className="w-full">კომენტარზე პასუხის გაცემა</h1>
        <TextArea1
          title="პასუხი"
          name="review"
          type="text"
          setAllValues={setAddReviewValues}
          error={false}
        />
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
