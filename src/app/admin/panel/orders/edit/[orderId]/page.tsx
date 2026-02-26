"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../../../../dataFetchs/sharedStates";
import { axiosAdmin } from "../../../../../../../dataFetchs/AxiosToken";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import UserOrderProdCard from "@/app/components/CardVariations/UserOrderProdCard";
import usePaymethods from "../../../../../../../dataFetchs/payMethodsContext";
import useSamidzmaBranches from "../../../../../../../dataFetchs/samidzmaBranchesContext";
import { DeiveryInfoContext } from "../../../../../../../dataFetchs/deliveryInfoContext";
import dynamic from "next/dynamic";

const NewMap = dynamic(() => import("@/app/components/map/newMap"), {
  ssr: false,
});

export default function Page({ params }: { params: { orderId: string } }) {
  const router = useRouter();

  const {
    setAlertShow,
    setAlertStatus,
    setAlertText,
    order_status,
    setAllAdminUserOrderRender,
  } = useContext(ContextForSharingStates);
  const { allSamidzmaBranchesData } = useSamidzmaBranches();
  const { deiveryInfoData } = useContext(DeiveryInfoContext);

  const { payMethodData } = usePaymethods();
  const [loaderEditAdminUserOrder, setLoaderEditAdminUserOrder] =
    useState<boolean>(true);
  const [editAdminUserOrderValue, setEditAdminUserOrderValue] = useState<any>({
    order_status: "",
  });

  const [oneAdminUserOrderValues, setOneAdminUserOrderValues] = useState<any>();

  const [payBack, setPayBack] = useState<any>({
    payBackMoney: "",
  });
  const [payBackLoader, setPayBackLoader] = useState<any>(false);

  useEffect(() => {
    setLoaderEditAdminUserOrder(true);
    axiosAdmin
      .get(`admin/userOrder/orders/${params.orderId}`)
      .then((res) => {
        setOneAdminUserOrderValues(res.data);

        setLoaderEditAdminUserOrder(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.orderId]);

  const HandlePayBack = () => {
    if (payBack.payBackMoney > 0) {
      setPayBackLoader(true);
      axiosAdmin
        .get(
          `admin/refundAmountOrder?order_id=${params.orderId}&amount=${payBack.payBackMoney}`,
        )
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("თანხა გადაირიცხა");
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("თანხა ვერ გადაირიცხა!");
        })
        .finally(() => {
          setPayBackLoader(false);
        });
    }
  };

  const HandleEditAdminUserOrder = () => {
    setLoaderEditAdminUserOrder(true);
    axiosAdmin
      .post(`admin/userOrder/orders/${params.orderId}`, {
        order_status: order_status.find(
          (item: any) => item.name === editAdminUserOrderValue.order_status,
        )?.nameEng,
      })
      .then((res) => {
        setAllAdminUserOrderRender(res);
        router.push("/admin/panel/orders");
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("შეკვეთის სტატუსი შეიცვალა");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("შეკვეთის სტატუსი ვერ შეიცვალა!");
      })
      .finally(() => {
        setLoaderEditAdminUserOrder(false);
      });
  };

  return (
    <div
      className={`flex flex-col gap-y-[20px] items-end duration-100 ${
        (loaderEditAdminUserOrder || payBackLoader) &&
        "pointer-events-none opacity-[0.5]"
      }`}
    >
      <h1 className="w-full">შეკვეთის რედაქტირება</h1>

      <div className="w-full flex flex-col gap-y-[10px]">
        <div className="flex items-end max-sm:flex-col max-sm:items-end gap-[20px] justify-between">
          <div className="w-[300px] max-sm:w-full">
            <DropDown1value
              title="შეკვეთის სტატუსი"
              data={order_status}
              firstValue={
                order_status.find(
                  (item: any) =>
                    item.nameEng === oneAdminUserOrderValues?.order_status,
                )?.name
              }
              name="order_status"
              setAllValues={setEditAdminUserOrderValue}
              error={false}
            />
          </div>

          <div className="w-[200px]">
            <GreenButton
              name="რედაქტირება"
              action={HandleEditAdminUserOrder}
              loader={loaderEditAdminUserOrder}
              style="h-[50px] text-[18px]"
            />
          </div>
        </div>
        <p className="select-none text-[14px]">
          შეკვეთის თარიღი: {oneAdminUserOrderValues?.updatedAt?.split("T")[0]},{" "}
          {oneAdminUserOrderValues?.updatedAt?.split("T")[1].split(".")[0]}
        </p>
        <hr />
        <h1>
          შეკვეთაში არის {oneAdminUserOrderValues?.ordersDetails?.length}{" "}
          პროდუქტი
        </h1>

        <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] bg-[#f7f7f7] max-lg:bg-transparent p-[5px] max-lg:p-0 rounded-[12px]">
          {oneAdminUserOrderValues?.ordersDetails?.map(
            (item: any, index: number) => (
              <UserOrderProdCard key={index} item={item} />
            ),
          )}
        </div>
        <h1 className="select-none text-[14px]">
          პროდუქტების საერთო ფასი:{" "}
          <span>{oneAdminUserOrderValues?.finally_price}₾</span>
        </h1>
        <hr />
        <h1>შეკვეთის დამატებითი ინფორმაცია</h1>
        <p className="select-none text-[14px]">
          მობილური ნომერი:{" "}
          <span>
            {oneAdminUserOrderValues?.phone
              ?.replace(/[^0-9]/g, "")
              .replace(/\s/g, "")
              .replace(/(.{3})/g, "$1 ")
              .trim()
              .slice(0, 11)}
          </span>
        </p>
        <p className="select-none text-[14px]">
          სახელი: <span>{oneAdminUserOrderValues?.name}</span>
        </p>
        <p className="select-none text-[14px]">
          მეილი: <span>{oneAdminUserOrderValues?.email}</span>
        </p>
        <p className="select-none text-[14px]">
          მიტანის მეთოდი:{" "}
          <span>
            {oneAdminUserOrderValues?.is_delivery
              ? "კურიერის მიერ"
              : "თვითგატანა მაღაზიიდან"}
          </span>
        </p>
        <p className="select-none text-[14px]">
          სამიძმის ფილიალი:{" "}
          <span>
            {allSamidzmaBranchesData.find(
              (item: any) =>
                item.StoreCode == oneAdminUserOrderValues?.store_code,
            )?.StoreName ||
              (deiveryInfoData?.system_id ==
                oneAdminUserOrderValues?.store_code &&
                "მთავარი საწყობი")}
          </span>
        </p>

        {oneAdminUserOrderValues?.is_delivery === 1 && (
          <div className="flex flex-col gap-y-[10px]">
            <p className="select-none text-[14px]">
              მიტანის თარიღი:{" "}
              <span>{oneAdminUserOrderValues?.delivery_day}</span>
            </p>

            <p className="select-none text-[14px]">
              ქუჩა: <span>{oneAdminUserOrderValues?.delivery_address}</span>
            </p>
            <p className="select-none text-[14px]">
              სახლი:{" "}
              <span>{oneAdminUserOrderValues?.delivery_building_number}</span>
            </p>
            <p className="select-none text-[14px]">
              დამატებითი ინფორმაცია :{" "}
              <span>{oneAdminUserOrderValues?.description}</span>
            </p>
            <p className="select-none text-[14px]">
              კურიერის მომსახურების ფასი:{" "}
              <span>{oneAdminUserOrderValues?.delivery_price}₾</span>
            </p>
          </div>
        )}

        <p className="select-none text-[14px]">
          გადახდის მეთოდი:{" "}
          <span>
            {
              payMethodData?.find(
                (item: any) =>
                  item?.pay_method == oneAdminUserOrderValues?.pay_method,
              )?.name
            }
          </span>
        </p>
        <p className="select-none text-[14px]">
          გადახდის სტატუსი:{" "}
          <span>
            {oneAdminUserOrderValues?.pay_status == 0 ||
            oneAdminUserOrderValues?.pay_status == 3
              ? "გადახდა ვერ/არ მოხდა"
              : oneAdminUserOrderValues?.pay_status == 1 &&
                "გადახდა წარმატებით შესრულდა"}
          </span>
        </p>
        {oneAdminUserOrderValues?.pay_method === "BOG" && (
          <div className="flex flex-col gap-[10px]">
            <h1 className="">თანხის უკან გადარიცხვა</h1>

            <div className="flex gap-[10px] max-sm:flex-col">
              <div className="w-[300px] max-sm:w-full">
                <Input1
                  digit={true}
                  name="payBackMoney"
                  type="text"
                  setAllValues={setPayBack}
                />
              </div>
              <div className="w-[300px] max-sm:w-full">
                <GreenButton
                  name="გადარიცხვა"
                  action={HandlePayBack}
                  loader={payBackLoader}
                  style="h-[50px] text-[18px] max-sm:text-[16px]"
                />
              </div>
            </div>
          </div>
        )}
        {oneAdminUserOrderValues?.is_delivery === 1 && (
          <div className="h-[350px] w-full">
          <NewMap
            activeArea={[
              Number(oneAdminUserOrderValues?.delivery_address_lat ?? 0),
              Number(oneAdminUserOrderValues?.delivery_address_lng ?? 0),
            ]}
            notClickable={true}
          />
          </div>
        )}
        {/* {oneAdminUserOrderValues?.is_delivery === 1 && (
          <Map
            activeArea={{
              lat: Number(oneAdminUserOrderValues?.delivery_address_lat),
              lng: Number(oneAdminUserOrderValues?.delivery_address_lng),
            }}
            notClickable={true}
          />
        )} */}
        <h1>
          სულ გადასახდელია:{" "}
          {(
            oneAdminUserOrderValues?.delivery_price +
            oneAdminUserOrderValues?.finally_price
          ).toFixed(2)}
          ₾
        </h1>
      </div>
    </div>
  );
}
