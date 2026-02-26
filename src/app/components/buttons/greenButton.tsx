import React from "react";
import DotsLoader from "../loaders/DotsLoader";

export default function GreenButton({
  name,
  action,
  loader,
  style,
  button,
  dissabled,
}: any) {
  return loader ? (
    <div
      className={`w-full ${style} flex items-center justify-center rounded-full 
   border-[1px] border-myGreen `}
    >
      <DotsLoader />
    </div>
  ) : button ? (
    <button
      type="submit"
      className={`w-full ${style} flex items-center justify-center text-center rounded-full 
     duration-100 px-[15px] ${
       loader
         ? "bg-[#D3D3D3] pointer-events-none"
         : dissabled
         ? "bg-[#D3D3D3] pointer-events-none text-gray-500"
         : "bg-myGreen active:bg-[#5DA31C] text-white cursor-pointer"
     }`}
    >
      <h1
        className={`select-none ${
          name === "დეტალურად" &&
          "max-tiny:text-[15px] max-[370px]:text-[13px]"
        }`}
      >
        {name}
      </h1>
    </button>
  ) : (
    <div
      onClick={action}
      className={`w-full ${style} flex items-center justify-center text-center rounded-full 
     duration-100 px-[15px] ${
       loader
         ? "bg-[#D3D3D3] pointer-events-none"
         : dissabled
         ? "bg-[#D3D3D3] pointer-events-none text-gray-500"
         : `${name === "უარყოფა" ? "bg-myBlack active:bg-[#2b2d2d] " : "bg-myGreen active:bg-[#5DA31C] "} text-white cursor-pointer`
     }`}
    >
      <h1
        className={`select-none ${
          name === "დეტალურად" &&
          "max-tiny:text-[15px] max-[370px]:text-[13px]"
        }`}
      >
        {name}
      </h1>
    </div>
  );
}
