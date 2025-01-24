"use client";

import GreenButton from "@/app/components/buttons/greenButton";
import Input1 from "@/app/components/Inputs/Input1";
import TextArea1 from "@/app/components/Inputs/TextArea1";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DropDown1value from "@/app/components/DropDowns/DropDown1value";
import TextEditor from "@/app/components/Inputs/TextEditor";
import { axiosUser } from "../../../../../dataFetchs/AxiosToken";
import DotsLoader from "@/app/components/loaders/DotsLoader";
import ProductCard from "@/app/components/CardVariations/ProductCard";
import UserOrderProdCard from "@/app/components/CardVariations/UserOrderProdCard";

export default function Page({ params }: { params: { orderId: string } }) {
  const router = useRouter();

  const [loaderUserOrder, setLoaderUserOrder] = useState<boolean>(true);
  const [userOneOrderData, setUserOneOrderData] = useState<any>();

  useEffect(() => {
    setLoaderUserOrder(true);
    axiosUser
      .get(`user/orderItems/${params.orderId}`)
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
            <p>შეკვეთა N{userOneOrderData?.order_items[0].order_id}</p>
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <p>შეკვეთაში არის {userOneOrderData?.total} პროდუქტი</p>
            <div className="w-full grid grid-cols-3 max-2xl:grid-cols-2 max-sm:grid-cols-1 gap-[20px] bg-[#f7f7f7] max-lg:bg-transparent p-[5px] max-lg:p-0 rounded-[12px]">
              {userOneOrderData?.order_items?.map((item: any, index: number) => (
                <UserOrderProdCard
                  key={index}
                  item={item}
                  productName={
                    userOneOrderData?.product.find(
                      (product: any) => product.ProdCode === item.product_id
                    )?.ProductName
                  }
                  Description={
                    userOneOrderData?.product.find(
                      (product: any) => product.ProdCode === item.product_id
                    )?.DescriptionName
                  }
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
