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
import * as Yup from "yup";

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
    code: "", //is mandatory
    discount_percent: "", //is mandatory
    quantity: "", //is mandatory
    expires_at: "", //is mandatory
    status: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    code: Yup.string().required("პრომო კოდი სავალდებულოა"),
    discount_percent: Yup.string().required("ფასდაკლება (%) სავალდებულოა"),
    quantity: Yup.string().required("რაოდენობა სავალდებულოა"),
    expires_at: Yup.string().required("ვადის ბოლო თარიღი სავალდებულოა"),
  });

  const handleAddPromoCodesValidation = () => {
    validationSchema
      .validate(addPromoCodesValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleAddPromoCodes();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(
          newErrors.code ||
            newErrors.discount_percent ||
            newErrors.quantity ||
            newErrors.expires_at
        );
      });
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddPromoCodesValidation();
    }
  };

  const HandleAddPromoCodes = () => {
    setLoaderAddPromoCodes(true);
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
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddPromoCodes && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">პრომო კოდის დამატება</h1>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="პრომო კოდი"
          name="code"
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={errors.code}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ფასდაკლება (%)"
          name="discount_percent"
          digit={true}
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={errors.discount_percent}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="რაოდენობა"
          name="quantity"
          digit={true}
          type="text"
          setAllValues={setAddPromoCodesValues}
          error={errors.quantity}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ვადის ბოლო თარიღი"
          name="expires_at"
          type="date"
          setAllValues={setAddPromoCodesValues}
          error={errors.expires_at}
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
          action={handleAddPromoCodesValidation}
          loader={loaderAddPromoCodes}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
