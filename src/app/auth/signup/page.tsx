"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Image from "next/image";
import * as Yup from "yup";
import Input1 from "@/app/components/Inputs/Input1";
import CheckBox from "@/app/components/Inputs/CheckBox";
import GreenButton from "@/app/components/buttons/greenButton";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const router = useRouter();
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

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    name: Yup.string().required("სახელი სავალდებულოა"),
    surname: Yup.string().required("გვარი სავალდებულოა"),
    email: Yup.string().required("მეილი სავალდებულოა"),
    phone: Yup.string().required("ტელეფონის ნომერი სავალდებულოა"),
    password: Yup.string()
      .required("პაროლი სავალდებულოა")
      .oneOf([Yup.ref("rePassword")], "პაროლები უნდა ემთხვეოდეს"),
    rePassword: Yup.string()
      .required("პაროლის განმეორება სავალდებულოა")
      .oneOf([Yup.ref("password")], "პაროლები უნდა ემთხვეოდეს"),
  });

  const handleUserSignUpValidation = () => {
    validationSchema
      .validate(userSignUpValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleUserSignUp();
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

  const handleInputKeyPressSignUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleUserSignUpValidation();
    }
  };

  const HandleUserSignUp = () => {
    setUserSignUpLoader(true);

    axiosUser
      .post("userAuth/singUp", {
        name: userSignUpValues.name,
        surname: userSignUpValues.surname,
        email: userSignUpValues.email,
        phone:
          userSignUpValues.phone && userSignUpValues.phone?.replace(/\s/g, ""),
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
        router.push("/auth/signin");
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
          error={errors.name}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="გვარი"
          name="surname"
          type="text"
          setAllValues={setUserSignUpValues}
          error={errors.surname}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          setAllValues={setUserSignUpValues}
          error={errors.email}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="ტელეფონის ნომერი"
          name="phone"
          type="text"
          isNumber={true}
          setAllValues={setUserSignUpValues}
          error={errors.phone}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="პაროლი"
          isPassword={true}
          name="password"
          setAllValues={setUserSignUpValues}
          error={errors.password}
          handleInputKeyPress={handleInputKeyPressSignUp}
        />
        <Input1
          placeholder="გაიმეორე"
          isPassword={true}
          name="rePassword"
          setAllValues={setUserSignUpValues}
          error={errors.rePassword}
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
        action={handleUserSignUpValidation}
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
