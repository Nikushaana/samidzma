"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosAdmin } from "../../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import { ContextForSharingStates } from "../../../../../dataFetchs/sharedStates";
import Input1 from "@/app/components/Inputs/Input1";
import GreenButton from "@/app/components/buttons/greenButton";
import * as Yup from "yup";
import useStores from "../../../../../dataFetchs/storesContext";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import useSalaro from "../../../../../dataFetchs/salaroContext";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import InputTime from "@/app/components/Inputs/InputTime";
import dynamic from "next/dynamic";

const NewMap = dynamic(() => import("@/app/components/map/newMap"), {
  ssr: false,
});

export default function Page() {
  const { setAlertShow, setAlertStatus, setAlertText, status } = useContext(
    ContextForSharingStates,
  );
  const { StoresData } = useStores();
  const { SalaroData } = useSalaro();

  const [mainWarehouseData, setMainWarehouseData] = useState<any>({});
  const [mainWarehouseLoader, setMainWarehouseLoader] = useState<boolean>(true);

  const [editWarehouseValues, setEditWarehouseValues] = useState({
    max_km: "",
    free_price: "",
    first_hours: "",
    initial_km: "",
    initial_km_price: "",
    delivery_km_price: "",
    min_price: "",
    status: "",
    use_today: "",
    cash_salaro_system_id: "",
    bog_salaro_system_id: "",
    tbc_salaro_system_id: "",
    unipay_salaro_system_id: "",
    system_id: "",
    description: "",
    description_eng: "",
    description_rus: "",
    meta_description: "",
    meta_name: "",
    latlng: [0, 0],
  });

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    max_km: Yup.string().required("მაქსიმალური კმ სავალდებულოა"),
    free_price: Yup.string().required("უფასო სავალდებულოა"),
    first_hours: Yup.string().required("გარდამტეხი დრო სავალდებულოა"),
    initial_km: Yup.string().required("საწყისი კმ სავალდებულოა"),
    initial_km_price: Yup.string().required("საწყისი კმ-ის ფასი სავალდებულოა"),
    delivery_km_price: Yup.string().required(
      "მიტანის სერვისის კმ-ის ფასი სავალდებულოა",
    ),
    system_id: Yup.string().required("მთავარი საწყობი სავალდებულოა"),
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
        setAlertText(
          newErrors.max_km ||
            newErrors.free_price ||
            newErrors.first_hours ||
            newErrors.initial_km ||
            newErrors.initial_km_price ||
            newErrors.delivery_km_price ||
            newErrors.system_id,
        );
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
        max_km: editWarehouseValues.max_km,
        free_price: editWarehouseValues.free_price,
        first_hours: editWarehouseValues.first_hours,
        initial_km: editWarehouseValues.initial_km,
        initial_km_price: editWarehouseValues.initial_km_price,
        delivery_km_price: editWarehouseValues.delivery_km_price,
        min_price: editWarehouseValues.min_price,
        status: status.find(
          (item: any) => item.name === editWarehouseValues.status,
        )?.id,
        use_today: status.find(
          (item: any) => item.name === editWarehouseValues.use_today,
        )?.id,

        cash_salaro_system_id: SalaroData.find(
          (item: any) =>
            item.SalaroName == editWarehouseValues.cash_salaro_system_id,
        )?.SalaroCode,
        bog_salaro_system_id: SalaroData.find(
          (item: any) =>
            item.SalaroName == editWarehouseValues.bog_salaro_system_id,
        )?.SalaroCode,
        tbc_salaro_system_id: SalaroData.find(
          (item: any) =>
            item.SalaroName == editWarehouseValues.tbc_salaro_system_id,
        )?.SalaroCode,
        unipay_salaro_system_id: SalaroData.find(
          (item: any) =>
            item.SalaroName == editWarehouseValues.unipay_salaro_system_id,
        )?.SalaroCode,
        system_id: StoresData.find(
          (item: any) => item.StoreName == editWarehouseValues.system_id,
        )?.StoreCode,
        description: editWarehouseValues.description,
        description_eng: editWarehouseValues.description_eng,
        description_rus: editWarehouseValues.description_rus,
        meta_description: editWarehouseValues.meta_description,
        meta_name: editWarehouseValues.meta_name,
        latitude: editWarehouseValues.latlng[0],
        longitude: editWarehouseValues.latlng[1],
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
          <div className="w-full grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <Input1
              title="მაქსიმალური კმ"
              name="max_km"
              type="text"
              firstValue={mainWarehouseData.max_km}
              setAllValues={setEditWarehouseValues}
              error={errors.max_km}
            />
            <Input1
              title="უფასო"
              name="free_price"
              type="text"
              firstValue={mainWarehouseData.free_price}
              setAllValues={setEditWarehouseValues}
              error={errors.free_price}
            />
            <Input1
              title="საწყისი კმ"
              name="initial_km"
              type="text"
              firstValue={mainWarehouseData.initial_km}
              setAllValues={setEditWarehouseValues}
              error={errors.initial_km}
            />
            <Input1
              title="საწყისი კმ-ის ფასი"
              name="initial_km_price"
              type="text"
              firstValue={mainWarehouseData.initial_km_price}
              setAllValues={setEditWarehouseValues}
              error={errors.initial_km_price}
            />
            <Input1
              title="მიტანის სერვისის კმ-ის ფასი"
              name="delivery_km_price"
              type="text"
              firstValue={mainWarehouseData.delivery_km_price}
              setAllValues={setEditWarehouseValues}
              error={errors.delivery_km_price}
            />
            <Input1
              title="მინიმალური ფასი"
              name="min_price"
              type="text"
              firstValue={mainWarehouseData.min_price}
              setAllValues={setEditWarehouseValues}
            />

            <InputTime
              title="გარდამტეხი დრო"
              placeholder="მაგ: 8:00"
              type="time"
              name="first_hours"
              firstValue={mainWarehouseData.first_hours}
              setAllValues={setEditWarehouseValues}
              error={errors.first_hours}
            />
            <DropDown1value
              title="მიტანის სერვისი"
              data={status}
              firstValue={
                status.find((item: any) => item.id == mainWarehouseData.status)
                  ?.name
              }
              name="status"
              setAllValues={setEditWarehouseValues}
              error={false}
            />
            <DropDown1value
              title="დღევანდელ დღეს მიტანა"
              data={status}
              firstValue={
                status.find(
                  (item: any) => item.id == mainWarehouseData.use_today,
                )?.name
              }
              name="use_today"
              setAllValues={setEditWarehouseValues}
              error={false}
            />
          </div>
          <hr className="h-[1px] w-full" />
          <div className="w-full grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <DropDown1value
              title="ქეშის სალარო"
              data={SalaroData}
              firstValue={
                SalaroData.find(
                  (item: any) =>
                    item.SalaroCode == mainWarehouseData.cash_salaro_system_id,
                )?.SalaroName
              }
              name="cash_salaro_system_id"
              setAllValues={setEditWarehouseValues}
              error={false}
              searchable={true}
            />
            <DropDown1value
              title="BOG სალარო"
              data={SalaroData}
              firstValue={
                SalaroData.find(
                  (item: any) =>
                    item.SalaroCode == mainWarehouseData.bog_salaro_system_id,
                )?.SalaroName
              }
              name="bog_salaro_system_id"
              setAllValues={setEditWarehouseValues}
              error={false}
              searchable={true}
            />
            <DropDown1value
              title="TBC სალარო"
              data={SalaroData}
              firstValue={
                SalaroData.find(
                  (item: any) =>
                    item.SalaroCode == mainWarehouseData.tbc_salaro_system_id,
                )?.SalaroName
              }
              name="tbc_salaro_system_id"
              setAllValues={setEditWarehouseValues}
              error={false}
              searchable={true}
            />
            <DropDown1value
              title="unipay სალარო"
              data={SalaroData}
              firstValue={
                SalaroData.find(
                  (item: any) =>
                    item.SalaroCode ==
                    mainWarehouseData.unipay_salaro_system_id,
                )?.SalaroName
              }
              name="unipay_salaro_system_id"
              setAllValues={setEditWarehouseValues}
              error={false}
              searchable={true}
            />
          </div>
          <DropDown1value
            title="მთავარი საწყობი"
            data={StoresData}
            firstValue={
              StoresData.find(
                (item: any) => item.StoreCode == mainWarehouseData.system_id,
              )?.StoreName
            }
            name="system_id"
            setAllValues={setEditWarehouseValues}
            error={errors.system_id}
          />
          <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <TextArea1
              title="აღწერა"
              name="description"
              firstValue={mainWarehouseData.description}
              setAllValues={setEditWarehouseValues}
              error={false}
            />
            <TextArea1
              title="აღწერა EN"
              name="description_eng"
              firstValue={mainWarehouseData.description_eng}
              setAllValues={setEditWarehouseValues}
              error={false}
            />
            <TextArea1
              title="აღწერა RUS"
              name="description_rus"
              firstValue={mainWarehouseData.description_rus}
              setAllValues={setEditWarehouseValues}
              error={false}
            />
          </div>
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

          <div className="h-[350px] w-full">
            <NewMap
              activeArea={[
                Number(mainWarehouseData?.latitude ?? 0),
                Number(mainWarehouseData?.longitude ?? 0),
              ]}
              name="latlng"
              setAllValues={setEditWarehouseValues}
              chooseTbilisiArea={false}
            />
          </div>

          {/* <Map
            activeArea={{
              lat: Number(mainWarehouseData?.latitude),
              lng: Number(mainWarehouseData?.longitude),
            }}
            name="latlng"
            setAllValues={setEditWarehouseValues}
            chooseTbilisiArea={false}
          /> */}
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
