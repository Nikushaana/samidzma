"use client";

import WhatUSearch from "@/app/components/Inputs/WhatUSearch";
import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { useRouter, useSearchParams } from "next/navigation";
import InnerProductPathRouter from "@/app/components/InnerProductPage/InnerProductPathRouter";
import InnerProductBottomSliders from "@/app/components/InnerProductPage/InnerProductBottomSliders";
import InnerProductMainInfo from "@/app/components/InnerProductPage/InnerProductMainInfo";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import TestInnerProductMainInfo from "@/app/components/InnerProductPage/testInnerProductMainInfo";

export default function ProductDetailsClient({
  params,
}: {
  params: { productId: string };
}) {
  const myParams = useSearchParams();
  const router = useRouter();
  const { slugify } = useContext(ContextForSharingStates);

  const variation = myParams.get("variation");

  const [oneProduct, setOneProduct] = useState<any>({});
  const [oneProductLoader, setOneProductLoader] = useState<boolean>(true);
  const [realProductId, setRealProductId] = useState<string>("");

  useEffect(() => {
    const id = params.productId.split("_").pop()!; // get the real ID
    setRealProductId(id);

    setOneProductLoader(true);
    axiosUser
      .get(`front/ourProduct/${id}`)
      .then((res) => {
        setOneProduct(res.data);
        if (!variation && res.data?.product?.ProdSaxeoba == "ნაკრებები") {
          window.history.replaceState(
            null,
            "/products",
            `/products/${slugify(res.data?.product?.ProductName) + "_" + id}`,
          );
        } else if (!variation && res.data?.variation?.length > 0) {
          window.history.replaceState(
            null,
            "/products",
            `/products/${
              slugify(res.data?.variation[0]?.ProductName) + "_" + id
            }?variation=${res.data?.variation[0]?.ProdCode}`,
          );
        } else if (
          variation &&
          !res.data?.variation.find(
            (prod: any) => prod.ProdCode == variation,
          ) &&
          res.data?.product?.ProdSaxeoba == "ნაკრებები"
        ) {
          router.push("/not-found");
        }
      })
      .catch((err) => {
        if (err.response?.data?.message == "Product not found") {
          router.push("/not-found");
        }
      })
      .finally(() => setOneProductLoader(false));
  }, [params.productId]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px] max-lg:px-[90px] max-md:px-[25px] pb-[100px] flex flex-col gap-y-[90px] relative">
        <div className="flex flex-col gap-y-[20px]">
          <WhatUSearch
            isProductNakrebi={oneProduct?.product?.ProdSaxeoba == "ნაკრებები"}
          />  
          <InnerProductPathRouter
            variation={variation}
            oneProduct={oneProduct}
          /> 
          <TestInnerProductMainInfo
            variation={variation}
            realProductId={realProductId} 
            oneProduct={oneProduct}
            oneProductLoader={oneProductLoader}
            setOneProductLoader={setOneProductLoader} 
          />
          {/* <InnerProductMainInfo 
            variation={variation}
            oneProduct={oneProduct}
            oneProductLoader={oneProductLoader}
            setOneProductLoader={setOneProductLoader}
            realProductId={realProductId}
          /> */}
          <InnerProductBottomSliders
            oneProductLoader={oneProductLoader} 
            variation={variation}
            oneProduct={oneProduct}
            realProductId={realProductId}
          />
        </div>
      </div>
    </div>
  );
}
