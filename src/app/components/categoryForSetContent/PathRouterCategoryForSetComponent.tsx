"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";

export default function PathRouterCategoryForSetComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { setFilterValues, slugify, pathnameItems, setPathnameItems } =
    useContext(ContextForSharingStates);
  const { FrontCategoriesData } = useFrontCategories();

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname
      .split("/")
      .filter((segment) => segment.includes("_"));

    if (segments.length === 0) {
      setPathnameItems([]); // 👈 clear when no category id is in the path
      return;
    }

    if (FrontCategoriesData.length > 0) {
      const extractedNumbers = segments.map((segment) =>
        Number(segment.split("_").pop())
      );

      // Extract category data as before ...
      const firstCategory = FrontCategoriesData.find(
        (item: any) => Number(item.IdProdSaxeoba) === extractedNumbers[0]
      );

      const secondCategory = firstCategory?.productTypeGroup?.find(
        (item: any) => Number(item.IdProdTypeGroup) === extractedNumbers[1]
      );

      const thirdCategory = secondCategory?.productTypes?.find(
        (item: any) => Number(item.IdProdType) === extractedNumbers[2]
      );

      const updatedItems = extractedNumbers.map((number, index) => {
        const categoryData =
          index === 0
            ? firstCategory
            : index === 1
            ? secondCategory
            : thirdCategory;

        const name =
          index === 0
            ? categoryData?.ProdSaxeobaName
            : index === 1
            ? categoryData?.ProdTypeGroupName
            : categoryData?.ProdTypeName;

        return {
          id: index + 1,
          pathCode: slugify(name || "") + "_" + number,
          pathCategName: name || "",
          pathCategDescr: categoryData?.description || "",
        };
      });

      setPathnameItems(updatedItems);
    }
  }, [pathname, FrontCategoriesData]);

  if (!pathname.split("/")[2]) return;
  return (
    pathname.split("/")[2] && (
      <div className="flex flex-wrap items-center gap-[5px]">
        <p
          onClick={() => {
            router.push("/");
          }}
          className="text-[14px] cursor-pointer"
        >
          მთავარი
        </p>
        <IoChevronForward className="text-[13px]" />
        {pathnameItems.map((item: any, index: number) => (
          <div
            key={item.id}
            onClick={() => {
              setFilterValues((prev: any) => ({
                ...prev,
                key: "",
              }));

              setTimeout(() => {
                router.push(
                  `/category-for-set/${pathnameItems
                    .slice(0, index + 1)
                    .map((i: any) => i.pathCode)
                    .join("/")}?key=`
                );
              }, 0);
            }}
          >
            {index + 1 === pathnameItems.length && item.pathCategName ? (
              <p
                key={index}
                className="text-[14px] cursor-pointer font-semibold"
              >
                {item.pathCategName}
              </p>
            ) : (
              <div key={index} className="flex items-center gap-[5px]">
                <p className="text-[14px] cursor-pointer">
                  {item.pathCategName}
                </p>{" "}
                <IoChevronForward className="text-[13px]" />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
}
