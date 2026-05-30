"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import GreenButton from "../buttons/greenButton";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import useIsInFavorite from "../../../../dataFetchs/isInFavoriteHook";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";

export default function KitCard({ item, slidesPerView }: any) {
  const router = useRouter();
  const {
    setOpenProductCardPopUp,
    slugify,
    setAlertShow,
    setAlertStatus,
    setAlertText,
  } = useContext(ContextForSharingStates);
  const { setRenderWishList, WishListLocalStorageData } =
    useContext(WishListAxiosContext);
  const { user } = useContext(UserContext);

  // is in favorites?
  const { isInFavorite, setIsInFavorite } = useIsInFavorite(item.ProdCode);
  // is in favorites?

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
          (favs: any) => favs !== item.ProdCode,
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
        WishListLocalStorageData.push(item.ProdCode);
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

  return (
    <div
      className={`rounded-[12px] ${
        slidesPerView === 1
          ? "grid grid-cols-2 max-lg:grid-cols-1 max-lg:p-[20px] max-lg:bg-white"
          : "flex flex-col p-[20px] bg-white"
      } justify-between gap-[40px] max-2xl:gap-y-[20px]`}
    >
      <div className="flex flex-col gap-y-[12px]">
        <div
          onClick={() => {
            router.push(
              `/products/${
                item.ProdAdditionalCode
                  ? `${
                      (item.slug || slugify(item.ProductName)) +
                      "_" +
                      item.ProdAdditionalCode
                    }?variation=${item.ProdCode}`
                  : (item.slug || slugify(item.ProductName)) +
                    "_" +
                    item.ProdCode
              }`,
            );
          }}
          className={`relative cursor-pointer w-full max-h-[350px] ${
            slidesPerView === 1
              ? "h-full rounded-[10px] max-lg:rounded-[4px] max-lg:aspect-[4/3]  bg-white"
              : "aspect-[4/3] rounded-[4px]"
          } overflow-hidden`}
        >
          {item.main_image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_image}`}
              alt={""}
              sizes="500px"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          ) : (
            <p className="text-center text-[14px]">ფოტო არ არსებობს</p>
          )}
        </div>

        <h1
          className={`text-[22px] max-2xl:text-[20px] ${
            slidesPerView === 1 ? "hidden max-lg:flex" : ""
          }`}
        >
          {item.ProductName}
        </h1>
        {item.Description5 && (
          <p
            className={`text-[14px] px-[10px] max-2xl:px-0 ${
              slidesPerView === 1 ? "hidden max-lg:flex" : ""
            }`}
          >
            {item.Description5}
          </p>
        )}
      </div>

      <div
        className={`flex flex-col gap-y-[12px] ${
          slidesPerView === 1 ? "justify-between max-lg:justify-normal" : ""
        }`}
      >
        <div className="flex items-center justify-between pl-[10px]  max-2xl:pl-0">
          <div className="flex items-end">
            <h1 className="text-[20px] pl-[15px]">
              {item.Fasi_dic !== item.Fasi18
                ? item.Fasi_dic.toFixed(2)
                : item.Fasi18.toFixed(2)}
              ₾
            </h1>
            {item.Fasi_dic !== item.Fasi18 && (
              <p className="pl-[8px] text-gray-400 line-through">
                {item.Fasi18.toFixed(2)}₾
              </p>
            )}
          </div>
          <div
            className={`items-center gap-[12px] ${
              slidesPerView === 1 ? "hidden max-lg:flex" : "flex"
            }`}
          >
            <div
              onClick={() => {
                HandleAddRemoveWishList();
              }}
              className="relative group bg-myYellow text-black shrink-0 flex items-center justify-center text-[22px] w-[38px] h-[38px] rounded-full cursor-pointer"
            >
              {isInFavorite ? <FaHeart /> : <FaRegHeart />}
              <p className="absolute top-[-30px] group-hover:flex hidden select-none duration-100 bg-gray-200 text-gray-600 text-[12px] px-[10px] py-[5px] rounded-[8px] w-[150px]">
                {" "}
                {isInFavorite ? "რჩეულებიდან წაშლა" : "რჩეულებში დამატება"}
              </p>
            </div>
            <div
              onClick={() => {
                setOpenProductCardPopUp(
                  item.ProdAdditionalCode
                    ? `${item.ProdAdditionalCode}?${item.ProdCode}`
                    : item.ProdCode,
                );
              }}
              className="relative bg-myGray text-black shrink-0 flex items-center justify-center text-[23px] w-[38px] h-[38px] rounded-full cursor-pointer"
            >
              <PiCornersOutLight />
            </div>
          </div>
        </div>

        <div
          className={`${slidesPerView === 1 ? "w-[280px] max-lg:w-full" : ""}`}
        >
          <GreenButton
            name={"დეტალური ნახვა"}
            style="h-[56px] max-sm:h-[48px] text-[18px]"
            action={() => {
              router.push(
                `/products/${
                  item.ProdAdditionalCode
                    ? `${
                        (item.slug || slugify(item.ProductName)) +
                        "_" +
                        item.ProdAdditionalCode
                      }?variation=${item.ProdCode}`
                    : (item.slug || slugify(item.ProductName)) +
                      "_" +
                      item.ProdCode
                }`,
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
