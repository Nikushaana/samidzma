"use client";

import React, { useContext, useEffect, useState } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegHeart, FaTree } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import DotsLoader from "../loaders/DotsLoader";
import Counter from "../counter/counter";
import { BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import GreenButton from "../buttons/greenButton";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";

export default function ProductCard({ item, narrow }: any) {
  const router = useRouter();
  const { setOpenRecomendedPopUp, setAlertShow, setAlertStatus, setAlertText } =
    useContext(ContextForSharingStates);
  const { user } = useContext(UserContext);

  const { setRenderWishList, WishListData, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  const { setRenderCart, CartData, CartLocalStorageData } =
    useContext(CartAxiosContext);

  // used states
  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);
  const [prodStock, setProdStock] = useState<any>();
  const [cartProdQuant, setCartProdQuant] = useState<number>(1);
  const [isInFavorite, setIsInFavorite] = useState<boolean>(
    user?.id
      ? WishListData?.data?.find((fav: any) => fav.ProdCode === item.ProdCode)
      : WishListLocalStorageData.includes(item.ProdCode)
  );
  const [isInCart, setIsInCart] = useState<boolean>(
    user?.id
      ? CartData?.data?.find((cart: any) => cart.product_id === item.ProdCode)
      : CartLocalStorageData.some(
          (cartData: any) => cartData.product_id === item.ProdCode
        )
  );
  const [addCartloader, setAddCartLoader] = useState<boolean>(false);
  // used states

  // get image
  useEffect(() => {
    if (item.ProdCode) {
      setProdImagesLoader(true);
      axiosUser
        .get(`front/productPicture?ProdCode=${item.ProdCode}`)
        .then((res) => {
          setProdImages(res.data);
        })
        .catch((err) => {
          setProdImages({});
        })
        .finally(() => {
          setProdImagesLoader(false);
        });
    }
  }, [item]);
  // get image

  // get product stock
  useEffect(() => {
    if (item.ProdCode) {
      axiosUser
        .get(`front/productNashti?ProdCode=${item.ProdCode}`)
        // &StoreCode=20
        .then((res) => {
          setProdStock(res.data.StoreProdNashtebi[0].ProdNashtebi[0].Nashti);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [item]);
  // get product stock

  // add and remove in wishlist
  const HandleAddRemoveWishList = () => {
    setIsInFavorite((pre) => !pre);
    if (user?.id) {
      axiosUser
        .post(`user/wishlist/`, { product_id: item.ProdCode })
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
      if (WishListLocalStorageData.includes(item.ProdCode)) {
        const updatedFavorites = WishListLocalStorageData.filter(
          (favs: any) => favs !== item.ProdCode
        );
        localStorage.setItem(
          "SamiDzma-favorites",
          JSON.stringify(updatedFavorites)
        );
        setRenderWishList(new Date());

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რჩეულები წარმატებით განახლდა");
      } else {
        WishListLocalStorageData.push(item.ProdCode);
        localStorage.setItem(
          "SamiDzma-favorites",
          JSON.stringify(WishListLocalStorageData)
        );
        setRenderWishList(new Date());

        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("რჩეულები წარმატებით განახლდა");
      }
    }
  };
  // add and remove in wishlist

  // add in cart
  const HandleAddCart = () => {
    if (user?.id) {
      setAddCartLoader(true);
      axiosUser
        .post(`user/cart/`, {
          product_id: item.ProdCode,
          quantity: cartProdQuant,
          isComplete: 0,
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
          (cartData: any) => cartData.product_id === item.ProdCode
        )
      ) {
        CartLocalStorageData.push({
          product_id: item.ProdCode,
          quantity: cartProdQuant,
          isComplete: 0,
        });
        localStorage.setItem(
          "SamiDzma-cart",
          JSON.stringify(CartLocalStorageData)
        );
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
        ? CartData?.data?.find((cart: any) => cart.product_id === item.ProdCode)
        : CartLocalStorageData.some(
            (cartData: any) => cartData.product_id === item.ProdCode
          )
    );
  }, [CartData?.data, CartLocalStorageData, item.ProdCode, user?.id]);
  // is in cart?
  // add in cart

  return (
    <div
      className={`rounded-[12px] bg-white p-[20px] max-tiny:p-[10px] flex flex-col justify-between gap-[12px] h-full`}
    >
      <div className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap items-center justify-end gap-[8px]">
          <p
            className={`px-[10px] bg-myPink text-white  flex items-center rounded-full ${
              narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
            }`}
          >
            sale -5%
          </p>
          <p
            className={`px-[10px] bg-myGreen text-white flex items-center rounded-full ${
              narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
            }`}
          >
            მარაგშია
          </p>
          <div
            className={`flex justify-center items-center gap-[5px] bg-myYellow rounded-full px-[10px] ${
              narrow ? "h-[28px]" : "h-[36px]"
            }`}
          >
            <BiStar className={` ${narrow ? "text-[15px]" : "text-[18px] "}`} />
            <h1
              className={` ${
                narrow ? "text-[10px] h-[16px]" : "text-[14px] h-[20px]"
              }`}
            >
              4.7
            </h1>
          </div>
          <div
            className={`rounded-full text-white bg-myBlack flex items-center justify-center  ${
              narrow
                ? "h-[28px] w-[28px] text-[16px]"
                : "text-[20px] h-[36px] w-[36px]"
            }`}
          >
            <TbTruckDelivery />
          </div>
        </div>

        <div className="max-tiny:grid max-tiny:grid-cols-2 gap-[10px]">
          <div
            onClick={() => {
              router.push(
                `/products/${
                  item.ProdAdditionalCode
                    ? `${item.ProdAdditionalCode}?variation=${item.ProdCode}`
                    : item.ProdCode
                }`
              );
            }}
            className="relative cursor-pointer w-full h-[224px] max-tiny:h-auto max-tiny:aspect-[4/3] flex items-center justify-center rounded-[4px] overflow-hidden"
          >
            {prodImagesLoader ? (
              <div className="w-full h-full rounded-[12px] loaderwave"></div>
            ) : prodImages?.ProductPictureByte ? (
              <Image
                src={`data:image/png;base64,${prodImages?.ProductPictureByte}`}
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
            <div className="absolute bottom-[20px] max-tiny:bottom-[10px] left-[20px] max-tiny:left-[10px] z-[1] bg-myGreen text-white shrink-0 flex items-center justify-center text-[18px] w-[53px] max-tiny:w-[36px] aspect-square rounded-full">
              <FaTree />
            </div>
          </div>
          <div className="hidden max-tiny:flex flex-col justify-between">
            <div
              className={`flex items-center gap-[12px] ${
                narrow ? "justify-center" : "justify-end"
              }`}
            >
              <div className="relative bg-myGreen text-white shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer">
                <BsCart3 />
              </div>
              <div
                onClick={() => {
                  HandleAddRemoveWishList();
                }}
                className="relative bg-myYellow text-black shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer"
              >
                {isInFavorite ? <FaHeart /> : <FaRegHeart />}
              </div>
              <div
                onClick={() => {
                  setOpenRecomendedPopUp(
                    item.ProdAdditionalCode
                      ? `${item.ProdAdditionalCode}?${item.ProdCode}`
                      : item.ProdCode
                  );
                }}
                className="relative bg-myGray text-black shrink-0 flex items-center justify-center text-[23px] w-[38px] h-[38px] rounded-full cursor-pointer"
              >
                <PiCornersOutLight />
              </div>
            </div>
            <GreenButton
              name="ყიდვა"
              style="h-[56px] max-tiny:h-[48px] text-[18px]"
              action={HandleAddCart}
              loader={addCartloader}
              dissabled={isInCart}
              // dissabled={isInCart || prodStock === 0}
            />
          </div>
        </div>

        <h1 className="text-[20px] pl-[15px] hidden max-tiny:flex">
          {item.Fasi1}₾
        </h1>
        <h1 className="text-[22px] pl-[15px] max-2xl:pl-0 h-[70px] max-tiny:h-auto line-clamp-2">
          {item.ProductName}
        </h1>
        <p className="text-[14px] pl-[15px] line-clamp-2">
          {item.DescriptionName}
        </p>
      </div>

      <div className="flex flex-col gap-[12px] max-tiny:hidden">
        <div
          className={`flex items-center justify-between ${
            narrow ? "flex-col-reverse gap-y-[12px]" : ""
          }`}
        >
          <h1 className="text-[20px] pl-[15px]">{item.Fasi1}₾</h1>
          <Counter prodStock={prodStock} setCounterValue={setCartProdQuant} />
        </div>
        <div
          className={`flex items-center gap-[12px] ${
            narrow ? "justify-center" : "justify-end"
          }`}
        >
          <div className="relative bg-myGreen text-white shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer">
            <BsCart3 />
          </div>
          <div
            onClick={() => {
              HandleAddRemoveWishList();
            }}
            className="relative bg-myYellow text-black shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer"
          >
            {isInFavorite ? <FaHeart /> : <FaRegHeart />}
          </div>
          <div
            onClick={() => {
              setOpenRecomendedPopUp(
                item.ProdAdditionalCode
                  ? `${item.ProdAdditionalCode}?${item.ProdCode}`
                  : item.ProdCode
              );
            }}
            className="relative bg-myGray text-black shrink-0 flex items-center justify-center text-[23px] w-[38px] h-[38px] rounded-full cursor-pointer"
          >
            <PiCornersOutLight />
          </div>
        </div>
        <GreenButton
          name="ყიდვა"
          style="h-[56px] max-tiny:h-[48px] text-[18px]"
          action={HandleAddCart}
          loader={addCartloader}
          dissabled={isInCart}
          // dissabled={isInCart || prodStock == 0}
        />
      </div>
    </div>
  );
}
