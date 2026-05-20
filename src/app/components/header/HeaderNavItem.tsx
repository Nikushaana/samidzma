import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { buildCategoryRoute } from "@/utils/routes/buildCategoryRoute";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function HeaderNavItem({ item, FrontCategoriesData }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const saleParam = searchParams.get("sale");

  const { slugify } = useContext(ContextForSharingStates);

  return (
    <li
      onClick={() => {
        if (item.link == "category" || item.link == "category-for-set") {
          router.push(
            buildCategoryRoute(item.link, FrontCategoriesData, slugify),
          );
          return;
        }

        if (item.link == "sale") {
          router.push(`/category?sale=1`);
          return;
        }

        router.push(`/${item.link}`);
      }}
      className={`h-full rounded-full text-[14px] cursor-pointer flex items-center px-[25px] max-2xl:pr-[15px] ${
        !pathname.split("/")[2] && saleParam === "1"
          ? item.link === "sale"
            ? "bg-myGreen"
            : ""
          : pathname.split("/")[1] === item.link
            ? "bg-myGreen"
            : ""
      }`}
    >
      {item.name}
    </li>
  );
}
