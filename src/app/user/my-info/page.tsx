"use client";

import Input1 from "@/app/components/Inputs/Input1";
import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import GreenButton from "@/app/components/buttons/greenButton";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import Image from "next/image";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { user, setNewRenderUser } = useContext(UserContext);

  const [updateUserLoader, setupdateUserLoader] = useState<boolean>(false);
  const [updateUserValues, setupdateUserValues] = useState({
    img: "",
    nickname: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    legal_address: "",
    password: "",
    rePassword: "",
  });

  const HandleUpdateUser = (e: any) => {
    e.preventDefault();
    setupdateUserLoader(true);
    if (updateUserValues.password === updateUserValues.rePassword) {
      const form = e.target;
      const formData = new FormData(form);

      formData.delete("phone"),
        formData.append("phone", updateUserValues.phone.replace(/\s/g, ""));

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
    } else {
      setupdateUserLoader(false);
    }
  };

  return (
    <form
      onSubmit={HandleUpdateUser}
      encType="multipart/form-data"
      className="flex flex-col gap-y-[20px] items-end w-full"
    >
      {user?.img?.length > 0 && (
        <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
          <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
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
      <ImgUploader
        name="img"
        multiple={false}
        setAllValues={setupdateUserValues}
      />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[20px] w-full">
        <Input1
          placeholder="ზედმეტსახელი"
          name="nickname"
          type="text"
          firstValue={user?.nickname}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="სახელი"
          name="name"
          type="text"
          firstValue={user?.name}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="გვარი"
          name="surname"
          type="text"
          firstValue={user?.surname}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          firstValue={user?.email}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="ტელეფონის ნომერი"
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
          error={false}
        />
        <Input1
          placeholder="მისამართი"
          name="address"
          type="text"
          firstValue={user?.address}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="იურიდიული მისამართი"
          name="legal_address"
          type="text"
          firstValue={user?.legal_address}
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="პაროლი"
          isPassword={true}
          name="password"
          setAllValues={setupdateUserValues}
          error={false}
        />
        <Input1
          placeholder="გაიმეორე"
          isPassword={true}
          name="rePassword"
          setAllValues={setupdateUserValues}
          error={false}
        />
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
