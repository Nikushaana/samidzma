"use client";

import React, { useContext, useState } from "react";
import Input1 from "../components/Inputs/Input1";
import TextArea1 from "../components/Inputs/TextArea1";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";
import GreenButton from "../components/buttons/greenButton";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import dynamic from "next/dynamic";

const BranchesMap = dynamic(() => import("@/app/components/map/branchesMap"), {
  ssr: false,
});

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );
  const [sendMessageLoader, setSetSendMessageLoader] = useState<boolean>(false);
  const [sendMessageRender, setSetSendMessageRender] = useState<any>(null);

  const [sendMessageValues, setSendMessageValues] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    title: "",
    question: "",
  });

  const HandleSendMessage = () => {
    setSetSendMessageLoader(true);
    if (sendMessageValues.name) {
      axiosUser
        .post(`front/question`, {
          name: sendMessageValues.name,
          last_name: sendMessageValues.last_name,
          phone: sendMessageValues.phone.replace(/\s/g, ""),
          email: sendMessageValues.email,
          title: sendMessageValues.title,
          question: sendMessageValues.question,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით გაიგზავნა");
          setSetSendMessageRender(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ გაიგზავნა!");
        })
        .finally(() => {
          setSetSendMessageLoader(false);
        });
    } else {
      setSetSendMessageLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="flex flex-col gap-y-[20px]">
          <h1 className="text-[28px]">ჩვენი ფილიალები</h1>
          <p className="text-[14px]">
            კითხვები გაქვს ან დახმარება გჭირდება? მოგვწერე. შეავსე ქვემოთ
            მოცემული საკონტაქტო ფორმა და ჩვენ რაც შეიძლება მალე გიპასუხებთ.
          </p>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div
            className={`rounded-[12px] h-full bg-white p-[30px] max-sm:p-[20px] flex flex-col gap-y-[20px] duration-100 ${
              sendMessageLoader && "pointer-events-none opacity-[0.5]"
            }`}
          >
            <div className="flex flex-col">
              <h1 className="text-[28px]">საკონტაქტო ფორმა</h1>
              <p className="text-[14px]">შეავსე ფორმა, რათა დაგიკავშირდეთ</p>
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <Input1
                placeholder="სახელი"
                name="name"
                type="text"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />
              <Input1
                placeholder="გვარი"
                name="last_name"
                type="text"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />
              <Input1
                placeholder="მეილი"
                name="email"
                type="text"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />
              <Input1
                isNumber={true}
                placeholder="მობილურის ნომერი"
                name="phone"
                type="text"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />
              <Input1
                placeholder="შეტყობინების თემა"
                name="title"
                type="text"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />
              <TextArea1
                placeholder="შეტყობინება"
                name="question"
                setAllValues={setSendMessageValues}
                render={sendMessageRender}
              />

              <GreenButton
                name="გაგზავნა"
                loader={sendMessageLoader}
                style="h-[56px] max-sm:h-[48px] text-[18px]"
                action={HandleSendMessage}
              />
            </div>
          </div>
          <div className="w-full h-full max-lg:aspect-[20/21] rounded-[12px] overflow-hidden">
            <BranchesMap/>
          </div>
        </div>
      </div>
    </div>
  );
}
