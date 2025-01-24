"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoRibbonOutline } from "react-icons/io5";
import { RiCoupon2Line } from "react-icons/ri";

export default function Page() {
  const [userRoutes, setUserRoutes] = useState([
    {
      id: 1,
      icon: <BsCart3 />,
      routeName: "შეკვეთების ისტორია",
      url: "orders",
    },
    {
      id: 2,
      icon: <FaRegHeart />,
      routeName: "რჩეულები",
      url: "favorites",
    },
    {
      id: 3,
      icon: <IoRibbonOutline />,
      routeName: "ბონუსები",
      url: "bonuses",
    },
    {
      id: 4,
      icon: <RiCoupon2Line />,
      routeName: "კუპონები",
      url: "coupons",
    },
  ]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center my-[100px] max-lg:mb-0 max-lg:mt-[40px] max-tiny:mt-0 gap-y-[100px] max-tiny:gap-y-[50px]">
      <div className="relative max-tiny:order-last flex flex-col items-center justify-center">
        <div className="absolute top-[30px] left-[50%] translate-x-[-220px] max-tiny:translate-x-[-160px] rotate-[270deg] w-[100px] h-[80px] max-tiny:h-[60px]">
          <Image
            src="/images/starsimg.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="relative w-[100px] h-[80px]">
          <Image
            src="/images/starsimg2.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="absolute top-[30px] right-[50%] translate-x-[220px] max-tiny:translate-x-[160px] w-[100px] h-[80px] max-tiny:h-[60px]">
          <Image
            src="/images/starsimg.png"
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h1 className="text-[48px] max-tiny:text-[24px]">გამარჯობა</h1>
        <p className="text-[14px] text-center">
          შენ იმყოფები შენს პირად გვერდზე. აქ ნახავ <br /> ინფორმაციას შენი
          შეკვეთებისა და ნაყიდი პროდუქტების <br /> შესახებ, ასევე ექსკლუზიური
          შეთავაზებებისა და
          <br />
          ბონუსების შესახებ.
        </p>
      </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:w-full gap-[10px] max-w-[810px]">
        {userRoutes.map((item, index: number) => (
          <div
            key={item.id}
            onClick={() => {
              router.push(`/user/${item.url}`);
            }}
            className="flex items-center justify-between px-[20px] rounded-[8px] h-[103px] max-lg:h-[70px] max-tiny:h-[85px] gap-[15px] cursor-pointer border-[1px] border-[#E2E2E2] max-tiny:bg-white"
          >
            <div className="flex items-center gap-[15px] justify-between">
              <div className="text-[25px] w-[30px] text-myGreen">
                {item.icon}
              </div>
              <h1 className={`text-[22px] max-lg:text-[18px]`}>
                {item.routeName}
              </h1>
            </div>
            <IoIosArrowForward className="text-[20px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
