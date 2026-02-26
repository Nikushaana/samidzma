"use client";

import React, { useContext, useState } from "react";
import useVacancies from "../../../../dataFetchs/vacanciesContext";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import * as Yup from "yup";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Input1 from "../Inputs/Input1";
import DropDown1value from "../DropDowns/DropDown1value";
import TextArea1 from "../Inputs/TextArea1";
import DocsUploader from "../Uploaders/DocsUploader";
import GreenButton from "../buttons/greenButton";

export default function CareersForm() {
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

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    vacancy_id: Yup.string().required("პოზიცია სავალდებულოა"),
    name: Yup.string().required("სახელი სავალდებულოა"),
    phone: Yup.string().required("მობილურის ნომერი სავალდებულოა"),
    email: Yup.string().required("მეილი სავალდებულოა"),
    letter: Yup.string().required("სამოტივაციო წერილი სავალდებულოა"),
  });

  const handleSendVacancyCvValidation = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate(sendVacancyCvValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleSendVacancyCv(e);
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(
          newErrors.name ||
            newErrors.email ||
            newErrors.phone ||
            newErrors.vacancy_id ||
            newErrors.letter,
        );
      });
  };

  const HandleSendVacancyCv = (e: any) => {
    e.preventDefault();
    setSetSendVacancyCvLoader(true);

    const form = e.target;
    const formData = new FormData(form);

    formData.append(
      "vacancy_id",
      vacancyData.find(
        (item: any) => item.name === sendVacancyCvValues.vacancy_id,
      )?.id || "",
    );

    (formData.delete("phone"),
      formData.append("phone", sendVacancyCvValues.phone.replace(/\s/g, "")));

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
  };
  return (
    <form
      onSubmit={handleSendVacancyCvValidation}
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
        error={errors.name}
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
        error={errors.email}
      />
      <Input1
        isNumber={true}
        placeholder="მობილურის ნომერი"
        name="phone"
        type="text"
        setAllValues={setSendVacancyCvValues}
        render={sendVacancyCvRender}
        error={errors.phone}
      />
      <DropDown1value
        placeholder="პოზიცია"
        data={vacancyData}
        name="vacancy_id"
        setAllValues={setSendVacancyCvValues}
        render={sendVacancyCvRender}
        searchable={true}
        error={errors.vacancy_id}
      />
      <TextArea1
        placeholder="სამოტივაციო წერილი - დაწერე აქ ან ატვირთე დოკუმენტად"
        name="letter"
        setAllValues={setSendVacancyCvValues}
        render={sendVacancyCvRender}
        error={errors.letter}
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
  );
}
