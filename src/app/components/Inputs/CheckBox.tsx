"use client";

import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

export default function CheckBox({ active }: any) {
  return (
    <div
      className={`w-[22px] h-[22px] rounded-[4px] flex items-center bg-[#EEEEEE] justify-center 
       text-myGreen text-[50px] `}
    >
      {active && <BsCheck />}
    </div>
  );
}
