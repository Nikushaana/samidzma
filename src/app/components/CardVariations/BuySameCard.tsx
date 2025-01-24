import Image from "next/image";
import React from "react";

export default function BuySameCard({ FourCol, title }: any) {
  return (
    <div className="relative rounded-[8px] max-tiny:rounded-none bg-white max-tiny:bg-transparent p-[25px] max-tiny:p-0 flex flex-col gap-y-[25px]">
      <h1 className="text-[20px]">{title}</h1>
      {title === "დაასრულე ყიდვა" && (
        <p className="absolute top-[10px] right-[10px] bg-myPink rounded-[4px] px-[5px] text-white h-[28px] flex items-center">
          Sale -5%
        </p>
      )}
      <div
        className={`grid gap-[5px] grid-rows-2 overflow-hidden max-h-[300px] ${
          FourCol ? "grid-cols-4" : "grid-cols-3"
        }`}
      >
        {FourCol
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((item, index: number) => (
              <div
                key={item}
                className="w-full aspect-square relative rounded-[4px] overflow-hidden"
              >
                <Image
                  src="/images/categoryFire.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  className="absolute w-full h-full flex items-end z-[1] p-[10px]
            bg-gradient-to-t from-[#1D1F1FD6] from-0% to-[#32343400] to-84%"
                >
                  <p className="text-white text-[12px]">
                    აქსესუარები ტორტის გასაფორმებლად
                  </p>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index: number) => (
              <div
                key={item}
                className={`w-full  relative rounded-[4px] overflow-hidden ${
                  FourCol ? "aspect-video" : "aspect-square"
                }`}
              >
                <Image
                  src="/images/categoryFire.png"
                  alt={""}
                  sizes="500px"
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <div
                  className="absolute w-full h-full flex items-end z-[1] p-[10px]
              bg-gradient-to-t from-[#1D1F1FD6] from-0% to-[#32343400] to-84%"
                >
                  <p className="text-white text-[12px]">
                    აქსესუარები ტორტის გასაფორმებლად
                  </p>
                </div>
              </div>
            ))}
      </div>

      <h1 className="text-myGreen text-[18px] border-b-[1px] border-b-myGreen cursor-pointer self-center">
        ყიდვა
      </h1>
    </div>
  );
}
