import Image from "next/image";
import React from "react";

export default function DotsLoader() {
  return (
    <div className="relative aspect-square h-[70%] animate-spin-slow">
      <Image
        src="/images/spinner.png"
        alt={""}
        sizes="500px"
        fill
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
