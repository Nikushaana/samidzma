"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { BsChevronDown } from "react-icons/bs";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { fetchCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export default function FooterCategoriesDropDown() {
  const router = useRouter();

  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const { slugify } = useContext(ContextForSharingStates);

  const [dropDowns, setDropDowns] = useState({
    firstCateg: "",
    secCateg: "",
  });

  return (
    <div className="flex flex-col gap-y-[5px] h-[320px] max-sm:h-[280px] overflow-y-scroll showScrollVert">
      {FrontCategoriesData.map((item: any, index: number) => (
        <div key={item.IdProdSaxeoba || index}>
          <div className="flex items-center justify-between">
            <p
              onClick={() => {
                const basePath =
                  item.ProdSaxeobaName === "ნაკრებები"
                    ? "category-for-set"
                    : "category";

                router.push(
                  `/${basePath}/${
                    (item.slug || slugify(item.ProdSaxeobaName)) +
                    "_" +
                    item.IdProdSaxeoba
                  }`,
                );
              }}
              className="text-[14px] max-sm:text-[11px] self-start cursor-pointer"
            >
              {item.ProdSaxeobaName}
            </p>
            {item.productTypeGroup.length > 0 && (
              <div
                onClick={() => {
                  setDropDowns((prev: any) => ({
                    ...prev,
                    firstCateg:
                      prev.firstCateg == item.IdProdSaxeoba
                        ? ""
                        : item.IdProdSaxeoba,
                    secCateg: "",
                  }));
                }}
                className="w-[30px] h-[20px] flex items-center justify-center shrink-0 cursor-pointer hover:shadow hover:shadow-gray-700 rounded-full"
              >
                <BsChevronDown
                  className={`duration-200 ${
                    dropDowns.firstCateg == item.IdProdSaxeoba
                      ? "rotate-[180deg]"
                      : ""
                  }`}
                />
              </div>
            )}
          </div>
          <div
            className={`flex flex-col gap-y-[5px] duration-200 ml-[10px] ${
              dropDowns.firstCateg == item.IdProdSaxeoba
                ? "py-[10px]"
                : "h-0 opacity-0 overflow-hidden"
            }`}
          >
            {item.productTypeGroup.map((item2: any, index: number) => (
              <div key={item.IdProdTypeGroup || index}>
                <div className="flex items-center justify-between text-gray-400 hover:text-white">
                  <p
                    onClick={() => {
                      const basePath =
                        item.ProdSaxeobaName === "ნაკრებები"
                          ? "category-for-set"
                          : "category";

                      router.push(
                        `/${basePath}/${(item.slug || slugify(item.ProdSaxeobaName)) + "_" + item.IdProdSaxeoba}/${(item2.slug || slugify(item2.ProdTypeGroupName)) + "_" + item2.IdProdTypeGroup}`,
                      );
                    }}
                    className="text-[13px] max-sm:text-[11px] self-start cursor-pointer"
                  >
                    {item2.ProdTypeGroupName}
                  </p>
                  {item2.productTypes.length > 0 && (
                    <div
                      onClick={() => {
                        setDropDowns((prev: any) => ({
                          ...prev,
                          secCateg:
                            prev.secCateg == item2.IdProdTypeGroup
                              ? ""
                              : item2.IdProdTypeGroup,
                        }));
                      }}
                      className="w-[30px] h-[20px] flex items-center justify-center shrink-0 cursor-pointer hover:shadow hover:shadow-gray-700 rounded-full"
                    >
                      <BsChevronDown
                        className={`duration-200 text-[12px] ${
                          dropDowns.secCateg == item2.IdProdTypeGroup
                            ? "rotate-[180deg]"
                            : ""
                        }`}
                      />
                    </div>
                  )}
                </div>
                <div
                  className={`flex flex-col gap-y-[5px] duration-200 ml-[15px]  ${
                    dropDowns.secCateg == item2.IdProdTypeGroup
                      ? "py-[10px]"
                      : "h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {item2.productTypes.map((item3: any, index: number) => (
                    <p
                      key={item3.IdProdType || index}
                      onClick={() => {
                        const basePath =
                          item.ProdSaxeobaName === "ნაკრებები"
                            ? "category-for-set"
                            : "category";

                        router.push(
                          `/${basePath}/${(item.slug || slugify(item.ProdSaxeobaName)) + "_" + item.IdProdSaxeoba}/${(item2.slug || slugify(item2.ProdTypeGroupName)) + "_" + item2.IdProdTypeGroup}/${(item3.slug || slugify(item3.ProdTypeName)) + "_" + item3.IdProdType}`,
                        );
                      }}
                      className="text-[14px] max-sm:text-[11px] self-start text-gray-500 hover:text-gray-400 cursor-pointer"
                    >
                      {item3.ProdTypeName}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
