"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { GoPerson } from "react-icons/go";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function Header() {
  const { user } = useContext(UserContext);

  const { setBurgerMenu, menuRoutes, setFilterValues, slugify } = useContext(
    ContextForSharingStates
  );
  const { FrontCategoriesData } = useFrontCategories();
  const { WishListCounter, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  const { CartCounter, CartLocalStorageData } = useContext(CartAxiosContext);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const saleParam = searchParams.get("sale");

  return (
    <div className="flex flex-col items-center">
      <div
        className={`max-w-[1920px] w-full items-center justify-between py-[12px] px-[264px] max-lg:px-[90px] max-sm:px-[25px] mb-[10px] ${
          pathname.split("/")[1] === "products" ||
          pathname.split("/")[1] === "category" ||
          pathname.split("/")[1] === "category-for-set"
            ? "max-2xl:pl-[160px] max-2xl:pr-[90px]"
            : "max-2xl:px-[160px]"
        } ${pathname.split("/")[1] === "admin" ? "hidden" : "flex"}`}
      >
        <Link
          href={"/"}
          className="w-[88px] max-lg:w-[71px] aspect-square relative"
        >
          <Image
            src="/images/sitelogonew.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
        <div className="flex items-center max-lg:gap-[32px] max-sm:gap-[20px] relative">
          <div className="h-[56px] p-[6px] max-lg:px-[40px] max-sm:px-[25px]  flex items-center gap-[40px] max-2xl:gap-[20px] rounded-full bg-myBlack text-white">
            <ul className="flex items-center gap-[5px] h-full max-lg:hidden">
              {menuRoutes.map((item: any, index: number) => (
                <li
                  key={item.id}
                  onClick={() => {
                    if (
                      item.link == "category" ||
                      item.link == "category-for-set"
                    ) {
                      setFilterValues((prev: any) => ({
                        ...prev,
                        key: "",
                        sale: 0,
                      }));

                      setTimeout(() => {
                        router.push(
                          `/${
                            item.link == "category"
                              ? "category"
                              : item.link == "category-for-set" &&
                                "category-for-set"
                          }/${
                            item.link == "category"
                              ? slugify(
                                  FrontCategoriesData.filter(
                                    (item: any) =>
                                      item.ProdSaxeobaName !== "ნაკრებები"
                                  )[0]?.ProdSaxeobaName
                                ) +
                                "_" +
                                FrontCategoriesData.filter(
                                  (item: any) =>
                                    item.ProdSaxeobaName !== "ნაკრებები"
                                )[0]?.IdProdSaxeoba
                              : item.link == "category-for-set" &&
                                slugify(
                                  FrontCategoriesData.find(
                                    (item: any) =>
                                      item.ProdSaxeobaName == "ნაკრებები"
                                  ).ProdSaxeobaName
                                ) +
                                  "_" +
                                  FrontCategoriesData.find(
                                    (item: any) =>
                                      item.ProdSaxeobaName == "ნაკრებები"
                                  ).IdProdSaxeoba
                          }?key=&sale=0`
                        );
                      }, 0);
                    } else if (item.link == "sale") {
                      setFilterValues((prev: any) => ({
                        ...prev,
                        key: "",
                        sale: 1,
                      }));

                      setTimeout(() => {
                        router.push(`/category?key=&sale=1`);
                      }, 0);
                    } else {
                      router.push(`/${item.link}`);
                    }
                  }}
                  className={`h-full rounded-full text-[14px] cursor-pointer flex items-center px-[25px] max-2xl:pr-[15px] ${
                    saleParam === "1"
                      ? item.link === "sale"
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
            <div className="flex items-center gap-[20px] max-sm:gap-[30px]">
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
