"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { IoChevronForward } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { fetchCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export default function PathRouterCategoryComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const { pathnameItems, setPathnameItems } =
    useContext(ContextForSharingStates);

  const { data: FrontCategoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!pathname) return;

    const segments = pathname
      .split("/")
      .filter((segment) => segment.includes("_"));

    if (!segments.length || !FrontCategoriesData.length) {
      setPathnameItems([]);
      return;
    }

    const ids = segments.map((segment) => Number(segment.split("_").pop()));

    // Extract category data as before ...
    const first = FrontCategoriesData.find(
      (item: any) => Number(item.IdProdSaxeoba) === ids[0],
    );

    const second = first?.productTypeGroup?.find(
      (item: any) => Number(item.IdProdTypeGroup) === ids[1],
    );

    const third = second?.productTypes?.find(
      (item: any) => Number(item.IdProdType) === ids[2],
    );

    const build = [
      {
        id: 1,
        name: first?.ProdSaxeobaName,
        data: first,
      },
      {
        id: 2,
        name: second?.ProdTypeGroupName,
        data: second,
      },
      {
        id: 3,
        name: third?.ProdTypeName,
        data: third,
      },
    ]
      .filter((i, idx) => ids[idx])
      .map((item, index) => ({
        id: index + 1,
        pathCode: `${item.name}_${ids[index]}`,
        pathCategName: item.name || "",
        pathCategDescr: item.data?.description || "",
      }));

    setPathnameItems(build);
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
              router.push(
                `/category/${pathnameItems
                  .slice(0, index + 1)
                  .map((i: any) => i.pathCode)
                  .join("/")}`,
              );
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
