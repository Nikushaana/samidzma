"use client";

import React, { useContext, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function WhatUSearch() {
  const { setSearchPopUp } = useContext(ContextForSharingStates);

  return (
    <div className="rounded-full bg-white overflow-hidden flex justify-between">
      <div className="flex items-center px-[20px] w-[calc(100%-50px)]">
        <input
          type="text"
          name=""
          placeholder="რას ეძებ?"
          className="text-[14px] w-full outline-none"
          id=""
        />
      </div>
      <div
        onClick={() => {
          // setSearchPopUp(true);
        }}
        className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[43px] h-[43px] rounded-full"
      >
        <IoSearchOutline />
      </div>
    </div>
  );
}
