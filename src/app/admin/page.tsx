"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMailOutline } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { IoIosReturnLeft } from "react-icons/io";
import Input1 from "../components/Inputs/Input1";
import DotsLoader from "../components/loaders/DotsLoader";
import { axiosAdmin } from "../../../dataFetchs/AxiosToken";
import { UserContext } from "../../../dataFetchs/UserAxios";
import GreenButton from "../components/buttons/greenButton";

export default function Page() {
  const { admin, setAdmin, setAdminTokenInLocal } = useContext(UserContext);

  const router = useRouter();

  const [adminAuthLoader, setAdminAuthLoader] = useState<boolean>(false);
  const [adminAuthValues, setAdminAuthValues] = useState({
    email: "",
    password: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAdminAuth();
    }
  };

  useEffect(() => {
    if (admin.id) {
      router.push("/admin/panel/vacancy");
    }
  }, [admin]);

  const HandleAdminAuth = () => {
    setAdminAuthLoader(true);
    if (adminAuthValues.email && adminAuthValues.password) {
      axiosAdmin
        .post("adminAuth/loginAdmin", {
          email: adminAuthValues.email,
          password: adminAuthValues.password,
        })
        .then((res) => {
          setAdmin(res.data.admin);
          setAdminTokenInLocal(res.data.access_token);

          setAdminAuthValues({
            email: "",
            password: "",
          });
          router.push("/admin/panel/vacancy");
        })
        .catch((err) => {})
        .finally(() => {
          setAdminAuthLoader(false);
        });
    } else {
      setAdminAuthLoader(false);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="rounded-[12px] bg-white max-w-[684px] w-full flex flex-col items-center gap-y-[16px] px-[30px] py-[40px]">
        <Link href={"/"} className="w-[130px] h-[94px] relative">
          <Image
            src="/images/siteLogo.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Link>

        <Input1
          placeholder="ელ-ფოსტა"
          name="email"
          type="text"
          setAllValues={setAdminAuthValues}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          placeholder="პაროლი"
          name="password"
          setAllValues={setAdminAuthValues}
          isPassword={true}
          handleInputKeyPress={handleInputKeyPress}
        />

        <GreenButton
          name="შესვლა"
          action={HandleAdminAuth}
          loader={adminAuthLoader}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
