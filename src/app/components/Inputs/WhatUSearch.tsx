"use client";

import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function WhatUSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setIsCategoriesPopUp, setFilterValues, setCurrentPage } =
    useContext(ContextForSharingStates);

  const [keySearchValue, setKeySearchValue] = useState("");

  useEffect(() => {
    const keyFromParams = searchParams.get("key");
    if (keyFromParams) {
      setFilterValues((prev: any) => ({ ...prev, key: keyFromParams }));
    }
  }, [searchParams]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchByKey();
    }
  };

  const handleSearchByKey = () => {
    if (keySearchValue) {
      if (pathname === "/category") {
        window.history.replaceState(
          null,
          "/category",
          `${pathname}?key=${keySearchValue}`
        );
        setCurrentPage(0)
      } else {
        router.push(`/category?key=${keySearchValue}`);
      }
      setIsCategoriesPopUp(false);
      setKeySearchValue("");
    }
  };

  return (
    <div className="rounded-full bg-white overflow-hidden flex justify-between shrink-0">
      <div className="flex items-center px-[20px] w-[calc(100%-50px)]">
        <input
          type="text"
          name=""
          value={keySearchValue}
          onKeyPress={handleInputKeyPress}
          onChange={(event) => {
            setKeySearchValue(event.target.value);
          }}
          placeholder="რას ეძებ?"
          className="text-[14px] w-full outline-none"
        />
      </div>
      <div
        onClick={() => {
          handleSearchByKey();
        }}
        className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[43px] h-[43px] rounded-full"
      >
        <IoSearchOutline />
      </div>
    </div>
  );
}
