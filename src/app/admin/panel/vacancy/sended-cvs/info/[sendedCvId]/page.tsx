"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import { ContextForSharingStates } from "../../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../../dataFetchs/AxiosToken";

export default function Page({ params }: { params: { sendedCvId: string } }) {
  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    seen,
    setAllVacancyCvRender,
  } = useContext(ContextForSharingStates);

  const [loaderVacancyCv, setLoaderVacancyCv] = useState<boolean>(true);
  const [oneVacancyCvValues, setOneVacancyCvValues] = useState<any>({});
  const [oneVacancyCvRender, setOneVacancyCvRender] = useState<any>({});

  useEffect(() => {
    setLoaderVacancyCv(true);
    axiosAdmin
      .get(`admin/vacancyCv/${params.sendedCvId}`)
      .then((res) => {
        setOneVacancyCvValues(res.data);
        setLoaderVacancyCv(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.sendedCvId, oneVacancyCvRender]);

  const [editVacancyCvValues, setEditVacancyCvValues] = useState({
    status: "",
  });

  useEffect(() => {
    if (
      editVacancyCvValues.status !== "" &&
      seen.find((item1: any) => item1.name === editVacancyCvValues.status)
        ?.id !== oneVacancyCvValues?.status
    ) {
      setLoaderVacancyCv(true);

      axiosAdmin
        .post(`admin/vacancyCv/${params.sendedCvId}`, {
          status: seen.find(
            (item: any) => item.name === editVacancyCvValues.status
          )?.id,
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით შეიცვალა");
          setOneVacancyCvRender(res);
          setAllVacancyCvRender(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ შეიცვალა!");
        })
        .finally(() => {
          setLoaderVacancyCv(false);
        });
    }
  }, [editVacancyCvValues]);

  return (
    <div
      className={`flex flex-col gap-y-[20px] duration-100 ${
        loaderVacancyCv && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">სახელი</p>
        <h1>{oneVacancyCvValues?.name}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">გვარი</p>
        <h1>{oneVacancyCvValues?.last_name}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">ტელეფონის ნომერი</p>
        <h1>
          {oneVacancyCvValues?.phone
            ?.replace(/[^0-9]/g, "")
            .replace(/\s/g, "")
            .replace(/(.{3})/g, "$1 ")
            .trim()
            .slice(0, 11)}
        </h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">მეილი</p>
        <h1>{oneVacancyCvValues?.email}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">სამოტივაციო წერილი</p>
        <h1>{oneVacancyCvValues?.letter}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">CV</p>
        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/${oneVacancyCvValues?.cv}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="underline ">CV სანახავად დააკლიკე</h1>
        </a>
      </div>
      <div className="w-[200px]">
        <DropDown1value
          title="სტატუსი"
          data={seen}
          name="status"
          firstValue={
            seen.find((item: any) => item.id === oneVacancyCvValues.status)
              ?.name
          }
          setAllValues={setEditVacancyCvValues}
        />
      </div>
      <hr className="h-[1px] w-full" />
      <h3 className="text-[12px]">ვაკანსიის ინფორმაცია</h3>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">პოზიცია</p>
        <h1>{oneVacancyCvValues?.vacancy?.position}</h1>
      </div>
      <div className="flex flex-col gap-y-[5px] w-full">
        <p className="text-[12px]">აღწერა</p>
        <h1>{oneVacancyCvValues?.vacancy?.description}</h1>
      </div>
    </div>
  );
}
