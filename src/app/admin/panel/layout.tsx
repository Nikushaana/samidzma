"use client";

import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { VscListSelection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { IoHomeSharp, IoSettingsSharp } from "react-icons/io5";
import { BsDisplay } from "react-icons/bs";
import { IoIosArrowUp, IoMdPeople } from "react-icons/io";
import { FaHammer, FaMountain, FaPeopleGroup } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { GiCctvCamera, GiReceiveMoney } from "react-icons/gi";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import SideBar from "@/app/components/admin/SideBar";
import { HiBars3BottomLeft } from "react-icons/hi2";
import useScreenWidth from "@/app/components/ScreenWidth";

export default function Layout({ children }: Children) {
  const { userMenu, setUserMenu } = useContext(ContextForSharingStates);
  const screenWidth = useScreenWidth();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-[#f7f9fb] flex w-full min-h-[100vh] ${
        screenWidth && screenWidth < 992 ? "" : ""
      }`}
    >
      <SideBar />
      <div
        className={`relative duration-200 flex flex-col ${
          userMenu
            ? ` ${
                screenWidth && screenWidth < 992
                  ? "mr-[-270px] w-[calc(100%-60px)]"
                  : "w-[calc(100%-270px)]"
              }`
            : "w-[calc(100%-60px)]"
        }`}
      >
        <div
          className={`h-[80px] ${
            userMenu
              ? ` ${
                  screenWidth && screenWidth < 992
                    ? "w-[calc(100%-290px)]"
                    : "w-[calc(100%-290px)]"
                }`
              : "w-[calc(100%-80px)]"
          } flex items-center justify-between px-[30px] max-sm:px-[10px] fixed top-[10px] 
        duration-200 z-[2] ${
          scrollY > 10
            ? "shadow w-[calc(100%-20px)] mx-[10px] rounded-[10px] bg-[white] "
            : "shadow-none w-[calc(100%-20px)] mx-[5px] rounded-[0px] bg-[#f7f9fb] "
        }`}
        >
          <div className={`flex items-center`}>
            <div
              onClick={() => {
                setUserMenu((pre: boolean) => !pre);
              }}
              className="w-[50px] h-[50px] text-[22px] bg-white rounded-full  flex items-center justify-center cursor-pointer hover:shadow-md duration-150"
            >
              <HiBars3BottomLeft />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            if (screenWidth < 992 && userMenu) {
              setUserMenu(false);
            }
          }}
          className={`p-[20px] pt-[100px] `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
