"use client";

import WhatUSearch from "@/app/components/Inputs/WhatUSearch";
import React, { useContext, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import { useRouter } from "next/navigation";
import InnerProductPathRouter from "@/app/components/InnerProductPage/InnerProductPathRouter";
import InnerProductBottomSliders from "@/app/components/InnerProductPage/InnerProductBottomSliders";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import TestInnerProductMainInfo from "@/app/components/InnerProductPage/testInnerProductMainInfo";

export default function ProductDetailsClient({
  params,
}: {
  params: { productId: string; variationId: string };
}) {
  const router = useRouter();
  const { slugify } = useContext(ContextForSharingStates);

  const [oneProduct, setOneProduct] = useState<any>({});
  const [oneProductLoader, setOneProductLoader] = useState<boolean>(true);
  const [realProductId, setRealProductId] = useState<string>("");

  const id = params.productId.split("_").pop()!; // get the real ID
  const vid = params.variationId?.split("_").pop()!; // get the variation ID

  useEffect(() => {
    setRealProductId(id);

    setOneProductLoader(true);
    axiosUser
      .get(`front/ourProduct/${id}`)
      .then((res) => {
        setOneProduct(res.data);
        if (!vid && res.data?.product?.ProdSaxeoba == "ნაკრებები") {
          window.history.replaceState(
            null,
            "/products",
            `/products/${res.data?.product?.slug || slugify(res.data?.product?.ProductName) + "_" + id}`,
          );
        } else if (!vid && res.data?.variation?.length > 0) {
          // window.history.replaceState(
          //   null,
          //   "/products",
          //   `/products/${
          //     slugify(res.data?.variation[0]?.ProductName) + "_" + id
          //   }?variation=${res.data?.variation[0]?.ProdCode}`,
          // );
        } else if (
          vid &&
          !res.data?.variation.find(
            (prod: any) => prod.ProdCode == vid,
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
  }, [id, vid]);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-748px)]">
      <div className="max-w-[1920px] w-full px-[264px] max-2xl:px-[90px] max-lg:px-[90px] max-md:px-[25px] pb-[100px] flex flex-col gap-y-[90px] relative">
        <div className="flex flex-col gap-y-[20px]">
          <WhatUSearch
            isProductNakrebi={oneProduct?.product?.ProdSaxeoba == "ნაკრებები"}
          />
          <InnerProductPathRouter
            variation={vid}
            oneProduct={oneProduct}
          />
          <TestInnerProductMainInfo
            variation={vid}
            realProductId={realProductId}
            oneProduct={oneProduct}
            setOneProductLoader={setOneProductLoader}
          />
          <InnerProductBottomSliders
            oneProductLoader={oneProductLoader}
            variation={vid}
            oneProduct={oneProduct}
            realProductId={realProductId}
          />
        </div>
      </div>
    </div>
  );
}
