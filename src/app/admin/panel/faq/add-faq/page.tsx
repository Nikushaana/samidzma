"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllFAQRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddFAQ, setLoaderAddFAQ] = useState<boolean>(false);

  const [addFAQValues, setAddFAQValues] = useState({
    title: "",
    title_eng: "",
    title_rus: "",
    answer: "",
    answer_eng: "",
    answer_rus: "",
    sort: 0,
    status: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAddFAQ();
    }
  };

  const HandleAddFAQ = () => {
    setLoaderAddFAQ(true);
    if (addFAQValues.title && addFAQValues.title_eng) {
      axiosAdmin
        .post("admin/faq", {
          title: addFAQValues.title,
          title_eng: addFAQValues.title_eng,
          title_rus: addFAQValues.title_rus,
          answer: addFAQValues.answer,
          answer_eng: addFAQValues.answer_eng,
          answer_rus: addFAQValues.answer_rus,
          sort: addFAQValues.sort,
          status: status.find((item: any) => item.name === addFAQValues.status)
            ?.id,
        })
        .then((res) => {
          router.push("/admin/panel/faq");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით აიტვირთა");
          setAllFAQRender(res);
        })
        .catch((err) => {
          setLoaderAddFAQ(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ აიტვირთა!");
        })
        .finally(() => {});
    } else {
      setLoaderAddFAQ(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddFAQ && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="grid grid-cols-1 gap-[20px] w-full">
        <h1>FAQ დამატება</h1>
        <Input1
          title="კითხვა"
          name="title"
          type="text"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="პასუხი"
          name="answer"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <Input1
          title="კითხვა EN"
          name="title_eng"
          type="text"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />{" "}
        <TextEditor
          title="პასუხი EN"
          name="answer_eng"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <Input1
          title="კითხვა Рус"
          name="title_rus"
          type="text"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextEditor
          title="პასუხი Рус"
          name="answer_rus"
          setAllValues={setAddFAQValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <hr />
        <div className="w-[200px]">
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            setAllValues={setAddFAQValues}
            error={false}
          />
        </div>
        <div className="w-[350px]">
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            type="text"
            setAllValues={setAddFAQValues}
            error={false}
            handleInputKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={HandleAddFAQ}
          loader={loaderAddFAQ}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
