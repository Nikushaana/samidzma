import Image from "next/image";
import React from "react";
import { FaTree } from "react-icons/fa";
import GreenButton from "../buttons/greenButton";

export default function CatalogSetCard({ item }: any) {
  return (
    <div className="rounded-[12px] bg-myBlack p-[20px] flex gap-[70px]">
      <div className="relative w-[60%] h-[303px] rounded-[8px] overflow-hidden">
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

      <div className="flex flex-col justify-evenly w-[40%] gap-y-[10px] ">
        <h1 className="text-[28px] text-white">Set Holiday accessories</h1>

        <div className="w-full flex items-end">
          <div className="bg-myGreen w-[40%] h-[4px] rounded-[8px]"></div>
          <div className="bg-white w-[60%] h-[1px]"></div>
        </div>

        <ul className="grid grid-cols-3 text-white text-[14px] list-disc marker:text-myYellow list-inside justify-between">
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
          <li>product #1</li>
        </ul>

        <div className="flex items-end gap-[20px]">
          <h1 className="text-white text-[34px]">45.00₾</h1>
          <p className="line-through text-[#A1A5A5] text-[20px] mb-[5px]">
            45.00₾
          </p>
        </div>

        <GreenButton name="Shop now" style="h-[56px] max-tiny:h-[48px] max-w-[280px] text-[18px]" />
      </div>
    </div>
  );
}
