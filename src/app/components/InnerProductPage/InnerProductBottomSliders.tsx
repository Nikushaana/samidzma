"use client";

import React, { useContext, useEffect, useState } from "react";
import ProductReview from "./productReview";
import EverySlider from "../sliders/EverySlider";
import ProductCard from "../CardVariations/ProductCard";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import useProducts from "../../../../dataFetchs/productsContext";

export default function InnerProductBottomSliders({
  oneProductLoader,
  variation,
  oneProduct,
  realProductId,
}: any) {
  const { renderProdReview } = useContext(ContextForSharingStates);
  const [prodInfos, setProdInfos] = useState([
    {
      id: 1,
      name: "აღწერა",
    },
    {
      id: 2,
      name: "შეფასებები",
    },
  ]);

  const [productDetiles, setproductDetiles] = useState(1);

  // yt video key
  const [ytVideoKey, setYtVideoKey] = useState<string>("");

  useEffect(() => {
    setYtVideoKey(
      variation
        ? oneProduct?.variation
            ?.find((item: any) => item.ProdCode === variation)
            ?.Description4.split("v=")[1]
        : oneProduct?.product?.Description4.split("v=")[1]
    );
  }, [oneProduct?.product?.Description4, oneProduct?.variation, variation]);
  // yt video key

  // product reviews
  const [loaderProdReview, setLoaderProdReview] = useState<boolean>(true);
  const [prodReviewData, setProdReviewData] = useState<any>();

  useEffect(() => {
    const prodCode = variation || realProductId;
    setLoaderProdReview(true);
    axiosUser
      .get(`front/productReview?product_id=${prodCode}&page=1&per_page=999`)
      .then((res) => {
        setProdReviewData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoaderProdReview(false);
      });
  }, [realProductId, renderProdReview, variation]);
  // product reviews

  const saxeoba = variation
    ? oneProduct?.variation?.find((item: any) => item.ProdCode == variation)
        ?.IdProdSaxeoba
    : oneProduct?.product?.IdProdSaxeoba;

  const typeGroup = variation
    ? oneProduct?.variation?.find((item: any) => item.ProdCode == variation)
        ?.IdProdTypeGroup
    : oneProduct?.product?.IdProdTypeGroup;

  const type = variation
    ? oneProduct?.variation?.find((item: any) => item.ProdCode == variation)
        ?.IdProdType
    : oneProduct?.product?.IdProdType;

  const filter = [
    saxeoba ? `IdProdSaxeoba=${saxeoba}` : "",
    typeGroup ? `IdProdTypeGroup=${typeGroup}` : "",
    type ? `IdProdType=${type}` : "",
  ]
    .filter(Boolean) // remove empty strings
    .join("&");

  const { productsData, productsLoader } = useProducts(filter);

  // recomended Kits

  const [recKitsProdsData, setRecKitsProdsData] = useState<any>();
  const [recKitsLoader, setRecKitsLoader] = useState<any>(true);

  useEffect(() => {
    const prodCode = variation || realProductId;
    if (prodCode) {
      setLoaderProdReview(true);
      axiosUser
        .get(`front/checkProductInMenu?prodCode=${prodCode}`)
        .then((res) => {
          setRecKitsProdsData(res.data);
          setRecKitsLoader(false);
        })
        .catch((err) => {})
        .finally(() => {
          setLoaderProdReview(false);
        });
    }
  }, [realProductId, variation]);

  // same products

  const [sameProdsData, setSameProdsData] = useState<any>();
  const [sameProdsLoader, setSameProdsLoader] = useState<any>(true);

  useEffect(() => {
    const prodCode = variation || realProductId;
    if (prodCode) {
      setLoaderProdReview(true);
      axiosUser
        .get(`front/getProductSameProduct?prodCode=${prodCode}`)
        .then((res) => {
          setSameProdsData(res.data.data);
          setSameProdsLoader(false);
        })
        .catch((err) => {})
        .finally(() => {
          setLoaderProdReview(false);
        });
    }
  }, [realProductId, variation]);

  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="w-full grid grid-cols-2 max-md:grid-cols-7 border-b-[2px]">
        {prodInfos.map((item: any, index: any) => (
          <div
            key={item.id}
            onClick={() => {
              setproductDetiles(item.id);
            }}
            className={`${
              index == 0
                ? "max-md:col-span-2"
                : index == 1
                ? "max-md:col-span-3"
                : index == 2 && "max-md:col-span-2"
            }`}
          >
            <h1
              className={`text-[28px] max-md:text-[14px] select-none max-md:h-[25px] cursor-pointer text-center duration-100  ${
                productDetiles === item.id ? "text-myGreen" : ""
              }`}
            >
              {item.name}
            </h1>
            <div
              className={`rounded-[4px] w-full h-[4px] duration-100 ${
                productDetiles === item.id ? "bg-myGreen" : "bg-transparent"
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-[70px]">
        {productDetiles === 1 && (
          <div className="px-[50px] max-lg:px-0 w-full flex flex-col gap-[50px]">
            <div className="w-full ">
              {oneProductLoader ? (
                <div className="h-[20px] w-full">
                  <div className="loaderwave"></div>
                </div>
              ) : (
                <p className="w-full text-[14px]">
                  {variation
                    ? oneProduct?.variation?.find(
                        (item: any) => item.ProdCode === variation
                      )?.Description5
                    : oneProduct?.product?.Description5}
                </p>
              )}
            </div>
            {oneProductLoader ? (
              <div className="aspect-video w-full">
                <div className="loaderwave"></div>
              </div>
            ) : (
              ytVideoKey && (
                <div className="aspect-video w-full rounded-[12px] overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytVideoKey}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )
            )}
          </div>
        )}

         {productDetiles === 2 && (
          <ProductReview
            productID={variation || realProductId}
            loaderProdReview={loaderProdReview}
            prodReviewData={prodReviewData}
          />
        )}

        {recKitsProdsData?.length > 0 && (
          <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
            <EverySlider
              data={recKitsProdsData}
              loader={recKitsLoader}
              title={
                <h1 className="text-[28px] max-md:text-[24px]">
                  რეკომენდებული ნაკრებები
                </h1>
              }
              card="KitCard"
              slidesPerView={4}
              spaceBetween={17}
              showButtons={true}
            />
          </div>
        )}

        {productDetiles !== 2 && prodReviewData?.data.length > 0 && (
          <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
            <EverySlider
              data={prodReviewData?.data}
              title={
                <h1 className="text-[28px] max-md:text-[24px]">შეფასებები</h1>
              }
              card="CommentsCard"
              slidesPerView={4}
              spaceBetween={17}
              showButtons={true}
            />
          </div>
        )}

       {sameProdsData?.length > 0 && (
          <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
            <EverySlider
              data={sameProdsData}
              loader={sameProdsLoader}
              title={
                <h1 className="text-[28px] max-md:text-[24px]">
                  თავსებადი პროდუქტები
                </h1>
              }
              card="ProductCard"
              slidesPerView={4}
              spaceBetween={17}
              showButtons={true}
            />
          </div>
        )}

        {productsData?.length > 0 && (
          <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
            <EverySlider
              data={productsData}
              loader={productsLoader}
              title={
                <h1 className="text-[28px] max-md:text-[24px]">
                  მსგავსი პროდუქტები
                </h1>
              }
              card="ProductCard"
              slidesPerView={4}
              spaceBetween={17}
              showButtons={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
