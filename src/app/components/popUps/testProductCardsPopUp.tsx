"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { TbTruckDelivery } from "react-icons/tb";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import GreenButton from "../buttons/greenButton";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import Counter from "../counter/counter";
import { DontScrollMainBody } from "../DontScrollMainBody";
import DropDownFilials from "../DropDowns/DropDownFilials";
import InnerProductVariationImgsSlider from "../InnerProductPage/InnerProductVariationImgsSlider";
import InnerProductMainImgSlider from "../InnerProductPage/InnerProductMainImgSlider";
import useIsInCart from "../../../../dataFetchs/isInCartHook";
import useIsInFavorite from "../../../../dataFetchs/isInFavoriteHook";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { useQuery } from "@tanstack/react-query";
import { fetchDeliveryInfo } from "@/api/deliveryInfo.api";

export default function TestProductCardsPopUp() {
  const { user } = useContext(UserContext);
  const {
    openProductCardPopUp,
    setOpenProductCardPopUp,
    setAlertShow,
    setAlertStatus,
    setAlertText,
    setCreateCartPopUp,
  } = useContext(ContextForSharingStates);
  const { setRenderWishList, WishListLocalStorageData } =
    useContext(WishListAxiosContext);
  const {
    setRenderCart,
    CartLocalStorageData,
    CartCounter,
    orderPlacementValues,
  } = useContext(CartAxiosContext);

  const { data: deiveryInfoData = [] } = useQuery({
    queryKey: ["deiveryInfo"],
    queryFn: fetchDeliveryInfo,
    staleTime: 1000 * 60 * 5,
  });

  DontScrollMainBody(openProductCardPopUp);

  const [mainProdId, variationProdIdFromUrl] =
    openProductCardPopUp?.split("?") ?? [];

  const [variationProdId, setVariationProdId] = useState<string | undefined>(
    variationProdIdFromUrl,
  );

  const { data: oneProduct, isLoading: oneProductLoader } = useQuery({
    queryKey: ["oneProduct", mainProdId],
    queryFn: async () => {
      const res = await axiosUser.get(`front/ourProduct/${mainProdId}`);
      return res.data;
    },
    enabled: !!mainProdId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (oneProduct?.variation?.length > 0 && !variationProdIdFromUrl) {
      setVariationProdId(oneProduct.variation[0].ProdCode);
    }
  }, [oneProduct, variationProdIdFromUrl]);

  const [cartProdQuant, setCartProdQuant] = useState<number>(1);

  const isSet = oneProduct?.product?.ProdSaxeoba === "ნაკრებები";

  const variationProduct = oneProduct?.variation?.find(
    (item: any) => item.ProdCode === variationProdId,
  );

  const selectedProduct =
    variationProdId && !isSet ? variationProduct : oneProduct?.product;

  const isDiscounted = selectedProduct?.Fasi_dic !== selectedProduct?.Fasi18;

  const unit =
    selectedProduct?.Unit === "სხვა" ? "ცალი" : selectedProduct?.Unit;

  // complect handler
  const [complect, setComplect] = useState<any>(false);

  const oldPrice =
    !complect && selectedProduct?.Fasi_dic !== selectedProduct?.Fasi18
      ? (selectedProduct?.Fasi18 * cartProdQuant)?.toFixed(2)
      : null;

  const unitPrice =
    isDiscounted && !complect
      ? selectedProduct?.Fasi_dic
      : selectedProduct?.Fasi18;

  const priceToUse =
    complect && selectedProduct?.ComplectPrice
      ? selectedProduct?.ComplectPrice
      : unitPrice;

  const totalPrice = (priceToUse * cartProdQuant)?.toFixed(2);

  // stock
  const [prodStock, setProdStock] = useState<any>();
  const isStockBlocked =
    orderPlacementValues.is_delivery !== null && !prodStock;

  // active main variation images
  const [activeNakrebebi, setActiveNakrebebi] = useState<any>({
    ProdCode: "",
    ProdName: "",
    Quantity: "",
  });

  const {
    data: activeMainVariationImages,
    isFetching: activeMainVariationImagesLoader,
  } = useQuery({
    queryKey: [
      "productImages",
      activeNakrebebi.ProdCode || selectedProduct?.ProdCode,
    ],
    queryFn: async () => {
      const res = await axiosUser.get(
        `front/ourProductPictureAll?ProdCode=${
          activeNakrebebi.ProdCode || selectedProduct?.ProdCode
        }`,
      );
      return res.data;
    },
    enabled: !!(activeNakrebebi.ProdCode || selectedProduct?.ProdCode),
    staleTime: 5 * 60 * 1000,
    placeholderData: (previous) => previous,
  });

  // active product stock
  const {
    data: activeProductAllStock,
    isFetching: activeProductAllStockLoader,
  } = useQuery({
    queryKey: ["productStock", selectedProduct?.ProdCode],
    queryFn: async () => {
      const res = await axiosUser.get(
        `front/productNashti?ProdCode=${selectedProduct?.ProdCode}`,
      );
      return res.data?.StoreProdNashtebi;
    },
    enabled: !!selectedProduct?.ProdCode,
    staleTime: 5 * 60 * 1000,
  });

  const hasStock = activeProductAllStock?.some(
    (item: any) => item?.ProdNashtebi?.[0]?.Nashti > 0,
  );

  useEffect(() => {
    if (!activeProductAllStock || !selectedProduct) {
      setProdStock(undefined);
      return;
    }

    const storeCode =
      orderPlacementValues.is_delivery == 1
        ? deiveryInfoData?.system_id
        : orderPlacementValues.store?.StoreCode;

    const activeStore = activeProductAllStock.find(
      (store: any) => store.StoreCode == storeCode,
    );

    const nashti = activeStore?.ProdNashtebi?.[0]?.Nashti;

    const calculatedStock = complect
      ? Math.floor(nashti / selectedProduct?.CountInComplect)
      : nashti;

    setProdStock(calculatedStock);
  }, [
    selectedProduct,
    complect,
    deiveryInfoData?.system_id,
    orderPlacementValues.is_delivery,
    orderPlacementValues.store?.StoreCode,
    activeProductAllStock,
  ]);

  // favorites
  const { isInFavorite, setIsInFavorite } = useIsInFavorite(
    selectedProduct?.ProdCode,
  );

  const HandleAddRemoveWishList = () => {
    setIsInFavorite((pre) => !pre);

    if (user?.id) {
      axiosUser
        .post(`user/wishlist/`, { product_id: selectedProduct?.ProdCode })
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

      return;
    }

    // LocalStorage logic
    const isAlreadyFavorite = WishListLocalStorageData.includes(
      selectedProduct?.ProdCode,
    );

    const updatedFavorites = isAlreadyFavorite
      ? WishListLocalStorageData.filter(
          (favs: any) => favs !== selectedProduct?.ProdCode,
        )
      : [...WishListLocalStorageData, selectedProduct?.ProdCode];

    localStorage.setItem(
      "SamiDzma-favorites",
      JSON.stringify(updatedFavorites),
    );

    setRenderWishList(new Date());

    setAlertShow(true);
    setAlertStatus(true);
    setAlertText("რჩეულები წარმატებით განახლდა");
  };

  // cart
  const { isInCart, setIsInCart } = useIsInCart(selectedProduct?.ProdCode);
  const [addCartloader, setAddCartLoader] = useState<boolean>(false);

  const handleCheckStockBeforeOrder = () => {
    if (orderPlacementValues.is_delivery == null) return;

    if (!prodStock) {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("ფილიალში პროდუქტის საკმარისი მარაგი არ არის");
      return;
    }
  };

  const HandleAddCart = async () => {
    const isDeliveryZeroOrOne =
      orderPlacementValues.is_delivery === 0 ||
      orderPlacementValues.is_delivery === 1;

    if (!isDeliveryZeroOrOne) {
      return setCreateCartPopUp({
        popUpStatus: true,
        prodCode: selectedProduct?.ProdCode,
        cartProdQuant: cartProdQuant || 1,
        complect,
        IntegerQuantity: selectedProduct?.IntegerQuantity,
        min_value: selectedProduct?.min_value,
      });
    }

    const payload = {
      product_id: selectedProduct?.ProdCode,
      quantity: cartProdQuant || 1,
      isComplete: complect ? 1 : 0,
      store_code:
        orderPlacementValues.is_delivery == 0 &&
        orderPlacementValues.store?.StoreCode,
    };

    try {
      setAddCartLoader(true);

      if (user?.id) {
        const res = await axiosUser.post(`user/cart/`, payload);
        setRenderCart(res);
      } else {
        const alreadyExists = CartLocalStorageData.some(
          (item: any) => item.product_id === payload.product_id,
        );

        if (!alreadyExists) {
          const updatedCart = [
            ...CartLocalStorageData,
            {
              ...payload,
              IntegerQuantity: selectedProduct?.IntegerQuantity,
              min_value: selectedProduct?.min_value,
            },
          ];

          localStorage.setItem("Cart-SamiDzma", JSON.stringify(updatedCart));

          setRenderCart(new Date());
        }
      }

      setIsInCart(true);
      setAlertShow(true);
      setAlertStatus(true);
      setAlertText("კალათაში წარმატებით დაემატა");
    } catch (error) {
      setAlertShow(true);
      setAlertStatus(false);
      setAlertText("კალათაში ვერ დაემატა!");
    } finally {
      setAddCartLoader(false);
    }
  };

  // branch
  const chosenDeliveryType =
    orderPlacementValues.is_delivery === 1
      ? "მიტანის სერვისი"
      : orderPlacementValues.is_delivery === 0
        ? orderPlacementValues.store?.StoreName
        : "აირჩიე ფილიალი";

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-md:px-[25px] ${
        openProductCardPopUp
          ? "z-[18] opacity-1 duration-100"
          : "z-[-20] opacity-0 duration-150"
      }`}
    >
      <div
        onClick={() => {
          setOpenProductCardPopUp(null);
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
          openProductCardPopUp ? "backdrop-blur-[5px] " : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`max-w-[1920px] min-h-[555px] max-h-[90vh] w-full bg-[#EAEDEE] p-[16px] flex flex-col gap-[16px] rounded-[12px] relative`}
      >
        <div
          onClick={() => {
            setOpenProductCardPopUp(null);
          }}
          className="self-end cursor-pointer bg-gray-100 hover:bg-gray-200 duration-100 w-[30px] h-[30px] flex items-center justify-center rounded-[10px] absolute top-[8px] right-[8px] z-[2]"
        >
          <BsXLg />
        </div>
        <div className="overflow-y-scroll notshowScrollVert overflow-x-hidden flex gap-[26px] max-md:flex-col max-lg:gap-[16px]">
          <div
            className={`w-[calc((100%-26px)/2)] aspect-square self-start max-md:w-full shrink-0 ${
              oneProductLoader && "h-[500px]"
            }`}
          >
            <InnerProductMainImgSlider
              prodMainImages={activeMainVariationImages}
              mainLoader={oneProductLoader}
              activeImagessLoader={activeMainVariationImagesLoader}
            />
          </div>

          <div
            className={`w-[calc((100%-26px)/2)] max-md:w-full self-start ${
              oneProductLoader ? "aspect-square" : ""
            }`}
          >
            {oneProductLoader ? (
              <div className="w-full h-full rounded-[12px] loaderwave overflow-hidden"></div>
            ) : (
              <div className="flex flex-col gap-y-[25px] p-[18px] max-md:p-[10px] rounded-[12px] bg-white w-full h-full">
                <div className="flex items-center gap-[5px] ">
                  {isDiscounted && (
                    <div className="rounded-full text-white bg-myPink flex items-center px-[10px] h-[36px]">
                      <p className="text-[14px] max-md:text-[12px]">
                        ფასდაკლება
                      </p>
                    </div>
                  )}
                  <div
                    className={`rounded-full text-white flex items-center px-[10px] h-[36px] ${
                      hasStock ? "bg-myGreen" : "bg-gray-400"
                    }`}
                  >
                    <p className="text-[14px] max-md:text-[12px]">
                      {hasStock ? "მარაგშია" : "ამოიწურა"}
                    </p>
                  </div>

                  <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
                    <TbTruckDelivery className="text-[20px]" />
                  </div>
                </div>

                <div>
                  <h1 className="text-[22px]">
                    {selectedProduct?.ProductName}
                  </h1>
                  <p className="text-[15px] text-gray-400">
                    კოდი:
                    {selectedProduct?.ProdCode}
                  </p>
                </div>

                <div className="flex flex-col gap-y-[10px]">
                  <div className="flex items-center gap-[40px] max-lg:gap-[20px] max-tiny:flex-col max-tiny:gap-y-[10px] max-tiny:items-start">
                    {selectedProduct?.ProductName && (
                      <div className="flex items-end">
                        <h1 className="text-[28px] max-md:text-[20px]">
                          {totalPrice}₾
                        </h1>
                        {oldPrice && (
                          <p className="text-[20px] max-md:text-[15px] text-gray-400 line-through ml-[10px]">
                            {oldPrice}₾
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-[20px]">
                      <div
                        onClick={() => {
                          if (selectedProduct?.ComplectPrice > 0) {
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
                          <span className="text-[18px]">1</span> {unit}
                        </p>
                        {selectedProduct?.ComplectPrice > 0 && (
                          <div
                            className={`rounded-full h-full flex items-center px-[20px] duration-100 cursor-pointer ${
                              complect ? "bg-myGreen text-white" : ""
                            }`}
                          >
                            <p className="max-md:text-[10px] flex items-center gap-[2px]">
                              შეკვრა /
                              <span className="text-[18px]">
                                {selectedProduct?.CountInComplect}
                                {unit}
                              </span>
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
                      onClick={handleCheckStockBeforeOrder}
                      className={`${isStockBlocked && "cursor-pointer"}`}
                    >
                      <div
                        className={`${isStockBlocked && "pointer-events-none"}`}
                      >
                        <Counter
                          IntegerQuantity={selectedProduct?.IntegerQuantity}
                          minValue={selectedProduct?.min_value || 1}
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
                      +{selectedProduct?.Point}
                    </h1>
                    <p className="text-[14px]">ქულა ბონუსად</p>
                  </div>
                </div>

                {isSet && activeNakrebebi.ProdCode && (
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
                    prodVariationImages={
                      isSet
                        ? oneProduct?.product?.product_menus
                        : oneProduct?.variation?.length > 0 &&
                          oneProduct?.variation
                    }
                    variation={
                      isSet ? activeNakrebebi.ProdCode : variationProdId
                    }
                    openRecomendedPopUp={openProductCardPopUp}
                    setVariationProdId={setVariationProdId}
                    isProductNakrebi={isSet}
                    setActiveNakrebebi={setActiveNakrebebi}
                  />
                  {oneProduct?.variation?.length > 0 && !isSet && (
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
                            !activeProductAllStockLoader
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
                      activeProductAllStockLoader
                    }
                  />
                  {oneProduct?.variation?.length > 0 && !isSet && (
                    <div className="flex items-center gap-[20px] max-lg:justify-center max-lg:order-first max-sm:hidden">
                      <div className="relative w-[60px] h-[22px]  rotate-[30deg]">
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
                  {orderPlacementValues.is_delivery === 1 ||
                  orderPlacementValues.is_delivery === 0
                    ? `არჩეულია: ${chosenDeliveryType}`
                    : chosenDeliveryType}
                </p>

                <DropDownFilials
                  Unit={selectedProduct?.Unit}
                  stock={activeProductAllStock}
                  loading={activeProductAllStockLoader}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
