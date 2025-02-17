"use client";

import ProductCard from "@/app/components/CardVariations/ProductCard";
import WhatUSearch from "@/app/components/Inputs/WhatUSearch";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BiChevronDown, BiStar } from "react-icons/bi";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import EverySlider from "@/app/components/sliders/EverySlider";
import GreenButton from "@/app/components/buttons/greenButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CartAxiosContext } from "../../../../dataFetchs/cartContext";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import Counter from "@/app/components/counter/counter";
import { UserContext } from "../../../../dataFetchs/UserAxios";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import DropDownFilials from "@/app/components/DropDowns/DropDownFilials";
import useProducts from "../../../../dataFetchs/productsContext";
import ProductReview from "@/app/components/InnerProductPage/productReview";
import InnerProductMainImgSlider from "@/app/components/InnerProductPage/InnerProductMainImgSlider";
import InnerProductVariationImgsSlider from "@/app/components/InnerProductPage/InnerProductVariationImgsSlider";

export default function Page({ params }: { params: { productId: string } }) {
  const myParams = useSearchParams();
  const { setAlertShow, setAlertStatus, setAlertText, renderProdReview } =
    useContext(ContextForSharingStates);
  const { productsData, productsLoader } = useProducts();

  const { setRenderCart, CartData, CartLocalStorageData } =
    useContext(CartAxiosContext);

  const { user } = useContext(UserContext);

  // used states
  const variation = myParams.get("variation");
  const [prodStock, setProdStock] = useState<any>();
  const [complect, setComplect] = useState<any>(false);
  const [cartProdQuant, setCartProdQuant] = useState<number>(1);
  const [isInCart, setIsInCart] = useState<boolean>(
    user?.id
      ? CartData?.data?.find(
          (cart: any) =>
            cart.product_id === (variation ? variation : params.productId)
        )
      : CartLocalStorageData.some(
          (cartData: any) =>
            cartData.product_id === (variation ? variation : params.productId)
        )
  );
  const [addCartloader, setAddCartLoader] = useState<boolean>(false);
  // used states

  const [prodInfos, setProdInfos] = useState([
    {
      id: 1,
      name: "აღწერა",
    },
    {
      id: 2,
      name: "მახასიათებლები",
    },
    {
      id: 3,
      name: "შეფასებები",
    },
  ]);

  const [productDetiles, setproductDetiles] = useState(1);

  const [oneProduct, setOneProduct] = useState<any>({});
  const [oneProductLoader, setOneProductLoader] = useState<boolean>(true);

  const [mainVariationImages, setMainVariationImages] = useState<any>([]);
  const [variationImagesStockLoader, setMainVariationImagesStockLoader] =
    useState<any>(false);

  useEffect(() => {
    setOneProductLoader(true);
    axiosUser
      .get(`front/product/${params.productId}`)
      .then((res) => {
        setOneProduct(res.data);
        if (!variation && res.data?.product_variations?.length > 0) {
          window.history.replaceState(
            null,
            "/products",
            `/products/${params.productId}?variation=${res.data?.product_variations[0]?.ProdCode}`
          );
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }, [params.productId]);

  // get active variation images  get active variation images

  useEffect(() => {
    const fetchProductData = async () => {
      if (oneProduct && (params.productId || variation)) {
        setMainVariationImagesStockLoader(true);

        try {
          const prodCode = variation || params.productId;

          const [imagesResponse, stockResponse] = await Promise.all([
            axiosUser.get(`front/productPictureAll?ProdCode=${prodCode}`),
            axiosUser.get(`front/productNashti?ProdCode=${prodCode}`),
          ]);

          setMainVariationImages(imagesResponse.data);

          setProdStock(stockResponse.data?.StoreProdNashtebi);
        } catch (error) {
        } finally {
          setMainVariationImagesStockLoader(false);
          setOneProductLoader(false);
        }
      }
    };

    fetchProductData();
  }, [params.productId, oneProduct, variation]);
  // get active variation images  get active variation images

  // add in cart
  const HandleAddCart = () => {
    if (user?.id) {
      setAddCartLoader(true);
      axiosUser
        .post(`user/cart/`, {
          product_id: variation ? variation : params.productId,
          quantity: cartProdQuant,
          isComplete: complect ? 1 : 0,
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
          (cartData: any) =>
            cartData.product_id === (variation ? variation : params.productId)
        )
      ) {
        CartLocalStorageData.push({
          product_id: variation ? variation : params.productId,
          quantity: cartProdQuant,
          isComplete: complect ? 1 : 0,
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
        ? CartData?.data?.find(
            (cart: any) =>
              cart.product_id === (variation ? variation : params.productId)
          )
        : CartLocalStorageData.some(
            (cartData: any) =>
              cartData.product_id === (variation ? variation : params.productId)
          )
    );
  }, [
    CartData?.data,
    CartLocalStorageData,
    params.productId,
    user?.id,
    variation,
  ]);
  // is in cart?
  // add in cart

  // product reviews
  const [loaderProdReview, setLoaderProdReview] = useState<boolean>(true);
  const [prodReviewData, setProdReviewData] = useState<any>();

  useEffect(() => {
    setLoaderProdReview(true);
    axiosUser
      .get(
        `front/productReview?product_id=${
          variation ? variation : params.productId
        }&page=1&per_page=999`
      )
      .then((res) => {
        setProdReviewData(res.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoaderProdReview(false);
      });
  }, [params.productId, renderProdReview, variation]);
  // product reviews

  // yt video key
  const [ytVideoKey, setYtVideoKey] = useState<string>("");

  useEffect(() => {
    setYtVideoKey(
      variation
        ? oneProduct?.product_variations
            ?.find((item: any) => item.ProdCode === variation)
            ?.Description4.split("v=")[1]
        : oneProduct?.product?.Description4.split("v=")[1]
    );
  }, [
    oneProduct?.product?.Description4,
    oneProduct?.product_variations,
    variation,
  ]);
  // yt video key

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px]  max-lg:px-[90px] max-md:px-[25px] pb-[100px] flex flex-col gap-y-[90px] relative">
        <div className="flex flex-col gap-y-[20px]">
          <WhatUSearch />
          <div className="flex gap-[26px] max-lg:p-[5px] max-md:flex-col max-lg:gap-[16px] h-full  max-lg:bg-white max-lg:rounded-[12px] ">
            <div className="hidden max-md:flex items-center justify-center gap-[5px]">
              <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                <p className="text-[14px] max-md:text-[12px]">Sale -5%</p>
              </div>
              <div className="rounded-full text-white bg-myGreen flex items-center px-[15px] h-[36px]">
                <p className="text-[14px] max-md:text-[12px]">მარაგშია</p>
              </div>
              <div className="rounded-full text-black bg-myYellow flex items-center gap-[10px] px-[15px] h-[36px]">
                <BiStar className="text-[20px] max-md:text-[15px]" />
                <p className="text-[14px] max-md:text-[12px]">4-7</p>
              </div>
              <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
                <TbTruckDelivery className="text-[20px]" />
              </div>
            </div>
            <div
              className={`w-[45%] max-md:w-full flex max-md:h-[400px] ${
                oneProductLoader && "h-[500px]"
              }`}
            >
              <InnerProductMainImgSlider
                mainLoader={oneProductLoader}
                prodMainImages={mainVariationImages}
                activeImagessLoader={variationImagesStockLoader}
              />
            </div>
            <div className="w-[55%] max-md:w-full">
              {oneProductLoader ? (
                <div className="w-full h-full rounded-[12px] overflow-hidden loaderwave"></div>
              ) : (
                <div className="flex flex-col gap-y-[25px] p-[18px] rounded-[12px] bg-white w-full h-full">
                  <div className="flex items-center gap-[5px] max-md:hidden">
                    <div className="rounded-full text-white bg-myPink flex items-center px-[15px] h-[36px]">
                      <p className="text-[14px] max-md:text-[12px]">Sale -5%</p>
                    </div>
                    <div className="rounded-full text-white bg-myGreen flex items-center px-[15px] h-[36px]">
                      <p className="text-[14px] max-md:text-[12px]">მარაგშია</p>
                    </div>
                    <div className="rounded-full text-black bg-myYellow flex items-center gap-[10px] px-[15px] h-[36px]">
                      <BiStar className="text-[20px] max-md:text-[15px]" />
                      <p className="text-[14px] max-md:text-[12px]">4-7</p>
                    </div>
                    <div className="rounded-full text-white bg-myBlack flex items-center justify-center h-[36px] w-[36px]">
                      <TbTruckDelivery className="text-[20px]" />
                    </div>
                  </div>
                  <h1 className="text-[22px]">
                    {variation
                      ? oneProduct?.product_variations?.find(
                          (item: any) => item.ProdCode == variation
                        )?.ProductName
                      : oneProduct?.product?.ProductName}
                  </h1>
                  <div className="flex flex-col gap-y-[10px]">
                    <div className="flex items-center max-md:justify-between gap-[40px]">
                      <h1 className="text-[28px] max-md:text-[20px]">
                        {variation
                          ? complect
                            ? (
                                oneProduct?.product_variations?.find(
                                  (item: any) => item.ProdCode === variation
                                )?.ComplectPrice * cartProdQuant
                              )?.toFixed(2)
                            : (
                                oneProduct?.product_variations?.find(
                                  (item: any) => item.ProdCode === variation
                                )?.Fasi1 * cartProdQuant
                              )?.toFixed(2)
                          : complect
                          ? (
                              oneProduct?.product?.ComplectPrice * cartProdQuant
                            )?.toFixed(2)
                          : (
                              oneProduct?.product?.Fasi1 * cartProdQuant
                            )?.toFixed(2)}
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
                              {variation
                                ? oneProduct?.product_variations
                                    ?.find(
                                      (item: any) => item.ProdCode === variation
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
                        {variation
                          ? oneProduct?.product_variations?.find(
                              (item: any) => item.ProdCode == variation
                            )?.Point
                          : oneProduct?.product?.Point}
                      </h1>
                      <p className="text-[14px]">ქულა ბონუსად</p>
                    </div>
                  </div>
                  <InnerProductVariationImgsSlider
                    mainLoader={oneProductLoader}
                    mainId={params.productId}
                    prodVariationImages={
                      oneProduct?.product_variations?.length > 0 &&
                      oneProduct?.product_variations
                    }
                    variation={variation}
                  />
                  <div className="grid grid-cols-2 gap-[20px] max-lg:grid-cols-1">
                    <GreenButton
                      name="ყიდვა"
                      style="h-[56px] max-md:h-[48px] text-[18px]"
                      action={HandleAddCart}
                      loader={addCartloader}
                      dissabled={isInCart}
                      // dissabled={isInCart || prodStock[0].ProdNashtebi[0].Nashti === 0}
                    />

                    <div className="flex items-center gap-[20px] max-lg:justify-center max-lg:flex-row-reverse">
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
                        ყიდვისთვის გადადი <br className="max-lg:hidden" />{" "}
                        ფოტოებზე
                      </p>
                    </div>
                  </div>
                  <DropDownFilials stock={prodStock} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-[30px]">
            <div className="w-full grid grid-cols-3 max-md:grid-cols-7 border-b-[2px]">
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
                      productDetiles === item.id
                        ? "bg-myGreen"
                        : "bg-transparent"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-y-[70px]">
              {productDetiles === 1 && (
                <div className="px-[50px] max-lg:px-0 w-full flex flex-col gap-[50px]">
                  <div className="flex max-lg:flex-col gap-[50px] w-full ">
                    {oneProductLoader ? (
                      <div className="h-[20px] w-[60%] max-lg:w-full">
                        <div className="loaderwave"></div>
                      </div>
                    ) : (
                      <p className="w-[60%] max-lg:w-full text-[14px]">
                        {variation
                          ? oneProduct?.product_variations?.find(
                              (item: any) => item.ProdCode === variation
                            )?.DescriptionName
                          : oneProduct?.product?.DescriptionName}
                      </p>
                    )}
                    <ul className="grid grid-cols-2 max-md:text-[11px] text-[14px] gap-[10px] marker:text-myYellow list-disc list-inside w-[40%]  max-lg:w-full">
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                      <li>Aromatic ground cinnamon</li>
                    </ul>
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
              {productDetiles === 3 && (
                <ProductReview
                  productID={variation ? variation : params.productId}
                  loaderProdReview={loaderProdReview}
                  prodReviewData={prodReviewData}
                />
              )}

              <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
                <EverySlider
                  data={productsData}
                  loader={productsLoader}
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

              {productDetiles !== 3 && prodReviewData?.data.length > 0 && (
                <div className="rounded-[12px] p-[30px] flex flex-col gap-y-[20px] max-lg:p-0">
                  <EverySlider
                    data={prodReviewData?.data}
                    title={
                      <h1 className="text-[28px] max-md:text-[24px]">
                        შეფასებები
                      </h1>
                    }
                    card="CommentsCard"
                    slidesPerView={4}
                    spaceBetween={17}
                    showButtons={true}
                  />
                </div>
              )}

              <div className="flex flex-col gap-y-[20px]">
                <h1 className="text-[28px] max-md:text-[24px]">
                  შეიძლება ასევე მოგეწონოს
                </h1>
                <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[17px]">
                  {productsLoader
                    ? [1, 2, 3, 4].map((index: any) => (
                        <div
                          key={index}
                          className="w-full h-[450px] rounded-[12px] overflow-hidden"
                        >
                          <div className="loaderwave"></div>
                        </div>
                      ))
                    : productsData
                        ?.slice(0, 6)
                        .map((item: any, index: number) => (
                          <ProductCard key={item.ProdCode} item={item} />
                        ))}
                </div>
              </div>

              <div className="flex flex-col gap-y-[20px]">
                <h1 className="text-[28px] max-md:text-[24px]">
                  შენთვის რეკომენდებული
                </h1>
                <div className="grid grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[17px]">
                  {productsLoader
                    ? [1, 2, 3, 4].map((index: any) => (
                        <div
                          key={index}
                          className="w-full h-[450px] rounded-[12px] overflow-hidden"
                        >
                          <div className="loaderwave"></div>
                        </div>
                      ))
                    : productsData
                        ?.slice(0, 6)
                        .map((item: any, index: number) => (
                          <ProductCard key={item.ProdCode} item={item} />
                        ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex max-lg:flex-col max-lg:gap-0 items-start gap-[20px]">
                    <h1 className="text-[22px] max-sm:text-[18px]">
                      მიტანის სერვისი
                    </h1>
                    <div className="flex flex-col max-sm:gap-y-[5px] max-lg:w-full">
                      <div className="bg-[#EAEDEE] h-[38px] px-[20px] flex items-center rounded-full">
                        <p className="text-[10px]">Georgia</p>
                      </div>
                      <p className="text-[10px]">
                        შეიყვანე მისამართი და გაიგე მიტანის ღირებულება
                      </p>
                    </div>
                  </div> */
}
{
  /* <div className="flex max-lg:flex-col items-center gap-[50px] max-lg:gap-[5px]">
                    <div className="flex flex-col max-lg:flex-row gap-y-[5px] max-lg:w-full max-lg:justify-between">
                      <div className="flex items-center gap-[5px]">
                        <FaCheck className="text-myGreen" />
                        <p className="text-[14px]">თვითგატანა</p>
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <FaCheck className="text-myGreen" />
                        <p className="text-[14px]">სახლამდე მიტანა</p>
                      </div>
                    </div>
                    <div className="border-l-[1px] border-[#D3D3D3] max-lg:border-0 pl-[20px] max-lg:w-full max-lg:pl-0">
                      <div className="bg-[#F7F7F7] h-[41px] flex items-center justify-between w-[200px] max-lg:w-full px-[10px] rounded-[10px]">
                        <p className="text-[12px]">
                          სახლამდე მიტანის ღირებულება
                        </p>
                        <h1 className="text-[14px]">24.00₾</h1>
                      </div>
                    </div>
                  </div> */
}
