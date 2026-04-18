"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import CheckBox from "../Inputs/CheckBox";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import useIsInCart from "../../../../dataFetchs/isInCartHook";
import GreenButton from "../buttons/greenButton";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { BsXLg } from "react-icons/bs";
import { fetchDeliveryInfo } from "@/api/deliveryInfo.api";
import { useQuery } from "@tanstack/react-query";

export default function CreateCartPopUp() {
  const {
    createCartPopUp,
    setCreateCartPopUp,
    setOpenProductCardPopUp,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  } = useContext(ContextForSharingStates);
  const {
    setRenderCart,
    orderPlacementValues,
    setOrderPlacementValues,
    CartLocalStorageData,
  } = useContext(CartAxiosContext);
  const { setRenderWishList, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  const { data: deiveryInfoData = [] } = useQuery({
    queryKey: ["deiveryInfo"],
    queryFn: fetchDeliveryInfo,
    staleTime: 1000 * 60 * 5,
  });

  const { user } = useContext(UserContext);

  const [createCartloader, setCreateCartLoader] = useState<boolean>(false);

  const [createCartValues, setCreateCartValues] = useState<any>({
    is_delivery: null,
    store: {},
  });

  useEffect(() => {
    setCreateCartValues({
      is_delivery: orderPlacementValues.is_delivery,
      store: orderPlacementValues.store,
    });
  }, [
    orderPlacementValues.is_delivery,
    orderPlacementValues.store,
    createCartPopUp.popUpStatus,
  ]);

  const [prodStock, setProdStock] = useState(0);

  const [allBranchForFront, setAllBranchForFront] = useState([]);

  useEffect(() => {
    if (createCartPopUp.popUpStatus) {
      axiosUser
        .get("front/info/branch")
        .then((res) => {
          setAllBranchForFront(res.data.data);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [createCartPopUp.popUpStatus]);

  // get prod stock
  useEffect(() => {
    if (
      createCartPopUp.prodCode &&
      (createCartValues.is_delivery == 1 ||
        (createCartValues.is_delivery == 0 &&
          createCartValues.store?.StoreCode))
    ) {
      setCreateCartLoader(true);
      axiosUser
        .get(
          `front/productNashti?ProdCode=${createCartPopUp.prodCode}&StoreCode=${
            createCartValues.is_delivery == 1
              ? deiveryInfoData?.system_id
              : createCartValues.store?.StoreCode
          }`,
        )
        .then((res) => {
          setProdStock(res.data.StoreProdNashtebi[0].ProdNashtebi[0].Nashti);
        })
        .catch((err) => {})
        .finally(() => {
          setCreateCartLoader(false);
        });
    }
  }, [
    createCartPopUp.prodCode,
    createCartValues.is_delivery,
    createCartValues.store?.StoreCode,
    deiveryInfoData?.system_id,
  ]);
  // get prod stock

  // is in cart?
  const { setIsInCart } = useIsInCart(createCartPopUp.prodCode);
  // is in cart?

  // clear cart
  const HandleMoveProductFromCartToWishlist = () => {
    axiosUser
      .get(`user/moveProductFromCartToWishlist`)
      .then((res) => {
        setRenderCart(res);
        setRenderWishList(new Date());
      })
      .catch((err) => {})
      .finally(() => {});
  };
  // clear cart

  // add in cart
  const HandleAddCart = () => {
    if (
      (createCartValues.is_delivery == 0 &&
        createCartValues.store?.StoreCode) ||
      createCartValues.is_delivery == 1
    ) {
      if (createCartPopUp.changeMethod) {
        setOrderPlacementValues((prev: any) => ({
          ...prev,
          is_delivery: createCartValues.is_delivery,
          store: createCartValues.store,
        }));

        setCreateCartValues({
          is_delivery: null,
          store: {},
        });
        if (user?.id) {
          HandleMoveProductFromCartToWishlist();
        } else {
          const updatedFavorites = [
            ...WishListLocalStorageData,
            ...orderPlacementValues.order_details
              .map((item: any) => item.product_id)
              .filter(
                (item1: any) => !WishListLocalStorageData.includes(item1),
              ),
          ];

          localStorage.setItem(
            "SamiDzma-favorites",
            JSON.stringify(updatedFavorites),
          );
          setRenderWishList(new Date());

          localStorage.setItem("Cart-SamiDzma", "[]");
          setRenderCart(new Date());
        }
        setCreateCartPopUp({
          popUpStatus: false,
          changeMethod: false,
          prodCode: null,
          cartProdQuant: null,
          complect: null,
          IntegerQuantity: false,
          announcement: false,
          min_value: null,
        });

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კალათა განახლდა და მომსახურების მეთოდი შეიცვალა");
      } else {
        if (prodStock >= createCartPopUp.cartProdQuant) {
          if (user?.id) {
            setCreateCartLoader(true);
            axiosUser
              .post(`user/cart/`, {
                product_id: createCartPopUp.prodCode,
                quantity: createCartPopUp.cartProdQuant,
                isComplete: createCartPopUp.complect ? 1 : 0,
                store_code:
                  createCartValues.is_delivery == 0 &&
                  createCartValues.store?.StoreCode,
              })
              .then((res) => {
                setOpenProductCardPopUp(null);
                setAlertShow(true);
                setAlertStatus(true);
                setAlertText("კალათაში წარმატებით დაემატა");
                setRenderCart(res);

                setOrderPlacementValues((prev: any) => ({
                  ...prev,
                  is_delivery: createCartValues.is_delivery,
                  store: createCartValues.store,
                }));

                setCreateCartValues({
                  is_delivery: null,
                  store: {},
                });
                setCreateCartPopUp({
                  popUpStatus: false,
                  changeMethod: false,
                  prodCode: null,
                  cartProdQuant: null,
                  complect: null,
                  IntegerQuantity: false,
                  announcement: false,
                  min_value: null,
                });

                setIsInCart(true);
              })
              .catch((err) => {
                setAlertShow(true);
                setAlertStatus(false);
                setAlertText("კალათაში ვერ დაემატა!");
              })
              .finally(() => {
                setCreateCartLoader(false);
              });
          } else {
            if (
              !CartLocalStorageData.some(
                (cartData: any) =>
                  cartData.product_id === createCartPopUp.prodCode,
              )
            ) {
              CartLocalStorageData.push({
                product_id: createCartPopUp.prodCode,
                quantity: createCartPopUp.cartProdQuant,
                isComplete: createCartPopUp.complect ? 1 : 0,
                store_code:
                  createCartValues.is_delivery == 0 &&
                  createCartValues.store?.StoreCode,
                IntegerQuantity: createCartPopUp.IntegerQuantity,
                min_value: createCartPopUp.min_value,
              });
              localStorage.setItem(
                "Cart-SamiDzma",
                JSON.stringify(CartLocalStorageData),
              );
              setOpenProductCardPopUp(null);
              setRenderCart(new Date());
              setIsInCart(true);

              setOrderPlacementValues((prev: any) => ({
                ...prev,
                is_delivery: createCartValues.is_delivery,
                store: createCartValues.store,
              }));

              setCreateCartValues({
                is_delivery: null,
                store: {},
              });
              setCreateCartPopUp({
                popUpStatus: false,
                changeMethod: false,
                prodCode: null,
                cartProdQuant: null,
                complect: null,
                IntegerQuantity: false,
                announcement: false,
                min_value: null,
              });

              setAlertShow(true);
              setAlertStatus(true);
              setAlertText("კალათაში წარმატებით დაემატა");
            }
          }
        } else {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("მარაგი არარის საკმარისი");
        }
      }
    } else {
      setAlertShow(true);
      setAlertStatus(false);
      if (createCartValues.is_delivery == 0) {
        setAlertText("აირჩიე ფილიალი");
      } else {
        setAlertText("აირჩიე მეთოდი");
      }
    }
  };
  // add in cart

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center duration-100 w-[100vw] h-[100vh] px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-sm:px-[10px] ${
        createCartPopUp.popUpStatus ? "z-[20] opacity-1 " : "z-[-20] opacity-0 "
      }`}
    >
      <div
        onClick={() => {
          setCreateCartPopUp({
            popUpStatus: false,
            changeMethod: false,
            prodCode: null,
            cartProdQuant: null,
            complect: null,
            IntegerQuantity: false,
            announcement: false,
            min_value: null,
          });
          setCreateCartValues({
            is_delivery: null,
            store: {},
          });
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] ${
          createCartPopUp.popUpStatus
            ? "backdrop-blur-[5px] "
            : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`bg-[#EAEDEE] p-[25px] max-sm:px-[16px] max-w-[1920px] max-sm:max-w-[90%] max-h-[80vh] max-sm:max-h-[90vh] flex flex-col gap-y-[20px] rounded-[12px] relative`}
      >
        <div
          onClick={() => {
            setCreateCartPopUp({
              popUpStatus: false,
              changeMethod: false,
              prodCode: null,
              cartProdQuant: null,
              complect: null,
              IntegerQuantity: false,
              announcement: false,
              min_value: null,
            });
            setCreateCartValues({
              is_delivery: null,
              store: {},
            });
          }}
          className="self-end cursor-pointer bg-gray-100 hover:bg-gray-200 duration-100 w-[30px] h-[30px] flex items-center justify-center rounded-[10px] absolute top-[8px] right-[8px] z-1"
        >
          <BsXLg />
        </div>
        {createCartPopUp.announcement ? (
          <>
            <h1 className="text-[24px] text-center w-[600px] max-sm:w-full">
              ფილიალის შეცვლის შემთხვევაში არჩეული პროდუქტები წაიშლება კალათიდან
              და დაემატება რჩეულებში
            </h1>
            <div className="flex items-center max-tiny:flex-col-reverse max-tiny:self-center max-tiny:gap-y-[10px] self-end gap-[20px] mt-[50px]">
              <div className="w-[150px]">
                <GreenButton
                  name={"უარყოფა"}
                  style="h-[56px] max-md:h-[48px] text-[18px]"
                  action={() => {
                    setCreateCartPopUp({
                      popUpStatus: false,
                      changeMethod: false,
                      prodCode: null,
                      cartProdQuant: null,
                      complect: null,
                      IntegerQuantity: false,
                      announcement: false,
                      min_value: null,
                    });
                  }}
                />
              </div>
              <div className="w-[200px]">
                <GreenButton
                  name={"გაგრძელება"}
                  style="h-[56px] max-md:h-[48px] text-[18px]"
                  action={() => {
                    setCreateCartPopUp((prev: any) => ({
                      ...prev,
                      announcement: false,
                    }));
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[24px] text-center px-[50px] max-tiny:px-0">
              შექმენი კალათა მომსახურების მეთოდის მიხედვით
            </h1>

            <div className="flex flex-col gap-y-[10px]">
              {deiveryInfoData.status == 1 && (
                <div
                  onClick={() => {
                    setCreateCartValues((prev: any) => ({
                      ...prev,
                      is_delivery: 1,
                      store: {},
                    }));
                  }}
                  className={`h-[46px] flex items-center justify-between rounded-full cursor-pointer py-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 ${
                    createCartValues.is_delivery == 1 && "bg-[#f7f7f7]"
                  }`}
                >
                  <div className="flex items-center gap-[10px]">
                    <div
                      className={`h-[15px] w-[15px] flex items-center justify-center rounded-full border-[2px] duration-100 ${
                        createCartValues.is_delivery == 1
                          ? "border-myGreen"
                          : "border-[#E2E2E2]"
                      }`}
                    >
                      <div
                        className={`w-[7px] h-[7px] rounded-full duration-100 ${
                          createCartValues.is_delivery == 1 ? "bg-myGreen" : ""
                        }`}
                      ></div>
                    </div>
                    <p className="text-[14px] max-sm:text-[13px]">
                      კურიერის მიერ
                    </p>
                  </div>
                </div>
              )}
              <div
                onClick={() => {
                  setCreateCartValues((prev: any) => ({
                    ...prev,
                    is_delivery: 0,
                  }));
                }}
                className={`flex flex-col cursor-pointer pt-[10px] px-[15px] border-[1px] border-[#E2E2E2] duration-100 ${
                  createCartValues.is_delivery == 0
                    ? "bg-[#f7f7f7] pb-[20px] rounded-[22px] gap-y-[20px] "
                    : "gap-y-0 pb-[10px] rounded-[33px] "
                }`}
              >
                <div className="flex items-center gap-[20px] justify-between">
                  <div className="flex items-center gap-[10px]">
                    <div
                      className={`h-[15px] w-[15px] shrink-0 flex items-center justify-center rounded-full border-[2px] duration-100 ${
                        createCartValues.is_delivery == 0
                          ? "border-myGreen"
                          : "border-[#E2E2E2]"
                      }`}
                    >
                      <div
                        className={`w-[7px] h-[7px] rounded-full duration-100 ${
                          createCartValues.is_delivery == 0 ? "bg-myGreen" : ""
                        }`}
                      ></div>
                    </div>
                    <p className="text-[14px] max-sm:text-[13px]">
                      თვითგატანა მაღაზიიდან
                    </p>
                  </div>
                  <h1 className="max-sm:text-[11px]">
                    {createCartValues.store.StoreCode
                      ? createCartValues.store?.StoreName
                      : "აირჩიე ფილიალი"}
                  </h1>
                </div>
                <div
                  style={{
                    maxHeight:
                      allBranchForFront.length == 0
                        ? 25
                        : allBranchForFront.length * 50 + 10,
                  }}
                  className={`flex flex-col gap-y-[20px] px-[15px] max-sm:px-0 showScrollVert ${
                    createCartValues.is_delivery == 0
                      ? "h-[40vh] overflow-y-scroll"
                      : "h-0 overflow-hidden"
                  }`}
                >
                  {allBranchForFront.length > 0 ? (
                    allBranchForFront.map((item: any) => (
                      <div
                        key={item.StoreCode}
                        onClick={() => {
                          setCreateCartValues((prev: any) => ({
                            ...prev,
                            store: prev.store == item ? {} : item,
                          }));
                        }}
                        className="flex items-center justify-between gap-[20px] pr-[10px]"
                      >
                        <div>
                          <p>{item.StoreName}</p>
                          <p className="text-[12px] text-gray-400">
                            {item.Address}
                          </p>
                        </div>
                        <CheckBox
                          active={
                            createCartValues.store.StoreCode == item.StoreCode
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-[14px] text-gray-400">
                      სამიძმის ფილიალები იძებნება..
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="self-end w-[230px]">
              <GreenButton
                name={"დასტური"}
                style="h-[56px] max-md:h-[48px] text-[18px]"
                action={HandleAddCart}
                loader={createCartloader}
                dissabled={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
