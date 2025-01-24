import Image from "next/image";
import React from "react";

export default function BlogsBackgroundDesigns() {
  return (
    <div
      className={`max-lg:hidden overflow-hidden w-full h-full absolute top-0 left-0`}
    >
      <div
        className={`absolute top-[-250px] max-2xl:top-[-270px] right-[50px] max-2xl:right-[30px] select-none w-[320px] h-[500px] z-0`}
      >
        <Image
          src="/images/greenColSmall.png"
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "contain",
          }}
          className=""
        />
      </div>
      <div
        className={`absolute top-[-250px] max-2xl:top-[-270px] right-[250px] max-2xl:right-[220px] select-none w-[500px] h-[700px] rotate-[180deg] z-0`}
      >
        <Image
          src="/images/yellowCol.png"
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "contain",
          }}
          className=""
        />
      </div>
    </div>
  );
}
