"use client";

import React, { useContext } from "react";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function FirstCategoriesCard({ item }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const { slugify } = useContext(ContextForSharingStates);

  return (
    <div
      key={item?.IdProdSaxeoba}
      onClick={() => {
        const isCategory = pathname.split("/")[1] === "category";
        const isSet = pathname.split("/")[1] === "category-for-set";

        const basePath = isCategory
          ? "category"
          : isSet
            ? "category-for-set/ნაკრებები_10020"
            : "";

        const name = isCategory
          ? item?.ProdSaxeobaName
          : item?.ProdTypeGroupName;

        const id = isCategory ? item?.IdProdSaxeoba : item?.IdProdTypeGroup;

        const slug = `${item.slug || slugify(name)}_${id}`;

        router.push(`/${basePath}/${slug}`);
      }}
      className={`flex flex-col w-full cursor-pointer shrink-0 bg-[#f7f7f7] rounded-[8px] shadow overflow-hidden mb-[5px]`}
    >
      <div className="relative w-full h-[100px] shrink-0">
        {item?.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.image}`}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full relative">
            <div className="w-[90%] h-[90%] relative">
              <Image
                src="/images/siteLogo.png"
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        )}
      </div>
      <h1 className="w-full h-[70px] flex items-center justify-center text-center p-[10px] max-sm:p-[5px]">
        {pathname.split("/")[1] === "category"
          ? item?.ProdSaxeobaName
          : item?.ProdTypeGroupName}
      </h1>
    </div>
  );
}
