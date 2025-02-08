"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import GreenButton from "@/app/components/buttons/greenButton";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import usePaymethods from "../../../../dataFetchs/payMethodsContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import OrderProdCard from "@/app/components/CardVariations/OrderProdCard";
import Map from "@/app/components/map/map";

export default function Page() {
  const router = useRouter();
  const {
    CartData,
    CartLoader,
    orderPlacementValues,
    setOrderPlacementValues,
    errors,
  } = useContext(CartAxiosContext);

  const { payMethodData } = usePaymethods();

  const [samiDzmaOrderPlacementDetails, setSamiDzmaOrderPlacementDetails] =
    useState<any>({});

  useEffect(() => {
    const getSamiDzmaOrderPlacementDetails = localStorage.getItem(
      "SamiDzma-order-placement-details"
    );
    if (getSamiDzmaOrderPlacementDetails) {
      const parsedDetails = JSON.parse(getSamiDzmaOrderPlacementDetails);

      setSamiDzmaOrderPlacementDetails((prev: any) => ({
        ...prev,
        phone: parsedDetails.phone || "",
        name: parsedDetails.name || "",
        email: parsedDetails.email || "",
      }));
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[20px]">
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px]">შენი შეკვეთა</h1>
          <div
            onClick={() => {
              router.push("/cart");
            }}
            className="flex items-center justify-center w-[31px] h-[31px] bg-[#EEEEEE] rounded-full text-[18px] cursor-pointer"
          >
            <HiPencil />
          </div>
        </div>
        <div className="flex flex-col gap-y-[10px]">
          {CartLoader && (
            <div className="flex justify-center my-[60px]">
              <div className="w-[40px] h-[40px]">
                <DotsLoader />
              </div>
            </div>
          )}
          {CartData?.product?.map((item: any, index: number) => (
            <OrderProdCard key={item.ProdCode} item={item} />
          ))}
        </div>
      </div>
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <h1 className="text-[22px]">1. საკონტაქტო ინფორმაცია</h1>

        <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-[20px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">მობილური ნომერი</p>
            <Input1
              placeholder="+995 5-- --- ---"
              type="text"
              isNumber={true}
              firstValue={
                samiDzmaOrderPlacementDetails.phone
                  ? samiDzmaOrderPlacementDetails.phone
                      .replace(/[^0-9]/g, "")
                      .replace(/\s/g, "")
                      .replace(/(.{3})/g, "$1 ")
                      .trim()
                      .slice(0, 11)
                  : ""
              }
              name="phone"
              setAllValues={setOrderPlacementValues}
            />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">სახელი</p>
            <Input1
              placeholder="Mark"
              type="text"
              firstValue={samiDzmaOrderPlacementDetails.name || ""}
              name="name"
              setAllValues={setOrderPlacementValues}
            />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">მეილი</p>
            <Input1
              placeholder="emailmax@gmai.com"
              type="text"
              firstValue={samiDzmaOrderPlacementDetails.email || ""}
              name="email"
              setAllValues={setOrderPlacementValues}
            />
          </div>
        </div>
      </div>
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <h1 className="text-[22px]">2. მიტანის მეთოდი</h1>

        <div className="flex flex-col gap-y-[10px]">
          <div
            onClick={() => {
              setOrderPlacementValues((prev: any) => ({
                ...prev,
                is_delivery: 0,
              }));
            }}
            className={`flex items-center justify-between rounded-full cursor-pointer py-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 ${
              orderPlacementValues.is_delivery === 0 && "bg-[#f7f7f7]"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 ${
                  orderPlacementValues.is_delivery === 0
                    ? "border-myGreen"
                    : "border-[#E2E2E2]"
                }`}
              >
                <div
                  className={`w-[7px] h-[7px] rounded-full duration-100 ${
                    orderPlacementValues.is_delivery === 0 ? "bg-myGreen" : ""
                  }`}
                ></div>
              </div>
              <p className="text-[14px]">თვითგატანა მაღაზიიდან</p>
            </div>
            <p className="text-myGreen">უფასო</p>
          </div>
          <div
            onClick={() => {
              setOrderPlacementValues((prev: any) => ({
                ...prev,
                is_delivery: 1,
              }));
            }}
            className={`flex flex-col gap-y-[20px] cursor-pointer pt-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 ${
              orderPlacementValues.is_delivery === 1
                ? "bg-[#f7f7f7] pb-[20px] rounded-[12px]"
                : "gap-y-0 pb-[10px] rounded-[33px]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[10px]">
                <div
                  className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 ${
                    orderPlacementValues.is_delivery === 1
                      ? "border-myGreen"
                      : "border-[#E2E2E2]"
                  }`}
                >
                  <div
                    className={`w-[7px] h-[7px] rounded-full duration-100 ${
                      orderPlacementValues.is_delivery === 1 ? "bg-myGreen" : ""
                    }`}
                  ></div>
                </div>
                <p className="text-[14px]">კურიერის მიერ</p>
              </div>
              <h1 className="">20.00₾</h1>
            </div>
            {orderPlacementValues.is_delivery === 1 && (
              <div
                className={`grid grid-cols-4 max-sm:grid-cols-1 gap-[20px] px-[15px] max-sm:px-0 ${
                  orderPlacementValues.is_delivery === 1
                    ? ""
                    : "overflow-hidden"
                }`}
              >
                <div className="col-span-2 max-sm:col-span-1">
                  <Input1
                    title="მიტანის თარიღი"
                    placeholder="15.07.2024"
                    type="date"
                    name="delivery_day"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-2 max-sm:col-span-1">
                  <Input1
                    title="დრო"
                    placeholder="8:00"
                    type="time"
                    name="delivery_time_from"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-2 max-sm:col-span-1">
                  <Input1
                    title="ქუჩა"
                    placeholder="შეიყვანე ქუჩის სახელი"
                    type="text"
                    name="delivery_street"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-2 max-sm:col-span-1">
                  <Input1
                    title="სახლი"
                    placeholder="შეიყვანე ქუჩის/სახლის N"
                    type="text"
                    name="delivery_building_number"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-4 max-sm:col-span-1">
                  <Input1
                    title="ბინა"
                    placeholder="შეიყვანე ბინის N"
                    type="text"
                    name="delivery_house_door_number"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-4 max-sm:col-span-1">
                  <TextArea1
                    title="დამატებითი ინფორმაცია"
                    name="description"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
                <div className="col-span-4 max-sm:col-span-1 h-[300px] rounded-[22px] overflow-hidden">
                  <Map
                    // activeCenter={{
                    //   lat: Number(mainWarehouseData?.latitude),
                    //   lng: Number(mainWarehouseData?.longitude),
                    // }}
                    // activeMarkerPosition={{
                    //   lat: Number(mainWarehouseData?.latitude),
                    //   lng: Number(mainWarehouseData?.longitude),
                    // }}
                    name="latlng"
                    setAllValues={setOrderPlacementValues}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <h1 className="text-[22px]">3. გადახდის მეთოდი</h1>

        <div className="flex flex-col gap-y-[10px]">
          {payMethodData.filter((data: any) => data.status === 1).length > 0 ? (
            payMethodData
              .filter((data: any) => data.status === 1)
              .map((item: any, index: number) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setOrderPlacementValues((prev: any) => ({
                      ...prev,
                      pay_method: item.pay_method,
                    }));
                  }}
                  className={`border-[1px] cursor-pointer rounded-full h-[42px] px-[15px] flex items-center gap-[10px] duration-100 ${
                    errors.pay_method ? "border-[red]" : "border-[#E2E2E2] "
                  } ${
                    orderPlacementValues.pay_method === item.pay_method &&
                    "bg-[#f7f7f7]"
                  }`}
                >
                  <div
                    className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 ${
                      orderPlacementValues.pay_method === item.pay_method
                        ? "border-myGreen"
                        : "border-[#E2E2E2]"
                    }`}
                  >
                    <div
                      className={`w-[7px] h-[7px] rounded-full duration-100 ${
                        orderPlacementValues.pay_method === item.pay_method
                          ? "bg-myGreen"
                          : ""
                      }`}
                    ></div>
                  </div>
                  <p className="text-[14px]">{item.name}</p>
                </div>
              ))
          ) : (
            <p className="text-[14px] text-gray-400">
              გადახდის მეთოდები ამჟამად მიუწვდომელია!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
