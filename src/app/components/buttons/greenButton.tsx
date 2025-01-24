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
      className={`w-full ${style} flex items-center justify-center rounded-full 
     duration-100 ${
       loader
         ? "bg-[#D3D3D3] pointer-events-none"
         : dissabled
         ? "bg-[#D3D3D3] pointer-events-none"
         : "bg-myGreen active:bg-[#5DA31C] text-white cursor-pointer"
     }`}
    >
      <h1 className="">{name}</h1>
    </button>
  ) : (
    <div
      onClick={action}
      className={`w-full ${style} flex items-center justify-center rounded-full 
     duration-100 ${
       loader
         ? "bg-[#D3D3D3] pointer-events-none"
         : dissabled
         ? "bg-[#D3D3D3] pointer-events-none"
         : "bg-myGreen active:bg-[#5DA31C] text-white cursor-pointer"
     }`}
    >
      <h1 className="">{name}</h1>
    </div>
  );
}
