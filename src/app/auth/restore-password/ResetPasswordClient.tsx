"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Input1 from "@/app/components/Inputs/Input1";
import GreenButton from "@/app/components/buttons/greenButton";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

export default function ResetPasswordClient({ token }: any) {
  const router = useRouter();

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );

  const [resetPasswordLoader, setResetPasswordLoader] = useState<boolean>(true);
  const [resetPasswordValues, setResetPasswordValues] = useState({
    token: "",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    setResetPasswordLoader(true);
    if (token) {
      setResetPasswordValues((prev) => ({ ...prev, token }));
      setResetPasswordLoader(false);
    }
  }, [token]);

  const [resetPasswordErrors, setResetPasswordErrors] = useState<any>({});

  const resetPasswordValidationSchema = Yup.object({
    token: Yup.string().required("ტოკენი ვერ მოიძებნა!"),
    password: Yup.string()
      .oneOf([Yup.ref("rePassword")], "პაროლები უნდა ემთხვეოდეს")
      .required("ჩაწერე პაროლი"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "პაროლები უნდა ემთხვეოდეს")
      .required("გაიმეორე პაროლი"),
  });

  const handleResetPasswordValidation = () => {
    resetPasswordValidationSchema
      .validate(resetPasswordValues, { abortEarly: false })
      .then(() => {
        setResetPasswordErrors({});
        HandleResetPassword();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setResetPasswordErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(
          newErrors.password || newErrors.rePassword || newErrors.token,
        );
      });
  };

  const HandleResetPassword = () => {
    setResetPasswordLoader(true);
    axiosUser
      .post("userAuth/restorePassword/updatePassword", {
        token: resetPasswordValues.token,
        password: resetPasswordValues.password,
      })
      .then((res) => {
        router.push(`/auth/signin`);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("პაროლი წარმატებით განახლდა");
      })
      .catch((err) => {
        setResetPasswordLoader(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("პაროლი ვერ განახლდა!");
      })
      .finally(() => {});
  };
  return (
    <div
      className={`flex flex-col gap-y-[16px] px-[30px] max-sm:p-[20px] py-[40px] duration-100 ${
        resetPasswordLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <div className="hidden max-sm:flex flex-col">
        <h1 className="text-[22px]">ჩაწერე ახალი პაროლი</h1>
        <p className="text-[14px]">გაიმეორე ახალი პაროლი სწორად</p>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <Input1
          placeholder="ახალი პაროლი"
          name="password"
          isPassword={true}
          type="text"
          setAllValues={setResetPasswordValues}
          error={resetPasswordErrors.password}
        />
        <Input1
          placeholder="გაიმეორე პაროლი"
          name="rePassword"
          isPassword={true}
          type="text"
          setAllValues={setResetPasswordValues}
          error={resetPasswordErrors.rePassword}
        />
      </div>

      <GreenButton
        name={"განახლება"}
        action={handleResetPasswordValidation}
        loader={resetPasswordLoader}
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
