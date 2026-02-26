"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { UserContext } from "./UserAxios";
import * as Yup from "yup";
import { ContextForSharingStates } from "./sharedStates";

export const CartAxiosContext = createContext<any>(null);

const CartContext = ({ children }: any) => {
  const pagemountedLocalStorage = useRef(false);
  const { user } = useContext(UserContext);
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );
  const [CartData, setCartData] = useState<any>();
  const [CartCounter, setCartCounter] = useState<number>(0);
  const [CartSum, setCartSum] = useState<number>(0);
  const [CartPoints, setCartPoints] = useState<number>(0);
  const [CartLoader, setCartLoader] = useState<boolean>(true);
  const [renderCart, setRenderCart] = useState<any>();

  const [CartLocalStorageData, setCartLocalStorageData] = useState<any>([]);

  const [orderPlacementValues, setOrderPlacementValues] = useState<any>({
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
    delivery_address: "",
    latlng: [0, 0],

    pay_method: "",

    product_gift_id: "",
  });

  const [samiDzmaOrderPlacementDetails, setSamiDzmaOrderPlacementDetails] =
    useState<any>({});

  useEffect(() => {
    if (pagemountedLocalStorage.current) return;
    pagemountedLocalStorage.current = true;

    const getSamiDzmaOrderPlacementDetails = localStorage.getItem(
      "order-placement-details-SamiDzma",
    );

    if (getSamiDzmaOrderPlacementDetails) {
      const parsedDetails = JSON.parse(getSamiDzmaOrderPlacementDetails);

      setOrderPlacementValues({
        ...parsedDetails,
        order_details:
          parsedDetails.order_details?.map((item: any) => ({
            ...item,
            quantity: Number(item.quantity),
          })) || [],
      });
      setSamiDzmaOrderPlacementDetails((prev: any) => ({
        ...prev,
        phone: parsedDetails.phone || "",
        phone_two: parsedDetails.phone_two || "",
        name: parsedDetails.name || "",
        email: parsedDetails.email || "",
        delivery_day: parsedDetails.delivery_day || "",
        delivery_building_number: parsedDetails.delivery_building_number || "",
        description: parsedDetails.description || "",
      }));
    }
  }, []);

  useEffect(() => {
    const filteredValues = Object.fromEntries(
      Object.entries(orderPlacementValues).filter(([key]) => key !== "latlng"),
    );

    localStorage.setItem(
      "order-placement-details-SamiDzma",
      JSON.stringify(filteredValues),
    );
  }, [orderPlacementValues]);

  const [errors, setErrors] = useState<any>({});

  const validationSchema = Yup.object({
    order_details: Yup.array().min(1, "დაამატე სასურველი პროდუქტები კალათში"),
    phone: Yup.string().matches(
      /^\d{3} \d{3} \d{3}$/,
      "შეავსე მობილურის ნომერი სწორად",
    ),
    phone_two: Yup.string().matches(
      /^\d{3} \d{3} \d{3}$/,
      "შეავსე ალტერნატიული მობილურის ნომერი სწორად",
    ),
    name: Yup.string().required("სახელი სავალდებულოა"),
    email: Yup.string().matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "მეილის ფორმატი არასწორია",
    ),

    delivery_day: Yup.string().when("is_delivery", {
      is: 1,
      then: (schema) => schema.required("მიტანის თარიღი სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),

    delivery_building_number: Yup.string().when("is_delivery", {
      is: 1,
      then: (schema) => schema.required("შენობის ნომერი სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),

    description: Yup.string().when("is_delivery", {
      is: 1,
      then: (schema) => schema.required("დამატებითი აღწერა სავალდებულოა"),
      otherwise: (schema) => schema.notRequired(),
    }),

    pay_method: Yup.string().required("გადახდის მეთოდი სავალდებულოა"),
  });

  const [makeOrderLoader, setMakeOrderLoader] = useState<boolean>(false);

  // order values

  useEffect(() => {
    setCartLoader(true);

    if (user?.id) {
      localStorage.setItem("Cart-SamiDzma", "[]");

      axiosUser
        .get("user/cart")
        .then((res) => {
          setCartData(res.data.data);
          setCartCounter(res.data.total);

          setCartSum(
            res.data.data.reduce((sum: number, cartProd: any) => {
              const price =
                cartProd.product.Fasi_dic !== cartProd.product.Fasi18
                  ? cartProd.product.Fasi_dic
                  : cartProd.product_price;
              return sum + cartProd.quantity * price;
            }, 0),
          );
          setCartPoints(
            res.data.data.reduce(
              (point: any, product: any) => point + product.product.Point,
              0,
            ),
          );
          setOrderPlacementValues((prev: any) => ({
            ...prev,
            order_details: res.data.data.map((product: any) => ({
              product_id: product.product_id,
              product_name: product.product_name,
              quantity: Number(product.quantity),
              isComplete: product.isComplete,
            })),
          }));
        })
        .catch((err) => {})
        .finally(() => {
          setCartLoader(false);
        });
    } else {
      // localstorage cart data
      const getCart = localStorage.getItem("Cart-SamiDzma");
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
          setCartData(res.data);

          setCartPoints(
            res.data.reduce(
              (point: any, product: any) => point + product.Point,
              0,
            ),
          );

          setCartSum(
            getCart &&
              JSON.parse(getCart).reduce((sum: number, cartProd: any) => {
                const product = res.data.find(
                  (prod: any) => cartProd.product_id === prod.ProdCode,
                );
                if (product) {
                  return (
                    sum +
                    cartProd.quantity *
                      (CartLocalStorageData.find(
                        (cart: any) => cart.product_id === product.ProdCode,
                      )?.isComplete
                        ? product.ComplectPrice
                        : product.Fasi_dic !== product.Fasi18
                          ? product.Fasi_dic
                          : product.Fasi18)
                  );
                }
                return sum;
              }, 0),
          );

          setOrderPlacementValues((prev: any) => ({
            ...prev,
            order_details: res.data.map((product: any) => ({
              product_id: product.ProdCode,
              product_name: product.ProductName,
              quantity:
                getCart &&
                Number(
                  JSON.parse(getCart).find(
                    (item1: any) => item1.product_id === product.ProdCode,
                  ).quantity,
                ),
              isComplete:
                getCart &&
                JSON.parse(getCart).find(
                  (item1: any) => item1.product_id === product.ProdCode,
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

  // get delivery price
  const [deliveryCost, setDeliveryCost] = useState<any>({});

  useEffect(() => {
    if (
      orderPlacementValues.latlng &&
      orderPlacementValues.latlng[0] &&
      orderPlacementValues.latlng[1] &&
      orderPlacementValues.is_delivery == 1
    ) {
      axiosUser
        .post(`front/calculateRoadPrice`, {
          location_latitude: orderPlacementValues.latlng[0],
          location_longitude: orderPlacementValues.latlng[1],
          location_name: "",
        })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("მიტანის ფასი გამოითვალა");

          setDeliveryCost(res.data);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText(
            err.response.data.message == "km more than max_km"
              ? "პინი აღემატება დაფარვის ზონას"
              : "მიტანის ფასი ვერ გამოითვალა!",
          );

          setOrderPlacementValues((prev: any) => ({
            ...prev,
            latlng: [0,0],
          }));
        })
        .finally(() => {});
    }
  }, [
    orderPlacementValues.is_delivery,
    orderPlacementValues.latlng,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  ]);
  // get delivery price

  return (
    <CartAxiosContext.Provider
      value={{
        CartData,
        CartLoader,
        setCartLoader,
        setRenderCart,
        CartCounter,
        CartSum,
        deliveryCost,
        setDeliveryCost,
        CartPoints,
        setCartCounter,

        CartLocalStorageData,

        samiDzmaOrderPlacementDetails,

        orderPlacementValues,
        setOrderPlacementValues,
        makeOrderLoader,
        setMakeOrderLoader,
        validationSchema,
        errors,
        setErrors,
      }}
    >
      {children}
    </CartAxiosContext.Provider>
  );
};

export default CartContext;
