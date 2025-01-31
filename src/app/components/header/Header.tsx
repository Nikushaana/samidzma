"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PiList } from "react-icons/pi";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { BsPerson, BsPlusLg } from "react-icons/bs";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";

export default function Header() {
  const { user } = useContext(UserContext);

  const { setBurgerMenu, menuRoutes } = useContext(
    ContextForSharingStates
  );
  const { WishListCounter, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  const { CartCounter, CartLocalStorageData } = useContext(CartAxiosContext);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <div
        className={`max-w-[1920px] w-full items-center justify-between py-[12px] pl-[340px] pr-[264px] max-lg:px-[90px] max-tiny:px-[25px] mb-[10px] ${
          pathname.split("/")[1] === "products" ||
          pathname.split("/")[1] === "catalog-for-set"
            ? "max-2xl:pl-[160px] max-2xl:pr-[90px]"
            : "max-2xl:pl-[220px] max-2xl:pr-[160px] max-1.5xl:pl-[200px]"
        } ${pathname.split("/")[1] === "admin" ? "hidden" : "flex"}`}
      >
        <Link
          href={"/"}
          className="w-[88px] max-lg:w-[71px] aspect-square relative"
        >
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
        <div className="flex items-center max-lg:gap-[32px] max-tiny:gap-[20px] relative">
          <div className="h-[56px] p-[6px] max-lg:px-[40px] max-tiny:px-[25px]  flex items-center gap-[40px] rounded-full bg-myBlack text-white">
            <ul className="flex items-center gap-[5px] h-full max-lg:hidden">
              {menuRoutes.map((item: any, index: number) => (
                <li
                  key={item.id}
                  onClick={() => {
                    if (item.link) {
                      router.push(
                        item.link === "favorites"
                          ? `/user/${item.link}`
                          : `/${item.link}`
                      );
                    }
                  }}
                  className={`h-full rounded-full text-[14px] cursor-pointer flex items-center px-[25px] ${
                    item.name === "FAQ" && "max-1.5xl:hidden"
                  } ${
                    item.link === "favorites"
                      ? pathname.split("/")[2] === item.link
                        ? "bg-myGreen"
                        : ""
                      : pathname.split("/")[1] === item.link
                      ? "bg-myGreen"
                      : ""
                  }`}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-[20px] max-tiny:gap-[30px]">
              <div
                onClick={() => {
                  router.push("/cart");
                }}
                className="relative w-[30px] h-[25px] cursor-pointer "
              >
                <Image
                  src="/images/cart.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="absolute top-[-8px] right-[-12px] bg-myGreen text-white w-[21px] h-[21px] rounded-full flex items-center justify-center">
                  {user?.id ? CartCounter : CartLocalStorageData.length}
                </p>
              </div>
              <div
                onClick={() => {
                  router.push("/user/favorites");
                }}
                className="relative w-[30px] h-[25px] cursor-pointer"
              >
                <Image
                  src="/images/heart.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
                <p className="absolute top-[-8px] right-[-12px] bg-myYellow text-black w-[21px] h-[21px] rounded-full flex items-center justify-center">
                  {user?.id ? WishListCounter : WishListLocalStorageData.length}
                </p>
              </div>
            </div>
            <div className="h-full flex items-center max-lg:hidden">
              {user.id ? (
                <Link
                  href={"/user/main"}
                  className="flex items-center gap-[20px] text-[12px] h-full cursor-pointer"
                >
                  <p className="pl-[20px]">{user?.name}</p>
                  <div className="relative h-full aspect-square flex items-center text-[25px] justify-center bg-[#EEEEEE] text-black rounded-full overflow-hidden">
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
                </Link>
              ) : (
                <div className="flex items-center gap-[20px] text-[12px] px-[20px]">
                  <p
                    onClick={() => {
                      router.push("/auth/signin");
                    }}
                    className="cursor-pointer"
                  >
                    ავტორიზაცია
                  </p>
                  <div className="h-[15px] w-[1px] bg-[#656B6B]"></div>
                  <p
                    onClick={() => {
                      router.push("/auth/signup");
                    }}
                    className="cursor-pointer"
                  >
                    რეგისტრაცია
                  </p>
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => {
              setBurgerMenu(true);
            }}
            className="hidden max-lg:flex w-[56px] h-[56px] rounded-full bg-myGreen items-center justify-center cursor-pointer"
          >
            <div className="relative w-[28px] h-[28px]">
              <Image
                src="/images/burgerMenu.png"
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
    </div>
  );
}
