"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Input1 from "../Inputs/Input1";
import CheckBox from "../Inputs/CheckBox";
import GreenButton from "../buttons/greenButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserContext } from "../../../../dataFetchs/UserAxios";

export default function SignIn() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { setUser, setUserTokenInLocal } = useContext(UserContext);
  const router = useRouter();

  const [userSignInLoader, setUserSignInLoader] = useState<boolean>(false);
  const [userSignInValues, setUserSignInValues] = useState({
    email: "",
    password: "",

    confirmLaws: false,
  });

  const handleInputKeyPressSignIn = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleUserSignIn();
    }
  };

  const HandleUserSignIn = () => {
    setUserSignInLoader(true);
    if (userSignInValues.email && userSignInValues.password) {
      axiosUser
        .post("userAuth/login", {
          email: userSignInValues.email,
          password: userSignInValues.password,
        })
        .then((res) => {
          setUserTokenInLocal(res.data.token);
          setUser(res.data.user);

          router.push("/");
          setUserSignInValues({
            email: "",
            password: "",
            confirmLaws: false,
          });
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("შესვლა წარმატებით შესრულდა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("შესვლა ვერ შესრულდა");
        })
        .finally(() => {
          setUserSignInLoader(false);
        });
    } else {
      setUserSignInLoader(false);
    }
  };
  return (
    <div
      className={`flex flex-col gap-y-[16px] px-[30px] max-tiny:p-[20px] py-[40px] duration-100 ${
        userSignInLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="hidden max-tiny:flex flex-col">
        <h1 className="text-[22px]">საკონტაქტო ფორმა</h1>
        <p className="text-[14px]">შეავსე ფორმა, რათა დაგვიკავშირდეთ</p>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          setAllValues={setUserSignInValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignIn}
        />
        <Input1
          placeholder="პაროლი"
          isPassword={true}
          name="password"
          setAllValues={setUserSignInValues}
          error={false}
          handleInputKeyPress={handleInputKeyPressSignIn}
        />
      </div>

      <div
        onClick={() => {
          setUserSignInValues((pre: any) => ({
            ...pre,
            confirmLaws: !userSignInValues.confirmLaws,
          }));
        }}
        className="flex items-center gap-[10px] cursor-pointer self-start"
      >
        <CheckBox active={userSignInValues.confirmLaws} />
        <p className="text-[14px]">ვეთანხმები წესებსა და პირობებს</p>
      </div>

      <GreenButton
        name={"ავტორიზაცია"}
        action={HandleUserSignIn}
        loader={userSignInLoader}
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
    </div>
  );
}
