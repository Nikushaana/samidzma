"use client";

import React, { useContext, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Image from "next/image";
import * as Yup from "yup";
import Input1 from "@/app/components/Inputs/Input1";
import GreenButton from "@/app/components/buttons/greenButton";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

export default function ForgotPassword() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const [verifyUserEmailLoader, setVerifyUserEmailLoader] =
    useState<boolean>(false);
  const [verifyUserEmailValues, setVerifyUserEmailValues] = useState({
    email: "",
  });

  const [verifyErrors, setVerifyErrors] = useState<any>({});

  const verifyValidationSchema = Yup.object({
    email: Yup.string()
      .required("მეილი სავალდებულოა")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/,
        "გთხოვთ, შეიყვანოთ ვალიდური ელ.ფოსტა"
      ),
  });

  const handleVerifyUserEmailValidation = () => {
    verifyValidationSchema
      .validate(verifyUserEmailValues, { abortEarly: false })
      .then(() => {
        setVerifyErrors({});
        HandleVerifyUserEmail();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setVerifyErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.email);
      });
  };

  const HandleVerifyUserEmail = () => {
    setVerifyUserEmailLoader(true);

    axiosUser
      .post("userAuth/restorePassword/code", {
        email: verifyUserEmailValues.email,
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("შეამოწმე მეილი");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("მეილის ვერიფიცირება ვერ მოხდა");
      })
      .finally(() => {
        setVerifyUserEmailLoader(false);
      });
  };
  return (
    <div
      className={`flex flex-col gap-y-[16px] px-[30px] max-sm:p-[20px] py-[40px] duration-100 ${
        verifyUserEmailLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="hidden max-sm:flex flex-col">
        <h1 className="text-[22px]">ჩაწერე შენი მეილი</h1>
        <p className="text-[14px]">შეავსე ფორმა, რათა ლინკი გამოგეგზავნოთ</p>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <Input1
          placeholder="მეილი"
          name="email"
          type="text"
          setAllValues={setVerifyUserEmailValues}
          error={verifyErrors.email}
        />
      </div>

      <GreenButton
        name={"გაგზავნა"}
        action={handleVerifyUserEmailValidation}
        loader={verifyUserEmailLoader}
        style="h-[56px] text-[18px]"
      />

      <h1 className="text-center text-[#8A8A8A] mt-[10px] max-sm:text-[12px]">
        დაგვიკავშირდით ტელეფონის ნომერზე ან სოციალურ ქსელის საშუალებით:
      </h1>
      <div className="flex items-center justify-center gap-[30px]">
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href={`tel:0322047007`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition text-[25px]"
          >
            <BsTelephone />
          </a>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href="https://www.instagram.com/samidzma.ge/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition text-[30px]"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="w-[55px] h-[55px] rounded-[10px] flex items-center justify-center bg-[#EEEEEE]">
          <a
            href="https://www.facebook.com/samidzma.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition text-[30px]"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>
  );
}
