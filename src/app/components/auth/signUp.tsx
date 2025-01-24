"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Input1 from "../Inputs/Input1";
import CheckBox from "../Inputs/CheckBox";
import GreenButton from "../buttons/greenButton";
import Image from "next/image";

export default function SignUp() {
  const { setActiveAuthorization, setAlertShow, setAlertStatus, setAlertText } =
    useContext(ContextForSharingStates);
  const [userSignUpLoader, setUserSignUpLoader] = useState<boolean>(false);
  const [userSignUpValues, setUserSignUpValues] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",

    confirmLaws: false,
  });

  const handleInputKeyPressSignUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleUserSignUp();
    }
  };

  const HandleUserSignUp = () => {
    setUserSignUpLoader(true);
    if (
      userSignUpValues.name &&
      userSignUpValues.surname &&
      userSignUpValues.email &&
      userSignUpValues.phone &&
      userSignUpValues.password &&
      userSignUpValues.rePassword &&
      userSignUpValues.password === userSignUpValues.rePassword
    ) {
      axiosUser
        .post("userAuth/singUp", {
          name: userSignUpValues.name,
          surname: userSignUpValues.surname,
          email: userSignUpValues.email,
          phone: userSignUpValues.phone && userSignUpValues.phone?.replace(/\s/g, ""),
          password: userSignUpValues.password,
        })
        .then((res) => {
          setUserSignUpValues({
            name: "",
            surname: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
            confirmLaws: false,
          });
          setActiveAuthorization("signin");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("რეგისტრაცია წარმატებით შესრულდა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("რეგისტრაცია ვერ შესრულდა");
        })
        .finally(() => {
          setUserSignUpLoader(false);
        });
    } else {
      setUserSignUpLoader(false);
    }
  };
  return (
    <div
      className={`flex flex-col gap-y-[16px] px-[30px] max-tiny:p-[20px] py-[40px] m duration-100 ${
        userSignUpLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="hidden max-tiny:flex flex-col">
        <h1 className="text-[22px]">საკონტაქტო ფორმა</h1>
        <p className="text-[14px]">შეავსე ფორმა, რათა დაგვიკავშირდეთ</p>
      </div>
      <div className={`flex flex-col gap-y-[16px]`}>
        <Input1
          placeholder="სახელი"
          name="name"
          type="text"
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="გვარი"
          name="surname"
          type="text"
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="ტელეფონის ნომერი"
          name="phone"
          type="text"
          isNumber={true}
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="პაროლი"
          isPassword={true}
          name="password"
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="გაიმეორე"
          isPassword={true}
          name="rePassword"
          setAllValues={setUserSignUpValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
      </div>

      <div
        onClick={() => {
          setUserSignUpValues((pre: any) => ({
            ...pre,
            confirmLaws: !userSignUpValues.confirmLaws,
          }));
        }}
        className="flex items-center gap-[10px] cursor-pointer"
      >
        <CheckBox active={userSignUpValues.confirmLaws} />
        <p className="text-[14px]">ვეთანხმები წესებსა და პირობებს</p>
      </div>

      <GreenButton
        name="რეგისტრაცია"
        action={HandleUserSignUp}
        loader={userSignUpLoader}
        style="h-[56px] text-[18px]"
      />

      <h1 className="text-center text-[#8A8A8A] mt-[10px] max-tiny:text-[12px]">
        ან დარეგისტრირდი შემდეგი ანგარიშებით:
      </h1>
      <div className="flex items-center justify-center gap-[30px]">
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <div className="w-[30px] h-[30px] relative">
            <Image
              src="/images/appleicn.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <div className="w-[30px] h-[30px] relative">
            <Image
              src="/images/facebookicn.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <div className="w-[30px] h-[30px] relative">
            <Image
              src="/images/googleicn.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
      <p className="text-[14px] text-[#8A8A8A] text-center max-tiny:text-[10px]">
        რეგისტრაციის ღილაკზე დაჭერით, შენ ეთანხმები ჩვენს წესებსა და პირობებს და
        კონფიდენციალურობის პოლიტიკას. ჩვენ არ გადავცემთ შენს პირად ინფორმაციას
        მესამე პირს. არც სპამ-მეილებით შეგაწუხებთ.
      </p>
    </div>
  );
}
