"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useState } from "react";
import { axiosAdmin } from "../../../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../dataFetchs/sharedStates";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllPromoCodesRender,
  } = useContext(ContextForSharingStates);

  const [loaderAddPromoCodes, setLoaderAddPromoCodes] =
    useState<boolean>(false);

  const [addPromoCodesValues, setAddPromoCodesValues] = useState({
    code: "",
    discount_percent: "",
    quantity: "",
    expires_at: "",
    status: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAddPromoCodes();
    }
  };

  const HandleAddPromoCodes = () => {
    setLoaderAddPromoCodes(true);
    if (addPromoCodesValues.code && addPromoCodesValues.discount_percent) {
      axiosAdmin
        .post("admin/promoCode", {
          code: addPromoCodesValues.code,
          discount_percent: addPromoCodesValues.discount_percent,
          quantity: addPromoCodesValues.quantity,
          expires_at: addPromoCodesValues.expires_at,
          status: status.find(
            (item: any) => item.name === addPromoCodesValues.status
          )?.id,
        })
        .then((res) => {
          router.push("/admin/panel/promo-codes");
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("წარმატებით დაემატა");
          setAllPromoCodesRender(res);
        })
        .catch((err) => {
          setLoaderAddPromoCodes(false);
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("ვერ დაემატა!");
        })
        .finally(() => {});
    } else {
      setLoaderAddPromoCodes(false);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddPromoCodes && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">პრომო კოდის დამატება</h1>
      <div className="grid grid-cols-3 gap-[20px] w-full">
        <Input1
          title="პრომო კოდი"
          name="code"
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ფასდაკლება (%)"
          name="discount_percent"
          digit={true}
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="რაოდენობა"
          name="quantity"
          digit={true}
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ვადის ბოლო თარიღი"
          name="expires_at"
          type="date"
          setAllValues={setAddPromoCodesValues}
          error={false}
          handleInputKeyPress={handleInputKeyPress}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          setAllValues={setAddPromoCodesValues}
          error={false}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={HandleAddPromoCodes}
          loader={loaderAddPromoCodes}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
