"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { IoChevronForward } from "react-icons/io5";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";

export default function InnerProductPathRouter({ variation, oneProduct }: any) {
  const router = useRouter();
  const { slugify } = useContext(ContextForSharingStates);

  const getProductData = (field: string) => {
    const variationData = oneProduct?.variation?.find(
      (item: any) => item.ProdCode == variation,
    );

    return variation ? variationData?.[field] : oneProduct?.product?.[field];
  };

  const getPath = (...fields: string[]) =>
    `/${
      oneProduct?.product?.ProdSaxeoba == "ნაკრებები"
        ? "category-for-set"
        : "category"
    }/` +
    fields
      .filter(Boolean)
      .map((field) => {
        const nameField = getProductData(
          field === getProductData("IdProdSaxeoba")
            ? "ProdSaxeoba"
            : field === getProductData("IdProdTypeGroup")
              ? "ProdTypeGroup"
              : field === getProductData("IdProdType")
                ? "ProdType"
                : "",
        );

        const key =
          field === getProductData("IdProdSaxeoba")
            ? "saxeoba"
            : field === getProductData("IdProdTypeGroup")
              ? "productTypeGroup"
              : field === getProductData("IdProdType")
                ? "productType"
                : null;

        let slug = "";

        if (variation) {
          const variationItem = oneProduct?.variation?.find(
            (v: any) => v.ProdCode == variation,
          );

          const entity = key ? variationItem?.[key] : null;

          slug = entity?.slug;
        } else {
          const product = oneProduct?.product;

          const entity = key ? product?.[key] : null;

          slug = entity?.slug;
        }

        return nameField ? `${slug || slugify(nameField)}_${field}` : field;
      })
      .join("/") +
    "?key=";

  const prodType = getProductData("ProdType");
  const shouldHideProdType = prodType?.includes("დასამალი");

  return (
    <div className="flex flex-wrap items-center gap-[5px]">
      <p
        onClick={() => router.push("/")}
        className="text-[14px] cursor-pointer"
      >
        მთავარი
      </p>
      {getProductData("IdProdSaxeoba") && (
        <IoChevronForward className="text-[13px]" />
      )}
      <div className="flex items-center gap-[5px]">
        <p
          onClick={() => router.push(getPath(getProductData("IdProdSaxeoba")))}
          className="text-[14px] cursor-pointer"
        >
          {getProductData("ProdSaxeoba")}
        </p>
        {getProductData("IdProdTypeGroup") && (
          <IoChevronForward className="text-[13px]" />
        )}
      </div>
      <div className="flex items-center gap-[5px]">
        <p
          onClick={() =>
            router.push(
              getPath(
                getProductData("IdProdSaxeoba"),
                getProductData("IdProdTypeGroup"),
              ),
            )
          }
          className="text-[14px] cursor-pointer"
        >
          {getProductData("ProdTypeGroup")}
        </p>
        {!shouldHideProdType && getProductData("IdProdType") && (
          <IoChevronForward className="text-[13px]" />
        )}
      </div>
      {!shouldHideProdType && (
        <div className="flex items-center gap-[5px]">
          <p
            onClick={() =>
              router.push(
                getPath(
                  getProductData("IdProdSaxeoba"),
                  getProductData("IdProdTypeGroup"),
                  getProductData("IdProdType"),
                ),
              )
            }
            className="text-[14px] cursor-pointer"
          >
            {getProductData("ProdType")}
          </p>
        </div>
      )}
    </div>
  );
}
