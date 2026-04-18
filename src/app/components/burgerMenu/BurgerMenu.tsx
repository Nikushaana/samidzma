"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { GoPerson } from "react-icons/go";
import { fetchCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";
import { buildCategoryRoute } from "@/utils/routes/buildCategoryRoute";

export default function BurgerMenu() {
  const { burgerMenu, setBurgerMenu, menuRoutes, filterValues, slugify } =
    useContext(ContextForSharingStates);

  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const { user } = useContext(UserContext);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const saleParam = searchParams.get("sale");

  return (
    <div
      className={`px-[200px] max-lg:px-[90px] max-sm:px-[25px] pt-[12px] w-[100vw] h-[100vh] duration-300 bg-myGreen fixed flex flex-col gap-y-[20px] top-0 z-20 ${
        burgerMenu ? "left-0 " : "left-[-100vw]"
      }`}
    >
      <div className="flex flex-col gap-y-[20px]">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="w-[88px] max-lg:w-[71px] aspect-square relative"
          >
            <Image
              src="/images/mainWhiteLogo.png"
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </Link>

          <div className="flex items-center gap-[20px]">
            <div className=" ">
              {!user.id && (
                <div className="flex max-sm:hidden items-center gap-[20px] text-[18px] px-[40px] bg-myBlack text-white rounded-full h-[56px]">
                  <p
                    onClick={() => {
                      router.push("/auth/signin");
                    }}
                    className="cursor-pointer"
                  >
                    ავტორიზაცია
                  </p>
                  <div className="h-[15px] w-[1px] bg-white"></div>
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

            <div
              onClick={() => {
                setBurgerMenu(false);
              }}
              className="w-[56px] h-[56px] rounded-full bg-white text-myGreen text-[45px] flex items-center justify-center cursor-pointer"
            >
              <IoClose />
            </div>
          </div>
        </div>
        <div className="hidden max-sm:flex">
          {!user.id && (
            <div className="flex items-center gap-[20px] text-[18px] max-sm:text-[16px] w-full justify-center bg-myBlack text-white rounded-full h-[56px]">
              <p
                onClick={() => {
                  router.push("/auth/signin");
                }}
                className="cursor-pointer"
              >
                ავტორიზაცია
              </p>
              <div className="h-[15px] w-[1px] bg-white"></div>
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
        {user.id && (
          <Link
            href={"/user/main"}
            className="flex items-center justify-center gap-[20px] px-[20px] text-[14px] h-[50px] rounded-full bg-[white] cursor-pointer "
          >
            <div className="relative flex items-center text-[25px] justify-center h-[90%] aspect-square rounded-full overflow-hidden">
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
            <p className="">{user?.name}</p>
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-y-[40px] max-sm:gap-y-[30px]">
        {menuRoutes.map((item: any, index: number) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.link == "category" || item.link == "category-for-set") {
                router.push(
                  buildCategoryRoute(item.link, FrontCategoriesData, slugify),
                );
                return;
              }

              if (item.link == "sale") {
                router.push(`/category?sale=1`);
                return;
              }

              router.push(`/${item.link}`);
            }}
            className={`flex items-center gap-[10px] cursor-pointer ${
              saleParam === "1"
                ? item.link === "sale"
                  ? "text-white"
                  : "gap-[30px] text-[#C6FB94]"
                : pathname.split("/")[1] === item.link
                  ? "text-white"
                  : "gap-[30px] text-[#C6FB94]"
            }`}
          >
            <MdArrowForwardIos
              className={`duration-200 ${
                saleParam === "1"
                  ? item.link === "sale"
                    ? "ml-[50px]"
                    : ""
                  : pathname.split("/")[1] === item.link
                    ? "ml-[50px]"
                    : ""
              }`}
            />
            <p className="text-[22px] max-sm:text-[20px] select-none">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
