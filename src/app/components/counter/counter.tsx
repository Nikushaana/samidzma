import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function Counter({
  IntegerQuantity,
  minValue,
  prodStock,
  setCounterValue,
  cartItemData,
}: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { setRenderCart, CartLocalStorageData } = useContext(CartAxiosContext);
  const { user } = useContext(UserContext);

  const [value, setValue] = useState<string>("1");

  const [increaseDecrease, setIncreaseDecrease] = useState<string>("");

  // handle increase
  const HandleIncrease = (quantity: any) => {
    if (
      Number((Number(value) + quantity).toFixed(IntegerQuantity ? 0 : 3)) >
      prodStock
    ) {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("სასურველი რაოდენობა ვერ მოიძებნა!");
    } else {
      setValue((prev: any) =>
        (Number(prev) + quantity).toFixed(IntegerQuantity ? 0 : 3)
      );
      if (cartItemData) {
        if (user?.id) {
          axiosUser
            .post(`user/cart/${cartItemData.id}`, {
              quantity: (Number(value) + quantity).toFixed(
                IntegerQuantity ? 0 : 3
              ),
            })
            .then((res) => {
              setAlertShow(true);
              setAlertStatus(true);
              setAlertText("რაოდენობა შეიცვალა");
              setRenderCart(res);
            })
            .catch((err) => {
              if (cartItemData?.quantity) {
                setValue(
                  Number(cartItemData?.quantity)?.toFixed(
                    IntegerQuantity ? 0 : 3
                  )
                );
              }
              setAlertShow(true);
              setAlertStatus(false);
              setAlertText("რაოდენობა ვერ შეიცვალა!");
              setRenderCart(err);
            })
            .finally(() => {});
        } else {
          const updatedCart = CartLocalStorageData.map((cart: any) => {
            if (cart.product_id === cartItemData?.product_id) {
              return {
                ...cart,
                quantity: (Number(cart.quantity) + quantity).toFixed(
                  IntegerQuantity ? 0 : 3
                ),
              };
            }
            return cart;
          });
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("რაოდენობა შეიცვალა");
          localStorage.setItem("Cart-SamiDzma", JSON.stringify(updatedCart));
          setRenderCart(new Date());
        }
      }
    }
  };

  // handle decrease
  const HandleDecrease = (quantity: any) => {
    if (
      Number((Number(value) - quantity).toFixed(IntegerQuantity ? 0 : 3)) <
      Number(minValue)
    ) {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("აირჩიე დაშვებული მინიმალური რაოდენობა!");
    } else {
      setValue((prev: any) =>
        (Number(prev) - quantity).toFixed(IntegerQuantity ? 0 : 3)
      );
      if (cartItemData) {
        if (user?.id) {
          axiosUser
            .post(`user/cart/${cartItemData.id}`, {
              quantity: (Number(value) - quantity).toFixed(
                IntegerQuantity ? 0 : 3
              ),
            })
            .then((res) => {
              setAlertShow(true);
              setAlertStatus(true);
              setAlertText("რაოდენობა შეიცვალა");
              setRenderCart(res);
            })
            .catch((err) => {
              if (cartItemData?.quantity) {
                setValue(
                  Number(cartItemData?.quantity)?.toFixed(
                    IntegerQuantity ? 0 : 3
                  )
                );
              }

              setAlertShow(true);
              setAlertStatus(false);
              setAlertText("რაოდენობა ვერ შეიცვალა!");
              setRenderCart(err);
            })
            .finally(() => {});
        } else {
          const updatedCart = CartLocalStorageData.map((cart: any) => {
            if (cart.product_id === cartItemData?.product_id) {
              return {
                ...cart,
                quantity: (Number(cart.quantity) - quantity).toFixed(
                  IntegerQuantity ? 0 : 3
                ),
              };
            }
            return cart;
          });
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("რაოდენობა შეიცვალა");
          localStorage.setItem("Cart-SamiDzma", JSON.stringify(updatedCart));
          setRenderCart(new Date());
        }
      }
    }
  };

  useEffect(() => {
    if (cartItemData?.quantity) {
      setValue(
        Number(cartItemData?.quantity)?.toFixed(IntegerQuantity ? 0 : 3)
      );
    } else if (minValue > 1) {
      setValue(minValue?.toFixed(IntegerQuantity ? 0 : 3));
    }
  }, [IntegerQuantity, cartItemData?.quantity, user.id, minValue]);

  useEffect(() => {
    if (setCounterValue) {
      setCounterValue(Number(value));
    }
  }, [value]);

  return (
    <div className="flex items-center gap-[5px] overflow-hidden select-none">
      <div
        className={`flex items-center gap-[5px] duration-100 ${
          increaseDecrease == "decrease"
            ? "w-[135px] max-tiny:w-[115px]"
            : "w-0 overflow-hidden ml-[-5px]"
        }`}
      >
        <div
          onClick={() => {
            HandleDecrease(0.01);
          }}
          className="h-[38px] w-[70px] max-tiny:w-[60px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
        >
          <BiMinus /> <h1>0.01</h1>
        </div>
        <div
          onClick={() => {
            HandleDecrease(0.1);
          }}
          className="h-[38px] w-[60px] max-tiny:w-[50px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
        >
          <BiMinus />
          <h1>0.1</h1>
        </div>
      </div>
      <div
        onClick={() => {
          if (IntegerQuantity) {
            HandleDecrease(1);
          } else {
            if (increaseDecrease == "decrease") {
              HandleDecrease(1);
            } else {
              setIncreaseDecrease("decrease");
            }
          }
        }}
        className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
      >
        <BiMinus />
        {increaseDecrease == "decrease" && <h1>1</h1>}
      </div>

      <p className="text-[18px] bg-myYellow shrink-0 flex items-center justify-center w-[60px] max-tiny:text-[16px] max-tiny:w-[50px] h-[38px] rounded-full overflow-hidden">
        {value}
      </p>

      <div
        onClick={() => {
          if (IntegerQuantity) {
            HandleIncrease(1);
          } else {
            if (increaseDecrease == "increase") {
              HandleIncrease(1);
            } else {
              setIncreaseDecrease("increase");
            }
          }
        }}
        className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
      >
        <BiPlus />
        {increaseDecrease == "increase" && <h1>1</h1>}
      </div>

      <div
        className={`flex items-center gap-[5px] duration-100 ${
          increaseDecrease == "increase"
            ? "w-[135px] max-tiny:w-[115px]"
            : "w-0 overflow-hidden mr-[-5px]"
        }`}
      >
        <div
          onClick={() => {
            HandleIncrease(0.1);
          }}
          className="h-[38px] w-[60px] max-tiny:w-[50px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
        >
          <BiPlus /> <h1>0.1</h1>
        </div>
        <div
          onClick={() => {
            HandleIncrease(0.01);
          }}
          className="h-[38px] w-[70px] max-tiny:w-[60px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
        >
          <BiPlus />
          <h1>0.01</h1>
        </div>
      </div>
    </div>
  );
}
