import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import Counter from "../counter/counter";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { BsXLg } from "react-icons/bs";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";

export default function CartCard({
  productItemData,
  cartImg,
  cartItemData,
}: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { user } = useContext(UserContext);
  const { setRenderCart, CartLocalStorageData } = useContext(CartAxiosContext);

  // used states
  const [deleteCartloader, setDeleteCartLoader] = useState<boolean>(false);
  const [prodImages, setProdImages] = useState<any>({});
  const [prodImagesLoader, setProdImagesLoader] = useState<boolean>(true);
  // used states

  // delete from cart
  const HandleDeleteFromCart = () => {
    if (user?.id) {
      setDeleteCartLoader(true);
      axiosUser
        .delete(`user/cart/${cartItemData.id}`)
        .then((res) => {
          setAlertShow(true);
          setAlertStatus(true);
          setAlertText("კალათიდან წარმატებით წაიშალა");
          setRenderCart(res);
        })
        .catch((err) => {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("კალათიდან ვერ წაიშალა!");
        })
        .finally(() => {
          setDeleteCartLoader(false);
        });
    } else {
      if (
        CartLocalStorageData.some(
          (cart: any) => cart.product_id === productItemData.ProdCode
        )
      ) {
        const updatedCart = CartLocalStorageData.filter(
          (cart1: any) => cart1.product_id !== productItemData.ProdCode
        );
        localStorage.setItem("SamiDzma-cart", JSON.stringify(updatedCart));
        setRenderCart(new Date());
        setAlertShow(true);
        setAlertStatus(true);
        setAlertText("კალათიდან წარმატებით წაიშალა");
      }
    }
  };

  // get image
  useEffect(() => {
    if (!user?.id && productItemData.ProdCode) {
      setProdImagesLoader(true);
      axiosUser
        .get(`front/productPicture?ProdCode=${productItemData.ProdCode}`)
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
  }, [productItemData]);
  // get image

  return (
    <div
      className={`relative rounded-[12px] bg-white p-[10px] flex items-center justify-between gap-[20px] ${
        deleteCartloader && "pointer-events-none"
      }`}
    >
      <div
        onClick={() => {
          HandleDeleteFromCart();
        }}
        className="flex items-center justify-center absolute top-[10px] right-[10px] text-gray-600 text-[20px] w-[30px] h-[30px] cursor-pointer"
      >
        <BsXLg />
      </div>
      <div className="flex items-center gap-[27px] max-tiny:w-[40%]">
        <div className="relative aspect-video h-[175px] max-lg:aspect-square flex items-center justify-center rounded-[8px] overflow-hidden">
          {user?.id ? (
            cartImg ? (
              <Image
                src={`data:image/png;base64,${cartImg}`}
                alt={""}
                sizes="500px"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
            )
          ) : prodImagesLoader ? (
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
        </div>
        <div className="flex flex-col gap-y-[10px] max-tiny:hidden">
          <div className="flex items-center gap-[10px] text-[#509E07]">
            <FaCheck />
            <p>მარაგშია</p>
          </div>
          <h1 className="text-[22px]">{productItemData.ProductName}</h1>
          <p className="text-[14px]">ზომა: {productItemData.ZomaName}</p>
        </div>
      </div>

      <div className="flex flex-col items-end max-tiny:items-start gap-y-[20px] max-tiny:gap-y-[5px]">
        <div className="items-center gap-[10px] text-[#509E07] hidden max-tiny:flex">
          <FaCheck />
          <p>მარაგშია</p>
        </div>
        <h1 className="text-[22px] hidden max-tiny:flex">
          {productItemData.ProductName}
        </h1>
        <p className="text-[14px] hidden max-tiny:flex">
          ზომა: {productItemData.ZomaName}
        </p>
        <h1 className="text-[20px]">
          {CartLocalStorageData.find(
            (cart: any) => cart.product_id === productItemData.ProdCode
          )?.isComplete
            ? productItemData.ComplectPrice
            : productItemData.Fasi1}
          ₾
          <span className="pl-[5px] text-[14px] text-gray-500">
            {user?.id
              ? cartItemData.isComplete
                ? "კომპლექტი"
                : "ცალი"
              : CartLocalStorageData.find(
                  (cart: any) => cart.product_id === productItemData.ProdCode
                )?.isComplete
              ? "კომპლექტი"
              : "ცალი"}
          </span>
        </h1>
        <Counter
          cartItemData={
            user?.id
              ? cartItemData
              : CartLocalStorageData.find(
                  (cart: any) => cart.product_id === productItemData.ProdCode
                )
          }
        />
      </div>
    </div>
  );
}
