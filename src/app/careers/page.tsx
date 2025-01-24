"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Input1 from "../components/Inputs/Input1";
import TextArea1 from "../components/Inputs/TextArea1";
import { ImAttachment } from "react-icons/im";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import VacancySlider from "../components/careers/vacancySlider";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import GreenButton from "../components/buttons/greenButton";
import DocsUploader from "../components/Uploaders/DocsUploader";
import DropDown1value from "../components/DropDowns/DropDown1value";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";
import useVacancies from "../../../dataFetchs/vacanciesContext";

export default function Page() {
  const { vacancyData } = useVacancies();

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const [sendVacancyCvLoader, setSetSendVacancyCvLoader] =
    useState<boolean>(false);
  const [sendVacancyCvRender, setSetSendVacancyCvRender] = useState<any>(null);

  const [sendVacancyCvValues, setSendVacancyCvValues] = useState({
    vacancy_id: "",
    name: "",
    last_name: "",
    phone: "",
    email: "",
    letter: "",
    cv: "",
  });

  const HandleSendVacancyCv = (e: any) => {
    e.preventDefault();
    setSetSendVacancyCvLoader(true);
    if (sendVacancyCvValues.vacancy_id) {
      const form = e.target;
      const formData = new FormData(form);

      formData.append(
        "vacancy_id",
        vacancyData.find(
          (item: any) => item.name === sendVacancyCvValues.vacancy_id
        )?.id || ""
      );

      formData.delete("phone"),
        formData.append("phone", sendVacancyCvValues.phone.replace(/\s/g, ""));

      axiosUser
        .post(`front/vacancycv`, formData)
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით გაიგზავნა");
          setSetSendVacancyCvRender(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ გაიგზავნა!");
        })
        .finally(() => {
          setSetSendVacancyCvLoader(false);
        });
    } else {
      setSetSendVacancyCvLoader(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[50px] relative">
        <WhatUSearch />

        <div className="grid grid-cols-2 max-lg:grid-cols-1 items-end gap-[20px]">
          <div className="relative w-full h-full max-lg:aspect-[2/1] rounded-[12px] overflow-hidden max-tiny:hidden">
            <Image
              src="/images/careerpht.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col gap-y-[20px] px-[30px] max-lg:px-0">
            <h1 className="text-[28px]">დასაქმება „სამ ძმაში“</h1>
            <p className="text-[14px]">
              თუ გიყვარს დღესასწაულების განსაკუთრებულ დღეებად ქცევა და
              სხვებისთვის ბედნიერების მინიჭება, სწორ ადგილას მოხვდი!
            </p>
            <p className="text-[14px]">
              ჩვენი თანამშრომლები ჩვენი კომპანიის გულია. ათ წელზე მეტია, რაც
              ქართულ ბაზარზე ვართ, დღითიდღე ვიზრდებით და ვვითარდებით, იზრდება
              ჩვენი გუნდი. ჩვენ შევქმენით გარემო, რომელიც საშუალებას აძლევს
              ჩვენს თანამშრომლებს, გაიზარდონ ჩვენთან ერთად
            </p>
            <p className="text-[14px]">
              ინფორმაცია ჩვენი ვაკანსიების შესახებ საიტზე, ამ განყოფილებაში
              ქვეყნდება.
            </p>
            <p className="text-[14px]">
              სასურველ პოზიციაზე CV-ს გამოსაგზავნად შეავსე საკონტაქტო ფორმა.
              საკონტაქტო ფორმა მოიცავს პირად მონაცემებს, სამოტივაციო წერილსა და
              რეზიუმეს.
            </p>
            <p className="text-[14px]">
              ფორმის შევსების შემდეგ, ჩვენ რაც შეიძლება მალე დაგიკავშირდებით.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div className="rounded-[12px] h-full bg-white p-[30px] flex flex-col gap-y-[20px]">
            <div className="flex flex-col">
              <h1 className="text-[28px]">საკონტაქტო ფორმა</h1>
              <p className="text-[14px]">შეავსე ფორმა, რათა დაგიკავშირდეთ</p>
            </div>

            <form
              onSubmit={HandleSendVacancyCv}
              encType="multipart/form-data"
              className={`flex flex-col gap-y-[10px] duration-100 ${
                sendVacancyCvLoader && "pointer-events-none opacity-[0.5]"
              }`}
            >
              <Input1
                placeholder="სახელი"
                name="name"
                type="text"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <Input1
                placeholder="გვარი"
                name="last_name"
                type="text"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <Input1
                placeholder="მეილი"
                name="email"
                type="text"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <Input1
                isNumber={true}
                placeholder="მობილურის ნომერი"
                name="phone"
                type="text"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <DropDown1value
                placeholder="პოზიცია"
                data={vacancyData}
                name="vacancy_id"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <TextArea1
                placeholder="სამოტივაციო წერილი - დაწერე აქ ან ატვირთე დოკუმენტად"
                name="letter"
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />
              <DocsUploader
                name="cv"
                multiple={false}
                setAllValues={setSendVacancyCvValues}
                render={sendVacancyCvRender}
              />

              <GreenButton
                name="გაგზავნა"
                loader={sendVacancyCvLoader}
                style="h-[42px] text-[18px]"
                button={true}
              />
            </form>
          </div>
          <div className="w-full h-full max-lg:max-h-[80vh] rounded-[12px] overflow-hidden bg-myBlack p-[30px] flex flex-col gap-y-[20px]">
            <VacancySlider />
          </div>
        </div>
      </div>
    </div>
  );
}
