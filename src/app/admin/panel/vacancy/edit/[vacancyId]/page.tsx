"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";

export default function Page({ params }: { params: { vacancyId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllVacancyRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditVacancy, setLoaderEditVacancy] = useState<boolean>(true);

  const [oneVacancyValues, setOneVacancyValues] = useState({
    position: "",
    position_eng: "",
    position_rus: "",
    description: "",
    description_eng: "",
    description_rus: "",
    sort: 0,
    status: 0,
  });
  const [editVacancyValues, setEditVacancyValues] = useState({
    position: "",
    position_eng: "",
    position_rus: "",
    description: "",
    description_eng: "",
    description_rus: "",
    sort: 0,
    status: "",
  });

  useEffect(() => {
    setLoaderEditVacancy(true);
    axiosAdmin
      .get(`admin/vacancy/${params.vacancyId}`)
      .then((res) => {
        setOneVacancyValues(res.data);
        setLoaderEditVacancy(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.vacancyId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleEditVacancy();
    }
  };

  const HandleEditVacancy = () => {
    setLoaderEditVacancy(true);
    if (editVacancyValues.position && editVacancyValues.position_eng) {
      axiosAdmin
        .post(`admin/vacancy/${params.vacancyId}`, {
          position: editVacancyValues.position,
          position_eng: editVacancyValues.position_eng,
          position_rus: editVacancyValues.position_rus,
          description: editVacancyValues.description,
          description_eng: editVacancyValues.description_eng,
          description_rus: editVacancyValues.description_rus,
          sort: editVacancyValues.sort,
          status: status.find(
            (item: any) => item.name === editVacancyValues.status
          )?.id,
        })
        .then((res) => {
          router.push("/admin/panel/vacancy");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          setAllVacancyRender(res);
        })
        .catch((err) => {
          setLoaderEditVacancy(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ რედაქტირდა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditVacancy(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditVacancy && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="flex flex-col gap-[20px] w-full">
        <h1>ვაკანსიის რედაქტირება</h1>
        <Input1
          title="პოზიცია"
          name="position"
          type="text"
          firstValue={oneVacancyValues.position}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="პოზიცია EN"
          name="position_eng"
          type="text"
          firstValue={oneVacancyValues.position_eng}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="პოზიცია Рус"
          name="position_rus"
          type="text"
          firstValue={oneVacancyValues.position_rus}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <TextArea1
          title="აღწერა"
          name="description"
          firstValue={oneVacancyValues.description}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="აღწერა EN"
          name="description_eng"
          firstValue={oneVacancyValues.description_eng}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <TextArea1
          title="აღწერა Рус"
          name="description_rus"
          firstValue={oneVacancyValues.description_rus}
          setAllValues={setEditVacancyValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />

        <div className="w-[350px]">
          <Input1
            title="სორტირება (მიუთითეთ სასურველი რიცხვი)"
            digit={true}
            name="sort"
            type="text"
            firstValue={oneVacancyValues.sort}
            setAllValues={setEditVacancyValues}
            error={false}
            handleInputKeyPress={handleInputKeyPress}
          />
        </div>
        <div className="w-[200px]">
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            firstValue={
              status.find((item: any) => item.id === oneVacancyValues.status)
                ?.name
            }
            setAllValues={setEditVacancyValues}
            error={false}
          />
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={HandleEditVacancy}
          loader={loaderEditVacancy}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
