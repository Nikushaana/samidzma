"use client";

import React, { useContext } from "react";
import { CartAxiosContext } from "../../../dataFetchs/cartContext";
import DotsLoader from "../components/loaders/DotsLoader";
import CartCard from "../components/CardVariations/CartCard";
import { ContextForSharingStates } from "../../../dataFetchs/sharedStates";
import { UserContext } from "../../../dataFetchs/UserAxios";

export default function Page() {
  const {
    CartData,
    CartLoader,
    orderPlacementValues,
    CartLocalStorageData,
    CartCounter,
  } = useContext(CartAxiosContext);
  const { user } = useContext(UserContext);
  const { setCreateCartPopUp } = useContext(ContextForSharingStates);
  return (
    <div
      className={`w-full flex flex-col gap-y-[20px] relative ${
        CartLoader && "opacity-[0.5] pointer-events-none"
      }
      `}
    >
      {orderPlacementValues.is_delivery !== null && (
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center">
            <p className="text-[13px] mr-[10px]">მომსახურების მეთოდი:</p>
            <h1 className="text-[15px]">
              {orderPlacementValues.is_delivery == 1
                ? "კურიერის მიერ"
                : `თვითგატანა \`${orderPlacementValues.store.StoreName}\`-დან`}
            </h1>
          </div>
          <p
            onClick={() => {
              setCreateCartPopUp({
                popUpStatus: true,
                changeMethod: true,
                announcement: user?.id
                  ? CartCounter > 0
                  : CartLocalStorageData.length > 0,
              });
            }}
            className="underline text-[12px] text-gray-500 cursor-pointer hover:text-gray-900"
          >
            მეთოდის შეცვლა
          </p>
        </div>
      )}
      {CartLoader && (
        <div className="flex justify-center my-[60px] absolute left-[50%] translate-x-[-50%] z-[1]">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      )}
      {CartData?.length > 0
        ? CartData?.map((item: any, index: number) => (
            <CartCard key={index} item={item} />
          ))
        : !CartLoader && (
            <p className="flex justify-center my-[60px]">კალათა ცარიელია</p>
          )}
    </div>
  );
}
