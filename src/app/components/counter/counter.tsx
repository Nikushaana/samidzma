import React, { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function Counter({
  prodStock,
  setCounterValue,
  cartItemData,
}: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { setRenderCart, CartLocalStorageData } = useContext(CartAxiosContext);
  const { user } = useContext(UserContext);

  const [value, setValue] = useState<number>(1);

  // handle increase
  const HandleIncrease = () => {
    setValue((prev: any) => (prev === prodStock ? prev : prev + 1));
    if (cartItemData) {
      if (user?.id) {
        axiosUser
          .post(`user/cart/${cartItemData.id}`, {
            quantity: value === prodStock ? value : value + 1,
          })
          .then((res) => {
            setAlertShow(true);
            setAlertStatus(true);
            setAlertText("რაოდენობა შეიცვალა");
            setRenderCart(res);
          })
          .catch((err) => {
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
              quantity: cart.quantity + 1,
            };
          }
          return cart;
        });
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რაოდენობა შეიცვალა");
        localStorage.setItem("SamiDzma-cart", JSON.stringify(updatedCart));
        setRenderCart(new Date());
      }
    }
  };

  // handle decrease
  const HandleDecrease = () => {
    setValue((prev: any) => (prev > 1 ? prev - 1 : prev));
    if (cartItemData) {
      if (user?.id) {
        axiosUser
          .post(`user/cart/${cartItemData.id}`, {
            quantity: value > 1 ? value - 1 : value,
          })
          .then((res) => {
            setAlertShow(true);
            setAlertStatus(true);
            setAlertText("რაოდენობა შეიცვალა");
            setRenderCart(res);
          })
          .catch((err) => {
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
              quantity: cart.quantity - 1,
            };
          }
          return cart;
        });
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რაოდენობა შეიცვალა");
        localStorage.setItem("SamiDzma-cart", JSON.stringify(updatedCart));
        setRenderCart(new Date());
      }
    }
  };

  // write in counter's value cartQuantity
  useEffect(() => {
    if (cartItemData?.quantity) {
      setValue(cartItemData?.quantity);
    }
  }, [cartItemData?.quantity, user?.id]);

  // set counter value to parent
  useEffect(() => {
    if (setCounterValue) {
      setCounterValue(value);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-[5px]">
      <div
        onClick={() => {
          HandleDecrease();
        }}
        className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
      >
        <BiMinus />
      </div>
      <p className="text-[18px] ">{value}</p>
      <div
        onClick={() => {
          HandleIncrease();
        }}
        className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer rounded-full border-[1px]"
      >
        <BiPlus />
      </div>
    </div>
  );
}
