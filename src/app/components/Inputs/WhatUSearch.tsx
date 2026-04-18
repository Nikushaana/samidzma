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
    ContextForSharingStates,
  );

  const [keySearchValue, setKeySearchValue] = useState("");

  useEffect(() => {
    const keyFromParams = searchParams.get("key");
    if (keyFromParams) {
      setKeySearchValue(keyFromParams);
      setFilterValues((prev: any) => ({ ...prev, key: keyFromParams }));
    }
  }, [searchParams, setFilterValues]);

  const getBaseRoute = () => {
    if (pathname.startsWith("/category-for-set")) return "/category-for-set";
    if (pathname.startsWith("/category")) return "/category";
    return isProductNakrebi ? "/category-for-set" : "/category";
  };

  const handleSearch = () => {
    if (!keySearchValue.trim()) return;

    const baseRoute = getBaseRoute();

    router.push(`${baseRoute}?key=${keySearchValue}`);
    setCurrentPage(0);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      className={`${
        pathname !== "/" &&
        "rounded-[12px] max-lg:rounded-0 bg-[#EAEDEE] p-[30px] max-2xl:p-[10px] max-lg:p-0 relative"
      }`}
    >
      {pathname !== "/" && !pathname.startsWith("/category-for-set") && (
        <BlogsBackgroundDesigns />
      )}

      <div className="rounded-full bg-white overflow-hidden flex justify-between shrink-0 z-[1] relative">
        <div className="flex items-center px-[20px] w-full">
          <input
            type="text"
            value={keySearchValue}
            onKeyDown={handleKeyPress}
            onChange={(event) => {
              setKeySearchValue(event.target.value);
            }}
            placeholder="რას ეძებ?"
            className="text-[14px] w-full outline-none"
          />
        </div>
        <div
          onClick={() => {
            handleSearch();
          }}
          className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[50px] h-[50px] shrink-0 rounded-full"
        >
          <IoSearchOutline />
        </div>
      </div>
    </div>
  );
}
