"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsCart3, BsList, BsXLg } from "react-icons/bs";
import { FaRegCommentAlt, FaRegHeart } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { IoEyeOutline, IoSearchOutline } from "react-icons/io5";
import { PiHouseThin } from "react-icons/pi";
import { RiCoupon2Line } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { TfiCommentAlt } from "react-icons/tfi";
import WhatUSearch from "../components/Inputs/WhatUSearch";
import { UserContext } from "../../../dataFetchs/UserAxios";
import { WishListAxiosContext } from "../../../dataFetchs/wishListContext";
import EverySlider from "../components/sliders/EverySlider";
import { IoIosArrowDown } from "react-icons/io";
import useScreenWidth from "../components/ScreenWidth";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";
import useProducts from "../../../dataFetchs/productsContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { handelLogOutUser, user } = useContext(UserContext);

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { WishListCounter } = useContext(WishListAxiosContext);

  const { productsData, productsLoader } = useProducts();

  const dropRef = useRef<HTMLDivElement>(null);
  const [userRoutes, setUserRoutes] = useState([
    {
      id: 1,
      icon: <PiHouseThin />,
      routeName: "ჩემი გვერდი",
      url: "main",
    },
    {
      id: 2,
      icon: <BsCart3 />,
      routeName: "შეკვეთები",
      url: "orders",
    },
    {
      id: 3,
      icon: <RiCoupon2Line />,
      routeName: "კუპონები",
      url: "coupons",
    },
    {
      id: 4,
      icon: <FaRegHeart />,
      routeName: "რჩეულები",
      url: "favorites",
    },
    {
      id: 5,
      icon: <FaRegCommentAlt />,
      routeName: "შეფასებები",
      url: "comments",
    },
    {
      id: 6,
      icon: <IoEyeOutline />,
      routeName: "ნანახი პროდუქტები",
      url: "seen-products",
    },
    {
      id: 7,
      icon: <GoPerson />,
      routeName: "პირადი ინფორმაცია",
      url: "my-info",
    },
  ]);

  const pathname = usePathname();
  const router = useRouter();
  const screenWidth = useScreenWidth();

  const [userPanelMenu, setUserPanelMenu] = useState<boolean>(true);

  useEffect(() => {
    if (screenWidth > 992) {
      setUserPanelMenu(true);
    } else {
      setUserPanelMenu(false);
    }
  }, [screenWidth]);

  const [dropDownMenu, setDropDownMenu] = useState<boolean>(false);
  const [dropHeight, setDropHeight] = useState(0);

  useEffect(() => {
    setDropDownMenu(false);
  }, [pathname]);

  useEffect(() => {
    if (dropDownMenu && dropRef.current) {
      setDropHeight(dropRef.current.clientHeight);
    }
  }, [dropDownMenu]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] pb-[100px] flex flex-col gap-y-[100px] relative">
        <div className="flex flex-col gap-y-[30px] max-lg:gap-y-[25px]">
          <WhatUSearch />

          <div
            className={`hidden max-tiny:flex flex-col bg-white rounded-[33px] ${
              user?.id ? "" : "opacity-[0.8] pointer-events-none"
            }`}
          >
            <div
              onClick={() => {
                setDropDownMenu((pre) => !pre);
              }}
              className="h-[56px] bg-myGreen rounded-[33px] text-white flex items-center justify-between px-[35px]"
            >
              <div className="flex items-center gap-[20px]">
                <div className="text-[25px] ">
                  {
                    userRoutes.find(
                      (route: any) => route.url === pathname.split("/")[2]
                    )?.icon
                  }
                </div>
                <p className={`text-[18px] duration-200 `}>
                  {
                    userRoutes.find(
                      (route: any) => route.url === pathname.split("/")[2]
                    )?.routeName
                  }
                </p>
              </div>
              <IoIosArrowDown
                className={`text-[25px] duration-200 ${
                  dropDownMenu && "rotate-[180deg]"
                }`}
              />
            </div>

            <div
              style={{
                height: `${dropDownMenu ? dropHeight : 0}px`,
              }}
              className={`duration-200 ${
                dropDownMenu ? "opacity-1" : "opacity-0"
              }`}
            >
              <div
                ref={dropRef}
                className="flex flex-col gap-y-[20px] w-full bg-white px-[35px] pb-[35px] pt-[10px] rounded-[33px]"
              >
                {userRoutes
                  .filter((route: any) => route.url !== pathname.split("/")[2])
                  .map((item, index: number) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        router.push(`/user/${item.url}`);
                      }}
                      className="flex items-center gap-[20px] cursor-pointer"
                    >
                      <div className="text-[25px] text-[#9FA1A1]">
                        {item.icon}
                      </div>
                      <h1
                        className={`text-[18px] duration-200 text-[#9FA1A1] hover:text-myBlack`}
                      >
                        {item.routeName}
                      </h1>
                    </div>
                  ))}
                <div
                  onClick={() => {
                    handelLogOutUser();
                  }}
                  className="flex items-center gap-[15px] mt-[30px] cursor-pointer text-myPink"
                >
                  <div className="text-[25px] w-[30px] rotate-[180deg]">
                    <SlLogout />
                  </div>
                  <h1 className={`text-[18px] duration-200 `}>გამოსვლა </h1>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`rounded-[12px] p-[20px] max-tiny:p-0 max-tiny:bg-transparent h-full bg-white flex max-lg:flex-col gap-[100px] max-2xl:gap-[50px] max-lg:gap-y-[10px] items-center justify-between ${
              user?.id ? "" : "opacity-[0.8] pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-[10px] justify-between w-full max-tiny:bg-white max-tiny:rounded-[12px] max-tiny:p-[10px]">
              <div className="relative h-[114px] max-lg:h-[96px] max-tiny:h-[53px] aspect-square rounded-full overflow-hidden bg-[#EEEEEE] flex items-center justify-center text-[55px] max-tiny:text-[30px] text-white">
                {user?.img ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.img}`}
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <GoPerson />
                )}
              </div>
              <div className="bg-myYellow flex flex-col items-center rounded-[12px] py-[20px] max-tiny:py-[10px] px-[40px] max-tiny:px-[10px]">
                <p className="text-[14px]">ბონუსები</p>
                <h1 className="text-[34px] max-tiny:text-[24px]">
                  {user?.points || 0}₾
                </h1>
              </div>
              <div className="flex flex-col gap-y-[5px]">
                <div className="flex items-center justify-between text-[14px] gap-[30px] max-tiny:gap-[10px]">
                  <div className="flex items-center gap-[10px] text-[#9FA1A1]">
                    <BsCart3 className="text-[17px]" />
                    <p className="text-[14px] max-lg:text-[12px]">შეკვეთები</p>
                  </div>
                  <h1>0</h1>
                </div>
                <div className="flex items-center justify-between text-[14px] gap-[30px] max-tiny:gap-[10px]">
                  <div className="flex items-center gap-[10px] text-[#9FA1A1]">
                    <FaRegCommentAlt className="text-[16px]" />
                    <p className="text-[14px] max-lg:text-[12px]">
                      კომენტარები
                    </p>
                  </div>
                  <h1>0</h1>
                </div>
                <div className="flex items-center justify-between text-[14px] gap-[30px] max-tiny:gap-[10px]">
                  <div className="flex items-center gap-[10px] text-[#9FA1A1]">
                    <FaRegHeart className="text-[17px]" />
                    <p className="text-[14px] max-lg:text-[12px]">რჩეულები</p>
                  </div>
                  <h1>{WishListCounter}</h1>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] h-full max-lg:w-full bg-myGreen text-white p-[20px] max-tiny:py-[10px] flex items-center justify-between gap-[20px] max-tiny:gap-[10px]">
              <div className="relative w-[88px] max-tiny:w-[50px] aspect-square">
                <Image
                  src="/images/mainWhiteLogo.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="text-[14px] max-tiny:text-[12px] w-[174px] max-lg:w-[50%]">
                მიიღე მონაწილეობა საზაფხულო აქციაში და დასაჩუქრდი 500 ქულიანი
                ბონუსით
              </p>
              <div className="flex items-center gap-[20px] max-tiny:gap-0">
                <div className="relative w-[70px] max-tiny:w-[30px] aspect-square self-end">
                  <Image
                    src="/images/starsimg1-2.png"
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="relative w-[80px]  max-tiny:w-[40px] aspect-square self-start">
                  <Image
                    src="/images/starsimg2-2.png"
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
          <div className="flex gap-[25px] max-tiny:gap-[10px] ">
            <div
              className={`rounded-[12px] bg-white flex flex-col justify-between py-[60px] max-lg:py-[40px] duration-200 max-tiny:hidden ${
                userPanelMenu
                  ? `w-[330px] max-lg:w-[233px] px-[30px] max-lg:px-[20px]`
                  : "w-[40px]"
              } ${user?.id ? "" : "opacity-[0.8]"}`}
            >
              <div
                className={`flex flex-col gap-y-[30px] sticky top-[30px] w-full`}
              >
                {userRoutes.map((item, index: number) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (user?.id) {
                        router.push(`/user/${item.url}`);
                      } else {
                        setAlertShow(true);
                        setAlertStatus(false);
                        setAlertText(
                          "ინფორმაციის სანახავად გაიარე ავტორიზაცია!"
                        );
                      }
                    }}
                    className="flex items-center gap-[20px] max-lg:gap-[13px] cursor-pointer w-full"
                  >
                    <div
                      className={`text-[25px] max-lg:text-[22px] text-[#9FA1A1] ${
                        userPanelMenu
                          ? ""
                          : "w-full flex items-center justify-center"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <h1
                      className={`text-[18px] max-lg:text-[14px] duration-200 ${
                        userPanelMenu ? "flex" : "hidden"
                      } ${
                        pathname.split("/")[2] === item.url
                          ? "text-myBlack"
                          : "text-[#9FA1A1] hover:text-myBlack"
                      }`}
                    >
                      {item.routeName}
                    </h1>
                  </div>
                ))}
                {user?.id && (
                  <div
                    onClick={() => {
                      handelLogOutUser();
                    }}
                    className="flex items-center gap-[20px] max-lg:gap-[13px] mt-[30px] cursor-pointer text-myPink"
                  >
                    <div
                      className={`text-[25px] max-lg:text-[22px] ml-[3px] rotate-[180deg] ${
                        userPanelMenu
                          ? ""
                          : "w-full flex items-center justify-center"
                      }`}
                    >
                      <SlLogout />
                    </div>
                    <h1
                      className={`text-[18px] max-lg:text-[14px] duration-200 ${
                        userPanelMenu ? "flex" : "hidden"
                      }`}
                    >
                      გამოსვლა
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div
              className={`rounded-[12px] bg-white max-lg:bg-transparent ${
                screenWidth && screenWidth < 992
                  ? `w-[calc(100%-65px)] max-tiny:w-full`
                  : "w-[calc(100%-355px)] max-lg:w-[calc(100%-233px)] p-[20px]"
              }`}
            >
              {children}
            </div>
          </div>
        </div>

        <div className="p-[30px] max-lg:p-0">
          <EverySlider
            data={productsData}
            loader={productsLoader}
            title={
              <h1 className="text-[28px] max-tiny:text-[22px]">
                შეიძლება ამ პროდუქტებით დაინტერესდე
              </h1>
            }
            card="ProductCard"
            slidesPerView={4}
            spaceBetween={17}
            showButtons={true}
          />
        </div>
      </div>
    </div>
  );
}
