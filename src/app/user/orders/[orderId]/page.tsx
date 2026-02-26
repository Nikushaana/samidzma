"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import UserOrderProdCard from "@/app/components/CardVariations/UserOrderProdCard";
import usePaymethods from "../../../../../dataFetchs/payMethodsContext";
import dynamic from "next/dynamic";

const NewMap = dynamic(() => import("@/app/components/map/newMap"), {
  ssr: false,
});

export default function Page({ params }: { params: { orderId: string } }) {
  const router = useRouter();
  const { payMethodData } = usePaymethods();

  const [loaderUserOrder, setLoaderUserOrder] = useState<boolean>(true);
  const [userOneOrderData, setUserOneOrderData] = useState<any>();

  useEffect(() => {
    setLoaderUserOrder(true);

    axiosUser
      .get(`user/order/${params.orderId}`)
      .then((res) => {
        setUserOneOrderData(res.data);
        setLoaderUserOrder(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.orderId]);

  return (
    <div className={`relative w-full`}>
      {loaderUserOrder ? (
        <div className="flex justify-center my-[60px] absolute top-0 left-[50%] translate-x-[-50%] w-full">
          <div className="w-[40px] h-[40px]">
            <DotsLoader />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-[20px]">
          <div className="flex items-center gap-[20px]">
            <div className="w-[80px]">
              <GreenButton
                name="უკან"
                action={() => {
                  router.push("/user/orders");
                }}
                style="h-[40px] text-[18px]"
              />
            </div>
            <p>შეკვეთა N{userOneOrderData?.id}</p>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <p className="select-none text-[14px]">
              შეკვეთის თარიღი: {userOneOrderData.updatedAt.split("T")[0]},{" "}
              {userOneOrderData.updatedAt.split("T")[1].split(".")[0]}
            </p>
            <hr />
            <h1>
              შეკვეთაში არის {userOneOrderData?.ordersDetails?.length} პროდუქტი
            </h1>

            <div className="w-full grid grid-cols-3 max-2xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] bg-[#f7f7f7] max-lg:bg-transparent p-[5px] max-lg:p-0 rounded-[12px]">
              {userOneOrderData?.ordersDetails?.map(
                (item: any, index: number) => (
                  <UserOrderProdCard key={index} item={item} />
                ),
              )}
            </div>
            <h1 className="select-none text-[14px]">
              პროდუქტების საერთო ფასი:{" "}
              <span>{userOneOrderData?.finally_price}₾</span>
            </h1>
            <hr />
            <h1>შეკვეთის დამატებითი ინფორმაცია</h1>
            <p className="select-none text-[14px]">
              მობილური ნომერი:{" "}
              <span>
                {userOneOrderData?.phone
                  .replace(/[^0-9]/g, "")
                  .replace(/\s/g, "")
                  .replace(/(.{3})/g, "$1 ")
                  .trim()
                  .slice(0, 11)}
              </span>
            </p>
            <p className="select-none text-[14px]">
              ალტერნატიული მობილურის ნომერი:{" "}
              <span>
                {userOneOrderData?.phone_two &&
                  userOneOrderData?.phone_two
                    .replace(/[^0-9]/g, "")
                    .replace(/\s/g, "")
                    .replace(/(.{3})/g, "$1 ")
                    .trim()
                    .slice(0, 11)}
              </span>
            </p>
            <p className="select-none text-[14px]">
              სახელი: <span>{userOneOrderData?.name}</span>
            </p>
            <p className="select-none text-[14px]">
              მეილი: <span>{userOneOrderData?.email}</span>
            </p>
            <p className="select-none text-[14px]">
              მიტანის მეთოდი:{" "}
              <span>
                {userOneOrderData?.is_delivery
                  ? "კურიერის მიერ"
                  : "თვითგატანა მაღაზიიდან"}
              </span>
            </p>

            {userOneOrderData?.is_delivery === 1 && (
              <div className="flex flex-col gap-y-[10px]">
                <p className="select-none text-[14px]">
                  მიტანის თარიღი: <span>{userOneOrderData?.delivery_day}</span>
                </p>

                <p className="select-none text-[14px]">
                  ქუჩა: <span>{userOneOrderData?.delivery_address}</span>
                </p>
                <p className="select-none text-[14px]">
                  სახლი:{" "}
                  <span>{userOneOrderData?.delivery_building_number}</span>
                </p>
                <p className="select-none text-[14px]">
                  დამატებითი ინფორმაცია :{" "}
                  <span>{userOneOrderData?.description}</span>
                </p>
                <p className="select-none text-[14px]">
                  კურიერის მომსახურების ფასი:{" "}
                  <span>{userOneOrderData?.delivery_price}₾</span>
                </p>
              </div>
            )}

            <p className="select-none text-[14px]">
              გადახდის მეთოდი:{" "}
              <span>
                {
                  payMethodData?.find(
                    (item: any) =>
                      item?.pay_method === userOneOrderData?.pay_method,
                  )?.name
                }
              </span>
            </p>

            {userOneOrderData?.is_delivery === 1 && (
              <div className="h-[350px] w-full">
                <NewMap
                  activeArea={[
                    Number(userOneOrderData?.delivery_address_lat ?? 0),
                    Number(userOneOrderData?.delivery_address_lng ?? 0),
                  ]}
                  notClickable={true}
                />
              </div>
            )}
            {/* {userOneOrderData?.is_delivery === 1 && (
                <Map
                  activeArea={{
                    lat: Number(userOneOrderData?.delivery_address_lat),
                    lng: Number(userOneOrderData?.delivery_address_lng),
                  }}
                  notClickable={true}
                />
            )} */}
            <h1>
              სულ გადასახდელია:{" "}
              {(
                userOneOrderData?.delivery_price +
                userOneOrderData?.finally_price
              ).toFixed(2)}
              ₾
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
