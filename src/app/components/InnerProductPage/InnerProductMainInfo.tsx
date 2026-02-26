"use client";

import React, { useContext, useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import InnerProductMainImgSlider from "./InnerProductMainImgSlider";
import useIsInFavorite from "../../../../dataFetchs/isInFavoriteHook";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import useIsInCart from "../../../../dataFetchs/isInCartHook";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Counter from "../counter/counter";
import Image from "next/image";
import InnerProductVariationImgsSlider from "./InnerProductVariationImgsSlider";
import GreenButton from "../buttons/greenButton";
import DropDownFilials from "../DropDowns/DropDownFilials";
import { DeiveryInfoContext } from "../../../../dataFetchs/deliveryInfoContext";

export default function InnerProductMainInfo({
  variation,
  oneProduct,
  oneProductLoader,
  setOneProductLoader,
  realProductId,
}: any) {
  const { deiveryInfoData } = useContext(DeiveryInfoContext);
  const { user } = useContext(UserContext);
  const { setAlertShow, setAlertStatus, setAlertText, setCreateCartPopUp } =
    useContext(ContextForSharingStates);
  const { setRenderWishList, WishListLocalStorageData } =
    useContext(WishListAxiosContext);
  const {
    setRenderCart,
    CartLocalStorageData,
    CartCounter,
    orderPlacementValues,
  } = useContext(CartAxiosContext);
  // is in cart?
  const { isInCart, setIsInCart } = useIsInCart(
    variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
      ? variation
      : realProductId,
  );
  // is in cart?

  const [addCartloader, setAddCartLoader] = useState<boolean>(false);
  const [prodStock, setProdStock] = useState<any>();
  const [cartProdQuant, setCartProdQuant] = useState<number>(1);
  const [complect, setComplect] = useState<any>(false);
  const [myProdAllStock, setMyProdAllStock] = useState<any>();
  const [mainVariationImages, setMainVariationImages] = useState<any>([]);
  const [variationImagesLoader, setMainVariationImagesLoader] =
    useState<any>(false);
  const [variationStockLoader, setMainVariationStockLoader] =
    useState<any>(false);
  const [activeNakrebebi, setActiveNakrebebi] = useState<any>({
    ProdCode: "",
    ProdName: "",
    Quantity: "",
  });

  useEffect(() => {
    if (
      variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
        ? oneProduct?.variation?.find(
            (item: any) => item.ProdCode === variation,
          )?.ComplectPrice > 0
        : oneProduct?.product?.ComplectPrice > 0
    ) {
      setComplect(true);
    }
  }, [
    oneProduct?.product?.ComplectPrice,
    oneProduct?.variation,
    variation,
    oneProduct?.product?.product_menus,
  ]);

  // add in cart
  const HandleAddCart = () => {
    const prodCode =
      variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
        ? variation
        : realProductId;
    const IntegerQuantity =
      variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
        ? oneProduct?.variation?.find(
            (item: any) => item.ProdCode === variation,
          )?.IntegerQuantity
        : oneProduct?.product?.IntegerQuantity;

    if (
      orderPlacementValues.is_delivery == 0 ||
      orderPlacementValues.is_delivery == 1
    ) {
      if (user?.id) {
        setAddCartLoader(true);
        axiosUser
          .post(`user/cart/`, {
            product_id: prodCode,
            quantity: cartProdQuant || 1,
            isComplete: complect ? 1 : 0,
            store_code:
              orderPlacementValues.is_delivery == 0 &&
              orderPlacementValues.store?.StoreCode,
          })
          .then((res) => {
            setAlertShow(true);
            setAlertStatus(true);
            setAlertText("კალათაში წარმატებით დაემატა");
            setRenderCart(res);

            setIsInCart(true);
          })
          .catch((err) => {
            setAlertShow(true);
            setAlertStatus(false);
            setAlertText("კალათაში ვერ დაემატა!");
          })
          .finally(() => {
            setAddCartLoader(false);
          });
      } else {
        if (
          !CartLocalStorageData.some(
            (cartData: any) => cartData.product_id === prodCode,
          )
        ) {
          CartLocalStorageData.push({
            product_id: prodCode,
            quantity: cartProdQuant || 1,
            isComplete: complect ? 1 : 0,
            store_code:
              orderPlacementValues.is_delivery == 0 &&
              orderPlacementValues.store?.StoreCode,
            IntegerQuantity: IntegerQuantity,
            min_value:
              variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                ? oneProduct?.variation?.find(
                    (item: any) => item.ProdCode === variation,
                  )?.min_value
                : oneProduct?.product?.min_value,
          });
          localStorage.setItem(
            "Cart-SamiDzma",
            JSON.stringify(CartLocalStorageData),
          );
          setRenderCart(new Date());
          setIsInCart(true);

          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("კალათაში წარმატებით დაემატა");
        }
      }
    } else {
      setCreateCartPopUp({
        popUpStatus: true,
        prodCode: prodCode,
        cartProdQuant: cartProdQuant || 1,
        complect: complect,
        IntegerQuantity: IntegerQuantity,
        min_value:
          variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
            ? oneProduct?.variation?.find(
                (item: any) => item.ProdCode === variation,
              )?.min_value
            : oneProduct?.product?.min_value,
      });
    }
  };
  // add in cart

  // is in favorites?
  const { isInFavorite, setIsInFavorite } = useIsInFavorite(
    variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
      ? variation
      : realProductId,
  );
  // is in favorites?

  // add and remove in wishlist
  const HandleAddRemoveWishList = () => {
    setIsInFavorite((pre) => !pre);

    const prodCode =
      variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
        ? variation
        : realProductId;

    if (user?.id) {
      axiosUser
        .post(`user/wishlist/`, { product_id: prodCode })
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("რჩეულები წარმატებით განახლდა");
          setRenderWishList(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("რჩეულები ვერ განახლდა!");
        })
        .finally(() => {});
    } else {
      if (WishListLocalStorageData.includes(prodCode)) {
        const updatedFavorites = WishListLocalStorageData.filter(
          (favs: any) => favs !== prodCode,
        );
        localStorage.setItem(
          "SamiDzma-favorites",
          JSON.stringify(updatedFavorites),
        );
        setRenderWishList(new Date());

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რჩეულები წარმატებით განახლდა");
      } else {
        WishListLocalStorageData.push(prodCode);
        localStorage.setItem(
          "SamiDzma-favorites",
          JSON.stringify(WishListLocalStorageData),
        );
        setRenderWishList(new Date());

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რჩეულები წარმატებით განახლდა");
      }
    }
  };
  // add and remove in wishlist

  // get active variation images
  useEffect(() => {
    if (
      oneProduct &&
      (realProductId || variation || activeNakrebebi?.ProdCode)
    ) {
      setMainVariationImagesLoader(true);

      const prodCode = variation ? variation : realProductId;

      axiosUser
        .get(
          `front/ourProductPictureAll?ProdCode=${
            activeNakrebebi.ProdCode || prodCode
          }`,
        )
        .then((res) => {
          setMainVariationImages(res.data);
        })
        .catch((err) => {})
        .finally(() => {
          setMainVariationImagesLoader(false);
        });
    }
  }, [oneProduct, realProductId, variation, activeNakrebebi.ProdCode]);

  // get active images stock

  useEffect(() => {
    if (oneProduct && (realProductId || variation)) {
      setMainVariationStockLoader(true);
      
      const prodCode = variation ? variation : realProductId;

      axiosUser
        .get(`front/productNashti?ProdCode=${prodCode}`)
        .then((res) => {
          setMyProdAllStock(res.data?.StoreProdNashtebi);
        })
        .catch((err) => {})
        .finally(() => {
          setMainVariationStockLoader(false);
        });
    }
  }, [oneProduct, realProductId, variation]);

  useEffect(() => {
    setProdStock(
      complect
        ? Math.floor(
            myProdAllStock?.find(
              (store: any) =>
                store.StoreCode ==
                (orderPlacementValues.is_delivery == 1
                  ? deiveryInfoData?.system_id
                  : orderPlacementValues.store?.StoreCode),
            )?.ProdNashtebi[0].Nashti /
              (variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                ? oneProduct?.variation?.find(
                    (item: any) => item.ProdCode === variation,
                  )?.CountInComplect
                : oneProduct?.product?.CountInComplect),
          )
        : myProdAllStock?.find(
            (store: any) =>
              store.StoreCode ==
              (orderPlacementValues.is_delivery == 1
                ? deiveryInfoData?.system_id
                : orderPlacementValues.store?.StoreCode),
          )?.ProdNashtebi &&
            myProdAllStock?.find(
              (store: any) =>
                store.StoreCode ==
                (orderPlacementValues.is_delivery == 1
                  ? deiveryInfoData?.system_id
                  : orderPlacementValues.store?.StoreCode),
            )?.ProdNashtebi[0].Nashti,
    );
  }, [
    complect,
    deiveryInfoData?.system_id,
    oneProduct?.product?.CountInComplect,
    oneProduct?.variation,
    oneProduct?.product?.product_menus,
    orderPlacementValues.is_delivery,
    orderPlacementValues.store?.StoreCode,
    myProdAllStock,
    variation,
  ]);
  // get active variation images  and stock

  useEffect(() => {
    if (!variationImagesLoader && !variationStockLoader) {
      setOneProductLoader(false);
    }
  }, [variationImagesLoader, variationStockLoader]);

  return (
    <div className="flex gap-[26px] max-lg:p-[5px] max-md:flex-col max-lg:gap-[16px] h-full  max-lg:bg-white max-lg:rounded-[12px] ">
      <div className="hidden max-md:flex items-center justify-center gap-[5px]">
        {variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
          ? oneProduct?.variation?.find(
              (item: any) => item.ProdCode === variation,
            )?.Fasi_dic !==
              oneProduct?.variation?.find(
                (item: any) => item.ProdCode === variation,
              )?.Fasi18 && (
              <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                <p className="text-[14px] max-md:text-[12px]">ფასდაკლება</p>
              </div>
            )
          : oneProduct?.product?.Fasi_dic !== oneProduct?.product?.Fasi18 && (
              <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                <p className="text-[14px] max-md:text-[12px]">ფასდაკლება</p>
              </div>
            )}

        <div
          className={`rounded-full text-white flex items-center px-[15px] h-[36px] ${
            myProdAllStock?.find(
              (item: any) =>
                item.ProdNashtebi && item.ProdNashtebi[0].Nashti > 0,
            )
              ? "bg-myGreen"
              : "bg-gray-400"
          }`}
        >
          <p className="text-[14px] max-md:text-[12px]">
            {myProdAllStock?.find(
              (item: any) =>
                item.ProdNashtebi && item.ProdNashtebi[0].Nashti > 0,
            )
              ? "მარაგშია"
              : "ამოიწურა"}
          </p>
        </div>

        <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
          <TbTruckDelivery className="text-[20px]" />
        </div>
      </div>
      <div
        className={`w-[calc((100%-26px)/2)] aspect-square self-start max-md:w-full `}
      >
        <InnerProductMainImgSlider
          mainLoader={oneProductLoader}
          prodMainImages={mainVariationImages}
          activeImagessLoader={variationImagesLoader}
        />
      </div>
      <div
        className={`w-[calc((100%-26px)/2)] max-md:w-full self-start ${
          oneProductLoader ? "aspect-square" : ""
        }`}
      >
        {oneProductLoader ? (
          <div className="w-full h-full rounded-[12px] overflow-hidden loaderwave"></div>
        ) : (
          <div className="flex flex-col gap-y-[25px] p-[18px] rounded-[12px] bg-white w-full h-full">
            <div className="flex items-center gap-[5px] max-md:hidden">
              {variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                ? oneProduct?.variation?.find(
                    (item: any) => item.ProdCode === variation,
                  )?.Fasi_dic !==
                    oneProduct?.variation?.find(
                      (item: any) => item.ProdCode === variation,
                    )?.Fasi18 && (
                    <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                      <p className="text-[14px] max-md:text-[12px]">
                        ფასდაკლება
                      </p>
                    </div>
                  )
                : oneProduct?.product?.Fasi_dic !==
                    oneProduct?.product?.Fasi18 && (
                    <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                      <p className="text-[14px] max-md:text-[12px]">
                        ფასდაკლება
                      </p>
                    </div>
                  )}
              <div
                className={`rounded-full text-white flex items-center px-[15px] h-[36px] ${
                  myProdAllStock?.find(
                    (item: any) =>
                      item.ProdNashtebi && item.ProdNashtebi[0].Nashti > 0,
                  )
                    ? "bg-myGreen"
                    : "bg-gray-400"
                }`}
              >
                <p className="text-[14px] max-md:text-[12px]">
                  {myProdAllStock?.find(
                    (item: any) =>
                      item.ProdNashtebi && item.ProdNashtebi[0].Nashti > 0,
                  )
                    ? "მარაგშია"
                    : "ამოიწურა"}
                </p>
              </div>

              <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
                <TbTruckDelivery className="text-[20px]" />
              </div>
            </div>

            <div>
              <h1 className="text-[22px]">
                {variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                  ? oneProduct?.variation?.find(
                      (item: any) => item.ProdCode == variation,
                    )?.ProductName
                  : oneProduct?.product?.ProductName}
              </h1>
              <p className="text-[15px] text-gray-400">
                კოდი:{" "}
                {variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                  ? variation
                  : oneProduct?.product?.ProdCode}
              </p>
            </div>

            <div className="flex flex-col gap-y-[10px]">
              <div className="flex items-center max-md:justify-between gap-[40px] max-lg:gap-[20px] max-tiny:flex-col max-tiny:gap-y-[10px] max-tiny:items-start">
                {(variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                  ? oneProduct?.variation?.find(
                      (item: any) => item.ProdCode == variation,
                    )?.ProductName
                  : oneProduct?.product?.ProductName) && (
                  <div className="flex items-end">
                    <h1 className="text-[28px] max-md:text-[20px]">
                      {variation &&
                      oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                        ? complect
                          ? (
                              oneProduct?.variation?.find(
                                (item: any) => item.ProdCode === variation,
                              )?.ComplectPrice * cartProdQuant
                            )?.toFixed(2)
                          : oneProduct?.variation?.find(
                                (item: any) => item.ProdCode === variation,
                              )?.Fasi_dic !==
                              oneProduct?.variation?.find(
                                (item: any) => item.ProdCode === variation,
                              )?.Fasi18
                            ? (
                                oneProduct?.variation?.find(
                                  (item: any) => item.ProdCode === variation,
                                )?.Fasi_dic * cartProdQuant
                              )?.toFixed(2)
                            : (
                                oneProduct?.variation?.find(
                                  (item: any) => item.ProdCode === variation,
                                )?.Fasi18 * cartProdQuant
                              )?.toFixed(2)
                        : complect
                          ? (
                              oneProduct?.product?.ComplectPrice * cartProdQuant
                            )?.toFixed(2)
                          : oneProduct?.product?.Fasi_dic !==
                              oneProduct?.product?.Fasi18
                            ? (
                                oneProduct?.product?.Fasi_dic * cartProdQuant
                              )?.toFixed(2)
                            : (
                                oneProduct?.product?.Fasi18 * cartProdQuant
                              )?.toFixed(2)}
                      ₾
                    </h1>
                    {oneProduct?.product?.Fasi_dic !==
                      oneProduct?.product?.Fasi18 &&
                      !complect && (
                        <p className="text-[20px] max-md:text-[15px] text-gray-400 line-through ml-[10px]">
                          {variation &&
                          oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                            ? (
                                oneProduct?.variation?.find(
                                  (item: any) => item.ProdCode === variation,
                                )?.Fasi18 * cartProdQuant
                              )?.toFixed(2)
                            : (
                                oneProduct?.product?.Fasi18 * cartProdQuant
                              )?.toFixed(2)}
                          ₾
                        </p>
                      )}
                  </div>
                )}

                <div className="flex items-center gap-[20px]">
                  <div
                    onClick={() => {
                      if (
                        variation &&
                        oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                          ? oneProduct?.variation?.find(
                              (item: any) => item.ProdCode === variation,
                            )?.ComplectPrice > 0
                          : oneProduct?.product?.ComplectPrice > 0
                      ) {
                        setComplect((prev: any) => !prev);
                      }
                    }}
                    className="border-[1px] rounded-full text-[14px] h-[38px] flex items-center shrink-0"
                  >
                    <p
                      className={`rounded-full h-full flex items-center gap-[2px] px-[15px] duration-100 cursor-pointer ${
                        complect ? "" : "bg-myGreen text-white"
                      }`}
                    >
                      <span className="text-[18px]">1</span>{" "}
                      {variation &&
                      oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                        ? oneProduct?.variation?.find(
                            (item: any) => item.ProdCode === variation,
                          )?.Unit == "სხვა"
                          ? "ცალი"
                          : oneProduct?.variation?.find(
                              (item: any) => item.ProdCode === variation,
                            )?.Unit
                        : oneProduct?.product?.Unit == "სხვა"
                          ? "ცალი"
                          : oneProduct?.product?.Unit}
                    </p>
                    {(variation &&
                    oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                      ? oneProduct?.variation?.find(
                          (item: any) => item.ProdCode === variation,
                        )?.ComplectPrice > 0
                      : oneProduct?.product?.ComplectPrice > 0) && (
                      <div
                        className={`rounded-full h-full flex items-center gap-[2px] px-[20px] duration-100 cursor-pointer ${
                          complect ? "bg-myGreen text-white" : ""
                        }`}
                      >
                        <p className="max-md:text-[10px] ">შეკვრა /</p>

                        <p className="text-[18px]">
                          {variation &&
                          oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                            ? oneProduct?.variation?.find(
                                (item: any) => item.ProdCode === variation,
                              )?.CountInComplect
                            : oneProduct?.product?.CountInComplect}
                          {variation &&
                          oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                            ? oneProduct?.variation?.find(
                                (item: any) => item.ProdCode === variation,
                              )?.Unit == "სხვა"
                              ? "ცალი"
                              : oneProduct?.variation?.find(
                                  (item: any) => item.ProdCode === variation,
                                )?.Unit
                            : oneProduct?.product?.Unit == "სხვა"
                              ? "ცალი"
                              : oneProduct?.product?.Unit}
                        </p>
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      HandleAddRemoveWishList();
                    }}
                    className="relative group bg-myYellow text-black shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer"
                  >
                    {isInFavorite ? <FaHeart /> : <FaRegHeart />}
                    <p className="absolute top-[-30px] group-hover:flex hidden select-none duration-100 bg-gray-200 text-gray-600 text-[12px] px-[10px] py-[5px] rounded-[8px] w-[150px]">
                      {isInFavorite
                        ? "რჩეულებიდან წაშლა"
                        : "რჩეულებში დამატება"}
                    </p>
                  </div>
                </div>
              </div>
              {!isInCart && (
                <div
                  onClick={() => {
                    if (orderPlacementValues.is_delivery == null) {
                    } else if (!prodStock) {
                      setAlertShow(true);
                      setAlertStatus(false);
                      setAlertText(
                        "ფილიალში პროდუქტის საკმარისი მარაგი არ არის",
                      );
                    }
                  }}
                  className={`${
                    orderPlacementValues.is_delivery !== null &&
                    !prodStock &&
                    "cursor-pointer"
                  }`}
                >
                  <div
                    className={`${
                      orderPlacementValues.is_delivery !== null &&
                      !prodStock &&
                      "pointer-events-none"
                    }`}
                  >
                    <Counter
                      IntegerQuantity={
                        variation &&
                        oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                          ? oneProduct?.variation?.find(
                              (item: any) => item.ProdCode === variation,
                            )?.IntegerQuantity
                          : oneProduct?.product?.IntegerQuantity
                      }
                      minValue={
                        (variation &&
                        oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                          ? oneProduct?.variation?.find(
                              (item: any) => item.ProdCode === variation,
                            )?.min_value
                          : oneProduct?.product?.min_value) || 1
                      }
                      prodStock={prodStock}
                      setCounterValue={setCartProdQuant}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-[10px]">
                <div className="bg-myGreen rounded-full w-[22px] h-[22px] flex items-center justify-center">
                  <div className="relative w-[15px] h-[15px] select-none">
                    <Image
                      src="/images/whiteMainLogo.png"
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>

                <h1 className="text-myGreen text-[14px]">
                  +
                  {variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                    ? oneProduct?.variation?.find(
                        (item: any) => item.ProdCode == variation,
                      )?.Point
                    : oneProduct?.product?.Point}
                </h1>
                <p className="text-[14px]">ქულა ბონუსად</p>
              </div>
            </div>
            {oneProduct?.product?.ProdSaxeoba == "ნაკრებები" &&
              activeNakrebebi.ProdCode && (
                <h1 className="">
                  {activeNakrebebi?.ProdName +
                    " - " +
                    activeNakrebebi?.Quantity +
                    " ც"}
                </h1>
              )}
            <div className="max-sm:order-[-2]">
              <InnerProductVariationImgsSlider
                mainLoader={oneProductLoader}
                mainId={realProductId}
                prodVariationImages={
                  oneProduct?.product?.ProdSaxeoba == "ნაკრებები"
                    ? oneProduct?.product?.product_menus
                    : oneProduct?.variation?.length > 0 && oneProduct?.variation
                }
                variation={
                  oneProduct?.product?.ProdSaxeoba == "ნაკრებები"
                    ? activeNakrebebi.ProdCode
                    : variation
                }
                isProductNakrebi={
                  oneProduct?.product?.ProdSaxeoba == "ნაკრებები"
                }
                setActiveNakrebebi={setActiveNakrebebi}
              />
              {oneProduct?.variation?.length > 0 &&
                oneProduct?.product?.ProdSaxeoba !== "ნაკრებები" && (
                  <div className="items-center gap-[20px] justify-center max-sm:flex hidden mt-[20px]">
                    <div className="relative w-[60px] h-[22px] rotate-[30deg]">
                      <img
                        src="/images/backarrow1.png"
                        alt={""}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <p className="text-[12px]">
                      ყიდვისთვის გადადი <br className="max-lg:hidden" />{" "}
                      ფოტოებზე
                    </p>
                  </div>
                )}
            </div>
            <div className="grid grid-cols-2 gap-[20px] max-lg:grid-cols-1">
              <GreenButton
                name={
                  isInCart
                    ? "კალათშია"
                    : (orderPlacementValues.is_delivery == 1 ||
                          orderPlacementValues.is_delivery == 0) &&
                        !prodStock &&
                        !variationStockLoader
                      ? "მარაგი ამოიწურა"
                      : "ყიდვა"
                }
                style="h-[56px] max-md:h-[48px] text-[18px]"
                action={HandleAddCart}
                loader={addCartloader}
                dissabled={
                  ((orderPlacementValues.is_delivery == 1 ||
                    orderPlacementValues.is_delivery == 0) &&
                    !prodStock) ||
                  isInCart ||
                  variationStockLoader
                }
              />
              {oneProduct?.variation?.length > 0 &&
                oneProduct?.product?.ProdSaxeoba !== "ნაკრებები" && (
                  <div className="flex items-center gap-[20px] max-lg:justify-center max-lg:order-first max-sm:hidden">
                    <div className="relative w-[60px] h-[22px] rotate-[30deg]">
                      <Image
                        src="/images/backarrow.png"
                        alt={""}
                        sizes="500px"
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <p className="text-[12px]">
                      ყიდვისთვის გადადი <br className="max-lg:hidden" />{" "}
                      ფოტოებზე
                    </p>
                  </div>
                )}
            </div>

            <p
              onClick={() => {
                setCreateCartPopUp({
                  popUpStatus: true,
                  changeMethod: true,
                  announcement: user?.id
                    ? CartCounter > 0
                    : CartLocalStorageData.length > 0,
                });
              }}
              className="underline text-[14px] text-gray-500 hover:text-black cursor-pointer self-start"
            >
              {orderPlacementValues.is_delivery == 1 ||
              orderPlacementValues.is_delivery == 0
                ? `არჩეულია: ${
                    orderPlacementValues.is_delivery == 1
                      ? "მიტანის სერვისი"
                      : orderPlacementValues.store?.StoreName
                  }`
                : "აირჩიე ფილიალი"}
            </p>
            <DropDownFilials
              Unit={
                variation && oneProduct?.product?.ProdSaxeoba !== "ნაკრებები"
                  ? oneProduct?.variation?.find(
                      (item: any) => item.ProdCode === variation,
                    )?.Unit
                  : oneProduct?.product?.Unit
              }
              stock={myProdAllStock}
              loading={variationStockLoader}
            />
          </div>
        )}
      </div>
    </div>
  );
}
