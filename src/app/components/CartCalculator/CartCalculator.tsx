"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import GreenButton from "../buttons/greenButton";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Image from "next/image";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import ProductGifts from "../CardVariations/ProductGifts";

export default function CartCalculator() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    CartCounter,
    CartSum,
    CartPoints,
    orderPlacementValues,
    makeOrderLoader,
    setMakeOrderLoader,
    setRenderCart,
    validationSchema,
    setErrors,
  } = useContext(CartAxiosContext);

  const { user } = useContext(UserContext);

  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );

  // used states
  const [checkPromoCodeLoader, setCheckPromoCodeLoader] =
    useState<boolean>(false);
  const [promoCodeValue, setPromoCodeValue] = useState<string>("");
  const [promoCodeSale, setPromoCodeSale] = useState<any>({});
  // used states

  // check promo code
  const HandleCheckPromoCode = () => {
    setCheckPromoCodeLoader(true);
    if (promoCodeValue) {
      axiosUser
        .get(
          `front/promoCodeChecker?promoCode=${promoCodeValue}&price=${CartSum}`
        )
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("პრომო კოდი რეალურია");
          setPromoCodeSale(res.data);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("პრომო კოდი არ არსებობს!");
          setPromoCodeValue("");
          setPromoCodeSale({});
        })
        .finally(() => {
          setCheckPromoCodeLoader(false);
        });
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("შეიყვანე პრომო კოდი!");
      setCheckPromoCodeLoader(false);
    }
  };

  useEffect(() => {
    if (promoCodeValue) {
      HandleCheckPromoCode();
    }
  }, [CartSum]);
  // check promo code

  // gifts
  const [ProdGiftsData, setProdGiftsData] = useState<any>([]);
  const [ProdGiftsLoader, setProdGiftsLoader] = useState<boolean>(true);

  useEffect(() => {
    setProdGiftsLoader(true);
    axiosUser
      .post(`front/getAllGiftProduct`, {
        ...(!user?.id && { order_details: orderPlacementValues.order_details }),
      })
      .then((res) => {
        setProdGiftsData(res.data);

        setProdGiftsLoader(false);
      })
      .catch((err) => {})
      .finally(() => {});
  }, [orderPlacementValues.order_details, user?.id]);
  // gifts

  // make order
  const handleMakeOrderValidation = () => {
    validationSchema
      .validate(orderPlacementValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        if (orderPlacementValues.is_delivery) {
          if (
            orderPlacementValues.latlng.lng &&
            orderPlacementValues.latlng.lat
          ) {
            HandleMakeOrder();
          } else {
            setAlertShow(true);
            setAlertStatus(false);
            setAlertText("რუკაზე პინი სავალდებულოა!");
          }
        } else {
          HandleMakeOrder();
        }
      })
      .catch((err: any) => {
        const newErrors: any = {};
        err.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);

        setAlertShow(true);
        setAlertStatus(false);
        setAlertText(newErrors.order_details || newErrors.pay_method);
      });
  };

  const HandleMakeOrder = () => {
    setMakeOrderLoader(true);
    localStorage.setItem(
      "SamiDzma-order-placement-details",
      JSON.stringify({
        phone:
          orderPlacementValues.phone &&
          orderPlacementValues?.phone?.replace(/\s/g, ""),
        name: orderPlacementValues.name,
        email: orderPlacementValues.email,
        is_delivery: orderPlacementValues.is_delivery,

        pay_method: orderPlacementValues.pay_method,
      })
    );
    axiosUser
      .post(`front/order`, {
        order_details: orderPlacementValues.order_details,
        phone:
          orderPlacementValues.phone &&
          orderPlacementValues?.phone?.replace(/\s/g, ""),
        name: orderPlacementValues.name,
        email: orderPlacementValues.email,
        is_delivery: orderPlacementValues.is_delivery,

        delivery_day: orderPlacementValues.is_delivery
          ? orderPlacementValues.delivery_day
          : "",
        delivery_time_from: orderPlacementValues.is_delivery
          ? orderPlacementValues.delivery_time_from
          : "",

        delivery_street: orderPlacementValues.is_delivery
          ? orderPlacementValues.delivery_street
          : "",
        delivery_building_number: orderPlacementValues.is_delivery
          ? orderPlacementValues.delivery_building_number
          : "",
        delivery_house_door_number: orderPlacementValues.is_delivery
          ? orderPlacementValues.delivery_house_door_number
          : "",
        description: orderPlacementValues.is_delivery
          ? orderPlacementValues.description
          : "",
        delivery_address_lng:
          orderPlacementValues.is_delivery && orderPlacementValues.latlng.lng
            ? orderPlacementValues.latlng.lng
            : "",
        delivery_address_lat:
          orderPlacementValues.is_delivery && orderPlacementValues.latlng.lat
            ? orderPlacementValues.latlng.lat
            : "",

        pay_method: orderPlacementValues.pay_method,
        ...(promoCodeSale.newPrice && { promo_code: promoCodeValue }),
        ...(orderPlacementValues.product_gift_id && {
          product_gift_id: orderPlacementValues.product_gift_id,
        }),
      })
      .then((res) => {
        setRenderCart(res);
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("შეკვეთა წარმატებით შესრულდა");

        if (res.data.comment == "payment_method-CASH,") {
          router.push("/cart/order-placement/order-completed-successfully");
        } else {
          window.location.replace(res.data);
        }

        localStorage.setItem("SamiDzma-cart", "[]");
        localStorage.setItem("SamiDzma-favorites", "[]");
        localStorage.removeItem("SamiDzma-order-placement-details");
      })
      .catch((err) => {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("შეკვეთა ვერ შესრულდა!");
      })
      .finally(() => {
        setMakeOrderLoader(false);
      });
  };
  // make order

  return (
    <div
      className="w-[450px] max-lg:w-full self-start overflow-hidden rounded-[12px]
         bg-white flex flex-col"
    >
      <div className="p-[27px] max-sm:p-[20px] flex flex-col gap-y-[10px]">
        <div className="flex items-center gap-[15px]">
          <h1 className="text-[22px]">პრომოკოდი</h1>
          <p className="text-[14px]">
            შეიყვანე კუპონი ან პრომოკოდი ფასდაკლების მისაღებად
          </p>
        </div>
        <div
          className={`rounded-full bg-[#f7f7f7] overflow-hidden flex justify-between ${
            checkPromoCodeLoader && "pointer-events-none"
          }`}
        >
          <div className="flex items-center px-[20px] w-[80%]">
            <input
              type="text"
              value={promoCodeValue}
              placeholder="პრომოკოდი"
              className="text-[14px] w-full outline-none bg-transparent"
              onChange={(e) => {
                setPromoCodeValue(e.target.value);
              }}
            />
          </div>

          <GreenButton
            name="გაგზავნა"
            style="h-[42px] max-w-[104px] text-[14px]"
            loader={checkPromoCodeLoader}
            action={HandleCheckPromoCode}
          />
        </div>
      </div>
      <hr className="w-full h-[1px] bg-gray-300" />
      <div className="p-[27px] max-sm:p-[20px]  flex flex-col gap-y-[20px]">
        <GreenButton
          name={
            pathname.split("/")[2] === "order-placement"
              ? "შეკვეთის დასრულება"
              : "შეკვეთის გაფორმება"
          }
          action={() => {
            pathname.split("/")[2] === "order-placement"
              ? handleMakeOrderValidation()
              : router.push("/cart/order-placement");
          }}
          loader={
            pathname.split("/")[2] === "order-placement" && makeOrderLoader
          }
          style="h-[56px] max-sm:h-[48px] text-[18px]"
        />
        <div className="flex flex-col gap-y-[5px]">
          {user.id && (
            <div className="flex items-center justify-between">
              <p className="text-[14px]">ქულა</p>
              <h1 className="text-[20px]">{CartPoints || 0}</h1>
            </div>
          )}
          <div className="flex items-center justify-between">
            <p className="text-[14px]">პროდუქტები ({CartCounter})</p>
            <h1 className="text-[20px]">{CartSum?.toFixed(2) || 0} ₾</h1>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[14px]">ფასდაკლება</p>
            <h1 className="text-[20px]">
              {promoCodeSale?.discount_price
                ? `-${promoCodeSale?.discount_price?.toFixed(2)}`
                : 0}
              ₾
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[14px]">ჯამური ფასი</p>
          <h1 className="text-[34px]">
            {promoCodeSale?.newPrice?.toFixed(2) || CartSum?.toFixed(2)} ₾
          </h1>
        </div>
      </div>
      {pathname.split("/")[2] === "order-placement"
        ? !ProdGiftsLoader &&
          ProdGiftsData?.products?.length > 0 && (
            <div className="p-[27px] bg-[#E4E2E2] flex flex-col gap-y-[17px]">
              <h1 className="text-[14px]">აირჩიე საჩუქრად</h1>
              {ProdGiftsData?.products?.map((item: any, index: number) => (
                <ProductGifts
                  key={item.ProdCode}
                  item={item}
                  ProdGiftsData={ProdGiftsData}
                />
              ))}
            </div>
          )
        : !user.id && (
            <div>
              <div className="grid grid-cols-2 bg-myBlack h-[60px]">
                <h1
                  onClick={() => {
                    router.push("/auth/signin");
                  }}
                  className={`border-b-[4px] text-[18px] h-full flex items-center justify-center cursor-pointer duration-100 border-b-myGreen text-myGreen`}
                >
                  ავტორიზაცია
                </h1>
                <h1
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  className={`border-b-[4px] text-[18px] h-full flex items-center justify-center cursor-pointer duration-100 border-b-transparent text-white`}
                >
                  რეგისტრაცია
                </h1>
              </div>

              <hr className="w-full h-[1px] bg-white" />
              <div className="bg-myBlack py-[20px] flex items-center justify-center relative overflow-hidden">
                <div className="left-[-20px] bottom-[-30px] w-[100px] max-sm:w-[70px] h-[70px] absolute">
                  <Image
                    src="/images/coin.png"
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>

                <p className="text-[14px] text-white text-center">
                  დარეგისტრირების შემთხვევაში <br /> მიიღებ {CartPoints || 0}{" "}
                  ქულას
                </p>

                <div className="right-[30px] max-sm:right-[10px] top-[50%] translate-y-[-50%] max-sm:translate-y-[-20%] w-[50px] h-[50px] absolute">
                  <Image
                    src="/images/coin.png"
                    alt={""}
                    sizes="500px"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
