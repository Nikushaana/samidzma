"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import ImgUploader from "@/app/components/Uploaders/ImgUploader";
import Image from "next/image";

export default function Page({ params }: { params: { userId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllAdminUsersRender,
  } = useContext(ContextForSharingStates);
  const [loaderEditAdminUser, setLoaderEditAdminUser] = useState<boolean>(true);

  const [oneAdminUserValues, setOneAdminUserValues] = useState<any>({});
  const [editAdminUserValues, setEditAdminUserValues] = useState({
    img: "",

    name: "",
    nickname: "",
    surname: "",

    password: "",

    phone: "",
    email: "",
    card_number: "",

    balance: "",
    points: "",

    address: "",
    legal_address: "",
    citizen: "",
    city_code: "",

    comment: "",
    dgg_pay: "",

    sagad: "",
  });

  useEffect(() => {
    setLoaderEditAdminUser(true);
    axiosAdmin
      .get(`admin/user/${params.userId}`)
      .then((res) => {
        setOneAdminUserValues(res.data);
        setLoaderEditAdminUser(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.userId]);

  const HandleEditAdminUser = (e: any) => {
    e.preventDefault();
    setLoaderEditAdminUser(true);
    
    if (true) {
      const form = e.target;
      const formData = new FormData(form);


      formData.delete("phone"),
        formData.append("phone", editAdminUserValues.phone.replace(/\s/g, ""));

      axiosAdmin
        .post(`admin/user/${params.userId}`, formData)
        .then((res) => {
          router.push("/admin/panel/users");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით რედაქტირდა");
          setAllAdminUsersRender(res);
        })
        .catch((err) => {
          setLoaderEditAdminUser(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ რედაქტირდა!");
        })
        .finally(() => {});
    } else {
      setLoaderEditAdminUser(false);
    }
  };

  return (
    <form
      onSubmit={HandleEditAdminUser}
      encType="multipart/form-data"
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditAdminUser && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">მომხმარებლის რედაქტირება</h1>
      {oneAdminUserValues?.img?.length > 0 && (
        <div className=" grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4">
          <div className="relative w-full aspect-video bg-white rounded-[8px] overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${oneAdminUserValues?.img}`}
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
        setAllValues={setEditAdminUserValues}
      />
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="სახელი"
          name="name"
          type="text"
          firstValue={oneAdminUserValues.name}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ზედმეტსახელი"
          name="nickname"
          type="text"
          firstValue={oneAdminUserValues.nickname}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="გვარი"
          name="surname"
          type="text"
          firstValue={oneAdminUserValues.surname}
          setAllValues={setEditAdminUserValues}
          error={false}
        />

        <Input1
          title="ტელეფონის ნომერი"
          name="phone"
          type="text"
          isNumber={true}
          firstValue={oneAdminUserValues.phone
            ?.replace(/[^0-9]/g, "")
            .replace(/\s/g, "")
            .replace(/(.{3})/g, "$1 ")
            .trim()
            .slice(0, 11)}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ელ. ფოსტა"
          name="email"
          type="text"
          firstValue={oneAdminUserValues.email}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="პაროლი"
          name="password"
          type="text"
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ბარათის ნომერი"
          name="card_number"
          type="text"
          firstValue={oneAdminUserValues.card_number}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ბალანსი"
          name="balance"
          type="text"
          firstValue={oneAdminUserValues.balance}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ქულები"
          name="points"
          type="text"
          firstValue={oneAdminUserValues.points}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="მისამართი"
          name="address"
          type="text"
          firstValue={oneAdminUserValues.address}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="იურიდიული მისამართი"
          name="legal_address"
          type="text"
          firstValue={oneAdminUserValues.legal_address}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="მოქალაქეობა"
          name="citizen"
          type="text"
          firstValue={oneAdminUserValues.citizen}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="ქალაქის კოდი"
          name="city_code"
          type="text"
          firstValue={oneAdminUserValues.city_code}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="კომენტარი"
          name="comment"
          type="text"
          firstValue={oneAdminUserValues.comment}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="dgg_pay"
          name="dgg_pay"
          type="text"
          firstValue={oneAdminUserValues.dgg_pay}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
        <Input1
          title="საგადასახადო"
          name="sagad"
          type="text"
          firstValue={oneAdminUserValues.sagad}
          setAllValues={setEditAdminUserValues}
          error={false}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          button={true}
          loader={loaderEditAdminUser}
          style="h-[50px] text-[18px]"
        />
      </div>
    </form>
  );
}
