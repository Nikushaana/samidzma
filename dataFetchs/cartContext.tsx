"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { UserContext } from "./UserAxios";

export const CartAxiosContext = createContext<any>(null);

const CartContext = ({ children }: any) => {
  const { user } = useContext(UserContext);
  const [CartData, setCartData] = useState<any>();
  const [CartCounter, setCartCounter] = useState<number>(0);
  const [CartSum, setCartSum] = useState<number>(0);
  const [CartPoints, setCartPoints] = useState<number>(0);
  const [CartLoader, setCartLoader] = useState<boolean>(true);
  const [renderCart, setRenderCart] = useState<any>();

  const [CartLocalStorageData, setCartLocalStorageData] = useState<any>([]);

  // order values

  const [orderPlacementValues, setOrderPlacementValues] = useState<any>({
    order_details: {
      product_id: "",
      product_name: "",
      quantity: "",
      isComplete: "",
    },

    phone: "",
    name: "",
    email: "",

    is_delivery: 0,

    delivery_day: "",
    delivery_time_from: "",
    delivery_time_to: "",
    delivery_street: "",
    delivery_building_number: "",
    delivery_house_door_number: "",
    description: "",
    latlng: {
      lat: 0,
      lng: 0,
    },

    pay_method: "",

    product_gift_id: "",
  });

  const [makeOrderLoader, setMakeOrderLoader] = useState<boolean>(false);

  // order values

  useEffect(() => {
    setCartLoader(true);

    if (user?.id) {
      localStorage.setItem("SamiDzma-cart", "[]");

      axiosUser
        .get("user/cart")
        .then((res) => {
          setCartData(res.data);
          setCartCounter(res.data.total);

          setCartSum(
            res.data.data.reduce((sum: number, cartProd: any) => {
              const product = res.data.product.find(
                (prod: any) => cartProd.product_id === prod.ProdCode
              );
              if (product) {
                return sum + cartProd.quantity * product.Fasi1;
              }
              return sum;
            }, 0)
          );
          setCartPoints(
            res.data.product.reduce(
              (point: any, product: any) => point + product.Point,
              0
            )
          );
          setOrderPlacementValues((prev: any) => ({
            ...prev,
            order_details: res.data.data.map((product: any) => ({
              product_id: product.product_id,
              product_name: product.product_name,
              quantity: product.quantity,
              isComplete: product.isComplete,
            })),
          }));
        })
        .catch((err) => {
          setCartCounter(0);
        })
        .finally(() => {
          setCartLoader(false);
        });
    } else {
      // localstorage cart data
      const getCart = localStorage.getItem("SamiDzma-cart");
      setCartLocalStorageData(getCart ? JSON.parse(getCart) : []);
      // localstorage cart data

      const productIds = getCart
        ? JSON.parse(getCart).map((item: any) => item.product_id)
        : [].map((item: any) => item.product_id);

      setCartCounter(getCart ? JSON.parse(getCart).length : [].length);

      axiosUser
        .post(`front/someProduct`, {
          ids: productIds,
        })
        .then((res) => {
          setCartData({ product: res.data });

          setCartPoints(
            res.data.reduce(
              (point: any, product: any) => point + product.Point,
              0
            )
          );

          setCartSum(
            getCart &&
              JSON.parse(getCart).reduce((sum: number, cartProd: any) => {
                const product = res.data.find(
                  (prod: any) => cartProd.product_id === prod.ProdCode
                );
                if (product) {
                  return (
                    sum +
                    cartProd.quantity *
                      (CartLocalStorageData.find(
                        (cart: any) => cart.product_id === product.ProdCode
                      )?.isComplete
                        ? product.ComplectPrice
                        : product.Fasi1)
                  );
                }
                return sum;
              }, 0)
          );

          setOrderPlacementValues((prev: any) => ({
            ...prev,
            order_details: res.data.map((product: any) => ({
              product_id: product.ProdCode,
              product_name: product.ProductName,
              quantity:
                getCart &&
                JSON.parse(getCart).find(
                  (item1: any) => item1.product_id === product.ProdCode
                ).quantity,
              isComplete:
                getCart &&
                JSON.parse(getCart).find(
                  (item1: any) => item1.product_id === product.ProdCode
                ).isComplete,
            })),
          }));
        })
        .catch((err) => {})
        .finally(() => {
          setCartLoader(false);
        });
    }
  }, [renderCart, user]);

  return (
    <CartAxiosContext.Provider
      value={{
        CartData,
        CartLoader,
        setCartLoader,
        setRenderCart,
        CartCounter,
        CartSum,
        CartPoints,
        setCartCounter,

        CartLocalStorageData,

        orderPlacementValues,
        setOrderPlacementValues,
        makeOrderLoader,
        setMakeOrderLoader,
      }}
    >
      {children}
    </CartAxiosContext.Provider>
  );
};

export default CartContext;
