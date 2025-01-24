import React, { useEffect, useState } from "react";

export default function useScreenWidth() {
  const isBrowser = typeof window !== "undefined";

  const [screenWidth, setScreenWidth] = useState<any>(
    isBrowser ? window.innerWidth : 0
  );

  const handleResize = () => {
    setScreenWidth(isBrowser ? window.innerWidth : 0);
  };

  useEffect(() => {
    if (isBrowser) {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isBrowser]);

  return screenWidth;
}
