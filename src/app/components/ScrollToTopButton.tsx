"use client";

import { useEffect, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
  const pathname = usePathname();

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`${
        scrollY > 1500
          ? "w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px] border-[2px]"
          : "w-0 h-0 border-0"
      } ${
        pathname.split("/")[1] === "admin" ? "hidden" : "flex"
      } fixed bottom-[40px] right-[40px] max-sm:right-[20px] max-sm:bottom-[20px] z-[1] flex items-center justify-center cursor-pointer text-myGreen text-[25px] max-sm:text-[20px] duration-300 rounded-full border-myGreen`}
    >
      <IoArrowUpOutline className="animate-bounce " />
    </div>
  );
}
