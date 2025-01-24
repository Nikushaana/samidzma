"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosUser } from "../../../../../../dataFetchs/AxiosToken";

export default function Page({ params }: { params: { commentId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllUserCommentsRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditComments, setLoaderEditComments] = useState<boolean>(true);

  const [oneCommentsValues, setOneCommentsValues] = useState({
    review: "",
  });
  const [editCommentsValues, setEditCommentsValues] = useState({
    review: "",
  });

  useEffect(() => {
    setLoaderEditComments(true);
    axiosUser
      .get(`user/reviews/${params.commentId}`)
      .then((res) => {
        setOneCommentsValues(res.data);
        setLoaderEditComments(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.commentId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleEditComments();
    }
  };

  const HandleEditComments = () => {
    setLoaderEditComments(true);
    if (editCommentsValues.review) {
      axiosUser
        .post(`user/reviews/${params.commentId}`, {
          review: editCommentsValues.review,
        })
        .then((res) => {
          router.push("/user/comments");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          setAllUserCommentsRender(res);
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

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditComments && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="w-full">
        <TextArea1
          title="შეფასება"
          name="review"
          firstValue={oneCommentsValues?.review}
          type="text"
          setAllValues={setEditCommentsValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={HandleEditComments}
          loader={loaderEditComments}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
