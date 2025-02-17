"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function ProdVariationImages({ ProdCode }: any) {
  const [prodImagesLoader, setProdImagesLoader] = useState(true);
  const [prodImage, setProdImage] = useState<any>({});

  // get image
  useEffect(() => {
    setProdImagesLoader(true);
    if (ProdCode) {
      axiosUser
        .get(`front/productPicture?ProdCode=${ProdCode}`)
        .then((res) => {
          setProdImage(res.data[0]);
        })
        .catch((err) => {
          setProdImage({});
        })
        .finally(() => {
          setProdImagesLoader(false);
        });
    }
  }, [ProdCode]);
  // get image

  return (
    <div className="relative h-full w-full flex items-center justify-center ">
      {prodImagesLoader ? (
        <div className="w-full h-full rounded-[12px] loaderwave overflow-hidden"></div>
      ) : prodImage?.ProductPictureByte ? (
        <Image
          src={`data:image/png;base64,${prodImage?.ProductPictureByte}`}
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
  );
}
