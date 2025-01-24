import Image from "next/image";
import React, { useContext, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart, FaTree } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { BiStar } from "react-icons/bi";

export default function CommentsCard({ item }: any) {
  return (
    <div className="rounded-[12px] bg-white p-[25px] self-start flex flex-col items-center gap-[10px]">
      <div className="relative w-[73px] h-[73px] rounded-full overflow-hidden">
        <Image
          src="/images/food.png"
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div className="flex justify-center items-center gap-[5px] bg-myYellow h-[36px] rounded-full px-[8px]">
        <BiStar className="text-[23px]" />
        <h1 className="mt-[2px]">{item?.rounded_star}</h1>
      </div>

      <p className="text-[14px] line-clamp-2 h-[40px]">{item?.review}</p>
    </div>
  );
}
