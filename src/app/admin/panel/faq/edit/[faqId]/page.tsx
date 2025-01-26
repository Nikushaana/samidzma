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

export default function Page({ params }: { params: { faqId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllFAQRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditFAQ, setLoaderEditFAQ] = useState<boolean>(true);

  const [oneFAQValues, setOneFAQValues] = useState({
    title: "",
    title_eng: "",
    title_rus: "",
    answer: "",
    answer_eng: "",
    answer_rus: "",
    sort: 0,
    status: 0,
  });
  const [editFAQValues, setEditFAQValues] = useState({
    title: "",
    title_eng: "",
    title_rus: "",
    answer: "",
    answer_eng: "",
    answer_rus: "",
    sort: 0,
    status: "",
  });

  useEffect(() => {
    setLoaderEditFAQ(true);
    axiosAdmin
      .get(`admin/faq/${params.faqId}`)
      .then((res) => {
        setOneFAQValues(res.data);
        setLoaderEditFAQ(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.faqId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleEditFAQ();
    }
  };

  const HandleEditFAQ = () => {
    setLoaderEditFAQ(true);
    if (editFAQValues.title && editFAQValues.title_eng) {
      axiosAdmin
        .post(`admin/faq/${params.faqId}`, {
          title: editFAQValues.title,
          title_eng: editFAQValues.title_eng,
          title_rus: editFAQValues.title_rus,
          answer: editFAQValues.answer,
          answer_eng: editFAQValues.answer_eng,
          answer_rus: editFAQValues.answer_rus,
          sort: editFAQValues.sort,
          status: status.find((item: any) => item.name === editFAQValues.status)
            ?.id,
        })
        .then((res) => {
          router.push("/admin/panel/faq");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          setAllFAQRender(res);
        })
        .catch((err) => {
          setLoaderEditFAQ(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ რედაქტირდა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditFAQ(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditFAQ && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <h1>FAQ რედაქტირება</h1>
        <Input1
          title="კითხვა"
          name="title"
          type="text"
          firstValue={oneFAQValues.title}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="პასუხი"
          name="answer"
          firstValue={oneFAQValues.answer}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <Input1
          title="კითხვა EN"
          name="title_eng"
          type="text"
          firstValue={oneFAQValues.title_eng}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />{" "}
        <TextEditor
          title="პასუხი EN"
          name="answer_eng"
          firstValue={oneFAQValues.answer_eng}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <Input1
          title="კითხვა Рус"
          name="title_rus"
          type="text"
          firstValue={oneFAQValues.title_rus}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="პასუხი Рус"
          name="answer_rus"
          firstValue={oneFAQValues.answer_rus}
          setAllValues={setEditFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <div className="w-[200px]">
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            firstValue={
              status.find((item: any) => item.id === oneFAQValues.status)?.name
            }
            setAllValues={setEditFAQValues}
            error={false}
          />
        </div>
        <div className="w-[350px] max-sm:w-full">
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            type="text"
            firstValue={oneFAQValues.sort}
            setAllValues={setEditFAQValues}
            error={false}
            handleInputKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={HandleEditFAQ}
          loader={loaderEditFAQ}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
