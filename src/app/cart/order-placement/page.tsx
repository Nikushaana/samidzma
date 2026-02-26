"use client";

import React, { useContext } from "react";
import { HiPencil } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import usePaymethods from "../../../../dataFetchs/payMethodsContext";
import OrderProdCard from "@/app/components/CardVariations/OrderProdCard";
import InputCalendar from "@/app/components/Inputs/InputCalendar";
import useHolidaysFront from "../../../../dataFetchs/holidaysFrontContext";
import dynamic from "next/dynamic";

const NewMap = dynamic(() => import("@/app/components/map/newMap"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const { HolidaysFrontData } = useHolidaysFront();
  const {
    CartData,
    CartLoader,

    deliveryCost,
    samiDzmaOrderPlacementDetails,
    orderPlacementValues,

    setOrderPlacementValues,
    errors,
  } = useContext(CartAxiosContext);
  const { payMethodData } = usePaymethods();

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
          {!CartLoader && CartData.length < 1 && (
            <p className="text-[15px] text-[red]">
              დაამატე სასურველი პროდუქტები კალათში
            </p>
          )}
          {CartData?.map((item: any, index: number) => (
            <OrderProdCard key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <h1 className="text-[22px]">1. საკონტაქტო ინფორმაცია</h1>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-[20px]">
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">მობილური ნომერი</p>
            <Input1
              placeholder="5-- --- ---"
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
              error={errors.phone}
            />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">
              ალტერნატიული მობილურის ნომერი
            </p>
            <Input1
              placeholder="5-- --- ---"
              type="text"
              isNumber={true}
              firstValue={
                samiDzmaOrderPlacementDetails.phone_two
                  ? samiDzmaOrderPlacementDetails.phone_two
                      .replace(/[^0-9]/g, "")
                      .replace(/\s/g, "")
                      .replace(/(.{3})/g, "$1 ")
                      .trim()
                      .slice(0, 11)
                  : ""
              }
              name="phone_two"
              setAllValues={setOrderPlacementValues}
              error={errors.phone_two}
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
              error={errors.name}
            />
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <p className="text-[12px] mx-[20px]">მეილი</p>
            <Input1
              placeholder="emailmax@gmail.com"
              type="text"
              firstValue={samiDzmaOrderPlacementDetails.email || ""}
              name="email"
              setAllValues={setOrderPlacementValues}
              error={errors.email}
            />
          </div>
        </div>
      </div>
      <div className="p-[30px] max-lg:p-[20px] pt-[20px] rounded-[12px] bg-white flex flex-col gap-y-[20px]">
        <h1 className="text-[22px]">2. მიტანის მეთოდი</h1>

        <div className="flex flex-col gap-y-[10px]">
          {orderPlacementValues.is_delivery === 0 && (
            <div
              className={`h-[50px] flex items-center justify-between rounded-full cursor-pointer py-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 
               bg-[#f7f7f7]`}
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 border-myGreen`}
                >
                  <div
                    className={`w-[7px] h-[7px] rounded-full duration-100 bg-myGreen`}
                  ></div>
                </div>
                <p className="text-[14px] max-sm:text-[13px]">
                  თვითგატანა მაღაზიიდან
                </p>
              </div>
              <div>
                <h1 className="max-sm:text-[11px]">
                  {orderPlacementValues.store.StoreCode &&
                    orderPlacementValues.store?.StoreName}
                </h1>
                <p className="text-[11px] text-gray-400">
                  {orderPlacementValues.store?.Address}
                </p>
              </div>
            </div>
          )}
          {orderPlacementValues.is_delivery === 1 && (
            <div
              className={`flex flex-col cursor-pointer pt-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 bg-[#f7f7f7] pb-[20px] rounded-[22px] gap-y-[20px]`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <div
                    className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 border-myGreen
                        `}
                  >
                    <div
                      className={`w-[7px] h-[7px] rounded-full duration-100 bg-myGreen`}
                    ></div>
                  </div>
                  <p className="text-[14px] max-sm:text-[13px]">
                    კურიერის მიერ
                  </p>
                </div>
                <h1 className="max-sm:text-[11px]">
                  {deliveryCost?.price?.delivery_price
                    ? `ფასი ${deliveryCost.price.delivery_price.toFixed(2)} ₾`
                    : "მიუთითე ლოკაცია"}
                </h1>
              </div>
              <div
                className={`flex flex-col gap-[20px] px-[15px] max-sm:px-0 `}
              >
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] w-full">
                  <InputCalendar
                    title="მიტანის თარიღი"
                    placeholder="მაგ: 15.07.2024"
                    name="delivery_day"
                    firstValue={
                      samiDzmaOrderPlacementDetails.delivery_day || ""
                    }
                    setAllValues={setOrderPlacementValues}
                    holidays={HolidaysFrontData}
                    error={errors.delivery_day}
                  />
                  <Input1
                    title="შენობის ნომერი"
                    placeholder="შეიყვანე შენობის ნომერი .."
                    type="text"
                    name="delivery_building_number"
                    firstValue={
                      samiDzmaOrderPlacementDetails.delivery_building_number ||
                      ""
                    }
                    setAllValues={setOrderPlacementValues}
                    error={errors.delivery_building_number}
                  />
                </div>

                <div className="w-full">
                  <TextArea1
                    title="დამატებითი ინფორმაცია"
                    placeholder="შეიყვანე დამატებითი ინფორმაცია .."
                    name="description"
                    firstValue={samiDzmaOrderPlacementDetails.description || ""}
                    setAllValues={setOrderPlacementValues}
                    error={errors.description}
                  />
                </div>
                <div className="w-full h-[350px]">
                  <NewMap
                    name="latlng"
                    name1="delivery_address"
                    setAllValues={setOrderPlacementValues}
                    chooseTbilisiArea={true}
                  />
                  {/* <Map
                    name="latlng"
                    name1="delivery_address"
                    // activeArea={}
                    setAllValues={setOrderPlacementValues}
                    chooseTbilisiArea={true}
                  /> */}
                </div>
              </div>
            </div>
          )}
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
                  className={`border-[1px] cursor-pointer rounded-full py-[10px] px-[15px] duration-100 ${
                    errors.pay_method ? "border-[red]" : "border-[#E2E2E2] "
                  } ${
                    orderPlacementValues.pay_method === item.pay_method &&
                    `bg-[#f7f7f7] flex items-center justify-between ${
                      item.account &&
                      "gap-[10px] max-sm:flex-col max-sm:items-start"
                    }`
                  }`}
                >
                  <div className="flex items-center gap-[10px]">
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
                  {orderPlacementValues.pay_method === item.pay_method &&
                    item.account && (
                      <p className="text-[14px] max-sm:w-full text-center">
                        {item.account}
                      </p>
                    )}
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
