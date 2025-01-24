"use client";

import React, { useContext, useEffect, useState } from "react";
import DotsLoader from "../loaders/DotsLoader";
import Image from "next/image";
import GreenButton from "../buttons/greenButton";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";

export default function SmallProdCard({ item }: any) {
  const router = useRouter();
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { user } = useContext(UserContext);
  
  const { setRenderCart, CartData, CartLocalStorageData } =
    useContext(CartAxiosContext);

  // used states
  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);
  const [addCartloader, setAddCartLoader] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(
    user?.id
      ? CartData?.data?.find((cart: any) => cart.product_id === item.ProdCode)
      : CartLocalStorageData.some(
          (cartData: any) => cartData.ProdCode === item.ProdCode
        )
  );
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

  // add in cart
  const HandleAddCart = () => {
    if (user?.id) {
      setAddCartLoader(true);
      axiosUser
        .post(`user/cart/`, {
          product_id: item.ProdCode,
          quantity: 1,
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
          quantity: 1,
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
    <div className="rounded-[8px] bg-white p-[10px] flex flex-col gap-y-[10px]">
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
        className="relative cursor-pointer w-full max-h-[150px] flex items-center justify-center aspect-[4/3] rounded-[4px] overflow-hidden"
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
              objectFit: "cover",
            }}
          />
        ) : (
          <p className="text-center text-[14px] ">ფოტო არ არსებობს</p>
        )}
      </div>

      <h1 className="text-[14px] truncate ">{item?.ProductName}</h1>

      <GreenButton
        name="ყიდვა"
        style="h-[40px] text-[18px]"
        action={HandleAddCart}
        loader={addCartloader}
        dissabled={isInCart}
        // dissabled={isInCart || prodStock === 0}
      />
    </div>
  );
}
