"use client";

import React, { useContext } from "react";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaTree } from "react-icons/fa";
import { PiCornersOutLight } from "react-icons/pi";
import { BiStar } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import GreenButton from "../buttons/greenButton";
import { WishListAxiosContext } from "../../../../dataFetchs/wishListContext";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import useIsInFavorite from "../../../../dataFetchs/isInFavoriteHook";
import useGetProdAllStock from "../../../../dataFetchs/getProdAllStock";

export default function HorizontalCard({ item, narrow }: any) {
  const router = useRouter();
  const {
    setOpenProductCardPopUp,
    setAlertShow,
    setAlertStatus,
    setAlertText,
    slugify 
  } = useContext(ContextForSharingStates);
  const { user } = useContext(UserContext);

  const { setRenderWishList, WishListLocalStorageData } =
    useContext(WishListAxiosContext);

  // is in favorites?
  const { isInFavorite, setIsInFavorite } = useIsInFavorite(item.ProdCode);
  // is in favorites?

  // get prod stock
  const { prodAllStock } = useGetProdAllStock({ code: item.ProdCode });
  // get prod stock

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

  return (
    <div className="rounded-[12px] bg-white p-[10px] flex flex-col max-sm:gap-y-[12px] h-full">
      <div className="flex-wrap items-center justify-end gap-[8px] max-sm:flex hidden">
        {item.Fasi_dic !== item.Fasi18 && (
          <p
            className={`px-[10px] bg-myPink text-white  flex items-center rounded-full ${
              narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
            }`}
          >
            ფასდაკლება
          </p>
        )}
        {item.ProdAdditionalCode && (
          <p
            className={`px-[10px] ${
              prodAllStock ? "bg-myGreen" : "bg-gray-400"
            } text-white flex items-center rounded-full ${
              narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
            }`}
          >
            {prodAllStock ? "მარაგშია" : "ამოიწურა"}
          </p>
        )}
        
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
      <div className="flex justify-between max-xl:grid max-xl:grid-cols-2 max-sm:grid-cols-1 gap-[40px]">
        <div
          onClick={() => {
            router.push(
              `/products/${
                item.ProdAdditionalCode
                  ? `${slugify(item.ProductName)+"_"+item.ProdAdditionalCode}?variation=${item.ProdCode}`
                  : slugify(item.ProductName)+"_"+item.ProdCode
              }`
            );
          }}
          className="relative cursor-pointer aspect-[4/3] h-[207px] max-xl:h-full max-xl:w-full shrink-0 max-sm:h-full flex items-center justify-center rounded-[4px] overflow-hidden max-sm:hidden"
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
          {/* <div className="absolute bottom-[20px] max-lg:bottom-[10px] left-[20px] max-lg:left-[10px] z-[1] bg-myGreen text-white shrink-0 flex items-center justify-center text-[18px] w-[53px] max-sm:w-[36px] aspect-square rounded-full">
            <FaTree />
          </div> */}
        </div>
        <div className="flex flex-col max-xl:gap-y-[12px] w-full">
          <div
            onClick={() => {
              router.push(
                `/products/${
                  item.ProdAdditionalCode
                    ? `${slugify(item.ProductName)+"_"+item.ProdAdditionalCode}?variation=${item.ProdCode}`
                    : slugify(item.ProductName)+"_"+item.ProdCode
                }`
              );
            }}
            className="relative cursor-pointer aspect-[4/3] h-[207px] shrink-0 items-center justify-center rounded-[4px] overflow-hidden hidden max-sm:flex"
          >
            {item.main_image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${item?.main_image}`}
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
            {/* <div className="absolute bottom-[20px] max-lg:bottom-[10px] left-[20px] max-lg:left-[10px] z-[1] bg-myGreen text-white shrink-0 flex items-center justify-center text-[18px] w-[53px] max-sm:w-[36px] aspect-square rounded-full">
              <FaTree />
            </div> */}
          </div>
          <div className="flex-wrap items-center justify-end gap-[8px] flex max-sm:hidden">
            {item.Fasi_dic !== item.Fasi18 && (
              <p
                className={`px-[10px] bg-myPink text-white  flex items-center rounded-full ${
                  narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
                }`}
              >
                ფასდაკლება
              </p>
            )}
            {item.ProdAdditionalCode && (
              <p
                className={`px-[10px] ${
                  prodAllStock ? "bg-myGreen" : "bg-gray-400"
                } text-white flex items-center rounded-full ${
                  narrow ? "text-[10px] h-[28px]" : "text-[14px] h-[36px]"
                }`}
              >
                {prodAllStock ? "მარაგშია" : "ამოიწურა"}
              </p>
            )}
            
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
          <div className="flex max-xl:flex-col items-center gap-[15px] h-full">
            <div className="flex flex-col gap-y-[12px] pb-[15px] max-xl:pb-0 w-full">
              <h1 className="text-[22px]">{item.ProductName}</h1>
              {item.Description5 && (
                <p className="text-[14px] line-clamp-2">
                  {item.Description5}
                </p>
              )}
              <div className={`flex items-end max-xl:hidden`}>
                <h1 className="text-[20px]">
                  {item.Fasi_dic !== item.Fasi18 ? item.Fasi_dic.toFixed(2) : item.Fasi18.toFixed(2)}₾
                </h1>
                {item.Fasi_dic !== item.Fasi18 && (
                  <p className="pl-[8px] text-gray-400 line-through">
                    {item.Fasi18.toFixed(2)}₾
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-[12px] w-[280px] max-xl:w-full shrink-0">
              <div className="flex items-center justify-between w-full">
                <div className="hidden max-xl:flex items-end">
                  <h1 className="text-[20px]">
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
                  className={`flex items-center max-sm:justify-between w-full max-xl:w-auto gap-[12px] justify-center`}
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
                      {isInFavorite
                        ? "რჩეულებიდან წაშლა"
                        : "რჩეულებში დამატება"}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setOpenProductCardPopUp(
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
              </div>
              <GreenButton
                name={"დეტალური ნახვა"}
                style="h-[56px] max-sm:h-[48px] text-[18px]"
                action={() => {
                  router.push(
                    `/products/${
                      item.ProdAdditionalCode
                        ? `${slugify(item.ProductName)+"_"+item.ProdAdditionalCode}?variation=${slugify(item.ProductName)+"_"+item.ProdCode}`
                        : slugify(item.ProductName)+"_"+item.ProdCode
                    }`
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
