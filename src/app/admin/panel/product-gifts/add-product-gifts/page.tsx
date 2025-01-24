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
    ProdCode: "",
    giftCode: "",
    giftCodes: [],
    status: "",
  });

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      HandleAddProdGifts();
    }
  };

  const HandleAddProdGifts = () => {
    setLoaderAddProdGifts(true);
    if (
      addProdGiftsValues.ProdCode &&
      addProdGiftsValues.giftCodes.length > 0
    ) {
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
    } else {
      setLoaderAddProdGifts(false);
    }
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
            title="მთავარი პროდუქტი"
            name="ProdCode"
            type="text"
            setAllValues={setAddProdGiftsValues}
            error={false}
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
            error={false}
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
          action={HandleAddProdGifts}
          loader={loaderAddProdGifts}
          style="h-[50px] text-[18px]"
        />
      </div>
    </div>
  );
}
