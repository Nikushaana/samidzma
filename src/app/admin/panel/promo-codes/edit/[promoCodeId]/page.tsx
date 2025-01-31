"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import * as Yup from "yup";

export default function Page({ params }: { params: { promoCodeId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    status,
    setAllPromoCodesRender,
  } = useContext(ContextForSharingStates);

  const [loaderEditPromoCodes, setLoaderEditPromoCodes] =
    useState<boolean>(true);

  const [onePromoCodesValues, setOnePromoCodesValues] = useState({
    code: "",
    discount_percent: "",
    quantity: "",
    current_quantity: "",
    expires_at: "",
    status: 0,
  });
  const [editPromoCodesValues, setEditPromoCodesValues] = useState({
    code: "",
    discount_percent: "",
    quantity: "",
    current_quantity: "",
    expires_at: "",
    status: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    code: Yup.string().required("პრომო კოდი სავალდებულოა"),
    discount_percent: Yup.string().required("ფასდაკლება (%) სავალდებულოა"),
    quantity: Yup.string().required("რაოდენობა სავალდებულოა"),
    expires_at: Yup.string().required("ვადის ბოლო თარიღი სავალდებულოა"),
    current_quantity: Yup.string().required("ახლანდელი რაოდენობა სავალდებულოა"),
  });

  const handleEditPromoCodesValidation = () => {
    validationSchema
      .validate(editPromoCodesValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditPromoCodes();
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
            newErrors.expires_at ||
            newErrors.current_quantity
        );
      });
  };

  useEffect(() => {
    setLoaderEditPromoCodes(true);
    axiosAdmin
      .get(`admin/promoCode/${params.promoCodeId}`)
      .then((res) => {
        setOnePromoCodesValues(res.data);
        setLoaderEditPromoCodes(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.promoCodeId]);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEditPromoCodesValidation();
    }
  };

  const HandleEditPromoCodes = () => {
    setLoaderEditPromoCodes(true);

    axiosAdmin
      .post(`admin/promoCode/${params.promoCodeId}`, {
        code: editPromoCodesValues.code,
        discount_percent: editPromoCodesValues.discount_percent,
        quantity: editPromoCodesValues.quantity,
        current_quantity: editPromoCodesValues.current_quantity,
        expires_at: editPromoCodesValues.expires_at,
        status: status.find(
          (item: any) => item.name === editPromoCodesValues.status
        )?.id,
      })
      .then((res) => {
        router.push("/admin/panel/promo-codes");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
        setAllPromoCodesRender(res);
      })
      .catch((err) => {
        setLoaderEditPromoCodes(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {});
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderEditPromoCodes && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">პრომო კოდის რედაქტირება</h1>
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
        <Input1
          title="პრომო კოდი"
          name="code"
          firstValue={onePromoCodesValues?.code}
          type="text"
          setAllValues={setEditPromoCodesValues}
          error={errors.code}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ფასდაკლება (%)"
          name="discount_percent"
          firstValue={onePromoCodesValues?.discount_percent}
          digit={true}
          type="text"
          setAllValues={setEditPromoCodesValues}
          error={errors.discount_percent}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="რაოდენობა"
          name="quantity"
          firstValue={onePromoCodesValues?.quantity}
          digit={true}
          type="text"
          setAllValues={setEditPromoCodesValues}
          error={errors.quantity}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ახლანდელი რაოდენობა"
          name="current_quantity"
          firstValue={onePromoCodesValues?.current_quantity}
          digit={true}
          type="text"
          setAllValues={setEditPromoCodesValues}
          error={errors.current_quantity}
          handleInputKeyPress={handleInputKeyPress}
        />
        <Input1
          title="ვადის ბოლო თარიღი"
          name="expires_at"
          firstValue={onePromoCodesValues?.expires_at.split("T")[0]}
          type="date"
          setAllValues={setEditPromoCodesValues}
          error={errors.expires_at}
          handleInputKeyPress={handleInputKeyPress}
        />
        <DropDown1value
          title="სტატუსი"
          data={status}
          name="status"
          firstValue={
            status.find((item: any) => item.id === onePromoCodesValues?.status)
              ?.name
          }
          setAllValues={setEditPromoCodesValues}
          error={false}
        />
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="რედაქტირება"
          action={handleEditPromoCodesValidation}
          loader={loaderEditPromoCodes}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
