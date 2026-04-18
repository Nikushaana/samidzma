import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Counter from "../counter/counter";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { fetchDeliveryInfo } from "@/api/deliveryInfo.api";
import { useQuery } from "@tanstack/react-query";

export default function CartCard({ item }: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );
  const { user } = useContext(UserContext);
  const {
    setRenderCart,
    CartCounter,
    CartLocalStorageData,
    orderPlacementValues,
    setOrderPlacementValues,
  } = useContext(CartAxiosContext);

  const { data: deiveryInfoData = [] } = useQuery({
    queryKey: ["deiveryInfo"],
    queryFn: fetchDeliveryInfo,
    staleTime: 1000 * 60 * 5,
  });

  // used states
  const [deleteCartloader, setDeleteCartLoader] = useState<boolean>(false);
  const [prodStock, setProdStock] = useState<any>();
  // used states

  // delete from cart
  const HandleDeleteFromCart = () => {
    if (user?.id) {
      setDeleteCartLoader(true);
      axiosUser
        .delete(`user/cart/${item.id}`)
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("კალათიდან წარმატებით წაიშალა");
          setRenderCart(res);

          if (
            (orderPlacementValues.is_delivery == 0 ||
              orderPlacementValues.is_delivery == 1) &&
            CartCounter == 1
          ) {
            setOrderPlacementValues({
              order_details: [
                {
                  product_id: "",
                  product_name: "",
                  quantity: "",
                  isComplete: "",
                },
              ],
              phone: "",
              phone_two: "",
              name: "",
              email: "",
              is_delivery: null,
              store: {},
              delivery_day: "",
              delivery_time_to: "",
              delivery_building_number: "",
              description: "",
              latlng: {
                lat: 0,
                lng: 0,
              },
              pay_method: "",
              product_gift_id: "",
            });
          }
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("კალათიდან ვერ წაიშალა!");
        })
        .finally(() => {
          setDeleteCartLoader(false);
        });
    } else {
      if (
        CartLocalStorageData.some(
          (cart: any) => cart.product_id == item.ProdCode,
        )
      ) {
        const updatedCart = CartLocalStorageData.filter(
          (cart1: any) => cart1.product_id !== item.ProdCode,
        );
        localStorage.setItem("Cart-SamiDzma", JSON.stringify(updatedCart));
        setRenderCart(new Date());
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კალათიდან წარმატებით წაიშალა");

        if (
          (orderPlacementValues.is_delivery == 0 ||
            orderPlacementValues.is_delivery == 1) &&
          CartLocalStorageData.length == 1
        ) {
          setOrderPlacementValues({
            order_details: [
              {
                product_id: "",
                product_name: "",
                quantity: "",
                isComplete: "",
              },
            ],
            phone: "",
            phone_two: "",
            name: "",
            email: "",
            is_delivery: null,
            store: {},
            delivery_day: "",
            delivery_time_to: "",
            delivery_building_number: "",
            description: "",
            latlng: {
              lat: 0,
              lng: 0,
            },
            pay_method: "",
            product_gift_id: "",
          });
        }
      }
    }
  };

  useEffect(() => {
    const prodCode = item.product_id || item.ProdCode;

    axiosUser
      .get(`front/productNashti?ProdCode=${prodCode}`)
      .then((res) => {
        setProdStock(
          item.isComplete
            ? Math.floor(
                res.data.StoreProdNashtebi.find(
                  (store: any) =>
                    store.StoreCode ==
                    (orderPlacementValues.is_delivery == 1
                      ? deiveryInfoData?.system_id
                      : orderPlacementValues.store?.StoreCode),
                )?.ProdNashtebi[0].Nashti / item.product.CountInComplect,
              )
            : res.data.StoreProdNashtebi?.find(
                (store: any) =>
                  store.StoreCode ==
                  (orderPlacementValues.is_delivery == 1
                    ? deiveryInfoData?.system_id
                    : orderPlacementValues.store?.StoreCode),
              )?.ProdNashtebi &&
                res.data.StoreProdNashtebi?.find(
                  (store: any) =>
                    store.StoreCode ==
                    (orderPlacementValues.is_delivery == 1
                      ? deiveryInfoData?.system_id
                      : orderPlacementValues.store?.StoreCode),
                )?.ProdNashtebi[0].Nashti,
        );
      })
      .catch((err) => {})
      .finally(() => {});
  }, [
    deiveryInfoData?.system_id,
    item.ProdCode,
    item.isComplete,
    item.product?.CountInComplect,
    item.product_id,
    orderPlacementValues.is_delivery,
    orderPlacementValues.store?.StoreCode,
  ]);

  return (
    <div
      className={`relative rounded-[12px] bg-white p-[10px] ${
        deleteCartloader && "pointer-events-none"
      }`}
    >
      <div className={`flex items-center justify-between gap-[20px] `}>
        <div
          onClick={() => {
            HandleDeleteFromCart();
          }}
          className="flex items-center justify-center absolute top-[10px] right-[10px] text-gray-600 text-[20px] w-[30px] h-[30px] cursor-pointer"
        >
          <BsXLg />
        </div>
        <div className="flex items-center gap-[27px] max-sm:w-[40%]">
          <div className="relative aspect-video h-[175px] max-lg:aspect-square flex items-center justify-center rounded-[8px] overflow-hidden">
            {item.main_image || item.product?.main_image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${
                  item.main_image || item.product?.main_image
                }`}
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
            )}
          </div>
          <div className="flex flex-col gap-y-[10px] max-sm:hidden">
            <div className="flex items-center gap-[10px] text-[#509E07]">
              <FaCheck />
              <p>მარაგშია</p>
            </div>
            <h1 className="text-[22px]">
              {item.ProductName || item.product_name}
            </h1>
            <p className="text-[14px]">
              {/* ზომა: */}
              {/* {item.FormaName || item.product.FormaName} */}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end max-sm:items-start gap-y-[20px] max-sm:gap-y-[5px]">
          <div className="items-center gap-[10px] text-[#509E07] hidden max-sm:flex">
            <FaCheck />
            <p>მარაგშია</p>
          </div>
          <h1 className="text-[22px] hidden max-sm:flex">
            {item.ProductName || item.product_name}
          </h1>
          <p className="text-[14px] hidden max-sm:flex">
            {/* ზომა: */}
            {/* {item.FormaName || item.product.FormaName} */}
          </p>
          <div className="flex items-center">
            <div className="flex items-end">
              <h1 className="text-[20px]">
                {user.id
                  ? item.isComplete
                    ? item.product.ComplectPrice.toFixed(2)
                    : item.product.Fasi_dic !== item.product.Fasi18
                      ? item.product.Fasi_dic.toFixed(2)
                      : item.product_price.toFixed(2)
                  : CartLocalStorageData.find(
                        (cart: any) => cart.product_id === item.ProdCode,
                      )?.isComplete
                    ? item.ComplectPrice.toFixed(2)
                    : item.Fasi_dic !== item.Fasi18
                      ? item.Fasi_dic.toFixed(2)
                      : item.Fasi18.toFixed(2)}
                ₾
              </h1>
              {user.id
                ? !item.isComplete &&
                  item.product.Fasi_dic !== item.product.Fasi18 && (
                    <p className="text-[14px] text-gray-400 line-through pl-[5px]">
                      {item.product.Fasi18.toFixed(2)}₾
                    </p>
                  )
                : !CartLocalStorageData.find(
                    (cart: any) => cart.product_id === item.ProdCode,
                  )?.isComplete &&
                  item.Fasi_dic !== item.Fasi18 && (
                    <p className="text-[14px] text-gray-400 line-through pl-[5px]">
                      {item.Fasi18.toFixed(2)}₾
                    </p>
                  )}
            </div>
            <h1 className="pl-[5px] text-[14px] text-gray-500">
              {user?.id
                ? item?.isComplete
                  ? "კომპლექტი"
                  : "ცალი"
                : CartLocalStorageData.find(
                      (cart: any) => cart.product_id === item.ProdCode,
                    )?.isComplete
                  ? "კომპლექტი"
                  : "ცალი"}
            </h1>
          </div>

          <div className="flex max-sm:hidden">
            <Counter
              IntegerQuantity={
                user?.id
                  ? item.product.IntegerQuantity
                  : CartLocalStorageData.find(
                      (cart: any) => cart.product_id === item.ProdCode,
                    )?.IntegerQuantity
              }
              minValue={
                (user?.id
                  ? item.product.min_value
                  : CartLocalStorageData.find(
                      (cart: any) => cart.product_id === item.ProdCode,
                    )?.min_value) || 1
              }
              prodStock={prodStock}
              cartItemData={
                user?.id
                  ? item
                  : CartLocalStorageData.find(
                      (cart: any) => cart.product_id === item.ProdCode,
                    )
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-[20px] hidden max-sm:flex place-self-end max-tiny:place-self-center">
        <Counter
          IntegerQuantity={
            user?.id
              ? item.product.IntegerQuantity
              : CartLocalStorageData.find(
                  (cart: any) => cart.product_id === item.ProdCode,
                )?.IntegerQuantity
          }
          minValue={
            (user?.id
              ? item.product.min_value
              : CartLocalStorageData.find(
                  (cart: any) => cart.product_id === item.ProdCode,
                )?.min_value) || 1
          }
          prodStock={prodStock}
          cartItemData={
            user?.id
              ? item
              : CartLocalStorageData.find(
                  (cart: any) => cart.product_id === item.ProdCode,
                )
          }
        />
      </div>
    </div>
  );
}
