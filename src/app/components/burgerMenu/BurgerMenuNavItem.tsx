import { buildCategoryRoute } from "@/utils/routes/buildCategoryRoute";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function BurgerMenuNavItem({ item, FrontCategoriesData }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const saleParam = searchParams.get("sale");

  const { slugify } = useContext(ContextForSharingStates);

  return (
    <div
      key={item.id}
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
      className={`flex items-center gap-[10px] cursor-pointer ${
        saleParam === "1"
          ? item.link === "sale"
            ? "text-white"
            : "gap-[30px] text-[#C6FB94]"
          : pathname.split("/")[1] === item.link
            ? "text-white"
            : "gap-[30px] text-[#C6FB94]"
      }`}
    >
      <MdArrowForwardIos
        className={`duration-200 ${
          saleParam === "1"
            ? item.link === "sale"
              ? "ml-[50px]"
              : ""
            : pathname.split("/")[1] === item.link
              ? "ml-[50px]"
              : ""
        }`}
      />
      <p className="text-[22px] max-sm:text-[20px] select-none">{item.name}</p>
    </div>
  );
}
