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
import { BsXLg } from "react-icons/bs";
import * as Yup from "yup";

export default function Page() {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setAllProdGiftsRender,
    status,
  } = useContext(ContextForSharingStates);

  const [loaderAddProdGifts, setLoaderAddProdGifts] = useState<boolean>(false);

  const [addProdGiftsValues, setAddProdGiftsValues] = useState({
    ProdCode: "", // is mandatory
    giftCode: "",
    giftCodes: [], // length must be minimum 1
    status: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    ProdCode: Yup.string().required("მთავარი პროდუქტის კოდი სავალდებულოა"),
    giftCodes: Yup.array().min(1, "საჩუქრების დამატება სავალდებულოა"),
  });

  const handleAddPromoCodesValidation = () => {
    validationSchema
      .validate(addProdGiftsValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleAddProdGifts();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.ProdCode || newErrors.giftCodes);
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

  const HandleAddProdGifts = () => {
    setLoaderAddProdGifts(true);

    axiosAdmin
      .post("admin/productGift", {
        ProdCode: addProdGiftsValues.ProdCode,
        giftCodes: addProdGiftsValues.giftCodes,
        status: status.find(
          (item: any) => item.name === addProdGiftsValues.status
        )?.id,
      })
      .then((res) => {
        router.push("/admin/panel/product-gifts");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით დაემატა");
        setAllProdGiftsRender(res);
      })
      .catch((err) => {
        setLoaderAddProdGifts(false);
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ დაემატა!");
      })
      .finally(() => {});
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        loaderAddProdGifts && "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">პროდუქტის საჩუქრის დამატება</h1>
      <div className="flex flex-col gap-[20px] w-full">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
          <Input1
            title="მთავარი პროდუქტის კოდი"
            name="ProdCode"
            type="text"
            setAllValues={setAddProdGiftsValues}
            error={errors.ProdCode}
            handleInputKeyPress={handleInputKeyPress}
          />
          <DropDown1value
            title="სტატუსი"
            data={status}
            name="status"
            setAllValues={setAddProdGiftsValues}
            error={false}
          />
        </div>

        <div className="flex items-end gap-[20px]">
          <Input1
            title="საჩუქარი"
            name="giftCode"
            type="text"
            setAllValues={setAddProdGiftsValues}
            error={addProdGiftsValues.giftCodes.length < 1 && errors.giftCodes}
            render={addProdGiftsValues.giftCodes}
            handleInputKeyPress={handleInputKeyPress}
          />
          <div className="w-[150px]">
            <GreenButton
              name="არჩევა"
              action={() => {
                if (addProdGiftsValues.giftCode) {
                  setAddProdGiftsValues((prev: any) => ({
                    ...prev,
                    giftCodes: [...prev.giftCodes, addProdGiftsValues.giftCode],
                  }));
                }
                setAddProdGiftsValues((prev: any) => ({
                  ...prev,
                  giftCode: "",
                }));
              }}
              style="h-[50px] text-[18px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[20px] px-[20px]">
          {addProdGiftsValues.giftCodes.map((item: any, index: any) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <p>#{index + 1}</p>
                <p>{item}</p>
              </div>
              <div
                onClick={() => {
                  setAddProdGiftsValues((prev: any) => ({
                    ...prev,
                    giftCodes: addProdGiftsValues.giftCodes.filter(
                      (gift: any) => gift !== item
                    ),
                  }));
                }}
                className="text-[red] w-[50px] h-[50px] flex items-center justify-center text-[20px] cursor-pointer"
              >
                <BsXLg />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[200px]">
        <GreenButton
          name="დამატება"
          action={handleAddPromoCodesValidation}
          loader={loaderAddProdGifts}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
