"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";

export default function DropDownFilials({ productId }: any) {
  const [droped, setDroped] = useState(false);
  const [filialsLoader, setFilialsLoader] = useState(false);
  const [filialsData, setFilialsData] = useState([]);

  useEffect(() => {
    if (productId) {
      setFilialsLoader(true);
      axiosUser
        .get(`front/productNashti?ProdCode=${productId}`)
        .then((res) => {
          setFilialsData(res.data.StoreProdNashtebi);
          setFilialsLoader(false);
        })
        .catch((err) => {})
        .finally(() => {});
    }
  }, [productId]);

  return (
    <div className="border-y-[1px] self-start max-lg:w-full px-[10px]">
      <div
        onClick={() => {
          if (filialsData.length > 0) {
            setDroped((prev: any) => !prev);
          }
        }}
        className="flex items-center justify-between gap-[50px] max-tiny:gap-[10px] h-[56px] cursor-pointer"
      >
        <div className="flex items-center gap-[10px]">
          <CiLocationOn />
          <p className="text-[14px] max-tiny:text-[13px]">
            ხელმისაწვდომია{" "}
            <span className="font-semibold">{filialsData.length || 0}</span>{" "}
            ფილიალში
          </p>
        </div>
        <FiChevronDown
          className={`text-[17px] duration-200 ${
            droped ? "" : "rotate-[-180deg]"
          }`}
        />
      </div>
      <div
        className={`flex flex-col gap-y-[10px] duration-200 ${
          droped
            ? "h-[220px] py-[5px] overflow-y-scroll showScrollVert"
            : "h-0 overflow-hidden py-0"
        }`}
      >
        {filialsLoader ? (
          [1, 2, 3, 4].map((item: any, index: number) => (
            <div key={item} className="w-full h-[50px]">
              <div className="loaderwave"></div>
            </div>
          ))
        ) : filialsData.length > 0 ? (
          filialsData?.map((item: any, index: any) => (
            <div
              key={index}
              className="flex items-center gap-[20px] max-tiny:gap-[10px] pr-[20px]"
            >
              <div className="rounded-[12px] w-[60px] max-tiny:w-[50px] shrink-0 aspect-square bg-gray-100 overflow-hidden relative">
                <Image
                  src="/images/food.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <p className="text-myGreen text-[14px] max-tiny:text-[13px]">
                  {item.StoreName} - {item.Address}
                </p>
                <div className="flex max-tiny:flex-col items-center gap-[5px] max-tiny:gap-0">
                  <p className="text-gray-400 text-[13px] max-tiny:text-[11px]">
                    სამუშაო საათები:
                  </p>
                  <h1 className="text-[13px] max-tiny:text-[11px]">
                    10:00 - 12:00
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-[13px]">
            ფილიალებში მარაგი ამოიწურა
          </p>
        )}
      </div>
    </div>
  );
}
