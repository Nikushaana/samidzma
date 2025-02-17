"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { IoSearchOutline } from "react-icons/io5";
import { BiCheck, BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCheck, FaTree } from "react-icons/fa";
import DotsLoader from "../loaders/DotsLoader";
import GreenButton from "../buttons/greenButton";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import Counter from "../counter/counter";
import { DontScrollMainBody } from "../DontScrollMainBody";
import DropDownFilials from "../DropDowns/DropDownFilials";
import InnerProductVariationImgsSlider from "../InnerProductPage/InnerProductVariationImgsSlider";
import InnerProductMainImgSlider from "../InnerProductPage/InnerProductMainImgSlider";

export default function ProductCardsPopUp() {
  const {
    openProductCardPopUp,
    setOpenProductCardPopUp,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  } = useContext(ContextForSharingStates);
  const { setRenderCart, CartData, CartLocalStorageData } =
    useContext(CartAxiosContext);

  const { user } = useContext(UserContext);

  DontScrollMainBody(openProductCardPopUp);
  // used states
  const [mainProdId, setMainProdId] = useState(
    openProductCardPopUp?.split("?")[0]
  );
  const [variationProdId, setVariationProdId] = useState(
    openProductCardPopUp?.split("?")[1]
  );

  useEffect(() => {
    setMainProdId(openProductCardPopUp?.split("?")[0]);
    setVariationProdId(openProductCardPopUp?.split("?")[1]);
  }, [openProductCardPopUp]);

  const [prodStock, setProdStock] = useState<any>();
  const [complect, setComplect] = useState<any>(false);
  const [cartProdQuant, setCartProdQuant] = useState<number>(1);
  const [isInCart, setIsInCart] = useState<boolean>(
    user?.id
      ? CartData?.data?.find(
          (cart: any) =>
            cart.product_id === (variationProdId ? variationProdId : mainProdId)
        )
      : CartLocalStorageData.some(
          (cartData: any) =>
            cartData.ProdCode ===
            (variationProdId ? variationProdId : mainProdId)
        )
  );
  const [oneProduct, setOneProduct] = useState<any>({});
  const [oneProductLoader, setOneProductLoader] = useState<boolean>(true);

  const [variationImages, setVariationImages] = useState<any>([]);
  const [variationImagesStockLoader, setVariationImagesStockLoader] =
    useState<any>(false);
  const [addCartloader, setAddCartLoader] = useState<boolean>(false);
  // used states

  useEffect(() => {
    setOneProductLoader(true);
    axiosUser
      .get(`front/product/${mainProdId}`)
      .then((res) => {
        setOneProduct(res.data);
        // setOneProductLoader(false);

        if (!variationProdId && res.data?.product_variations?.length > 0) {
          setVariationProdId(res.data?.product_variations[0]?.ProdCode);
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }, [mainProdId]);

  // get active variation images  get active variation images

  useEffect(() => {
    const fetchProductData = async () => {
      if (oneProduct && (mainProdId || variationProdId)) {
        setVariationImagesStockLoader(true);

        try {
          const prodCode = variationProdId || mainProdId;

          const [imagesResponse, stockResponse] = await Promise.all([
            axiosUser.get(`front/productPictureAll?ProdCode=${prodCode}`),
            axiosUser.get(`front/productNashti?ProdCode=${prodCode}`),
          ]);

          setVariationImages(imagesResponse.data);

          setProdStock(stockResponse.data?.StoreProdNashtebi);
        } catch (error) {
        } finally {
          setVariationImagesStockLoader(false);
          setOneProductLoader(false);
        }
      }
    };

    fetchProductData();
  }, [mainProdId, oneProduct, variationProdId]);
  // get active variation images  get active variation images

  // add in cart
  const HandleAddCart = () => {
    if (user?.id) {
      setAddCartLoader(true);
      axiosUser
        .post(`user/cart/`, {
          product_id: variationProdId ? variationProdId : mainProdId,
          quantity: cartProdQuant,
          isComplete: complect ? 1 : 0,
        })
        .then((res) => {
          setOpenProductCardPopUp(null);
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
          (cartData: any) =>
            cartData.product_id ===
            (variationProdId ? variationProdId : mainProdId)
        )
      ) {
        CartLocalStorageData.push({
          product_id: variationProdId ? variationProdId : mainProdId,
          quantity: cartProdQuant,
          isComplete: complect ? 1 : 0,
        });
        localStorage.setItem(
          "SamiDzma-cart",
          JSON.stringify(CartLocalStorageData)
        );
        setOpenProductCardPopUp(null);
        setRenderCart(new Date());
        setIsInCart(true);

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კალათაში წარმატებით დაემატა");
      }
    }
  };

  // is in cart?
  useEffect(() => {
    setIsInCart(
      user?.id
        ? CartData?.data?.find(
            (cart: any) =>
              cart.product_id ===
              (variationProdId ? variationProdId : mainProdId)
          )
        : CartLocalStorageData.some(
            (cartData: any) =>
              cartData.product_id ===
              (variationProdId ? variationProdId : mainProdId)
          )
    );
  }, [
    CartData?.data,
    CartLocalStorageData,
    variationProdId,
    mainProdId,
    user?.id,
  ]);
  // is in cart?
  // add in cart

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-md:px-[25px] ${
        openProductCardPopUp
          ? "z-[20] opacity-1 duration-100"
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
        className={`max-w-[1920px] min-h-[555px] max-h-[90vh] overflow-y-scroll notshowScrollVert overflow-x-hidden w-full bg-[#EAEDEE] p-[16px] flex gap-[26px] max-md:flex-col max-lg:gap-[16px] rounded-[12px]`}
      >
        <div
          className={`w-[45%] max-md:w-full flex max-md:h-[400px] shrink-0 ${
            oneProductLoader && "h-[500px]"
          }`}
        >
          <InnerProductMainImgSlider
            prodMainImages={variationImages}
            mainLoader={oneProductLoader}
            activeImagessLoader={variationImagesStockLoader}
          />
        </div>

        <div className="w-[55%] max-md:w-full">
          {oneProductLoader ? (
            <div className="w-full h-full rounded-[12px] loaderwave overflow-hidden"></div>
          ) : (
            <div className="flex flex-col gap-y-[25px] p-[18px] max-md:p-[10px] rounded-[12px] bg-white w-full h-full">
              <div className="flex items-center gap-[5px] ">
                <div className="rounded-full text-white bg-myPink flex items-center px-[10px] h-[36px]">
                  <p className="text-[14px] max-md:text-[12px]">Sale -5%</p>
                </div>
                <div className="rounded-full text-white bg-myGreen flex items-center px-[10px] h-[36px]">
                  <p className="text-[14px] max-md:text-[12px]">მარაგშია</p>
                </div>
                <div className="rounded-full text-black bg-myYellow flex items-center gap-[10px] px-[10px] h-[36px]">
                  <BiStar className="text-[20px] max-md:text-[15px]" />
                  <p className="text-[14px] max-md:text-[12px]">4-7</p>
                </div>
                <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
                  <TbTruckDelivery className="text-[20px]" />
                </div>
              </div>
              <h1 className="text-[22px]">
                {variationProdId
                  ? oneProduct?.product_variations?.find(
                      (item: any) => item.ProdCode == variationProdId
                    )?.ProductName
                  : oneProduct?.product?.ProductName}
              </h1>
              <div className="flex flex-col gap-y-[10px]">
                <div className="flex items-center gap-[40px]">
                  <h1 className="text-[28px] max-md:text-[20px]">
                    {variationProdId
                      ? complect
                        ? oneProduct?.product_variations?.find(
                            (item: any) => item.ProdCode === variationProdId
                          )?.ComplectPrice * cartProdQuant
                        : oneProduct?.product_variations?.find(
                            (item: any) => item.ProdCode === variationProdId
                          )?.Fasi1 * cartProdQuant
                      : complect
                      ? oneProduct?.product?.ComplectPrice * cartProdQuant
                      : oneProduct?.product?.Fasi1 * cartProdQuant}
                    ₾
                  </h1>
                  <div
                    onClick={() => {
                      setComplect((prev: any) => !prev);
                    }}
                    className="border-[1px] rounded-full text-[14px] h-[38px] flex items-center"
                  >
                    <p
                      className={`rounded-full h-full flex items-center gap-[2px] px-[15px] duration-100 cursor-pointer ${
                        complect ? "" : "bg-myGreen text-white"
                      }`}
                    >
                      <span className="text-[18px]">1</span> ც
                    </p>
                    <div
                      className={`rounded-full h-full flex items-center px-[20px] duration-100 cursor-pointer ${
                        complect ? "bg-myGreen text-white" : ""
                      }`}
                    >
                      <p className="max-md:text-[10px] flex items-center gap-[2px]">
                        შეკვრა /
                        <span className="text-[18px]">
                          {variationProdId
                            ? oneProduct?.product_variations
                                ?.find(
                                  (item: any) =>
                                    item.ProdCode === variationProdId
                                )
                                ?.Attribute4.split(" ")[0]
                            : oneProduct?.product?.Attribute4.split(" ")[0]}
                        </span>
                        ც
                      </p>
                    </div>
                  </div>
                </div>
                <Counter
                  prodStock={prodStock[0]?.ProdNashtebi[0]?.Nashti}
                  setCounterValue={setCartProdQuant}
                />
                <div className="flex items-center gap-[10px]">
                  <div className="bg-myGreen rounded-full w-[22px] h-[22px] flex items-center justify-center">
                    <div className="relative w-[15px] h-[15px]">
                      <Image
                        src="/images/whitemainLogo.png"
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
                    {variationProdId
                      ? oneProduct?.product_variations?.find(
                          (item: any) => item.ProdCode == variationProdId
                        )?.Point
                      : oneProduct?.product?.Point}
                  </h1>
                  <p className="text-[14px]">ქულა ბონუსად</p>
                </div>
              </div>

              <InnerProductVariationImgsSlider
                mainLoader={oneProductLoader}
                prodVariationImages={
                  oneProduct?.product_variations?.length > 0 &&
                  oneProduct?.product_variations
                }
                variation={variationProdId}
                openRecomendedPopUp={openProductCardPopUp}
                setVariationProdId={setVariationProdId}
              />

              <div className="grid grid-cols-2 gap-[20px]">
                <GreenButton
                  name="ყიდვა"
                  style="h-[56px] max-md:h-[48px] text-[18px]"
                  action={HandleAddCart}
                  loader={addCartloader}
                  dissabled={isInCart}
                  // dissabled={isInCart || prodStock === 0}
                />

                <div className="flex items-center gap-[20px] max-lg:justify-center max-lg:flex-row-reverse max-lg:order-first">
                  <div className="relative w-[60px] h-[22px] max-lg:rotate-[160deg]">
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
                    ყიდვისთვის გადადი <br className="max-lg:hidden" /> ფოტოებზე
                  </p>
                </div>
              </div>
              <DropDownFilials stock={prodStock} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
