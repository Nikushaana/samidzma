"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllVacancyRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddVacancy, setLoaderAddVacancy] = useState<boolean>(false);

  const [addVacancyValues, setAddVacancyValues] = useState({
    position: "",
    position_eng: "",
    position_rus: "",
    description: "",
    description_eng: "",
    description_rus: "",
    sort: 0,
    status: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAddVacancy();
    }
  };

  const HandleAddVacancy = () => {
    setLoaderAddVacancy(true);
    if (addVacancyValues.position && addVacancyValues.position_eng) {
      axiosAdmin
        .post("admin/vacancy", {
          position: addVacancyValues.position,
          position_eng: addVacancyValues.position_eng,
          position_rus: addVacancyValues.position_rus,
          description: addVacancyValues.description,
          description_eng: addVacancyValues.description_eng,
          description_rus: addVacancyValues.description_rus,
          sort: addVacancyValues.sort,
          status: status.find(
            (item: any) => item.name === addVacancyValues.status
          )?.id,
        })
        .then((res) => {
          router.push("/admin/panel/vacancy");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით აიტვირთა");
          setAllVacancyRender(res);
        })
        .catch((err) => {
          setLoaderAddVacancy(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ აიტვირთა!");
        })
        .finally(() => {});
    } else {
      setLoaderAddVacancy(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddVacancy && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="flex flex-col gap-[20px] w-full">
        <h1>ვაკანსიის დამატება</h1>
        <Input1
          title="პოზიცია"
          name="position"
          type="text"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="პოზიცია EN"
          name="position_eng"
          type="text"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="პოზიცია Рус"
          name="position_rus"
          type="text"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <TextArea1
          title="აღწერა"
          name="description"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="აღწერა EN"
          name="description_eng"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="აღწერა Рус"
          name="description_rus"
          setAllValues={setAddVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <div className="w-[200px]">
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            setAllValues={setAddVacancyValues}
            error={false}
          />
        </div>
        <div className="w-[350px] max-sm:w-full">
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            type="text"
            setAllValues={setAddVacancyValues}
            error={false}
            handleInputKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={HandleAddVacancy}
          loader={loaderAddVacancy}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
