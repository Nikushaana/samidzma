"use client";

import Input1 from "@/app/components/Inputs/Input1";
import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import GreenButton from "@/app/components/buttons/greenButton";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import Image from "next/image";
import * as Yup from "yup";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { user, setNewRenderUser } = useContext(UserContext);

  const [updateUserLoader, setupdateUserLoader] = useState<boolean>(false);
  const [updateUserValues, setupdateUserValues] = useState({
    img: "",
    name: "",
    surname: "",
    nickname: "",
    email: "",
    phone: "",
    card_number: "",
    address: "",
    legal_address: "",
    comment: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("სახელი სავალდებულოა"),
    surname: Yup.string().required("გვარი სავალდებულოა"),
    email: Yup.string().required("მეილი სავალდებულოა"),
    phone: Yup.string().required("ტელეფონის ნომერი სავალდებულოა"),
    password: Yup.string().oneOf(
      [Yup.ref("rePassword")],
      "პაროლები უნდა ემთხვეოდეს"
    ),
    rePassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "პაროლები უნდა ემთხვეოდეს"
    ),
  });

  const handleUpdateUserValidation = (e: any) => {
    e.preventDefault();
    validationSchema
      .validate(updateUserValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleUpdateUser(e);
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
            newErrors.surname ||
            newErrors.email ||
            newErrors.phone ||
            newErrors.password ||
            newErrors.rePassword
        );
      });
  };

  const HandleUpdateUser = (e: any) => {
    e.preventDefault();
    setupdateUserLoader(true);

    const form = e.target;
    const formData = new FormData(form);

    formData.delete("phone"),
      formData.append("phone", updateUserValues.phone.replace(/\s/g, ""));

    formData.delete("password"),
      formData.delete("rePassword"),
      updateUserValues.password &&
        updateUserValues.rePassword &&
        updateUserValues.password === updateUserValues.rePassword &&
        formData.append("password", updateUserValues.password),
      axiosUser
        .post("user", formData)
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("ინფორმაცია წარმატებით შეიცვალა");
          setNewRenderUser(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ინფორმაცია ვერ შეცვალა");
        })
        .finally(() => {
          setupdateUserLoader(false);
        });
  };

  return (
    <form
      onSubmit={handleUpdateUserValidation}
      encType="multipart/form-data"
      className="flex flex-col gap-y-[20px] items-end w-full"
    >
      <ImgUploader
        name="img"
        render={user}
        multiple={false}
        setAllValues={setupdateUserValues}
      />
      {user?.img?.length > 0 && (
        <div className="w-full">
          <div className="relative h-[100px] aspect-video self-start bg-white rounded-[8px] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.img}`}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-y-[20px]">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
          <Input1
            title="სახელი"
            name="name"
            type="text"
            firstValue={user?.name}
            setAllValues={setupdateUserValues}
            error={errors.name}
          />
          <Input1
            title="გვარი"
            name="surname"
            type="text"
            firstValue={user?.surname}
            setAllValues={setupdateUserValues}
            error={errors.surname}
          />
          <Input1
            title="ზედმეტსახელი"
            name="nickname"
            type="text"
            firstValue={user?.nickname}
            setAllValues={setupdateUserValues}
            error={false}
          />
        </div>
        <hr />
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
          <Input1
            title="მეილი"
            name="email"
            type="text"
            firstValue={user?.email}
            setAllValues={setupdateUserValues}
            error={errors.email}
          />
          <Input1
            title="ტელეფონის ნომერი"
            name="phone"
            type="text"
            firstValue={user?.phone
              ?.replace(/[^0-9]/g, "")
              .replace(/\s/g, "")
              .replace(/(.{3})/g, "$1 ")
              .trim()
              .slice(0, 11)}
            isNumber={true}
            setAllValues={setupdateUserValues}
            error={errors.phone}
          />
        </div>
        <hr />
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
          <Input1
            title="მისამართი"
            name="address"
            type="text"
            firstValue={user?.address}
            setAllValues={setupdateUserValues}
            error={false}
          />
          <Input1
            title="იურიდიული მისამართი"
            name="legal_address"
            type="text"
            firstValue={user?.legal_address}
            setAllValues={setupdateUserValues}
            error={false}
          />
        </div>
        <hr />
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
          <Input1
            title="პაროლი"
            isPassword={true}
            name="password"
            firstValue=""
            setAllValues={setupdateUserValues}
            error={errors.password}
          />
          <Input1
            title="გაიმეორე"
            isPassword={true}
            name="rePassword"
            firstValue=""
            setAllValues={setupdateUserValues}
            error={errors.rePassword}
          />
        </div>
      </div>

      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          loader={updateUserLoader}
          style="h-[50px] text-[18px]"
          button={true}
        />
      </div>
    </form>
  );
}
