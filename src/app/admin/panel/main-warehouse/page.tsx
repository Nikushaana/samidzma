"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import { FaInfo } from "react-icons/fa";
import Input1 from "@/app/components/Inputs/Input1";
import Map from "@/app/components/map/map";
import GreenButton from "@/app/components/buttons/greenButton";
import * as Yup from "yup";

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  const [mainWarehouseData, setMainWarehouseData] = useState<any>({});
  const [mainWarehouseLoader, setMainWarehouseLoader] = useState<boolean>(true);

  const [editWarehouseValues, setEditWarehouseValues] = useState({
    delivery_km_price: "",
    description: "",
    description_eng: "",
    description_rus: "",
    latlng: {
      lat: 0,
      lng: 0,
    },
    meta_description: "",
    meta_name: "",
    system_id: "",
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    delivery_km_price: Yup.string().required("კმ-ის ფასი სავალდებულოა"),
    system_id: Yup.string().required("სისტემის ID სავალდებულოა"),
  });

  const handleEditMainWarehouseValidation = () => {
    validationSchema
      .validate(editWarehouseValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        HandleEditMainWarehouse();
      })
      .catch((err) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.delivery_km_price || newErrors.system_id);
      });
  };

  useEffect(() => {
    setMainWarehouseLoader(true);
    axiosAdmin
      .get("admin/deliveryInfo")
      .then((res) => {
        setMainWarehouseData(res.data);
        setMainWarehouseLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  const HandleEditMainWarehouse = () => {
    setMainWarehouseLoader(true);
    axiosAdmin
      .post(`admin/deliveryInfo`, {
        delivery_km_price: editWarehouseValues.delivery_km_price,
        description: editWarehouseValues.description,
        description_eng: editWarehouseValues.description_eng,
        description_rus: editWarehouseValues.description_rus,
        latitude: editWarehouseValues.latlng.lat,
        longitude: editWarehouseValues.latlng.lng,
        meta_description: editWarehouseValues.meta_description,
        meta_name: editWarehouseValues.meta_name,
        system_id: editWarehouseValues.system_id,
      })
      .then((res) => {
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("წარმატებით რედაქტირდა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("ვერ რედაქტირდა!");
      })
      .finally(() => {
        setMainWarehouseLoader(false);
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] items-center relative">
      <h1 className="w-full">მთავარი საწყობი</h1>
      {mainWarehouseLoader && (
        <div className="w-[60px] h-[60px] flex items-center justify-center absolute top-[150px] left-[50%] translate-x-[-50%] z-[1]">
          <DotsLoader />
        </div>
      )}
      {mainWarehouseData?.id ? (
        <div className="flex flex-col gap-y-[20px] items-end w-full">
          <Input1
            title="კმ-ის ფასი"
            name="delivery_km_price"
            type="text"
            firstValue={mainWarehouseData.delivery_km_price}
            setAllValues={setEditWarehouseValues}
            error={errors.delivery_km_price}
          />
          <Input1
            title="აღწერა"
            name="description"
            type="text"
            firstValue={mainWarehouseData.description}
            setAllValues={setEditWarehouseValues}
            error={false}
          />
          <Input1
            title="აღწერა EN"
            name="description_eng"
            type="text"
            firstValue={mainWarehouseData.description_eng}
            setAllValues={setEditWarehouseValues}
            error={false}
          />
          <Input1
            title="აღწერა RUS"
            name="description_rus"
            type="text"
            firstValue={mainWarehouseData.description_rus}
            setAllValues={setEditWarehouseValues}
            error={false}
          />
          <Input1
            title="სისტემის ID"
            name="system_id"
            type="text"
            firstValue={mainWarehouseData.system_id}
            setAllValues={setEditWarehouseValues}
            error={errors.system_id}
          />
          <Input1
            title="მეტა აღწერა"
            name="meta_description"
            type="text"
            firstValue={mainWarehouseData.meta_description}
            setAllValues={setEditWarehouseValues}
            error={false}
          />
          <Input1
            title="მეტა სახელი"
            name="meta_name"
            type="text"
            firstValue={mainWarehouseData.meta_name}
            setAllValues={setEditWarehouseValues}
            error={false}
          />

          <div className="bg-gray-200 w-full h-[300px] overflow-hidden rounded-[8px]">
            <Map
              activeCenter={{
                lat: Number(mainWarehouseData?.latitude),
                lng: Number(mainWarehouseData?.longitude),
              }}
              activeMarkerPosition={{
                lat: Number(mainWarehouseData?.latitude),
                lng: Number(mainWarehouseData?.longitude),
              }}
              name="latlng"
              setAllValues={setEditWarehouseValues}
            />
          </div>
          <div className="w-[200px]">
            <GreenButton
              name="რედაქტირება"
              action={handleEditMainWarehouseValidation}
              loader={mainWarehouseLoader}
              style="h-[50px] text-[18px]"
            />
          </div>
        </div>
      ) : (
        <p>
          {mainWarehouseLoader ? "საწყობი იძებნება.." : "საწყობი არ არსებობს"}
        </p>
      )}
    </div>
  );
}
