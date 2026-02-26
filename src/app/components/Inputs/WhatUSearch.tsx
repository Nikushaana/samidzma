"use client";

import React, { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BlogsBackgroundDesigns from "../decorationColumns/BlogsBackgroundDesigns";

export default function WhatUSearch({ isProductNakrebi }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { setFilterValues, setCurrentPage } = useContext(
    ContextForSharingStates
  );

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
      if (pathname.split("/")[1] === "category") {
        window.history.replaceState(
          null,
          "/category",
          `${pathname}?key=${keySearchValue}`
        );
        setCurrentPage(0);
      } else if (pathname.split("/")[1] === "category-for-set") {
        window.history.replaceState(
          null,
          "/category-for-set",
          `${pathname}?key=${keySearchValue}`
        );
        setCurrentPage(0);
      } else if (isProductNakrebi) {
        router.push(`/category-for-set?key=${keySearchValue}`);
      } else {
        router.push(`/category?key=${keySearchValue}`);
      }
      setKeySearchValue("");
    }
  };

  return (
    <div
      className={`${
        pathname !== "/" &&
        "rounded-[12px] max-lg:rounded-0 bg-[#EAEDEE] p-[30px] max-2xl:p-[10px] max-lg:p-0 relative"
      }`}
    >
      {pathname.split("/")[1] !== "category-for-set" && pathname !== "/" && (
        <BlogsBackgroundDesigns />
      )}
      <div className="rounded-full bg-white overflow-hidden flex justify-between shrink-0 z-[1] relative">
        <div className="flex items-center px-[20px] w-full">
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
          className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[50px] h-[50px] shrink-0 rounded-full"
        >
          <IoSearchOutline />
        </div>
      </div>
    </div>
  );
}
