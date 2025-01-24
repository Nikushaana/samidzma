"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";

export default function PromoCodeInfoPopUp() {
  const { openPromoCodeInfoPopUp, setOpenPromoCodeInfoPopUp } = useContext(
    ContextForSharingStates
  );

  const [promoCodeUseData, setPromoCodeUseData] = useState<any>([]);
  const [promoCodeUseLoader, setPromoCodeUseLoader] = useState<boolean>(true);

  useEffect(() => {
    setPromoCodeUseLoader(true);
    axiosAdmin
      .get(`admin/promoCodeUse?promo_code_id=${openPromoCodeInfoPopUp}`)
      .then((res) => {
        setPromoCodeUseData(res.data.data);
        setPromoCodeUseLoader(false);
      })
      .catch((err) => {
        setOpenPromoCodeInfoPopUp(null);
      })
      .finally(() => {});
  }, [openPromoCodeInfoPopUp]);

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] ${
        openPromoCodeInfoPopUp
          ? "z-[20] opacity-1 duration-100"
          : "z-[-20] opacity-0 duration-150"
      }`}
    >
      <div
        onClick={() => {
          setOpenPromoCodeInfoPopUp(null);
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
          openPromoCodeInfoPopUp
            ? "backdrop-blur-[2px] "
            : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`max-w-[1920px] bg-[#EAEDEE] p-[16px] grid grid-cols-1 gap-[20px] rounded-[12px] max-h-[95vh] overflow-y-scroll showScrollVert`}
      >
        <div className="grid grid-cols-7 gap-[10px]">
          <h1>პრომო კოდი</h1>
          <h1 className="text-center">ფასი</h1>
          <h1 className="text-center">საბოლოო ფასი</h1>
          <h1 className="text-center">ფასდაკლება</h1>
          <h1 className="text-center col-span-2">ფასდაკლების პროცენტი</h1>
          <h1 className="text-end">შეკვეთა</h1>
        </div>
        <hr className="h-[2px] w-full bg-black" />
        {promoCodeUseData.length > 0 ? (
          promoCodeUseData.map((item: any, index: number) => (
            <div key={item.id} className="grid grid-cols-7 gap-[10px]">
              <p>{item?.code}</p>
              <p className="text-center">{item?.price} ₾</p>
              <p className="text-center">{item?.finally_price} ₾</p>
              <p className="text-center">{item?.discount_price} ₾</p>
              <p className="text-center col-span-2">
                {item?.discount_percent} %
              </p>
              <p className="text-end"># {item?.order_id}</p>
            </div>
          ))
        ) : (
          <p>ინფორმაცია არ მოიძებნა</p>
        )}
      </div>
    </div>
  );
}
