"use client";

import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import { BsPlusLg, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { IoSearchOutline } from "react-icons/io5";
import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";
import { useRouter } from "next/navigation";

export default function CategoriesPopUp() {
  const { isCategoriesPopUp, setIsCategoriesPopUp } = useContext(
    ContextForSharingStates
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.movementX * -1;
    }
  };
  const router = useRouter();
  const { FrontCategoriesData, FrontCategoriesLoader } = useFrontCategories();

  const [actFirstCateg, setActFirstCateg] = useState<any>({
    id: "",
    secCategData: [],
  });

  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] px-[264px] max-2xl:px-[160px] max-lg:px-[90px] max-tiny:px-[25px] ${
        isCategoriesPopUp
          ? "z-[20] opacity-1 duration-100"
          : "z-[-20] opacity-0 duration-150"
      }`}
    >
      <div
        onClick={() => {
          setIsCategoriesPopUp(false);
        }}
        className={`bg-[#0000003b] w-full h-full absolute z-[-1] duration-100 ${
          isCategoriesPopUp ? "backdrop-blur-[5px] " : "backdrop-blur-none"
        }`}
      ></div>
      <div
        className={`bg-[#EAEDEE] p-[16px] max-w-[1920px] w-full max-h-[80vh] flex flex-col gap-y-[20px] rounded-[12px] duration-100 ${
          actFirstCateg?.secCategData?.length > 0 ? "h-full" : ""
        }`}
      >
        <div className="flex justify-end">
          <div
            onClick={() => {
              setIsCategoriesPopUp(false);
            }}
            className="cursor-pointer"
          >
            <BsXLg />
          </div>
        </div>
        <div className="rounded-full bg-white overflow-hidden flex justify-between">
          <div className="flex items-center px-[20px] w-[calc(100%-50px)]">
            <input
              type="text"
              name=""
              placeholder="რას ეძებ?"
              className="text-[14px] w-full outline-none"
              id=""
            />
          </div>
          <div className="bg-myGreen text-white cursor-pointer flex items-center justify-center text-[18px] w-[43px] h-[43px] rounded-full">
            <IoSearchOutline />
          </div>
        </div>
        {actFirstCateg?.secCategData?.length > 0 ? (
          <div className="h-[calc(100%-102px)] max-tiny:overflow-y-scroll showScrollVert">
            <div className="flex items-start gap-[20px] max-tiny:flex-col max-tiny:gap-0">
              <h1 className="text-[28px] max-md:text-[24px]">კატეგორიები:</h1>
              <div
                ref={scrollRef}
                onMouseMove={handleDrag}
                className="overflow-x-auto notShowScrollHor max-tiny:overflow-hidden mb-[5px]"
              >
                <div className="flex items-start max-tiny:flex-wrap py-[5px] gap-[10px] ">
                  {FrontCategoriesData.map((item: any, index: number) => (
                    <p
                      key={item?.IdProdSaxeoba}
                      onClick={() => {
                        setActFirstCateg((prev: any) =>
                          prev.id === item?.IdProdSaxeoba
                            ? {}
                            : {
                                id: item?.IdProdSaxeoba,
                                secCategData: item?.productTypeGroup,
                              }
                        );
                      }}
                      className={`duration-100 flex items-center px-[10px] text-[14px] cursor-pointer shrink-0 border-[1px] rounded-full h-[36px] ${
                        actFirstCateg.id === item.IdProdSaxeoba
                          ? "text-white bg-myGreen border-myGreen"
                          : "border-black"
                      }`}
                    >
                      {item?.ProdSaxeobaName}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-[8px] border-t-[10px] border-myGreen w-full h-[calc(100%-51px)] overflow-y-scroll max-tiny:overflow-auto max-tiny:h-auto showScrollVert bg-white flex flex-col gap-y-[20px] p-[20px] pb-[30px]">
              <h1
                onClick={() => {
                  router.push(`/category/${actFirstCateg.id}`);
                }}
                className="text-[12px] cursor-pointer self-start underline"
              >
                სრულად ნახვა
              </h1>
              {actFirstCateg?.secCategData?.map((item1: any, index: number) => (
                <div
                  key={item1.IdProdTypeGroup}
                  className="flex flex-col gap-y-[10px]"
                >
                  <h1
                    onClick={() => {
                      router.push(
                        `/category/${actFirstCateg.id}/${item1.IdProdTypeGroup}`
                      );
                    }}
                    className="text-[14px] cursor-pointer self-start"
                  >
                    {item1.ProdTypeGroupName}
                  </h1>
                  {item1.productTypes.length > 0 && (
                    <div className="grid grid-cols-10 max-xl:grid-cols-6 max-md:grid-cols-4 max-tiny:grid-cols-2 gap-[10px]">
                      {item1.productTypes?.map((item2: any, index: number) => (
                        <div
                          key={item2.IdProdType}
                          onClick={() => {
                            router.push(
                              `/category/${actFirstCateg.id}/${item1.IdProdTypeGroup}/${item2.IdProdType}`
                            );
                          }}
                          className="w-full aspect-square rounded-[4px] overflow-hidden relative cursor-pointer"
                        >
                          {item2?.image ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${item2?.image}`}
                              alt={""}
                              sizes="500px"
                              fill
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full relative">
                              <div className="w-[90%] h-[90%] relative">
                                <Image
                                  src="/images/siteLogo.png"
                                  alt={""}
                                  sizes="500px"
                                  fill
                                  style={{
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                          <div className="absolute p-[10px] max-tiny:p-[5px] top-0 left-0 bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-end">
                            <p className="text-white text-[10px] w-full">
                              {item2.ProdTypeName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-md:h-[calc(100%-102px)] max-md:overflow-y-scroll showScrollVert">
            <div className="grid grid-cols-5  max-md:grid-cols-2 gap-[10px]">
              {FrontCategoriesData?.map((item3: any, index: number) => (
                <div
                  key={item3.IdProdSaxeoba}
                  onClick={() => {
                    setActFirstCateg({
                      id: item3?.IdProdSaxeoba,
                      secCategData: item3?.productTypeGroup,
                    });
                  }}
                  className="w-full aspect-video rounded-[4px] overflow-hidden relative cursor-pointer"
                >
                  {item3?.image ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${item3?.image}`}
                      alt={""}
                      sizes="500px"
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full relative">
                      <div className="w-[90%] h-[90%] relative">
                        <Image
                          src="/images/siteLogo.png"
                          alt={""}
                          sizes="500px"
                          fill
                          style={{
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="absolute p-[10px] max-tiny:p-[5px] top-0 left-0 bg-gradient-to-t from-[#1D1F1FD6] from-[14%] to-[#32343424] to-[84%] w-full h-full flex items-end">
                    <p className="text-white text-[10px] w-full">
                      {item3.ProdSaxeobaName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
