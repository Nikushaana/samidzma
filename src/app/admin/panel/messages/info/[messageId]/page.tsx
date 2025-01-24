"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";

export default function Page({ params }: { params: { messageId: string } }) {
  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    seen,
    setAllMessagesRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditMessage, setLoaderEditMessage] = useState<boolean>(true);
  const [renderEditMessage, setRenderEditMessage] = useState<any>();

  const [oneMessageValues, setOneMessageValues] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    title: "",
    question: "",
    status: "",
  });
  const [EditMessageStatusValues, setEditMessageStatusValues] = useState({
    status: "",
  });

  useEffect(() => {
    setLoaderEditMessage(true);
    axiosAdmin
      .get(`admin/customerQuestion/${params.messageId}`)
      .then((res) => {
        setOneMessageValues(res.data);
        setLoaderEditMessage(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.messageId, renderEditMessage]);

  useEffect(() => {
    if (
      EditMessageStatusValues.status !== "" &&
      seen.find((item1: any) => item1.name === EditMessageStatusValues.status)
        ?.id !== oneMessageValues?.status
    ) {
      setLoaderEditMessage(true);
      axiosAdmin
        .post(`admin/customerQuestion/${params.messageId}`, {
          status: seen.find(
            (item: any) => item.name === EditMessageStatusValues.status
          ).id,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით შეიცვალა");
          setAllMessagesRender(res);
          setRenderEditMessage(res);
        })
        .catch((err) => {
          setLoaderEditMessage(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ შეიცვალა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditMessage(false);
    }
  }, [EditMessageStatusValues]);

  return (
    <div
      className={`flex flex-col gap-y-[20px] duration-100 ${
        loaderEditMessage && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">მონაწერის ინფორმაცია</h1>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px] ">სახელი</p>
        <h1 className="">{oneMessageValues.name}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">გვარი</p>
        <h1 className="">{oneMessageValues.last_name}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">ტელეფონის ნომერი</p>
        <h1 className="">
          {oneMessageValues.phone
            .replace(/[^0-9]/g, "")
            .replace(/\s/g, "")
            .replace(/(.{3})/g, "$1 ")
            .trim()
            .slice(0, 11)}
        </h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">მეილი</p>
        <h1 className="">{oneMessageValues.email}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">სათაური</p>
        <h1 className="">{oneMessageValues.title}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">წერილი</p>
        <h1 className="">{oneMessageValues.question}</h1>
      </div>
      <div className="w-[200px]">
        <DropDown1value
          title="სტატუსი"
          data={seen}
          firstValue={
            seen.find((item: any) => item.id === oneMessageValues.status)?.name
          }
          name="status"
          setAllValues={setEditMessageStatusValues}
          error={false}
        />
      </div>
    </div>
  );
}
